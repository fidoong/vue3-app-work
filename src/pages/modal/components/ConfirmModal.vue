<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { globalModal } from '~/components/base/BaseModal'

interface Props {
  message: string
  type?: 'info' | 'warning' | 'error' | 'success'
  showNested?: boolean
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  showNested: false,
})

const iconMap = {
  info: 'i-carbon-information',
  warning: 'i-carbon-warning',
  error: 'i-carbon-error',
  success: 'i-carbon-checkmark',
}

const colorMap = {
  info: '#1890ff',
  warning: '#faad14',
  error: '#ff4d4f',
  success: '#52c41a',
}

/**
 * 确认
 */
async function handleConfirm() {
  if (props.showNested) {
    // 打开嵌套弹窗 - 使用当前组件实例
    try {
      const instance = getCurrentInstance()
      const ConfirmModal = instance?.type

      if (ConfirmModal) {
        const result = await globalModal.openModal(ConfirmModal, {
          title: '第二层弹窗',
          width: 400,
          props: {
            message: '这是第二层弹窗',
            type: 'success',
          },
        })
        props.confirm?.({ nested: result.data, message: '嵌套弹窗完成' })
      }
      else {
        props.confirm?.({ confirmed: true, timestamp: Date.now() })
      }
    }
    catch {
      props.cancel?.()
    }
  }
  else {
    props.confirm?.({ confirmed: true, timestamp: Date.now() })
  }
}

/**
 * 取消
 */
function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div class="confirm-modal">
    <div class="flex items-start gap-4">
      <div
        class="flex-shrink-0"
        :style="{ color: colorMap[type] }"
      >
        <span
          :class="iconMap[type]"
          class="text-3xl"
        />
      </div>
      <div class="flex-1">
        <p class="text-base">
          {{ message }}
        </p>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <a-button @click="handleCancel">
        取消
      </a-button>
      <a-button
        type="primary"
        @click="handleConfirm"
      >
        确定
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.confirm-modal {
  padding: 8px 0;
}
</style>
