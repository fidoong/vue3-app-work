<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { ErrorTracker } from '~/lib/error'

interface Props {
  /** 是否显示错误详情（仅开发环境） */
  showDetails?: boolean
  /** 自定义错误消息 */
  fallbackMessage?: string
  /** 错误回调 */
  onError?: (error: Error) => void
}

const props = withDefaults(defineProps<Props>(), {
  showDetails: import.meta.env.DEV,
  fallbackMessage: '抱歉，页面出现了一些问题',
})

const error = ref<Error | null>(null)
const errorInfo = ref<string>('')

onErrorCaptured((err: Error, instance, info) => {
  error.value = err
  errorInfo.value = info

  // 记录错误
  ErrorTracker.capture(err, {
    location: 'ErrorBoundary',
    extra: {
      componentName: instance?.$options.name || 'Unknown',
      errorInfo: info,
    },
  })

  // 触发回调
  props.onError?.(err)

  // 阻止错误继续传播
  return false
})

function retry() {
  error.value = null
  errorInfo.value = ''
}
</script>

<template>
  <div
    v-if="error"
    class="error-boundary"
  >
    <div class="error-content">
      <div class="error-icon">
        <div class="i-carbon-warning text-6xl text-red-500" />
      </div>
      <h2 class="error-title">
        {{ fallbackMessage }}
      </h2>
      <div
        v-if="showDetails"
        class="error-details"
      >
        <p class="error-message">
          {{ error.message }}
        </p>
        <details class="error-stack">
          <summary>查看详细信息</summary>
          <pre>{{ error.stack }}</pre>
          <div
            v-if="errorInfo"
            class="mt-4"
          >
            <strong>组件信息:</strong>
            <pre>{{ errorInfo }}</pre>
          </div>
        </details>
      </div>
      <button
        class="retry-button"
        @click="retry"
      >
        重试
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
}

.error-content {
  max-width: 600px;
  text-align: center;
}

.error-icon {
  margin-bottom: 1.5rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.error-details {
  margin: 1.5rem 0;
  text-align: left;
}

.error-message {
  padding: 1rem;
  background: #fee;
  border-left: 4px solid #f44;
  border-radius: 4px;
  color: #c33;
  font-family: monospace;
  margin-bottom: 1rem;
}

.error-stack {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

.error-stack summary {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-stack pre {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.retry-button {
  padding: 0.75rem 2rem;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.retry-button:hover {
  background: #40a9ff;
}
</style>
