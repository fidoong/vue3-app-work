/**
 * HTTP 库类型定义
 *
 * 注意：此文件已废弃，所有类型已迁移到 ~/types/http
 * 为了保持向后兼容，这里重新导出类型
 *
 * @deprecated 请直接从 ~/types/http 导入类型
 */

export type {
  // 基础类型
  ApiResponse,
  ApiResponseExtended,
  BatchResult,
  BatchStatusParam,
  ContentType,
  CursorPageParams,
  CursorPageResult,
  DateString,
  DownloadConfig,
  ErrorHandlerConfig,
  ExportParams,
  HttpClientConfig,

  HttpMethod,
  ID,
  IdParam,
  IdsParam,
  ImportParams,
  LoggerConfig,
  // 请求参数类型
  PageParams,
  PageResult,
  QueryParams,
  // 配置类型
  RequestConfig,
  SortParams,

  StatusCode,
  StatusParam,
  TimeRangeParams,
  Timestamp,
  TreeResult,
  UploadConfig,
} from '~/types/http'
