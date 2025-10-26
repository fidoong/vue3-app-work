# API 服务层

业务接口服务层，只包含业务逻辑，客户端从 `lib/http` 导入。

## 📁 目录结构

```
src/api/
├── services/              # 业务接口服务
│   ├── user.services.ts   # 用户服务
│   ├── crud.services.ts   # CRUD 基类
│   ├── dict.services.ts   # 字典服务
│   ├── upload.services.ts # 上传服务
│   ├── common.services.ts # 公共服务
│   └── ...
└── index.ts               # 统一导出
```

## 🎯 职责

API 层只负责：
- ✅ 定义业务接口
- ✅ 封装业务逻辑
- ✅ 数据转换和处理
- ✅ 业务类型定义

客户端配置在 `lib/http/clients/` 中管理。

## 📖 使用方式

### 1. 创建服务

```typescript
// src/api/services/product.services.ts
import { apiClient } from '@/lib/http/clients'
import type { PageData, PageParams } from '@/lib/http/types'

/**
 * 产品数据
 */
export interface Product {
  id: string
  name: string
  price: number
}

/**
 * 产品服务
 */
export class ProductService {
  /**
   * 获取产品列表
   */
  static getList(params: PageParams) {
    return apiClient.get<PageData<Product>>('/products', params)
  }

  /**
   * 获取产品详情
   */
  static getDetail(id: string) {
    return apiClient.get<Product>(`/products/${id}`)
  }

  /**
   * 创建产品
   */
  static create(data: Partial<Product>) {
    return apiClient.post<Product>('/products', data, {
      showSuccess: true,
      successMessage: '创建成功',
    })
  }

  /**
   * 更新产品
   */
  static update(id: string, data: Partial<Product>) {
    return apiClient.put<Product>(`/products/${id}`, data, {
      showSuccess: true,
      successMessage: '更新成功',
    })
  }

  /**
   * 删除产品
   */
  static delete(id: string) {
    return apiClient.delete(`/products/${id}`, undefined, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }
}
```

### 2. 在组件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductService } from '@/api/services/product.services'

const products = ref([])
const loading = ref(false)

async function loadProducts() {
  loading.value = true
  try {
    const response = await ProductService.getList({
      page: 1,
      pageSize: 10,
    })
    products.value = response.data.list
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>
```

## 🔧 使用不同的客户端

```typescript
import { apiClient, uploadClient } from '@/lib/http/clients'

export class FileService {
  // 使用普通客户端
  static getList() {
    return apiClient.get('/files')
  }

  // 使用上传客户端（超时时间更长）
  static upload(file: File) {
    return uploadClient.upload('/upload', file, {
      onProgress: (progress) => {
        console.log(`上传进度: ${progress}%`)
      },
    })
  }
}
```

## 📝 服务开发规范

### 1. 命名规范

- 文件名: `*.services.ts`
- 类名: `XxxService`
- 方法名: 使用动词开头，如 `getList`, `create`, `update`

### 2. 类型定义

```typescript
// 业务数据类型
export interface User {
  id: string
  name: string
  email: string
}

// 请求参数类型
export interface UserQuery extends PageParams {
  keyword?: string
  status?: number
}

// 服务类
export class UserService {
  static getList(params: UserQuery) {
    return apiClient.get<PageData<User>>('/users', params)
  }
}
```

### 3. 错误处理

```typescript
export class UserService {
  static async getDetail(id: string) {
    try {
      const response = await apiClient.get<User>(`/users/${id}`)
      return response.data
    }
    catch (error) {
      // 特殊错误处理
      console.error('获取用户详情失败:', error)
      throw error
    }
  }
}
```

### 4. 使用缓存

```typescript
export class DictService {
  // 使用缓存，5分钟内不重复请求
  static getTypes() {
    return apiClient.get('/dict/types', undefined, {
      useCache: true,
      cacheTTL: 5 * 60 * 1000,
    })
  }

  // 清除缓存
  static clearCache() {
    apiClient.deleteCacheByUrl('/dict/types')
  }
}
```

## 🚀 高级用法

### 使用 CRUD 基类

```typescript
import { CRUDService } from './crud.services'

// 继承 CRUD 基类，自动获得增删改查方法
export class ProductService extends CRUDService<Product> {
  constructor() {
    super('/products')
  }

  // 添加自定义方法
  static async publish(id: string) {
    return apiClient.post(`/products/${id}/publish`, undefined, {
      showSuccess: true,
      successMessage: '发布成功',
    })
  }
}

// 使用
const products = await ProductService.getList({ page: 1, pageSize: 10 })
await ProductService.create({ name: 'New Product' })
await ProductService.publish('123')
```

### 批量操作

```typescript
export class UserService {
  static batchDelete(ids: string[]) {
    return apiClient.post('/users/batch-delete', { ids }, {
      showSuccess: true,
      successMessage: `已删除 ${ids.length} 个用户`,
    })
  }

  static batchUpdate(data: Array<{ id: string, status: number }>) {
    return apiClient.post('/users/batch-update', { data }, {
      showSuccess: true,
      successMessage: '批量更新成功',
    })
  }
}
```

## 📚 相关文档

- [核心库文档](../lib/README.md)
- [HTTP 客户端配置](../lib/http/clients/index.ts)
- [类型定义](../lib/http/types/index.ts)

## 💡 最佳实践

1. **一个服务类对应一个业务模块**
2. **使用 TypeScript 类型定义**
3. **合理使用缓存减少请求**
4. **统一的错误处理**
5. **清晰的方法命名**
6. **适当的注释说明**
