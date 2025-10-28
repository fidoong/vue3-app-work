/**
 * HTTP 请求相关类型定义
 */

import type { ID } from './base'

/**
 * 分页查询参数
 */
export interface PageParams {
  /** 页码（从 1 开始） */
  pageNum?: number
  /** 每页大小 */
  pageSize?: number
}

/**
 * 游标分页查询参数
 */
export interface CursorPageParams {
  /** 游标 */
  cursor?: string
  /** 每页大小 */
  limit?: number
}

/**
 * 排序参数
 */
export interface SortParams {
  /** 排序字段 */
  sortField?: string
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc' | 'ascend' | 'descend'
}

/**
 * 时间范围查询参数
 */
export interface TimeRangeParams {
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}

/**
 * 基础查询参数（组合分页、排序、时间范围）
 */
export interface BaseQueryParams extends PageParams, SortParams, TimeRangeParams {
  /** 搜索关键词 */
  keyword?: string
  /** 状态 */
  status?: number | string
}

/**
 * 通用查询参数（支持泛型扩展）
 * @template T - 额外的查询条件类型
 * @example
 * // 不带额外条件
 * type UserQuery = QueryParams
 *
 * // 带额外条件
 * type UserQuery = QueryParams<{
 *   username?: string
 *   email?: string
 *   roleId?: number
 * }>
 */
export type QueryParams<T = object> = BaseQueryParams & T

/**
 * 创建查询参数类型的辅助函数
 * @example
 * type UserQuery = CreateQueryParams<{
 *   username?: string
 *   email?: string
 * }>
 */
export type CreateQueryParams<T = object> = QueryParams<T>

/**
 * ID 参数
 */
export interface IdParam {
  id: ID
}

/**
 * ID 列表参数
 */
export interface IdsParam {
  ids: ID[]
}

/**
 * 状态参数
 */
export interface StatusParam {
  status: number
}

/**
 * 批量状态参数
 */
export interface BatchStatusParam extends IdsParam {
  status: number
}

/**
 * 导出参数（支持泛型扩展）
 * @template T - 额外的查询条件类型
 */
export type ExportParams<T = object> = QueryParams<T> & {
  /** 导出格式 */
  format?: 'xlsx' | 'csv' | 'pdf'
  /** 导出字段 */
  fields?: string[]
  /** 文件名 */
  filename?: string
}

/**
 * 导入参数
 */
export interface ImportParams {
  /** 文件 */
  file: File
  /** 是否覆盖 */
  override?: boolean
  /** 额外参数 */
  extra?: Record<string, any>
}
