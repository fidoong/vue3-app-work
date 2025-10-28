# 性能监控系统

监控页面加载、API 请求、组件渲染等性能指标。

## 快速开始

```typescript
import { PerformanceMonitor } from '~/lib/performance'

// 追踪页面加载
const metrics = PerformanceMonitor.trackPageLoad()
console.log('页面加载时间:', metrics?.loadComplete, 'ms')

// 追踪 API 请求
PerformanceMonitor.trackApiCall('/api/users', 'GET', 150, 200)

// 追踪组件渲染
PerformanceMonitor.trackComponentRender('UserList', 50)

// 获取统计数据
const apiStats = PerformanceMonitor.getApiStats()
console.log('API 平均响应时间:', apiStats?.avgDuration, 'ms')

const componentStats = PerformanceMonitor.getComponentStats()
console.log('组件渲染统计:', componentStats)
```

## 集成到 HTTP 客户端（可选）

如果需要自动追踪 API 性能，可以在创建客户端时添加拦截器：

```typescript
import { HttpClientManager } from '~/lib/http'
import { PerformanceMonitor } from '~/lib/performance'

const client = HttpClientManager.createClient('api', {
  baseURL: '/api',
  onRequest: (config) => {
    // 记录请求开始时间
    config.metadata = { startTime: Date.now() }
    return config
  },
  onResponse: (response) => {
    // 追踪 API 性能
    const config = response.config as any
    if (config.metadata?.startTime) {
      const duration = Date.now() - config.metadata.startTime
      PerformanceMonitor.trackApiCall(
        config.url || '',
        config.method?.toUpperCase() || 'GET',
        duration,
        response.status,
      )
    }
    return response
  },
  onResponseError: (error) => {
    // 追踪失败的请求
    const config = error.config as any
    if (config?.metadata?.startTime) {
      const duration = Date.now() - config.metadata.startTime
      PerformanceMonitor.trackApiCall(
        config.url || '',
        config.method?.toUpperCase() || 'GET',
        duration,
        error.response?.status || 0,
      )
    }
    return Promise.reject(error)
  },
})
```

## 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
import { PerformanceMonitor } from '~/lib/performance'

const componentName = 'UserList'

onMounted(() => {
  PerformanceMonitor.mark(`${componentName}-mount-start`)
})

onUpdated(() => {
  PerformanceMonitor.mark(`${componentName}-update-end`)
  const duration = PerformanceMonitor.measure(
    `${componentName}-update`,
    `${componentName}-mount-start`,
    `${componentName}-update-end`
  )

  if (duration > 100) {
    console.warn(`${componentName} 渲染耗时过长:`, duration, 'ms')
  }
})
</script>
```

## 自定义性能标记

```typescript
import { PerformanceMonitor } from '~/lib/performance'

// 标记开始
PerformanceMonitor.mark('data-processing-start')

// 执行耗时操作
await processData()

// 标记结束
PerformanceMonitor.mark('data-processing-end')

// 测量耗时
const duration = PerformanceMonitor.measure(
  'data-processing',
  'data-processing-start',
  'data-processing-end'
)

console.log('数据处理耗时:', duration, 'ms')
```

## 注册自定义处理器

```typescript
import { PerformanceMonitor } from '~/lib/performance'

// 注册处理器
PerformanceMonitor.registerHandler((metric) => {
  // 上报到性能监控平台
  if (metric.value > 1000) {
    fetch('/api/performance', {
      method: 'POST',
      body: JSON.stringify(metric),
    })
  }
})
```

## API

### PerformanceMonitor.trackPageLoad()

追踪页面加载性能。

### PerformanceMonitor.trackApiCall(url, method, duration, status, size?)

追踪 API 请求性能。

### PerformanceMonitor.trackComponentRender(name, duration)

追踪组件渲染性能。

### PerformanceMonitor.trackResourceLoad()

追踪资源加载性能。

### PerformanceMonitor.getApiStats()

获取 API 性能统计。

### PerformanceMonitor.getComponentStats()

获取组件性能统计。

### PerformanceMonitor.mark(name)

创建性能标记。

### PerformanceMonitor.measure(name, startMark, endMark?)

测量性能。

### PerformanceMonitor.clear()

清空统计数据。

### PerformanceMonitor.registerHandler(handler)

注册指标处理器。

### PerformanceMonitor.enable() / disable()

启用/禁用性能监控。
