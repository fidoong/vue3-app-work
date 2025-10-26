/**
 * HTTP 客户端实例配置
 */
import type { RequestConfig } from '../types'
import { HttpClientManager } from '../core'

/**
 * 主 API 客户端
 * 功能：缓存 + 重试 + 日志 + 认证
 */
export const apiClient = HttpClientManager.createClient('api', {
  // 基础配置
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'X-Client-Version': '1.0.0',
    'X-Platform': 'web',
  },

  // UI 交互
  showLoading: true,
  showError: true,
  cancelDuplicated: true,

  // 认证配置
  requireAuth: true,
  getToken: async () => {
    return localStorage.getItem('token')
  },
  onTokenExpired: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login?expired=1'
  },

  // 重试配置
  retry: {
    retries: 3,
    retryDelay: 1000,
    shouldRetry: (error: any) => {
      // 网络错误或服务器错误才重试
      if (!error.response) {
        return error.code !== 'ERR_CANCELED'
      }
      const status = error.response.status
      return status >= 500 || status === 429
    },
  },

  // 缓存配置
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5分钟
  },

  // 日志配置（仅开发环境）
  logger: {
    enabled: import.meta.env.DEV,
    logRequest: true,
    logResponse: true,
    logError: true,
  },

  // 请求拦截器
  onRequest: async (config: RequestConfig) => {
    // 添加请求追踪 ID
    config.headers = config.headers || {}
    config.headers['X-Request-ID'] = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

    // 添加用户信息
    const userId = localStorage.getItem('userId')
    if (userId) {
      config.headers['X-User-ID'] = userId
    }

    return config
  },

  // 响应拦截器
  onResponse: (response: any) => {
    return response
  },

  // 错误拦截器
  onResponseError: (error: any) => {
    if (error.response?.status === 429) {
      console.warn('请求过于频繁，请稍后再试')
    }
    return Promise.reject(error)
  },
})

/**
 * 文件上传客户端
 * 专门用于文件上传，超时时间更长
 */
export const uploadClient = HttpClientManager.createClient('upload', {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 300000, // 5分钟
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: async () => localStorage.getItem('token'),
  onTokenExpired: () => {
    window.location.href = '/login?expired=1'
  },
})

/**
 * 导出客户端管理器
 */
export { HttpClientManager }
