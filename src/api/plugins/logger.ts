/**
 * 请求日志插件
 */
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface LoggerConfig {
  /** 是否启用日志 */
  enabled?: boolean
  /** 是否打印请求 */
  logRequest?: boolean
  /** 是否打印响应 */
  logResponse?: boolean
  /** 是否打印错误 */
  logError?: boolean
  /** 自定义日志函数 */
  customLogger?: (type: 'request' | 'response' | 'error', data: any) => void
}

/**
 * 请求日志插件
 */
export class RequestLogger {
  private config: Required<LoggerConfig>

  constructor(config: LoggerConfig = {}) {
    this.config = {
      enabled: config.enabled !== false,
      logRequest: config.logRequest !== false,
      logResponse: config.logResponse !== false,
      logError: config.logError !== false,
      customLogger: config.customLogger || this.defaultLogger,
    }
  }

  /**
   * 默认日志函数
   */
  private defaultLogger(type: 'request' | 'response' | 'error', data: any): void {
    const timestamp = new Date().toISOString()
    const styles = {
      request: 'color: #2196F3; font-weight: bold',
      response: 'color: #4CAF50; font-weight: bold',
      error: 'color: #F44336; font-weight: bold',
    }

    // eslint-disable-next-line no-console
    console.group(`%c[${type.toUpperCase()}] ${timestamp}`, styles[type])
    // eslint-disable-next-line no-console
    console.log(data)
    // eslint-disable-next-line no-console
    console.groupEnd()
  }

  /**
   * 记录请求
   */
  private logRequest(config: InternalAxiosRequestConfig): void {
    if (!this.config.enabled || !this.config.logRequest) {
      return
    }

    const logData = {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
      headers: config.headers,
    }

    this.config.customLogger('request', logData)
  }

  /**
   * 记录响应
   */
  private logResponse(response: AxiosResponse): void {
    if (!this.config.enabled || !this.config.logResponse) {
      return
    }

    const logData = {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
      headers: response.headers,
      duration: this.calculateDuration(response.config),
    }

    this.config.customLogger('response', logData)
  }

  /**
   * 记录错误
   */
  private logError(error: any): void {
    if (!this.config.enabled || !this.config.logError) {
      return
    }

    const logData = {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response,
      stack: error.stack,
    }

    this.config.customLogger('error', logData)
  }

  /**
   * 计算请求耗时
   */
  private calculateDuration(config: any): string {
    if (config.__startTime) {
      const duration = Date.now() - config.__startTime
      return `${duration}ms`
    }
    return 'N/A'
  }

  /**
   * 为axios实例添加日志功能
   */
  setupLogger(instance: AxiosInstance): void {
    if (!this.config.enabled) {
      return
    }

    // 请求拦截器
    instance.interceptors.request.use(
      (config: any) => {
        config.__startTime = Date.now()
        this.logRequest(config)
        return config
      },
      (error) => {
        this.logError(error)
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        this.logResponse(response)
        return response
      },
      (error) => {
        this.logError(error)
        return Promise.reject(error)
      },
    )
  }
}
