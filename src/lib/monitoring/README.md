# 监控模块

集成 Sentry 错误追踪和 Web Vitals 性能监控的完整解决方案。

## 功能特性

### Sentry 错误追踪
- ✅ 自动捕获 JavaScript 错误
- ✅ 自动追踪 Vue 组件错误
- ✅ 自动追踪路由变化
- ✅ 自动追踪 HTTP 请求
- ✅ 会话重放（可选）
- ✅ 面包屑记录
- ✅ 用户上下文
- ✅ 性能监控

### Web Vitals 性能监控
- ✅ CLS (Cumulative Layout Shift) - 累积布局偏移
- ✅ FCP (First Contentful Paint) - 首次内容绘制
- ✅ INP (Interaction to Next Paint) - 交互到下一次绘制
- ✅ LCP (Largest Contentful Paint) - 最大内容绘制
- ✅ TTFB (Time to First Byte) - 首字节时间

## 快速开始

### 1. 配置环境变量

```bash
# .env.production
VITE_SENTRY_DSN=https://your-key@sentry.io/project-id
VITE_SENTRY_ENABLED=true
VITE_APP_VERSION=1.0.0
```

### 2. 自动初始化

监控模块会在应用启动时自动初始化（通过 `src/modules/monitoring.ts`）。

### 3. 手动使用

```typescript
import {
  captureError,
  captureMessage,
  setUser,
  addBreadcrumb,
  startSpan,
} from '~/lib/monitoring'

// 捕获错误
try {
  // 你的代码
} catch (error) {
  captureError(error, { context: 'user-action' })
}

// 记录消息
captureMessage('用户完成了重要操作', 'info')

// 设置用户信息
setUser({
  id: '123',
  username: 'john',
  email: 'john@example.com',
})

// 添加面包屑
addBreadcrumb({
  message: '用户点击了按钮',
  category: 'ui',
  level: 'info',
})

// 性能追踪
await startSpan(
  { name: 'fetchUserData', op: 'http' },
  async () => {
    return await fetchUserData()
  }
)
```

## 配置说明

### Sentry 配置

在 `src/lib/monitoring/config.ts` 中配置：

```typescript
export const sentryConfig = {
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enabled: import.meta.env.VITE_SENTRY_ENABLED !== 'false',

  // 采样率
  tracesSampleRate: 0.1, // 10% 的请求被追踪
  sampleRate: 1.0, // 100% 的错误被上报

  // 忽略的错误
  ignoreErrors: [
    'User cancelled',
    'Network Error',
    /^Script error\.?$/,
  ],
}
```

### Web Vitals 配置

```typescript
export const webVitalsConfig = {
  enabled: true,
  debug: import.meta.env.DEV,

  // 性能阈值
  thresholds: {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 200, poor: 500 },
    TTFB: { good: 800, poor: 1800 },
  },
}
```

## API 文档

### Sentry API

#### `captureError(error, context?)`
捕获并上报错误。

```typescript
captureError(new Error('Something went wrong'), {
  source: 'api',
  action: 'fetchData',
})
```

#### `captureMessage(message, level?)`
记录消息。

```typescript
captureMessage('用户登录成功', 'info')
```

#### `setUser(user)`
设置用户信息。

```typescript
setUser({
  id: '123',
  username: 'john',
  email: 'john@example.com',
})
```

#### `clearUser()`
清除用户信息。

```typescript
clearUser()
```

#### `addBreadcrumb(breadcrumb)`
添加面包屑记录。

```typescript
addBreadcrumb({
  message: '用户点击了按钮',
  category: 'ui',
  level: 'info',
  data: { buttonId: 'submit' },
})
```

#### `startSpan(context, callback)`
性能追踪。

```typescript
await startSpan(
  { name: 'database-query', op: 'db' },
  async () => {
    return await db.query()
  }
)
```

#### `recordMetric(name, value, unit?)`
记录性能指标。

```typescript
recordMetric('api-response-time', 150, 'millisecond')
```

### Web Vitals API

#### `formatMetricValue(metric)`
格式化指标值。

```typescript
const formatted = formatMetricValue(metric) // "150ms" or "0.123"
```

#### `getPerformanceRating(metric)`
获取性能评级。

```typescript
const rating = getPerformanceRating(metric) // "good" | "needs-improvement" | "poor"
```

#### `getMetricThresholds(metricName)`
获取指标阈值。

```typescript
const thresholds = getMetricThresholds('LCP')
// { good: 2500, poor: 4000 }
```

## 最佳实践

### 1. 错误处理

```typescript
// ❌ 不好的做法
try {
  await api.fetchData()
} catch (error) {
  console.error(error) // 错误被忽略
}

// ✅ 好的做法
try {
  await api.fetchData()
} catch (error) {
  captureError(error, {
    source: 'api',
    action: 'fetchData',
  })
  throw error // 继续抛出错误
}
```

### 2. 用户上下文

```typescript
// 登录时设置用户信息
function onLogin(user) {
  setUser({
    id: user.id,
    username: user.username,
    email: user.email,
  })
}

// 登出时清除用户信息
function onLogout() {
  clearUser()
}
```

### 3. 面包屑记录

```typescript
// 记录重要的用户操作
function onImportantAction() {
  addBreadcrumb({
    message: '用户执行了重要操作',
    category: 'user-action',
    level: 'info',
    data: { timestamp: Date.now() },
  })
}
```

### 4. 性能追踪

```typescript
// 追踪关键操作的性能
async function fetchCriticalData() {
  return await startSpan(
    { name: 'fetch-critical-data', op: 'http' },
    async () => {
      const data = await api.fetchCriticalData()
      return data
    }
  )
}
```

## 环境配置

### 开发环境
- 错误会打印到控制台，不会发送到 Sentry
- Web Vitals 会打印到控制台
- 100% 的请求被追踪

### 生产环境
- 错误会发送到 Sentry
- Web Vitals 会发送到后端和 Sentry
- 10% 的请求被追踪（降低成本）
- 启用会话重放

## 故障排查

### Sentry 未初始化
检查环境变量是否正确配置：
```bash
VITE_SENTRY_DSN=your-dsn
VITE_SENTRY_ENABLED=true
```

### Web Vitals 数据未上报
1. 检查是否在生产环境
2. 检查后端 API 是否正常
3. 检查浏览器控制台是否有错误

### 性能数据过多
调整采样率：
```typescript
tracesSampleRate: 0.05 // 降低到 5%
```

## 相关资源

- [Sentry 官方文档](https://docs.sentry.io/)
- [Web Vitals 官方文档](https://web.dev/articles/vitals)
- [Vue Sentry SDK](https://docs.sentry.io/platforms/javascript/guides/vue/)
