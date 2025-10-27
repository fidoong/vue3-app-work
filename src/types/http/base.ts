/**
 * HTTP 基础类型定义
 * 定义最底层的通用类型，不依赖任何业务逻辑
 */

/**
 * 统一响应结构 - 标准版
 * @example
 * const response: ApiResponse<User> = {
 *   code: 200,
 *   message: "success",
 *   data: { id: 1, name: "John" },
 *   timestamp: 1698765432000
 * }
 * const errorResponse: ApiResponse = {
 *   code: 400,
 *   message: "参数错误",
 *   data: null
 * }
 */
export interface ApiResponse<T = any> {
  /** 响应码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 时间戳 */
  timestamp?: number
}

/**
 * 统一响应结构 - 扩展版（支持更多字段）
 * @example
 * const response: ApiResponseExtended<User> = {
 *   code: 200,
 *   message: "success",
 *   data: user,
 *   timestamp: 1698765432000,
 *   traceId: "trace_abc123",
 *   serverTime: 1698765432000,
 *   meta: { version: "1.0.0" }
 * }
 */
export interface ApiResponseExtended<T = any> extends ApiResponse<T> {
  /** 请求追踪 ID */
  traceId?: string
  /** 服务器时间 */
  serverTime?: number
  /** 额外元数据 */
  meta?: Record<string, any>
}

/**
 * 分页响应结构
 * @example
 * const pageResult: PageResult<User> = {
 *   list: [user1, user2, user3],
 *   total: 100,
 *   pageNum: 1,
 *   pageSize: 10,
 *   totalPages: 10,
 *   hasNext: true,
 *   hasPrev: false
 * }
 */
export interface PageResult<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总记录数 */
  total: number
  /** 当前页码 */
  pageNum: number
  /** 每页大小 */
  pageSize: number
  /** 总页数（可选） */
  totalPages?: number
  /** 是否有下一页（可选） */
  hasNext?: boolean
  /** 是否有上一页（可选） */
  hasPrev?: boolean
}

/**
 * 游标分页响应结构（适用于无限滚动）
 * @example
 * const cursorResult: CursorPageResult<Post> = {
 *   list: [post1, post2, post3],
 *   nextCursor: "cursor_abc123",
 *   hasMore: true,
 *   total: 1000
 * }
 * // 最后一页
 * const lastPage: CursorPageResult<Post> = {
 *   list: [post98, post99, post100],
 *   nextCursor: null,
 *   hasMore: false
 * }
 */
export interface CursorPageResult<T = any> {
  /** 数据列表 */
  list: T[]
  /** 下一页游标 */
  nextCursor?: string | null
  /** 是否有更多数据 */
  hasMore: boolean
  /** 总数（可选，某些场景不返回） */
  total?: number
}

/**
 * 树形数据响应结构
 */
export interface TreeResult<T = any> {
  /** 树形数据 */
  tree: T[]
  /** 总节点数（可选） */
  totalNodes?: number
}

/**
 * 批量操作响应结构
 * @example
 * const batchResult: BatchResult<User> = {
 *   successCount: 8,
 *   failCount: 2,
 *   successList: [user1, user2, ...],
 *   failList: [
 *     { data: user9, reason: "用户名已存在" },
 *     { data: user10, reason: "邮箱格式错误" }
 *   ]
 * }
 */
export interface BatchResult<T = any> {
  /** 成功数量 */
  successCount: number
  /** 失败数量 */
  failCount: number
  /** 成功的数据 */
  successList?: T[]
  /** 失败的数据 */
  failList?: Array<{
    data: T
    reason: string
  }>
}

/**
 * 通用 ID 类型
 */
export type ID = string | number

/**
 * 时间戳类型（毫秒）
 */
export type Timestamp = number

/**
 * 日期字符串类型（ISO 8601）
 */
export type DateString = string

/**
 * 状态码枚举
 */
export enum StatusCode {
  /** 成功 */
  SUCCESS = 200,
  /** 成功（备用） */
  OK = 0,
  /** 参数错误 */
  BAD_REQUEST = 400,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 无权限 */
  FORBIDDEN = 403,
  /** 资源不存在 */
  NOT_FOUND = 404,
  /** 请求超时 */
  TIMEOUT = 408,
  /** 请求过于频繁 */
  TOO_MANY_REQUESTS = 429,
  /** 服务器错误 */
  INTERNAL_ERROR = 500,
  /** 服务不可用 */
  SERVICE_UNAVAILABLE = 503,
  /** Token 过期 */
  TOKEN_EXPIRED = 1002,
  /** Token 无效 */
  TOKEN_INVALID = 1003,
}

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * 内容类型
 */
export enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
  MULTIPART = 'multipart/form-data',
  TEXT = 'text/plain',
  HTML = 'text/html',
  XML = 'application/xml',
}
