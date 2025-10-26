/**
 * API 配置
 */

/** API 基础路径 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/** API 超时时间(ms) */
export const API_TIMEOUT = 30000

/** 请求重试次数 */
export const RETRY_COUNT = 3

/** 请求重试延迟(ms) */
export const RETRY_DELAY = 1000

/** Token 存储键名 */
export const TOKEN_KEY = 'access_token'

/** Refresh Token 存储键名 */
export const REFRESH_TOKEN_KEY = 'refresh_token'

/** 请求头配置 */
export const REQUEST_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
}

/** 不需要 Token 的接口白名单 */
export const AUTH_WHITELIST = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
  '/auth/captcha',
]
