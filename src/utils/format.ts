/**
 * 格式化工具函数
 */

/**
 * 格式化日期
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 格式化模板，支持 YYYY/MM/DD/HH/mm/ss
 * @returns 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // '2024-10-28'
 * formatDate(1698480000000, 'YYYY-MM-DD HH:mm:ss') // '2023-10-28 12:00:00'
 * formatDate('2024-10-28', 'MM/DD/YYYY') // '10/28/2024'
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD'): string {
  if (date == null)
    return ''

  const d = new Date(date)
  if (Number.isNaN(d.getTime()))
    return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化日期时间
 */
export function formatDateTime(date: Date | string | number): string {
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化数字（保留小数位）
 */
export function formatDecimal(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

/**
 * 格式化货币
 * @param amount - 金额
 * @param currency - 货币符号
 * @returns 格式化后的货币字符串
 * @example
 * formatCurrency(1234.56) // '¥1,234.56'
 * formatCurrency(1234.56, '$') // '$1,234.56'
 * formatCurrency(9999999.99) // '¥9,999,999.99'
 */
export function formatCurrency(amount: number, currency = '¥'): string {
  return `${currency}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的文件大小字符串
 * @example
 * formatFileSize(1024) // '1.00 KB'
 * formatFileSize(1048576) // '1.00 MB'
 * formatFileSize(1073741824) // '1.00 GB'
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`
}

/**
 * 格式化百分比
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * 格式化手机号（隐藏中间4位）
 * @param phone - 手机号
 * @returns 格式化后的手机号
 * @example
 * formatPhone('13812345678') // '138****5678'
 * formatPhone('18900001111') // '189****1111'
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化身份证号（隐藏中间部分）
 */
export function formatIdCard(idCard: string): string {
  return idCard.replace(/(\d{6})\d+(\d{4})/, '$1********$2')
}

/**
 * 格式化银行卡号（每4位空格分隔）
 */
export function formatBankCard(cardNo: string): string {
  return cardNo.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength)
    return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * 格式化千分位
 * @param num - 数字或数字字符串
 * @returns 格式化后的千分位字符串
 * @example
 * formatThousands(1234567) // '1,234,567'
 * formatThousands(1234.56) // '1,234.56'
 * formatThousands('9999999') // '9,999,999'
 */
export function formatThousands(num: number | string): string {
  const numStr = String(num)
  const [integer, decimal] = numStr.split('.')
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger
}
