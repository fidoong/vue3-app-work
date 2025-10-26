/**
 * SchemaPage 类型定义
 */

import type { FormItemSchema } from '../../shared/types'
import type { SchemaTableProps } from '../SchemaTable/types'

/**
 * SchemaPage Props
 */
export interface SchemaPageProps<T = any> extends Omit<SchemaTableProps<T>, 'columns' | 'params'> {
  /** 页面标题 */
  title?: string
  /** 搜索表单配置 */
  searchSchemas?: FormItemSchema[]
  /** 表格列配置 */
  tableColumns: SchemaTableProps<T>['columns']
  /** 是否显示搜索区域 */
  showSearch?: boolean
  /** 搜索区域默认展开 */
  searchExpanded?: boolean
  /** 搜索表单收起时显示的行数 */
  searchCollapsedRows?: number
  /** 搜索操作按钮占据的列数 */
  searchActionSpan?: number
  /** 额外的查询参数 */
  extraParams?: Record<string, any>
}

/**
 * SchemaPage Emits
 */
export interface SchemaPageEmits<T = any> {
  (e: 'search', values: Record<string, any>): void
  (e: 'refresh'): void
  (e: 'selectionChange', selectedRows: T[]): void
}

/**
 * SchemaPage 实例方法
 */
export interface SchemaPageInstance<T = any> {
  /** 刷新表格 */
  refresh: () => Promise<void>
  /** 重新加载 */
  reload: () => Promise<void>
  /** 重置 */
  reset: () => Promise<void>
  /** 获取表格数据 */
  getData: () => T[]
  /** 获取选中行 */
  getSelectedRows: () => T[]
  /** 清空选中 */
  clearSelection: () => void
  /** 获取搜索表单值 */
  getSearchValues: () => Record<string, any>
  /** 设置搜索表单值 */
  setSearchValues: (values: Record<string, any>) => void
}
