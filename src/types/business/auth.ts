/**
 * 认证授权相关类型定义
 */

import type { ID } from '../http/base'
import type { BaseEntity, StatusEntity } from './common'

// ==================== 登录认证 ====================

/**
 * 登录参数
 */
export interface LoginParams {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  captcha?: string
  /** 验证码 Key */
  captchaKey?: string
  /** 记住我 */
  rememberMe?: boolean
}

/**
 * 登录结果
 */
export interface LoginResult {
  /** 访问令牌 */
  token: string
  /** 刷新令牌 */
  refreshToken?: string
  /** 过期时间（秒） */
  expiresIn?: number
  /** 用户信息 */
  userInfo: UserInfo
}

/**
 * 刷新令牌参数
 */
export interface RefreshTokenParams {
  refreshToken: string
}

/**
 * 刷新令牌结果
 */
export interface RefreshTokenResult {
  token: string
  refreshToken?: string
  expiresIn?: number
}

/**
 * 验证码结果
 */
export interface CaptchaResult {
  /** 验证码 Key */
  captchaKey: string
  /** 验证码图片（Base64） */
  captchaImage: string
  /** 过期时间（秒） */
  expiresIn?: number
}

// ==================== 用户信息 ====================

/**
 * 用户信息
 */
export interface UserInfo extends BaseEntity, StatusEntity {
  /** 用户名 */
  username: string
  /** 真实姓名 */
  realName: string
  /** 昵称 */
  nickname?: string
  /** 头像 */
  avatar: string
  /** 邮箱 */
  email: string
  /** 手机号 */
  phone: string
  /** 性别：0-未知，1-男，2-女 */
  gender?: number
  /** 生日 */
  birthday?: string
  /** 角色列表 */
  roles: string[]
  /** 权限列表 */
  permissions: string[]
  /** 部门信息 */
  dept?: {
    id: ID
    name: string
  }
  /** 备注 */
  remark?: string
}

/**
 * 用户查询参数
 */
export interface UserQueryParams {
  /** 用户名 */
  username?: string
  /** 真实姓名 */
  realName?: string
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 状态 */
  status?: number
  /** 部门 ID */
  deptId?: ID
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}

/**
 * 用户创建参数
 */
export interface UserCreateParams {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 真实姓名 */
  realName: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 性别 */
  gender?: number
  /** 头像 */
  avatar?: string
  /** 生日 */
  birthday?: string
  /** 部门 ID */
  deptId?: ID
  /** 角色 ID 列表 */
  roleIds?: ID[]
  /** 状态 */
  status?: number
  /** 备注 */
  remark?: string
}

/**
 * 用户更新参数
 */
export interface UserUpdateParams extends Partial<Omit<UserCreateParams, 'username' | 'password'>> {
  id: ID
}

/**
 * 修改密码参数
 */
export interface ChangePasswordParams {
  /** 旧密码 */
  oldPassword: string
  /** 新密码 */
  newPassword: string
  /** 确认密码 */
  confirmPassword: string
}

/**
 * 重置密码参数
 */
export interface ResetPasswordParams {
  id: ID
  password: string
}

// ==================== 角色管理 ====================

/**
 * 角色信息
 */
export interface Role extends BaseEntity, StatusEntity {
  /** 角色名称 */
  roleName: string
  /** 角色标识 */
  roleKey: string
  /** 角色排序 */
  roleSort: number
  /** 数据权限范围 */
  dataScope: string
  /** 菜单 ID 列表 */
  menuIds: ID[]
  /** 部门 ID 列表（数据权限） */
  deptIds: ID[]
  /** 备注 */
  remark?: string
}

/**
 * 角色查询参数
 */
export interface RoleQueryParams {
  /** 角色名称 */
  roleName?: string
  /** 角色标识 */
  roleKey?: string
  /** 状态 */
  status?: number
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
}

/**
 * 角色创建参数
 */
export interface RoleCreateParams {
  /** 角色名称 */
  roleName: string
  /** 角色标识 */
  roleKey: string
  /** 角色排序 */
  roleSort?: number
  /** 数据权限范围 */
  dataScope?: string
  /** 菜单 ID 列表 */
  menuIds?: ID[]
  /** 部门 ID 列表 */
  deptIds?: ID[]
  /** 状态 */
  status?: number
  /** 备注 */
  remark?: string
}

/**
 * 角色更新参数
 */
export interface RoleUpdateParams extends Partial<RoleCreateParams> {
  id: ID
}

// ==================== 权限管理 ====================

/**
 * 权限信息
 */
export interface Permission {
  /** 权限标识 */
  permission: string
  /** 权限名称 */
  name: string
  /** 权限描述 */
  description?: string
}
