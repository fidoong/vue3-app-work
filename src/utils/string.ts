/**
 * 字符串操作工具函数
 */

/**
 * 首字母大写
 * @param str - 原字符串
 * @returns 首字母大写的字符串
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('world') // 'World'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 首字母小写
 */
export function uncapitalize(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 驼峰转短横线（kebab-case）
 * @param str - 原字符串
 * @returns 转换后的字符串
 * @example
 * kebabCase('userName') // 'user-name'
 * kebabCase('backgroundColor') // 'background-color'
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * 短横线转驼峰（camelCase）
 * @param str - 原字符串
 * @returns 转换后的字符串
 * @example
 * camelCase('user-name') // 'userName'
 * camelCase('background-color') // 'backgroundColor'
 */
export function camelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 下划线转驼峰
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 驼峰转下划线
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 帕斯卡命名（大驼峰）
 */
export function pascalCase(str: string): string {
  return capitalize(camelCase(str))
}

/**
 * 截断字符串
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength)
    return str
  return str.slice(0, maxLength - suffix.length) + suffix
}

/**
 * 移除 HTML 标签
 * @param html - HTML 字符串
 * @returns 纯文本字符串
 * @example
 * stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'
 * stripHtml('<div class="test">Content</div>') // 'Content'
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * 转义 HTML 特殊字符
 * @param str - 原字符串
 * @returns 转义后的字符串
 * @example
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeHtml('A & B') // 'A &amp; B'
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
  }
  return str.replace(/[&<>"']/g, char => map[char])
}

/**
 * 反转义 HTML
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': '\'',
  }
  return str.replace(/&(amp|lt|gt|quot|#39);/g, entity => map[entity])
}

/**
 * 字符串反转
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('')
}

/**
 * 统计字符串中某个字符出现的次数
 */
export function countOccurrences(str: string, char: string): number {
  return (str.match(new RegExp(char, 'g')) || []).length
}

/**
 * 判断字符串是否包含中文
 */
export function hasChinese(str: string): boolean {
  return /[\u4E00-\u9FA5]/.test(str)
}

/**
 * 判断字符串是否为空（包括空白字符）
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0
}

/**
 * 移除字符串中的空白字符
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '')
}

/**
 * 字符串填充
 */
export function pad(str: string, length: number, char = ' ', position: 'start' | 'end' | 'both' = 'end'): string {
  const padLength = Math.max(0, length - str.length)

  if (position === 'start')
    return char.repeat(padLength) + str

  if (position === 'end')
    return str + char.repeat(padLength)

  const leftPad = Math.floor(padLength / 2)
  const rightPad = padLength - leftPad
  return char.repeat(leftPad) + str + char.repeat(rightPad)
}

/**
 * 字符串重复
 */
export function repeat(str: string, count: number): string {
  return str.repeat(count)
}

/**
 * 字符串替换所有
 */
export function replaceAll(str: string, search: string, replacement: string): string {
  return str.split(search).join(replacement)
}

/**
 * 生成随机字符串
 */
export function random(length = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = ''
  for (let i = 0; i < length; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  return result
}

/**
 * 字符串模板替换
 * @param str - 模板字符串
 * @param data - 数据对象
 * @returns 替换后的字符串
 * @example
 * template('Hello {{name}}, you are {{age}} years old', { name: 'Alice', age: 25 })
 * // 'Hello Alice, you are 25 years old'
 */
export function template(str: string, data: Record<string, any>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => String(data[key] ?? ''))
}

/**
 * 字符串分割为数组（忽略空字符串）
 */
export function split(str: string, separator: string | RegExp): string[] {
  return str.split(separator).filter(Boolean)
}

/**
 * 字符串转标题格式
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s_-]+/)
    .map(word => capitalize(word))
    .join(' ')
}
