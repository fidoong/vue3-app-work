/**
 * 数据字典 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { badRequestResponse, createMock, getUrlParams, notFoundResponse, successResponse } from '../core'

// 模拟字典数据
const dictData: Record<string, any[]> = {
  // 状态字典
  status: [
    { label: '启用', value: 1, color: 'success' },
    { label: '禁用', value: 0, color: 'error' },
  ],

  // 性别字典
  gender: [
    { label: '未知', value: 0, color: 'default' },
    { label: '男', value: 1, color: 'blue' },
    { label: '女', value: 2, color: 'pink' },
  ],

  // 优先级字典
  priority: [
    { label: '低', value: 'low', color: 'default' },
    { label: '中', value: 'medium', color: 'blue' },
    { label: '高', value: 'high', color: 'orange' },
    { label: '紧急', value: 'urgent', color: 'red' },
  ],

  // 分类字典
  category: [
    { label: '技术', value: 'tech', icon: 'code' },
    { label: '产品', value: 'product', icon: 'product' },
    { label: '设计', value: 'design', icon: 'design' },
    { label: '运营', value: 'operation', icon: 'operation' },
    { label: '市场', value: 'market', icon: 'market' },
  ],

  // 角色字典
  role: [
    { label: '管理员', value: 'admin', color: 'red' },
    { label: '普通用户', value: 'user', color: 'blue' },
    { label: '访客', value: 'guest', color: 'default' },
  ],

  // 部门字典
  department: [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' },
    { label: '市场部', value: 'market' },
    { label: '人事部', value: 'hr' },
    { label: '财务部', value: 'finance' },
  ],

  // 订单状态
  orderStatus: [
    { label: '待支付', value: 'pending', color: 'warning' },
    { label: '已支付', value: 'paid', color: 'success' },
    { label: '已发货', value: 'shipped', color: 'processing' },
    { label: '已完成', value: 'completed', color: 'success' },
    { label: '已取消', value: 'cancelled', color: 'error' },
    { label: '已退款', value: 'refunded', color: 'default' },
  ],

  // 审核状态
  auditStatus: [
    { label: '待审核', value: 'pending', color: 'warning' },
    { label: '审核通过', value: 'approved', color: 'success' },
    { label: '审核拒绝', value: 'rejected', color: 'error' },
  ],
}

export default [
  // 获取字典数据
  createMock('/api/dict', 'get', (req: any) => {
    const { type } = getUrlParams(req.url)

    if (!type) {
      return badRequestResponse('字典类型不能为空')
    }

    const data = dictData[type]
    if (!data) {
      return notFoundResponse('字典类型不存在')
    }

    return successResponse(data)
  }),

  // 获取所有字典
  createMock('/api/dict/all', 'get', () => {
    return successResponse(dictData)
  }),

  // 批量获取字典
  createMock('/api/dict/batch', 'post', (req: any) => {
    const { types } = JSON.parse(req.body)
    const result: Record<string, any[]> = {}

    types.forEach((type: string) => {
      if (dictData[type]) {
        result[type] = dictData[type]
      }
    })

    return successResponse(result)
  }),
] as MockMethod[]
