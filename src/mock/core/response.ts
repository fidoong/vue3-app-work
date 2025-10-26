/**
 * Mock 响应工具
 * 与 lib/http/types 的 ApiResponse 保持一致
 */
import type { MockPageData, MockResponse } from './types'

/**
 * 成功响应
 */
export function successResponse<T = any>(
  data: T,
  message = '操作成功',
): MockResponse<T> {
  return {
    code: 200,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 失败响应
 */
export function errorResponse(
  message = '操作失败',
  code = 500,
  data: any = null,
): MockResponse {
  return {
    code,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 分页响应
 */
export function pageResponse<T = any>(
  list: T[],
  page: number,
  pageSize: number,
  total?: number,
): MockResponse<MockPageData<T>> {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageList = list.slice(startIndex, endIndex)
  const actualTotal = total ?? list.length

  return successResponse<MockPageData<T>>({
    list: pageList,
    page,
    pageSize,
    total: actualTotal,
    totalPages: Math.ceil(actualTotal / pageSize),
  })
}

/**
 * 列表响应
 */
export function listResponse<T = any>(list: T[]): MockResponse<{ list: T[], total: number }> {
  return successResponse({
    list,
    total: list.length,
  })
}

/**
 * Token 过期响应
 */
export function tokenExpiredResponse(): MockResponse {
  return {
    code: 401,
    message: '登录已过期，请重新登录',
    data: null,
    timestamp: Date.now(),
  }
}

/**
 * 无权限响应
 */
export function forbiddenResponse(message = '无权限访问'): MockResponse {
  return {
    code: 403,
    message,
    data: null,
    timestamp: Date.now(),
  }
}

/**
 * 未找到响应
 */
export function notFoundResponse(message = '数据不存在'): MockResponse {
  return {
    code: 404,
    message,
    data: null,
    timestamp: Date.now(),
  }
}

/**
 * 参数错误响应
 */
export function badRequestResponse(message = '参数错误'): MockResponse {
  return {
    code: 400,
    message,
    data: null,
    timestamp: Date.now(),
  }
}
