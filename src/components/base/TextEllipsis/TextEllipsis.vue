<script setup lang="ts">
import type { TextEllipsisInstance, TextEllipsisProps } from './types'
import { Tooltip } from 'ant-design-vue'

const props = withDefaults(defineProps<TextEllipsisProps>(), {
  lines: 1,
  tooltip: true,
  placement: 'top',
  tooltipMaxWidth: 400,
})

const textRef = ref<HTMLElement>()
const isOverflow = ref(false)

/**
 * 检查是否超出
 */
function checkOverflow() {
  if (!textRef.value)
    return false

  const el = textRef.value
  if (props.lines === 1) {
    // 单行：比较 scrollWidth 和 clientWidth
    isOverflow.value = el.scrollWidth > el.clientWidth
  }
  else {
    // 多行：比较 scrollHeight 和 clientHeight
    isOverflow.value = el.scrollHeight > el.clientHeight
  }

  return isOverflow.value
}

/**
 * 获取文本内容
 */
function getContent() {
  return props.content || textRef.value?.textContent || ''
}

/**
 * 窗口大小变化时重新检查（使用防抖）
 */
let resizeTimer: ReturnType<typeof setTimeout> | null = null
function handleResize() {
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  resizeTimer = setTimeout(() => {
    checkOverflow()
  }, 100)
}

/**
 * 监听内容变化
 */
watch(() => props.content, () => {
  nextTick(() => {
    checkOverflow()
  })
})

/**
 * 监听行数变化
 */
watch(() => props.lines, () => {
  nextTick(() => {
    checkOverflow()
  })
})

/**
 * MutationObserver 用于监听插槽内容变化
 */
let observer: MutationObserver | null = null

/**
 * 挂载后检查
 */
onMounted(() => {
  // 使用 requestAnimationFrame 确保 DOM 完全渲染后再检查
  requestAnimationFrame(() => {
    checkOverflow()
  })
  window.addEventListener('resize', handleResize)

  // 监听 DOM 内容变化（用于插槽内容更新）
  if (textRef.value) {
    observer = new MutationObserver(() => {
      nextTick(() => {
        checkOverflow()
      })
    })
    observer.observe(textRef.value, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }
})

/**
 * 卸载时移除监听
 */
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

/**
 * 文本样式
 */
const textStyle = computed(() => {
  const style: Record<string, any> = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  }

  if (props.lines === 1) {
    style.whiteSpace = 'nowrap'
  }
  else {
    style.display = '-webkit-box'
    style.WebkitBoxOrient = 'vertical'
    style.WebkitLineClamp = props.lines
  }

  return style
})

/**
 * 是否显示 tooltip
 */
const showTooltip = computed(() => {
  return props.tooltip && isOverflow.value
})

/**
 * tooltip 标题（只在需要时才传递）
 */
const tooltipTitle = computed(() => {
  if (!showTooltip.value)
    return undefined
  // 优先使用 content 属性，否则从 DOM 获取文本内容
  return props.content || textRef.value?.textContent || ''
})

/**
 * 暴露实例方法
 */
defineExpose<TextEllipsisInstance>({
  checkOverflow,
  getContent,
})
</script>

<template>
  <Tooltip
    :title="tooltipTitle"
    :placement="placement"
    :overlay-style="{ maxWidth: typeof tooltipMaxWidth === 'number' ? `${tooltipMaxWidth}px` : tooltipMaxWidth }"
  >
    <div
      ref="textRef"
      class="text-ellipsis"
      :class="[className]"
      :style="[textStyle, style]"
    >
      <slot>{{ content }}</slot>
    </div>
  </Tooltip>
</template>

<style scoped lang="scss">
.text-ellipsis {
  width: 100%;
}
</style>
