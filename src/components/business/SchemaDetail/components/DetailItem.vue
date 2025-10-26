<script setup lang="ts">
import type { DetailItemSchema } from '../types'
import { CopyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { formatDisplayValue, getFieldValue, isFieldHidden } from '../composables'

interface Props {
  item: DetailItemSchema
  data: Record<string, any>
  labelWidth?: number | string
  labelAlign?: 'left' | 'right' | 'center'
  contentAlign?: 'left' | 'right' | 'center'
  colon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelAlign: 'left',
  contentAlign: 'left',
  colon: true,
})

const emit = defineEmits<{
  copy: [field: string, value: any]
}>()

// 获取字段值
const fieldValue = computed(() => {
  const path = props.item.path || props.item.key
  return getFieldValue(props.data, path)
})

// 格式化后的值
const displayValue = computed(() => {
  return formatDisplayValue(props.item, fieldValue.value, props.data)
})

// 是否隐藏
const hidden = computed(() => {
  return isFieldHidden(props.item, props.data)
})

// 标签宽度
const labelWidthStyle = computed(() => {
  const width = props.item.labelWidth ?? props.labelWidth
  if (!width)
    return undefined
  return typeof width === 'number' ? `${width}px` : width
})

// 复制到剪贴板
async function handleCopy() {
  try {
    await navigator.clipboard.writeText(String(fieldValue.value))
    message.success('复制成功')
    emit('copy', props.item.key, fieldValue.value)
  }
  catch {
    message.error('复制失败')
  }
}
</script>

<template>
  <div
    v-if="!hidden"
    class="detail-item"
    :class="[item.className]"
    :style="item.style"
  >
    <div
      class="detail-item-label"
      :style="{
        width: labelWidthStyle,
        textAlign: item.labelAlign || labelAlign,
      }"
    >
      <component
        :is="item.prefixIcon"
        v-if="item.prefixIcon"
        class="detail-item-prefix-icon"
      />
      <span>{{ item.label }}</span>
      <span
        v-if="colon"
        class="detail-item-colon"
      >:</span>
    </div>
    <div
      class="detail-item-content"
      :style="{
        textAlign: item.contentAlign || contentAlign,
      }"
    >
      <!-- 自定义渲染 -->
      <component
        :is="item.render?.(fieldValue, data)"
        v-if="item.render"
      />
      <!-- 插槽 -->
      <slot
        v-else-if="item.slot"
        :name="item.slot"
        :value="fieldValue"
        :record="data"
      >
        {{ displayValue }}
      </slot>
      <!-- 默认显示 -->
      <span v-else>{{ displayValue }}</span>

      <component
        :is="item.suffixIcon"
        v-if="item.suffixIcon"
        class="detail-item-suffix-icon"
      />

      <!-- 复制按钮 -->
      <a-button
        v-if="item.copyable && fieldValue"
        type="text"
        size="small"
        class="detail-item-copy-btn"
        @click="handleCopy"
      >
        <CopyOutlined />
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-item {
  display: flex;
  padding: 12px 0;
  line-height: 1.5715;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  &-label {
    flex-shrink: 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    padding-right: 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
  }

  &-colon {
    margin-left: 2px;
  }

  &-content {
    flex: 1;
    color: rgba(0, 0, 0, 0.65);
    word-break: break-word;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 22px;
  }

  &-prefix-icon,
  &-suffix-icon {
    margin-right: 4px;
  }

  &-copy-btn {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover &-copy-btn {
    opacity: 1;
  }
}
</style>
