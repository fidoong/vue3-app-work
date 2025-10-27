/**
 * 系统管理相关类型定义
 */

import type { ID } from '../http/base'
import type { BaseEntity, SortableEntity, StatusEntity, TreeNode } from './common'

// ==================== 菜单管理 ====================

/**
 * 菜单类型
 */
export type MenuType = 'catalog' | 'menu' | 'button'

/**
 * 菜单元数据
 */
export interface MenuMeta {
  /** 标题 */
  title: string
  /** 图标 */
  icon?: string
  /** 是否隐藏 */
  hidden?: boolean
  /** 是否缓存 */
  keepAlive?: boolean
  /** 是否总是显示 */
  alwaysShow?: boolean
  /** 是否固定在标签栏 */
  affix?: boolean
  /** 不缓存 */
  noCache?: boolean
  /** 外链地址 */
  link?: string
}

/**
 * 菜单信息
 */
export interface MenuItem extends BaseEntity, SortableEntity, StatusEntity {
  /** 父菜单 ID */
  parentId: ID | null
  /** 菜单名称 */
  name: string
  /** 路由路径 */
  path: string
  /** 组件路径 */
  component?: string
  /** 重定向路径 */
  redirect?: string
  /** 图标 */
  icon?: string
  /** 菜单类型 */
  type: MenuType
  /** 是否可见 */
  visible: boolean
  /** 权限标识 */
  perms?: string
  /** 元数据 */
  meta?: MenuMeta
  /** 子菜单 */
  children?: MenuItem[]
}

/**
 * 菜单查询参数
 */
export interface MenuQueryParams {
  /** 菜单名称 */
  name?: string
  /** 状态 */
  status?: number
  /** 菜单类型 */
  type?: MenuType
}

/**
 * 菜单创建参数
 */
export interface MenuCreateParams {
  /** 父菜单 ID */
  parentId?: ID | null
  /** 菜单名称 */
  name: string
  /** 路由路径 */
  path: string
  /** 组件路径 */
  component?: string
  /** 重定向路径 */
  redirect?: string
  /** 图标 */
  icon?: string
  /** 菜单类型 */
  type: MenuType
  /** 排序号 */
  orderNum?: number
  /** 是否可见 */
  visible?: boolean
  /** 状态 */
  status?: number
  /** 权限标识 */
  perms?: string
  /** 元数据 */
  meta?: MenuMeta
}

/**
 * 菜单更新参数
 */
export interface MenuUpdateParams extends Partial<MenuCreateParams> {
  id: ID
}

// ==================== 部门管理 ====================

/**
 * 部门信息
 */
export interface Dept extends BaseEntity, SortableEntity, StatusEntity, TreeNode<Dept> {
  /** 父部门 ID */
  parentId: ID | null
  /** 部门名称 */
  deptName: string
  /** 负责人 */
  leader?: string
  /** 联系电话 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 子部门 */
  children?: Dept[]
}

/**
 * 部门查询参数
 */
export interface DeptQueryParams {
  /** 部门名称 */
  deptName?: string
  /** 状态 */
  status?: number
}

/**
 * 部门创建参数
 */
export interface DeptCreateParams {
  /** 父部门 ID */
  parentId?: ID | null
  /** 部门名称 */
  deptName: string
  /** 排序号 */
  orderNum?: number
  /** 负责人 */
  leader?: string
  /** 联系电话 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 状态 */
  status?: number
}

/**
 * 部门更新参数
 */
export interface DeptUpdateParams extends Partial<DeptCreateParams> {
  id: ID
}

// ==================== 字典管理 ====================

/**
 * 字典类型
 */
export interface DictType extends BaseEntity, StatusEntity {
  /** 字典名称 */
  dictName: string
  /** 字典类型 */
  dictType: string
  /** 备注 */
  remark?: string
}

/**
 * 字典数据
 */
export interface DictData extends BaseEntity, SortableEntity, StatusEntity {
  /** 字典类型 */
  dictType: string
  /** 字典标签 */
  dictLabel: string
  /** 字典值 */
  dictValue: string
  /** 样式类名 */
  cssClass?: string
  /** 列表类名 */
  listClass?: string
  /** 是否默认 */
  isDefault: boolean
  /** 备注 */
  remark?: string
}

/**
 * 字典类型查询参数
 */
export interface DictTypeQueryParams {
  /** 字典名称 */
  dictName?: string
  /** 字典类型 */
  dictType?: string
  /** 状态 */
  status?: number
}

/**
 * 字典类型创建参数
 */
export interface DictTypeCreateParams {
  /** 字典名称 */
  dictName: string
  /** 字典类型 */
  dictType: string
  /** 状态 */
  status?: number
  /** 备注 */
  remark?: string
}

/**
 * 字典类型更新参数
 */
export interface DictTypeUpdateParams extends Partial<DictTypeCreateParams> {
  id: ID
}

/**
 * 字典数据查询参数
 */
export interface DictDataQueryParams {
  /** 字典类型 */
  dictType?: string
  /** 字典标签 */
  dictLabel?: string
  /** 状态 */
  status?: number
}

/**
 * 字典数据创建参数
 */
export interface DictDataCreateParams {
  /** 字典类型 */
  dictType: string
  /** 字典标签 */
  dictLabel: string
  /** 字典值 */
  dictValue: string
  /** 字典排序 */
  dictSort?: number
  /** 样式类名 */
  cssClass?: string
  /** 列表类名 */
  listClass?: string
  /** 是否默认 */
  isDefault?: boolean
  /** 状态 */
  status?: number
  /** 备注 */
  remark?: string
}

/**
 * 字典数据更新参数
 */
export interface DictDataUpdateParams extends Partial<DictDataCreateParams> {
  id: ID
}

// ==================== 系统配置 ====================

/**
 * 系统配置
 */
export interface SystemConfig extends BaseEntity {
  /** 配置名称 */
  configName: string
  /** 配置键 */
  configKey: string
  /** 配置值 */
  configValue: string
  /** 配置类型 */
  configType: string
  /** 备注 */
  remark?: string
}

/**
 * 系统配置查询参数
 */
export interface SystemConfigQueryParams {
  /** 配置名称 */
  configName?: string
  /** 配置键 */
  configKey?: string
  /** 配置类型 */
  configType?: string
}

/**
 * 系统配置创建参数
 */
export interface SystemConfigCreateParams {
  /** 配置名称 */
  configName: string
  /** 配置键 */
  configKey: string
  /** 配置值 */
  configValue: string
  /** 配置类型 */
  configType?: string
  /** 备注 */
  remark?: string
}

/**
 * 系统配置更新参数
 */
export interface SystemConfigUpdateParams extends Partial<SystemConfigCreateParams> {
  id: ID
}

// ==================== 通知公告 ====================

/**
 * 通知公告
 */
export interface Notice extends BaseEntity, StatusEntity {
  /** 标题 */
  title: string
  /** 类型：1-通知，2-公告 */
  type: number
  /** 内容 */
  content: string
  /** 创建人 */
  createBy: string
}

/**
 * 通知公告查询参数
 */
export interface NoticeQueryParams {
  /** 标题 */
  title?: string
  /** 类型 */
  type?: number
  /** 状态 */
  status?: number
}

/**
 * 通知公告创建参数
 */
export interface NoticeCreateParams {
  /** 标题 */
  title: string
  /** 类型 */
  type: number
  /** 内容 */
  content: string
  /** 状态 */
  status?: number
}

/**
 * 通知公告更新参数
 */
export interface NoticeUpdateParams extends Partial<NoticeCreateParams> {
  id: ID
}
