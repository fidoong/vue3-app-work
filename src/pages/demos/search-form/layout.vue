<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { DatePicker, Input, message, Select } from 'ant-design-vue'
import { SearchForm } from '~/components/business/SearchForm'

const loading = ref(false)
const layout = ref<'horizontal' | 'vertical' | 'inline'>('horizontal')
const actionPosition = ref<'inline' | 'footer'>('inline')

const schemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: Input,
    componentProps: { placeholder: '请输入名称' },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: Select,
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'date',
    label: '日期',
    component: DatePicker,
    componentProps: {
      placeholder: '请选择日期',
      style: { width: '100%' },
    },
    colProps: { span: 8 },
  },
]

function handleSearch(values: Record<string, any>) {
  loading.value = true
  message.info(`搜索条件: ${JSON.stringify(values)}`)

  setTimeout(() => {
    loading.value = false
    message.success('查询成功')
  }, 1000)
}

function handleReset() {
  message.info('表单已重置')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="表单布局配置"
      class="demo-card"
    >
      <a-space :size="16">
        <div>
          <span class="mr-2">表单布局:</span>
          <a-radio-group
            v-model:value="layout"
            button-style="solid"
          >
            <a-radio-button value="horizontal">
              水平
            </a-radio-button>
            <a-radio-button value="vertical">
              垂直
            </a-radio-button>
            <a-radio-button value="inline">
              行内
            </a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <span class="mr-2">按钮位置:</span>
          <a-radio-group
            v-model:value="actionPosition"
            button-style="solid"
          >
            <a-radio-button value="inline">
              行内
            </a-radio-button>
            <a-radio-button value="footer">
              底部
            </a-radio-button>
          </a-radio-group>
        </div>
      </a-space>
    </a-card>

    <a-card
      title="搜索表单"
      class="demo-card mt-4"
    >
      <template #extra>
        <a-tag :color="layout === 'horizontal' ? 'blue' : layout === 'vertical' ? 'green' : 'orange'">
          {{ layout === 'horizontal' ? '水平布局' : layout === 'vertical' ? '垂直布局' : '行内布局' }}
        </a-tag>
      </template>

      <SearchForm
        :schemas="schemas"
        :layout="layout"
        :loading="loading"
        :action-position="actionPosition"
        :label-col="layout === 'horizontal' ? { span: 6 } : undefined"
        :wrapper-col="layout === 'horizontal' ? { span: 18 } : undefined"
        @search="handleSearch"
        @reset="handleReset"
      />
    </a-card>

    <a-card
      title="布局说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="horizontal">
          <div>水平布局，标签和表单控件水平排列</div>
          <div class="mt-1 text-sm text-gray-500">
            适合字段较少、标签文字较长的场景
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="vertical">
          <div>垂直布局，标签和表单控件垂直排列</div>
          <div class="mt-1 text-sm text-gray-500">
            适合字段较多、需要紧凑显示的场景
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="inline">
          <div>行内布局，表单项在一行内排列</div>
          <div class="mt-1 text-sm text-gray-500">
            适合字段少、快速筛选的场景
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="actionPosition: inline">
          <div>操作按钮与表单字段在同一行</div>
          <div class="mt-1 text-sm text-gray-500">
            节省垂直空间，适合大多数场景
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="actionPosition: footer">
          <div>操作按钮在表单底部居中显示</div>
          <div class="mt-1 text-sm text-gray-500">
            适合字段较多、需要明确操作区域的场景
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;SearchForm
        :schemas="schemas"
        layout="horizontal"
        action-position="inline"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @search="handleSearch"
        @reset="handleReset"
        /&gt;</code></pre>
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
