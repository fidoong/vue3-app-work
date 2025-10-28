/**
 * Sentry 错误追踪和性能监控
 * 支持云服务和自建服务
 *
 * 功能:
 * - 错误追踪和上报
 * - 性能监控
 * - 会话重放
 * - 面包屑记录
 * - 用户上下文
 */
import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

export interface SentryConfig {
  /** Sentry DSN - 云服务或自建服务地址 */
  dsn: string
  /** 环境 */
  environment?: string
  /** 版本 */
  release?: string
  /** 性能追踪采样率 (0-1) */
  tracesSampleRate?: number
  /** 错误采样率 (0-1) */
  sampleRate?: number
  /** 会话重放采样率 (0-1) */
  replaysSessionSampleRate?: number
  /** 错误时重放采样率 (0-1) */
  replaysOnErrorSampleRate?: number
  /** 是否启用 */
  enabled?: boolean
  /** 忽略的错误 */
  ignoreErrors?: Array<string | RegExp>
  /** 忽略的 URL */
  denyUrls?: Array<string | RegExp>
  /** 自定义标签 */
  tags?: Record<string, string>
}

/**
 * 初始化 Sentry
 */
export function initSentry(app: App, router: Router, config: SentryConfig) {
  if (!config.enabled || !config.dsn) {
    console.warn('[Sentry] 未启用或未配置 DSN')
    return
  }

  try {
    initializeSentry(app, router, config)
    setupUserContext()
    setupAppContext(config)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Sentry] 初始化成功')
    }
  }
  catch (error) {
    console.error('[Sentry] 初始化失败:', error)
  }
}

/**
 * 初始化 Sentry SDK
 */
function initializeSentry(app: App, router: Router, config: SentryConfig) {
  Sentry.init({
    app,
    dsn: config.dsn,

    // 环境配置
    environment: config.environment || import.meta.env.MODE,
    release: config.release || import.meta.env.VITE_APP_VERSION || '1.0.0',

    // 集成
    integrations: [
      // 浏览器追踪 - 自动追踪路由和 HTTP 请求
      Sentry.browserTracingIntegration({
        router,
        enableInp: true, // 启用 INP 追踪
      }),

      // 会话重放 - 记录用户操作以便调试
      Sentry.replayIntegration({
        maskAllText: true, // 隐藏所有文本
        blockAllMedia: true, // 阻止所有媒体
        maskAllInputs: true, // 隐藏所有输入
      }),

      // 面包屑集成 - 记录用户操作路径
      Sentry.breadcrumbsIntegration({
        console: true, // 记录 console 日志
        dom: true, // 记录 DOM 事件
        fetch: true, // 记录 fetch 请求
        history: true, // 记录路由变化
        xhr: true, // 记录 XHR 请求
      }),
    ],

    // 采样率配置
    tracesSampleRate: config.tracesSampleRate ?? (import.meta.env.PROD ? 0.1 : 1.0),
    sampleRate: config.sampleRate ?? 1.0,
    replaysSessionSampleRate: config.replaysSessionSampleRate ?? (import.meta.env.PROD ? 0.1 : 0),
    replaysOnErrorSampleRate: config.replaysOnErrorSampleRate ?? (import.meta.env.PROD ? 1.0 : 0),

    // 忽略的错误
    ignoreErrors: config.ignoreErrors || [],

    // 忽略的 URL
    denyUrls: config.denyUrls || [],

    // 在发送前处理事件
    beforeSend(event, hint) {
      // 开发环境打印到控制台
      if (import.meta.env.DEV) {
        console.error('[Sentry Event]', event, hint)
        return null // 开发环境不发送
      }

      // 过滤敏感信息
      sanitizeEvent(event)

      return event
    },

    // 在发送前处理事务
    beforeSendTransaction(event) {
      // 开发环境不发送性能数据
      if (import.meta.env.DEV) {
        return null
      }
      return event
    },

    // 性能监控配置
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/[^/]*\.yourdomain\.com/,
    ],

    // 最大面包屑数量
    maxBreadcrumbs: 50,

    // 附加堆栈跟踪
    attachStacktrace: true,

  })
}

/**
 * 设置用户上下文
 */
function setupUserContext() {
  try {
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')

    if (userId) {
      Sentry.setUser({
        id: userId,
        username: username || undefined,
        email: email || undefined,
      })
    }
  }
  catch (error) {
    console.warn('[Sentry] 无法设置用户上下文:', error)
  }
}

/**
 * 设置应用上下文
 */
function setupAppContext(config: SentryConfig) {
  // 设置自定义标签
  if (config.tags) {
    Object.entries(config.tags).forEach(([key, value]) => {
      Sentry.setTag(key, value)
    })
  }

  // 设置应用信息
  Sentry.setContext('app', {
    name: import.meta.env.VITE_APP_NAME || 'Vue App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  })

  // 设置浏览器信息
  Sentry.setContext('browser', {
    name: navigator.userAgent,
    language: navigator.language,
    online: navigator.onLine,
  })

  // 设置设备信息
  Sentry.setContext('device', {
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio,
  })
}

/**
 * 清理敏感信息
 */
function sanitizeEvent(event: Sentry.Event) {
  // 移除敏感的请求信息
  if (event.request) {
    delete event.request.cookies
    if (event.request.headers) {
      delete event.request.headers.Authorization
      delete event.request.headers.Cookie
      delete event.request.headers['X-Auth-Token']
    }
  }

  // 移除敏感的额外数据
  if (event.extra) {
    delete event.extra.password
    delete event.extra.token
    delete event.extra.secret
  }
}

/**
 * 手动捕获错误
 */
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: context ? { custom: context } : undefined,
  })
}

/**
 * 手动捕获消息
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level)
}

/**
 * 设置用户信息
 */
export function setUser(user: { id: string, username?: string, email?: string }) {
  Sentry.setUser(user)
}

/**
 * 清除用户信息
 */
export function clearUser() {
  Sentry.setUser(null)
}

/**
 * 添加面包屑
 */
export function addBreadcrumb(breadcrumb: {
  message: string
  category?: string
  level?: Sentry.SeverityLevel
  data?: Record<string, any>
}) {
  Sentry.addBreadcrumb(breadcrumb)
}

/**
 * 开始性能追踪 Span
 * 注意: startTransaction 已废弃，使用 startSpan 替代
 */
export async function startSpan<T>(
  context: { name: string, op: string },
  callback: () => T | Promise<T>,
): Promise<T> {
  return await Sentry.startSpan(context, callback)
}

/**
 * 记录性能指标
 */
export function recordMetric(
  name: string,
  value: number,
  unit: 'millisecond' | 'second' | 'byte' | 'none' = 'millisecond',
) {
  Sentry.metrics.distribution(name, value, { unit })
}

/**
 * 导出 Sentry 实例
 */
export { Sentry }
