# HTTP 模块使用指南

基于 HttpClient 的 HTTP 请求模块，推荐使用简单的函数封装方式。

## 📦 模块结构

```
src/lib/http/
├── core/
│   ├── HttpClient.ts          # HTTP 客户端
│   ├── ErrorHandler.ts        # 错误处理
│   └── InterceptorManager.ts  # 拦截器管理
├── utils/                      # 工具函数
└── clients/                    # 客户端实例
```

## 🚀 快速开始

### 1. 使用默认客户端

```typescript
import { apiClient } from '~/lib/http'

// GET 请求
const response = await apiClient.get<User>('/api/users/1')

// POST 请求
const response = await apiClient.post<User>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
```

### 2. 创建 API 服务（推荐）

```typescript
import { apiClient } from '~/lib/http'
import type { QueryParams } from '~/types/http'

// 定义查询参数类型
type UserQuery = QueryParams<{
  username?: string
  email?: string
  roleId?: number
}>

// 定义 API
export const userApi = {
  // 登录
  login: (params: { username: string; password: string }) =>
    apiClient.post('/auth/login', params, {
      showSuccess: true,
      successMessage: '登录成功',
    }),

  // 获取用户列表
  getUserList: (params: UserQuery) =>
    apiClient.post('/user/list', params),

  // 获取用户详情
  getUserDetail: (id: number) =>
    apiClient.get(`/user/${id}`),

  // 创建用户
  createUser: (params: CreateUserDto) =>
    apiClient.post('/user/create', params, {
      showSuccess: true,
      successMessage: '创建成功',
    }),

  // 更新用户
  updateUser: (params: UpdateUserDto) =>
    apiClient.post('/user/update', params, {
      showSuccess: true,
      successMessage: '更新成功',
    }),

  // 删除用户
  deleteUser: (id: number) =>
    apiClient.post('/user/delete', { id }, {
      showSuccess: true,
      successMessage: '删除成功',
    }),

  // 重置密码
  resetPassword: (id: number, password: string) =>
    apiClient.post(`/user/${id}/reset`, { password }, {
      showSuccess: true,
      successMessage: '密码重置成功',
    }),
}

// 使用
await userApi.login({ username: 'admin', password: '123456' })
await userApi.getUserList({ pageNum: 1, pageSize: 10, username: 'admin' })
await userApi.getUserDetail(1)
```

## 🎯 核心功能

### HTTP 方法

```typescript
import { apiClient } from '~/lib/http'

// GET
await apiClient.get('/api/users', { pageNum: 1, pageSize: 10 })

// POST
await apiClient.post('/api/users', { name: 'John' })

// PUT
await apiClient.put('/api/users/1', { name: 'Jane' })

// DELETE
await apiClient.delete('/api/users/1')

// PATCH
await apiClient.patch('/api/users/1', { status: 1 })
```

### 请求配置

```typescript
// 单个请求配置
await apiClient.post('/api/users', data, {
  showSuccess: true,
  successMessage: '创建成功',
  showLoading: false,
  showError: true,
  requireAuth: true,
  timeout: 30000,
})
```

### 文件上传

```typescript
import { uploadClient } from '~/lib/http'

const file = document.querySelector('input[type="file"]').files[0]

await uploadClient.upload('/api/upload', file, {
  onProgress: (progress, loaded, total) => {
    console.log(`上传进度: ${progress}%`)
  }
})
```

### 文件下载

```typescript
await apiClient.download('/api/export', { type: 'excel' }, {
  filename: 'users.xlsx',
  onProgress: (progress, loaded, total) => {
    console.log(`下载进度: ${progress}%`)
  }
})
```

## 🎨 实际项目示例

### 用户管理模块

```typescript
import { apiClient } from '~/lib/http'
import type { QueryParams } from '~/types/http'

// 定义类型
interface User {
  id: number
  username: string
  email: string
  roleId: number
}

type UserQuery = QueryParams<{
  username?: string
  email?: string
  roleId?: number
}>

interface CreateUserDto {
  username: string
  email: string
  password: string
  roleId: number
}

interface UpdateUserDto {
  id: number
  username?: string
  email?: string
  roleId?: number
}

// 定义 API
export const userApi = {
  login: (params: { username: string; password: string }) =>
    apiClient.post('/auth/login', params, {
      showSuccess: true,
      successMessage: '登录成功',
    }),

  logout: () =>
    apiClient.post('/auth/logout'),

  getUserList: (params: UserQuery) =>
    apiClient.post<PageResult<User>>('/user/list', params),

  getUserDetail: (id: number) =>
    apiClient.get<User>(`/user/${id}`),

  createUser: (params: CreateUserDto) =>
    apiClient.post<User>('/user/create', params, {
      showSuccess: true,
      successMessage: '创建成功',
    }),

  updateUser: (params: UpdateUserDto) =>
    apiClient.post<User>('/user/update', params, {
      showSuccess: true,
      successMessage: '更新成功',
    }),

  deleteUser: (id: number) =>
    apiClient.post('/user/delete', { id }, {
      showSuccess: true,
      successMessage: '删除成功',
    }),

  batchDelete: (ids: number[]) =>
    apiClient.post('/user/batch-delete', { ids }, {
      showSuccess: true,
      successMessage: '批量删除成功',
    }),

  resetPassword: (id: number, password: string) =>
    apiClient.post(`/user/${id}/reset`, { password }, {
      showSuccess: true,
      successMessage: '密码重置成功',
    }),

  changeStatus: (id: number, status: number) =>
    apiClient.post('/user/status', { id, status }),

  exportUsers: (params: UserQuery) =>
    apiClient.download('/user/export', params, {
      filename: 'users.xlsx',
    }),
}
```

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { userApi } from '~/services/user'
import { useQuery, useMutation } from '@tanstack/vue-query'

// 查询用户列表
const { data: users, isLoading } = useQuery({
  queryKey: ['users', { pageNum: 1, pageSize: 10 }],
  queryFn: () => userApi.getUserList({ pageNum: 1, pageSize: 10 })
})

// 创建用户
const { mutate: createUser } = useMutation({
  mutationFn: userApi.createUser,
  onSuccess: () => {
    console.log('创建成功')
  }
})

// 删除用户
const { mutate: deleteUser } = useMutation({
  mutationFn: userApi.deleteUser,
  onSuccess: () => {
    console.log('删除成功')
  }
})

function handleCreate() {
  createUser({
    username: 'john',
    email: 'john@example.com',
    password: '123456',
    roleId: 1,
  })
}

function handleDelete(id: number) {
  deleteUser(id)
}
</script>
```

## 🔧 高级配置

### 全局配置

```typescript
import { HttpClientManager } from '~/lib/http'

const client = HttpClientManager.createClient('custom', {
  baseURL: '/api',
  timeout: 15000,
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
  onTokenExpired: () => {
    // 跳转到登录页
    window.location.href = '/login'
  },
  onRequest: async (config) => {
    // 请求拦截
    return config
  },
  onResponse: (response) => {
    // 响应拦截
    return response
  },
})
```

## 📚 相关文档

- [类型系统文档](../../types/http/README.md) - QueryParams 泛型使用
- [类型守卫文档](../../types/guards/README.md)

## ✨ 优势

- ✅ **简单直观** - 零学习成本，直接使用函数
- ✅ **完全灵活** - 想怎么写就怎么写
- ✅ **类型安全** - 完整的 TypeScript 类型推导
- ✅ **易于调试** - 代码清晰，问题一目了然
- ✅ **易于维护** - 统一的代码风格
