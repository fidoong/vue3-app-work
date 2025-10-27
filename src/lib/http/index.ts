/**
 * HTTP 客户端模块统一导出
 */

// 导出客户端实例
export * from './clients'

// 导出核心功能
export * from './core'

// 导出插件
export * from './plugins/logger'

// 导出工具函数
export * from './utils/helpers'

// 重新导出类型（从统一的类型系统）
export type {
  // HTTP 基础类型
  ApiResponse,
  ApiResponseExtended,
  BatchResult,
  ContentType,
  // 请求参数类型
  CursorPageParams,
  CursorPageResult,
  DateString,
  // 配置类型
  DownloadConfig,
  HttpClientConfig,
  HttpMethod,
  ID,
  IdParam,

  IdsParam,
  PageParams,
  PageResult,
  QueryParams,
  RequestConfig,

  StatusCode,
  Timestamp,
  TreeResult,
  UploadConfig,
} from '~/types/http'
