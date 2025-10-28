<script setup lang="ts">
import type { ErrorBoundaryEmits, ErrorBoundaryInstance, ErrorBoundaryProps } from './types'
import { useErrorBoundary } from './composables'

const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  fallbackMessage: '抱歉，页面出现了一些问题',
  showRetry: true,
  retryText: '重试',
  autoReport: true,
  level: 'error',
})

const emit = defineEmits<ErrorBoundaryEmits>()

// 创建类型安全的 emit 包装器
function emitWrapper(event: string, ...args: any[]) {
  if (event === 'error') {
    emit('error', args[0])
  }
  else if (event === 'retry') {
    emit('retry', args[0])
  }
  else if (event === 'recover') {
    emit('recover')
  }
}

const {
  errorInfo,
  retryCount,
  captureErrorHandler,
  retry,
  clearError,
  getErrorInfo,
  getRetryCount,
  canRetry,
  shouldShowDetails,
} = useErrorBoundary(props, emitWrapper)

/**
 * 捕获组件错误
 */
onErrorCaptured((err: Error, instance, info) => {
  return captureErrorHandler(err, instance, info)
})

/**
 * 错误图标
 */
const errorIcon = computed(() => {
  switch (props.level) {
    case 'warning':
      return 'i-carbon-warning-alt'
    case 'info':
      return 'i-carbon-information'
    default:
      return 'i-carbon-warning'
  }
})

/**
 * 错误颜色
 */
const errorColor = computed(() => {
  switch (props.level) {
    case 'warning':
      return 'text-orange-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-red-500'
  }
})

/**
 * 暴露实例方法
 */
defineExpose<ErrorBoundaryInstance>({
  clearError,
  getErrorInfo,
  getRetryCount,
})
</script>

<template>
  <div
    v-if="errorInfo"
    class="error-boundary"
    :class="props.class"
    :style="props.style"
  >
    <div class="error-content">
      <!-- 错误图标 -->
      <div class="error-icon">
        <div
          class="text-6xl"
          :class="[errorIcon, errorColor]"
        />
      </div>

      <!-- 错误标题 -->
      <h2 class="error-title">
        {{ fallbackMessage }}
      </h2>

      <!-- 错误详情（仅开发环境或显式启用） -->
      <div
        v-if="shouldShowDetails"
        class="error-details"
      >
        <!-- 错误消息 -->
        <div class="error-message">
          <strong>错误消息:</strong>
          <p>{{ errorInfo.error.message }}</p>
        </div>

        <!-- 组件信息 -->
        <div
          v-if="errorInfo.componentName"
          class="error-component"
        >
          <strong>组件:</strong>
          <span>{{ errorInfo.componentName }}</span>
        </div>

        <!-- 错误堆栈 -->
        <details class="error-stack">
          <summary>查看详细堆栈</summary>
          <pre>{{ errorInfo.error.stack }}</pre>
        </details>

        <!-- Vue 错误信息 -->
        <details
          v-if="errorInfo.info"
          class="error-info"
        >
          <summary>Vue 错误信息</summary>
          <pre>{{ errorInfo.info }}</pre>
        </details>

        <!-- 重试次数 -->
        <div
          v-if="retryCount > 0"
          class="error-retry-count"
        >
          <span>已重试 {{ retryCount }} 次</span>
          <span v-if="maxRetries"> / {{ maxRetries }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <button
          v-if="canRetry"
          class="retry-button"
          @click="retry"
        >
          {{ retryText }}
        </button>

        <!-- 自定义操作插槽 -->
        <slot
          name="actions"
          :error-info="errorInfo"
          :retry="retry"
          :clear="clearError"
        />
      </div>

      <!-- 自定义错误内容插槽 -->
      <slot
        name="error"
        :error-info="errorInfo"
        :retry="retry"
        :clear="clearError"
      />
    </div>
  </div>

  <!-- 正常内容 -->
  <slot v-else />
</template>

<style scoped lang="scss">
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background: var(--error-boundary-bg, transparent);
}

.error-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-icon {
  margin-bottom: 1.5rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.error-title {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 600;
  color: var(--text-color, #333);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.error-details {
  margin: 1.5rem 0;
  text-align: left;
  background: var(--error-details-bg, #f9f9f9);
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 8px;
  border: 1px solid var(--error-details-border, #e0e0e0);
}

.error-message {
  padding: 1rem;
  background: var(--error-message-bg, #fee);
  border-left: 4px solid var(--error-message-border, #f44);
  border-radius: 4px;
  margin-bottom: 1rem;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--error-message-text, #c33);
    font-size: 0.875rem;
  }

  p {
    margin: 0;
    color: var(--error-message-text, #c33);
    font-family: var(--font-mono, 'Courier New', monospace);
    font-size: 0.875rem;
    word-break: break-word;
  }
}

.error-component {
  padding: 0.75rem 1rem;
  background: var(--error-component-bg, #f0f0f0);
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  strong {
    margin-right: 0.5rem;
    color: var(--text-color, #333);
  }

  span {
    font-family: var(--font-mono, 'Courier New', monospace);
    color: var(--text-color-secondary, #666);
  }
}

.error-stack,
.error-info {
  padding: 1rem;
  background: var(--error-stack-bg, #f5f5f5);
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--error-stack-hover-bg, #ececec);
  }

  summary {
    font-weight: 600;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    cursor: pointer;
    color: var(--text-color, #333);

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      display: inline-block;
      margin-right: 0.5rem;
      transition: transform 0.2s ease;
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  pre {
    margin-top: 0.75rem;
    padding: 0.75rem;
    background: var(--error-pre-bg, #fff);
    border: 1px solid var(--error-pre-border, #ddd);
    border-radius: 4px;
    font-size: 0.75rem;
    font-family: var(--font-mono, 'Courier New', monospace);
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.5;
    color: var(--text-color, #333);
  }
}

.error-retry-count {
  padding: 0.5rem 1rem;
  background: var(--error-retry-bg, #fff3cd);
  border-left: 4px solid var(--error-retry-border, #ffc107);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--error-retry-text, #856404);
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.retry-button {
  padding: 0.75rem 2rem;
  background: var(--primary-color, #1890ff);
  color: var(--button-text-color, #fff);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  min-width: 120px;

  &:hover:not(:disabled) {
    background: var(--primary-color-hover, #40a9ff);
    box-shadow: 0 4px 8px rgba(24, 144, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  }

  &:disabled {
    background: var(--button-disabled-bg, #d9d9d9);
    color: var(--button-disabled-text, #999);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .error-boundary {
    --text-color: #fff;
    --text-color-secondary: #aaa;
    --error-details-bg: #1f1f1f;
    --error-details-border: #333;
    --error-component-bg: #2a2a2a;
    --error-stack-bg: #2a2a2a;
    --error-stack-hover-bg: #333;
    --error-pre-bg: #1a1a1a;
    --error-pre-border: #444;
    --button-disabled-bg: #3a3a3a;
    --button-disabled-text: #666;
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .error-boundary {
    padding: 1rem;
    min-height: 300px;
  }

  .error-icon {
    :deep(div) {
      font-size: 3rem !important;
    }
  }

  .error-details {
    font-size: 0.875rem;
  }

  .retry-button {
    width: 100%;
  }
}
</style>
