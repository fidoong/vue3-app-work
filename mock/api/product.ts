import type { MockMethod } from 'vite-plugin-mock'
import { createPageResult, errorResult, successResult } from '../_util'
import { products } from '../data/product'

export default [
  // 获取商品列表
  {
    url: '/api/product/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, productName, category, status } = query

      let filteredList = [...products]

      if (productName) {
        filteredList = filteredList.filter(item => item.productName.includes(productName))
      }

      if (category) {
        filteredList = filteredList.filter(item => item.category === category)
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取商品详情
  {
    url: '/api/product/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const product = products.find(item => item.id === id)

      if (!product) {
        return errorResult('商品不存在', 404)
      }

      return successResult(product)
    },
  },

  // 创建商品
  {
    url: '/api/product',
    method: 'post',
    response: ({ body }: any) => {
      const newProduct = {
        id: String(products.length + 1),
        productCode: `PRD${Math.floor(Math.random() * 90000) + 10000}`,
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      products.push(newProduct)

      return successResult(newProduct, '创建成功')
    },
  },

  // 更新商品
  {
    url: '/api/product/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = products.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('商品不存在', 404)
      }

      products[index] = {
        ...products[index],
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(products[index], '更新成功')
    },
  },

  // 删除商品
  {
    url: '/api/product/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = products.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('商品不存在', 404)
      }

      products.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
