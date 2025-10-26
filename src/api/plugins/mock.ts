/**
 * Mock数据插件
 */
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export interface MockRule {
  /** 匹配的URL模式（支持正则） */
  url: string | RegExp
  /** 匹配的请求方法 */
  method?: string | string[]
  /** Mock响应数据 */
  response: any | ((config: InternalAxiosRequestConfig) => any)
  /** 响应延迟(ms) */
  delay?: number
  /** 响应状态码 */
  status?: number
}

export interface MockConfig {
  /** 是否启用Mock */
  enabled?: boolean
  /** Mock规则列表 */
  rules?: MockRule[]
}

/**
 * Mock数据插件
 */
export class MockPlugin {
  private config: Required<MockConfig>
  private rules: MockRule[] = []

  constructor(config: MockConfig = {}) {
    this.config = {
      enabled: config.enabled !== false,
      rules: config.rules || [],
    }
    this.rules = this.config.rules
  }

  /**
   * 添加Mock规则
   */
  addRule(rule: MockRule): void {
    this.rules.push(rule)
  }

  /**
   * 移除Mock规则
   */
  removeRule(url: string | RegExp): void {
    this.rules = this.rules.filter(rule => rule.url !== url)
  }

  /**
   * 清空所有规则
   */
  clearRules(): void {
    this.rules = []
  }

  /**
   * 匹配Mock规则
   */
  private matchRule(config: InternalAxiosRequestConfig): MockRule | null {
    if (!this.config.enabled) {
      return null
    }

    return this.rules.find((rule) => {
      // 匹配URL
      const urlMatch = typeof rule.url === 'string'
        ? config.url?.includes(rule.url)
        : rule.url.test(config.url || '')

      if (!urlMatch) {
        return false
      }

      // 匹配方法
      if (rule.method) {
        const methods = Array.isArray(rule.method) ? rule.method : [rule.method]
        const methodMatch = methods.some(
          m => m.toLowerCase() === config.method?.toLowerCase(),
        )
        if (!methodMatch) {
          return false
        }
      }

      return true
    }) || null
  }

  /**
   * 生成Mock响应
   */
  private async generateResponse(
    rule: MockRule,
    config: InternalAxiosRequestConfig,
  ): Promise<any> {
    // 延迟响应
    if (rule.delay) {
      await new Promise(resolve => setTimeout(resolve, rule.delay))
    }

    // 生成响应数据
    const data = typeof rule.response === 'function'
      ? rule.response(config)
      : rule.response

    return {
      data,
      status: rule.status || 200,
      statusText: 'OK',
      headers: {},
      config,
    }
  }

  /**
   * 为axios实例添加Mock功能
   */
  setupMock(instance: AxiosInstance): void {
    if (!this.config.enabled) {
      return
    }

    instance.interceptors.request.use(async (config) => {
      const rule = this.matchRule(config)

      if (rule) {
        const response = await this.generateResponse(rule, config)
        // 返回一个被拒绝的Promise，但包含mock数据
        const mockError = new Error('Mock response')
        Object.assign(mockError, {
          ...response,
          __isMock: true,
        })
        return Promise.reject(mockError)
      }

      return config
    })

    instance.interceptors.response.use(
      undefined,
      (error) => {
        // 如果是Mock数据，直接返回
        if (error.__isMock) {
          return Promise.resolve(error)
        }
        return Promise.reject(error)
      },
    )
  }
}
