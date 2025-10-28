/**
 * AppLayout 类型定义
 */

import type { Component, VNode } from 'vue'
import type { MenuItemSchema } from '../AppMenu'

// 重新导出 MenuItemSchema 以便外部使用
export type { MenuItemSchema }

/**
 * 面包屑项
 */
export interface BreadcrumbItem {
  /** 标题 */
  title: string
  /** 路径 */
  path?: string
  /** 图标 */
  icon?: Component
}

/**
 * 标签页项
 */
export interface TabItem {
  /** 唯一标识 */
  key: string
  /** 标题 */
  title: string
  /** 路径 */
  path: string
  /** 是否可关闭 */
  closable?: boolean
  /** 图标 */
  icon?: Component
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户名 */
  name: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email?: string
  /** 角色 */
  role?: string
  /** 其他信息 */
  [key: string]: any
}

/**
 * AppLayout Props
 */
export interface AppLayoutProps {
  /** 主题 */
  theme?: 'light' | 'dark'
  /** 菜单项配置 */
  menuItems?: MenuItemSchema[]
  /** 是否固定头部 */
  fixedHeader?: boolean
  /** 是否固定侧边栏 */
  fixedSidebar?: boolean
  /** 侧边栏宽度 */
  sidebarWidth?: number
  /** 折叠后的宽度 */
  collapsedWidth?: number
  /** 是否折叠 */
  collapsed?: boolean
  /** 是否显示面包屑 */
  showBreadcrumb?: boolean
  /** 是否显示标签页 */
  showTabs?: boolean
  /** Logo */
  logo?: string | Component
  /** 标题 */
  title?: string
  /** 是否显示用户下拉菜单 */
  showUserDropdown?: boolean
  /** 是否显示全屏按钮 */
  showFullscreen?: boolean
  /** 是否显示设置按钮 */
  showSettings?: boolean
  /** 用户信息 */
  userInfo?: UserInfo
  /** 页脚 */
  footer?: string | VNode
}

/**
 * AppLayout Emits
 */
export interface AppLayoutEmits {
  /** 更新折叠状态 */
  (e: 'update:collapsed', collapsed: boolean): void
  /** 菜单选择 */
  (e: 'menuSelect', key: string, item: MenuItemSchema): void
  /** 用户菜单点击 */
  (e: 'userMenuClick', key: string): void
  /** 退出登录 */
  (e: 'logout'): void
  /** 刷新页面内容 */
  (e: 'refresh'): void
}

/**
 * AppLayout 实例方法
 */
export interface AppLayoutInstance {
  /** 切换折叠状态 */
  toggleCollapsed: () => void
  /** 添加标签页 */
  addTab: (tab: TabItem) => void
  /** 移除标签页 */
  removeTab: (key: string) => void
  /** 切换标签页 */
  switchTab: (key: string) => void
}
