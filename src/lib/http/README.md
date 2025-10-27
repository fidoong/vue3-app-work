# HTTP 模块使用指南

基于统一类型系统优化的 HTTP 客户端模块。

## 📦 模块结构

```
src/lib/http/
├── core/                    # 核心功能
│   ├── HttpClient.ts       # HTTP 客户端
│   ├── BaseApiService.ts   # API 服务基类
│   ├── ErrorHandler.ts     # 错误处理
│   └── InterceptorManager.ts # 拦截器管理
├── utils/                   # 工具函数
│   ├── typeHelpers.ts      # 类型工具
│   ├── requestBuilder.ts   # 请求构建器
│   └── helpers.ts          # 通用工具
└── clients/                 # 客户端实例
    └── index.ts            # 默认客户端
```

## 🚀 快速开始

### 1. 使用默认客户端

```typescript
import { request } from '~/lib/http'

// GET 请求
const response = await request.get<User>('/api/users/1')

// POST 请求
const response = await request.post<User>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
```

### 2. 创建 API 服务

```typescript
import { BaseApiService } from '~/lib/http'
import type { User, UserQuery, CreateUserDto, UpdateUserDto } from '~/types'

class UserService extends BaseApiService<User, UserQuery, CreateUserDto, UpdateUserDto> {
  constructor() {
    super(request, '/api/users')
  }

  // 自定义方法
  async resetPassword(id: ID, newPassword: string) {
    return this.client.post(`${this.baseUrl}/${id}/reset-password`, {
      password: newPassword
    }, {
      showSuccess: true,
      successMessage: '密码重置成功'
    })
  }
}

// 使用
const userService = new UserService()
const users = await userService.getList({ pageNum: 1, pageSize: 10 })
const user = await userService.getById(1)
await userService.create({ name: 'John' })
await userService.update(1, { name: 'Jane' })
await userService.delete(1)
```

### 3. 使用请求构建器

```typescript
import { createRequest, RequestBuilder } from '~/lib/http'

// 链式调用
const config = createRequest()
  .url('/api/users')
  .method('GET')
  .params({ page: 1, size: 10 })
  .showLoading()
  .showSuccess('加载成功')
  .build()

const response = await request.request(config)
```

### 4. 使用类型工具

```typescript
import {
  extractData,
  extractPageList,
  isSuccessResponse,
  transformResponse
} from '~/lib/http'

// 提取数据
const response = await request.get<User>('/api/users/1')
const user = extractData(response)

// 提取分页列表
const pageResponse = await request.get<PageResult<User>>('/api/users')
const users = extractPageList(pageResponse.data)

// 判断响应状态
if (isSuccessResponse(response)) {
  console.log('请求成功', response.data)
}

// 转换响应数据
const transformed = transformResponse(response, user => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`
}))
```

## 📝 类型安全

### 完整的类型推导

```typescript
// 自动推导返回类型
const response = await request.get<User>('/api/users/1')
// response: ApiResponse<User>

const user = extractData(response)
// user: User

// 分页数据
const pageResponse = await request.get<PageResult<User>>('/api/users')
// pageResponse: ApiResponse<PageResult<User>>

const users = extractPageList(pageResponse.data)
// users: User[]
```

### 使用类型守卫

```typescript
import { isApiResponse, isSuccessResponse } from '~/types/guards'

if (isApiResponse(data)) {
  // TypeScript 知道 data 是 ApiResponse 类型
  console.log(data.code, data.message)
}

if (isSuccessResponse(response)) {
  // TypeScript 知道响应成功
  console.log(response.data)
}
```

## 🎯 高级用法

### 1. 只读服务

```typescript
import { ReadonlyApiService } from '~/lib/http'

class LogService extends ReadonlyApiService<Log, LogQuery> {
  constructor() {
    super(request, '/api/logs')
  }
}

const logService = new LogService()
const logs = await logService.getList({ pageNum: 1, pageSize: 20 })
```

### 2. 树形服务

```typescript
import { TreeApiService } from '~/lib/http'

class MenuService extends TreeApiService<Menu, MenuQuery, CreateMenuDto, UpdateMenuDto> {
  constructor() {
    super(request, '/api/menus')
  }
}

const menuService = new MenuService()
const tree = await menuService.getTree()
const children = await menuService.getChildren(1)
await menuService.move(1, 2)
```

### 3. 文件上传下载

```typescript
// 上传
const file = document.querySelector('input[type="file"]').files[0]
const response = await request.upload('/api/upload', file, {
  onProgress: (progress, loaded, total) => {
    console.log(`上传进度: ${progress}%`)
  }
})

// 下载
await request.download('/api/export', { type: 'excel' }, {
  filename: 'users.xlsx',
  onProgress: (progress, loaded, total) => {
    console.log(`下载进度: ${progress}%`)
  }
})
```

### 4. 请求配置

```typescript
// 全局配置
const client = new HttpClient({
  baseURL: '/api',
  timeout: 15000,
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
  onTokenExpired: () => {
    // 跳转到登录页
  }
})

// 单个请求配置
const response = await request.get('/api/users', params, {
  showLoading: false,
  showError: false,
  requireAuth: false,
  timeout: 30000
})
```

## 🔧 工具函数

### URL 构建

```typescript
import { buildUrl, buildPathUrl } from '~/lib/http'

// 查询参数
const url = buildUrl('/api/users', { page: 1, size: 10 })
// "/api/users?page=1&size=10"

// 路径参数
const url = buildPathUrl('/api/users/:id/posts/:postId', {
  id: 1,
  postId: 2
})
// "/api/users/1/posts/2"
```

### 响应处理

```typescript
import {
  createSuccessResponse,
  createErrorResponse,
  createPageResponse,
  safeExtractData
} from '~/lib/http'

// 创建响应
const success = createSuccessResponse({ id: 1, name: 'John' })
const error = createErrorResponse(400, '参数错误')
const page = createPageResponse(users, 100, 1, 10)

// 安全提取数据
const user = safeExtractData(response, defaultUser)
```

## 📊 最佳实践

### 1. 统一的服务层

```typescript
// services/user.service.ts
export class UserService extends BaseApiService<User, UserQuery, CreateUserDto, UpdateUserDto> {
  constructor() {
    super(request, '/api/users')
  }
}

// 导出单例
export const userService = new UserService()
```

### 2. 类型定义

```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
}

export interface UserQuery extends QueryParams {
  name?: string
  status?: number
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}
```

### 3. 错误处理

```typescript
try {
  const response = await userService.getById(1)
  const user = extractData(response)
  // 处理数据
} catch (error) {
  // 错误已经被全局处理
  // 这里只需要处理特殊逻辑
  console.error('获取用户失败', error)
}
```

## 🎨 与 TanStack Query 集成

```typescript
import { useQuery, useMutation } from '@tanstack/vue-query'
import { userService } from '~/services'

// 查询
const { data, isLoading } = useQuery({
  queryKey: ['users', params],
  queryFn: () => userService.getList(params)
})

// 变更
const { mutate } = useMutation({
  mutationFn: (data: CreateUserDto) => userService.create(data),
  onSuccess: () => {
    // 刷新列表
  }
})
```

## 📚 相关文档

- [类型系统文档](../../types/README.md)
- [类型守卫文档](../../types/guards/README.md)
- [API 工具类型](../../types/utils/api-helpers.ts)
