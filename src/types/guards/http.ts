/**
 * HTTP 类型守卫
 * 提供 HTTP 相关的类型检查函数
 */

import type { ApiResponse, CursorPageResult, PageResult } from '../http/base'
import { hasProperty, isArray, isBoolean, isNumber, isObject, isString } from './common'

/**
 * 判断是否为 ApiResponse 类型
 */
export function isApiResponse<T = any>(value: unknown): value is ApiResponse<T> {
  return (
    isObject(value)
    && hasProperty(value, 'code')
    && isNumber(value.code)
    && hasProperty(value, 'message')
    && isString(value.message)
    && hasProperty(value, 'data')
  )
}

/**
 * 判断是否为成功的 ApiResponse
 */
export function isSuccessResponse<T = any>(
  value: unknown,
  successCode: number | number[] = [0, 200],
): value is ApiResponse<T> {
  if (!isApiResponse(value))
    return false
  const codes = Array.isArray(successCode) ? successCode : [successCode]
  return codes.includes(value.code)
}

/**
 * 判断是否为失败的 ApiResponse
 */
export function isErrorResponse(
  value: unknown,
  successCode: number | number[] = [0, 200],
): value is ApiResponse {
  if (!isApiResponse(value))
    return false
  const codes = Array.isArray(successCode) ? successCode : [successCode]
  return !codes.includes(value.code)
}

/**
 * 判断是否为 PageResult 类型
 */
export function isPageResult<T = any>(value: unknown): value is PageResult<T> {
  return (
    isObject(value)
    && hasProperty(value, 'list')
    && isArray(value.list)
    && hasProperty(value, 'total')
    && isNumber(value.total)
    && hasProperty(value, 'pageNum')
    && isNumber(value.pageNum)
    && hasProperty(value, 'pageSize')
    && isNumber(value.pageSize)
  )
}

/**
 * 判断是否为 CursorPageResult 类型
 */
export function isCursorPageResult<T = any>(value: unknown): value is CursorPageResult<T> {
  return (
    isObject(value)
    && hasProperty(value, 'list')
    && isArray(value.list)
    && hasProperty(value, 'hasMore')
    && isBoolean(value.hasMore)
  )
}

/**
 * 判断是否为分页响应（支持两种分页类型）
 */
export function isPaginatedResponse<T = any>(
  value: unknown,
): value is PageResult<T> | CursorPageResult<T> {
  return isPageResult(value) || isCursorPageResult(value)
}

/**
 * 判断响应码是否为成功状态
 */
export function isSuccessStatusCode(code: number): boolean {
  return code === 0 || code === 200 || (code >= 200 && code < 300)
}

/**
 * 判断响应码是否为客户端错误
 */
export function isClientErrorStatusCode(code: number): boolean {
  return code >= 400 && code < 500
}

/**
 * 判断响应码是否为服务器错误
 */
export function isServerErrorStatusCode(code: number): boolean {
  return code >= 500 && code < 600
}

/**
 * 判断响应码是否为认证错误
 */
export function isAuthErrorStatusCode(code: number): boolean {
  return code === 401 || code === 403 || code === 1002 || code === 1003
}

/**
 * 类型断言：确保值为 ApiResponse
 */
export function assertApiResponse<T = any>(
  value: unknown,
  message = 'Value is not a valid ApiResponse',
): asserts value is ApiResponse<T> {
  if (!isApiResponse(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为成功的 ApiResponse
 */
export function assertSuccessResponse<T = any>(
  value: unknown,
  successCode: number | number[] = [0, 200],
  message = 'Response is not successful',
): asserts value is ApiResponse<T> {
  if (!isSuccessResponse(value, successCode)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为 PageResult
 */
export function assertPageResult<T = any>(
  value: unknown,
  message = 'Value is not a valid PageResult',
): asserts value is PageResult<T> {
  if (!isPageResult(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为 CursorPageResult
 */
export function assertCursorPageResult<T = any>(
  value: unknown,
  message = 'Value is not a valid CursorPageResult',
): asserts value is CursorPageResult<T> {
  if (!isCursorPageResult(value)) {
    throw new Error(message)
  }
}

/**
 * 安全提取 ApiResponse 的 data
 */
export function extractResponseData<T>(
  response: unknown,
  defaultValue?: T,
): T | undefined {
  if (isApiResponse<T>(response) && isSuccessResponse(response)) {
    return response.data
  }
  return defaultValue
}

/**
 * 安全提取 PageResult 的 list
 */
export function extractPageList<T>(
  response: unknown,
  defaultValue: T[] = [],
): T[] {
  if (isPageResult<T>(response)) {
    return response.list
  }
  if (isCursorPageResult<T>(response)) {
    return response.list
  }
  return defaultValue
}
