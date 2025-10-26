/**
 * CRUD 通用服务基类
 * 提供标准的增删改查操作
 */
import type { PageData, PageParams } from '../../lib/http/types'
import { apiClient } from '../../lib/http/clients'

/**
 * CRUD 服务配置
 */
export interface CrudServiceConfig {
  /** 资源路径 */
  resource: string
  /** 是否显示操作成功提示 */
  showSuccess?: boolean
}

/**
 * CRUD 服务基类
 */
export class CrudService<T = any, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  protected resource: string
  protected showSuccess: boolean

  constructor(config: CrudServiceConfig) {
    this.resource = config.resource
    this.showSuccess = config.showSuccess !== false
  }

  /**
   * 获取列表（分页）
   */
  async getList(params?: Partial<PageParams> & Record<string, any>): Promise<PageData<T>> {
    const { data } = await apiClient.get<PageData<T>>(this.resource, params)
    return data
  }

  /**
   * 获取所有数据（不分页）
   */
  async getAll(params?: Record<string, any>): Promise<T[]> {
    const { data } = await apiClient.get<T[]>(`${this.resource}/all`, params)
    return data
  }

  /**
   * 根据 ID 获取详情
   */
  async getById(id: number | string): Promise<T> {
    const { data } = await apiClient.get<T>(`${this.resource}/${id}`)
    return data
  }

  /**
   * 创建
   */
  async create(dto: CreateDTO): Promise<T> {
    const { data } = await apiClient.post<T>(this.resource, dto, {
      showSuccess: this.showSuccess,
      successMessage: '创建成功',
    })
    return data
  }

  /**
   * 更新
   */
  async update(id: number | string, dto: UpdateDTO): Promise<T> {
    const { data } = await apiClient.put<T>(`${this.resource}/${id}`, dto, {
      showSuccess: this.showSuccess,
      successMessage: '更新成功',
    })
    return data
  }

  /**
   * 删除
   */
  async delete(id: number | string): Promise<void> {
    await apiClient.delete(`${this.resource}/${id}`, {}, {
      showSuccess: this.showSuccess,
      successMessage: '删除成功',
    })
  }

  /**
   * 批量删除
   */
  async batchDelete(ids: Array<number | string>): Promise<void> {
    await apiClient.post(`${this.resource}/batch-delete`, { ids }, {
      showSuccess: this.showSuccess,
      successMessage: '批量删除成功',
    })
  }

  /**
   * 批量创建
   */
  async batchCreate(dtos: CreateDTO[]): Promise<T[]> {
    const { data } = await apiClient.post<T[]>(`${this.resource}/batch`, dtos, {
      showSuccess: this.showSuccess,
      successMessage: '批量创建成功',
    })
    return data
  }

  /**
   * 批量更新
   */
  async batchUpdate(items: Array<{ id: number | string } & UpdateDTO>): Promise<T[]> {
    const { data } = await apiClient.put<T[]>(`${this.resource}/batch`, items, {
      showSuccess: this.showSuccess,
      successMessage: '批量更新成功',
    })
    return data
  }

  /**
   * 导出数据
   */
  async export(params?: Record<string, any>, filename?: string): Promise<void> {
    await apiClient.download(
      `${this.resource}/export`,
      params,
      {
        filename: filename || `${this.resource}-${Date.now()}.xlsx`,
      },
    )
  }

  /**
   * 导入数据
   */
  async import(file: File): Promise<{ success: number, failed: number }> {
    const { data } = await apiClient.upload<{ success: number, failed: number }>(
      `${this.resource}/import`,
      file,
      {
        showSuccess: this.showSuccess,
        successMessage: '导入成功',
      },
    )
    return data
  }
}

/**
 * 使用示例
 *
 * // 1. 定义数据类型
 * interface Article {
 *   id: number
 *   title: string
 *   content: string
 *   author: string
 *   status: number
 *   createTime: string
 * }
 *
 * // 2. 创建服务实例
 * export const articleService = new CrudService<Article>({
 *   resource: '/articles',
 *   showSuccess: true,
 * })
 *
 * // 3. 使用服务
 * // 获取列表
 * const list = await articleService.getList({ page: 1, pageSize: 10 })
 *
 * // 获取详情
 * const article = await articleService.getById(1)
 *
 * // 创建
 * const newArticle = await articleService.create({
 *   title: '标题',
 *   content: '内容',
 *   author: '作者',
 * })
 *
 * // 更新
 * await articleService.update(1, { title: '新标题' })
 *
 * // 删除
 * await articleService.delete(1)
 *
 * // 批量删除
 * await articleService.batchDelete([1, 2, 3])
 *
 * // 导出
 * await articleService.export({ status: 1 }, 'articles.xlsx')
 */
