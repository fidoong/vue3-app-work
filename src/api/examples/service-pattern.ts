/**
 * 服务模式示例
 * 推荐的API组织方式
 */
import type { ApiResponse, PageData, PageParams } from '../core'
import { mainClient } from '../clients'

/**
 * 产品接口
 */
export interface Product {
  id: number
  name: string
  price: number
  description?: string
  category: string
  stock: number
  images?: string[]
  createdAt: string
  updatedAt?: string
}

/**
 * 创建产品参数
 */
export interface CreateProductParams {
  name: string
  price: number
  description?: string
  category: string
  stock: number
  images?: string[]
}

/**
 * 更新产品参数
 */
export interface UpdateProductParams extends Partial<CreateProductParams> {}

/**
 * 产品查询参数
 */
export interface ProductQueryParams extends PageParams {
  keyword?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

/**
 * 产品服务类
 */
export class ProductService {
  /**
   * 获取产品列表
   */
  static getList(params: ProductQueryParams): Promise<ApiResponse<PageData<Product>>> {
    return mainClient.get<PageData<Product>>('/products', params, {
      useCache: true,
      cacheTTL: 60000, // 缓存1分钟
    })
  }

  /**
   * 获取产品详情
   */
  static getById(id: number): Promise<ApiResponse<Product>> {
    return mainClient.get<Product>(`/products/${id}`, undefined, {
      useCache: true,
      cacheTTL: 300000, // 缓存5分钟
    })
  }

  /**
   * 创建产品
   */
  static create(data: CreateProductParams): Promise<ApiResponse<Product>> {
    return mainClient.post<Product>('/products', data, {
      showSuccess: true,
      successMessage: '产品创建成功',
    })
  }

  /**
   * 更新产品
   */
  static update(id: number, data: UpdateProductParams): Promise<ApiResponse<Product>> {
    return mainClient.put<Product>(`/products/${id}`, data, {
      showSuccess: true,
      successMessage: '产品更新成功',
    })
  }

  /**
   * 删除产品
   */
  static delete(id: number): Promise<ApiResponse<void>> {
    return mainClient.delete<void>(`/products/${id}`, undefined, {
      showSuccess: true,
      successMessage: '产品删除成功',
    })
  }

  /**
   * 批量删除产品
   */
  static batchDelete(ids: number[]): Promise<ApiResponse<void>> {
    return mainClient.post<void>('/products/batch-delete', { ids }, {
      showSuccess: true,
      successMessage: `成功删除 ${ids.length} 个产品`,
    })
  }

  /**
   * 上传产品图片
   */
  static uploadImage(
    productId: number,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<{ url: string }>> {
    return mainClient.upload<{ url: string }>(
      `/products/${productId}/images`,
      file,
      {
        showLoading: true,
        onProgress,
      },
    )
  }

  /**
   * 导出产品数据
   */
  static export(params?: ProductQueryParams): Promise<void> {
    return mainClient.download('/products/export', params, {
      filename: `products_${Date.now()}.xlsx`,
    })
  }

  /**
   * 获取产品分类
   */
  static getCategories(): Promise<ApiResponse<string[]>> {
    return mainClient.get<string[]>('/products/categories', undefined, {
      useCache: true,
      cacheTTL: 600000, // 缓存10分钟
    })
  }

  /**
   * 搜索产品
   */
  static search(keyword: string): Promise<ApiResponse<Product[]>> {
    return mainClient.get<Product[]>('/products/search', { keyword }, {
      showLoading: false, // 搜索不显示loading
    })
  }
}

/**
 * 在组件中使用示例
 */
export async function useProductService() {
  // 获取产品列表
  const listResponse = await ProductService.getList({
    page: 1,
    pageSize: 10,
    category: 'electronics',
  })
  // Products: listResponse.data.list

  // 获取产品详情
  const detailResponse = await ProductService.getById(1)
  // Product detail: detailResponse.data

  // 创建产品
  const createResponse = await ProductService.create({
    name: 'New Product',
    price: 99.99,
    category: 'electronics',
    stock: 100,
  })
  // Created product: createResponse.data

  // 更新产品
  const updateResponse = await ProductService.update(1, {
    price: 89.99,
    stock: 90,
  })
  // Updated product: updateResponse.data

  // 删除产品
  await ProductService.delete(1)

  // 批量删除
  await ProductService.batchDelete([2, 3, 4])

  // 导出数据
  await ProductService.export({
    page: 1,
    pageSize: 10,
    category: 'electronics',
  })

  return {
    listResponse,
    detailResponse,
    createResponse,
    updateResponse,
  }
}
