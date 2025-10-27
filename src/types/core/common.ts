/**
 * 通用基础类型定义
 * 定义跨模块使用的通用类型
 */

import type { ID, Nullable, Optional } from './primitives'

/**
 * 选项类型
 * @example
 * const option: Option = { label: "选项1", value: 1 }
 * const options: Option<string>[] = [
 *   { label: "北京", value: "beijing" },
 *   { label: "上海", value: "shanghai", disabled: true }
 * ]
 * const cascader: Option[] = [
 *   { label: "浙江", value: "zhejiang", children: [
 *     { label: "杭州", value: "hangzhou" }
 *   ]}
 * ]
 */
export interface Option<V = any> {
  /** 显示标签 */
  label: string
  /** 选项值 */
  value: V
  /** 是否禁用 */
  disabled?: boolean
  /** 子选项 */
  children?: Option<V>[]
  /** 额外数据 */
  [key: string]: any
}

/**
 * 枚举项类型
 * @example
 * const statusEnum: EnumItem[] = [
 *   { label: "启用", value: 1, color: "green", icon: "check" },
 *   { label: "禁用", value: 0, color: "red", icon: "close" }
 * ]
 * const userType: EnumItem<string>[] = [
 *   { label: "管理员", value: "admin", description: "系统管理员" },
 *   { label: "普通用户", value: "user", description: "普通用户" }
 * ]
 */
export interface EnumItem<V = string | number> {
  /** 显示文本 */
  label: string
  /** 枚举值 */
  value: V
  /** 颜色标识 */
  color?: string
  /** 图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 描述 */
  description?: string
  /** 额外数据 */
  extra?: Record<string, any>
}

/**
 * 树形节点类型
 * @example
 * const tree: TreeNode[] = [
 *   {
 *     id: 1,
 *     parentId: null,
 *     label: "根节点",
 *     children: [
 *       { id: 2, parentId: 1, label: "子节点1", isLeaf: true },
 *       { id: 3, parentId: 1, label: "子节点2", disabled: true }
 *     ]
 *   }
 * ]
 * const menuTree: TreeNode<Menu>[] = [
 *   { id: 1, parentId: null, label: "系统管理", data: menuData }
 * ]
 */
export interface TreeNode<T = any> {
  /** 节点 ID */
  id: ID
  /** 父节点 ID */
  parentId: Nullable<ID>
  /** 节点标签 */
  label?: string
  /** 子节点 */
  children?: TreeNode<T>[]
  /** 是否叶子节点 */
  isLeaf?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 节点数据 */
  data?: T
  /** 额外属性 */
  [key: string]: any
}

/**
 * 范围类型
 * @example
 * const ageRange: Range = { start: 18, end: 65 }
 * const dateRange: Range<Date> = { start: new Date("2024-01-01"), end: new Date("2024-12-31") }
 * const priceRange: Range = { start: 100, end: 1000 }
 */
export interface Range<T = number> {
  /** 起始值 */
  start: T
  /** 结束值 */
  end: T
}

/**
 * 坐标类型
 * @example
 * const pos: Position = { x: 100, y: 200 }
 * const mousePos: Position = { x: event.clientX, y: event.clientY }
 */
export interface Position {
  /** X 坐标 */
  x: number
  /** Y 坐标 */
  y: number
}

/**
 * 尺寸类型
 * @example
 * const size: Size = { width: 800, height: 600 }
 * const imageSize: Size = { width: 1920, height: 1080 }
 */
export interface Size {
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
}

/**
 * 矩形区域类型
 * @example
 * const rect: Rect = { x: 10, y: 20, width: 100, height: 50 }
 * const viewport: Rect = { x: 0, y: 0, width: 1920, height: 1080 }
 */
export interface Rect extends Position, Size {}

/**
 * 分页信息类型
 * @example
 * const pagination: Pagination = {
 *   current: 1,
 *   pageSize: 10,
 *   total: 100,
 *   totalPages: 10
 * }
 */
export interface Pagination {
  /** 当前页码（从 1 开始） */
  current: number
  /** 每页大小 */
  pageSize: number
  /** 总记录数 */
  total: number
  /** 总页数 */
  totalPages?: number
}

/**
 * 排序信息类型
 * @example
 * const sort: Sort = { field: "createTime", order: "desc" }
 * const sorts: Sort[] = [
 *   { field: "priority", order: "desc" },
 *   { field: "createTime", order: "asc" }
 * ]
 */
export interface Sort {
  /** 排序字段 */
  field: string
  /** 排序方向 */
  order: 'asc' | 'desc' | 'ascend' | 'descend'
}

/**
 * 过滤信息类型
 * @example
 * const filter: Filter = { field: "status", operator: "eq", value: 1 }
 * const filters: Filter[] = [
 *   { field: "age", operator: "gte", value: 18 },
 *   { field: "name", operator: "like", value: "John" },
 *   { field: "status", operator: "in", value: [1, 2] }
 * ]
 */
