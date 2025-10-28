/**
 * 表格通用 Composable
 * 处理表格数据加载、分页、排序、筛选等逻辑
 */

import type { Ref } from 'vue'
import { computed, reactive, ref } from 'vue'

export interface UseTableOptions<T = any> {
  /** 数据加载函数 */
  api: (params: any) => Promise<{ data: { list: T[], total: number } }>
  /** 初始页码 */
  initialPage?: number
  /** 初始每页大小 */
  initialPageSize?: number
  /** 是否立即加载 */
  immediate?: boolean
  /** 额外的查询参数 */
  extraParams?: Record<string, any>
}

export function useTable<T = any>(options: UseTableOptions<T>) {
  const {
    api,
    initialPage = 1,
    initialPageSize = 10,
    immediate = true,
    extraParams = {},
  } = options

  // 数据
  const dataSource = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const total = ref(0)

  // 分页
  const pagination = reactive({
    current: initialPage,
    pageSize: initialPageSize,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
  })

  // 查询参数
  const queryParams = ref<Record<string, any>>({})

  // 排序
  const sorter = ref<{ field: string, order: string } | null>(null)

  // 加载数据
  const loadData = async () => {
    loading.value = true
    try {
      const params = {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        ...queryParams.value,
        ...extraParams,
        ...(sorter.value
          ? {
              sortField: sorter.value.field,
              sortOrder: sorter.value.order,
            }
          : {}),
      }

      const response = await api(params)
      dataSource.value = response.data.list
      total.value = response.data.total
      pagination.total = response.data.total
    }
    catch (error) {
      console.error('Failed to load table data:', error)
      dataSource.value = []
      total.value = 0
      pagination.total = 0
    }
    finally {
      loading.value = false
    }
  }

  // 刷新（保持当前页）
  const refresh = () => {
    loadData()
  }

  // 重置（回到第一页）
  const reset = () => {
    pagination.current = 1
    queryParams.value = {}
    sorter.value = null
    loadData()
  }

  // 搜索
  const search = (params: Record<string, any>) => {
    pagination.current = 1
    queryParams.value = params
    loadData()
  }

  // 分页变化
  const handlePageChange = (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    loadData()
  }

  // 排序变化
  const handleSortChange = (field: string, order: string) => {
    sorter.value = order ? { field, order } : null
    loadData()
  }

  // 是否为空
  const isEmpty = computed(() => dataSource.value.length === 0 && !loading.value)

  // 立即加载
  if (immediate) {
    loadData()
  }

  return {
    // 数据
    dataSource,
    loading,
    total,
    isEmpty,

    // 分页
    pagination,

    // 方法
    loadData,
    refresh,
    reset,
    search,
    handlePageChange,
    handleSortChange,
  }
}
