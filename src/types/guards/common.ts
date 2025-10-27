/**
 * 通用类型守卫
 * 提供运行时类型检查函数
 */

/**
 * 判断是否为字符串
 * @example
 * if (isString(value)) {
 *   console.log(value.toUpperCase()) // TypeScript 知道 value 是 string
 * }
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 判断是否为数字
 * @example
 * if (isNumber(value)) {
 *   console.log(value.toFixed(2)) // TypeScript 知道 value 是 number
 * }
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 判断是否为布尔值
 * @example
 * if (isBoolean(value)) {
 *   console.log(value ? 'yes' : 'no') // TypeScript 知道 value 是 boolean
 * }
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断是否为 null
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 判断是否为 undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
 * 判断是否为 null 或 undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 判断是否为对象（排除 null）
 */
export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

/**
 * 判断是否为纯对象
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  if (!isObject(value))
    return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 判断是否为数组
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

/**
 * 判断是否为函数
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 判断是否为 Promise
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    isObject(value)
    && isFunction((value as any).then)
    && isFunction((value as any).catch)
  )
}

/**
 * 判断是否为 Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * 判断是否为 RegExp
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/**
 * 判断是否为 Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * 判断是否为 Map
 */
export function isMap(value: unknown): value is Map<any, any> {
  return value instanceof Map
}

/**
 * 判断是否为 Set
 */
export function isSet(value: unknown): value is Set<any> {
  return value instanceof Set
}

/**
 * 判断是否为 WeakMap
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return value instanceof WeakMap
}

/**
 * 判断是否为 WeakSet
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return value instanceof WeakSet
}

/**
 * 判断是否为 Symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 判断是否为 BigInt
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

/**
 * 判断是否为原始类型
 */
export function isPrimitive(
  value: unknown,
): value is string | number | boolean | null | undefined | symbol | bigint {
  return (
    value === null
    || value === undefined
    || typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
    || typeof value === 'symbol'
    || typeof value === 'bigint'
  )
}

/**
 * 判断是否为空值（null、undefined、空字符串、空数组、空对象）
 */
export function isEmpty(value: unknown): boolean {
  if (isNullish(value))
    return true
  if (isString(value))
    return value.length === 0
  if (isArray(value))
    return value.length === 0
  if (isPlainObject(value))
    return Object.keys(value).length === 0
  if (isMap(value) || isSet(value))
    return value.size === 0
  return false
}

/**
 * 判断是否为非空值
 */
export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value)
}

/**
 * 判断是否为有效的数字字符串
 */
export function isNumericString(value: unknown): value is string {
  return isString(value) && !Number.isNaN(Number(value)) && value.trim() !== ''
}

/**
 * 判断是否为有效的 URL
 */
export function isUrl(value: unknown): value is string {
  if (!isString(value))
    return false
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
 * 判断是否为有效的 Email
 */
export function isEmail(value: unknown): value is string {
  if (!isString(value))
    return false
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * 判断是否为有效的 JSON 字符串
 */
export function isJsonString(value: unknown): value is string {
  if (!isString(value))
    return false
  try {
    JSON.parse(value)
    return true
  }
  catch {
    return false
  }
}

/**
 * 判断是否包含指定属性
 */
export function hasProperty<K extends PropertyKey>(
  obj: unknown,
  key: K,
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj
}

/**
 * 判断是否包含指定属性且值不为 undefined
 */
export function hasOwnProperty<K extends PropertyKey>(
  obj: unknown,
  key: K,
): obj is Record<K, unknown> {
  return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 类型断言：确保值不为 null 或 undefined
 */
export function assertDefined<T>(
  value: T,
  message = 'Value is null or undefined',
): asserts value is NonNullable<T> {
  if (isNullish(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为字符串
 */
export function assertString(
  value: unknown,
  message = 'Value is not a string',
): asserts value is string {
  if (!isString(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为数字
 */
export function assertNumber(
  value: unknown,
  message = 'Value is not a number',
): asserts value is number {
  if (!isNumber(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为对象
 */
export function assertObject(
  value: unknown,
  message = 'Value is not an object',
): asserts value is Record<string, any> {
  if (!isObject(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为数组
 */
export function assertArray(
  value: unknown,
  message = 'Value is not an array',
): asserts value is any[] {
  if (!isArray(value)) {
    throw new Error(message)
  }
}

/**
 * 类型断言：确保值为函数
 */
export function assertFunction(
  value: unknown,
  message = 'Value is not a function',
): asserts value is (...args: any[]) => any {
  if (!isFunction(value)) {
    throw new Error(message)
  }
}
