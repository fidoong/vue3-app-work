/**
 * HTTP 请求核心类型定义
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

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
 * 请求配置扩展
 */
export interface RequestConfig extends AxiosRequestConfig {
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
  /** 是否取消重复请求 */
  cancelDuplicated?: boolean
  /** 是否使用缓存 */
  useCache?: boolean
  /** 缓存时间(ms) */
  cacheTTL?: number
}

/**
 * HTTP 客户端配置
 */
export interface HttpClientConfig {
  /** 基础 URL */
  baseURL: string
  /** 请求超时时间(ms) */
  timeout?: number
  /** 请求头 */
  headers?: Record<string, string>
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 是否显示错误提示 */
  showError?: boolean
  /** 是否需要认证 */
  requireAuth?: boolean
  /** 是否取消重复请求 */
  cancelDuplicated?: boolean
  /** 获取 Token 的方法 */
  getToken?: () => string | null | Promise<string | null>
  /** Token 过期处理 */
  onTokenExpired?: () => void
  /** 请求成功拦截器 */
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
  /** 响应成功拦截器 */
  onResponse?: <T = any>(response: AxiosResponse<ApiResponse<T>>) => any
  /** 响应错误拦截器 */
  onResponseError?: (error: any) => any
  /** 请求重试配置 */
  retry?: {
    retries?: number
    retryDelay?: number
    shouldRetry?: (error: any) => boolean
  }
  /** 请求缓存配置 */
  cache?: {
    enabled?: boolean
    ttl?: number
  }
  /** 请求队列配置 */
  queue?: {
    enabled?: boolean
    maxConcurrent?: number
  }
  /** 日志配置 */
  logger?: {
    enabled?: boolean
    logRequest?: boolean
    logResponse?: boolean
    logError?: boolean
  }
}

/**
 * 请求方法类型
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * 请求参数类型
 */
export interface RequestParams<T = any> {
  url: string
  method?: RequestMethod
  params?: any
  data?: T
  config?: RequestConfig
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
 * 上传文件配置
 */
export interface UploadConfig extends RequestConfig {
  /** 文件字段名 */
  fieldName?: string
  /** 额外的表单数据 */
  formData?: Record<string, any>
  /** 上传进度回调 */
  onProgress?: (progress: number) => void
}

/**
 * 下载文件配置
 */
export interface DownloadConfig extends RequestConfig {
  /** 文件名 */
  filename?: string
  /** 下载进度回调 */
  onProgress?: (progress: number) => void
}
