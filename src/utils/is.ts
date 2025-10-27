/**
 * 类型判断工具函数
 */

/**
 * 获取数据类型
 * @param value - 任意值
 * @returns 类型字符串
 * @example
 * getType([]) // 'array'
 * getType({}) // 'object'
 * getType(null) // 'null'
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

/**
 * 判断是否为 undefined
 * @param value - 任意值
 * @returns 是否为 undefined
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}

/**
 * 判断是否为 null
 * @param value - 任意值
 * @returns 是否为 null
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * 判断是否为 null 或 undefined
 * @param value - 任意值
 * @returns 是否为 null 或 undefined
 * @example
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 判断是否为布尔值
 * @param value - 任意值
 * @returns 是否为布尔值
 * @example
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(1) // false
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断是否为字符串
 * @param value - 任意值
 * @returns 是否为字符串
 * @example
 * isString('hello') // true
 * isString(123) // false
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * 判断是否为数字
 * @param value - 任意值
 * @returns 是否为数字
 * @example
 * isNumber(123) // true
 * isNumber(NaN) // true
 * isNumber('123') // false
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

/**
 * 判断是否为有效数字（排除 NaN）
 * @param value - 任意值
 * @returns 是否为有效数字
 * @example
 * isValidNumber(123) // true
 * isValidNumber(NaN) // false
 * isValidNumber(Infinity) // false
 */
export function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

/**
 * 判断是否为函数
 * @param value - 任意值
 * @returns 是否为函数
 * @example
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction(class {}) // true
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 判断是否为对象
 * @param value - 任意值
 * @returns 是否为对象
 * @example
 * isObject({}) // true
 * isObject([]) // true
 * isObject(null) // false
 */
export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object'
}

/**
 * 判断是否为纯对象
 * @param value - 任意值
 * @returns 是否为纯对象
 * @example
 * isPlainObject({}) // true
 * isPlainObject(new Object()) // true
 * isPlainObject([]) // false
 * isPlainObject(null) // false
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!isObject(value))
    return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 判断是否为数组
 * @param value - 任意值
 * @returns 是否为数组
 * @example
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray('123') // false
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 判断是否为日期对象
 * @param value - 任意值
 * @returns 是否为日期对象
 * @example
 * isDate(new Date()) // true
 * isDate('2024-10-28') // false
 */
export function isDate(value: any): value is Date {
  return value instanceof Date
}

/**
 * 判断是否为正则表达式
 * @param value - 任意值
 * @returns 是否为正则表达式
 * @example
 * isRegExp(/test/) // true
 * isRegExp(new RegExp('test')) // true
 * isRegExp('/test/') // false
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp
}

/**
 * 判断是否为 Promise
 * @param value - 任意值
 * @returns 是否为 Promise
 * @example
 * isPromise(Promise.resolve()) // true
 * isPromise(new Promise(() => {})) // true
 * isPromise({ then: () => {} }) // true
 */
export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise || (isObject(value) && isFunction((value as any).then))
}

/**
 * 判断是否为 Symbol
 * @param value - 任意值
 * @returns 是否为 Symbol
 * @example
 * isSymbol(Symbol('test')) // true
 * isSymbol('symbol') // false
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 判断是否为 Map
 * @param value - 任意值
 * @returns 是否为 Map
 * @example
 * isMap(new Map()) // true
 * isMap({}) // false
 */
export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map
}

/**
 * 判断是否为 Set
 * @param value - 任意值
 * @returns 是否为 Set
 * @example
 * isSet(new Set()) // true
 * isSet([]) // false
 */
export function isSet(value: any): value is Set<any> {
  return value instanceof Set
}

/**
 * 判断是否为 WeakMap
 * @param value - 任意值
 * @returns 是否为 WeakMap
 * @example
 * isWeakMap(new WeakMap()) // true
 */
export function isWeakMap(value: any): value is WeakMap<any, any> {
  return value instanceof WeakMap
}

/**
 * 判断是否为 WeakSet
 * @param value - 任意值
 * @returns 是否为 WeakSet
 * @example
 * isWeakSet(new WeakSet()) // true
 */
export function isWeakSet(value: any): value is WeakSet<any> {
  return value instanceof WeakSet
}

/**
 * 判断是否为空值（null、undefined、空字符串、空数组、空对象）
 * @param value - 任意值
 * @returns 是否为空值
 * @example
 * isEmpty(null) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false
 */
export function isEmpty(value: any): boolean {
  if (isNil(value))
    return true
  if (isString(value) || isArray(value))
    return value.length === 0
  if (isMap(value) || isSet(value))
    return value.size === 0
  if (isPlainObject(value))
    return Object.keys(value).length === 0
  return false
}

/**
 * 判断是否为 Error 对象
 * @param value - 任意值
 * @returns 是否为 Error 对象
 * @example
 * isError(new Error()) // true
 * isError(new TypeError()) // true
 * isError('error') // false
 */
export function isError(value: any): value is Error {
  return value instanceof Error
}

/**
 * 判断是否为浏览器环境
 * @returns 是否为浏览器环境
 * @example
 * isBrowser() // true (在浏览器中)
 * isBrowser() // false (在 Node.js 中)
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 判断是否为移动端
 * @returns 是否为移动端
 * @example
 * isMobile() // true (在移动设备上)
 * isMobile() // false (在桌面设备上)
 */
