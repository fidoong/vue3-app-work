<script setup lang="ts">
import type { ApiRadioGroupEmits, ApiRadioGroupProps } from './types'
import { useApiRadioGroup } from './composables'

const props = withDefaults(defineProps<ApiRadioGroupProps>(), {
  immediate: true,
  reloadOnParamsChange: true,
  optionConfig: () => ({}),
  params: () => ({}),
  optionType: 'default',
})

const emit = defineEmits<ApiRadioGroupEmits>()

const {
  loading,
  options,
  error,
  loadData,
  reload,
} = useApiRadioGroup(props, emit)

function handleChange(e: any) {
  emit('update:value', e.target.value)
  emit('change', e)
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
    <a-radio-group
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
    </a-radio-group>
  </a-spin>
</template>
