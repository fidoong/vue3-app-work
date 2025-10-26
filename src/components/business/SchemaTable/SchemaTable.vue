<script setup lang="ts" generic="T = any">
import type { SchemaTableEmits, SchemaTableProps } from './types'
import { useSelection } from '../../shared/composables'
import {
  useTableActions,
  useTableColumns,
  useTableRender,
  useTableState,
  useTableToolbar,
} from './composables'

const props = withDefaults(defineProps<SchemaTableProps<T>>(), {
  dataSource: () => [],
  immediate: true,
  pagination: () => ({
    current: 1,
    pageSize: 10,
    showTotal: (total: number) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }),
  rowKey: 'id',
  bordered: false,
  size: 'default',
  loading: false,
  showHeader: true,
  striped: false,
})

const emit = defineEmits<SchemaTableEmits<T>>()

const columnsRef = toRef(props, 'columns')

// 表格状态
const {
  loading: dataLoading,
  dataSource: apiDataSource,
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
} = useTableState<T>({
  api: props.api,
  initialParams: props.params,
})

// 操作列
const { getActionsColumn } = useTableActions<T>(
  props.actions,
  props.actionsWidth,
  props.actionsTitle,
  props.actionsFixed,
)

// 表格列（添加操作列）
const allColumns = computed(() => {
  const actionsColumn = getActionsColumn()
  return actionsColumn ? [...columnsRef.value, actionsColumn] : columnsRef.value
})

const { visibleColumns } = useTableColumns<T>(allColumns)

// 表格选择
const {
  rowSelection: internalRowSelection,
  selectedRows,
  clear: clearSelection,
  getSelectedRows,
} = useSelection<T>({ rowKey: props.rowKey })

// 实际的行选择配置
const actualRowSelection = computed(() => {
  return props.rowSelection !== undefined ? props.rowSelection : internalRowSelection.value
})

// 表格渲染
const { renderColumn } = useTableRender<T>()

// 实际数据源
const actualDataSource = computed(() => {
  return props.api ? apiDataSource.value : props.dataSource
})

// 实际加载状态
const actualLoading = computed(() => {
  return props.loading || dataLoading.value
})

// 工具栏
const { renderToolbar } = useTableToolbar<T>(
  props.toolbar,
  handleRefresh,
  handleReset,
  actualLoading,
  selectedRows,
)

// 分页配置
const paginationConfig = computed(() => {
  if (props.pagination === false) {
    return false
  }

  return {
    ...props.pagination,
    current: params.value.page,
    pageSize: params.value.pageSize,
    total: total.value,
  }
})

// 表格列配置
const tableColumns = computed(() => {
  return visibleColumns.value.map((column) => {
    const { render, component, slot, ...rest } = column

    return {
      ...rest,
      customRender: slot
        ? undefined
        : ({ record, index }: { record: T, index: number }) => {
            return renderColumn(column, record, index)
          },
    }
  })
})

/**
 * 表格变化处理
 */
function handleTableChange(pagination: any, filters: any, sorter: any) {
  if (pagination) {
    updatePagination(pagination.current, pagination.pageSize)
  }

  if (sorter && sorter.field) {
    updateSorter(sorter.field, sorter.order)
  }
  else {
    updateSorter(undefined, null)
  }

  if (props.api) {
    loadData().catch((error) => {
      emit('error', error)
    })
  }

  emit('change', pagination, filters, sorter)
}

/**
 * 刷新表格
 */
async function handleRefresh() {
  try {
    await refresh()
    emit('refresh', actualDataSource.value as T[])
  }
  catch (error) {
    emit('error', error as Error)
  }
}

/**
 * 重新加载
 */
async function handleReload() {
  try {
    await reload()
    emit('refresh', actualDataSource.value as T[])
  }
  catch (error) {
    emit('error', error as Error)
  }
}

/**
 * 重置
 */
async function handleReset() {
  try {
    await reset()
    emit('refresh', actualDataSource.value as T[])
  }
  catch (error) {
    emit('error', error as Error)
  }
}

// 暴露方法
defineExpose({
  refresh: handleRefresh,
  reload: handleReload,
  reset: handleReset,
  setParams,
  clearParams,
  getParams,
  getData: () => actualDataSource.value,
  getSelectedRows,
  clearSelection,
})

