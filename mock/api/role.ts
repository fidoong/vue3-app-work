import type { MockMethod } from 'vite-plugin-mock'
import { createPageResult, errorResult, successResult } from '../_util'
import { roles } from '../data/role'

export default [
  // 获取角色列表
  {
    url: '/api/role/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, roleName, roleKey, status } = query

      let filteredList = [...roles]

      if (roleName) {
        filteredList = filteredList.filter(item => item.roleName.includes(roleName))
      }

      if (roleKey) {
        filteredList = filteredList.filter(item => item.roleKey.includes(roleKey))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取所有角色（不分页）
  {
    url: '/api/role/all',
    method: 'get',
    response: () => {
      return successResult(roles)
    },
  },

  // 获取角色详情
  {
    url: '/api/role/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const role = roles.find(item => item.id === id)

      if (!role) {
        return errorResult('角色不存在', 404)
      }

      return successResult(role)
    },
  },

  // 创建角色
  {
    url: '/api/role',
    method: 'post',
    response: ({ body }: any) => {
      const newRole = {
        id: String(roles.length + 1),
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }

      roles.push(newRole)

      return successResult(newRole, '创建成功')
    },
  },

  // 更新角色
  {
    url: '/api/role/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = roles.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('角色不存在', 404)
      }

      roles[index] = {
        ...roles[index],
        ...body,
        updateTime: new Date().toISOString(),
      }

      return successResult(roles[index], '更新成功')
    },
  },

  // 删除角色
  {
    url: '/api/role/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = roles.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('角色不存在', 404)
      }

      roles.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
