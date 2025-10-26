<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'

const loading = ref(false)
const resultData = ref<any>(null)

async function openAsyncModal() {
  try {
    loading.value = true
    const result = await globalModal.openAsyncModal(
      () => import('./modals/SimpleModal.vue'),
      {
        title: '异步加载弹窗',
        width: 600,
        props: {
          title: '异步加载成功',
          content: '这个弹窗组件是通过动态 import 异步加载的。',
        },
      },
    )
    resultData.value = result
    message.success('弹窗已确认')
  }
  catch (error: any) {
    resultData.value = error
    if (error.type === 'cancel') {
      message.info('弹窗已取消')
    }
  }
  finally {
    loading.value = false
  }
}

async function openFormModal() {
  try {
    loading.value = true
    const result = await globalModal.openAsyncModal(
      () => import('./modals/FormModal.vue'),
      {
        title: '异步表单弹窗',
        width: 700,
        props: {
          mode: 'create',
        },
      },
    )
    resultData.value = result
    message.success('表单提交成功')
  }
  catch (error: any) {
    resultData.value = error
    if (error.type === 'cancel') {
      message.info('表单已取消')
    }
  }
  finally {
    loading.value = false
  }
}

async function preloadAndOpen() {
  try {
    loading.value = true
    message.loading('预加载组件中...', 1)

    // 预加载组件
    await globalModal.preloadComponent(() => import('./modals/SimpleModal.vue'))

    message.success('预加载完成')

    // 打开预加载的组件（会更快）
    const result = await globalModal.openAsyncModal(
      () => import('./modals/SimpleModal.vue'),
      {
        title: '预加载弹窗',
        width: 600,
        props: {
          title: '预加载成功',
          content: '这个组件已经预加载，打开速度更快。',
        },
      },
    )
    resultData.value = result
  }
  catch (error: any) {
    resultData.value = error
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="异步加载"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="green">
          异步
        </a-tag>
      </template>

      <a-alert
        message="使用 openAsyncModal() 异步加载弹窗组件，减少初始包体积"
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
          :loading="loading"
          @click="openAsyncModal"
        >
          <span class="i-carbon-cloud-upload mr-1" />
          异步加载弹窗
        </a-button>

        <a-button
          block
          :loading="loading"
          @click="openFormModal"
        >
          <span class="i-carbon-document mr-1" />
          异步加载表单弹窗
        </a-button>

        <a-button
          block
          :loading="loading"
          @click="preloadAndOpen"
        >
          <span class="i-carbon-download mr-1" />
          预加载后打开
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

// 异步加载
async function openAsync() {
  const result = await globalModal.openAsyncModal(
    () => import('./MyModal.vue'),
    {
      title: '异步弹窗',
      width: 600,
    }
  )
}

// 预加载
async function preload() {
  await globalModal.preloadComponent(
    () => import('./MyModal.vue')
  )

  // 后续打开会更快
  await globalModal.openAsyncModal(
    () => import('./MyModal.vue'),
    { title: '预加载弹窗' }
  )
}
&lt;/script&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="优势说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="按需加载">
          只在需要时才加载弹窗组件，减少初始包体积
        </a-descriptions-item>
        <a-descriptions-item label="预加载">
          可以提前加载组件，提升用户体验
        </a-descriptions-item>
        <a-descriptions-item label="缓存">
          已加载的组件会被缓存，再次打开无需重新加载
        </a-descriptions-item>
        <a-descriptions-item label="适用场景">
          大型弹窗、低频使用的弹窗、包含复杂依赖的弹窗
        </a-descriptions-item>
      </a-descriptions>
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
