/**
 * DropdownButton 类型定义
 */

import type { Component } from 'vue'

/**
 * 菜单项配置
 */
export interface DropdownMenuItem {
  /** 菜单项键值 */
  key: string
  /** 菜单项文本 */
  label: string
  /** 菜单项图标 */
  icon?: Component | string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示 */
  visible?: boolean
  /** 是否危险按钮 */
  danger?: boolean
  /** 是否分割线 */
  divider?: boolean
  /** 点击事件 */
  onClick?: () => void
  /** 子菜单 */
  children?: DropdownMenuItem[]
}

/**
 * DropdownButton Props
 */
export interface DropdownButtonProps {
  /** 按钮文本 */
  text?: string
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  /** 按钮大小 */
  size?: 'small' | 'middle' | 'large'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否危险按钮 */
  danger?: boolean
  /** 菜单项列表 */
  items: DropdownMenuItem[]
  /** 下拉菜单位置 */
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
  /** 触发方式 */
  trigger?: 'click' | 'hover' | 'contextmenu'
  /** 按钮图标 */
  icon?: Component | string
  /** 下拉图标 */
  dropdownIcon?: Component | string
}

/**
 * DropdownButton Emits
 */
export interface DropdownButtonEmits {
  (e: 'select', key: string, item: DropdownMenuItem): void
}
