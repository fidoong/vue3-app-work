<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'
import NestedModal from './modals/NestedModal.vue'

const resultData = ref<any>(null)

async function openNestedModal() {
  try {
    const result = await globalModal.openModal(NestedModal, {
      title: '第 1 层弹窗',
      width: 700,
      props: {
        level: 1,
      },
    })
    resultData.value = result
    message.success('弹窗已确认')
  }
  catch (error: any) {
    resultData.value = error
    if (error.type === 'cancel') {
      message.info('弹窗已取消')
    }
  }
}

function closeAllModals() {
  globalModal.closeAllModals()
  message.success('已关闭所有弹窗')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="嵌套弹窗"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="purple">
          嵌套
        </a-tag>
      </template>

      <a-alert
        message="支持在弹窗内打开新弹窗，可以无限嵌套"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-space
        direction="vertical"
        :size="12"
        style="width: 100%"
      >
        <a-button
          type="primary"
          block
          @click="openNestedModal"
        >
          <span class="i-carbon-layers mr-1" />
          打开嵌套弹窗
        </a-button>

        <a-button

          danger
          block
          @click="closeAllModals"
        >
          <span class="i-carbon-close-filled mr-1" />
          关闭所有弹窗
        </a-button>
      </a-space>
    </a-card>

    <a-card
      v-if="resultData"
      title="返回结果"
      class="demo-card mt-4"
    >
      <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
    </a-card>

    <a-card
      title="功能说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="嵌套层级">
          理论上支持无限层级嵌套
        </a-descriptions-item>
        <a-descriptions-item label="层级管理">
          自动管理父子关系和 z-index
        </a-descriptions-item>
        <a-descriptions-item label="关闭行为">
          关闭父弹窗时，子弹窗也会自动关闭
        </a-descriptions-item>
        <a-descriptions-item label="上下文隔离">
          每个弹窗都有独立的上下文
        </a-descriptions-item>
        <a-descriptions-item label="批量关闭">
          支持一键关闭所有弹窗
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { globalModal } from '~/components/base/BaseModal'

// 在弹窗组件内部打开新弹窗
async function openNested() {
  const result = await globalModal.openModal(AnotherModal, {
    title: '嵌套弹窗',
    width: 600,
  })
}

// 关闭所有弹窗
function closeAll() {
  globalModal.closeAllModals()
}
&lt;/script&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 24px;
}

.demo-card {
  margin-bottom: 16px;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}
</style>
