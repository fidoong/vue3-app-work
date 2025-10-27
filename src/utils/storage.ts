/**
 * 本地存储工具函数
 */

interface StorageOptions {
  /** 过期时间（毫秒） */
  expires?: number
  /** 是否加密 */
  encrypt?: boolean
}

interface StorageData<T> {
  value: T
  expires?: number
}

/**
 * 设置 localStorage（支持过期时间）
 * @param key - 存储键名
 * @param value - 存储值
 * @param options - 配置选项
 * @example
 * setLocal('user', { name: 'Alice' })
 * setLocal('token', 'abc123', { expires: 3600000 }) // 1小时后过期
 */
export function setLocal<T>(key: string, value: T, options?: StorageOptions): void {
  try {
    const data: StorageData<T> = { value }

    if (options?.expires) {
      data.expires = Date.now() + options.expires
    }

    const jsonStr = JSON.stringify(data)
    localStorage.setItem(key, jsonStr)
  }
  catch (error) {
    console.error('setLocal error:', error)
  }
}

/**
 * 获取 localStorage（自动处理过期）
 * @param key - 存储键名
 * @returns 存储的值或 null
 * @example
 * const user = getLocal<{ name: string }>('user')
 * if (user) {
 *   console.log(user.name)
 * }
 */
export function getLocal<T>(key: string): T | null {
  try {
    const jsonStr = localStorage.getItem(key)
    if (!jsonStr)
      return null

    const data: StorageData<T> = JSON.parse(jsonStr)

    // 检查是否过期
    if (data.expires && Date.now() > data.expires) {
      removeLocal(key)
      return null
    }

    return data.value
  }
  catch (error) {
    console.error('getLocal error:', error)
    return null
  }
}

/**
 * 删除 localStorage
 */
export function removeLocal(key: string): void {
  try {
    localStorage.removeItem(key)
  }
  catch (error) {
    console.error('removeLocal error:', error)
  }
}

/**
 * 清空 localStorage
 */
export function clearLocal(): void {
  try {
    localStorage.clear()
  }
  catch (error) {
    console.error('clearLocal error:', error)
  }
}

/**
 * 设置 sessionStorage
 */
export function setSession<T>(key: string, value: T): void {
  try {
    const jsonStr = JSON.stringify({ value })
    sessionStorage.setItem(key, jsonStr)
  }
  catch (error) {
    console.error('setSession error:', error)
  }
}

/**
 * 获取 sessionStorage
 */
export function getSession<T>(key: string): T | null {
  try {
    const jsonStr = sessionStorage.getItem(key)
    if (!jsonStr)
      return null

    const data: StorageData<T> = JSON.parse(jsonStr)
    return data.value
  }
  catch (error) {
    console.error('getSession error:', error)
    return null
  }
}

/**
 * 删除 sessionStorage
 */
export function removeSession(key: string): void {
  try {
    sessionStorage.removeItem(key)
  }
  catch (error) {
    console.error('removeSession error:', error)
  }
}

/**
 * 清空 sessionStorage
 */
export function clearSession(): void {
  try {
    sessionStorage.clear()
  }
  catch (error) {
    console.error('clearSession error:', error)
  }
}

/**
 * 设置 Cookie
 */
export function setCookie(name: string, value: string, days?: number): void {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

/**
 * 获取 Cookie
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ')
      c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0)
      return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * 删除 Cookie
 */
export function removeCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=-99999999;`
}
