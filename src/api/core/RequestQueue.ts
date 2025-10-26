/**
 * 请求队列管理器
 * 用于控制并发请求数量
 */
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export interface QueueConfig {
  /** 最大并发数 */
  maxConcurrent?: number
  /** 是否启用队列 */
  enabled?: boolean
}

interface QueueItem {
  config: InternalAxiosRequestConfig
  resolve: (value: any) => void
  reject: (reason?: any) => void
}

/**
 * 请求队列管理器
 */
export class RequestQueue {
  private queue: QueueItem[] = []
  private runningCount = 0
  private config: Required<QueueConfig>

  constructor(config: QueueConfig = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent || 6,
      enabled: config.enabled !== false,
    }
  }

  /**
   * 添加请求到队列
   */
  add(config: InternalAxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ config, resolve, reject })
      this.process()
    })
  }

  /**
   * 处理队列
   */
  private process(): void {
    if (!this.config.enabled) {
      return
    }

    while (this.runningCount < this.config.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift()
      if (item) {
        this.runningCount++
        this.executeRequest(item)
      }
    }
  }

  /**
   * 执行请求
   */
  private async executeRequest(item: QueueItem): Promise<void> {
    try {
      // 注意：这里需要实际的axios实例来执行请求
      // adapter 可能是字符串或函数，需要特殊处理
      const adapter = item.config.adapter
      if (typeof adapter === 'function') {
        const result = await adapter(item.config)
        item.resolve(result)
      }
      else {
        item.reject(new Error('Invalid adapter configuration'))
      }
    }
    catch (error) {
      item.reject(error)
    }
    finally {
      this.runningCount--
      this.process()
    }
  }

  /**
   * 获取队列状态
   */
  getStatus(): { pending: number, running: number } {
    return {
      pending: this.queue.length,
      running: this.runningCount,
    }
  }

  /**
   * 清空队列
   */
  clear(): void {
    this.queue.forEach(item => item.reject(new Error('Queue cleared')))
    this.queue = []
  }

  /**
   * 为axios实例添加队列功能
   */
  setupQueue(instance: AxiosInstance): void {
    if (!this.config.enabled) {
      return
    }

    instance.interceptors.request.use((config) => {
      return this.add(config)
    })
  }
}
