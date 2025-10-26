<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import { SchemaTable } from '~/components/business/SchemaTable'

interface User {
  id: number
  name: string
  age: number
  email: string
  address: string
  status: 'active' | 'inactive'
}

const dataSource: User[] = [
  {
    id: 1,
    name: '张三',
    age: 28,
    email: 'zhangsan@example.com',
    address: '北京市朝阳区',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    email: 'lisi@example.com',
    address: '上海市浦东新区',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    email: 'wangwu@example.com',
    address: '广州市天河区',
    status: 'inactive',
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    email: 'zhaoliu@example.com',
    address: '深圳市南山区',
    status: 'active',
  },
  {
    id: 5,
    name: '钱七',
    age: 29,
    email: 'qianqi@example.com',
    address: '杭州市西湖区',
    status: 'inactive',
  },
]

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
    width: 120,
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 100,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    key: 'address',
    title: '地址',
    dataIndex: 'address',
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    slot: 'status',
  },
]
</script>

<template>
  <div class="demo-container">
    <a-card
      title="基础表格"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="blue">
          基础
        </a-tag>
      </template>

      <a-alert
        message="使用静态数据源的基础表格示例"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
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
      title="带分页"
      class="demo-card mt-4"
    >
      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="{
          pageSize: 3,
          showTotal: (total: number) => `共 ${total} 条数据`,
        }"
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
import { SchemaTable } from '~/components/business/SchemaTable'
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'

const columns: TableColumnSchema[] = [
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
  // ... 更多列
]

const dataSource = [
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;SchemaTable
    :columns="columns"
    :data-source="dataSource"
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
