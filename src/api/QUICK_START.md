# 快速开始指南

## 5分钟上手

### 1. 基础使用

```typescript
import { mainClient } from '@/api/clients'

// GET 请求
const users = await mainClient.get('/users')

// POST 请求
const newUser = await mainClient.post('/users', {
  name: 'John',
  email: 'john@example.com',
})

// PUT 请求
const updated = await mainClient.put('/users/1', {
  name: 'John Doe',
})

// DELETE 请求
await mainClient.delete('/users/1')
```

### 2. 创建服务类（推荐）

```typescript
// src/api/services/product.service.ts
import { mainClient } from '../clients'
import type { ApiResponse } from '../core'

export interface Product {
  id: number
  name: string
  price: number
}

export class ProductService {
  static getList() {
    return mainClient.get<Product[]>('/products')
  }

  static getById(id: number) {
    return mainClient.get<Product>(`/products/${id}`)
  }

  static create(data: Partial<Product>) {
    return mainClient.post<Product>('/products', data, {
      showSuccess: true,
      successMessage: '创建成功',
    })
  }

  static update(id: number, data: Partial<Product>) {
    return mainClient.put<Product>(`/products/${id}`, data, {
      showSuccess: true,
    })
  }

  static delete(id: number) {
    return mainClient.delete(`/products/${id}`, undefined, {
      showSuccess: true,
    })
  }
}
```

### 3. 在组件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductService } from '@/api/services/product.service'

const products = ref([])
const loading = ref(false)

async function fetchProducts() {
  loading.value = true
  try {
    const response = await ProductService.getList()
    products.value = response.data
  }
  finally {
    loading.value = false
  }
}

async function deleteProduct(id: number) {
  await ProductService.delete(id)
  fetchProducts() // 刷新列表
}

onMounted(() => {
  fetchProducts()
})
</script>
```

### 4. 文件上传

```typescript
import { fileClient } from '@/api/clients'

async function uploadFile(file: File) {
  const response = await fileClient.upload('/upload', file, {
    onProgress: (progress) => {
      console.log(`上传进度: ${progress}%`)
    },
  })
  return response.data
}
```

### 5. 文件下载

```typescript
import { fileClient } from '@/api/clients'

async function downloadFile(id: string) {
  await fileClient.download(`/files/${id}`, undefined, {
    filename: 'document.pdf',
  })
}
```

## 常用配置

### 显示成功提示

```typescript
await mainClient.post('/users', data, {
  showSuccess: true,
  successMessage: '创建成功',
})
```

### 禁用加载提示

```typescript
await mainClient.get('/users', undefined, {
  showLoading: false,
})
```

### 禁用错误提示

```typescript
try {
  await mainClient.get('/users', undefined, {
    showError: false,
  })
}
catch (error) {
  // 自定义错误处理
}
```

### 不需要认证的请求

```typescript
await mainClient.post('/login', credentials, {
  requireAuth: false,
})
```

## 高级功能

### 使用缓存

```typescript
// 配置客户端启用缓存
const client = HttpClientManager.createClient('cached', {
  baseURL: '/api',
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5分钟
  },
})

// 使用缓存
await client.get('/data', undefined, {
  useCache: true,
})
```

### 请求重试

```typescript
const client = HttpClientManager.createClient('retry', {
  baseURL: '/api',
  retry: {
    retries: 3,
    retryDelay: 1000,
  },
})
```

### 请求日志

```typescript
const client = HttpClientManager.createClient('logger', {
  baseURL: '/api',
  logger: {
    enabled: true,
  },
})
```

## 环境配置

在 `.env` 文件中配置API地址：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USER_API_BASE_URL=http://localhost:3000/api/user
VITE_FILE_API_BASE_URL=http://localhost:3000/api/file

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_USER_API_BASE_URL=https://api.example.com/user
VITE_FILE_API_BASE_URL=https://api.example.com/file
```

## 常见问题

### Q: 如何修改Token获取方式？

A: 在 `src/api/clients/index.ts` 中修改 `getToken` 函数：

```typescript
export const mainClient = HttpClientManager.createClient('main', {
  baseURL: '/api',
  getToken: () => {
    // 从你的状态管理中获取token
    return useAuthStore().token
  },
})
```

### Q: 如何自定义错误处理？

A: 使用 `showError: false` 并自行处理：

```typescript
try {
  const response = await mainClient.get('/data', undefined, {
    showError: false,
  })
}
catch (error) {
  // 自定义错误处理
  console.error(error)
}
```

### Q: 如何取消请求？

A: 使用 AbortController：

```typescript
const controller = new AbortController()

const promise = mainClient.get('/data', undefined, {
  signal: controller.signal,
})

// 取消请求
controller.abort()
```

### Q: 如何批量请求？

A: 使用 Promise.all：

```typescript
const [users, products, orders] = await Promise.all([
  mainClient.get('/users'),
  mainClient.get('/products'),
  mainClient.get('/orders'),
])
```

## 下一步

- 查看 [README.md](./README.md) 了解完整功能
- 查看 [examples](./examples/) 目录了解更多示例
- 查看 [CHANGELOG.md](./CHANGELOG.md) 了解最新更新
