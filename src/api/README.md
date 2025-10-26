# Axios 二次封装使用文档

> 📚 **快速导航**: [快速开始](./QUICK_START.md) | [更新日志](./CHANGELOG.md) | [功能总结](./SUMMARY.md) | [索引](./INDEX.md)

## 功能特性

### 核心功能
- ✅ 统一的请求/响应拦截
- ✅ 自动 Token 管理
- ✅ 请求防重复（自动取消重复请求）
- ✅ 加载状态管理
- ✅ 统一错误处理
- ✅ 请求超时处理
- ✅ 文件上传/下载
- ✅ TypeScript 类型支持

### 高级功能
- ✅ 请求重试机制（支持指数退避）
- ✅ 请求缓存（支持自定义TTL）
- ✅ 请求队列管理（控制并发数）
- ✅ 拦截器动态管理
- ✅ 请求日志记录
- ✅ Mock数据支持
- ✅ 多实例管理
- ✅ 错误分类处理

## 基础使用

### 1. GET 请求

```typescript
import { get } from '@/api/request'

// 基础用法
const res = await get<User>('/user/info')

// 带参数
const res = await get<User[]>('/user/list', { page: 1, pageSize: 10 })

// 自定义配置
const res = await get<User>('/user/info', undefined, {
  showLoading: true,
  showError: false,
})
```

### 2. POST 请求

```typescript
import { post } from '@/api/request'

// 基础用法
const res = await post<LoginResponse>('/auth/login', {
  username: 'admin',
  password: '123456',
})

// 显示成功提示
const res = await post('/user/create', userData, {
  showSuccess: true,
  successMessage: '创建成功',
})
```

### 3. PUT 请求

```typescript
import { put } from '@/api/request'

const res = await put(`/user/${id}`, {
  name: 'New Name',
})
```

### 4. DELETE 请求

```typescript
import { del } from '@/api/request'

const res = await del(`/user/${id}`, undefined, {
  showSuccess: true,
  successMessage: '删除成功',
})
```

### 5. 文件上传

```typescript
import { upload } from '@/api/request'

// 上传单个文件
const file = event.target.files[0]
const res = await upload<{ url: string }>('/upload', file)

// 上传多个文件
const formData = new FormData()
formData.append('file1', file1)
formData.append('file2', file2)
const res = await upload('/upload/multiple', formData)
```

### 6. 文件下载

```typescript
import { download } from '@/api/request'

// 下载文件
await download('/export/users', { type: 'excel' }, 'users.xlsx')
```

## 配置选项

### RequestConfig

```typescript
interface RequestConfig {
  /** 是否显示加载提示 (默认: true) */
  showLoading?: boolean

  /** 是否显示错误提示 (默认: true) */
  showError?: boolean

  /** 是否显示成功提示 (默认: false) */
  showSuccess?: boolean

  /** 自定义成功提示消息 */
  successMessage?: string

  /** 是否需要认证 (默认: true) */
  requireAuth?: boolean

  /** 请求超时时间(ms) (默认: 15000) */
  timeout?: number
}
```

## API 模块化

推荐按业务模块组织 API：

```typescript
// src/api/modules/user.ts
import { get, post, put, del } from '../request'
import type { User, PageData, PageParams } from '../types/response'

export const userApi = {
  getList(params: PageParams) {
    return get<PageData<User>>('/user/list', params)
  },

  getById(id: number) {
    return get<User>(`/user/${id}`)
  },

  create(data: Partial<User>) {
    return post<User>('/user', data, {
      showSuccess: true,
      successMessage: '创建成功',
    })
  },

  update(id: number, data: Partial<User>) {
    return put<User>(`/user/${id}`, data, {
      showSuccess: true,
    })
  },

  delete(id: number) {
    return del(`/user/${id}`, undefined, {
      showSuccess: true,
    })
  },
}
```

## 在组件中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { userApi } from '@/api/modules/user'

const userList = ref([])
const loading = ref(false)

async function fetchUsers() {
  try {
    loading.value = true
    const res = await userApi.getList({ page: 1, pageSize: 10 })
    userList.value = res.data.list
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

async function deleteUser(id: number) {
  try {
    await userApi.delete(id)
    // 刷新列表
    fetchUsers()
  } catch (error) {
    console.error('删除失败:', error)
  }
}
</script>
```

## 环境配置

在 `.env` 文件中配置 API 地址：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 错误处理

封装已经处理了常见错误：

- 401: 自动跳转登录页
- 403: 显示无权限提示
- 404: 显示资源不存在
- 500: 显示服务器错误
- 网络错误: 显示网络连接失败
- 超时: 显示请求超时

如需自定义错误处理：

```typescript
try {
  const res = await get('/api/data', undefined, {
    showError: false, // 关闭自动错误提示
  })
} catch (error) {
  // 自定义错误处理
  console.error('请求失败:', error)
}
```

## 取消请求

```typescript
import { cancelAllRequests } from '@/api/request'

// 取消所有待处理的请求（例如在路由切换时）
cancelAllRequests()
```

## 高级功能

### 1. 请求重试

```typescript
const client = HttpClientManager.createClient('retry', {
  baseURL: '/api',
  retry: {
    retries: 3, // 重试次数
    retryDelay: 1000, // 重试延迟(ms)
    shouldRetry: (error) => {
      // 自定义重试条件
      return !error.response || error.response.status >= 500
    },
  },
})
```

### 2. 请求缓存

```typescript
const client = HttpClientManager.createClient('cache', {
  baseURL: '/api',
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 缓存5分钟
  },
})

// 使用缓存
await client.get('/data', undefined, {
  useCache: true,
  cacheTTL: 60000, // 自定义缓存时间
})

// 清空缓存
client.clearCache()
```

### 3. 请求日志

```typescript
const client = HttpClientManager.createClient('logger', {
  baseURL: '/api',
  logger: {
    enabled: true,
    logRequest: true,
    logResponse: true,
    logError: true,
  },
})
```

### 4. Mock数据

```typescript
import { MockPlugin } from '@/api/plugins/mock'

const mockPlugin = new MockPlugin({
  enabled: true,
  rules: [
    {
      url: '/users',
      method: 'GET',
      response: {
        code: 200,
        data: { list: [], total: 0 },
      },
      delay: 500,
    },
  ],
})

mockPlugin.setupMock(client.getAxiosInstance())
```

### 5. 动态拦截器

```typescript
const interceptorManager = client.getInterceptorManager()

// 添加拦截器
interceptorManager.addRequestInterceptor('custom', (config) => {
  config.headers['X-Custom'] = 'value'
  return config
})

// 移除拦截器
interceptorManager.removeInterceptor('custom')
```

### 6. 请求队列

```typescript
const client = HttpClientManager.createClient('queue', {
  baseURL: '/api',
  queue: {
    enabled: true,
    maxConcurrent: 6, // 最大并发数
  },
})
```

## 注意事项

1. Token 默认从 `localStorage.getItem('token')` 获取，可根据需要修改
2. 加载状态管理可以集成到全局 loading 组件
3. 重复请求会自动取消前一个请求
4. GET 请求会自动添加时间戳防止缓存
5. 请求重试使用指数退避策略
6. 缓存仅对GET请求生效
7. Mock数据在生产环境应该禁用
