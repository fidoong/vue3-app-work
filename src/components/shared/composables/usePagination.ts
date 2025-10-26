/**
 * 分页管理
 */

import type { Ref } from 'vue'
import type { PaginationConfig } from '../types'

export interface UsePaginationOptions {
  /** 初始页码 */
  initialPage?: number
  /** 初始每页条数 */
  initialPageSize?: number
  /** 总条数 */
  total?: Ref<number> | number
  /** 页码变化回调 */
  onPageChange?: (page: number, pageSize: number) => void
}

export interface UsePaginationReturn {
  /** 当前页 */
  current: Ref<number>
  /** 每页条数 */
  pageSize: Ref<number>
  /** 总条数 */
  total: Ref<number>
  /** 总页数 */
  totalPages: Ref<number>
  /** 分页配置 */
  pagination: Ref<PaginationConfig>
  /** 设置当前页 */
  setPage: (page: number) => void
  /** 设置每页条数 */
  setPageSize: (size: number) => void
  /** 设置总条数 */
  setTotal: (total: number) => void
  /** 重置到第一页 */
  reset: () => void
  /** 上一页 */
  prev: () => void
  /** 下一页 */
  next: () => void
  /** 跳转到指定页 */
  goto: (page: number) => void
}

/**
 * 分页管理 Hook
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    total: totalOption = 0,
    onPageChange,
  } = options

  const current = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const total = ref(isRef(totalOption) ? totalOption.value : totalOption)

  // 监听外部 total 变化
  if (isRef(totalOption)) {
    watch(totalOption, (newTotal) => {
      total.value = newTotal
    })
  }

  /**
   * 总页数
   */
  const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  /**
   * 分页配置
   */
  const pagination = computed<PaginationConfig>(() => ({
    current: current.value,
    pageSize: pageSize.value,
    total: total.value,
    showTotal: (total: number) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }))

  /**
   * 设置当前页
   */
  function setPage(page: number) {
    const validPage = Math.max(1, Math.min(page, totalPages.value))
    if (current.value !== validPage) {
      current.value = validPage
      onPageChange?.(current.value, pageSize.value)
    }
  }

  /**
   * 设置每页条数
   */
  function setPageSize(size: number) {
    pageSize.value = size
    // 重新计算当前页，确保不超出范围
    const maxPage = Math.ceil(total.value / size)
    if (current.value > maxPage) {
      current.value = Math.max(1, maxPage)
    }
    onPageChange?.(current.value, pageSize.value)
  }

  /**
   * 设置总条数
   */
  function setTotal(newTotal: number) {
    total.value = newTotal
    // 如果当前页超出范围，重置到最后一页
    if (current.value > totalPages.value) {
      current.value = Math.max(1, totalPages.value)
    }
  }

  /**
   * 重置到第一页
   */
  function reset() {
    setPage(1)
  }

  /**
   * 上一页
   */
  function prev() {
    if (current.value > 1) {
      setPage(current.value - 1)
    }
  }

  /**
   * 下一页
   */
  function next() {
    if (current.value < totalPages.value) {
      setPage(current.value + 1)
    }
  }

  /**
   * 跳转到指定页
   */
  function goto(page: number) {
    setPage(page)
  }

  return {
    current,
    pageSize,
    total,
    totalPages,
    pagination,
    setPage,
    setPageSize,
    setTotal,
    reset,
    prev,
    next,
    goto,
  }
}
