/**
 * 通用类型定义
 */

import type { Component, VNode } from 'vue'

/**
 * 动态值类型 - 支持静态值或函数计算
 */
export type DynamicValue<T, Context = any> = T | ((context: Context) => T)

/**
 * 渲染函数类型
 */
export type RenderFunction<Context = any> = (context: Context) => VNode | string

/**
 * 基础配置项
 */
export interface BaseSchema {
  /** 唯一标识 */
  key: string
  /** 是否禁用 */
  disabled?: DynamicValue<boolean>
  /** 是否隐藏 */
  hidden?: DynamicValue<boolean>
  /** 自定义属性 */
  props?: DynamicValue<Record<string, any>>
}

/**
 * 分页配置
 */
export interface PaginationConfig {
  /** 当前页 */
  current?: number
  /** 每页条数 */
  pageSize?: number
  /** 总条数 */
  total?: number
  /** 显示总数的函数 */
  showTotal?: (total: number, range: [number, number]) => string
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean
  /** 每页条数选项 */
  pageSizeOptions?: string[]
}

/**
 * 查询参数
 */
export interface QueryParams {
  /** 当前页 */
  page?: number
  /** 每页条数 */
  pageSize?: number
  /** 排序字段 */
  sortField?: string
  /** 排序方式 */
  sortOrder?: 'ascend' | 'descend' | null
  /** 其他查询参数 */
  [key: string]: any
}

/**
 * API 响应数据
 */
export interface ApiResponse<T = any> {
  /** 数据列表 */
  data: T[]
  /** 总条数 */
  total: number
  /** 当前页 */
  page?: number
  /** 每页条数 */
  pageSize?: number
}

/**
 * API 函数类型
 */
export type ApiFn<T = any> = (params: QueryParams) => Promise<ApiResponse<T>>

/**
 * 按钮配置
 */
export interface ButtonConfig<Context = any> {
  /** 按钮文本 */
  text: string
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  /** 按钮危险状态 */
  danger?: boolean
  /** 按钮图标 */
  icon?: Component
  /** 是否禁用 */
  disabled?: DynamicValue<boolean, Context>
  /** 是否显示 */
  visible?: DynamicValue<boolean, Context>
  /** 点击事件 */
  onClick?: (...args: any[]) => void | Promise<void>
  /** 确认配置 */
  confirm?: {
    title?: string
    content?: string
    onConfirm?: (...args: any[]) => void | Promise<void>
  }
  /** 自定义属性 */
  props?: DynamicValue<Record<string, any>, Context>
}

/**
 * 选择配置
 */
export interface SelectionConfig<T = any> {
  /** 选中的行键 */
  selectedRowKeys?: (string | number)[]
  /** 选择变化回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
  /** 选择框的默认属性配置 */
  getCheckboxProps?: (record: T) => Record<string, any>
  /** 固定列 */
  fixed?: boolean | 'left' | 'right'
  /** 列宽 */
  columnWidth?: number | string
  /** 列标题 */
  columnTitle?: string | VNode
}

/**
 * 加载状态
 */
export interface LoadingState {
  /** 是否加载中 */
  loading: boolean
  /** 加载文本 */
  text?: string
  /** 加载延迟（毫秒） */
  delay?: number
}

/**
 * 错误状态
 */
export interface ErrorState {
  /** 是否有错误 */
  hasError: boolean
  /** 错误信息 */
  message?: string
  /** 错误详情 */
  details?: any
}

/**
 * 组件尺寸
 */
export type ComponentSize = 'small' | 'default' | 'large'

/**
 * 对齐方式
 */
export type AlignType = 'left' | 'center' | 'right'

/**
 * 固定位置
 */
export type FixedType = 'left' | 'right' | boolean
