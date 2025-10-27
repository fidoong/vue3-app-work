import type { MockMethod } from 'vite-plugin-mock'
import type { UserInfo } from '../data/user'
import Mock from 'mockjs'
import { createPageResult, errorResult, successResult } from '../_util'

// 生成用户列表
const userList: UserInfo[] = Mock.mock({
  'list|50': [
    {
      'id|+1': 1,
      'username': '@word(5, 10)',
      'realName': '@cname',
      'avatar': () => `https://api.dicebear.com/7.x/avataaars/svg?seed=${Mock.Random.word()}`,
      'email': '@email',
      'phone': /^1[3-9]\d{9}/,
      'roles|1-2': ['admin', 'user', 'test'],
      'permissions': ['system:user:query'],
      'dept': {
        'id|1-10': 1,
        'deptName': '@ctitle(2, 4)',
      },
      'status|1': [0, 1],
      'createTime': '@datetime',
    },
  ],
}).list.map((item: any) => ({
  ...item,
  id: String(item.id),
  dept: {
    id: String(item.dept.id),
    name: item.dept.deptName,
  },
}))

export default [
  // 获取用户列表
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }: any) => {
      const { pageNum = 1, pageSize = 10, username, realName, status } = query

      let filteredList = [...userList]

      if (username) {
        filteredList = filteredList.filter(item => item.username.includes(username))
      }

      if (realName) {
        filteredList = filteredList.filter(item => item.realName.includes(realName))
      }

      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter(item => item.status === Number(status))
      }

      return createPageResult(filteredList, Number(pageNum), Number(pageSize))
    },
  },

  // 获取用户详情
  {
    url: '/api/user/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const user = userList.find(item => item.id === id)

      if (!user) {
        return errorResult('用户不存在', 404)
      }

      return successResult(user)
    },
  },

  // 创建用户
  {
    url: '/api/user',
    method: 'post',
    response: ({ body }: any) => {
      const newUser: UserInfo = {
        id: String(userList.length + 1),
        ...body,
        createTime: new Date().toISOString(),
      }

      userList.push(newUser)

      return successResult(newUser, '创建成功')
    },
  },

  // 更新用户
  {
    url: '/api/user/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query
      const index = userList.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('用户不存在', 404)
      }

      userList[index] = { ...userList[index], ...body }

      return successResult(userList[index], '更新成功')
    },
  },

  // 删除用户
  {
    url: '/api/user/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      const index = userList.findIndex(item => item.id === id)

      if (index === -1) {
        return errorResult('用户不存在', 404)
      }

      userList.splice(index, 1)

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
