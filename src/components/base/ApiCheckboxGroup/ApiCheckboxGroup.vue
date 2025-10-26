<script setup lang="ts">
import type { ApiCheckboxGroupEmits, ApiCheckboxGroupProps } from './types'
import { useApiCheckboxGroup } from './composables'

const props = withDefaults(defineProps<ApiCheckboxGroupProps>(), {
  immediate: true,
  reloadOnParamsChange: true,
  optionConfig: () => ({}),
  params: () => ({}),
})

const emit = defineEmits<ApiCheckboxGroupEmits>()

const {
  loading,
  options,
  error,
  loadData,
  reload,
} = useApiCheckboxGroup(props, emit)

function handleChange(checkedValue: any[]) {
  emit('update:value', checkedValue)
  emit('change', checkedValue)
}

watch(
  () => props.params,
  () => {
    if (props.reloadOnParamsChange) {
      loadData()
    }
  },
  { deep: true },
)

onMounted(() => {
  if (props.immediate) {
    loadData()
  }
})

defineExpose({
  reload,
  loading,
  options,
  error,
})
</script>

<template>
  <a-spin :spinning="loading">
    <a-checkbox-group
      v-bind="props"
      :options="options"
      @change="handleChange"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps"
        />
      </template>
    </a-checkbox-group>
  </a-spin>
</template>
