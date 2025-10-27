/**
 * API 服务基类
 * 提供类型安全的 CRUD 操作
 */

import type { HttpClient } from './HttpClient'
import type {
  ApiResponse,
  CursorPageParams,
  CursorPageResult,
  ID,
  PageParams,
  PageResult,
  QueryParams,
} from '~/types/http'

/**
 * CRUD API 服务基类
 * @example
 * class UserService extends BaseApiService<User, UserQuery, CreateUserDto, UpdateUserDto> {
 *   constructor(client: HttpClient) {
 *     super(client, '/api/users')
 *   }
 * }
 */
export abstract class BaseApiService<
  Entity = any,
  QParams extends QueryParams = QueryParams,
  CreateDto = Partial<Entity>,
  UpdateDto = Partial<Entity>,
> {
  protected client: HttpClient
  protected baseUrl: string

  constructor(client: HttpClient, baseUrl: string) {
    this.client = client
    this.baseUrl = baseUrl
  }

  /**
   * 获取列表（分页）
   * @example
   * const response = await service.getList({ pageNum: 1, pageSize: 10 })
   */
  async getList(params: PageParams & QParams): Promise<ApiResponse<PageResult<Entity>>> {
    return this.client.get<PageResult<Entity>>(this.baseUrl, params)
  }

  /**
   * 获取列表（游标分页）
   * @example
   * const response = await service.getCursorList({ cursor: 'abc', pageSize: 20 })
   */
  async getCursorList(
    params: CursorPageParams & QParams,
  ): Promise<ApiResponse<CursorPageResult<Entity>>> {
    return this.client.get<CursorPageResult<Entity>>(`${this.baseUrl}/cursor`, params)
  }

  /**
   * 获取所有数据（不分页）
   * @example
   * const response = await service.getAll({ status: 1 })
   */
  async getAll(params?: QParams): Promise<ApiResponse<Entity[]>> {
    return this.client.get<Entity[]>(`${this.baseUrl}/all`, params)
  }

  /**
   * 根据 ID 获取详情
   * @example
   * const response = await service.getById(1)
   */
  async getById(id: ID): Promise<ApiResponse<Entity>> {
    return this.client.get<Entity>(`${this.baseUrl}/${id}`)
  }

  /**
   * 创建
   * @example
   * const response = await service.create({ name: 'John' })
   */
  async create(data: CreateDto): Promise<ApiResponse<Entity>> {
    return this.client.post<Entity>(this.baseUrl, data, {
      showSuccess: true,
      successMessage: '创建成功',
    })
  }

  /**
   * 更新
   * @example
   * const response = await service.update(1, { name: 'Jane' })
   */
  async update(id: ID, data: UpdateDto): Promise<ApiResponse<Entity>> {
    return this.client.put<Entity>(`${this.baseUrl}/${id}`, data, {
      showSuccess: true,
      successMessage: '更新成功',
    })
  }

  /**
   * 删除
   * @example
   * const response = await service.delete(1)
   */
  async delete(id: ID): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`, undefined, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }

  /**
   * 批量删除
   * @example
   * const response = await service.batchDelete([1, 2, 3])
   */
  async batchDelete(ids: ID[]): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.baseUrl}/batch-delete`, { ids }, {
      showSuccess: true,
      successMessage: '批量删除成功',
    })
  }

  /**
   * 批量更新状态
   * @example
   * const response = await service.batchUpdateStatus([1, 2], 1)
   */
  async batchUpdateStatus(ids: ID[], status: number): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.baseUrl}/batch-status`, { ids, status }, {
      showSuccess: true,
      successMessage: '状态更新成功',
    })
  }

  /**
   * 导出数据
   * @example
   * await service.export({ status: 1 })
   */
  async export(params?: QParams): Promise<void> {
    return this.client.download(`${this.baseUrl}/export`, params, {
      filename: `${this.baseUrl.split('/').pop()}_${Date.now()}.xlsx`,
    })
  }

  /**
   * 导入数据
   * @example
   * const response = await service.import(file)
   */
  async import(file: File): Promise<ApiResponse<any>> {
    return this.client.upload(`${this.baseUrl}/import`, file, {
      showSuccess: true,
      successMessage: '导入成功',
    })
  }
}

/**
 * 只读 API 服务基类
 * @example
 * class LogService extends ReadonlyApiService<Log, LogQuery> {
 *   constructor(client: HttpClient) {
 *     super(client, '/api/logs')
 *   }
 * }
 */
export abstract class ReadonlyApiService<
  Entity = any,
  QParams extends QueryParams = QueryParams,
> {
  protected client: HttpClient
  protected baseUrl: string

  constructor(client: HttpClient, baseUrl: string) {
    this.client = client
    this.baseUrl = baseUrl
  }

  /**
   * 获取列表（分页）
   */
  async getList(params: PageParams & QParams): Promise<ApiResponse<PageResult<Entity>>> {
    return this.client.get<PageResult<Entity>>(this.baseUrl, params)
  }

  /**
   * 获取所有数据（不分页）
   */
  async getAll(params?: QParams): Promise<ApiResponse<Entity[]>> {
    return this.client.get<Entity[]>(`${this.baseUrl}/all`, params)
  }

  /**
   * 根据 ID 获取详情
   */
  async getById(id: ID): Promise<ApiResponse<Entity>> {
    return this.client.get<Entity>(`${this.baseUrl}/${id}`)
  }

  /**
   * 导出数据
   */
  async export(params?: QParams): Promise<void> {
    return this.client.download(`${this.baseUrl}/export`, params, {
      filename: `${this.baseUrl.split('/').pop()}_${Date.now()}.xlsx`,
    })
  }
}

/**
 * 树形 API 服务基类
 * @example
 * class MenuService extends TreeApiService<Menu, MenuQuery, CreateMenuDto, UpdateMenuDto> {
 *   constructor(client: HttpClient) {
 *     super(client, '/api/menus')
 *   }
 * }
 */
export abstract class TreeApiService<
  Entity = any,
  QParams extends QueryParams = QueryParams,
  CreateDto = Partial<Entity>,
  UpdateDto = Partial<Entity>,
> extends BaseApiService<Entity, QParams, CreateDto, UpdateDto> {
  /**
   * 获取树形数据
   * @example
   * const response = await service.getTree()
   */
  async getTree(params?: QParams): Promise<ApiResponse<Entity[]>> {
    return this.client.get<Entity[]>(`${this.baseUrl}/tree`, params)
  }

  /**
   * 获取树形节点的子节点
   * @example
   * const response = await service.getChildren(1)
   */
  async getChildren(parentId: ID): Promise<ApiResponse<Entity[]>> {
    return this.client.get<Entity[]>(`${this.baseUrl}/${parentId}/children`)
  }

  /**
   * 移动节点
   * @example
   * const response = await service.move(1, 2)
   */
  async move(id: ID, targetParentId: ID): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.baseUrl}/${id}/move`, {
      targetParentId,
    }, {
      showSuccess: true,
      successMessage: '移动成功',
    })
  }
}
