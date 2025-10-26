/**
 * 统一错误处理器
 */
import type { AxiosError } from 'axios'
import { message } from 'ant-design-vue'

/**
 * API错误类
 */
export class ApiError extends Error {
  code: number
  status?: number
  data?: any

  constructor(message: string, code: number, status?: number, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.data = data
    // 保持原型链
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** 网络错误 */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** 请求超时 */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** 请求取消 */
  CANCEL_ERROR = 'CANCEL_ERROR',
  /** 业务错误 */
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  /** HTTP错误 */
  HTTP_ERROR = 'HTTP_ERROR',
  /** 未知错误 */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  type: ErrorType
  message: string
  code?: number
  status?: number
  data?: any
  originalError?: any
}

/**
 * 错误处理器配置
 */
export interface ErrorHandlerConfig {
  /** 是否显示错误提示 */
  showError?: boolean
  /** 自定义错误处理函数 */
  onError?: (error: ErrorInfo) => void
  /** Token过期处理 */
  onTokenExpired?: () => void
}

/**
 * 错误处理器类
 */
export class ErrorHandler {
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig = {}) {
    this.config = {
      showError: true,
      ...config,
    }
  }

  /**
   * 处理错误
   */
  handle(error: any, showError?: boolean): ErrorInfo {
    const errorInfo = this.parseError(error)

    // 调用自定义错误处理
    if (this.config.onError) {
      this.config.onError(errorInfo)
    }

    // 显示错误提示
    const shouldShowError = showError !== undefined ? showError : this.config.showError
    if (shouldShowError) {
      this.showErrorMessage(errorInfo)
    }

    // Token过期处理
    if (errorInfo.status === 401 || errorInfo.code === 1002 || errorInfo.code === 1003) {
      this.config.onTokenExpired?.()
    }

    return errorInfo
  }

  /**
   * 解析错误
   */
  private parseError(error: any): ErrorInfo {
    // Axios错误
    if (error.isAxiosError) {
      return this.parseAxiosError(error as AxiosError)
    }

    // API错误
    if (error instanceof ApiError) {
      return {
        type: ErrorType.BUSINESS_ERROR,
        message: error.message,
        code: error.code,
        status: error.status,
        data: error.data,
        originalError: error,
      }
    }

    // 普通错误
    return {
      type: ErrorType.UNKNOWN_ERROR,
      message: error.message || '未知错误',
      originalError: error,
    }
  }

  /**
   * 解析Axios错误
   */
  private parseAxiosError(error: AxiosError): ErrorInfo {
    // 请求取消
    if (error.code === 'ERR_CANCELED' || error.message === 'canceled') {
      return {
        type: ErrorType.CANCEL_ERROR,
        message: '请求已取消',
        originalError: error,
      }
    }

    // 请求超时
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
      return {
        type: ErrorType.TIMEOUT_ERROR,
        message: '请求超时，请稍后重试',
        originalError: error,
      }
    }

    // 网络错误
    if (!error.response) {
      return {
        type: ErrorType.NETWORK_ERROR,
        message: '网络连接失败，请检查网络',
        originalError: error,
      }
    }

    // HTTP错误
    const { status, data } = error.response
    return {
      type: ErrorType.HTTP_ERROR,
      message: this.getHttpErrorMessage(status, data),
      status,
      code: (data as any)?.code,
      data,
      originalError: error,
    }
  }

  /**
   * 获取HTTP错误消息
   */
  private getHttpErrorMessage(status: number, data?: any): string {
    // 优先使用服务器返回的错误消息
    if (data && typeof data === 'object' && data.message) {
      return data.message
    }

    // 使用默认错误消息
    const errorMap: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求资源不存在',
      408: '请求超时',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    }

    return errorMap[status] || `请求失败 (${status})`
  }

  /**
   * 显示错误消息
   */
  private showErrorMessage(error: ErrorInfo): void {
    // 取消错误不显示
    if (error.type === ErrorType.CANCEL_ERROR) {
      return
    }

    message.error(error.message)
  }

  /**
   * 创建API错误
   */
  static createApiError(message: string, code: number, status?: number, data?: any): ApiError {
    return new ApiError(message, code, status, data)
  }
}
