# 核心库 (lib)

项目的核心库模块，包含 HTTP 客户端和 WebSocket 客户端的完整封装。

## 📁 目录结构

```
src/lib/
├── http/                       # HTTP 客户端模块
│   ├── core/                   # 核心功能
│   │   ├── HttpClient.ts       # HTTP 客户端类
│   │   ├── HttpClientManager.ts # 客户端管理器
│   │   ├── ErrorHandler.ts     # 错误处理器
│   │   ├── InterceptorManager.ts # 拦截器管理器
│   │   ├── RequestCache.ts     # 请求缓存
│   │   ├── RequestRetry.ts     # 请求重试
│   │   ├── RequestQueue.ts     # 请求队列
│   │   └── index.ts
│   ├── types/                  # 类型定义
│   │   └── index.ts
│   ├── clients/                # 客户端实例配置
│   │   └── index.ts            # apiClient, uploadClient
│   ├── plugins/                # 插件
│   │   └── logger.ts           # 日志插件
│   ├── utils/                  # 工具函数
│   │   └── helpers.ts
│   └── index.ts                # 统一导出
│
├── websocket/                  # WebSocket 客户端模块
│   ├── core/                   # 核心功能
│   │   ├── WebSocketClient.ts
│   │   ├── WebSocketManager.ts
│   │   └── index.ts
│   ├── types/                  # 类型定义
│   │   └── index.ts
│   ├── clients/                # 客户端实例配置
│   │   └── index.ts            # wsClient, notificationWs
│   ├── examples/               # 使用示例
│   │   ├── basic-usage.ts
│   │   ├── chat-room.ts
│   │   └── vue-usage.ts
│   ├── README.md
│   ├── QUICK_START.md
│   └── index.ts
│
├── index.ts                    # 统一导出
└── README.md                   # 本文档
```

## 🎯 设计理念

### 完整封装

lib 提供完整的客户端封装，包括：
- **核心功能**: 客户端类、管理器、错误处理等
- **类型定义**: 完整的 TypeScript 类型支持
- **客户端实例**: 预配置的客户端实例
- **插件系统**: 可扩展的插件机制
- **工具函数**: 常用的辅助函数

### 依赖关系

```
┌─────────────────────────────────────┐
│      业务层 (Pages/Components)       │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│         API 层 (src/api)             │
│  - services/  (业务接口服务)         │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│         核心库 (src/lib)             │
│  - http/clients/    (客户端实例)     │
│  - http/core/       (核心封装)       │
│  - websocket/clients/ (WS实例)      │
│  - websocket/core/  (WS核心)        │
└─────────────────────────────────────┘
```

## 📖 使用方式

### HTTP 客户端

```typescript
// 1. 直接使用预配置的客户端实例
import { apiClient, uploadClient } from '@/lib/http/clients'

// 发送请求
const response = await apiClient.get('/users')

// 文件上传
await uploadClient.upload('/upload', file)

// 2. 在 API 服务中使用
// src/api/services/user.services.ts
import { apiClient } from '@/lib/http/clients'
import type { PageData, PageParams } from '@/lib/http/types'

export class UserService {
  static getList(params: PageParams) {
    return apiClient.get<PageData>('/users', params)
  }
}
```

### WebSocket 客户端

```typescript
// 1. 直接使用预配置的客户端实例
import { wsClient } from '@/lib/websocket/clients'

wsClient.connect()
wsClient.on('onMessage', (event: MessageEvent) => {
  console.log(event.data)
})
wsClient.sendMessage('chat', { content: 'Hello' })

// 2. 使用 Vue Composable
import { useWebSocket } from '@/lib/websocket/examples/vue-usage'

const { isConnected, messages, sendMessage } = useWebSocket()
```

## ✨ 特性

### HTTP 客户端

- ✅ 基于 Axios 封装
- ✅ 多客户端实例管理
- ✅ 请求/响应拦截器
- ✅ 自动重试机制
- ✅ 请求缓存
- ✅ 请求队列
- ✅ 错误处理
- ✅ Token 管理
- ✅ 文件上传/下载
- ✅ TypeScript 类型支持

### WebSocket 客户端

- ✅ 原生 WebSocket 封装
- ✅ 自动重连
- ✅ 心跳检测
- ✅ 消息队列
- ✅ Token 认证
- ✅ 多实例管理
- ✅ 事件驱动
- ✅ TypeScript 类型支持

## 🔧 配置客户端

### 修改现有客户端

编辑 `lib/http/clients/index.ts`:

```typescript
export const apiClient = HttpClientManager.createClient('api', {
  baseURL: '/api',
  timeout: 30000,
  // 修改配置...
})
```

### 添加新客户端

在 `lib/http/clients/index.ts` 中添加:

```typescript
export const customClient = HttpClientManager.createClient('custom', {
  baseURL: '/custom-api',
  timeout: 15000,
  // 自定义配置...
})
```

## 📝 API 层使用

API 层只需要写业务服务，直接导入 lib 的客户端：

```typescript
// src/api/services/product.services.ts
import { apiClient } from '@/lib/http/clients'
import type { PageData, PageParams } from '@/lib/http/types'

export class ProductService {
  static getList(params: PageParams) {
    return apiClient.get<PageData>('/products', params)
  }

  static getDetail(id: string) {
    return apiClient.get(`/products/${id}`)
  }

  static create(data: any) {
    return apiClient.post('/products', data, {
      showSuccess: true,
      successMessage: '创建成功',
    })
  }
}
```

## 🚀 扩展

### 添加 HTTP 插件

在 `lib/http/plugins/` 目录下创建:

```typescript
// lib/http/plugins/custom-plugin.ts
export class CustomPlugin {
  // 插件实现
}
```

### 添加工具函数

在 `lib/http/utils/` 目录下添加:

```typescript
// lib/http/utils/custom-helper.ts
export function customHelper() {
  // 工具函数实现
}
```

## 📚 相关文档

- [HTTP 客户端详细文档](./http/README.md)
- [WebSocket 客户端文档](./websocket/README.md)
- [API 服务开发指南](../api/README.md)

## 💡 最佳实践

1. **客户端配置集中管理**: 所有客户端实例在 `lib/*/clients/` 中配置
2. **业务逻辑在 API 层**: `src/api/services/` 只写业务接口
3. **类型定义分离**: 核心类型在 `lib/*/types/`，业务类型在 `api/types/`
4. **保持 lib 通用性**: lib 不包含业务逻辑，可复用到其他项目
