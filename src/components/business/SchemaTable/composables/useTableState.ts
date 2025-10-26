/**
 * 表格状态管理
 */

import type { Ref } from 'vue'
import type { ApiResponse, QueryParams } from '../../../shared/types'
import { useLoading } from '../../../shared/composables'

export interface UseTableStateOptions<T = any> {
  /** API 函数 */
  api?: (params: QueryParams) => Promise<ApiResponse<T>>
  /** 初始参数 */
  initialParams?: Record<string, any>
}

export interface UseTableStateReturn<T = any> {
  /** 加载状态 */
  loading: Ref<boolean>
  /** 数据源 */
  dataSource: Ref<T[]>
  /** 总条数 */
  total: Ref<number>
  /** 查询参数 */
  params: Ref<QueryParams>
  /** 加载数据 */
  loadData: () => Promise<void>
  /** 刷新数据 */
  refresh: () => Promise<void>
  /** 重新加载 */
  reload: () => Promise<void>
  /** 重置 */
  reset: () => Promise<void>
  /** 设置参数 */
  setParams: (params: Record<string, any>) => void
  /** 清除参数 */
  clearParams: () => void
  /** 获取参数 */
  getParams: () => QueryParams
  /** 更新分页 */
  updatePagination: (page: number, pageSize: number) => void
  /** 更新排序 */
  updateSorter: (field?: string, order?: 'ascend' | 'descend' | null) => void
}

/**
 * 表格状态管理
 */
export function useTableState<T = any>(
  options: UseTableStateOptions<T> = {},
): UseTableStateReturn<T> {
  const { api, initialParams = {} } = options

  const { loading, withLoading } = useLoading()
  const dataSource = ref([] as T[])
  const total = ref(0)

  // 默认参数
  const defaultParams: QueryParams = {
    page: 1,
    pageSize: 10,
    ...initialParams,
  }

  const params = ref<QueryParams>({ ...defaultParams })

  /**
   * 加载数据
   */
  async function loadData() {
    if (!api) {
      return
    }

    await withLoading(async () => {
      const response = await api(params.value)
      dataSource.value = response.data || []
      total.value = response.total || 0

      // 更新分页信息
      if (response.page !== undefined) {
        params.value.page = response.page
      }
      if (response.pageSize !== undefined) {
        params.value.pageSize = response.pageSize
      }
    })
  }

  /**
   * 刷新数据（保持当前页和查询参数）
   */
  async function refresh() {
    await loadData()
  }

  /**
   * 重新加载（重置到第一页，保持查询参数）
   */
  async function reload() {
    params.value.page = 1
    await loadData()
  }

  /**
   * 重置（清除所有查询参数，恢复到初始状态）
   */
  async function reset() {
    params.value = { ...defaultParams }
    await loadData()
  }

  /**
   * 设置查询参数
   */
  function setParams(newParams: Record<string, any>) {
    params.value = {
      ...params.value,
      ...newParams,
      page: 1, // 重置到第一页
    }
  }

  /**
   * 清除查询参数（保留分页参数）
   */
  function clearParams() {
    params.value = {
      page: 1,
      pageSize: params.value.pageSize || 10,
    }
  }

  /**
   * 获取查询参数
   */
  function getParams(): QueryParams {
    return { ...params.value }
  }

  /**
   * 更新分页
   */
  function updatePagination(page: number, pageSize: number) {
    params.value.page = page
    params.value.pageSize = pageSize
  }

  /**
   * 更新排序
   */
  function updateSorter(field?: string, order?: 'ascend' | 'descend' | null) {
    params.value.sortField = field
    params.value.sortOrder = order
  }

  return {
    loading,
    dataSource: dataSource as Ref<T[]>,
    total,
    params,
    loadData,
    refresh,
    reload,
    reset,
    setParams,
    clearParams,
    getParams,
    updatePagination,
    updateSorter,
  }
}
