import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type {
  ApiResponse,
  DownloadConfig,
  HttpClientConfig,
  RequestConfig,
  UploadConfig,
} from '../types/index'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { RequestLogger } from '../plugins/logger'
import { ErrorHandler } from './ErrorHandler'
import { InterceptorManager } from './InterceptorManager'

/**
 * HTTP 客户端类
 * 支持多实例管理，每个实例可以配置不同的服务地址
 */

export class HttpClient {
  /** axios 实例 */
  private instance: AxiosInstance

  /** 客户端配置 */
  private config: HttpClientConfig

  /** 待处理请求队列 */
  private pendingRequests: Map<string, AbortController>

  /** 加载计数器 */
  private loadingCount: number

  /** 错误处理器 */
  private errorHandler: ErrorHandler

  /** 拦截器管理器 */
  private interceptorManager: InterceptorManager

  /** 请求日志 */
  private requestLogger?: RequestLogger

  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 15000,
      showLoading: true,
      showError: true,
      requireAuth: true,
      cancelDuplicated: true,
      ...config,
    }

    this.pendingRequests = new Map()
    this.loadingCount = 0

    // 创建 axios 实例
    this.instance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...this.config.headers,
      },
    })

    // 初始化错误处理器
    this.errorHandler = new ErrorHandler({
      showError: this.config.showError,
      onTokenExpired: this.config.onTokenExpired,
    })

    // 初始化拦截器管理器
    this.interceptorManager = new InterceptorManager(this.instance)

    // 缓存、重试、排队功能已移除，后续使用 TanStack Query 替代

    // 设置请求日志
    if (this.config.logger?.enabled) {
      this.requestLogger = new RequestLogger(this.config.logger)
      this.requestLogger.setupLogger(this.instance)
    }

    // 设置拦截器
    this.setupInterceptors()
  }

  /**
   * 设置请求/响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const customConfig = config as InternalAxiosRequestConfig & RequestConfig

        // 处理重复请求
        if (customConfig.cancelDuplicated !== false && this.config.cancelDuplicated) {
          this.addPendingRequest(config)
        }

        // 显示加载提示
        if (customConfig.showLoading !== false && this.config.showLoading) {
          this.showLoading()
        }

        // 添加 Token
        if (customConfig.requireAuth !== false && this.config.requireAuth) {
          const token = await this.getToken()
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        // 自定义请求拦截器
        if (this.config.onRequest) {
          return (await this.config.onRequest(customConfig)) as InternalAxiosRequestConfig
        }

        return config
      },
      (error) => {
        this.hideLoading()
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const customConfig = response.config as RequestConfig

        // 移除待处理请求
        this.removePendingRequest(response.config)

        // 隐藏加载提示
        if (customConfig.showLoading !== false && this.config.showLoading) {
          this.hideLoading()
        }

        // 自定义响应拦截器
        if (this.config.onResponse) {
          return this.config.onResponse(response)
        }

        return this.handleResponse(response, customConfig)
      },
      (error) => {
        const customConfig = error.config as RequestConfig

        // 移除待处理请求
        if (error.config) {
          this.removePendingRequest(error.config)
        }

        // 隐藏加载提示
        this.hideLoading()

        // 自定义错误拦截器
        if (this.config.onResponseError) {
          return this.config.onResponseError(error)
        }

        return this.handleError(error, customConfig)
      },
    )
  }

  /**
   * 处理响应
   */
  private handleResponse(
    response: AxiosResponse<ApiResponse>,
    config: RequestConfig,
  ): any {
    const { code, message: msg } = response.data

    // 成功响应
    if (code === 200 || code === 0) {
      if (config.showSuccess) {
        message.success(config.successMessage || msg || '操作成功')
      }
      return response.data
    }

    // Token 过期或无效
    if ([401, 1002, 1003].includes(code)) {
      if (config.showError !== false && this.config.showError) {
        message.error(msg || '登录已过期，请重新登录')
      }
      this.config.onTokenExpired?.()
      const error: any = new Error(msg || '登录已过期')
      error.config = response.config
      error.response = response
      return Promise.reject(error)
    }

    // 无权限
    if (code === 403) {
      if (config.showError !== false && this.config.showError) {
        message.error(msg || '无权限访问')
      }
      const error: any = new Error(msg || '无权限访问')
      error.config = response.config
      error.response = response
      return Promise.reject(error)
    }

    // 其他业务错误
    if (config.showError !== false && this.config.showError) {
      message.error(msg || '请求失败')
    }

    const error: any = new Error(msg || '请求失败')
    error.config = response.config
    error.response = response
    return Promise.reject(error)
  }

  /**
   * 处理错误
   */
  private handleError(error: any, config: RequestConfig): Promise<never> {
    const showError = config.showError !== false && this.config.showError
    this.errorHandler.handle(error, showError)
    return Promise.reject(error)
  }

  /**
   * 生成请求唯一标识
   */
  private generateRequestKey(config: RequestConfig): string {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  /**
   * 添加待处理请求
   */
  private addPendingRequest(config: InternalAxiosRequestConfig): void {
    const requestKey = this.generateRequestKey(config)
    if (this.pendingRequests.has(requestKey)) {
      const controller = this.pendingRequests.get(requestKey)
      controller?.abort()
    }
    const controller = new AbortController()
    config.signal = controller.signal
    this.pendingRequests.set(requestKey, controller)
  }

  /**
   * 移除待处理请求
   */
  private removePendingRequest(config: RequestConfig): void {
    const requestKey = this.generateRequestKey(config)
    if (this.pendingRequests.has(requestKey)) {
      this.pendingRequests.delete(requestKey)
    }
  }

  /**
   * 显示加载提示
   */
  private showLoading(): void {
    if (this.loadingCount === 0) {
      // 可以在这里集成全局 loading 组件
    }
    this.loadingCount++
  }

  /**
   * 隐藏加载提示
   */
  private hideLoading(): void {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingCount = 0
      // 可以在这里隐藏全局 loading 组件
    }
  }

  /**
   * 获取 Token
   */
  private async getToken(): Promise<string | null> {
    if (this.config.getToken) {
      return await this.config.getToken()
    }
    return localStorage.getItem('token')
  }

  /**
   * 通用请求方法
   */
  public request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.request(config)
  }

  /**
   * GET 请求
   */
  public get<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    })
  }

  /**
   * POST 请求
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  /**
   * PUT 请求
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    })
  }

  /**
   * DELETE 请求
   */
  public delete<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...config,
    })
  }

  /**
   * PATCH 请求
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PATCH',
      data,
      ...config,
    })
  }

  /**
   * 文件上传
   */
  public upload<T = any>(
    url: string,
    file: File | FormData,
    config?: UploadConfig,
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData()

    if (file instanceof File) {
      const fieldName = config?.fieldName || 'file'
      formData.append(fieldName, file)
    }

    // 添加额外的表单数据
    if (config?.formData) {
      Object.entries(config.formData).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    return this.request<T>({
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: any) => {
        if (config?.onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          config.onProgress(progress, progressEvent.loaded, progressEvent.total)
        }
      },
      ...config,
    })
  }

  /**
   * 文件下载
   */
  public async download(
    url: string,
    params?: any,
    config?: DownloadConfig,
  ): Promise<void> {
    const response = await this.instance.get(url, {
      params,
      responseType: 'blob',
      onDownloadProgress: (progressEvent: any) => {
        if (config?.onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          config.onProgress(progress, progressEvent.loaded, progressEvent.total)
        }
      },
      ...config,
    })

    // 从响应头获取文件名
    const contentDisposition = response.headers['content-disposition']
    let filename = config?.filename || 'download'

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '')
        // 解码 URL 编码的文件名
        filename = decodeURIComponent(filename)
      }
    }

    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  /**
   * 取消所有待处理请求
   */
  public cancelAllRequests(): void {
    this.pendingRequests.forEach((controller) => {
      controller.abort()
    })
    this.pendingRequests.clear()
    this.loadingCount = 0
  }

  /**
   * 获取原始 axios 实例
   */
  public getAxiosInstance(): AxiosInstance {
    return this.instance
  }

  /**
   * 获取拦截器管理器
   */
  public getInterceptorManager(): InterceptorManager {
    return this.interceptorManager
  }

  /**
   * 获取错误处理器
   */
  public getErrorHandler(): ErrorHandler {
    return this.errorHandler
  }
}
