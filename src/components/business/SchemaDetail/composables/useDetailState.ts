/**
 * 详情状态管理
 */

import type { Ref } from 'vue'

export interface UseDetailStateOptions {
  /** 初始数据 */
  initialData?: Record<string, any>
}

export interface UseDetailStateReturn {
  /** 数据 */
  data: Ref<Record<string, any>>
  /** 刷新数据 */
  refresh: () => void
  /** 获取数据 */
  getData: () => Record<string, any>
  /** 设置数据 */
  setData: (newData: Record<string, any>) => void
}

/**
 * 详情状态管理
 */
export function useDetailState(options: UseDetailStateOptions = {}): UseDetailStateReturn {
  const data = ref<Record<string, any>>(options.initialData || {})

  /**
   * 刷新数据
   */
  function refresh() {
    // 可以在这里触发数据重新加载
    // 如果有 API 调用，可以在这里实现
  }

  /**
   * 获取数据
   */
  function getData() {
    return data.value
  }

  /**
   * 设置数据
   */
  function setData(newData: Record<string, any>) {
    data.value = newData
  }

  return {
    data,
    refresh,
    getData,
    setData,
  }
}
