/**
 * 错误追踪器
 * 统一的错误处理和上报系统
 */

export interface ErrorContext {
  /** 错误发生的位置 */
  location?: string
  /** 用户信息 */
  userId?: string
  /** 请求信息 */
  request?: {
    url?: string
    method?: string
    params?: any
  }
  /** 额外上下文 */
  extra?: Record<string, any>
}

export interface ErrorReport {
  /** 错误消息 */
  message: string
  /** 错误堆栈 */
  stack?: string
  /** 错误级别 */
  level: 'info' | 'warning' | 'error' | 'fatal'
  /** 错误时间 */
  timestamp: number
  /** 错误上下文 */
  context?: ErrorContext
}

export type ErrorHandler = (report: ErrorReport) => void

class ErrorTrackerClass {
  private handlers: ErrorHandler[] = []
  private enabled = true

  /**
   * 注册错误处理器
   */
  registerHandler(handler: ErrorHandler) {
    this.handlers.push(handler)
  }

  /**
   * 移除错误处理器
   */
  removeHandler(handler: ErrorHandler) {
    const index = this.handlers.indexOf(handler)
    if (index > -1) {
      this.handlers.splice(index, 1)
    }
  }

  /**
   * 启用错误追踪
   */
  enable() {
    this.enabled = true
  }

  /**
   * 禁用错误追踪
   */
  disable() {
    this.enabled = false
  }

  /**
   * 捕获错误
   */
  capture(error: Error, context?: ErrorContext) {
    if (!this.enabled)
      return

    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      level: 'error',
      timestamp: Date.now(),
      context,
    }

    this.notify(report)
  }

  /**
   * 捕获消息
   */
  captureMessage(
    message: string,
    level: 'info' | 'warning' | 'error' = 'info',
    context?: ErrorContext,
  ) {
    if (!this.enabled)
      return

    const report: ErrorReport = {
      message,
      level,
      timestamp: Date.now(),
      context,
    }

    this.notify(report)
  }

  /**
   * 捕获致命错误
   */
  captureFatal(error: Error, context?: ErrorContext) {
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      level: 'fatal',
      timestamp: Date.now(),
      context,
    }

    this.notify(report)
  }

  /**
   * 通知所有处理器
   */
  private notify(report: ErrorReport) {
    this.handlers.forEach((handler) => {
      try {
        handler(report)
      }
      catch (err) {
        console.error('Error handler failed:', err)
      }
    })
  }
}

export const ErrorTracker = new ErrorTrackerClass()

// 默认控制台处理器
ErrorTracker.registerHandler((report) => {
  const { level, message, stack, context } = report

  // 根据错误级别选择合适的日志方法
  if (level === 'fatal' || level === 'error') {
    console.error(`[${level.toUpperCase()}] ${message}`)
  }
  else if (level === 'warning') {
    console.warn(`[${level.toUpperCase()}] ${message}`)
  }
  else {
    // info 级别也使用 warn 以符合 ESLint 规则

    console.warn(`[${level.toUpperCase()}] ${message}`)
  }

  if (stack) {
    console.error('Stack:', stack)
  }

  if (context) {
    console.warn('Context:', context)
  }
})
