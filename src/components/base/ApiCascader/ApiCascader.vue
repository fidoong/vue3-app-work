<script setup lang="ts">
import type { ApiCascaderEmits, ApiCascaderProps } from './types'
import { useApiCascader } from './composables'

const props = withDefaults(defineProps<ApiCascaderProps>(), {
  immediate: true,
  reloadOnParamsChange: true,
  optionConfig: () => ({}),
  params: () => ({}),
})

const emit = defineEmits<ApiCascaderEmits>()

const {
  loading,
  options,
  error,
  loadData,
  reload,
} = useApiCascader(props, emit)

/**
 * 处理值变化
 */
function handleChange(value: any, selectedOptions: any) {
  emit('update:value', value)
  emit('change', value, selectedOptions)
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
  <a-cascader
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
  </a-cascader>
</template>
