# API 模块索引

## 📖 文档导航

| 文档 | 说明 | 适合人群 |
|------|------|----------|
| [QUICK_START.md](./QUICK_START.md) | 5分钟快速上手 | 新手 |
| [README.md](./README.md) | 完整使用文档 | 所有人 |
| [CHANGELOG.md](./CHANGELOG.md) | 更新日志 | 维护者 |
| [SUMMARY.md](./SUMMARY.md) | 功能总结 | 决策者 |

## 📁 目录结构

### 核心模块 (core/)
| 文件 | 说明 |
|------|------|
| `HttpClient.ts` | HTTP客户端核心类 |
| `HttpClientManager.ts` | 客户端管理器 |
| `ErrorHandler.ts` | 错误处理器 |
| `InterceptorManager.ts` | 拦截器管理器 |
| `RequestCache.ts` | 请求缓存 |
| `RequestRetry.ts` | 请求重试 |
| `RequestQueue.ts` | 请求队列 |
| `types.ts` | 类型定义 |

### 插件系统 (plugins/)
| 文件 | 说明 |
|------|------|
| `logger.ts` | 请求日志插件 |
| `mock.ts` | Mock数据插件 |

### 工具函数 (utils/)
| 文件 | 说明 |
|------|------|
| `helpers.ts` | 实用工具函数集 |

### 使用示例 (examples/)
| 文件 | 说明 |
|------|------|
| `basic-usage.ts` | 基础用法示例 |
| `advanced-usage.ts` | 高级功能示例 |
| `service-pattern.ts` | 服务模式示例 |

### 客户端实例 (clients/)
| 文件 | 说明 |
|------|------|
| `index.ts` | 预配置的客户端实例 |

### 服务模块 (services/)
| 文件 | 说明 |
|------|------|
| `user.service.ts` | 用户服务API |
| `file.service.ts` | 文件服务API |

## 🚀 快速开始

### 1. 基础使用
```typescript
import { mainClient } from '@/api/clients'

// GET请求
const response = await mainClient.get('/users')
```

### 2. 创建服务（推荐）
```typescript
// src/api/services/product.service.ts
import { mainClient } from '../clients'

export class ProductService {
  static getList() {
    return mainClient.get('/products')
  }
}
```

### 3. 在组件中使用
```typescript
import { ProductService } from '@/api/services/product.service'

const response = await ProductService.getList()
```

## 🎯 常见场景

### 场景1: 需要显示成功提示
```typescript
await mainClient.post('/users', data, {
  showSuccess: true,
  successMessage: '创建成功',
})
```
📖 详见: [README.md - 基础使用](./README.md#基础使用)

### 场景2: 文件上传
```typescript
await fileClient.upload('/upload', file, {
  onProgress: (progress) => console.log(progress),
})
```
📖 详见: [README.md - 文件上传](./README.md#5-文件上传)

### 场景3: 请求缓存
```typescript
await client.get('/data', undefined, {
  useCache: true,
  cacheTTL: 60000,
})
```
📖 详见: [README.md - 请求缓存](./README.md#2-请求缓存)

### 场景4: 请求重试
```typescript
const client = HttpClientManager.createClient('retry', {
  retry: { retries: 3 },
})
```
📖 详见: [README.md - 请求重试](./README.md#1-请求重试)

### 场景5: Mock数据
```typescript
import { MockPlugin } from '@/api/plugins/mock'

const mockPlugin = new MockPlugin({
  rules: [{ url: '/users', response: { data: [] } }],
})
```
📖 详见: [examples/advanced-usage.ts](./examples/advanced-usage.ts)

## 🔧 配置指南

### 环境变量配置
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
```
📖 详见: [README.md - 环境配置](./README.md#环境配置)

### 客户端配置
编辑 `src/api/clients/index.ts`
```typescript
export const mainClient = HttpClientManager.createClient('main', {
  baseURL: '/api',
  timeout: 15000,
  // ... 更多配置
})
```
📖 详见: [clients/index.ts](./clients/index.ts)

### Token配置
```typescript
getToken: () => localStorage.getItem('token'),
onTokenExpired: () => {
  window.location.href = '/login'
},
```
📖 详见: [README.md - Token管理](./README.md#token管理)

## 🎓 学习路径

### 初级 (1-2天)
1. 阅读 [QUICK_START.md](./QUICK_START.md)
2. 查看 [examples/basic-usage.ts](./examples/basic-usage.ts)
3. 尝试创建简单的服务类

### 中级 (3-5天)
1. 阅读 [README.md](./README.md) 完整文档
2. 查看 [examples/service-pattern.ts](./examples/service-pattern.ts)
3. 学习错误处理和文件上传

### 高级 (1周)
1. 查看 [examples/advanced-usage.ts](./examples/advanced-usage.ts)
2. 学习缓存、重试、队列等高级功能
3. 了解插件系统和自定义拦截器

## 🐛 问题排查

### 问题1: 请求401错误
- 检查Token是否正确
- 检查 `getToken` 函数
- 查看 [README.md - Token管理](./README.md#token管理)

### 问题2: 请求超时
- 检查网络连接
- 增加 `timeout` 配置
- 查看 [README.md - 请求超时](./README.md#请求超时处理)

### 问题3: 类型错误
- 检查泛型参数
- 查看 [core/types.ts](./core/types.ts)
- 参考示例代码

## 📞 获取帮助

1. 查看文档: [README.md](./README.md)
2. 查看示例: [examples/](./examples/)
3. 查看类型定义: [core/types.ts](./core/types.ts)

## 🎉 最佳实践

1. ✅ 使用服务类组织API
2. ✅ 使用TypeScript类型定义
3. ✅ 合理配置缓存时间
4. ✅ 根据业务配置重试策略
5. ✅ 开发环境启用日志
6. ✅ 生产环境禁用Mock

📖 详见: [SUMMARY.md](./SUMMARY.md)
