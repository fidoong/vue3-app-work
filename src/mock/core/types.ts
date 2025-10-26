/**
 * Mock 核心类型定义
 */

/**
 * Mock 响应结构（与 API 响应保持一致）
 */
export interface MockResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
  traceId?: string
}

/**
 * 分页数据结构
 */
export interface MockPageData<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Mock 配置
 */
export interface MockConfig {
  /** 是否启用 Mock */
  enabled?: boolean
  /** 响应延迟(ms) */
  timeout?: number
  /** 是否打印日志 */
  logger?: boolean
}

/**
 * CRUD Mock 配置
 */
export interface CrudMockOptions {
  /** 响应延迟(ms) */
  timeout?: number
  /** ID 字段名 */
  idField?: string
  /** 是否支持分页 */
  pagination?: boolean
  /** 是否支持搜索 */
  searchable?: boolean
  /** 搜索字段 */
  searchFields?: string[]
}

/**
 * Mock 请求对象
 */
export interface MockRequest {
  url: string
  method: string
  body?: string
  headers?: Record<string, string>
  query?: Record<string, any>
}

/**
 * Mock 响应函数
 */
export type MockResponseFunction<T = any> = (
  req: MockRequest,
) => MockResponse<T> | Promise<MockResponse<T>>

/**
 * Mock 方法定义
 */
export interface MockMethodDefinition {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  timeout?: number
  response: MockResponseFunction | MockResponse
}