// 监听 params 变化
watch(
  () => props.params,
  (newParams) => {
    if (newParams) {
      setParams(newParams)
      if (props.api) {
        loadData().catch((error) => {
          emit('error', error)
        })
      }
    }
  },
  { deep: true },
)

// 初始化
onMounted(() => {
  if (props.immediate && props.api) {
    loadData().catch((error) => {
      emit('error', error)
    })
  }
})
</script>

<template>
  <div class="schema-table">
    <!-- 工具栏 -->
    <component
      :is="renderToolbar()"
      v-if="toolbar && !$slots.toolbar"
    />

    <!-- 工具栏插槽 -->
    <div
      v-if="$slots.toolbar"
      class="schema-table-toolbar"
    >
      <slot
        name="toolbar"
        :refresh="handleRefresh"
        :reload="handleReload"
        :reset="handleReset"
        :loading="actualLoading"
        :selected-rows="getSelectedRows()"
        :clear-selection="clearSelection"
      />
    </div>

    <!-- 表格 -->
    <a-table
      v-bind="tableProps"
      :columns="tableColumns"
      :data-source="actualDataSource"
      :row-key="rowKey"
      :loading="actualLoading"
      :pagination="paginationConfig as any"
      :bordered="bordered"
      :size="size as any"
      :row-selection="actualRowSelection"
      :scroll="scroll"
      :show-header="showHeader"
      :locale="locale"
      :expanded-row-render="expandedRowRender"
      :expanded-row-keys="expandedRowKeys"
      :default-expanded-row-keys="defaultExpandedRowKeys"
      :default-expand-all-rows="defaultExpandAllRows"
      :expand-icon-column-index="expandIconColumnIndex"
      :expand-icon="expandIcon"
      :row-expandable="rowExpandable"
      :row-class-name="striped ? ((_record: T, index: number) => index % 2 === 1 ? 'table-striped' : '') : undefined"
      @change="handleTableChange"
      @expand="(expanded: boolean, record: T) => emit('expand', expanded, record)"
      @expanded-rows-change="(expandedRows: (string | number)[]) => emit('expandedRowsChange', expandedRows)"
      @resize-column="(width: number, column: any) => {
        const schemaColumn = visibleColumns.find(col => col.key === column.key)
        if (schemaColumn) emit('resizeColumn', width, schemaColumn)
      }"
    >
      <!-- 表格标题 -->
      <template
        v-if="title"
        #title
      >
        <component
          :is="typeof title === 'function' ? title() : title"
          v-if="typeof title === 'function'"
        />
        <div v-else>
          {{ title }}
        </div>
      </template>

      <!-- 表格底部 -->
      <template
        v-if="footer"
        #footer
      >
        <component
          :is="typeof footer === 'function' ? footer() : footer"
          v-if="typeof footer === 'function'"
        />
        <div v-else>
          {{ footer }}
        </div>
      </template>

      <!-- 自定义列插槽 -->
      <template #bodyCell="{ record, index, column: col }">
        <template
          v-for="column in visibleColumns"
          :key="column.key"
        >
          <slot
            v-if="column.slot && col.key === column.key"
            :name="column.slot"
            :record="record"
            :index="index"
            :value="column.dataIndex ? (record as any)[column.dataIndex as string] : undefined"
            :column="column"
          />
        </template>
      </template>

      <!-- 透传其他插槽 -->
      <template
        v-for="(_, name) in $slots"
        :key="`slot-${name}`"
        #[name]="slotProps"
      >
        <slot
          v-if="name !== 'toolbar' && name !== 'title' && name !== 'footer'"
          :name="name"
          v-bind="slotProps"
        />
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="scss">
.schema-table {
  width: 100%;

  // 斑马纹样式
  :deep(.table-striped) {
    background-color: #fafafa;
  }

  :deep(.ant-table-tbody > tr.table-striped:hover > td) {
    background-color: #f5f5f5;
  }

  // 工具栏
  &-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
}

.toolbar {
  &-left {
    flex: 1;
  }

  &-right {
    flex-shrink: 0;
  }
}
</style>
