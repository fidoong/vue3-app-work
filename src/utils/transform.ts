/**
 * 数据转换工具函数
 */

/**
 * 深度克隆对象
 * @param obj - 要克隆的对象
 * @returns 克隆后的新对象
 * @example
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(original)
 * cloned.b.c = 3
 * console.log(original.b.c) // 2 (原对象不受影响)
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Date)
    return new Date(obj.getTime()) as any

  if (obj instanceof RegExp)
    return new RegExp(obj.source, obj.flags) as any

  if (Array.isArray(obj))
    return obj.map(item => deepClone(item)) as any

  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key))
        clonedObj[key] = deepClone(obj[key])
    }
    return clonedObj
  }

  return obj
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length)
    return target

  const source = sources.shift()
  if (!source)
    return deepMerge(target, ...sources)

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key] as any)
      }
      else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * 判断是否为对象
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 从对象中提取指定字段
 * @param obj - 原对象
 * @param keys - 要提取的键名数组
 * @returns 只包含指定字段的新对象
 * @example
 * const user = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }
 * pick(user, ['id', 'name']) // { id: 1, name: 'Alice' }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj)
      result[key] = obj[key]
  })
  return result
}

/**
 * 从对象中排除指定字段
 * @param obj - 原对象
 * @param keys - 要排除的键名数组
 * @returns 排除指定字段后的新对象
 * @example
 * const user = { id: 1, name: 'Alice', password: '123456' }
 * omit(user, ['password']) // { id: 1, name: 'Alice' }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

/**
 * 根据路径获取对象值
 */
export function getValueByPath(obj: any, path: string | string[]): any {
  const keys = Array.isArray(path) ? path : path.split('.')
  return keys.reduce((acc, key) => acc?.[key], obj)
}

/**
 * 根据路径设置对象值
 */
export function setValueByPath(obj: any, path: string | string[], value: any): void {
  const keys = Array.isArray(path) ? path : path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((acc, key) => {
    if (!acc[key])
      acc[key] = {}
    return acc[key]
  }, obj)
  target[lastKey] = value
}

/**
 * 转换为布尔值
 */
export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean')
    return value
  if (typeof value === 'string')
    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase())
  if (typeof value === 'number')
    return value !== 0
  return Boolean(value)
}

/**
 * 转换为数字
 */
export function toNumber(value: any, defaultValue = 0): number {
  const num = Number(value)
  return Number.isNaN(num) ? defaultValue : num
}

/**
 * 转换为字符串
 */
export function toString(value: any, defaultValue = ''): string {
  if (value === null || value === undefined)
    return defaultValue
  return String(value)
}

/**
 * 转换为数组
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/**
 * 清理对象中的空值
 */
export function cleanObject<T extends Record<string, any>>(
  obj: T,
  options: {
    removeNull?: boolean
    removeUndefined?: boolean
    removeEmptyString?: boolean
    removeEmptyArray?: boolean
  } = {},
): Partial<T> {
  const {
    removeNull = true,
    removeUndefined = true,
    removeEmptyString = false,
    removeEmptyArray = false,
  } = options

  const result: any = {}

  for (const key in obj) {
    const value = obj[key]

    if (removeNull && value === null)
      continue
    if (removeUndefined && value === undefined)
      continue
    if (removeEmptyString && value === '')
      continue
    if (removeEmptyArray && Array.isArray(value) && value.length === 0)
      continue

    result[key] = value
  }

  return result
}
