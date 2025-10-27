/**
 * 日期时间工具函数
 */

/**
 * 获取当前时间戳（秒）
 */
export function getTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * 获取当前时间戳（毫秒）
 */
export function getTimestampMs(): number {
  return Date.now()
}

/**
 * 时间戳转日期
 */
export function timestampToDate(timestamp: number): Date {
  // 如果是秒级时间戳，转换为毫秒
  const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp
  return new Date(ms)
}

/**
 * 日期转时间戳（秒）
 */
export function dateToTimestamp(date: Date | string): number {
  return Math.floor(new Date(date).getTime() / 1000)
}

/**
 * 获取日期范围
 * @param type - 范围类型
 * @returns 开始和结束日期的元组
 * @example
 * getDateRange('today') // [今天00:00:00, 今天23:59:59]
 * getDateRange('week') // [本周一00:00:00, 本周日23:59:59]
 * getDateRange('month') // [本月1号00:00:00, 本月最后一天23:59:59]
 */
export function getDateRange(type: 'today' | 'yesterday' | 'week' | 'month' | 'year'): [Date, Date] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  switch (type) {
    case 'today':
      return [today, new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)]

    case 'yesterday': {
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      return [yesterday, new Date(yesterday.getTime() + 24 * 60 * 60 * 1000 - 1)]
    }

    case 'week': {
      const day = today.getDay()
      const diff = day === 0 ? 6 : day - 1
      const monday = new Date(today.getTime() - diff * 24 * 60 * 60 * 1000)
      const sunday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000 - 1)
      return [monday, sunday]
    }

    case 'month': {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      return [firstDay, lastDay]
    }

    case 'year': {
      const firstDay = new Date(now.getFullYear(), 0, 1)
      const lastDay = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
      return [firstDay, lastDay]
    }

    default:
      return [today, today]
  }
}

/**
 * 计算日期差（天数）
 */
export function dateDiff(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * 添加天数
 */
export function addDays(date: Date | string, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * 添加月份
 */
export function addMonths(date: Date | string, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

/**
 * 添加年份
 */
export function addYears(date: Date | string, years: number): Date {
  const d = new Date(date)
  d.setFullYear(d.getFullYear() + years)
  return d
}

/**
 * 判断是否为同一天
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}

/**
 * 判断是否为今天
 */
export function isToday(date: Date | string): boolean {
  return isSameDay(date, new Date())
}

/**
 * 判断是否为工作日
 */
export function isWeekday(date: Date | string): boolean {
  const day = new Date(date).getDay()
  return day !== 0 && day !== 6
}

/**
 * 获取月份天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 相对时间描述（多久之前）
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 相对时间描述
 * @example
 * timeAgo(Date.now() - 1000) // '刚刚'
 * timeAgo(Date.now() - 60000) // '1分钟前'
 * timeAgo(Date.now() - 3600000) // '1小时前'
 * timeAgo(Date.now() - 86400000) // '1天前'
 */
export function timeAgo(date: Date | string | number): string {
  const now = Date.now()
  const past = new Date(date).getTime()
  const diff = now - past

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0)
    return `${years}年前`
  if (months > 0)
    return `${months}个月前`
  if (days > 0)
    return `${days}天前`
  if (hours > 0)
    return `${hours}小时前`
  if (minutes > 0)
    return `${minutes}分钟前`
  return '刚刚'
}
