/**
 * ErrorBoundary 组件类型定义
 */

/**
 * 错误级别
 */
export type ErrorLevel = 'error' | 'warning' | 'info'

/**
 * 错误信息
 */
export interface ErrorInfo {
  /** 错误对象 */
  error: Error
  /** 组件名称 */
  componentName?: string
  /** 错误信息（Vue 提供） */
  info: string
  /** 错误发生时间 */
  timestamp: number
  /** 错误级别 */
  level: ErrorLevel
}

/**
 * ErrorBoundary Props
 */
export interface ErrorBoundaryProps {
  /** 是否显示错误详情（默认仅开发环境） */
  showDetails?: boolean
  /** 自定义错误消息 */
  fallbackMessage?: string
  /** 是否显示重试按钮 */
  showRetry?: boolean
  /** 重试按钮文本 */
  retryText?: string
  /** 是否自动上报错误 */
  autoReport?: boolean
  /** 错误级别 */
  level?: ErrorLevel
  /** 最大错误次数（超过后不再重试） */
  maxRetries?: number
  /** 自定义样式类名 */
  class?: string
  /** 自定义样式 */
  style?: string | Record<string, string | number>
}

/**
 * ErrorBoundary Emits
 */
export interface ErrorBoundaryEmits {
  /** 捕获到错误时触发 */
  (e: 'error', errorInfo: ErrorInfo): void
  /** 点击重试时触发 */
  (e: 'retry', count: number): void
  /** 错误恢复时触发 */
  (e: 'recover'): void
}

/**
 * ErrorBoundary 实例方法
 */
export interface ErrorBoundaryInstance {
  /** 手动清除错误 */
  clearError: () => void
  /** 获取当前错误信息 */
  getErrorInfo: () => ErrorInfo | null
  /** 获取重试次数 */
  getRetryCount: () => number
}
