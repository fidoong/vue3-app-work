<script setup lang="ts" generic="T = any">
import type { SchemaPageEmits, SchemaPageInstance, SchemaPageProps } from './types'
import { SchemaTable } from '../SchemaTable'
import { SearchForm } from '../SearchForm'
import { useSchemaPage } from './composables'

const props = withDefaults(defineProps<SchemaPageProps<T>>(), {
  immediate: true,
  showSearch: true,
  searchExpanded: false,
  searchCollapsedRows: 1,
  extraParams: () => ({}),
})

const emit = defineEmits<SchemaPageEmits<T>>()

const tableRef = ref()
const searchFormRef = ref()

// 使用 composable 管理核心逻辑
const {
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
} = useSchemaPage(
  {
    tableRef,
    searchFormRef,
    extraParams: props.extraParams,
  },
  emit,
)

// 是否显示搜索表单
const showSearchForm = computed(() => {
  return props.showSearch && props.searchSchemas && props.searchSchemas.length > 0
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
  <div class="schema-page">
    <!-- 搜索区域 -->
    <SearchForm
      v-if="showSearchForm"
      ref="searchFormRef"
      :schemas="searchSchemas || []"
      :default-expanded="searchExpanded"
      :collapsed-rows="searchCollapsedRows"
      :action-span="searchActionSpan"
      @search="handleSearch"
      @reset="handleReset"
    >
      <!-- 透传搜索表单插槽 -->
      <template
        v-for="(_, slotName) in $slots"
        :key="`search-${String(slotName)}`"
        #[slotName]="slotProps"
      >
        <slot
          v-if="String(slotName).startsWith('search-')"
          :name="slotName"
          v-bind="slotProps"
        />
      </template>
    </SearchForm>

    <!-- 表格区域 -->
    <SchemaTable
      ref="tableRef"
      :columns="tableColumns"
      :params="tableParams"
      :api="api"
      :immediate="immediate"
      :toolbar="toolbar"
      :actions="actions"
      v-bind="$attrs"
    >
      <!-- 透传表格插槽 -->
      <template
        v-for="(_, slotName) in $slots"
        :key="`table-${String(slotName)}`"
        #[slotName]="slotProps"
      >
        <slot
          v-if="!String(slotName).startsWith('search-')"
          :name="slotName"
          v-bind="slotProps"
        />
      </template>
    </SchemaTable>
  </div>
</template>

<style scoped>
.schema-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
}
</style>
