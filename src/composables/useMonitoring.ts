import type { SeverityLevel } from '@sentry/vue'
import type { BreadcrumbData, UserInfo } from '~/lib/monitoring/types'
/**
 * 监控 Composable
 * 在 Vue 组件中使用监控功能
 */
import {
  addBreadcrumb,
  captureError,
  captureMessage,
  clearUser,
  recordMetric,
  setUser,
  startSpan,
} from '~/lib/monitoring'

export function useMonitoring() {
  /**
   * 捕获错误
   */
  const trackError = (error: Error, context?: Record<string, any>) => {
    captureError(error, context)
  }

  /**
   * 记录消息
   */
  const trackMessage = (message: string, level: SeverityLevel = 'info') => {
    captureMessage(message, level)
  }

  /**
   * 设置用户信息
   */
  const trackUser = (user: UserInfo) => {
    setUser(user)
  }

  /**
   * 清除用户信息
   */
  const clearUserTracking = () => {
    clearUser()
  }

  /**
   * 添加面包屑
   */
  const trackBreadcrumb = (breadcrumb: BreadcrumbData) => {
    addBreadcrumb(breadcrumb)
  }

  /**
   * 追踪异步操作性能
   */
  const trackPerformance = async <T>(
    name: string,
    operation: () => Promise<T>,
    op = 'function',
  ): Promise<T> => {
    return await startSpan({ name, op }, operation)
  }

  /**
   * 记录性能指标
   */
  const trackMetric = (
    name: string,
    value: number,
    unit: 'millisecond' | 'second' | 'byte' | 'none' = 'millisecond',
  ) => {
    recordMetric(name, value, unit)
  }

  /**
   * 追踪用户操作
   */
  const trackAction = (action: string, data?: Record<string, any>) => {
    addBreadcrumb({
      message: action,
      category: 'user-action',
      level: 'info',
      data,
    })
  }

  /**
   * 追踪 API 调用
   */
  const trackApiCall = async <T>(
    endpoint: string,
    operation: () => Promise<T>,
  ): Promise<T> => {
    const startTime = performance.now()

    try {
      const result = await startSpan(
        { name: `API: ${endpoint}`, op: 'http' },
        operation,
      )

      const duration = performance.now() - startTime
      recordMetric(`api.${endpoint}`, duration, 'millisecond')

      return result
    }
    catch (error) {
      captureError(error as Error, {
        endpoint,
        duration: performance.now() - startTime,
      })
      throw error
    }
  }

  /**
   * 追踪组件渲染性能
   */
  const trackComponentRender = (componentName: string, duration: number) => {
    recordMetric(`component.render.${componentName}`, duration, 'millisecond')

    if (duration > 100) {
      addBreadcrumb({
        message: `Slow component render: ${componentName}`,
        category: 'performance',
        level: 'warning',
        data: { duration },
      })
    }
  }

  return {
    // 错误追踪
    trackError,
    trackMessage,

    // 用户追踪
    trackUser,
    clearUserTracking,

    // 面包屑
    trackBreadcrumb,
    trackAction,

    // 性能追踪
    trackPerformance,
    trackMetric,
    trackApiCall,
    trackComponentRender,
  }
}
