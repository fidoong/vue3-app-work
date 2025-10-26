/**
 * 加载状态管理
 */

import type { Ref } from 'vue'

export interface UseLoadingOptions {
  /** 初始加载状态 */
  initialValue?: boolean
  /** 加载延迟（毫秒） */
  delay?: number
}

export interface UseLoadingReturn {
  /** 加载状态 */
  loading: Ref<boolean>
  /** 开始加载 */
  startLoading: () => void
  /** 停止加载 */
  stopLoading: () => void
  /** 切换加载状态 */
  toggleLoading: () => void
  /** 包装异步函数，自动管理加载状态 */
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

/**
 * 加载状态管理 Hook
 */
export function useLoading(options: UseLoadingOptions = {}): UseLoadingReturn {
  const { initialValue = false, delay = 0 } = options

  const loading = ref(initialValue)
  let timer: ReturnType<typeof setTimeout> | null = null

  /**
   * 开始加载
   */
  function startLoading() {
    if (delay > 0) {
      timer = setTimeout(() => {
        loading.value = true
      }, delay)
    }
    else {
      loading.value = true
    }
  }

  /**
   * 停止加载
   */
  function stopLoading() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    loading.value = false
  }

  /**
   * 切换加载状态
   */
  function toggleLoading() {
    if (loading.value) {
      stopLoading()
    }
    else {
      startLoading()
    }
  }

  /**
   * 包装异步函数，自动管理加载状态
   */
  async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    startLoading()
    try {
      return await fn()
    }
    finally {
      stopLoading()
    }
  }

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    withLoading,
  }
}
