/**
 * URL 处理工具函数
 */

/**
 * 解析 URL 查询参数
 * @param url - URL 字符串（可选，默认当前页面 URL）
 * @returns 参数对象
 * @example
 * parseQuery('https://example.com?name=Alice&age=25')
 * // { name: 'Alice', age: '25' }
 * parseQuery() // 解析当前页面 URL 参数
 */
export function parseQuery(url?: string): Record<string, string> {
  const queryString = url ? url.split('?')[1] : window.location.search.slice(1)
  if (!queryString)
    return {}

  const params: Record<string, string> = {}
  const pairs = queryString.split('&')

  pairs.forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key)
      params[decodeURIComponent(key)] = decodeURIComponent(value || '')
  })

  return params
}

/**
 * 构建 URL 查询字符串
 * @param params - 参数对象
 * @returns 查询字符串
 * @example
 * buildQuery({ name: 'Alice', age: 25 }) // 'name=Alice&age=25'
 * buildQuery({ keyword: '搜索', page: 1 }) // 'keyword=%E6%90%9C%E7%B4%A2&page=1'
 */
export function buildQuery(params: Record<string, any>): string {
  const pairs: string[] = []

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== null && value !== undefined && value !== '')
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  })

  return pairs.join('&')
}

/**
 * 添加 URL 参数
 */
export function addQuery(url: string, params: Record<string, any>): string {
  const queryString = buildQuery(params)
  if (!queryString)
    return url

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${queryString}`
}

/**
 * 移除 URL 参数
 */
export function removeQuery(url: string, keys: string[]): string {
  const [baseUrl, queryString] = url.split('?')
  if (!queryString)
    return url

  const params = parseQuery(url)
  keys.forEach(key => delete params[key])

  const newQuery = buildQuery(params)
  return newQuery ? `${baseUrl}?${newQuery}` : baseUrl
}

/**
 * 获取 URL 参数值
 */
export function getQueryValue(key: string, url?: string): string | null {
  const params = parseQuery(url)
  return params[key] || null
}

/**
 * 判断是否为外部链接
 */
export function isExternal(url: string): boolean {
  return /^(?:https?:|mailto:|tel:)/.test(url)
}

/**
 * 判断是否为绝对路径
 */
export function isAbsolutePath(path: string): boolean {
  return /^\//.test(path)
}

/**
 * 拼接路径
 */
export function joinPath(...paths: string[]): string {
  return paths
    .map((path, index) => {
      if (index === 0)
        return path.replace(/\/$/, '')
      return path.replace(/^\/|\/$/g, '')
    })
    .filter(Boolean)
    .join('/')
}

/**
 * 获取基础路径
 */
export function getBasePath(url: string): string {
  return url.split('?')[0].split('#')[0]
}

/**
 * 获取域名
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  }
  catch {
    return ''
  }
}

/**
 * 获取协议
 */
export function getProtocol(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol.replace(':', '')
  }
  catch {
    return ''
  }
}
