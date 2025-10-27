/**
 * 对象操作工具函数
 */

/**
 * 判断是否为空对象
 */
export function isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0
}

/**
 * 判断是否为对象
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 判断是否为纯对象
 */
export function isPlainObject(value: any): boolean {
  if (!isObject(value))
    return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 对象键值互换
 */
export function invert<T extends Record<string, string | number>>(obj: T): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[String(value)] = key
    return acc
  }, {} as Record<string, string>)
}

/**
 * 对象键名转换（驼峰转下划线）
 */
export function keysToSnakeCase<T extends Record<string, any>>(obj: T): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    acc[snakeKey] = isPlainObject(value) ? keysToSnakeCase(value) : value
    return acc
  }, {} as Record<string, any>)
}

/**
 * 对象键名转换（下划线转驼峰）
 */
export function keysToCamelCase<T extends Record<string, any>>(obj: T): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    acc[camelKey] = isPlainObject(value) ? keysToCamelCase(value) : value
    return acc
  }, {} as Record<string, any>)
}

/**
 * 对象深度比较
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2)
    return true

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null)
    return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length)
    return false

  return keys1.every(key => isEqual(obj1[key], obj2[key]))
}

/**
 * 对象深度冻结
 */
export function deepFreeze<T extends Record<string, any>>(obj: T): Readonly<T> {
  Object.freeze(obj)

  Object.values(obj).forEach((value) => {
    if (isObject(value) && !Object.isFrozen(value))
      deepFreeze(value)
  })

  return obj
}

/**
 * 对象映射值
 */
export function mapValues<T extends Record<string, any>, R>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => R,
): Record<keyof T, R> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] = mapper(value, key as keyof T)
    return acc
  }, {} as Record<keyof T, R>)
}

/**
 * 对象映射键
 */
export function mapKeys<T extends Record<string, any>>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => string,
): Record<string, T[keyof T]> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = mapper(key as keyof T, value)
    acc[newKey] = value
    return acc
  }, {} as Record<string, T[keyof T]>)
}

/**
 * 对象过滤
 */
export function filterObject<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (predicate(value, key as keyof T))
      acc[key as keyof T] = value
    return acc
  }, {} as Partial<T>)
}

/**
 * 对象合并（浅合并）
 */
export function merge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  return Object.assign({}, ...objects)
}

/**
 * 获取对象指定路径的值
 */
export function get<T = any>(obj: any, path: string | string[], defaultValue?: T): T {
  const keys = Array.isArray(path) ? path : path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === null || result === undefined)
      return defaultValue as T
    result = result[key]
  }

  return result === undefined ? defaultValue as T : result
}

/**
 * 设置对象指定路径的值
 */
export function set(obj: any, path: string | string[], value: any): void {
  const keys = Array.isArray(path) ? path : path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== 'object')
      acc[key] = {}
    return acc[key]
  }, obj)
  target[lastKey] = value
}

/**
 * 删除对象指定路径的值
 */
export function unset(obj: any, path: string | string[]): boolean {
  const keys = Array.isArray(path) ? path : path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((acc, key) => acc?.[key], obj)

  if (target && lastKey in target) {
    delete target[lastKey]
    return true
  }

  return false
}

/**
 * 判断对象是否包含指定路径
 */
export function has(obj: any, path: string | string[]): boolean {
  const keys = Array.isArray(path) ? path : path.split('.')
  let current = obj

  for (const key of keys) {
    if (!current || !(key in current))
      return false
    current = current[key]
  }

  return true
}
