/**
 * SchemaDetail 类型定义
 */

import type { Component, VNode } from 'vue'

/**
 * 详情项配置
 */
export interface DetailItemSchema {
  /** 字段键 */
  key: string
  /** 标签 */
  label: string
  /** 数据路径，支持嵌套访问，如 'user.name' 或 'items[0].title' */
  path?: string
  /** 占据的列数 */
  span?: number
  /** 自定义渲染函数 */
  render?: (value: any, record: Record<string, any>) => VNode | string | number
  /** 自定义插槽名称 */
  slot?: string
  /** 格式化函数 */
  formatter?: (value: any, record: Record<string, any>) => string | number
  /** 默认值（当值为空时显示） */
  defaultValue?: string | number
  /** 是否隐藏 */
  hidden?: boolean | ((record: Record<string, any>) => boolean)
  /** 标签宽度 */
  labelWidth?: number | string
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right' | 'center'
  /** 内容对齐方式 */
  contentAlign?: 'left' | 'right' | 'center'
  /** 是否复制按钮 */
  copyable?: boolean
  /** 前缀图标 */
  prefixIcon?: Component
  /** 后缀图标 */
  suffixIcon?: Component
  /** 自定义样式类 */
  className?: string
  /** 自定义样式 */
  style?: Record<string, any>
}

/**
 * 详情分组配置
 */
export interface DetailGroupSchema {
  /** 分组标题 */
  title?: string
  /** 分组键 */
  key?: string
  /** 分组项 */
  items: DetailItemSchema[]
  /** 每行列数 */
  column?: number
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认是否展开 */
  defaultExpanded?: boolean
  /** 分组样式类 */
  className?: string
  /** 分组样式 */
  style?: Record<string, any>
}

/**
 * 数组项渲染配置
 */
export interface ArrayItemRenderConfig {
  /** 数组数据路径 */
  path: string
  /** 数组项配置 */
  items: DetailItemSchema[]
  /** 每行列数 */
  column?: number
  /** 是否显示索引 */
  showIndex?: boolean
  /** 索引标签 */
  indexLabel?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 空数据提示 */
  emptyText?: string
  /** 最大显示数量 */
  maxCount?: number
  /** 自定义渲染函数 */
  render?: (item: any, index: number) => VNode
}

/**
 * SchemaDetail Props
 */
export interface SchemaDetailProps {
  /** 详情数据 */
  data: Record<string, any>
  /** 详情项配置（简单模式） */
  items?: DetailItemSchema[]
  /** 详情分组配置（分组模式） */
  groups?: DetailGroupSchema[]
  /** 每行列数 */
  column?: number
  /** 标签宽度 */
  labelWidth?: number | string
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right' | 'center'
  /** 内容对齐方式 */
  contentAlign?: 'left' | 'right' | 'center'
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否显示冒号 */
  colon?: boolean
  /** 布局方式 */
  layout?: 'horizontal' | 'vertical'
  /** 组件大小 */
  size?: 'small' | 'middle' | 'large'
  /** 是否加载中 */
  loading?: boolean
  /** 标题 */
  title?: string
  /** 额外操作区域 */
  extra?: string | VNode
  /** 数组项渲染配置 */
  arrayItems?: ArrayItemRenderConfig[]
}

/**
 * SchemaDetail Emits
 */
export interface SchemaDetailEmits {
  (e: 'copy', field: string, value: any): void
}

/**
 * SchemaDetail 实例方法
 */
export interface SchemaDetailInstance {
  /** 刷新数据 */
  refresh: () => void
  /** 获取数据 */
  getData: () => Record<string, any>
}
