<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'
import SimpleModal from './SimpleModal.vue'

defineOptions({
  name: 'NestedModal',
})

const props = withDefaults(defineProps<Props>(), {
  level: 1,
})

interface Props {
  level?: number
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

async function openNestedModal() {
  try {
    // 使用异步导入避免循环引用
    const result = await globalModal.openModal(
    // eslint-disable-next-line import/no-self-import
      () => import('./NestedModal.vue'),
      {
        title: `第 ${props.level + 1} 层弹窗`,
        width: 600,
        props: {
          level: props.level + 1,
        },
      },
    )
    message.success(`第 ${props.level + 1} 层弹窗返回: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info(`第 ${props.level + 1} 层弹窗已取消`)
    }
  }
}

async function openSimpleModal() {
  try {
    const result = await globalModal.openModal(SimpleModal, {
      title: '简单弹窗',
      width: 500,
      props: {
        title: '这是一个嵌套的简单弹窗',
        content: `从第 ${props.level} 层弹窗打开`,
      },
    })
    message.success(`简单弹窗返回: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('简单弹窗已取消')
    }
  }
}

function handleConfirm() {
  props.confirm?.({ level: props.level, message: `第 ${props.level} 层确认` })
}

function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div class="nested-modal">
    <div class="modal-content">
      <a-alert
        :message="`当前是第 ${level} 层弹窗`"
        type="info"
        show-icon
        class="mb-4"
      />

      <p class="mb-4 text-gray-600">
        你可以在这个弹窗中继续打开新的弹窗，测试嵌套功能。
      </p>

      <a-space
        direction="vertical"
        :size="12"
        style="width: 100%"
      >
        <a-button
          block
          type="primary"
          @click="openNestedModal"
        >
          <span class="i-carbon-add mr-1" />
          打开第 {{ level + 1 }} 层弹窗
        </a-button>

        <a-button
          block
          @click="openSimpleModal"
        >
          <span class="i-carbon-popup mr-1" />
          打开简单弹窗
        </a-button>
      </a-space>
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

<style scoped>
.nested-modal {
  padding: 24px;
}

.modal-content {
  min-height: 150px;
}

.modal-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}
</style>
