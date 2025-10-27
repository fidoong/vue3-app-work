/**
 * HTTP 配置相关类型定义
 */

import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from './base'

/**
 * 请求配置（扩展 Axios 配置）
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 是否显示错误提示 */
  showError?: boolean
  /** 是否显示成功提示 */
  showSuccess?: boolean
  /** 成功提示消息 */
  successMessage?: string
  /** 是否需要认证 */
  requireAuth?: boolean
  /** 是否取消重复请求 */
  cancelDuplicated?: boolean
  /** 自定义错误处理 */
  customErrorHandler?: (error: any) => void
  /** 请求元数据 */
  meta?: Record<string, any>
}

/**
 * HTTP 客户端配置
 */
export interface HttpClientConfig {
  /** 基础 URL */
  baseURL: string
  /** 请求超时时间（毫秒） */
  timeout?: number
  /** 默认请求头 */
  headers?: Record<string, string>
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 是否显示错误提示 */
  showError?: boolean
  /** 是否需要认证 */
  requireAuth?: boolean
  /** 是否取消重复请求 */
  cancelDuplicated?: boolean
  /** 获取 Token 方法 */
  getToken?: () => Promise<string | null> | string | null
  /** Token 过期回调 */
  onTokenExpired?: () => void
  /** 请求拦截器 */
  onRequest?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  /** 响应拦截器 */
  onResponse?: (response: AxiosResponse<ApiResponse>) => any
  /** 响应错误拦截器 */
  onResponseError?: (error: any) => any
  /** 日志配置 */
  logger?: LoggerConfig
}

/**
 * 日志配置
 */
export interface LoggerConfig {
  /** 是否启用日志 */
  enabled: boolean
  /** 是否记录请求 */
  logRequest?: boolean
  /** 是否记录响应 */
  logResponse?: boolean
  /** 是否记录错误 */
  logError?: boolean
  /** 自定义日志处理器 */
  customLogger?: (type: 'request' | 'response' | 'error', data: any) => void
}

/**
 * 上传配置
 */
export interface UploadConfig extends RequestConfig {
  /** 文件字段名 */
  fieldName?: string
  /** 额外的表单数据 */
  formData?: Record<string, any>
  /** 上传进度回调 */
  onProgress?: (progress: number, loaded: number, total: number) => void
  /** 文件大小限制（字节） */
  maxSize?: number
  /** 允许的文件类型 */
  accept?: string[]
}

/**
 * 下载配置
 */
export interface DownloadConfig extends RequestConfig {
  /** 文件名 */
  filename?: string
  /** 下载进度回调 */
  onProgress?: (progress: number, loaded: number, total: number) => void
  /** 是否自动下载 */
  autoDownload?: boolean
}

/**
 * 错误处理配置
 */
export interface ErrorHandlerConfig {
  /** 是否显示错误提示 */
  showError?: boolean
  /** Token 过期回调 */
  onTokenExpired?: () => void
  /** 自定义错误消息映射 */
  errorMessages?: Record<number, string>
}