export function isMobile(): boolean {
  if (!isBrowser())
    return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 判断是否为 iOS 设备
 * @returns 是否为 iOS 设备
 * @example
 * isIOS() // true (在 iPhone/iPad 上)
 */
export function isIOS(): boolean {
  if (!isBrowser())
    return false
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

/**
 * 判断是否为 Android 设备
 * @returns 是否为 Android 设备
 * @example
 * isAndroid() // true (在 Android 设备上)
 */
export function isAndroid(): boolean {
  if (!isBrowser())
    return false
  return /Android/i.test(navigator.userAgent)
}

/**
 * 判断是否为微信浏览器
 * @returns 是否为微信浏览器
 * @example
 * isWeChat() // true (在微信中打开)
 */
export function isWeChat(): boolean {
  if (!isBrowser())
    return false
  return /MicroMessenger/i.test(navigator.userAgent)
}

/**
 * 判断是否为暗黑模式
 * @returns 是否为暗黑模式
 * @example
 * isDarkMode() // true (系统为暗黑模式)
 */
export function isDarkMode(): boolean {
  if (!isBrowser())
    return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 判断是否为 URL
 * @param value - 任意值
 * @returns 是否为有效的 URL
 * @example
 * isURL('https://example.com') // true
 * isURL('http://localhost:3000') // true
 * isURL('not a url') // false
 */
export function isURL(value: string): boolean {
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
 * 判断是否为邮箱
 * @param value - 任意值
 * @returns 是否为有效的邮箱
 * @example
 * isEmail('test@example.com') // true
 * isEmail('invalid.email') // false
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * 判断是否为手机号（中国大陆）
 * @param value - 任意值
 * @returns 是否为有效的手机号
 * @example
 * isPhone('13812345678') // true
 * isPhone('12345678901') // false
 */
export function isPhone(value: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(value)
}

/**
 * 判断是否为身份证号（中国大陆）
 * @param value - 任意值
 * @returns 是否为有效的身份证号
 * @example
 * isIdCard('110101199001011234') // true
 */
export function isIdCard(value: string): boolean {
  const idCardRegex = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/i
  return idCardRegex.test(value)
}

/**
 * 判断是否为 IPv4 地址
 * @param value - 任意值
 * @returns 是否为有效的 IPv4 地址
 * @example
 * isIPv4('192.168.1.1') // true
 * isIPv4('256.1.1.1') // false
 */
export function isIPv4(value: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return ipv4Regex.test(value)
}

/**
 * 判断是否为 IPv6 地址
 * @param value - 任意值
 * @returns 是否为有效的 IPv6 地址
 * @example
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 */
export function isIPv6(value: string): boolean {
  const ipv6Regex = /^(?:[\da-f]{1,4}:){7}[\da-f]{1,4}$/i
  return ipv6Regex.test(value)
}

/**
 * 判断是否为十六进制颜色值
 * @param value - 任意值
 * @returns 是否为有效的十六进制颜色值
 * @example
 * isHexColor('#fff') // true
 * isHexColor('#ffffff') // true
 * isHexColor('rgb(255,255,255)') // false
 */
export function isHexColor(value: string): boolean {
  const hexColorRegex = /^#?(?:[\da-f]{3}|[\da-f]{6})$/i
  return hexColorRegex.test(value)
}

/**
 * 判断是否为 Base64 字符串
 * @param value - 任意值
 * @returns 是否为 Base64 字符串
 * @example
 * isBase64('SGVsbG8gV29ybGQ=') // true
 */
export function isBase64(value: string): boolean {
  const base64Regex = /^[A-Z0-9+/]+=*$/i
  return base64Regex.test(value) && value.length % 4 === 0
}

/**
 * 判断是否为 JSON 字符串
 * @param value - 任意值
 * @returns 是否为有效的 JSON 字符串
 * @example
 * isJSON('{"name":"test"}') // true
 * isJSON('[1,2,3]') // true
 * isJSON('not json') // false
 */
export function isJSON(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  }
  catch {
    return false
  }
}

/**
 * 判断是否为空字符串（包括只有空白字符）
 * @param value - 任意值
 * @returns 是否为空字符串
 * @example
 * isEmptyString('') // true
 * isEmptyString('   ') // true
 * isEmptyString('hello') // false
 */
export function isEmptyString(value: string): boolean {
  return value.trim().length === 0
}

/**
 * 判断是否为整数
 * @param value - 任意值
 * @returns 是否为整数
 * @example
 * isInteger(123) // true
 * isInteger(123.45) // false
 */
export function isInteger(value: any): value is number {
  return Number.isInteger(value)
}

/**
 * 判断是否为正数
 * @param value - 任意值
 * @returns 是否为正数
 * @example
 * isPositive(123) // true
 * isPositive(-123) // false
 * isPositive(0) // false
 */
export function isPositive(value: number): boolean {
  return isValidNumber(value) && value > 0
}

/**
 * 判断是否为负数
 * @param value - 任意值
 * @returns 是否为负数
 * @example
 * isNegative(-123) // true
 * isNegative(123) // false
 */
export function isNegative(value: number): boolean {
  return isValidNumber(value) && value < 0
}

/**
 * 判断是否在指定范围内
 * @param value - 数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 是否在范围内
 * @example
 * isInRange(5, 1, 10) // true
 * isInRange(15, 1, 10) // false
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return isValidNumber(value) && value >= min && value <= max
}
