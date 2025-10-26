/**
 * 用户服务
 */
import type { PageData, PageParams } from '../../lib/http/types'
import { apiClient } from '../../lib/http/clients'

/**
 * 用户信息
 */
export interface User {
  id: number | string
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
  role?: string
  status?: number
  createTime?: string
  updateTime?: string
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string
  password: string
  captcha?: string
  remember?: boolean
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string
  refreshToken?: string
  user: User
  expiresIn?: number
}

/**
 * 用户查询参数
 */
export interface UserQueryParams extends Partial<PageParams> {
  keyword?: string
  role?: string
  status?: number
  startTime?: string
  endTime?: string
}

/**
 * 用户服务类
 */
class UserService {
  /**
   * 登录
   */
  async login(params: LoginParams): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', params, {
      requireAuth: false,
      showSuccess: true,
      successMessage: '登录成功',
    })

    // 保存 token
    if (data.token) {
      localStorage.setItem('token', data.token)
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      if (data.user?.id) {
        localStorage.setItem('userId', String(data.user.id))
      }
    }

    return data
  }

  /**
   * 登出
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {}, {
        showError: false,
      })
    }
    finally {
      // 清除本地数据
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
      apiClient.clearCache()
    }
  }

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get<User>('/user/current', {}, {
      useCache: true,
      cacheTTL: 5 * 60 * 1000, // 5分钟
    })
    return data
  }

  /**
   * 更新当前用户信息
   */
  async updateCurrentUser(user: Partial<User>): Promise<User> {
    const { data } = await apiClient.put<User>('/user/current', user, {
      showSuccess: true,
      successMessage: '更新成功',
    })

    // 清除用户信息缓存
    apiClient.deleteCacheByUrl('/user/current')

    return data
  }

  /**
   * 修改密码
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/user/password', {
      oldPassword,
      newPassword,
    }, {
      showSuccess: true,
      successMessage: '密码修改成功',
    })
  }

  /**
   * 获取用户列表（分页）
   */
  async getUserList(params: UserQueryParams): Promise<PageData<User>> {
    const { data } = await apiClient.get<PageData<User>>('/users', params)
    return data
  }

  /**
   * 获取用户详情
   */
  async getUserById(id: number | string): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${id}`)
    return data
  }

  /**
   * 创建用户
   */
  async createUser(user: Partial<User>): Promise<User> {
    const { data } = await apiClient.post<User>('/users', user, {
      showSuccess: true,
      successMessage: '创建成功',
    })
    return data
  }

  /**
   * 更新用户
   */
  async updateUser(id: number | string, user: Partial<User>): Promise<User> {
    const { data } = await apiClient.put<User>(`/users/${id}`, user, {
      showSuccess: true,
      successMessage: '更新成功',
    })
    return data
  }

  /**
   * 删除用户
   */
  async deleteUser(id: number | string): Promise<void> {
    await apiClient.delete(`/users/${id}`, {}, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }

  /**
   * 批量删除用户
   */
  async batchDeleteUsers(ids: Array<number | string>): Promise<void> {
    await apiClient.post('/users/batch-delete', { ids }, {
      showSuccess: true,
      successMessage: '批量删除成功',
    })
  }

  /**
   * 重置用户密码
   */
  async resetPassword(id: number | string): Promise<{ password: string }> {
    const { data } = await apiClient.post<{ password: string }>(`/users/${id}/reset-password`, {}, {
      showSuccess: true,
      successMessage: '密码重置成功',
    })
    return data
  }

  /**
   * 刷新 Token
   */
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken')
    const { data } = await apiClient.post<LoginResponse>('/auth/refresh', {
      refreshToken,
    }, {
      requireAuth: false,
    })

    if (data.token) {
      localStorage.setItem('token', data.token)
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
    }

    return data
  }
}

/**
 * 导出单例
 */
export const userService = new UserService()
