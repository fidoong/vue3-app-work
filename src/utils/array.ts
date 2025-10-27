/**
 * 数组操作工具函数
 */

/**
 * 数组去重
 * @param arr - 原数组
 * @param key - 对象数组去重的键名
 * @returns 去重后的数组
 * @example
 * unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 * unique([{ id: 1 }, { id: 2 }, { id: 1 }], 'id') // [{ id: 1 }, { id: 2 }]
 */
export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key)
    return Array.from(new Set(arr))

  const seen = new Set()
  return arr.filter((item) => {
    const value = item[key]
    if (seen.has(value))
      return false
    seen.add(value)
    return true
  })
}

/**
 * 扁平化数组
 */
export function flatten<T>(arr: (T | T[])[], depth = Infinity): T[] {
  if (depth === 0)
    return arr as T[]

  return arr.reduce<T[]>((acc, val) => {
    return Array.isArray(val)
      ? acc.concat(flatten(val, depth - 1))
      : acc.concat(val)
  }, [])
}

/**
 * 数组分组
 * @param arr - 原数组
 * @param key - 分组键名或分组函数
 * @returns 分组后的对象
 * @example
 * const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }]
 * groupBy(users, 'age') // { '25': [{ name: 'Alice', ... }, { name: 'Bob', ... }] }
 * groupBy(users, u => u.age > 20 ? 'adult' : 'child') // { 'adult': [...] }
 */
export function groupBy<T>(arr: T[], key: keyof T | ((item: T) => string | number)): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key])
    if (!acc[groupKey])
      acc[groupKey] = []
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * 数组分块
 * @param arr - 原数组
 * @param size - 每块大小
 * @returns 分块后的二维数组
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c', 'd'], 3) // [['a', 'b', 'c'], ['d']]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size))
  return result
}

/**
 * 数组求和
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0)
}

/**
 * 数组平均值
 */
export function average(arr: number[]): number {
  return arr.length === 0 ? 0 : sum(arr) / arr.length
}

/**
 * 数组最大值
 */
export function max(arr: number[]): number {
  return Math.max(...arr)
}

/**
 * 数组最小值
 */
export function min(arr: number[]): number {
  return Math.min(...arr)
}

/**
 * 数组排序（支持对象）
 * @param arr - 原数组
 * @param key - 排序键名
 * @param order - 排序方向 'asc' 升序 | 'desc' 降序
 * @returns 排序后的新数组
 * @example
 * const users = [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }]
 * sortBy(users, 'age') // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * sortBy(users, 'name', 'desc') // [{ name: 'Bob', ... }, { name: 'Alice', ... }]
 */
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal)
      return order === 'asc' ? -1 : 1
    if (aVal > bVal)
      return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * 数组随机排序
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 数组随机取值
 */
export function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 数组随机取多个值
 */
export function sampleSize<T>(arr: T[], size: number): T[] {
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(size, arr.length))
}

/**
 * 数组差集（arr1 中有但 arr2 中没有的元素）
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 差集数组
 * @example
 * difference([1, 2, 3, 4], [2, 4, 6]) // [1, 3]
 * difference(['a', 'b', 'c'], ['b', 'd']) // ['a', 'c']
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => !arr2.includes(item))
}

/**
 * 数组交集（两个数组共有的元素）
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 交集数组
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * intersection(['a', 'b'], ['b', 'c']) // ['b']
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item))
}

/**
 * 数组并集
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat())
}

/**
 * 数组移动元素
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr]
  const item = result.splice(from, 1)[0]
  result.splice(to, 0, item)
  return result
}

/**
 * 数组插入元素
 */
export function insert<T>(arr: T[], index: number, ...items: T[]): T[] {
  const result = [...arr]
  result.splice(index, 0, ...items)
  return result
}

/**
 * 数组移除元素
 */
export function remove<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item))
}

/**
 * 数组计数
 */
export function countBy<T>(arr: T[], key: keyof T | ((item: T) => string | number)): Record<string, number> {
  return arr.reduce((acc, item) => {
    const countKey = typeof key === 'function' ? key(item) : String(item[key])
    acc[countKey] = (acc[countKey] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
