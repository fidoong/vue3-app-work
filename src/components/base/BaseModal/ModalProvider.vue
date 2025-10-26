<script setup lang="ts">
import type { ModalCloseType } from './types'
import { ModalContainer } from './components'
import { globalModal } from './composables/useModal'

const { modalInstances, closeModal } = globalModal

// 将 Map 转换为数组以确保响应式更新
const instanceList = computed(() => Array.from(modalInstances.values()))

function handleClose(instanceId: string, result?: any, type?: string) {
  closeModal(instanceId, result, type as ModalCloseType)
}
</script>

<template>
  <div class="modal-provider">
    <!-- 渲染所有弹窗实例 -->
    <ModalContainer
      v-for="instance in instanceList"
      :key="instance.id"
      :instance="instance"
      @close="(result, type) => handleClose(instance.id, result, type)"
    />
  </div>
</template>
