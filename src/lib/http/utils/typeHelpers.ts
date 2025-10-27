/**
 * HTTP 类型工具函数
 * 基于统一类型系统提供的工具类型
 */

import type {
  ApiResponse,
  CursorPageResult,
  PageResult,
} from '~/types/http'
// 类型工具（用于类型推导）
// import type {
//   ExtractApiData,
//   ExtractPageList,
// } from '~/types/utils/api-helpers'

/**
 * 提取 API 响应数据
 * @example
 * const response: ApiResponse<User> = await api.getUser(1)
 * const user = extractData(response) // User
 */
export function extractData<T>(response: ApiResponse<T>): T {
  return response.data
}

/**
 * 提取分页列表数据
 * @example
 * const response: ApiResponse<PageResult<User>> = await api.getUsers()
 * const users = extractPageList(response.data) // User[]
 */
export function extractPageList<T>(pageResult: PageResult<T> | CursorPageResult<T>): T[] {
  return pageResult.list
}

/**
 * 创建成功响应
 * @example
 * const response = createSuccessResponse({ id: 1, name: 'John' })
 */
export function createSuccessResponse<T>(data: T, message = '操作成功'): ApiResponse<T> {
  return {
    code: 200,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 创建错误响应
 * @example
 * const response = createErrorResponse(400, '参数错误')
 */
export function createErrorResponse(code: number, message: string): ApiResponse<null> {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
  }
}

/**
 * 创建分页响应
 * @example
 * const response = createPageResponse(users, 100, 1, 10)
 */
export function createPageResponse<T>(
  list: T[],
  total: number,
  pageNum: number,
  pageSize: number,
): ApiResponse<PageResult<T>> {
  return createSuccessResponse({
    list,
    total,
    pageNum,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasNext: pageNum * pageSize < total,
    hasPrev: pageNum > 1,
  })
}

/**
 * 判断是否为成功响应
 * @example
 * if (isSuccessResponse(response)) {
 *   console.log(response.data)
 * }
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): boolean {
  return response.code === 200 || response.code === 0
}

/**
 * 判断是否为错误响应
 * @example
 * if (isErrorResponse(response)) {
 *   console.error(response.message)
 * }
 */
export function isErrorResponse<T>(response: ApiResponse<T>): boolean {
  return !isSuccessResponse(response)
}

/**
 * 安全提取响应数据（失败时返回默认值）
 * @example
 * const user = safeExtractData(response, defaultUser)
 */
export function safeExtractData<T>(
  response: ApiResponse<T>,
  defaultValue: T,
): T {
  return isSuccessResponse(response) ? response.data : defaultValue
}

/**
 * 转换响应数据
 * @example
 * const userNames = transformResponse(response, users => users.map(u => u.name))
 */
export function transformResponse<T, R>(
  response: ApiResponse<T>,
  transformer: (data: T) => R,
): ApiResponse<R> {
  return {
    ...response,
    data: transformer(response.data),
  }
}

/**
 * 合并分页结果
 * @example
 * const merged = mergePageResults(page1, page2)
 */
export function mergePageResults<T>(
  ...results: PageResult<T>[]
): PageResult<T> {
  if (results.length === 0) {
    return {
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    }
  }

  const allItems = results.flatMap(r => r.list)
  const total = results.reduce((sum, r) => sum + r.total, 0)

  return {
    list: allItems,
    total,
    pageNum: 1,
    pageSize: allItems.length,
    totalPages: 1,
  }
}

/**
 * 类型安全的 API 数据提取
 * 使用类型系统的 ExtractApiData
 */
export type SafeExtractApiData<T> = T extends ApiResponse<infer D> ? D : never

/**
 * 类型安全的分页列表提取
 * 使用类型系统的 ExtractPageList
 */
export type SafeExtractPageList<T> = T extends PageResult<infer L> ? L : never
