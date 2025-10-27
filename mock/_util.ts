import type { MockMethod } from 'vite-plugin-mock'

/**
 * 统一响应结构
 */
export interface ResponseResult<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

/**
 * 分页响应结构
 */
export interface PageResult<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/**
 * 创建成功响应
 */
export function successResult<T = any>(data: T, message = 'success'): ResponseResult<T> {
  return {
    code: 200,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 创建失败响应
 */
export function errorResult(message = 'error', code = 500, data: any = null): ResponseResult {
  return {
    code,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 创建分页数据
 */
export function createPageResult<T = any>(
  list: T[],
  pageNum: number,
  pageSize: number,
): ResponseResult<PageResult<T>> {
  const total = list.length
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize
  const pageList = list.slice(start, end)

  return successResult({
    list: pageList,
    total,
    pageNum,
    pageSize,
  })
}

/**
 * 从请求中获取 token
 */
export function getRequestToken(request: any): string | null {
  return request?.headers?.authorization?.replace('Bearer ', '') || null
}

/**
 * 延迟响应（模拟网络延迟）
 */
export function delay(time = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 随机生成指定范围的整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 随机选择数组中的元素
 */
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export type { MockMethod }
