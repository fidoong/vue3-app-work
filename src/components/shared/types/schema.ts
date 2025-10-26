/**
 * Schema 相关类型定义
 */

import type { Rule } from 'ant-design-vue/es/form'
import type { ColProps } from 'ant-design-vue/es/grid'
import type { Component } from 'vue'
import type { BaseSchema, RenderFunction } from './common'

/**
 * 表单组件类型
 */
export type FormComponentType =
  | 'input'
  | 'textarea'
  | 'password'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'dateRange'
  | 'time'
  | 'timeRange'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'upload'
  | 'cascader'
  | 'treeSelect'
  | 'custom'

/**
 * 表单项渲染上下文
 */
export interface FormItemRenderContext {
  /** 表单数据 */
  formData: Record<string, any>
  /** 字段名 */
  field: string
  /** 字段值 */
  value: any
  /** 设置值 */
  setValue: (value: any) => void
  /** 是否禁用 */
  disabled: boolean
}

/**
 * 表单项配置
 */
export interface FormItemSchema extends BaseSchema {
  /** 字段名 */
  field: string
  /** 标签 */
  label: string
  /** 占位符 */
  placeholder?: string
  /** 默认值 */
  defaultValue?: any
  /** 验证规则 */
  rules?: Rule[]
  /** 栅格占位 */
  span?: number
  /** 列配置 */
  colProps?: ColProps
  /** 组件类型 */
  type?: FormComponentType
  /** 自定义组件 */
  component?: Component
  /** 自定义渲染函数 */
  render?: RenderFunction<FormItemRenderContext>
  /** 自定义插槽名称 */
  slot?: string
  /** 事件监听器 */
  on?: Record<string, (...args: any[]) => void>
  /** 依赖字段（用于联动） */
  dependencies?: string[]
  /** 帮助文本 */
  help?: string
  /** 额外提示 */
  extra?: string
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right'
  /** 必填标记 */
  required?: boolean
  /** 冒号 */
  colon?: boolean
}

/**
 * 表单布局
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

/**
 * 表单配置
 */
export interface FormConfig {
  /** 表单项配置 */
  schemas: FormItemSchema[]
  /** 表单数据 */
  modelValue?: Record<string, any>
  /** 标签列配置 */
  labelCol?: Record<string, any>
  /** 内容列配置 */
  wrapperCol?: Record<string, any>
  /** 布局方式 */
  layout?: FormLayout
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 表单名称 */
  name?: string
}
