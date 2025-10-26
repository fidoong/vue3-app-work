<script setup lang="ts">
import type { ModalInstance } from '../types'

interface Props {
  instance: ModalInstance
}

defineProps<Props>()

const emit = defineEmits<{
  close: [result?: any, type?: string]
}>()

/**
 * 关闭弹窗
 */
function handleClose(result?: any, type = 'close') {
  emit('close', result, type)
}

/**
 * 确认
 */
function handleConfirm(result?: any) {
  emit('close', result, 'confirm')
}

/**
 * 取消
 */
function handleCancel(result?: any) {
  emit('close', result, 'cancel')
}
</script>

<template>
  <a-modal
    :open="instance.visible"
    :title="instance.options.title"
    :width="instance.options.width"
    :mask="instance.options.mask"
    :mask-closable="instance.options.maskClosable"
    :closable="instance.options.closable"
    :footer="instance.options.footer"
    :ok-text="instance.options.okText"
    :cancel-text="instance.options.cancelText"
    :ok-type="instance.options.okType"
    :confirm-loading="instance.options.confirmLoading"
    :z-index="instance.options.zIndex"
    :wrap-class-name="instance.options.wrapClassName"
    :body-style="instance.options.bodyStyle"
    :centered="instance.options.centered"
    :destroy-on-close="instance.options.destroyOnClose"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <component
      :is="instance.component"
      v-bind="instance.options.props"
      :modal-id="instance.id"
      :close="handleClose"
      :confirm="handleConfirm"
      :cancel="handleCancel"
    />
  </a-modal>
</template>
