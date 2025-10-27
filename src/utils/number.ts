/**
 * 数字操作工具函数
 */

/**
 * 数字范围限制（将数字限制在指定范围内）
 * @param num - 原数字
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数字
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 生成随机整数（包含 min 和 max）
 * @param min - 最小值
 * @param max - 最大值
 * @returns 随机整数
 * @example
 * randomInt(1, 10) // 可能返回 1-10 之间的任意整数
 * randomInt(0, 100) // 可能返回 0-100 之间的任意整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成随机浮点数
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const num = Math.random() * (max - min) + min
  return Number(num.toFixed(decimals))
}

/**
 * 数字四舍五入
 */
export function round(num: number, decimals = 0): number {
  const factor = 10 ** decimals
  return Math.round(num * factor) / factor
}

/**
 * 数字向上取整
 */
export function ceil(num: number, decimals = 0): number {
  const factor = 10 ** decimals
  return Math.ceil(num * factor) / factor
}

/**
 * 数字向下取整
 */
export function floor(num: number, decimals = 0): number {
  const factor = 10 ** decimals
  return Math.floor(num * factor) / factor
}

/**
 * 判断是否为偶数
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * 判断是否为奇数
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0
}

/**
 * 判断是否为质数
 */
export function isPrime(num: number): boolean {
  if (num <= 1)
    return false
  if (num <= 3)
    return true
  if (num % 2 === 0 || num % 3 === 0)
    return false

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0)
      return false
  }

  return true
}

/**
 * 计算阶乘
 */
export function factorial(num: number): number {
  if (num <= 1)
    return 1
  return num * factorial(num - 1)
}

/**
 * 计算斐波那契数列
 */
export function fibonacci(n: number): number {
  if (n <= 1)
    return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

/**
 * 数字转中文
 */
export function toChineseNumber(num: number): string {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿']

  if (num === 0)
    return digits[0]

  let result = ''
  let unitIndex = 0

  while (num > 0) {
    const digit = num % 10
    if (digit !== 0)
      result = digits[digit] + units[unitIndex] + result
    else if (result && result[0] !== digits[0])
      result = digits[0] + result

    num = Math.floor(num / 10)
    unitIndex++
  }

  return result
}

/**
 * 数字转罗马数字
 */
export function toRoman(num: number): string {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

  let result = ''
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i]
      num -= values[i]
    }
  }

  return result
}

/**
 * 数字补零
 */
export function padZero(num: number, length = 2): string {
  return String(num).padStart(length, '0')
}

/**
 * 数字转百分比
 */
export function toPercent(num: number, decimals = 2): string {
  return `${(num * 100).toFixed(decimals)}%`
}

/**
 * 数字格式化（千分位）
 */
export function formatNumberWithCommas(num: number, decimals = 2): string {
  const [integer, decimal] = num.toFixed(decimals).split('.')
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger
}

/**
 * 数字转文件大小
 */
export function toFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0)
    return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / k ** i).toFixed(decimals)} ${sizes[i]}`
}

/**
 * 线性插值
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * 数字映射
 */
export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
