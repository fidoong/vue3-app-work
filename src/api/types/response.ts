/**
 * 统一响应数据结构
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 时间戳 */
  timestamp?: number
  /** 请求追踪ID */
  traceId?: string
}

/**
 * 分页请求参数
 */
export interface PageParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 排序字段 */
  sortBy?: string
  /** 排序方式 */
  sortOrder?: 'asc' | 'desc'
}

/**
 * 分页响应数据
 */
export interface PageData<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总记录数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

/**
 * 列表响应数据
 */
export interface ListData<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总记录数 */
  total?: number
}

/**
 * 业务错误码枚举
 */
export enum ApiCode {
  /** 成功 */
  SUCCESS = 200,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 无权限 */
  FORBIDDEN = 403,
  /** 资源不存在 */
  NOT_FOUND = 404,
  /** 请求超时 */
  TIMEOUT = 408,
  /** 服务器错误 */
  SERVER_ERROR = 500,
  /** 业务错误 */
  BUSINESS_ERROR = 1000,
  /** 参数错误 */
  PARAM_ERROR = 1001,
  /** Token过期 */
  TOKEN_EXPIRED = 1002,
  /** Token无效 */
  TOKEN_INVALID = 1003,
}

/**
 * 请求配置扩展
 */
export interface RequestConfig {
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 是否显示错误提示 */
  showError?: boolean
  /** 是否显示成功提示 */
  showSuccess?: boolean
  /** 自定义成功提示消息 */
  successMessage?: string
  /** 是否需要认证 */
  requireAuth?: boolean
  /** 请求重试次数 */
  retryCount?: number
  /** 请求超时时间(ms) */
  timeout?: number
}
