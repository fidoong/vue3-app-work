/**
 * 性能监控器
 * 监控页面加载、API 请求、组件渲染等性能指标
 */

import type {
  ApiMetrics,
  ComponentMetrics,
  MetricHandler,
  PageLoadMetrics,
  PerformanceMetric,
  ResourceMetrics,
} from './types'

class PerformanceMonitorClass {
  private handlers: MetricHandler[] = []
  private enabled = true
  private apiMetrics: ApiMetrics[] = []
  private componentMetrics: ComponentMetrics[] = []

  /**
   * 注册指标处理器
   */
  registerHandler(handler: MetricHandler) {
    this.handlers.push(handler)
  }

  /**
   * 移除指标处理器
   */
  removeHandler(handler: MetricHandler) {
    const index = this.handlers.indexOf(handler)
    if (index > -1) {
      this.handlers.splice(index, 1)
    }
  }

  /**
   * 启用性能监控
   */
  enable() {
    this.enabled = true
  }

  /**
   * 禁用性能监控
   */
  disable() {
    this.enabled = false
  }

  /**
   * 记录指标
   */
  private recordMetric(metric: PerformanceMetric) {
    if (!this.enabled)
      return

    this.handlers.forEach((handler) => {
      try {
        handler(metric)
      }
      catch (err) {
        console.error('Metric handler failed:', err)
      }
    })
  }

  /**
   * 追踪页面加载性能
   */
  trackPageLoad(): PageLoadMetrics | null {
    if (!this.enabled || typeof window === 'undefined')
      return null

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')

      const metrics: PageLoadMetrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        domParse: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        resourceLoad: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      }

      // 记录各项指标
      Object.entries(metrics).forEach(([name, value]) => {
        this.recordMetric({
          name: `page.${name}`,
          value,
          unit: 'ms',
          timestamp: Date.now(),
        })
      })

      return metrics
    }
    catch (err) {
      console.error('Failed to track page load:', err)
      return null
    }
  }

  /**
   * 追踪 API 请求性能
   */
  trackApiCall(url: string, method: string, duration: number, status: number, size?: number) {
    if (!this.enabled)
      return

    const metrics: ApiMetrics = {
      url,
      method,
      duration,
      status,
      size,
      success: status >= 200 && status < 300,
      timestamp: Date.now(),
    }

    this.apiMetrics.push(metrics)

    this.recordMetric({
      name: 'api.request',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      meta: { url, method, status },
    })

    // 保留最近 100 条记录
    if (this.apiMetrics.length > 100) {
      this.apiMetrics.shift()
    }
  }

  /**
   * 追踪组件渲染性能
   */
  trackComponentRender(name: string, duration: number) {
    if (!this.enabled)
      return

    const existing = this.componentMetrics.find(m => m.name === name)
    if (existing) {
      existing.renderTime = duration
      existing.updateCount++
      existing.timestamp = Date.now()
    }
    else {
      this.componentMetrics.push({
        name,
        renderTime: duration,
        updateCount: 1,
        timestamp: Date.now(),
      })
    }

    this.recordMetric({
      name: 'component.render',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      meta: { component: name },
    })
  }

  /**
   * 追踪资源加载性能
   */
  trackResourceLoad() {
    if (!this.enabled || typeof window === 'undefined')
      return

    try {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

      resources.forEach((resource) => {
        const metrics: ResourceMetrics = {
          name: resource.name,
          type: resource.initiatorType,
          size: resource.transferSize || 0,
          duration: resource.duration,
          timestamp: Date.now(),
        }

        this.recordMetric({
          name: 'resource.load',
          value: metrics.duration,
          unit: 'ms',
          timestamp: Date.now(),
          meta: {
            name: metrics.name,
            type: metrics.type,
            size: metrics.size,
          },
        })
      })
    }
    catch (err) {
      console.error('Failed to track resource load:', err)
    }
  }

  /**
   * 获取 API 性能统计
   */
  getApiStats() {
    if (this.apiMetrics.length === 0) {
      return null
    }

    const durations = this.apiMetrics.map(m => m.duration)
    const successCount = this.apiMetrics.filter(m => m.success).length

    return {
      total: this.apiMetrics.length,
      success: successCount,
      failed: this.apiMetrics.length - successCount,
      avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
    }
  }

  /**
   * 获取组件性能统计
   */
  getComponentStats() {
    return this.componentMetrics.map(m => ({
      name: m.name,
      renderTime: m.renderTime,
      updateCount: m.updateCount,
      avgRenderTime: m.renderTime / m.updateCount,
    }))
  }

  /**
   * 清空统计数据
   */
  clear() {
    this.apiMetrics = []
    this.componentMetrics = []
  }

  /**
   * 创建性能标记
   */
  mark(name: string) {
    if (!this.enabled || typeof window === 'undefined')
      return

    try {
      performance.mark(name)
    }
    catch (err) {
      console.error('Failed to create performance mark:', err)
    }
  }

  /**
   * 测量性能
   */
  measure(name: string, startMark: string, endMark?: string) {
    if (!this.enabled || typeof window === 'undefined')
      return 0

    try {
      if (endMark) {
        performance.measure(name, startMark, endMark)
      }
      else {
        performance.measure(name, startMark)
      }

      const measure = performance.getEntriesByName(name)[0]
      const duration = measure?.duration || 0

      this.recordMetric({
        name,
        value: duration,
        unit: 'ms',
        timestamp: Date.now(),
      })

      return duration
    }
    catch (err) {
      console.error('Failed to measure performance:', err)
      return 0
    }
  }
}

export const PerformanceMonitor = new PerformanceMonitorClass()

// 默认控制台处理器（仅在开发环境）
if (import.meta.env.DEV) {
  PerformanceMonitor.registerHandler((metric) => {
    if (metric.value > 1000) {
      // 超过 1 秒的操作警告
      console.warn(`[Performance] ${metric.name}: ${metric.value}${metric.unit}`, metric.meta)
    }
  })
}

// 页面加载完成后自动追踪
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      PerformanceMonitor.trackPageLoad()
      PerformanceMonitor.trackResourceLoad()
    }, 0)
  })
}
