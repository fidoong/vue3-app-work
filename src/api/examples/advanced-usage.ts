/**
 * 高级使用示例
 */
import { HttpClientManager } from '../core'
import { MockPlugin } from '../plugins/mock'

// 1. 使用请求重试
// const retryClient = HttpClientManager.createClient('retry', {
//   baseURL: '/api',
//   retry: {
//     retries: 3,
//     retryDelay: 1000,
//     shouldRetry: (error) => {
//       // 只在网络错误或5xx错误时重试
//       return !error.response || error.response.status >= 500
//     },
//   },
// })

// 2. 使用请求缓存
const cacheClient = HttpClientManager.createClient('cache', {
  baseURL: '/api',
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5分钟
  },
})

// 使用缓存的请求
export async function getCachedData() {
  // 第一次请求会发送到服务器
  const response1 = await cacheClient.get('/data', undefined, {
    useCache: true,
  })

  // 5分钟内的第二次请求会从缓存返回
  await cacheClient.get('/data', undefined, {
    useCache: true,
  })

  return response1.data
}

// 禁用特定请求的缓存
export async function getRealtimeData() {
  const response = await cacheClient.get('/realtime', undefined, {
    useCache: false, // 不使用缓存
  })
  return response.data
}

// 3. 使用请求日志
// const loggerClient = HttpClientManager.createClient('logger', {
//   baseURL: '/api',
//   logger: {
//     enabled: true,
//     logRequest: true,
//     logResponse: true,
//     logError: true,
//   },
// })

// 4. 使用Mock数据
const mockClient = HttpClientManager.createClient('mock', {
  baseURL: '/api',
})

const mockPlugin = new MockPlugin({
  enabled: true,
  rules: [
    {
      url: '/users',
      method: 'GET',
      response: {
        code: 200,
        message: 'success',
        data: {
          list: [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
          ],
          total: 2,
        },
      },
      delay: 500,
    },
    {
      url: /\/users\/\d+/,
      method: 'GET',
      response: (config: any) => {
        const id = config.url?.match(/\/users\/(\d+)/)?.[1]
        return {
          code: 200,
          message: 'success',
          data: { id, name: `User ${id}` },
        }
      },
    },
  ],
})

mockPlugin.setupMock(mockClient.getAxiosInstance())

// 5. 动态添加拦截器
const dynamicClient = HttpClientManager.createClient('dynamic', {
  baseURL: '/api',
})

const interceptorManager = dynamicClient.getInterceptorManager()

// 添加自定义请求拦截器
interceptorManager.addRequestInterceptor(
  'custom-header',
  (config) => {
    config.headers['X-Custom-Header'] = 'custom-value'
    return config
  },
)

// 添加自定义响应拦截器
interceptorManager.addResponseInterceptor(
  'custom-response',
  (response) => {
    // Custom response interceptor logic
    return response
  },
)

// 移除拦截器
// interceptorManager.removeInterceptor('custom-header')

// 6. 使用错误处理器
const errorClient = HttpClientManager.createClient('error', {
  baseURL: '/api',
  showError: true,
  onTokenExpired: () => {
    window.location.href = '/login'
  },
})

// 自定义错误处理
export async function handleCustomError() {
  const response = await errorClient.get('/data', undefined, {
    showError: false, // 禁用自动错误提示
  })
  return response.data
}

// 7. 取消请求
export async function cancelableRequest() {
  const controller = new AbortController()

  // 发起请求
  const promise = errorClient.get('/slow-api', undefined, {
    signal: controller.signal,
  })

  // 3秒后取消请求
  setTimeout(() => {
    controller.abort()
  }, 3000)

  const response = await promise
  return response.data
}

// 8. 批量请求
export async function batchRequests() {
  const promises = [
    errorClient.get('/api1'),
    errorClient.get('/api2'),
    errorClient.get('/api3'),
  ]

  try {
    const results = await Promise.all(promises)
    return results.map(r => r.data)
  }
  catch (error) {
    console.error('Batch request failed:', error)
    throw error
  }
}

// 9. 清空缓存
export function clearAllCache() {
  cacheClient.clearCache()
}

// 10. 取消所有待处理请求
export function cancelAllRequests() {
  HttpClientManager.cancelAllRequests()
}
