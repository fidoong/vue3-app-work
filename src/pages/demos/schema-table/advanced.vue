<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import { SchemaTable } from '~/components/business/SchemaTable'

interface User {
  id: number
  name: string
  age: number
  email: string
  department: string
  description: string
}

const dataSource: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  email: `user${i + 1}@example.com`,
  department: ['技术部', '产品部', '运营部'][Math.floor(Math.random() * 3)],
  description: `这是用户${i + 1}的详细描述信息，包含更多的个人资料和工作经历。`,
}))

const columns: TableColumnSchema<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    fixed: 'left',
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
  },
  {
    key: 'description',
    title: '描述',
    dataIndex: 'description',
    width: 300,
  },
]

const selectedRowKeys = ref<number[]>([])
const selectedRows = ref<User[]>([])

const rowSelection = {
  selectedRowKeys,
  onChange: (keys: number[], rows: User[]) => {
    selectedRowKeys.value = keys
    selectedRows.value = rows
  },
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="高级功能"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="orange">
          高级
        </a-tag>
      </template>

      <a-alert
        message="包含排序、固定列、行选择、展开行等高级功能"
        type="info"
        show-icon
        class="mb-4"
      />

      <div
        v-if="selectedRows.length > 0"
        class="mb-4"
      >
        <a-alert
          :message="`已选择 ${selectedRows.length} 条数据`"
          type="success"
          show-icon
          closable
        >
          <template #description>
            <div>
              选中的用户: {{ selectedRows.map(r => r.name).join(', ') }}
            </div>
          </template>
        </a-alert>
      </div>

      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :scroll="{ x: 1000, y: 400 }"
        :striped="true"
        bordered
        :pagination="{
          pageSize: 5,
          showTotal: (total: number) => `共 ${total} 条`,
        }"
        :expanded-row-render="({ record }) => {
          return h('div', { style: { padding: '16px', background: '#fafafa' } }, [
            h('p', `详细信息: ${record.description}`),
            h('p', `邮箱: ${record.email}`),
            h('p', `部门: ${record.department}`),
          ])
        }"
      />
    </a-card>

    <a-card
      title="功能说明"
      class="demo-card mt-4"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-card
            size="small"
            title="排序"
          >
            <p>点击列标题进行排序，支持升序和降序</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="固定列"
          >
            <p>ID 和姓名列固定在左侧，横向滚动时不会移动</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="行选择"
          >
            <p>支持单选和多选，可获取选中的行数据</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="展开行"
          >
            <p>点击展开图标查看行的详细信息</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="斑马纹"
          >
            <p>奇偶行使用不同背景色，提高可读性</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="滚动"
          >
            <p>支持横向和纵向滚动，适应不同屏幕尺寸</p>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
const rowSelection = {
  selectedRowKeys: ref([]),
  onChange: (keys, rows) => {
    console.log('选中:', keys, rows)
  },
}
&lt;/script&gt;

&lt;template&gt;
  &lt;SchemaTable
    :columns="columns"
    :data-source="dataSource"
    :row-selection="rowSelection"
    :scroll="{ x: 1000, y: 400 }"
    :striped="true"
    bordered
    :expanded-row-render="({ record }) => {
      return h('div', '详细信息')
    }"
  /&gt;
&lt;/template&gt;</code></pre>
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
