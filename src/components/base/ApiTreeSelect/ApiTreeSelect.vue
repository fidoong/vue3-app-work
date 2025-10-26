<script setup lang="ts">
import type { ApiTreeSelectEmits, ApiTreeSelectProps } from './types'
import { useApiTreeSelect } from './composables/useApiTreeSelect'

const props = withDefaults(defineProps<ApiTreeSelectProps>(), {
  immediate: true,
  reloadOnParamsChange: true,
  treeNodeConfig: () => ({}),
  params: () => ({}),
})

const emit = defineEmits<ApiTreeSelectEmits>()

const {
  loading,
  treeData,
  error,
  loadData,
  reload,
} = useApiTreeSelect(props, emit)

/**
 * 处理值变化
 */
function handleChange(value: any, label: any, extra: any) {
  emit('update:value', value)
  emit('change', value, label, extra)
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
  treeData,
  error,
})
</script>

<template>
  <a-tree-select
    v-bind="props"
    :loading="loading"
    :tree-data="treeData"
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
  </a-tree-select>
</template>
