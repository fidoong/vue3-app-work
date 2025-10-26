<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'
import ConfirmModal from './components/ConfirmModal.vue'
import FormModal from './components/FormModal.vue'
import SelectModal from './components/SelectModal.vue'

const { openModal, openAsyncModal } = globalModal

/**
 * 基础弹窗
 */
async function handleBasicModal() {
  try {
    const result = await openModal(ConfirmModal, {
      title: '确认操作',
      width: 400,
      props: {
        message: '确定要执行此操作吗？',
        type: 'warning',
      },
    })
    message.success(`操作成功: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消操作')
    }
  }
}

/**
 * 表单弹窗
 */
async function handleFormModal() {
  try {
    const result = await openModal(FormModal, {
      title: '编辑用户',
      width: 600,
      props: {
        userId: 123,
        initialData: {
          name: '张三',
          email: 'zhangsan@example.com',
          age: 25,
        },
      },
    })
    message.success(`保存成功: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消编辑')
    }
  }
}

/**
 * 选择弹窗
 */
async function handleSelectModal() {
  try {
    const result = await openModal(SelectModal, {
      title: '选择选项',
      width: 500,
      props: {
        options: [
          { label: '选项 1', value: '1', description: '这是选项 1 的描述' },
          { label: '选项 2', value: '2', description: '这是选项 2 的描述' },
          { label: '选项 3', value: '3', description: '这是选项 3 的描述' },
        ],
      },
    })
    message.success(`已选择: ${result.data}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消选择')
    }
  }
}

/**
 * 异步加载弹窗
 */
async function handleAsyncModal() {
  try {
    const result = await openAsyncModal(
      () => import('./components/AsyncModal.vue'),
      {
        title: '异步加载的弹窗',
        width: 600,
        props: {
          data: '这是异步加载的数据',
        },
      },
    )
    message.success(`异步弹窗返回: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消')
    }
  }
}

/**
 * 嵌套弹窗
 */
async function handleNestedModal() {
  try {
    const result = await openModal(ConfirmModal, {
      title: '第一层弹窗',
      width: 400,
      props: {
        message: '这是第一层弹窗，点击确定打开第二层',
        type: 'info',
        showNested: true,
      },
    })
    message.success(`嵌套弹窗完成: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消')
    }
  }
}

/**
 * 自定义配置弹窗
 */
async function handleCustomModal() {
  try {
    const result = await openModal(FormModal, {
      title: '自定义配置',
      width: 700,
      height: 500,
      centered: true,
      maskClosable: false,
      keyboard: false,
      okText: '提交',
      cancelText: '放弃',
      props: {
        userId: 456,
      },
    })
    message.success(`提交成功: ${JSON.stringify(result.data)}`)
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已放弃')
    }
  }
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">
        BaseModal 组件示例
      </h1>
      <p class="text-gray-600">
        函数式调用的弹窗组件，支持同步/异步加载、嵌套弹窗等功能
      </p>
    </div>

    <a-row :gutter="[16, 16]">
      <!-- 基础示例 -->
      <a-col :span="24">
        <a-card title="基础示例">
          <a-space
            :size="12"
            wrap
          >
            <a-button
              type="primary"
              @click="handleBasicModal"
            >
              基础弹窗
            </a-button>
            <a-button @click="handleFormModal">
              表单弹窗
            </a-button>
            <a-button @click="handleSelectModal">
              选择弹窗
            </a-button>
          </a-space>
        </a-card>
      </a-col>

      <!-- 高级功能 -->
      <a-col :span="24">
        <a-card title="高级功能">
          <a-space
            :size="12"
            wrap
          >
            <a-button
              type="primary"
              @click="handleAsyncModal"
            >
              异步加载弹窗
            </a-button>
            <a-button @click="handleNestedModal">
              嵌套弹窗
            </a-button>
            <a-button @click="handleCustomModal">
              自定义配置
            </a-button>
          </a-space>
        </a-card>
      </a-col>

      <!-- 使用说明 -->
      <a-col :span="24">
        <a-card title="使用说明">
          <a-descriptions
            bordered
            :column="1"
          >
            <a-descriptions-item label="基础用法">
              使用 openModal 函数打开弹窗，返回 Promise
            </a-descriptions-item>
            <a-descriptions-item label="异步加载">
              使用 openAsyncModal 函数异步加载组件
            </a-descriptions-item>
            <a-descriptions-item label="嵌套弹窗">
              在弹窗内部可以继续打开新的弹窗
            </a-descriptions-item>
            <a-descriptions-item label="返回值">
              确认返回 { data, type: 'confirm' }，取消抛出异常
            </a-descriptions-item>
          </a-descriptions>

          <a-divider />

          <h3 class="mb-4 text-lg font-semibold">
            代码示例
          </h3>
          <pre class="rounded bg-gray-100 p-4"><code>import { globalModal } from '~/components/base/BaseModal'

const { openModal } = globalModal

// 打开弹窗
async function handleOpen() {
  try {
    const result = await openModal(MyComponent, {
      title: '标题',
      width: 600,
      props: {
        data: 'test'
      }
    })
    console.log('返回结果:', result.data)
  } catch (error) {
    console.log('已取消')
  }
}</code></pre>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
