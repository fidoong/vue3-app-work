/**
 * 请求队列管理器
 * 用于控制并发请求数量
 * 注意：此功能在浏览器环境中通常不需要，因为浏览器本身会限制并发连接数
 */
import type { AxiosInstance } from 'axios'

export interface QueueConfig {
  /** 最大并发数 */
  maxConcurrent?: number
  /** 是否启用队列 */
  enabled?: boolean
}

/**
 * 请求队列管理器
 */
export class RequestQueue {
  private runningCount = 0
  private config: Required<QueueConfig>

  constructor(config: QueueConfig = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent || 6,
      enabled: config.enabled !== false,
    }
  }

  /**
   * 获取队列状态
   */
  getStatus(): { running: number, maxConcurrent: number } {
    return {
      running: this.runningCount,
      maxConcurrent: this.config.maxConcurrent,
    }
  }

  /**
   * 为axios实例添加队列功能
   * 注意：简化实现，仅统计并发数
   */
  setupQueue(instance: AxiosInstance): void {
    if (!this.config.enabled) {
      return
    }

    // 请求拦截器 - 增加计数
    instance.interceptors.request.use((config) => {
      this.runningCount++
      return config
    })

    // 响应拦截器 - 减少计数
    instance.interceptors.response.use(
      (response) => {
        this.runningCount = Math.max(0, this.runningCount - 1)
        return response
      },
      (error) => {
        this.runningCount = Math.max(0, this.runningCount - 1)
        return Promise.reject(error)
      },
    )
  }
}
