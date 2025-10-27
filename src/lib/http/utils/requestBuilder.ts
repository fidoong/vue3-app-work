/**
 * 请求构建器
 * 提供类型安全的请求构建功能
 */

import type {
  CursorPageParams,
  HttpMethod,
  PageParams,
  QueryParams,
  RequestConfig,
} from '~/types/http'

/**
 * 请求构建器类
 * @example
 * const request = new RequestBuilder()
 *   .url('/api/users')
 *   .method('GET')
 *   .params({ page: 1, size: 10 })
 *   .build()
 */
export class RequestBuilder {
  private config: RequestConfig = {}

  /**
   * 设置请求 URL
   */
  url(url: string): this {
    this.config.url = url
    return this
  }

  /**
   * 设置请求方法
   */
  method(method: HttpMethod): this {
    this.config.method = method
    return this
  }

  /**
   * 设置查询参数
   */
  params(params: Record<string, any>): this {
    this.config.params = params
    return this
  }

  /**
   * 设置请求体数据
   */
  data(data: any): this {
    this.config.data = data
    return this
  }

  /**
   * 设置请求头
   */
  headers(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers }
    return this
  }

  /**
   * 设置单个请求头
   */
  header(key: string, value: string): this {
    if (!this.config.headers) {
      this.config.headers = {}
    }
    this.config.headers[key] = value
    return this
  }

  /**
   * 设置超时时间
   */
  timeout(timeout: number): this {
    this.config.timeout = timeout
    return this
  }

  /**
   * 显示加载提示
   */
  showLoading(show = true): this {
    this.config.showLoading = show
    return this
  }

  /**
   * 显示错误提示
   */
  showError(show = true): this {
    this.config.showError = show
    return this
  }

  /**
   * 显示成功提示
   */
  showSuccess(message?: string): this {
    this.config.showSuccess = true
    if (message) {
      this.config.successMessage = message
    }
    return this
  }

  /**
   * 需要认证
   */
  requireAuth(require = true): this {
    this.config.requireAuth = require
    return this
  }

  /**
   * 取消重复请求
   */
  cancelDuplicated(cancel = true): this {
    this.config.cancelDuplicated = cancel
    return this
  }

  /**
   * 设置元数据
   */
  meta(meta: Record<string, any>): this {
    this.config.meta = meta
    return this
  }

  /**
   * 构建请求配置
   */
  build(): RequestConfig {
    return { ...this.config }
  }

  /**
   * 重置构建器
   */
  reset(): this {
    this.config = {}
    return this
  }
}

/**
 * 创建请求构建器
 * @example
 * const config = createRequest()
 *   .url('/api/users')
 *   .method('GET')
 *   .build()
 */
export function createRequest(): RequestBuilder {
  return new RequestBuilder()
}

/**
 * 创建 GET 请求配置
 * @example
 * const config = createGetRequest('/api/users', { page: 1 })
 */
export function createGetRequest(url: string, params?: any): RequestConfig {
  return createRequest()
    .url(url)
    .method('GET')
    .params(params)
    .build()
}

/**
 * 创建 POST 请求配置
 * @example
 * const config = createPostRequest('/api/users', userData)
 */
export function createPostRequest(url: string, data?: any): RequestConfig {
  return createRequest()
    .url(url)
    .method('POST')
    .data(data)
    .build()
}

/**
 * 创建 PUT 请求配置
 * @example
 * const config = createPutRequest('/api/users/1', userData)
 */
export function createPutRequest(url: string, data?: any): RequestConfig {
  return createRequest()
    .url(url)
    .method('PUT')
    .data(data)
    .build()
}

/**
 * 创建 DELETE 请求配置
 * @example
 * const config = createDeleteRequest('/api/users/1')
 */
export function createDeleteRequest(url: string, params?: any): RequestConfig {
  return createRequest()
    .url(url)
    .method('DELETE')
    .params(params)
    .build()
}

/**
 * 创建分页请求参数
 * @example
 * const params = createPageParams(1, 10, { name: 'John' })
 */
export function createPageParams(
  pageNum: number,
  pageSize: number,
  query?: Record<string, any>,
): PageParams {
  return {
    pageNum,
    pageSize,
    ...query,
  }
}

/**
 * 创建游标分页请求参数
 * @example
 * const params = createCursorPageParams('cursor_123', 20)
 */
export function createCursorPageParams(
  cursor?: string,
  limit = 20,
  query?: Record<string, any>,
): CursorPageParams {
  return {
    cursor,
    limit,
    ...query,
  }
}

/**
 * 创建查询参数
 * @example
 * const params = createQueryParams({ name: 'John', age: 30 })
 */
export function createQueryParams(query: Record<string, any>): QueryParams {
  return query
}

/**
 * URL 参数构建器
 * @example
 * const url = buildUrl('/api/users', { page: 1, size: 10 })
 * // "/api/users?page=1&size=10"
 */
export function buildUrl(baseUrl: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * 路径参数替换
 * @example
 * const url = buildPathUrl('/api/users/:id/posts/:postId', { id: 1, postId: 2 })
 * // "/api/users/1/posts/2"
 */
export function buildPathUrl(template: string, params: Record<string, any>): string {
  return template.replace(/:(\w+)/g, (_, key) => {
    const value = params[key]
    if (value === undefined || value === null) {
      throw new Error(`Missing path parameter: ${key}`)
    }
    return encodeURIComponent(String(value))
  })
}
