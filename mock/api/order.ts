import type { MockMethod } from 'vite-plugin-mock'
import { createPageResult, errorResult, successResult } from '../_util'
import { orders } from '../data/order'

export default [
  // 获取订单列表
  {
    url: '/api/order/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, orderNo, customerName, status } = query

      let filteredList = [...orders]

      if (orderNo) {
        filteredList = filteredList.filter(item => item.orderNo.includes(orderNo))
      }

      if (customerName) {
        filteredList = filteredList.filter(item => item.customerName.includes(customerName))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取订单详情
  {
    url: '/api/order/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const order = orders.find(item => item.id === id)

      if (!order) {
        return errorResult('订单不存在', 404)
      }

      return successResult(order)
    },
  },

  // 创建订单
  {
    url: '/api/order',
    method: 'post',
    response: ({ body }: any) => {
      const newOrder = {
        id: String(orders.length + 1),
        orderNo: `ORD${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`,
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      orders.push(newOrder)

      return successResult(newOrder, '创建成功')
    },
  },

  // 更新订单
  {
    url: '/api/order/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = orders.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('订单不存在', 404)
      }

      orders[index] = {
        ...orders[index],
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(orders[index], '更新成功')
    },
  },

  // 删除订单
  {
    url: '/api/order/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = orders.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('订单不存在', 404)
      }

      orders.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },

  // 取消订单
  {
    url: '/api/order/:id/cancel',
    method: 'post',
    response: ({ query }: any) => {
      const { id } = query
      const order = orders.find(item => item.id === id)

      if (!order) {
        return errorResult('订单不存在', 404)
      }

      if (order.status !== 1) {
        return errorResult('只能取消待支付订单', 400)
      }

      order.status = 5
      order.statusText = '已取消'
      order.updateTime = new Date().toISOString()

      return successResult(order, '订单已取消')
    },
  },
] as MockMethod[]
