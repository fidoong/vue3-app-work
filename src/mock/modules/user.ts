/**
 * 用户相关 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { createCrudMock, createMock, MockRandom, successResponse } from '../core'

/**
 * 用户数据类型
 */
export interface MockUser {
  id: string
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  gender: number
  status: number
  role: string
  department: string
  createTime: string
  updateTime: string
}

/**
 * 生成模拟用户数据
 */
function generateUsers(): MockUser[] {
  return Array.from({ length: 50 }, () => ({
    id: MockRandom.guid(),
    username: MockRandom.word(5, 10),
    nickname: MockRandom.cname(),
    email: MockRandom.email(),
    phone: MockRandom.phone(),
    avatar: MockRandom.image('200x200', MockRandom.color(), '#FFF', 'Avatar'),
    gender: MockRandom.integer(0, 2), // 0:未知 1:男 2:女
    status: MockRandom.status(),
    role: MockRandom.pick(['admin', 'user', 'guest']),
    department: MockRandom.pick(['技术部', '产品部', '运营部', '市场部', '人事部']),
    createTime: MockRandom.datetime(),
    updateTime: MockRandom.datetime(),
  }))
}

export default [
  // 用户登录
  createMock('/api/user/login', 'post', (req: any) => {
    const { username, password } = JSON.parse(req.body)

    // 简单验证
    if (username === 'admin' && password === '123456') {
      return successResponse({
        token: MockRandom.guid(),
        refreshToken: MockRandom.guid(),
        userInfo: {
          id: '1',
          username: 'admin',
          nickname: '管理员',
          avatar: MockRandom.image('200x200'),
          role: 'admin',
          permissions: ['*:*:*'],
        },
      }, '登录成功')
    }

    return {
      code: 401,
      message: '用户名或密码错误',
      data: null,
      timestamp: Date.now(),
    }
  }),

  // 获取用户信息
  createMock('/api/user/info', 'get', () => {
    return successResponse({
      id: '1',
      username: 'admin',
      nickname: '管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      avatar: MockRandom.image('200x200'),
      role: 'admin',
      department: '技术部',
      permissions: ['*:*:*'],
    })
  }),

  // 退出登录
  createMock('/api/user/logout', 'post', () => {
    return successResponse(null, '退出成功')
  }),

  // 用户 CRUD 接口
  ...createCrudMock<MockUser>('/api/users', generateUsers, {
    timeout: 300,
    idField: 'id',
    pagination: true,
    searchable: true,
    searchFields: ['username', 'nickname', 'email', 'phone'],
  }),
] as MockMethod[]
