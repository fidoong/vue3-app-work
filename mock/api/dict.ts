import type { MockMethod } from 'vite-plugin-mock'
import { createPageResult, errorResult, successResult } from '../_util'
import { dictDataList, dictTypes, getDictDataByType } from '../data/dict'

export default [
  // 获取字典类型列表
  {
    url: '/api/dict/type/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, dictName, dictType, status } = query

      let filteredList = [...dictTypes]

      if (dictName) {
        filteredList = filteredList.filter(item => item.dictName.includes(dictName))
      }

      if (dictType) {
        filteredList = filteredList.filter(item => item.dictType.includes(dictType))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取字典数据列表
  {
    url: '/api/dict/data/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, dictType, dictLabel, status } = query

      let filteredList = [...dictDataList]

      if (dictType) {
        filteredList = filteredList.filter(item => item.dictType === dictType)
      }

      if (dictLabel) {
        filteredList = filteredList.filter(item => item.dictLabel.includes(dictLabel))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 根据字典类型获取字典数据
  {
    url: '/api/dict/data/type/:dictType',
    method: 'get',
    response: ({ query }: any) => {
      const { dictType } = query
      const data = getDictDataByType(dictType)

      return successResult(data)
    },
  },

  // 创建字典类型
  {
    url: '/api/dict/type',
    method: 'post',
    response: ({ body }: any) => {
      const newType = {
        id: String(dictTypes.length + 1),
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      dictTypes.push(newType)

      return successResult(newType, '创建成功')
    },
  },

  // 创建字典数据
  {
    url: '/api/dict/data',
    method: 'post',
    response: ({ body }: any) => {
      const newData = {
        id: String(dictDataList.length + 1),
        ...body,
        createTime: new Date().toISOString(),
      }

      dictDataList.push(newData)

      return successResult(newData, '创建成功')
    },
  },

  // 更新字典类型
  {
    url: '/api/dict/type/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = dictTypes.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('字典类型不存在', 404)
      }

      dictTypes[index] = {
        ...dictTypes[index],
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(dictTypes[index], '更新成功')
    },
  },

  // 更新字典数据
  {
    url: '/api/dict/data/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = dictDataList.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('字典数据不存在', 404)
      }

      dictDataList[index] = { ...dictDataList[index], ...body }

      return successResult(dictDataList[index], '更新成功')
    },
  },

  // 删除字典类型
  {
    url: '/api/dict/type/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = dictTypes.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('字典类型不存在', 404)
      }

      dictTypes.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },

  // 删除字典数据
  {
    url: '/api/dict/data/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = dictDataList.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('字典数据不存在', 404)
      }

      dictDataList.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
