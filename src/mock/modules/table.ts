/**
 * 表格数据 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { createCrudMock, MockRandom, randomPick } from '../core'

// 生成表格数据
function generateTableData() {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: MockRandom.ctitle(10, 20),
    description: MockRandom.cparagraph(1, 3),
    status: randomPick([0, 1]),
    priority: randomPick(['low', 'medium', 'high', 'urgent']),
    category: randomPick(['tech', 'product', 'design', 'operation', 'market']),
    author: MockRandom.cname(),
    views: MockRandom.integer(0, 10000),
    likes: MockRandom.integer(0, 1000),
    createTime: MockRandom.datetime(),
    updateTime: MockRandom.datetime(),
  }))
}

export default [
  ...createCrudMock('/api/table', generateTableData),
] as MockMethod[]
