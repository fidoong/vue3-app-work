<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import { SchemaTable } from '~/components/business/SchemaTable'

// 基础表格示例
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
]

const dataSource = [
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' },
]
</script>

<template>
  <div class="p-2">
    <a-card title="基础表格">
      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
      />
    </a-card>

    <a-alert
      class="mt-4"
      message="示例说明"
      description="旧的 examples 已被移除，请参考 src/components/EXAMPLES.md 查看详细使用示例"
      type="info"
      show-icon
    />
  </div>
</template>
