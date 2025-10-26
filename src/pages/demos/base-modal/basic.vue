<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'
import SimpleModal from './modals/SimpleModal.vue'

const resultData = ref<any>(null)

async function openBasicModal() {
  try {
    const result = await globalModal.openModal(SimpleModal, {
      title: '基础弹窗',
      width: 600,
      props: {
        title: '欢迎使用 BaseModal',
        content: '这是一个基础的弹窗示例，点击确定或取消按钮查看返回结果。',
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
    else if (error.type === 'close') {
      message.info('弹窗已关闭')
    }
  }
}

async function openCustomSizeModal() {
  try {
    await globalModal.openModal(SimpleModal, {
      title: '自定义尺寸',
      width: 800,
      height: 400,
      props: {
        title: '自定义尺寸弹窗',
        content: '这个弹窗的宽度是 800px，高度是 400px。',
      },
    })
  }
  catch {
    // ignore
  }
}

async function openCenteredModal() {
  try {
    await globalModal.openModal(SimpleModal, {
      title: '居中显示',
      width: 500,
      centered: true,
      props: {
        title: '居中弹窗',
        content: '这个弹窗会在屏幕中央显示。',
      },
    })
  }
  catch {
    // ignore
  }
}

async function openNoFooterModal() {
  try {
    await globalModal.openModal(SimpleModal, {
      title: '无底部按钮',
      width: 500,
      footer: null,
      props: {
        title: '无底部按钮',
        content: '这个弹窗没有底部按钮，只能通过右上角关闭。',
      },
    })
  }
  catch {
    // ignore
  }
}

async function openMaskClosableModal() {
  try {
    await globalModal.openModal(SimpleModal, {
      title: '点击遮罩关闭',
      width: 500,
      maskClosable: true,
      props: {
        title: '可点击遮罩关闭',
        content: '点击弹窗外的遮罩区域可以关闭弹窗。',
      },
    })
  }
  catch {
    // ignore
  }
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="基础用法"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="blue">
          基础
        </a-tag>
      </template>

      <a-alert
        message="通过 globalModal.openModal() 函数式调用打开弹窗"
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
          @click="openBasicModal"
        >
          <span class="i-carbon-popup mr-1" />
          打开基础弹窗
        </a-button>

        <a-button
          block
          @click="openCustomSizeModal"
        >
          <span class="i-carbon-fit-to-screen mr-1" />
          自定义尺寸
        </a-button>

        <a-button
          block
          @click="openCenteredModal"
        >
          <span class="i-carbon-center-circle mr-1" />
          居中显示
        </a-button>

        <a-button
          block
          @click="openNoFooterModal"
        >
          <span class="i-carbon-close-outline mr-1" />
          无底部按钮
        </a-button>

        <a-button
          block
          @click="openMaskClosableModal"
        >
          <span class="i-carbon-touch-1 mr-1" />
          点击遮罩关闭
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
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { globalModal } from '~/components/base/BaseModal'
import SimpleModal from './modals/SimpleModal.vue'

async function openModal() {
  try {
    const result = await globalModal.openModal(SimpleModal, {
      title: '基础弹窗',
      width: 600,
      props: {
        title: '欢迎',
        content: '这是内容',
      },
    })
    console.log('确认:', result.data)
  } catch (error) {
    if (error.type === 'cancel') {
      console.log('取消')
    }
  }
}
&lt;/script&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
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
