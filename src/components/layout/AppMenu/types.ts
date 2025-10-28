/**
 * AppMenu 类型定义
 */

import type { Component } from 'vue'

/**
 * 菜单项配置
 */
export interface MenuItemSchema {
  /** 唯一标识 */
  key: string
  /** 菜单标题 */
  title: string
  /** 图标 */
  icon?: Component
  /** 路由路径 */
  path?: string
  /** 路由配置 */
  route?: any
  /** 外部链接 */
  href?: string
  /** 链接打开方式 */
  target?: '_blank' | '_self'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否隐藏 */
  hidden?: boolean
  /** 子菜单 */
  children?: MenuItemSchema[]
  /** 点击事件 */
  onClick?: () => void
  /** 自定义数据 */
  meta?: Record<string, any>
}

/**
 * AppMenu Props
 */
export interface AppMenuProps {
  /** 菜单项配置 */
  items: MenuItemSchema[]
  /** 菜单模式 */
  mode?: 'vertical' | 'horizontal' | 'inline'
  /** 主题 */
  theme?: 'light' | 'dark'
  /** 是否可折叠 */
  collapsible?: boolean
  /** 是否折叠 */
  collapsed?: boolean
  /** 是否支持多选 */
  multiple?: boolean
  /** 内联菜单缩进宽度 */
  inlineIndent?: number
  /** 是否显示图标 */
  showIcon?: boolean
  /** 默认选中的菜单项 */
  defaultSelectedKeys?: string[]
  /** 默认展开的子菜单 */
  defaultOpenKeys?: string[]
  /** 当前选中的菜单项（受控） */
  selectedKeys?: string[]
  /** 当前展开的子菜单（受控） */
  openKeys?: string[]
}

/**
 * AppMenu Emits
 */
export interface AppMenuEmits {
  /** 选中菜单项 */
  (e: 'select', key: string, item: MenuItemSchema): void
  /** 展开/关闭子菜单 */
  (e: 'openChange', keys: string[]): void
  /** 更新选中的菜单项 */
  (e: 'update:selectedKeys', keys: string[]): void
  /** 更新展开的子菜单 */
  (e: 'update:openKeys', keys: string[]): void
}

/**
 * AppMenu 实例方法
 */
export interface AppMenuInstance {
  /** 选中菜单项 */
  selectItem: (key: string) => void
  /** 展开子菜单 */
  openSubMenu: (key: string) => void
  /** 关闭子菜单 */
  closeSubMenu: (key: string) => void
  /** 获取选中的菜单项 */
  getSelectedKeys: () => string[]
  /** 获取展开的子菜单 */
  getOpenKeys: () => string[]
}
