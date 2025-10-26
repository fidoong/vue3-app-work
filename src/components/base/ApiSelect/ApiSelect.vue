<script setup lang="ts">
import type { ApiSelectEmits, ApiSelectProps } from './types'
import { useApiSelect } from './composables'

const props = withDefaults(defineProps<ApiSelectProps>(), {
  immediate: true,
  reloadOnParamsChange: true,
  optionConfig: () => ({}),
  params: () => ({}),
})

const emit = defineEmits<ApiSelectEmits>()

const {
  loading,
  options,
  error,
  loadData,
  reload,
} = useApiSelect(props, emit)

/**
 * 处理值变化
 */
function handleChange(value: any, option: any) {
  emit('update:value', value)
  emit('change', value, option)
}

/**
 * 监听参数变化
 */
watch(
  () => props.params,
  () => {
    if (props.reloadOnParamsChange) {
      loadData()
    }
  },
  { deep: true },
)

/**
 * 初始化加载
 */
onMounted(() => {
  if (props.immediate) {
    loadData()
  }
})

// 暴露方法
defineExpose({
  reload,
  loading,
  options,
  error,
})
</script>

<template>
  <a-select
    v-bind="props"
    :loading="loading"
    :options="options"
    @change="handleChange"
  >
    <!-- 透传所有插槽 -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </a-select>
</template>
