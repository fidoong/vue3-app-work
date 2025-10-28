/**
 * 监控配置
 * 统一管理 Sentry 和 Web Vitals 的配置
 */

/**
 * Sentry 配置
 */
export const sentryConfig = {
  // 从环境变量读取
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  enabled: import.meta.env.VITE_SENTRY_ENABLED !== 'false',

  // 环境信息
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // 采样率配置
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 性能追踪采样率
  sampleRate: 1.0, // 错误采样率
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0, // 会话重放采样率
  replaysOnErrorSampleRate: import.meta.env.PROD ? 1.0 : 0, // 错误时重放采样率

  // 忽略的错误模式
  ignoreErrors: [
    // 用户操作
    'User cancelled',
    'user denied',
    'AbortError',
    'cancelled',

    // 网络错误
    'Network Error',
    'NetworkError',
    'Failed to fetch',
    'timeout',

    // 浏览器扩展
    'ResizeObserver loop',
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',

    // 第三方脚本
    /^Script error\.?$/,
    /Loading chunk \d+ failed/,
  ],

  // 忽略的 URL
  denyUrls: [
    // 浏览器扩展
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
    /^safari-extension:\/\//i,
  ],

  // 自定义标签
  tags: {
    platform: 'web',
    framework: 'vue3',
  },
} as const

/**
 * Web Vitals 配置
 */
export const webVitalsConfig = {
  enabled: true,
  debug: import.meta.env.DEV,

  // 性能指标阈值（参考 Google 标准）
  thresholds: {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 200, poor: 500 },
    TTFB: { good: 800, poor: 1800 },
  },

  // 是否上报到后端
  reportToBackend: import.meta.env.PROD,
  backendUrl: '/api/analytics/web-vitals',
} as const

/**
 * 监控功能开关
 */
export const monitoringFeatures = {
  // 错误追踪
  errorTracking: sentryConfig.enabled && !!sentryConfig.dsn,

  // 性能监控
  performanceMonitoring: sentryConfig.enabled && !!sentryConfig.dsn,

  // Web Vitals
  webVitals: webVitalsConfig.enabled,

  // 会话重放
  sessionReplay: import.meta.env.PROD && sentryConfig.enabled,

  // 面包屑记录
  breadcrumbs: true,

  // 用户反馈
  userFeedback: import.meta.env.PROD,
} as const
