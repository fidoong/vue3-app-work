/**
 * Mock 辅助函数
 */
import type { MockMethod } from 'vite-plugin-mock'
import type { CrudMockOptions } from './types'
import Mock from 'mockjs'
import { notFoundResponse, pageResponse, successResponse } from './response'

/**
 * 从 URL 中获取参数
 */
export function getUrlParams(url: string): Record<string, any> {
  const params: Record<string, any> = {}
  const queryString = url.split('?')[1]

  if (!queryString)
    return params

  queryString.split('&').forEach((param) => {
    const [key, value] = param.split('=')
    if (key && value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value)
    }
  })

  return params
}

/**
 * 从 URL 中获取路径参数
 */
export function getPathParam(url: string, pattern: string): string | null {
  const urlParts = url.split('?')[0].split('/')
  const patternParts = pattern.split('/')

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      return urlParts[i]
    }
  }

  return null
}

/**
 * 延迟响应（模拟网络延迟）
 */
export function delay(time = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 随机生成指定范围的整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 随机选择数组中的一个元素
 */
export function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

/**
 * 生成随机 ID
 */
export function randomId(): string {
  return Mock.Random.guid()
}

/**
 * 生成随机日期
 */
export function randomDate(start?: Date, end?: Date): string {
  const startTime = start ? start.getTime() : Date.now() - 365 * 24 * 60 * 60 * 1000
  const endTime = end ? end.getTime() : Date.now()
  const randomTime = startTime + Math.random() * (endTime - startTime)
  return new Date(randomTime).toISOString()
}

/**
 * 创建 Mock 接口
 */
export function createMock(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  response: any,
  timeout = 300,
): MockMethod {
  return {
    url,
    method,
    timeout,
    response: typeof response === 'function' ? response : () => response,
  }
}

/**
 * 批量创建 CRUD Mock 接口
 */
export function createCrudMock<T extends Record<string, any>>(
  baseUrl: string,
  dataGenerator: () => T[],
  options?: CrudMockOptions,
): MockMethod[] {
  const {
    timeout = 300,
    idField = 'id',
    pagination = true,
    searchable = true,
    searchFields = [],
  } = options || {}

  let dataList = dataGenerator()

  return [
    // 列表查询
    createMock(`${baseUrl}`, 'get', (req: any) => {
      const params = getUrlParams(req.url)
      const { page = 1, pageSize = 10, keyword, ...filters } = params

      // 搜索过滤
      let filteredList = dataList
      if (searchable && keyword && searchFields.length > 0) {
        filteredList = filteredList.filter((item: any) =>
          searchFields.some(field =>
            String(item[field]).toLowerCase().includes(String(keyword).toLowerCase()),
          ),
        )
      }

      // 字段过滤
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== '') {
          filteredList = filteredList.filter((item: any) =>
            String(item[key]).includes(String(filters[key])),
          )
        }
      })

      // 分页
      if (pagination) {
        return pageResponse(filteredList, Number(page), Number(pageSize))
      }

      return successResponse({ list: filteredList, total: filteredList.length })
    }, timeout),

    // 详情查询
    createMock(`${baseUrl}/:id`, 'get', (req: any) => {
      const id = req.url.split('/').pop()?.split('?')[0]
      const item = dataList.find((item: any) => String(item[idField]) === id)
      return item ? successResponse(item) : notFoundResponse()
    }, timeout),

    // 新增
    createMock(`${baseUrl}`, 'post', (req: any) => {
      const body = JSON.parse(req.body)
      const newItem = {
        ...body,
        [idField]: randomId(),
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      } as T
      dataList.push(newItem)
      return successResponse(newItem, '新增成功')
    }, timeout),

    // 更新
    createMock(`${baseUrl}/:id`, 'put', (req: any) => {
      const id = req.url.split('/').pop()?.split('?')[0]
      const body = JSON.parse(req.body)
      const index = dataList.findIndex((item: any) => String(item[idField]) === id)

      if (index === -1) {
        return notFoundResponse()
      }

      dataList[index] = {
        ...dataList[index],
        ...body,
        updateTime: new Date().toISOString(),
      }
      return successResponse(dataList[index], '更新成功')
    }, timeout),

    // 删除
    createMock(`${baseUrl}/:id`, 'delete', (req: any) => {
      const id = req.url.split('/').pop()
      const index = dataList.findIndex((item: any) => String(item[idField]) === id)

      if (index === -1) {
        return notFoundResponse()
      }

      dataList.splice(index, 1)
      return successResponse(null, '删除成功')
    }, timeout),

    // 批量删除
    createMock(`${baseUrl}/batch`, 'delete', (req: any) => {
      const { ids } = JSON.parse(req.body)
      dataList = dataList.filter((item: any) => !ids.includes(item[idField]))
      return successResponse(null, `已删除 ${ids.length} 条数据`)
    }, timeout),
  ]
}

/**
 * Mock.js Random 扩展
 */
export const MockRandom = Mock.Random

// 扩展自定义方法
MockRandom.extend({
  // 生成手机号
  phone() {
    const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']
    return randomPick(prefixes) + Mock.mock(/\d{8}/)
  },

  // 生成状态
  status() {
    return randomPick([0, 1])
  },

  // 生成优先级
  priority() {
    return randomPick(['low', 'medium', 'high', 'urgent'])
  },

  // 生成中文地址
  address() {
    return `${Mock.Random.province()}${Mock.Random.city()}${Mock.Random.county()}${Mock.Random.cword(5, 10)}号`
  },
})
