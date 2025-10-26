/**
 * 验证工具函数
 */

/**
 * 验证邮箱
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * 验证手机号（中国）
 */
export function isPhone(value: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(value)
}

/**
 * 验证身份证号（中国）
 */
export function isIdCard(value: string): boolean {
  const idCardRegex = /^(?:\d{15}|\d{17}[\dX])$/i
  return idCardRegex.test(value)
}

/**
 * 验证 URL
 */
export function isUrl(value: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  }
  catch {
    return false
  }
}

/**
 * 验证 IP 地址
 */
export function isIP(value: string): boolean {
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/
  if (!ipRegex.test(value))
    return false

  const parts = value.split('.')
  return parts.every(part => Number.parseInt(part, 10) <= 255)
}

/**
 * 验证数字
 */
export function isNumber(value: any): boolean {
  return !Number.isNaN(Number(value))
}

/**
 * 验证整数
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(Number(value))
}

/**
 * 验证正整数
 */
export function isPositiveInteger(value: any): boolean {
  const num = Number(value)
  return Number.isInteger(num) && num > 0
}

/**
 * 验证范围
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * 验证长度
 */
export function isLengthInRange(value: string, min: number, max: number): boolean {
  const length = value.length
  return length >= min && length <= max
}

/**
 * 验证必填
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) {
    return false
  }
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return true
}

/**
 * 验证密码强度
 * @param value 密码
 * @returns 0-4 表示强度等级
 */
export function getPasswordStrength(value: string): number {
  let strength = 0

  if (value.length >= 8)
    strength++
  if (/[a-z]/.test(value))
    strength++
  if (/[A-Z]/.test(value))
    strength++
  if (/\d/.test(value))
    strength++
  if (/[^a-z\d]/i.test(value))
    strength++

  return Math.min(strength, 4)
}

/**
 * 验证中文
 */
export function isChinese(value: string): boolean {
  return /^[\u4E00-\u9FA5]+$/.test(value)
}

/**
 * 验证英文
 */
export function isEnglish(value: string): boolean {
  return /^[a-z]+$/i.test(value)
}

/**
 * 验证字母数字
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-z0-9]+$/i.test(value)
}
