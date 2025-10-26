/**
 * Mock 数据模块入口
 * 基于 mockjs 实现本地数据模拟
 */
import type { MockMethod } from 'vite-plugin-mock'

// 导入所有 mock 模块
import dictMock from './modules/dict'
import optionMock from './modules/option'
import productMock from './modules/product'
import tableMock from './modules/table'
import userMock from './modules/user'

/**
 * 合并所有 mock 接口
 */
export default [
  ...userMock,
  ...dictMock,
  ...optionMock,
  ...tableMock,
  ...productMock,
] as MockMethod[]

/**
 * 导出核心模块（供外部使用）
 */
export * from './core'
