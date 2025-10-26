/**
 * Mock 配置
 */

/**
 * Mock 配置选项
 */
export interface MockConfig {
  /** 是否启用 Mock */
  enabled: boolean
  /** 默认延迟时间(ms) */
  timeout: number
  /** 是否在控制台打印 Mock 日志 */
  log: boolean
}

/**
 * 默认配置
 */
export const mockConfig: MockConfig = {
  enabled: import.meta.env.DEV,
  timeout: 300,
  log: true,
}

/**
 * 设置 Mock 配置
 */
export function setMockConfig(config: Partial<MockConfig>) {
  Object.assign(mockConfig, config)
}

/**
 * 获取 Mock 配置
 */
export function getMockConfig(): MockConfig {
  return mockConfig
}
