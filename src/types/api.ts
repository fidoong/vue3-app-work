/**
 * API 接口类型定义（向后兼容）
 *
 * 注意：此文件已重构，所有类型已迁移到模块化的类型系统
 * - HTTP 基础类型：~/types/http
 * - 业务类型：~/types/business
 * - 工具类型：~/types/utils
 *
 * 为了保持向后兼容，这里重新导出所有类型
 *
 * @deprecated 建议直接从 ~/types 导入类型
 */

// ==================== 重新导出类型 ====================

// ==================== 保留的旧类型定义（向后兼容） ====================

// 重新导入 EnumItem 用于下面的定义
import type { EnumItem } from '~/types/business/common'

export type {
  CaptchaResult,
  ChangePasswordParams,
  // 认证授权
  LoginParams,
  LoginResult,
  // 权限管理
  Permission,
  RefreshTokenParams,
  RefreshTokenResult,

  ResetPasswordParams,
  // 角色管理
  Role,
  RoleCreateParams,
  RoleQueryParams,

  RoleUpdateParams,
  UserCreateParams,
  // 用户管理
  UserInfo,
  UserQueryParams,

  UserUpdateParams,
} from '~/types/business/auth'

// 业务通用类型
export type {
  BaseEntity,
  EnumItem,
  FileInfo,
  TreeNode,
} from '~/types/business/common'

export type {
  ErrorLog,
  ErrorLogQueryParams,
  LoginLog,
  LoginLogQueryParams,
  // 日志管理
  OperationLog,
  OperationLogQueryParams,
} from '~/types/business/log'

export type {
  // 部门管理
  Dept,
  DeptCreateParams,
  DeptQueryParams,
  DeptUpdateParams,
  DictData,
  DictDataCreateParams,

  DictDataQueryParams,
  DictDataUpdateParams,
  // 字典管理
  DictType,
  DictTypeCreateParams,

  DictTypeQueryParams,
  DictTypeUpdateParams,
  MenuCreateParams,
  // 菜单管理
  MenuItem,
  MenuMeta,
  MenuQueryParams,
  MenuType,
  MenuUpdateParams,

  // 通知公告
  Notice,
  NoticeCreateParams,
  NoticeQueryParams,
  NoticeUpdateParams,

  // 系统配置
  SystemConfig,
  SystemConfigCreateParams,
  SystemConfigQueryParams,
  SystemConfigUpdateParams,
} from '~/types/business/system'

// HTTP 基础类型
export type {
  ApiResponse,
  ApiResponseExtended,
  BatchResult,
  CursorPageResult,
  DateString,
  ID,
  PageResult,
  StatusCode,
  Timestamp,
} from '~/types/http/base'

// 请求参数类型
export type {
  IdParam,
  IdsParam,
  PageParams,
  QueryParams,
} from '~/types/http/request'

/**
 * 文件上传响应
 * @deprecated 使用 FileInfo from '~/types/business/common'
 */
export interface UploadResult {
  url: string
  filename: string
  size: number
  mimeType?: string
}

/**
 * 批量上传响应
 * @deprecated 使用 BatchResult<FileInfo> from '~/types/http'
 */
export interface BatchUploadResult {
  files: UploadResult[]
  successCount: number
  failCount: number
}

/**
 * 用户状态更新参数
 * @deprecated 使用 StatusParam & IdParam from '~/types/http'
 */
export interface UserStatusParams {
  id: string
  status: number
}

/**
 * 所有枚举
 */
export interface AllEnums {
  userStatus: EnumItem[]
  gender: EnumItem[]
  menuType: EnumItem[]
  dataScope: EnumItem[]
  noticeType: EnumItem[]
  noticeStatus: EnumItem[]
  operationStatus: EnumItem[]
  loginStatus: EnumItem[]
}
