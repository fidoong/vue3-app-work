/**
 * 请求重试管理器
 */
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export interface RetryConfig {
  /** 重试次数 */
  retries?: number
  /** 重试延迟(ms) */
  retryDelay?: number
  /** 是否应该重试的判断函数 */
  shouldRetry?: (error: AxiosError) => boolean
}

interface RetryableConfig extends InternalAxiosRequestConfig {
  __retryCount?: number
}

/**
 * 默认的重试判断逻辑
 */
function defaultShouldRetry(error: AxiosError): boolean {
  // 网络错误或5xx错误才重试
  return !error.response || (error.response.status >= 500 && error.response.status < 600)
}

/**
 * 延迟函数
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 为axios实例添加重试功能
 */
export function setupRetry(instance: AxiosInstance, config: RetryConfig = {}): void {
  const {
    retries = 3,
    retryDelay = 1000,
    shouldRetry = defaultShouldRetry,
  } = config

  instance.interceptors.response.use(
    undefined,
    async (error: AxiosError) => {
      const config = error.config as RetryableConfig

      if (!config || !shouldRetry(error)) {
        return Promise.reject(error)
      }

      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= retries) {
        return Promise.reject(error)
      }

      config.__retryCount += 1

      // 指数退避延迟
      const delayTime = retryDelay * 2 ** (config.__retryCount - 1)
      await delay(delayTime)

      return instance.request(config)
    },
  )
}
