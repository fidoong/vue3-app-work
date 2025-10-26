<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import type { ApiResponse, QueryParams } from '~/components/shared/types'
import { message } from 'ant-design-vue'
import { SchemaTable } from '~/components/business/SchemaTable'

interface User {
  id: number
  name: string
  age: number
  email: string
  department: string
  createTime: string
}

const tableRef = ref()
const selectedRows = ref<User[]>([])

// 模拟 API 数据
const mockData: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  email: `user${i + 1}@example.com`,
  department: ['技术部', '产品部', '运营部', '市场部'][Math.floor(Math.random() * 4)],
  createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
}))

// 模拟 API 请求
async function fetchUsers(params: QueryParams): Promise<ApiResponse<User>> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  const { page = 1, pageSize = 10, sortField, sortOrder } = params

  const filteredData = [...mockData]

  // 排序
  if (sortField && sortOrder) {
    filteredData.sort((a, b) => {
      const aValue = a[sortField as keyof User]
      const bValue = b[sortField as keyof User]

      if (sortOrder === 'ascend') {
        return aValue > bValue ? 1 : -1
      }
      else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  // 分页
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const data = filteredData.slice(start, end)

  return {
    data,
    total: filteredData.length,
    page,
    pageSize,
  }
}

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
    sorter: true,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
  },
  {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
    sorter: true,
  },
]

function handleRefresh(data: User[]) {
  message.success(`刷新成功，共 ${data.length} 条数据`)
}

function handleError(error: Error) {
  message.error(`加载失败: ${error.message}`)
}

function handleBatchDelete() {
  message.success(`批量删除 ${selectedRows.value.length} 条数据`)
  selectedRows.value = []
}

function handleExport() {
  message.success('导出数据')
}

const toolbar = {
  left: [
    {
      text: '新增',
      type: 'primary' as const,
      onClick: () => {
        message.info('打开新增弹窗')
      },
    },
    {
      text: '批量删除',
      type: 'default' as const,
      danger: true,
      disabled: () => selectedRows.value.length === 0,
      onClick: handleBatchDelete,
      confirm: {
        title: '确认删除',
        content: '确定要删除选中的数据吗？',
        onConfirm: handleBatchDelete,
      },
    },
  ],
  right: [
    {
      text: '导出',
      type: 'default' as const,
      onClick: handleExport,
    },
  ],
  showRefresh: true,
  showReset: true,
}

const rowSelection = {
  selectedRowKeys: computed(() => selectedRows.value.map(r => r.id)),
  onChange: (_keys: number[], rows: User[]) => {
    selectedRows.value = rows
  },
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="API 数据表格"
      class="demo-card"
    >
      <template #extra>
        <a-space>
          <a-tag color="green">
            API
          </a-tag>
          <a-button
            size="small"
            @click="tableRef?.refresh()"
          >
            <span class="i-carbon-renew mr-1" />
            刷新
          </a-button>
          <a-button
            size="small"
            @click="tableRef?.reset()"
          >
            <span class="i-carbon-reset mr-1" />
            重置
          </a-button>
        </a-space>
      </template>

      <a-alert
        message="从 API 加载数据，支持分页、排序、工具栏等功能"
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
        />
      </div>

      <SchemaTable
        ref="tableRef"
        :columns="columns"
        :api="fetchUsers"
        :toolbar="toolbar"
        :row-selection="rowSelection"
        :pagination="{
          pageSize: 10,
          showTotal: (total: number) => `共 ${total} 条数据`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }"
        @refresh="handleRefresh"
        @error="handleError"
      />
    </a-card>

    <a-card
      title="功能说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="API 函数">
          接收 QueryParams 参数，返回 ApiResponse 数据
        </a-descriptions-item>
        <a-descriptions-item label="自动分页">
          自动处理分页参数，无需手动管理
        </a-descriptions-item>
        <a-descriptions-item label="排序">
          点击列标题排序，自动传递排序参数给 API
        </a-descriptions-item>
        <a-descriptions-item label="刷新">
          refresh() 保持当前页和参数刷新数据
        </a-descriptions-item>
        <a-descriptions-item label="重置">
          reset() 清除所有参数，恢复到初始状态
        </a-descriptions-item>
        <a-descriptions-item label="工具栏">
          支持左右两侧按钮配置，内置刷新和重置按钮
        </a-descriptions-item>
        <a-descriptions-item label="批量操作">
          配合行选择实现批量删除、导出等功能
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { SchemaTable } from '~/components/business/SchemaTable'
import type { ApiResponse, QueryParams } from '~/components/shared/types'

// API 函数
async function fetchData(params: QueryParams): Promise&lt;ApiResponse&gt; {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return response.json()
}

const tableRef = ref()
const selectedRows = ref([])

// 工具栏配置
const toolbar = {
  left: [
    {
      text: '新增',
      type: 'primary',
      onClick: () => console.log('新增'),
    },
    {
      text: '批量删除',
      danger: true,
      disabled: () => selectedRows.value.length === 0,
      confirm: {
        title: '确认删除',
        onConfirm: () => console.log('删除'),
      },
    },
  ],
  right: [
    {
      text: '导出',
      onClick: () => console.log('导出'),
    },
  ],
  showRefresh: true,
  showReset: true,
}

// 行选择
const rowSelection = {
  selectedRowKeys: computed(() => selectedRows.value.map(r => r.id)),
  onChange: (keys, rows) => {
    selectedRows.value = rows
  },
}
&lt;/script&gt;

&lt;template&gt;
  &lt;SchemaTable
    ref="tableRef"
    :columns="columns"
    :api="fetchData"
    :toolbar="toolbar"
    :row-selection="rowSelection"
    @refresh="handleRefresh"
    @error="handleError"
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
