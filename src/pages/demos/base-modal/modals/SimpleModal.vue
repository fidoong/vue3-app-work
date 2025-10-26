<script setup lang="ts">
interface Props {
  title?: string
  content?: string
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  title: '提示',
  content: '这是一个简单的弹窗',
})

function handleConfirm() {
  props.confirm?.({ success: true, message: '确认成功' })
}

function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div class="simple-modal">
    <div class="modal-content">
      <h3 class="mb-4 text-lg font-semibold">
        {{ title }}
      </h3>
      <p class="text-gray-600">
        {{ content }}
      </p>
    </div>

    <div class="modal-footer">
      <a-space>
        <a-button @click="handleCancel">
          取消
        </a-button>
        <a-button
          type="primary"
          @click="handleConfirm"
        >
          确定
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.simple-modal {
  padding: 24px;
}

.modal-content {
  min-height: 100px;
}

.modal-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}
</style>
