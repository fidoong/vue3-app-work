/**
 * 日志相关类型定义
 */

import type { ID } from '../http/base'
import type { BaseEntity } from './common'

// ==================== 操作日志 ====================

/**
 * 操作日志
 */
export interface OperationLog extends BaseEntity {
  /** 模块名称 */
  module: string
  /** 操作类型 */
  operation: string
  /** 请求方法 */
  method: string
  /** 请求 URL */
  requestUrl: string
  /** 请求方式 */
  requestMethod: string
  /** 请求参数 */
  requestParams?: string
  /** 响应数据 */
  responseData?: string
  /** IP 地址 */
  ip: string
  /** 地理位置 */
  location?: string
  /** 浏览器 */
  browser?: string
  /** 操作系统 */
  os?: string
  /** 状态：0-失败，1-成功 */
  status: number
  /** 错误消息 */
  errorMsg?: string
  /** 操作时间 */
  operateTime: string
  /** 耗时（毫秒） */
  costTime: number
  /** 操作人 ID */
  operatorId: ID
  /** 操作人姓名 */
  operatorName: string
}

/**
 * 操作日志查询参数
 */
export interface OperationLogQueryParams {
  /** 模块名称 */
  module?: string
  /** 操作类型 */
  operation?: string
  /** 操作人姓名 */
  operatorName?: string
  /** 状态 */
  status?: number
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}

// ==================== 登录日志 ====================

/**
 * 登录日志
 */
export interface LoginLog extends BaseEntity {
  /** 用户名 */
  username: string
  /** IP 地址 */
  ip: string
  /** 地理位置 */
  location?: string
  /** 浏览器 */
  browser?: string
  /** 操作系统 */
  os?: string
  /** 状态：0-失败，1-成功 */
  status: number
  /** 消息 */
  message?: string
  /** 登录时间 */
  loginTime: string
}

/**
 * 登录日志查询参数
 */
export interface LoginLogQueryParams {
  /** 用户名 */
  username?: string
  /** IP 地址 */
  ip?: string
  /** 状态 */
  status?: number
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}

// ==================== 错误日志 ====================

/**
 * 错误日志
 */
export interface ErrorLog extends BaseEntity {
  /** 错误类型 */
  errorType: string
  /** 错误消息 */
  errorMessage: string
  /** 错误堆栈 */
  errorStack?: string
  /** 请求 URL */
  requestUrl?: string
  /** 请求方法 */
  requestMethod?: string
  /** 请求参数 */
  requestParams?: string
  /** 用户 ID */
  userId?: ID
  /** 用户名 */
  username?: string
  /** IP 地址 */
  ip?: string
  /** 浏览器 */
  browser?: string
  /** 操作系统 */
  os?: string
  /** 发生时间 */
  occurTime: string
}

/**
 * 错误日志查询参数
 */
export interface ErrorLogQueryParams {
  /** 错误类型 */
  errorType?: string
  /** 用户名 */
  username?: string
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}
