/**
 * Sentry + Web Vitals 集成
 * 将 Web Vitals 数据发送到 Sentry
 */
import type { Metric } from 'web-vitals'
import * as Sentry from '@sentry/vue'

/**
 * 将 Web Vitals 指标发送到 Sentry
 */
export function sendWebVitalsToSentry(metric: Metric) {
  // 只在生产环境发送
  if (!import.meta.env.PROD) {
    return
  }

  try {
    // 使用新的 Sentry API 记录性能指标
    Sentry.metrics.distribution(
      `web-vitals.${metric.name.toLowerCase()}`,
      metric.value,
      {
        unit: getUnit(metric.name),
      },
    )

    // 设置标签
    Sentry.setTag('web-vitals.rating', metric.rating)
    Sentry.setTag('web-vitals.navigationType', metric.navigationType)

    // 添加面包屑记录
    Sentry.addBreadcrumb({
      category: 'web-vitals',
      message: `${metric.name}: ${metric.value}`,
      level: metric.rating === 'poor' ? 'warning' : 'info',
      data: {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      },
    })

    // 如果指标评级为 poor，记录为警告事件
    if (metric.rating === 'poor') {
      Sentry.captureMessage(
        `Poor Web Vitals: ${metric.name} = ${formatValue(metric)}`,
        'warning',
      )
    }
  }
  catch (error) {
    console.error('[Sentry Integration] Failed to send Web Vitals:', error)
  }
}

/**
 * 格式化指标值
 */
function formatValue(metric: Metric): string {
  const value = metric.value
  switch (metric.name) {
    case 'CLS':
      return value.toFixed(3)
    case 'FCP':
    case 'LCP':
    case 'INP':
    case 'TTFB':
      return `${Math.round(value)}ms`
    default:
      return String(value)
  }
}

/**
 * 获取指标单位
 */
function getUnit(metricName: string): string {
  switch (metricName) {
    case 'CLS':
      return ''
    case 'FCP':
    case 'LCP':
    case 'INP':
    case 'TTFB':
      return 'millisecond'
    default:
      return ''
  }
}

/**
 * 集成 HTTP 客户端
 * 自动追踪 API 请求到 Sentry
 */
export function integrateHttpClient() {
  // 这个函数会在 HTTP 客户端配置中调用
  // 参考 src/lib/http/clients/index.ts
}
