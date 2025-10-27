import type { MockMethod } from 'vite-plugin-mock'
import { errorResult, getRequestToken, successResult } from '../_util'
import { getMenuByRoles } from '../data/menu'
import { generateToken, passwords, users, validateToken } from '../data/user'

export default [
  // 登录
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      const { username, password } = body

      if (!username || !password) {
        return errorResult('用户名和密码不能为空', 400)
      }

      const user = users[username]
      if (!user) {
        return errorResult('用户不存在', 404)
      }

      if (passwords[username] !== password) {
        return errorResult('密码错误', 401)
      }

      const token = generateToken(username)

      return successResult({
        token,
        userInfo: user,
      }, '登录成功')
    },
  },

  // 获取用户信息
  {
    url: '/api/auth/userinfo',
    method: 'get',
    response: ({ headers }: any) => {
      const token = getRequestToken({ headers })

      if (!token) {
        return errorResult('未授权', 401)
      }

      const user = validateToken(token)
      if (!user) {
        return errorResult('Token 无效或已过期', 401)
      }

      return successResult(user)
    },
  },

  // 获取用户菜单
  {
    url: '/api/auth/menu',
    method: 'get',
    response: ({ headers }: any) => {
      const token = getRequestToken({ headers })

      if (!token) {
        return errorResult('未授权', 401)
      }

      const user = validateToken(token)
      if (!user) {
        return errorResult('Token 无效或已过期', 401)
      }

      const menus = getMenuByRoles(user.roles)

      return successResult(menus)
    },
  },

  // 获取用户权限
  {
    url: '/api/auth/permissions',
    method: 'get',
    response: ({ headers }: any) => {
      const token = getRequestToken({ headers })

      if (!token) {
        return errorResult('未授权', 401)
      }

      const user = validateToken(token)
      if (!user) {
        return errorResult('Token 无效或已过期', 401)
      }

      return successResult(user.permissions)
    },
  },

  // 登出
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => {
      return successResult(null, '登出成功')
    },
  },

  // 刷新 Token
  {
    url: '/api/auth/refresh',
    method: 'post',
    response: ({ headers }: any) => {
      const token = getRequestToken({ headers })

      if (!token) {
        return errorResult('未授权', 401)
      }

      const user = validateToken(token)
      if (!user) {
        return errorResult('Token 无效或已过期', 401)
      }

      const newToken = generateToken(user.username)

      return successResult({ token: newToken }, 'Token 刷新成功')
    },
  },
] as MockMethod[]
