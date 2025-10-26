/**
 * 产品相关 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { createCrudMock, MockRandom } from '../core'

/**
 * 产品数据类型
 */
export interface MockProduct {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  status: number
  images: string[]
  createTime: string
  updateTime: string
}

/**
 * 生成模拟产品数据
 */
function generateProducts(): MockProduct[] {
  return Array.from({ length: 30 }, () => ({
    id: MockRandom.guid(),
    name: MockRandom.ctitle(5, 15),
    description: MockRandom.cparagraph(1, 3),
    price: MockRandom.float(10, 9999, 2, 2),
    stock: MockRandom.integer(0, 1000),
    category: MockRandom.pick(['电子产品', '服装', '食品', '图书', '家居']),
    status: MockRandom.status(),
    images: Array.from({ length: MockRandom.integer(1, 5) }, () =>
      MockRandom.image('400x400', MockRandom.color(), '#FFF', 'Product')),
    createTime: MockRandom.datetime(),
    updateTime: MockRandom.datetime(),
  }))
}

export default [
  ...createCrudMock<MockProduct>('/api/products', generateProducts, {
    timeout: 300,
    idField: 'id',
    pagination: true,
    searchable: true,
    searchFields: ['name', 'description', 'category'],
  }),
] as MockMethod[]
