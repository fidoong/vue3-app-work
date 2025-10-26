import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse, RequestConfig } from './types/response'
import { message } from 'ant-design-vue'
import axios from 'axios'

/**
 * 创建 axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/**
 * 请求队列，用于管理加载状态
 */
let loadingCount = 0
const pendingRequests = new Map<string, AbortController>()

/**
 * 生成请求唯一标识
 */
function generateRequestKey(config: AxiosRequestConfig): string {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加待处理请求
 */
function addPendingRequest(config: InternalAxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    // 如果存在相同请求，取消之前的请求
    const controller = pendingRequests.get(requestKey)
    controller?.abort()
  }
  const controller = new AbortController()
  config.signal = controller.signal
  pendingRequests.set(requestKey, controller)
}

/**
 * 移除待处理请求
 */
function removePendingRequest(config: AxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

/**
 * 显示加载提示
 */
function showLoading(): void {
  if (loadingCount === 0) {
    // 可以在这里集成你的 loading 组件
    // 例如：useLoadingStore().show()
  }
  loadingCount++
}

/**
 * 隐藏加载提示
 */
function hideLoading(): void {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    // 可以在这里集成你的 loading 组件
    // 例如：useLoadingStore().hide()
  }
}

/**
 * 获取 Token
 */
function getToken(): string | null {
  // 从 localStorage 或 store 中获取 token
  return localStorage.getItem('token')
}

/**
 * 清除 Token
 */
function clearToken(): void {
  localStorage.removeItem('token')
  // 可以在这里清除 store 中的用户信息
  // 例如：useUserStore().clearUser()
}

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as InternalAxiosRequestConfig & RequestConfig

    // 添加待处理请求（防止重复请求）
    addPendingRequest(config)

    // 显示加载提示
    if (customConfig.showLoading !== false) {
      showLoading()
    }

    // 添加 Token
    if (customConfig.requireAuth !== false) {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // 添加时间戳（防止缓存）
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const customConfig = response.config as AxiosRequestConfig & RequestConfig

    // 移除待处理请求
    removePendingRequest(response.config)

    // 隐藏加载提示
    if (customConfig.showLoading !== false) {
      hideLoading()
    }

    const { code, message: msg } = response.data

    // 成功响应
    if (code === 200) {
      // 显示成功提示
      if (customConfig.showSuccess) {
        message.success(customConfig.successMessage || msg || '操作成功')
      }
      return response.data as any
    }

    // Token 过期或无效
    if (code === 1002 || code === 1003 || code === 401) {
      message.error('登录已过期，请重新登录')
      clearToken()
      // 跳转到登录页
      window.location.href = '/login'
      return Promise.reject(new Error(msg || '登录已过期'))
    }

    // 无权限
    if (code === 403) {
      message.error('无权限访问')
      return Promise.reject(new Error(msg || '无权限访问'))
    }

    // 其他业务错误
    if (customConfig.showError !== false) {
      message.error(msg || '请求失败')
    }

    return Promise.reject(new Error(msg || '请求失败'))
  },
  async (error) => {
    const customConfig = error.config as AxiosRequestConfig & RequestConfig

    // 移除待处理请求
    if (error.config) {
      removePendingRequest(error.config)
    }

    // 隐藏加载提示
    hideLoading()

    // 请求被取消
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    // 请求超时
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      if (customConfig.showError !== false) {
        message.error('请求超时，请稍后重试')
      }
      return Promise.reject(new Error('请求超时'))
    }

    // 网络错误
    if (!error.response) {
      if (customConfig.showError !== false) {
        message.error('网络连接失败，请检查网络')
      }
      return Promise.reject(new Error('网络连接失败'))
    }

    // HTTP 错误
    const { status } = error.response
    let errorMessage = '请求失败'

    switch (status) {
      case 400:
        errorMessage = '请求参数错误'
        break
      case 401:
        errorMessage = '未授权，请重新登录'
        clearToken()
        window.location.href = '/login'
        break
      case 403:
        errorMessage = '拒绝访问'
        break
      case 404:
        errorMessage = '请求资源不存在'
        break
      case 408:
        errorMessage = '请求超时'
        break
      case 500:
        errorMessage = '服务器内部错误'
        break
      case 502:
        errorMessage = '网关错误'
        break
      case 503:
        errorMessage = '服务不可用'
        break
      case 504:
        errorMessage = '网关超时'
        break
      default:
        errorMessage = `请求失败 (${status})`
    }

    if (customConfig.showError !== false) {
      message.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

/**
 * 通用请求方法
 */
export function request<T = any>(
  config: AxiosRequestConfig & RequestConfig,
): Promise<ApiResponse<T>> {
  return service.request(config)
}

/**
 * GET 请求
 */
export function get<T = any>(
  url: string,
  params?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'get',
    params,
    ...config,
  })
}

/**
 * POST 请求
 */
export function post<T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'post',
    data,
    ...config,
  })
}

/**
 * PUT 请求
 */
export function put<T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'put',
    data,
    ...config,
  })
}

/**
 * DELETE 请求
 */
export function del<T = any>(
  url: string,
  params?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'delete',
    params,
    ...config,
  })
}

/**
 * PATCH 请求
 */
export function patch<T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'patch',
    data,
    ...config,
  })
}

/**
 * 文件上传
 */
export function upload<T = any>(
  url: string,
  file: File | FormData,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  const formData = file instanceof FormData ? file : new FormData()
  if (file instanceof File) {
    formData.append('file', file)
  }

  return request<T>({
    url,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })
}

/**
 * 文件下载
 */
export function download(
  url: string,
  params?: any,
  filename?: string,
): Promise<void> {
  return service
    .get(url, {
      params,
      responseType: 'blob',
    })
    .then((response) => {
      const blob = new Blob([response.data])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename || 'download'
      link.click()
      URL.revokeObjectURL(link.href)
    })
}

/**
 * 取消所有待处理请求
 */
export function cancelAllRequests(): void {
  pendingRequests.forEach((controller) => {
    controller.abort()
  })
  pendingRequests.clear()
  loadingCount = 0
}

export default service
