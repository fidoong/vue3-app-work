import type { MockMethod } from 'vite-plugin-mock'
import { createPageResult, errorResult, successResult } from '../_util'
import { customers } from '../data/customer'

export default [
  // 获取客户列表
  {
    url: '/api/customer/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, customerName, phone, level, status } = query

      let filteredList = [...customers]

      if (customerName) {
        filteredList = filteredList.filter(item => item.customerName.includes(customerName))
      }

      if (phone) {
        filteredList = filteredList.filter(item => item.phone.includes(phone))
      }

      if (level !== undefined && level !== '') {
        filteredList = filteredList.filter(item => item.level === Number(level))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取客户详情
  {
    url: '/api/customer/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const customer = customers.find(item => item.id === id)

      if (!customer) {
        return errorResult('客户不存在', 404)
      }

      return successResult(customer)
    },
  },

  // 创建客户
  {
    url: '/api/customer',
    method: 'post',
    response: ({ body }: any) => {
      const newCustomer = {
        id: String(customers.length + 1),
        customerCode: `CUS${Math.floor(Math.random() * 90000) + 10000}`,
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      customers.push(newCustomer)

      return successResult(newCustomer, '创建成功')
    },
  },

  // 更新客户
  {
    url: '/api/customer/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = customers.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('客户不存在', 404)
      }

      customers[index] = {
        ...customers[index],
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(customers[index], '更新成功')
    },
  },

  // 删除客户
  {
    url: '/api/customer/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = customers.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('客户不存在', 404)
      }

      customers.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
