<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import type { ButtonConfig } from '~/components/shared/types'
import { message } from 'ant-design-vue'
import { SchemaTable } from '~/components/business/SchemaTable'

interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const dataSource = ref<User[]>([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'active' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 'inactive' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 'active' },
])

const columns: TableColumnSchema<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    slot: 'status',
  },
]

const actions: ButtonConfig<User>[] = [
  {
    text: '编辑',
    type: 'link',
    onClick: (record) => {
      message.info(`编辑: ${record.name}`)
    },
  },
  {
    text: '删除',
    type: 'link',
    danger: true,
    confirm: {
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      onConfirm: (record) => {
        const index = dataSource.value.findIndex(item => item.id === record.id)
        if (index !== -1) {
          dataSource.value.splice(index, 1)
          message.success('删除成功')
        }
      },
    },
  },
  {
    text: '详情',
    type: 'link',
    onClick: (record) => {
      message.info(`查看详情: ${record.name}`)
    },
  },
]
</script>

<template>
  <div class="demo-container">
    <a-card
      title="操作列表格"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="purple">
          操作列
        </a-tag>
      </template>

      <a-alert
        message="通过 actions 配置快速添加操作列"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :actions="actions"
        :actions-width="200"
        actions-title="操作"
        actions-fixed="right"
        :pagination="false"
      >
        <template #status="{ value }">
          <a-tag :color="value === 'active' ? 'green' : 'red'">
            {{ value === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>
      </SchemaTable>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import type { ButtonConfig } from '~/components/shared/types'

const actions: ButtonConfig[] = [
  {
    text: '编辑',
    type: 'link',
    onClick: (record) => {
      console.log('编辑', record)
    },
  },
  {
    text: '删除',
    type: 'link',
    danger: true,
    confirm: {
      title: '确认删除',
      content: '确定要删除吗？',
      onConfirm: (record) => {
        // 删除逻辑
      },
    },
  },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;SchemaTable
    :columns="columns"
    :data-source="dataSource"
    :actions="actions"
    :actions-width="200"
    :actions-fixed="right"
  /&gt;
&lt;/template&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="配置说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="actions">
          操作按钮配置数组
        </a-descriptions-item>
        <a-descriptions-item label="actionsWidth">
          操作列宽度
        </a-descriptions-item>
        <a-descriptions-item label="actionsTitle">
          操作列标题
        </a-descriptions-item>
        <a-descriptions-item label="actionsFixed">
          操作列是否固定（left/right）
        </a-descriptions-item>
        <a-descriptions-item label="confirm">
          配置确认弹窗，避免误操作
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
