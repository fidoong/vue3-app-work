<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { DatePicker, Input, message, Select } from 'ant-design-vue'
import { SearchForm } from '~/components/business/SearchForm'

const searchFormRef = ref()
const loading = ref(false)
const tableData = ref<any[]>([])

const schemas: FormItemSchema[] = [
  {
    field: 'keyword',
    label: '关键词',
    component: Input,
    componentProps: {
      placeholder: '请输入关键词',
    },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: Select,
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '全部', value: '' },
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

  // 模拟 API 请求
  setTimeout(() => {
    tableData.value = [
      { id: 1, name: '数据 1', status: 'enabled', date: '2024-01-01' },
      { id: 2, name: '数据 2', status: 'disabled', date: '2024-01-02' },
      { id: 3, name: '数据 3', status: 'enabled', date: '2024-01-03' },
    ]
    loading.value = false
    message.success('查询成功')
  }, 1000)
}

function handleReset() {
  message.info('表单已重置')
  tableData.value = []
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="基础搜索表单"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="blue">
          基础用法
        </a-tag>
      </template>

      <SearchForm
        ref="searchFormRef"
        :schemas="schemas"
        :loading="loading"
        @search="handleSearch"
        @reset="handleReset"
      />
    </a-card>

    <a-card
      title="搜索结果"
      class="demo-card mt-4"
    >
      <a-table
        :columns="[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: '名称', dataIndex: 'name', key: 'name' },
          { title: '状态', dataIndex: 'status', key: 'status' },
          { title: '日期', dataIndex: 'date', key: 'date' },
        ]"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      />
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { SearchForm } from '~/components/business/SearchForm'
import type { FormItemSchema } from '~/components/shared/types'

const schemas: FormItemSchema[] = [
  {
    field: 'keyword',
    label: '关键词',
    component: Input,
    componentProps: {
      placeholder: '请输入关键词',
    },
    colProps: { span: 8 },
  },
  // ... 更多字段
]

function handleSearch(values: Record&lt;string, any&gt;) {
  console.log('搜索条件:', values)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;SearchForm
    :schemas="schemas"
    @search="handleSearch"
    @reset="handleReset"
  /&gt;
&lt;/template&gt;</code></pre>
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
