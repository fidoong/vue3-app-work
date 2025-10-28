/**
 * PerformanceMonitor 测试
 */

import { describe, expect, it, vi } from 'vitest'
import { PerformanceMonitor } from '~/lib/performance'

describe('performanceMonitor', () => {
  it('should track API call correctly', () => {
    const handler = vi.fn()
    PerformanceMonitor.registerHandler(handler)

    PerformanceMonitor.trackApiCall('/api/users', 'GET', 150, 200)

    expect(handler).toHaveBeenCalled()
    const metric = handler.mock.calls[0][0]
    expect(metric.name).toBe('api.request')
    expect(metric.value).toBe(150)
    expect(metric.unit).toBe('ms')
    expect(metric.meta?.url).toBe('/api/users')
    expect(metric.meta?.method).toBe('GET')
    expect(metric.meta?.status).toBe(200)

    PerformanceMonitor.removeHandler(handler)
  })

  it('should track component render correctly', () => {
    const handler = vi.fn()
    PerformanceMonitor.registerHandler(handler)

    PerformanceMonitor.trackComponentRender('TestComponent', 50)

    expect(handler).toHaveBeenCalled()
    const metric = handler.mock.calls[0][0]
    expect(metric.name).toBe('component.render')
    expect(metric.value).toBe(50)
    expect(metric.meta?.component).toBe('TestComponent')

    PerformanceMonitor.removeHandler(handler)
  })

  it('should get API stats correctly', () => {
    PerformanceMonitor.clear()

    PerformanceMonitor.trackApiCall('/api/users', 'GET', 100, 200)
    PerformanceMonitor.trackApiCall('/api/posts', 'GET', 200, 200)
    PerformanceMonitor.trackApiCall('/api/error', 'GET', 150, 500)

    const stats = PerformanceMonitor.getApiStats()

    expect(stats).toBeDefined()
    expect(stats?.total).toBe(3)
    expect(stats?.success).toBe(2)
    expect(stats?.failed).toBe(1)
    expect(stats?.avgDuration).toBe(150)
    expect(stats?.minDuration).toBe(100)
    expect(stats?.maxDuration).toBe(200)

    PerformanceMonitor.clear()
  })

  it('should not track when disabled', () => {
    const handler = vi.fn()
    PerformanceMonitor.registerHandler(handler)

    PerformanceMonitor.disable()
    PerformanceMonitor.trackApiCall('/api/test', 'GET', 100, 200)

    expect(handler).not.toHaveBeenCalled()

    PerformanceMonitor.enable()
    PerformanceMonitor.removeHandler(handler)
  })
})
