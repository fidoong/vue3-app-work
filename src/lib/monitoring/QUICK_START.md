# 监控模块快速开始

## 🚀 5 分钟上手

### 1. 配置环境变量

```bash
# .env.production
VITE_SENTRY_DSN=https://your-key@sentry.io/project-id
VITE_SENTRY_ENABLED=true
VITE_APP_VERSION=1.0.0
```

### 2. 自动初始化 ✅

监控模块已在 `src/modules/monitoring.ts` 中自动初始化，无需额外配置。

### 3. 在组件中使用

```vue
<script setup lang="ts">
import { useMonitoring } from '~/composables/useMonitoring'

const { trackError, trackUser, trackAction } = useMonitoring()

// 追踪用户操作
function handleClick() {
  trackAction('button-clicked', { buttonId: 'submit' })
}

// 追踪错误
async function fetchData() {
  try {
    const data = await api.fetch()
    return data
  } catch (error) {
    trackError(error, { source: 'api' })
    throw error
  }
}

// 设置用户信息（登录后）
onMounted(() => {
  trackUser({
    id: user.value.id,
    username: user.value.username,
    email: user.value.email,
  })
})
</script>
```

### 4. 常用 API

```typescript
// 错误追踪
trackError(error, { context: 'user-action' })

// 消息记录
trackMessage('重要操作完成', 'info')

// 性能追踪
await trackPerformance('fetchData', async () => {
  return await api.fetchData()
})

// API 调用追踪
await trackApiCall('/api/users', async () => {
  return await api.getUsers()
})

// 用户追踪
trackUser({ id: '123', username: 'john' })
clearUserTracking() // 登出时

// 面包屑记录
trackAction('button-clicked', { buttonId: 'submit' })
```

## 📊 监控指标

### Web Vitals (自动收集)

- **CLS** - 累积布局偏移 (< 0.1 良好)
- **FCP** - 首次内容绘制 (< 1.8s 良好)
- **INP** - 交互响应 (< 200ms 良好)
- **LCP** - 最大内容绘制 (< 2.5s 良好)
- **TTFB** - 首字节时间 (< 800ms 良好)

### 自定义指标

```typescript
import { recordMetric } from '~/lib/monitoring'

// 记录自定义指标
recordMetric('api-response-time', 150, 'millisecond')
recordMetric('cache-hit-rate', 0.85, 'none')
```

## 🎯 最佳实践

### ✅ 推荐做法

```typescript
// 1. 总是捕获并上报错误
try {
  await riskyOperation()
} catch (error) {
  trackError(error, { operation: 'riskyOperation' })
  throw error // 继续抛出
}

// 2. 追踪关键操作性能
await trackPerformance('criticalOperation', async () => {
  return await performCriticalOperation()
})

// 3. 记录重要的用户操作
trackAction('checkout-completed', { orderId: '123', amount: 99.99 })
```

### ❌ 避免做法

```typescript
// ❌ 不要吞掉错误
try {
  await operation()
} catch (error) {
  console.error(error) // 错误被忽略
}

// ❌ 不要过度追踪
trackAction('mouse-moved') // 太频繁
trackAction('scroll') // 太频繁

// ❌ 不要记录敏感信息
trackError(error, { password: '123456' }) // 危险！
```

## 🔍 调试

### 开发环境

- 错误会打印到控制台，不会发送到 Sentry
- Web Vitals 会打印到控制台
- 100% 的请求被追踪

### 生产环境

- 错误会发送到 Sentry
- Web Vitals 会发送到后端
- 10% 的请求被追踪（降低成本）

### 查看日志

```typescript
// 开发环境会看到：
// ✅ [Web Vitals] LCP: 1234ms { rating: 'good', ... }
// ⚠️ [Web Vitals] CLS: 0.15 { rating: 'needs-improvement', ... }
// ❌ [Web Vitals] INP: 350ms { rating: 'poor', ... }
```

## 📚 更多资源

- [完整文档](./README.md)
- [更新日志](./CHANGELOG.md)
- [Sentry 文档](https://docs.sentry.io/)
- [Web Vitals 文档](https://web.dev/articles/vitals)
