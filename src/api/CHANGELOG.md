# Axios 封装更新日志

## 新增功能

### 核心功能增强

1. **错误处理器 (ErrorHandler)**
   - 统一的错误分类和处理
   - 支持自定义错误处理逻辑
   - 自动识别网络错误、超时、业务错误等
   - 提供 ApiError 错误类

2. **拦截器管理器 (InterceptorManager)**
   - 动态添加/移除拦截器
   - 支持命名拦截器，便于管理
   - 可查询所有已注册的拦截器

3. **请求重试机制 (RequestRetry)**
   - 支持自定义重试次数
   - 指数退避延迟策略
   - 可自定义重试条件
   - 自动重试网络错误和5xx错误

4. **请求缓存 (RequestCache)**
   - GET请求自动缓存
   - 支持自定义缓存时间(TTL)
   - 可针对单个请求配置缓存
   - 提供缓存清理方法

5. **请求队列管理 (RequestQueue)**
   - 控制并发请求数量
   - 自动队列管理
   - 查询队列状态

6. **请求日志插件 (RequestLogger)**
   - 详细的请求/响应日志
   - 支持自定义日志函数
   - 记录请求耗时
   - 可选择性开启日志类型

7. **Mock数据插件 (MockPlugin)**
   - 支持URL模式匹配（字符串/正则）
   - 支持方法过滤
   - 可配置响应延迟
   - 支持动态响应函数

### 工具函数

新增 `utils/helpers.ts`，包含：
- URL查询参数处理
- 深度对象合并
- 文件大小格式化
- 文件类型/大小验证
- 防抖/节流函数
- 唯一ID生成
- 延迟函数

### 服务模式示例

- 完整的服务类示例 (ProductService)
- 标准的API组织方式
- 类型定义最佳实践

### 配置增强

HttpClientConfig 新增配置项：
- `retry`: 请求重试配置
- `cache`: 请求缓存配置
- `queue`: 请求队列配置
- `logger`: 日志配置

RequestConfig 新增配置项：
- `useCache`: 是否使用缓存
- `cacheTTL`: 缓存时间

## 文件结构

```
src/api/
├── core/                    # 核心模块
│   ├── HttpClient.ts       # HTTP客户端（增强）
│   ├── HttpClientManager.ts
│   ├── ErrorHandler.ts     # 新增：错误处理器
│   ├── InterceptorManager.ts # 新增：拦截器管理
│   ├── RequestCache.ts     # 新增：请求缓存
│   ├── RequestRetry.ts     # 新增：请求重试
│   ├── RequestQueue.ts     # 新增：请求队列
│   ├── types.ts            # 类型定义（增强）
│   └── index.ts
├── plugins/                 # 插件模块（新增）
│   ├── logger.ts           # 请求日志插件
│   └── mock.ts             # Mock数据插件
├── utils/                   # 工具函数（新增）
│   └── helpers.ts
├── examples/                # 使用示例（新增）
│   ├── basic-usage.ts      # 基础用法
│   ├── advanced-usage.ts   # 高级用法
│   └── service-pattern.ts  # 服务模式
├── clients/                 # 客户端实例
├── services/                # 服务模块
│   ├── user.service.ts
│   └── file.service.ts     # 完善
├── types/                   # 类型定义
├── index.ts                 # 统一导出（新增）
├── README.md                # 使用文档（更新）
└── CHANGELOG.md             # 更新日志（新增）
```

## 使用示例

### 基础用法

```typescript
import { mainClient } from '@/api/clients'

// GET请求
const response = await mainClient.get('/users')

// POST请求
const response = await mainClient.post('/users', data, {
  showSuccess: true,
  successMessage: '创建成功',
})
```

### 高级功能

```typescript
// 使用缓存
const response = await client.get('/data', undefined, {
  useCache: true,
  cacheTTL: 60000,
})

// 请求重试
const client = HttpClientManager.createClient('retry', {
  baseURL: '/api',
  retry: {
    retries: 3,
    retryDelay: 1000,
  },
})

// 动态拦截器
const interceptorManager = client.getInterceptorManager()
interceptorManager.addRequestInterceptor('custom', (config) => {
  // 自定义逻辑
  return config
})
```

## 兼容性

- 完全向后兼容现有代码
- 所有新功能都是可选的
- 默认配置保持不变

## 性能优化

- 请求缓存减少重复请求
- 请求队列控制并发
- 自动取消重复请求
- 指数退避重试策略

## 最佳实践

1. 使用服务类组织API
2. 合理配置缓存时间
3. 根据业务需求配置重试策略
4. 开发环境启用日志，生产环境关闭
5. 使用TypeScript类型定义
