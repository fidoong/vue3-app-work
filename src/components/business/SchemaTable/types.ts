/**
 * SchemaTable 类型定义
 */

import type { TableColumnType, TableProps } from 'ant-design-vue'
import type { VNode } from 'vue'
import type {
  AlignType,
  ApiResponse,
  ButtonConfig,
  ComponentSize,
  FixedType,
  PaginationConfig,
  QueryParams,
} from '../../shared/types'

/**
 * 列渲染上下文
 */
export interface ColumnRenderContext<T = any> {
  record: T
  index: number
  value: any
  column: TableColumnSchema<T>
}

/**
 * 表格列配置
 */
export interface TableColumnSchema<T = any> extends Omit<TableColumnType, 'customRender'> {
  /** 列键 */
  key: string
  /** 列标题 */
  title: string
  /** 数据字段 */
  dataIndex?: string | string[]
  /** 列宽 */
  width?: number | string
  /** 是否固定 */
  fixed?: FixedType
  /** 对齐方式 */
  align?: AlignType
  /** 是否可排序 */
  sorter?: boolean | ((a: T, b: T) => number)
  /** 自定义渲染函数 */
  render?: (context: ColumnRenderContext<T>) => VNode | string
  /** 自定义插槽名称 */
  slot?: string
  /** 自定义组件 */
  component?: any
  /** 组件属性 */
  props?: Record<string, any> | ((record: T) => Record<string, any>)
  /** 是否隐藏 */
  hidden?: boolean | ((record: T) => boolean)
}

/**
 * 工具栏配置
 */
export interface ToolbarConfig {
  /** 左侧按钮 */
  left?: ButtonConfig[]
  /** 右侧按钮 */
  right?: ButtonConfig[]
  /** 是否显示刷新按钮 */
  showRefresh?: boolean
  /** 是否显示重置按钮 */
  showReset?: boolean
}

/**
 * SchemaTable Props
 */
export interface SchemaTableProps<T = any> {
  /** 列配置 */
  columns: TableColumnSchema<T>[]
  /** 数据源（静态数据） */
  dataSource?: T[]
  /** API 查询函数 */
  api?: (params: QueryParams) => Promise<ApiResponse<T>>
  /** 初始查询参数 */
  params?: Record<string, any>
  /** 是否立即查询 */
  immediate?: boolean
  /** 分页配置 */
  pagination?: PaginationConfig | false
  /** 行键 */
  rowKey?: string | ((record: T) => string | number)
  /** 是否显示边框 */
  bordered?: boolean
  /** 表格大小 */
  size?: ComponentSize
  /** 是否加载中 */
  loading?: boolean
  /** 滚动配置 */
  scroll?: { x?: number | string, y?: number | string }
  /** 是否显示表头 */
  showHeader?: boolean
  /** 表格标题 */
  title?: string | (() => VNode)
  /** 表格底部 */
  footer?: string | (() => VNode)
  /** 空数据时的显示内容 */
  locale?: { emptyText?: string | VNode }
  /** 行选择配置 */
  rowSelection?: any
  /** 展开行渲染函数 */
  expandedRowRender?: (opt: { record: T, index: number, indent: number, expanded: boolean }) => any
  /** 展开的行，控制属性 */
  expandedRowKeys?: (string | number)[]
  /** 默认展开的行 */
  defaultExpandedRowKeys?: (string | number)[]
  /** 默认展开所有行 */
  defaultExpandAllRows?: boolean
  /** 展开图标所在列索引 */
  expandIconColumnIndex?: number
  /** 自定义展开图标 */
  expandIcon?: (props: any) => any
  /** 设置是否允许行展开 */
  rowExpandable?: (record: T) => boolean
  /** 是否显示斑马纹 */
  striped?: boolean
  /** 工具栏配置 */
  toolbar?: ToolbarConfig
  /** 操作列配置 */
  actions?: ButtonConfig<T>[]
  /** 操作列宽度 */
  actionsWidth?: number
  /** 操作列标题 */
  actionsTitle?: string
  /** 操作列是否固定 */
  actionsFixed?: FixedType
  /** 表格其他属性 */
  tableProps?: Partial<TableProps>
}

/**
 * SchemaTable Emits
 */
export interface SchemaTableEmits<T = any> {
  (e: 'change', pagination: any, filters: any, sorter: any): void
  (e: 'refresh', data: T[]): void
  (e: 'error', error: Error): void
  (e: 'expand', expanded: boolean, record: T): void
  (e: 'expandedRowsChange', expandedRows: (string | number)[]): void
  (e: 'resizeColumn', width: number, column: TableColumnSchema<T>): void
}

/**
 * SchemaTable 实例方法
 */
export interface SchemaTableInstance<T = any> {
  /** 刷新表格（保持当前页和查询参数） */
  refresh: () => Promise<void>
  /** 重新加载（重置到第一页，保持查询参数） */
  reload: () => Promise<void>
  /** 重置（清除所有查询参数，恢复到初始状态） */
  reset: () => Promise<void>
  /** 设置查询参数 */
  setParams: (params: Record<string, any>) => void
  /** 清除查询参数（保留分页参数） */
  clearParams: () => void
  /** 获取查询参数 */
  getParams: () => QueryParams
  /** 获取表格数据 */
  getData: () => T[]
  /** 获取选中行 */
  getSelectedRows: () => T[]
  /** 清空选中 */
  clearSelection: () => void
}
