/**
 * HTTP 客户端实例配置
 * 在这里配置不同的服务实例
 */
import { HttpClientManager } from '../core'

/**
 * 主服务 API 客户端
 */
export const mainClient = HttpClientManager.createClient('main', {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
  onTokenExpired: () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  },
})

/**
 * 用户服务 API 客户端
 */
export const userClient = HttpClientManager.createClient('user', {
  baseURL: import.meta.env.VITE_USER_API_BASE_URL || '/api/user',
  timeout: 10000,
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
  onTokenExpired: () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  },
})

/**
 * 文件服务 API 客户端
 */
export const fileClient = HttpClientManager.createClient('file', {
  baseURL: import.meta.env.VITE_FILE_API_BASE_URL || '/api/file',
  timeout: 60000, // 文件上传超时时间更长
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
})

/**
 * 第三方服务 API 客户端（不需要认证）
 */
export const thirdPartyClient = HttpClientManager.createClient('thirdParty', {
  baseURL: import.meta.env.VITE_THIRD_PARTY_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  showLoading: false,
  showError: true,
  requireAuth: false, // 不需要认证
})

/**
 * 导出客户端管理器，用于动态管理
 */
export { HttpClientManager }
