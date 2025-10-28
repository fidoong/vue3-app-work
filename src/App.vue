<script setup lang="ts">
import { onMounted } from 'vue'
import ErrorBoundary from './components/base/ErrorBoundary.vue'
import { ThemeProvider } from './components/theme'
import { ErrorTracker } from './lib/error'
import { PerformanceMonitor } from './lib/performance'

// 全局错误处理
onMounted(() => {
  // 捕获未处理的 Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    ErrorTracker.capture(
      new Error(event.reason?.message || 'Unhandled Promise Rejection'),
      {
        location: 'window.unhandledrejection',
        extra: { reason: event.reason },
      },
    )
  })

  // 捕获全局错误
  window.addEventListener('error', (event) => {
    ErrorTracker.capture(event.error || new Error(event.message), {
      location: 'window.error',
      extra: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    })
  })

  // 性能监控
  if (import.meta.env.DEV) {
    // 开发环境：输出性能统计
    setTimeout(() => {
      const apiStats = PerformanceMonitor.getApiStats()
      const componentStats = PerformanceMonitor.getComponentStats()

      if (apiStats) {
        console.info('[Performance] API Stats:', apiStats)
      }
      if (componentStats.length > 0) {
        console.info('[Performance] Component Stats:', componentStats)
      }
    }, 5000)
  }
})
</script>

<template>
  <ErrorBoundary>
    <ThemeProvider>
      <RouterView />
    </ThemeProvider>
  </ErrorBoundary>
</template>
