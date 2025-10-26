/**
 * SearchForm 类型定义
 */

import type { FormItemSchema } from '../../shared/types'

/**
 * SearchForm Props
 */
export interface SearchFormProps {
  /** 表单字段配置 */
  schemas: FormItemSchema[]
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 标签列配置 */
  labelCol?: { span: number }
  /** 输入框列配置 */
  wrapperCol?: { span: number }
  /** 默认是否展开 */
  defaultExpanded?: boolean
  /** 收起时显示的行数 */
  collapsedRows?: number
  /** 加载状态 */
  loading?: boolean
  /** 操作按钮的位置 */
  actionPosition?: 'inline' | 'footer'
  /** 操作按钮占据的列数（仅在 inline 模式下生效） */
  actionSpan?: number
}

/**
 * SearchForm Emits
 */
export interface SearchFormEmits {
  /** 查询事件 */
  (e: 'search', values: Record<string, any>): void
  /** 重置事件 */
  (e: 'reset'): void
}

/**
 * SearchForm 实例方法
 */
export interface SearchFormInstance {
  /** 获取表单值 */
  getFieldsValue: () => Record<string, any>
  /** 设置表单值 */
  setFieldsValue: (values: Record<string, any>) => void
  /** 重置表单 */
  resetFields: () => void
  /** 验证表单 */
  validate: () => Promise<any>
  /** 触发搜索 */
  search: () => void
}