export interface Filter {
  /** 过滤字段 */
  field: string
  /** 过滤操作符 */
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between'
  /** 过滤值 */
  value: any
}

/**
 * 时间范围类型
 */
export interface TimeRange {
  /** 开始时间 */
  startTime: Optional<string>
  /** 结束时间 */
  endTime: Optional<string>
}

/**
 * 状态类型
 */
export interface Status {
  /** 状态码 */
  code: number
  /** 状态文本 */
  text: string
  /** 状态类型 */
  type?: 'success' | 'warning' | 'error' | 'info' | 'default'
}

/**
 * 加载状态类型
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
 * 错误状态类型
 */
export interface ErrorState {
  /** 是否有错误 */
  hasError: boolean
  /** 错误消息 */
  message?: string
  /** 错误代码 */
  code?: string | number
  /** 错误详情 */
  details?: any
  /** 错误堆栈 */
  stack?: string
}

/**
 * 验证结果类型
 */
export interface ValidationResult {
  /** 是否有效 */
  valid: boolean
  /** 错误消息 */
  message?: string
  /** 错误字段 */
  field?: string
  /** 错误列表 */
  errors?: Array<{
    field: string
    message: string
  }>
}

/**
 * 操作结果类型
 */
export interface OperationResult<T = any> {
  /** 是否成功 */
  success: boolean
  /** 结果数据 */
  data?: T
  /** 消息 */
  message?: string
  /** 错误信息 */
  error?: Error | string
}

/**
 * 统计数据类型
 */
export interface Statistics {
  /** 总数 */
  total: number
  /** 今日新增 */
  todayAdd?: number
  /** 本周新增 */
  weekAdd?: number
  /** 本月新增 */
  monthAdd?: number
  /** 同比增长率（百分比） */
  growthRate?: number
  /** 环比增长率（百分比） */
  chainGrowthRate?: number
}

/**
 * 地址信息类型
 */
export interface Address {
  /** 国家 */
  country?: string
  /** 省份 */
  province?: string
  /** 城市 */
  city?: string
  /** 区县 */
  district?: string
  /** 详细地址 */
  detail?: string
  /** 邮政编码 */
  zipCode?: string
  /** 经度 */
  longitude?: number
  /** 纬度 */
  latitude?: number
}

/**
 * 联系方式类型
 */
export interface Contact {
  /** 姓名 */
  name?: string
  /** 手机号 */
  phone?: string
  /** 固定电话 */
  tel?: string
  /** 邮箱 */
  email?: string
  /** 地址 */
  address?: Address
}

/**
 * 文件信息类型
 * @example
 * const file: FileInfo = {
 *   id: "file_123",
 *   filename: "document.pdf",
 *   originalName: "我的文档.pdf",
 *   url: "https://cdn.example.com/files/document.pdf",
 *   size: 1024000,
 *   mimeType: "application/pdf",
 *   extension: "pdf",
 *   uploadTime: "2024-10-27T10:30:00Z"
 * }
 */
export interface FileInfo {
  /** 文件 ID */
  id?: ID
  /** 文件名 */
  filename: string
  /** 原始文件名 */
  originalName?: string
  /** 文件 URL */
  url: string
  /** 文件大小（字节） */
  size: number
  /** MIME 类型 */
  mimeType?: string
  /** 文件扩展名 */
  extension?: string
  /** 文件哈希值 */
  hash?: string
  /** 上传时间 */
  uploadTime?: string
  /** 上传者 ID */
  uploaderId?: ID
}

/**
 * 图片信息类型
 * @example
 * const image: ImageInfo = {
 *   filename: "avatar.jpg",
 *   url: "https://cdn.example.com/images/avatar.jpg",
 *   size: 204800,
 *   width: 800,
 *   height: 600,
 *   thumbnail: "https://cdn.example.com/images/avatar_thumb.jpg"
 * }
 */
export interface ImageInfo extends FileInfo {
  /** 图片宽度 */
  width?: number
  /** 图片高度 */
  height?: number
  /** 缩略图 URL */
  thumbnail?: string
}

/**
 * 审核信息类型
 */
export interface AuditInfo {
  /** 审核状态：0-待审核，1-审核通过，2-审核拒绝 */
  auditStatus: number
  /** 审核人 ID */
  auditorId?: ID
  /** 审核人姓名 */
  auditorName?: string
  /** 审核时间 */
  auditTime?: string
  /** 审核意见 */
  auditRemark?: string
}

/**
 * 版本信息类型
 */
export interface VersionInfo {
  /** 版本号 */
  version: string
  /** 版本名称 */
  name?: string
  /** 发布时间 */
  releaseDate?: string
  /** 更新内容 */
  changelog?: string[]
  /** 是否强制更新 */
  forceUpdate?: boolean
}
