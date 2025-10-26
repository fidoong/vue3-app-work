<script setup lang="ts" generic="T = any">
import type { SchemaPageEmits, SchemaPageInstance, SchemaPageProps } from './types'
import { SchemaTable } from '../SchemaTable'
import { SearchForm } from '../SearchForm'

const props = withDefaults(defineProps<SchemaPageProps<T>>(), {
  immediate: true,
  showSearch: true,
  searchExpanded: false,
  searchCollapsedRows: 1,
  extraParams: () => ({}),
})

const emit = defineEmits<SchemaPageEmits<T>>()

const searchParams = ref<Record<string, any>>({})
const tableRef = ref()
const searchFormRef = ref()

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
function getData(): T[] {
  return tableRef.value?.getData() || []
}

/**
 * 获取选中行
 */
function getSelectedRows(): T[] {
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

/**
 * 合并查询参数
 */
const tableParams = computed(() => {
  return {
    ...searchParams.value,
    ...props.extraParams,
  }
})

// 暴露实例方法
defineExpose<SchemaPageInstance<T>>({
  refresh: handleRefresh,
  reload: handleReload,
  reset: handleReset,
  getData,
  getSelectedRows,
  clearSelection,
  getSearchValues,
  setSearchValues,
})
</script>

<template>
  <!-- 搜索区域 -->
  <SearchForm
    v-if="props.showSearch && props.searchSchemas && props.searchSchemas.length > 0"
    ref="searchFormRef"
    :schemas="props.searchSchemas"
    :default-expanded="props.searchExpanded"
    :collapsed-rows="props.searchCollapsedRows"
    :action-span="props.searchActionSpan"
    @search="handleSearch"
    @reset="handleReset"
  >
    <!-- 透传搜索表单插槽 -->
    <template
      v-for="(_, name) in $slots"
      :key="`search-${String(name)}`"
      #[name]="slotProps"
    >
      <slot
        v-if="String(name).startsWith('search-')"
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </SearchForm>

  <!-- 表格区域 -->
  <SchemaTable
    ref="tableRef"
    :columns="props.tableColumns"
    :params="tableParams"
    :api="props.api"
    :immediate="props.immediate"
    :toolbar="props.toolbar"
    :actions="props.actions"
    v-bind="$attrs"
  >
    <!-- 透传表格插槽 -->
    <template
      v-for="(_, name) in $slots"
      :key="`table-${String(name)}`"
      #[name]="slotProps"
    >
      <slot
        v-if="!String(name).startsWith('search-') && name !== 'header'"
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </SchemaTable>
</template>
