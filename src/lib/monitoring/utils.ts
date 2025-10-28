/**
 * 监控工具函数
 */
import type { Metric } from 'web-vitals'
import type { PerformanceRating } from './types'

/**
 * 判断是否为生产环境
 */
export function isProduction(): boolean {
  return import.meta.env.PROD
}

/**
 * 判断是否为开发环境
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV
}

/**
 * 获取性能评级
 */
export function getPerformanceRating(metric: Metric): PerformanceRating {
  return metric.rating
}

/**
 * 格式化性能指标值
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
 * 获取性能指标单位
 */
export function getMetricUnit(metricName: string): string {
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
 * 判断性能指标是否良好
 */
export function isGoodPerformance(metric: Metric): boolean {
  return metric.rating === 'good'
}

/**
 * 判断性能指标是否需要改进
 */
export function needsImprovement(metric: Metric): boolean {
  return metric.rating === 'needs-improvement'
}

/**
 * 判断性能指标是否较差
 */
export function isPoorPerformance(metric: Metric): boolean {
  return metric.rating === 'poor'
}

/**
 * 获取性能评级颜色
 */
export function getPerformanceColor(rating: PerformanceRating): string {
  switch (rating) {
    case 'good':
      return '#0cce6b'
    case 'needs-improvement':
      return '#ffa400'
    case 'poor':
      return '#ff4e42'
    default:
      return '#999'
  }
}

/**
 * 获取性能评级文本
 */
export function getPerformanceText(rating: PerformanceRating): string {
  switch (rating) {
    case 'good':
      return '良好'
    case 'needs-improvement':
      return '需要改进'
    case 'poor':
      return '较差'
    default:
      return '未知'
  }
}

/**
 * 创建性能报告
 */
export function createPerformanceReport(metrics: Metric[]): {
  good: number
  needsImprovement: number
  poor: number
  total: number
  score: number
} {
  const good = metrics.filter(m => m.rating === 'good').length
  const needsImprovement = metrics.filter(m => m.rating === 'needs-improvement').length
  const poor = metrics.filter(m => m.rating === 'poor').length
  const total = metrics.length

  // 计算性能分数 (0-100)
  const score = total > 0
    ? Math.round((good * 100 + needsImprovement * 50) / total)
    : 0

  return {
    good,
    needsImprovement,
    poor,
    total,
    score,
  }
}

/**
 * 安全地执行监控操作
 */
export function safeMonitoring<T>(
  fn: () => T,
  fallback?: T,
): T | undefined {
  try {
    return fn()
  }
  catch (error) {
    console.error('[Monitoring] Error:', error)
    return fallback
  }
}

/**
 * 延迟执行（用于避免阻塞主线程）
 */
export function deferMonitoring(fn: () => void, delay = 0): void {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => fn(), { timeout: delay || 1000 })
  }
  else {
    setTimeout(fn, delay)
  }
}
