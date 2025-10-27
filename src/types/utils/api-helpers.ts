/**
 * API 类型工具函数
 * 提供 API 相关的类型工具和泛型定义
 */

import type {
  ApiResponse,
  BatchResult,
  CursorPageResult,
  PageResult,
} from '../http/base'
import type { CursorPageParams, PageParams, QueryParams } from '../http/request'

/**
 * 提取 API 响应的数据类型
 * @example
 * type UserResponse = ApiResponse<User>
 * type UserData = ExtractApiData<UserResponse> // User
 */
export type ExtractApiData<T> = T extends ApiResponse<infer D> ? D : never

/**
 * 提取分页数据的列表类型
 * @example
 * type UserPageResult = PageResult<User>
 * type UserList = ExtractPageList<UserPageResult> // User
 */
export type ExtractPageList<T> = T extends PageResult<infer L> ? L : never

/**
 * API 服务方法类型
 * @example
 * const login: ApiMethod<LoginParams, LoginResult> = async (params) => {
 *   return await request.post('/auth/login', params)
 * }
 */
export type ApiMethod<P = any, R = any> = (params: P) => Promise<ApiResponse<R>>

/**
 * 分页 API 方法类型
 * @example
 * const getUserList: PageApiMethod<UserQueryParams, User> = async (params) => {
 *   return await request.get('/users', { params })
 * }
 */
export type PageApiMethod<P extends PageParams = PageParams, T = any> = (
  params: P
) => Promise<ApiResponse<PageResult<T>>>

/**
 * 游标分页 API 方法类型
 * @example
 * const getPostList: CursorPageApiMethod<PostQueryParams, Post> = async (params) => {
 *   return await request.get('/posts', { params })
 * }
 */
export type CursorPageApiMethod<P extends CursorPageParams = CursorPageParams, T = any> = (
  params: P
) => Promise<ApiResponse<CursorPageResult<T>>>

/**
 * 查询 API 方法类型
 */
export type QueryApiMethod<P extends QueryParams = QueryParams, T = any> = (
  params: P
) => Promise<ApiResponse<PageResult<T>>>

/**
 * 详情 API 方法类型
 */
export type DetailApiMethod<T = any> = (id: string | number) => Promise<ApiResponse<T>>

/**
 * 创建 API 方法类型
 */
export type CreateApiMethod<P = any, R = any> = (data: P) => Promise<ApiResponse<R>>

/**
 * 更新 API 方法类型
 */
export type UpdateApiMethod<P = any, R = any> = (data: P) => Promise<ApiResponse<R>>

/**
 * 删除 API 方法类型
 */
export type DeleteApiMethod<R = any> = (id: string | number) => Promise<ApiResponse<R>>

/**
 * 批量删除 API 方法类型
 */
export type BatchDeleteApiMethod<R = any> = (
  ids: Array<string | number>
) => Promise<ApiResponse<R>>

/**
 * 批量操作 API 方法类型
 */
export type BatchApiMethod<P = any, T = any> = (
  data: P
) => Promise<ApiResponse<BatchResult<T>>>

/**
 * 上传 API 方法类型
 */
export type UploadApiMethod<R = any> = (file: File) => Promise<ApiResponse<R>>

/**
 * 下载 API 方法类型
 */
export type DownloadApiMethod = (params?: any) => Promise<void>

/**
 * 导出 API 方法类型
 */
export type ExportApiMethod<P = any> = (params: P) => Promise<void>

/**
 * 导入 API 方法类型
 */
export type ImportApiMethod<R = any> = (file: File) => Promise<ApiResponse<R>>

/**
 * API 服务类接口
 */
export interface ApiService {
  [key: string]: ApiMethod | any
}

/**
 * CRUD API 服务接口
 * @example
 * const userApi: CrudApiService<User, UserQueryParams, CreateUserDto, UpdateUserDto> = {
 *   getList: (params) => request.get('/users', { params }),
 *   getDetail: (id) => request.get(`/users/${id}`),
 *   create: (data) => request.post('/users', data),
 *   update: (data) => request.put(`/users/${data.id}`, data),
 *   delete: (id) => request.delete(`/users/${id}`),
 *   batchDelete: (ids) => request.post('/users/batch-delete', { ids })
 * }
 */
export interface CrudApiService<
  Entity = any,
  QParams extends QueryParams = QueryParams,
  CreateParams = any,
  UpdateParams = any,
> {
  /** 查询列表 */
  getList: QueryApiMethod<QParams, Entity>
  /** 获取详情 */
  getDetail: DetailApiMethod<Entity>
  /** 创建 */
  create: CreateApiMethod<CreateParams, Entity>
  /** 更新 */
  update: UpdateApiMethod<UpdateParams, Entity>
  /** 删除 */
  delete: DeleteApiMethod
  /** 批量删除 */
  batchDelete?: BatchDeleteApiMethod
}

