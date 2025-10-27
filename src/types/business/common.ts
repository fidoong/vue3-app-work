/**
 * 业务通用类型定义
 * 定义跨业务模块的通用类型
 */

import type { DateString, ID } from '../http/base'

// 从 core 模块重新导出通用类型
export type {
  Address,
  AuditInfo,
  Contact,
  EnumItem,
  FileInfo,
  Option,
  Statistics,
  TreeNode,
} from '../core/common'

export type { KeyValue } from '../core/primitives'

/**
 * 基础实体（所有业务实体的基类）
 */
export interface BaseEntity {
  /** ID */
  id: ID
  /** 创建时间 */
  createTime: DateString
  /** 更新时间 */
  updateTime?: DateString
  /** 创建人 ID */
  createBy?: ID
  /** 更新人 ID */
  updateBy?: ID
}

/**
 * 可删除实体
 */
export interface DeletableEntity extends BaseEntity {
  /** 是否删除 */
  deleted?: boolean
  /** 删除时间 */
  deleteTime?: DateString
  /** 删除人 ID */
  deleteBy?: ID
}

/**
 * 可排序实体
 */
export interface SortableEntity {
  /** 排序号 */
  orderNum: number
}

/**
 * 可启用/禁用实体
 */
export interface StatusEntity {
  /** 状态：0-禁用，1-启用 */
  status: number
}
