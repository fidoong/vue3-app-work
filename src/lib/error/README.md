# 错误追踪系统

统一的错误处理和上报系统。

## 快速开始

```typescript
import { ErrorTracker } from '~/lib/error'

// 捕获错误
try {
  // 业务代码
} catch (error) {
  ErrorTracker.capture(error, {
    location: 'UserService.login',
    userId: user.id,
  })
}

// 捕获消息
ErrorTracker.captureMessage('用户登录失败', 'warning', {
  userId: user.id,
})

// 捕获致命错误
ErrorTracker.captureFatal(error, {
  location: 'App initialization',
})
```

## 集成到 HTTP 客户端（可选）

如果需要自动追踪 HTTP 错误，可以在创建客户端时添加拦截器：

```typescript
import { HttpClientManager } from '~/lib/http'
import { ErrorTracker } from '~/lib/error'

const client = HttpClientManager.createClient('api', {
  baseURL: '/api',
  onResponseError: (error) => {
    // 自动追踪 HTTP 错误
    if (!axios.isCancel(error)) {
      ErrorTracker.capture(error, {
        location: 'HTTP Response',
        request: {
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params || error.config?.data,
        },
      })
    }
    return Promise.reject(error)
  },
})
```

## 注册自定义处理器

```typescript
import { ErrorTracker } from '~/lib/error'

// 注册 Sentry 处理器
ErrorTracker.registerHandler((report) => {
  if (report.level === 'error' || report.level === 'fatal') {
    Sentry.captureException(new Error(report.message), {
      level: report.level,
      contexts: {
        custom: report.context,
      },
    })
  }
})

// 注册日志服务处理器
ErrorTracker.registerHandler((report) => {
  fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify(report),
  })
})
```

## 在 Vue 中使用

```typescript
// main.ts
import { ErrorTracker } from '~/lib/error'

app.config.errorHandler = (err, instance, info) => {
  ErrorTracker.capture(err as Error, {
    location: 'Vue Error Handler',
    component: instance?.$options.name,
    extra: { info },
  })
}

// 全局未捕获错误
window.addEventListener('error', (event) => {
  ErrorTracker.capture(event.error, {
    location: 'Global Error',
  })
})

// 未处理的 Promise 拒绝
window.addEventListener('unhandledrejection', (event) => {
  ErrorTracker.capture(new Error(event.reason), {
    location: 'Unhandled Promise Rejection',
  })
})
```

## API

### ErrorTracker.capture(error, context?)

捕获错误。

### ErrorTracker.captureMessage(message, level?, context?)

捕获消息。

### ErrorTracker.captureFatal(error, context?)

捕获致命错误。

### ErrorTracker.registerHandler(handler)

注册错误处理器。

### ErrorTracker.removeHandler(handler)

移除错误处理器。

### ErrorTracker.enable() / disable()

启用/禁用错误追踪。