/**
 * 只读 API 服务接口
 */
export interface ReadonlyApiService<Entity = any, QParams extends QueryParams = QueryParams> {
  /** 查询列表 */
  getList: QueryApiMethod<QParams, Entity>
  /** 获取详情 */
  getDetail: DetailApiMethod<Entity>
}

/**
 * 树形 API 服务接口
 */
export interface TreeApiService<Entity = any, QParams = any> {
  /** 获取树形数据 */
  getTree: (params?: QParams) => Promise<ApiResponse<Entity[]>>
  /** 获取详情 */
  getDetail: DetailApiMethod<Entity>
  /** 创建 */
  create: CreateApiMethod<any, Entity>
  /** 更新 */
  update: UpdateApiMethod<any, Entity>
  /** 删除 */
  delete: DeleteApiMethod
}

/**
 * API 请求配置生成器
 */
export type ApiConfigBuilder<P = any> = (params: P) => {
  url: string
  method: string
  data?: any
  params?: any
}

/**
 * API 响应转换器
 */
export type ApiResponseTransformer<T = any, R = any> = (data: T) => R

/**
 * API 错误处理器
 */
export type ApiErrorHandler = (error: any) => void | Promise<void>

/**
 * API 拦截器
 */
export interface ApiInterceptor<T = any> {
  /** 请求前拦截 */
  onRequest?: (config: any) => any | Promise<any>
  /** 响应后拦截 */
  onResponse?: (response: T) => T | Promise<T>
  /** 错误拦截 */
  onError?: ApiErrorHandler
}

/**
 * 创建 API 方法的选项
 */
export interface CreateApiMethodOptions<P = any, R = any> {
  /** 请求 URL */
  url: string | ((params: P) => string)
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** 响应转换器 */
  transformer?: ApiResponseTransformer<any, R>
  /** 错误处理器 */
  errorHandler?: ApiErrorHandler
  /** 是否显示加载 */
  showLoading?: boolean
  /** 是否显示错误 */
  showError?: boolean
  /** 是否显示成功 */
  showSuccess?: boolean
  /** 成功消息 */
  successMessage?: string
}

/**
 * API 方法工厂
 */
export type ApiMethodFactory = <P = any, R = any>(
  options: CreateApiMethodOptions<P, R>
) => ApiMethod<P, R>

/**
 * 批量创建 API 方法的配置
 */
export type ApiMethodsConfig = Record<string, CreateApiMethodOptions>

/**
 * 批量创建的 API 方法集合
 */
export type ApiMethods<T extends ApiMethodsConfig> = {
  [K in keyof T]: ApiMethod<any, any>
}

/**
 * API 模块定义
 */
export interface ApiModule {
  /** 模块名称 */
  name: string
  /** 基础路径 */
  basePath: string
  /** API 方法 */
  methods: ApiService
}

/**
 * API 注册表
 */
export type ApiRegistry = Record<string, ApiModule>

/**
 * 类型安全的 API 调用包装器
 */
export type SafeApiCall<T> = () => Promise<T>

/**
 * 带重试的 API 调用
 */
export interface RetryableApiCall<T> {
  /** 执行调用 */
  execute: () => Promise<T>
  /** 重试次数 */
  retries?: number
  /** 重试延迟（毫秒） */
  retryDelay?: number
}

/**
 * 可取消的 API 调用
 */
export interface CancellableApiCall<T> {
  /** 执行调用 */
  execute: () => Promise<T>
  /** 取消调用 */
  cancel: () => void
  /** 是否已取消 */
  isCancelled: () => boolean
}

/**
 * API 调用状态
 * @example
 * const state: ApiCallState<User> = {
 *   loading: false,
 *   data: null,
 *   error: null,
 *   success: false
 * }
 */
export interface ApiCallState<T = any> {
  /** 是否加载中 */
  loading: boolean
  /** 数据 */
  data: T | null
  /** 错误 */
  error: Error | null
  /** 是否成功 */
  success: boolean
}

/**
 * API 调用钩子返回值
 * @example
 * const { loading, data, error, execute, reset } = useApi<User>()
 *
 * // 执行请求
 * await execute(userId)
 *
 * // 重置状态
 * reset()
 */
export interface UseApiReturn<T = any> extends ApiCallState<T> {
  /** 执行调用 */
  execute: (...args: any[]) => Promise<T>
  /** 重置状态 */
  reset: () => void
  /** 刷新 */
  refresh: () => Promise<T>
}
