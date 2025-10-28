/**
 * 监控模块
 * 集成 Sentry 错误追踪 + Web Vitals 性能监控
 */
import type { UserModule } from '~/types'
import { sendWebVitalsToSentry } from '~/lib/monitoring/integration'
import { initSentry } from '~/lib/monitoring/sentry'
import { initWebVitals } from '~/lib/monitoring/web-vitals'

export const install: UserModule = ({ app, router }) => {
  // 检查是否启用监控
  const sentryEnabled = import.meta.env.VITE_SENTRY_ENABLED !== 'false'
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN || ''

  // 1. 初始化 Sentry 错误追踪
  if (sentryEnabled && sentryDsn) {
    initSentry(app, router, {
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',

      // 性能监控采样率
      // 生产环境: 10% 的请求被追踪（降低成本）
      // 开发环境: 100% 的请求被追踪（便于调试）
      tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

      enabled: true,

      // 忽略常见的非关键错误
      ignoreErrors: [
        // 用户操作取消
        'User cancelled',
        'user denied',
        'AbortError',
        // 第三方脚本错误
        /^Script error\.?$/,
        // 浏览器扩展错误
        'ResizeObserver loop',
      ],

      // 自定义标签（用于过滤和分组）
      tags: {
        platform: 'web',
        framework: 'vue3',
      },
    })
  }
  else {
    console.warn('[Monitoring] Sentry 未启用或未配置 DSN')
  }

  // 2. 初始化 Web Vitals 性能监控
  initWebVitals({
    enabled: true,
    debug: import.meta.env.DEV,

    // 将性能指标发送到 Sentry
    onReport: (metric) => {
      if (sentryEnabled && sentryDsn) {
        sendWebVitalsToSentry(metric)
      }
    },
  })
}
