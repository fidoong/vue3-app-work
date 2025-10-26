/**
 * SchemaPage 核心逻辑
 */
import type { Ref } from 'vue'

export interface UseSchemaPageOptions {
  tableRef: Ref<any>
  searchFormRef: Ref<any>
  extraParams: Record<string, any>
}

export interface UseSchemaPageReturn {
  searchParams: Ref<Record<string, any>>
  tableParams: Ref<Record<string, any>>
  handleSearch: (values: Record<string, any>) => void
  handleRefresh: () => Promise<void>
  handleReload: () => Promise<void>
  handleReset: () => Promise<void>
  getData: () => any[]
  getSelectedRows: () => any[]
  clearSelection: () => void
  getSearchValues: () => Record<string, any>
  setSearchValues: (values: Record<string, any>) => void
}

export function useSchemaPage(
  options: UseSchemaPageOptions,
  emit: any,
): UseSchemaPageReturn {
  const { tableRef, searchFormRef, extraParams } = options

  const searchParams = ref<Record<string, any>>({})

  /**
   * 合并查询参数
   */
  const tableParams = computed(() => ({
    ...searchParams.value,
    ...extraParams,
  }))

  /**
   * 处理搜索
   */
  function handleSearch(values: Record<string, any>) {
    searchParams.value = { ...values }
    emit('search', values)
    tableRef.value?.reload()
  }

  /**
   * 刷新表格（保持当前页）
   */
  async function handleRefresh() {
    await tableRef.value?.refresh()
    emit('refresh')
  }

  /**
   * 重新加载（回到第一页）
   */
  async function handleReload() {
    await tableRef.value?.reload()
    emit('refresh')
  }

  /**
   * 重置搜索和表格
   */
  async function handleReset() {
    searchParams.value = {}
    await tableRef.value?.reset()
    emit('refresh')
  }

  /**
   * 获取表格数据
   */
  function getData(): any[] {
    return tableRef.value?.getData() || []
  }

  /**
   * 获取选中行
   */
  function getSelectedRows(): any[] {
    return tableRef.value?.getSelectedRows() || []
  }

  /**
   * 清空选中
   */
  function clearSelection() {
    tableRef.value?.clearSelection()
  }

  /**
   * 获取搜索表单值
   */
  function getSearchValues(): Record<string, any> {
    return searchFormRef.value?.getFieldsValue() || {}
  }

  /**
   * 设置搜索表单值
   */
  function setSearchValues(values: Record<string, any>) {
    searchFormRef.value?.setFieldsValue(values)
  }

  return {
    searchParams,
    tableParams,
    handleSearch,
    handleRefresh,
    handleReload,
    handleReset,
    getData,
    getSelectedRows,
    clearSelection,
    getSearchValues,
    setSearchValues,
  }
}
