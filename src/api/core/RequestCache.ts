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
  return `${method}:${url}:${JSON.stringify(params)}`
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
    if (Date.now() - item.timestamp > this.config.ttl) {
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

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })

    // 设置过期清理
    if (ttl || this.config.ttl) {
      setTimeout(() => {
        this.cache.delete(key)
      }, ttl || this.config.ttl)
    }
  }

  /**
   * 删除缓存
   */
  delete(key: string): void {
    this.cache.delete(key)
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
        // 返回缓存的数据
        const cacheError = new Error('Cached response')
        Object.assign(cacheError, {
          config,
          data: cachedData,
          status: 200,
          statusText: 'OK (from cache)',
          headers: {},
          cached: true,
        })
        return Promise.reject(cacheError)
      }

      return config
    })

    // 响应拦截器 - 存储缓存
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as CacheableConfig

        // 只缓存GET请求的成功响应
        if (config.method?.toLowerCase() === 'get' && config.useCache !== false) {
          const key = this.config.generateKey(config)
          this.set(key, response.data, config.cacheTTL)
        }

        return response
      },
      (error) => {
        // 如果是缓存的数据，直接返回
        if (error.cached) {
          return Promise.resolve({
            ...error,
            fromCache: true,
          })
        }
        return Promise.reject(error)
      },
    )
  }
}
