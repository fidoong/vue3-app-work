/**
 * 用户服务 API
 */
import type { ApiResponse, PageData, PageParams } from '../core'
import { userClient } from '../clients'

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
  updatedAt?: string
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
  expiresIn: number
}

/**
 * 注册参数
 */
export interface RegisterParams {
  username: string
  email: string
  password: string
}

/**
 * 更新用户参数
 */
export interface UpdateUserParams {
  username?: string
  email?: string
  avatar?: string
}

/**
 * 用户服务类
 */
export class UserService {
  /**
   * 用户登录
   */
  static login(data: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return userClient.post<LoginResponse>('/login', data, {
      showLoading: true,
      showSuccess: true,
      successMessage: '登录成功',
      requireAuth: false,
    })
  }

  /**
   * 用户注册
   */
  static register(data: RegisterParams): Promise<ApiResponse<User>> {
    return userClient.post<User>('/register', data, {
      showSuccess: true,
      successMessage: '注册成功',
      requireAuth: false,
    })
  }

  /**
   * 获取当前用户信息
   */
  static getCurrentUser(): Promise<ApiResponse<User>> {
    return userClient.get<User>('/current', undefined, {
      showLoading: false,
    })
  }

  /**
   * 获取用户信息
   */
  static getUserById(id: number): Promise<ApiResponse<User>> {
    return userClient.get<User>(`/${id}`)
  }

  /**
   * 获取用户列表
   */
  static getUserList(params: PageParams): Promise<ApiResponse<PageData<User>>> {
    return userClient.get<PageData<User>>('/list', params)
  }

  /**
   * 更新用户信息
   */
  static updateUser(id: number, data: UpdateUserParams): Promise<ApiResponse<User>> {
    return userClient.put<User>(`/${id}`, data, {
      showSuccess: true,
      successMessage: '更新成功',
    })
  }

  /**
   * 删除用户
   */
  static deleteUser(id: number): Promise<ApiResponse<void>> {
    return userClient.delete<void>(`/${id}`, undefined, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }

  /**
   * 修改密码
   */
  static changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return userClient.post<void>('/change-password', {
      oldPassword,
      newPassword,
    }, {
      showSuccess: true,
      successMessage: '密码修改成功',
    })
  }

  /**
   * 上传头像
   */
  static uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
    return userClient.upload<{ url: string }>('/avatar', file, {
      showLoading: true,
      showSuccess: true,
      successMessage: '上传成功',
      fieldName: 'avatar',
    })
  }

  /**
   * 导出用户数据
   */
  static exportUsers(params?: any): Promise<void> {
    return userClient.download('/export', params, {
      filename: `users_${Date.now()}.xlsx`,
    })
  }
}
