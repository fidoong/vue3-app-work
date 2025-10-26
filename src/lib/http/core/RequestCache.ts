/**
 * 请求缓存管理器
 */
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface CacheConfig {
  /** 缓存时间(ms)，默认5分钟 */
  ttl?: number
  /** 是否启用缓存 */
  enabled?: boolean
  /** 自定义缓存key生成函数 */
  generateKey?: (config: InternalAxiosRequestConfig) => string
}

interface CacheItem {
  data: any
  timestamp: number
  ttl: number
}

interface CacheableConfig extends InternalAxiosRequestConfig {
  useCache?: boolean
  cacheTTL?: number
}

/**
 * 默认缓存key生成函数
 */
function defaultGenerateKey(config: InternalAxiosRequestConfig): string {
  const { method, url, params } = config
  return `${method?.toUpperCase()}:${url}:${JSON.stringify(params || {})}`
}

/**
 * 请求缓存管理器
 */
export class RequestCache {
  private cache: Map<string, CacheItem> = new Map()
  private config: Required<CacheConfig>

  constructor(config: CacheConfig = {}) {
    this.config = {
      ttl: config.ttl || 5 * 60 * 1000, // 默认5分钟
      enabled: config.enabled !== false,
      generateKey: config.generateKey || defaultGenerateKey,
    }
  }

  /**
   * 获取缓存
   */
  get(key: string): any | null {
    if (!this.config.enabled) {
      return null
    }

    const item = this.cache.get(key)
    if (!item) {
      return null
    }

    // 检查是否过期
    const age = Date.now() - item.timestamp
    if (age > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  /**
   * 设置缓存
   */
  set(key: string, data: any, ttl?: number): void {
    if (!this.config.enabled) {
      return
    }

    const cacheTTL = ttl || this.config.ttl
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: cacheTTL,
    })
  }

  /**
   * 删除缓存
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * 删除指定 URL 的缓存（支持模糊匹配）
   */
  deleteByUrl(url: string): number {
    let count = 0
    for (const key of this.cache.keys()) {
      if (key.includes(url)) {
        this.cache.delete(key)
        count++
      }
    }
    return count
  }

  /**
   * 删除指定方法的所有缓存
   */
  deleteByMethod(method: string): number {
    let count = 0
    const methodPrefix = `${method.toUpperCase()}:`
    for (const key of this.cache.keys()) {
      if (key.startsWith(methodPrefix)) {
        this.cache.delete(key)
        count++
      }
    }
    return count
  }

  /**
   * 检查缓存是否存在
   */
  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) {
      return false
    }
    // 检查是否过期
    const age = Date.now() - item.timestamp
    if (age > item.ttl) {
      this.cache.delete(key)
      return false
    }
    return true
  }

  /**
   * 获取所有缓存的 key
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * 获取缓存数量
   */
  size(): number {
    return this.cache.size
  }

  /**
   * 获取缓存详情
   */
  getInfo(key: string): { data: any, timestamp: number, age: number, ttl: number } | null {
    const item = this.cache.get(key)
    if (!item) {
      return null
    }
    return {
      data: item.data,
      timestamp: item.timestamp,
      age: Date.now() - item.timestamp,
      ttl: item.ttl,
    }
  }

  /**
   * 获取所有缓存信息
   */
  getAllInfo(): Array<{ key: string, timestamp: number, age: number, expired: boolean }> {
    const result: Array<{ key: string, timestamp: number, age: number, expired: boolean }> = []
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      const age = now - item.timestamp
      result.push({
        key,
        timestamp: item.timestamp,
        age,
        expired: age > item.ttl,
      })
    }
    return result
  }

  /**
   * 清理过期缓存
   */
  clearExpired(): number {
    let count = 0
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      const age = now - item.timestamp
      if (age > item.ttl) {
        this.cache.delete(key)
        count++
      }
    }
    return count
  }

  /**
   * 根据 URL 和参数生成缓存 key
   */
  generateCacheKey(method: string, url: string, params?: any): string {
    return `${method.toUpperCase()}:${url}:${JSON.stringify(params || {})}`
  }

  /**
   * 根据 URL 和参数获取缓存
   */
  getByUrl(method: string, url: string, params?: any): any | null {
    const key = this.generateCacheKey(method, url, params)
    return this.get(key)
  }

  /**
   * 根据 URL 和参数设置缓存
   */
  setByUrl(method: string, url: string, data: any, params?: any, ttl?: number): void {
    const key = this.generateCacheKey(method, url, params)
    this.set(key, data, ttl)
  }

  /**
   * 根据 URL 和参数删除缓存
   */
  deleteByUrlAndParams(method: string, url: string, params?: any): boolean {
    const key = this.generateCacheKey(method, url, params)
    const existed = this.cache.has(key)
    this.cache.delete(key)
    return existed
  }

  /**
   * 查找匹配 URL 的所有缓存
   */
  findByUrl(url: string): Array<{ key: string, data: any, age: number }> {
    const result: Array<{ key: string, data: any, age: number }> = []
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (key.includes(url)) {
        const age = now - item.timestamp
        if (age <= item.ttl) {
          result.push({
            key,
            data: item.data,
            age,
          })
        }
      }
    }
    return result
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 为axios实例添加缓存功能
   */
  setupCache(instance: AxiosInstance): void {
    // 请求拦截器 - 检查缓存
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const cacheableConfig = config as CacheableConfig

      // 只缓存GET请求
      if (config.method?.toLowerCase() !== 'get' || cacheableConfig.useCache === false) {
        return config
      }

      const key = this.config.generateKey(config)
      const cachedData = this.get(key)

      if (cachedData) {
        // 返回缓存的数据，使用特殊标记
        const cacheError: any = new Error('Cached response')
        cacheError.config = config
        cacheError.data = cachedData
        cacheError.status = 200
        cacheError.statusText = 'OK (from cache)'
        cacheError.headers = {}
        cacheError.__isCache = true
        return Promise.reject(new Error(cacheError))
      }

      return config
    })

    // 响应拦截器 - 存储缓存
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as CacheableConfig

        // 只缓存GET请求的成功响应
        if (config.method?.toLowerCase() === 'get' && config.useCache !== false && response.status === 200) {
          const key = this.config.generateKey(config)
          this.set(key, response.data, config.cacheTTL)
        }

        return response
      },
      (error) => {
        // 如果是缓存的数据，直接返回
        if (error.__isCache) {
          return Promise.resolve({
            data: error.data,
            status: error.status,
            statusText: error.statusText,
            headers: error.headers,
            config: error.config,
            fromCache: true,
          })
        }
        return Promise.reject(error)
      },
    )
  }
}
