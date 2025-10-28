/**
 * ErrorBoundary Composable
 */
import type { ErrorBoundaryProps, ErrorInfo } from '../types'
import { captureError } from '~/lib/monitoring'

export function useErrorBoundary(
  props: ErrorBoundaryProps,
  emit: (event: string, ...args: any[]) => void,
) {
  const errorInfo = ref<ErrorInfo | null>(null)
  const retryCount = ref(0)

  /**
   * 捕获错误
   */
  function captureErrorHandler(err: Error, instance: any, info: string) {
    const error: ErrorInfo = {
      error: err,
      componentName: instance?.$options?.name || instance?.$?.type?.name || 'Unknown',
      info,
      timestamp: Date.now(),
      level: props.level || 'error',
    }

    errorInfo.value = error
    emit('error', error)

    // 自动上报错误
    if (props.autoReport !== false) {
      captureError(err, {
        location: 'ErrorBoundary',
        componentName: error.componentName,
        errorInfo: info,
        retryCount: retryCount.value,
      })
    }

    // 阻止错误继续传播
    return false
  }

  /**
   * 重试
   */
  function retry() {
    if (props.maxRetries && retryCount.value >= props.maxRetries) {
      console.warn('[ErrorBoundary] 已达到最大重试次数')
      return
    }

    retryCount.value++
    emit('retry', retryCount.value)
    clearError()
  }

  /**
   * 清除错误
   */
  function clearError() {
    errorInfo.value = null
    emit('recover')
  }

  /**
   * 获取错误信息
   */
  function getErrorInfo() {
    return errorInfo.value
  }

  /**
   * 获取重试次数
   */
  function getRetryCount() {
    return retryCount.value
  }

  /**
   * 是否可以重试
   */
  const canRetry = computed(() => {
    if (!props.showRetry)
      return false
    if (!props.maxRetries)
      return true
    return retryCount.value < props.maxRetries
  })

  /**
   * 是否显示详情
   */
  const shouldShowDetails = computed(() => {
    return props.showDetails ?? import.meta.env.DEV
  })

  return {
    errorInfo,
    retryCount,
    captureErrorHandler,
    retry,
    clearError,
    getErrorInfo,
    getRetryCount,
    canRetry,
    shouldShowDetails,
  }
}
