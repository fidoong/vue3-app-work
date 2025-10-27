/**
 * 加密解密工具函数
 */

/**
 * Base64 编码
 */
export function base64Encode(str: string): string {
  return btoa(encodeURIComponent(str))
}

/**
 * Base64 解码
 */
export function base64Decode(str: string): string {
  return decodeURIComponent(atob(str))
}

/**
 * 简单加密（仅用于前端展示，不安全）
 */
export function simpleEncrypt(str: string, key = 'default-key'): string {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    result += String.fromCharCode(charCode)
  }
  return base64Encode(result)
}

/**
 * 简单解密
 */
export function simpleDecrypt(str: string, key = 'default-key'): string {
  const decoded = base64Decode(str)
  let result = ''
  for (let i = 0; i < decoded.length; i++) {
    const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    result += String.fromCharCode(charCode)
  }
  return result
}

/**
 * MD5 哈希（需要引入 crypto-js 库）
 */
export function md5(str: string): string {
  // 简单实现，生产环境建议使用 crypto-js
  console.warn('请使用 crypto-js 库实现 MD5')
  return str
}

/**
 * SHA256 哈希（需要引入 crypto-js 库）
 */
export function sha256(str: string): string {
  // 简单实现，生产环境建议使用 crypto-js
  console.warn('请使用 crypto-js 库实现 SHA256')
  return str
}

/**
 * 生成随机字符串
 * @param length - 字符串长度
 * @returns 随机字符串
 * @example
 * randomString(8) // 'aB3xY9Zk'
 * randomString(16) // 'mN7pQ2rS4tU6vW8x'
 */
export function randomString(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  return result
}

/**
 * 生成 UUID（v4 格式）
 * @returns UUID 字符串
 * @example
 * uuid() // '550e8400-e29b-41d4-a716-446655440000'
 * uuid() // '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 生成唯一 ID
 */
export function uniqueId(prefix = ''): string {
  return `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 9)}`
}
