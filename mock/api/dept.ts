import type { MockMethod } from 'vite-plugin-mock'
import { errorResult, successResult } from '../_util'
import { deptTree, findDeptById, flattenDeptTree } from '../data/dept'

export default [
  // 获取部门树
  {
    url: '/api/dept/tree',
    method: 'get',
    response: () => {
      return successResult(deptTree)
    },
  },

  // 获取部门列表（扁平化）
  {
    url: '/api/dept/list',
    method: 'get',
    response: ({ query }: any) => {
      const { deptName, status } = query

      let list = flattenDeptTree(deptTree)

      if (deptName) {
        list = list.filter(item => item.deptName.includes(deptName))
      }

      if (status !== undefined && status !== '') {
        list = list.filter(item => item.status === Number(status))
      }

      return successResult(list)
    },
  },

  // 获取部门详情
  {
    url: '/api/dept/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const dept = findDeptById(id)

      if (!dept) {
        return errorResult('部门不存在', 404)
      }

      return successResult(dept)
    },
  },

  // 创建部门
  {
    url: '/api/dept',
    method: 'post',
    response: ({ body }: any) => {
      const newDept = {
        id: String(Date.now()),
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      return successResult(newDept, '创建成功')
    },
  },

  // 更新部门
  {
    url: '/api/dept/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const dept = findDeptById(id)

      if (!dept) {
        return errorResult('部门不存在', 404)
      }

      const updatedDept = {
        ...dept,
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(updatedDept, '更新成功')
    },
  },

  // 删除部门
  {
    url: '/api/dept/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const dept = findDeptById(id)

      if (!dept) {
        return errorResult('部门不存在', 404)
      }

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
