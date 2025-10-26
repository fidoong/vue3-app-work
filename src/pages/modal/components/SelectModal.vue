<script setup lang="ts">
interface Option {
  label: string
  value: string
  description?: string
}

interface Props {
  options: Option[]
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = defineProps<Props>()

const selectedValue = ref<string>()

/**
 * 选择选项
 */
function handleSelect(value: string) {
  selectedValue.value = value
}

/**
 * 确认
 */
function handleConfirm() {
  if (!selectedValue.value) {
    return
  }
  const selected = props.options.find(opt => opt.value === selectedValue.value)
  props.confirm?.(selected)
}

/**
 * 取消
 */
function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div class="select-modal">
    <a-radio-group
      v-model:value="selectedValue"
      class="w-full"
    >
      <a-space
        direction="vertical"
        :size="12"
        class="w-full"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="option-item"
          :class="{ active: selectedValue === option.value }"
          @click="handleSelect(option.value)"
        >
          <a-radio :value="option.value">
            <div class="option-content">
              <div class="option-label">
                {{ option.label }}
              </div>
              <div
                v-if="option.description"
                class="option-description"
              >
                {{ option.description }}
              </div>
            </div>
          </a-radio>
        </div>
      </a-space>
    </a-radio-group>

    <div class="mt-6 flex justify-end gap-2">
      <a-button @click="handleCancel">
        取消
      </a-button>
      <a-button
        type="primary"
        :disabled="!selectedValue"
        @click="handleConfirm"
      >
        确定
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.select-modal {
  padding: 8px 0;
}

.option-item {
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-item:hover {
  border-color: #1890ff;
  background-color: #f0f5ff;
}

.option-item.active {
  border-color: #1890ff;
  background-color: #e6f7ff;
}

.option-content {
  margin-left: 8px;
}

.option-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.option-description {
  margin-top: 4px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
