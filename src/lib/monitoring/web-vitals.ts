import type { Metric } from 'web-vitals'
/**
 * Web Vitals 性能监控
 * Google 官方核心 Web 指标
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

export interface WebVitalsConfig {
  /** 是否启用 */
  enabled?: boolean
  /** 上报回调 */
  onReport?: (metric: Metric) => void
  /** 是否打印到控制台 */
  debug?: boolean
}

/**
 * 初始化 Web Vitals 监控
 */
export function initWebVitals(config: WebVitalsConfig = {}) {
  if (config.enabled === false) {
    console.warn('[Web Vitals] 未启用')
    return
  }

  try {
    const handleMetric = createMetricHandler(config)

    // 监控核心 Web Vitals 指标
    // 参考: https://web.dev/articles/vitals
    onCLS(handleMetric) // 累积布局偏移 (Cumulative Layout Shift)
    onFCP(handleMetric) // 首次内容绘制 (First Contentful Paint)
    onINP(handleMetric) // 交互到下一次绘制 (Interaction to Next Paint)
    onLCP(handleMetric) // 最大内容绘制 (Largest Contentful Paint)
    onTTFB(handleMetric) // 首字节时间 (Time to First Byte)

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Web Vitals] 初始化成功')
    }
  }
  catch (error) {
    console.error('[Web Vitals] 初始化失败:', error)
  }
}

/**
 * 创建指标处理器
 */
function createMetricHandler(config: WebVitalsConfig) {
  return (metric: Metric) => {
    try {
      // 打印到控制台（开发环境或调试模式）
      if (config.debug || import.meta.env.DEV) {
        logMetric(metric)
      }

      // 自定义上报回调
      if (config.onReport) {
        config.onReport(metric)
      }

      // 发送到分析服务
      sendToAnalytics(metric)
    }
    catch (error) {
      console.error('[Web Vitals] 处理指标失败:', error)
    }
  }
}

/**
 * 打印指标到控制台
 */
function logMetric(metric: Metric) {
  const emoji = getMetricEmoji(metric.rating)
  const value = formatMetricValue(metric)

  // eslint-disable-next-line no-console
  console.log(
    `${emoji} [Web Vitals] ${metric.name}: ${value}`,
    {
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    },
  )
}

/**
 * 获取指标对应的 emoji
 */
function getMetricEmoji(rating: string): string {
  switch (rating) {
    case 'good':
      return '✅'
    case 'needs-improvement':
      return '⚠️'
    case 'poor':
      return '❌'
    default:
      return 'ℹ️'
  }
}

/**
 * 发送到分析服务
 */
function sendToAnalytics(metric: Metric) {
  // 只在生产环境上报
  if (!import.meta.env.PROD) {
    return
  }

  // 方式 1: 发送到自己的后端 API
  sendToBackend(metric)

  // 方式 2: 发送到 Google Analytics（如果已集成）
  sendToGoogleAnalytics(metric)
}

/**
 * 发送到后端 API
 */
function sendToBackend(metric: Metric) {
  try {
    const payload = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      // 额外的上下文信息
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: getConnectionInfo(),
    }

    const body = JSON.stringify(payload)

    // 优先使用 sendBeacon（即使页面关闭也能发送）
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon('/api/analytics/web-vitals', body)
      if (!sent) {
        console.warn('[Web Vitals] sendBeacon 失败，使用 fetch 降级')
        sendViaFetch(body)
      }
    }
    else {
      sendViaFetch(body)
    }
  }
  catch (error) {
    console.error('[Web Vitals] 发送到后端失败:', error)
  }
}

/**
 * 使用 fetch 发送
 */
function sendViaFetch(body: string) {
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true, // 确保页面关闭时也能发送
  }).catch((error) => {
    console.error('[Web Vitals] fetch 发送失败:', error)
  })
}

/**
 * 发送到 Google Analytics
 */
function sendToGoogleAnalytics(metric: Metric) {
  try {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }
  catch (error) {
    console.error('[Web Vitals] 发送到 GA 失败:', error)
  }
}

/**
 * 获取网络连接信息
 */
function getConnectionInfo() {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection
    return {
      effectiveType: conn?.effectiveType,
      downlink: conn?.downlink,
      rtt: conn?.rtt,
      saveData: conn?.saveData,
    }
  }
  return undefined
}

/**
 * 获取性能评级
 */
export function getPerformanceRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  return metric.rating
}

/**
 * 格式化指标值
 */
export function formatMetricValue(metric: Metric): string {
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
 * 获取指标阈值
 * 参考: https://web.dev/articles/vitals
 */
export function getMetricThresholds(metricName: string): { good: number, poor: number } {
  const thresholds: Record<string, { good: number, poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 200, poor: 500 },
    TTFB: { good: 800, poor: 1800 },
  }

  return thresholds[metricName] || { good: 0, poor: 0 }
}
