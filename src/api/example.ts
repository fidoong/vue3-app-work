/**
 * API 使用示例
 */
import type { PageData, PageParams } from './types/response'
import { del, download, get, post, put, upload } from './request'

/**
 * 用户信息接口
 */
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  role: string
  createdAt: string
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string
  user: User
}

/**
 * 用户 API
 */
export const userApi = {
  /**
   * 用户登录
   */
  login(data: LoginParams) {
    return post<LoginResponse>('/auth/login', data, {
      showLoading: true,
      showSuccess: true,
      successMessage: '登录成功',
      requireAuth: false,
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return get<User>('/user/info', undefined, {
      showLoading: false,
    })
  },

  /**
   * 更新用户信息
   */
  updateUser(id: number, data: Partial<User>) {
    return put<User>(`/user/${id}`, data, {
      showSuccess: true,
      successMessage: '更新成功',
    })
  },

  /**
   * 删除用户
   */
  deleteUser(id: number) {
    return del<void>(`/user/${id}`, undefined, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  },

  /**
   * 获取用户列表（分页）
   */
  getUserList(params: PageParams) {
    return get<PageData<User>>('/user/list', params)
  },

  /**
   * 上传头像
   */
  uploadAvatar(file: File) {
    return upload<{ url: string }>('/user/avatar', file, {
      showLoading: true,
      showSuccess: true,
      successMessage: '上传成功',
    })
  },

  /**
   * 导出用户数据
   */
  exportUsers(params?: any) {
    return download('/user/export', params, 'users.xlsx')
  },
}

/**
 * 在组件中使用示例
 */
export function useUserExample() {
  // 登录
  async function handleLogin() {
    try {
      const res = await userApi.login({
        username: 'admin',
        password: '123456',
      })
      // 保存 token
      localStorage.setItem('token', res.data.token)
    }
    catch (error) {
      console.error('登录失败:', error)
    }
  }

  // 获取用户列表
  async function fetchUserList() {
    try {
      await userApi.getUserList({
        page: 1,
        pageSize: 10,
      })
    }
    catch (error) {
      console.error('获取失败:', error)
    }
  }

  // 上传文件
  async function handleUpload(file: File) {
    try {
      await userApi.uploadAvatar(file)
    }
    catch (error) {
      console.error('上传失败:', error)
    }
  }

  return {
    handleLogin,
    fetchUserList,
    handleUpload,
  }
}
