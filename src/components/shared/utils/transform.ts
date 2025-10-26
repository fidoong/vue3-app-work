/**
 * 数据转换工具函数
 */

import type { DynamicValue } from '../types'

/**
 * 解析动态值
 */
export function resolveDynamicValue<T, Context = any>(
  value: DynamicValue<T, Context> | undefined,
  context: any,
  defaultValue?: T,
): T | undefined {
  if (value === undefined) {
    return defaultValue
  }
  if (typeof value === 'function') {
    return (value as (context: any) => T)(context)
  }
  return value
}

/**
 * 深度克隆
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }

  return obj
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()
  if (!source) {
    return deepMerge(target, ...sources)
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
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
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 从对象中排除指定字段
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
 * 扁平化数组
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)
  }, [])
}

/**
 * 数组去重
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
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
    if (!acc[key]) {
      acc[key] = {}
    }
    return acc[key]
  }, obj)
  target[lastKey] = value
}

/**
 * 树形数据转扁平数组
 */
export function treeToList<T extends { children?: T[] }>(
  tree: T[],
  childrenKey = 'children',
): T[] {
  const result: T[] = []

  function traverse(nodes: T[]) {
    nodes.forEach((node) => {
      result.push(node)
      const children = (node as any)[childrenKey]
      if (children && Array.isArray(children)) {
        traverse(children)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 扁平数组转树形数据
 */
export function listToTree<T extends { id: any, parentId?: any }>(
  list: T[],
  options: {
    idKey?: string
    parentIdKey?: string
    childrenKey?: string
    rootValue?: any
  } = {},
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootValue = null,
  } = options

  const map = new Map<any, T & { children?: T[] }>()
  const result: (T & { children?: T[] })[] = []

  // 创建映射
  list.forEach((item) => {
    map.set((item as any)[idKey], { ...item })
  })

  // 构建树
  list.forEach((item) => {
    const node = map.get((item as any)[idKey])!
    const parentId = (item as any)[parentIdKey]

    if (parentId === rootValue || parentId === undefined) {
      result.push(node)
    }
    else {
      const parent = map.get(parentId)
      if (parent) {
        if (!parent[childrenKey as keyof typeof parent]) {
          (parent as any)[childrenKey] = []
        }
        (parent as any)[childrenKey].push(node)
      }
    }
  })

  return result as T[]
}
