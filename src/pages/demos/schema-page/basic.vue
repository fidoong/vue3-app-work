<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import type { FormItemSchema } from '~/components/shared/types'
import { Badge, message, Tag } from 'ant-design-vue'
import { SchemaPage } from '~/components/business/SchemaPage'

interface UserRecord {
  id: number
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: number
  createdAt: string
}

const pageRef = ref()

// 搜索表单配置
const searchSchemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '用户名',
    type: 'input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入用户名',
      allowClear: true,
    },
  },
  {
    field: 'email',
    label: '邮箱',
    type: 'input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入邮箱',
      allowClear: true,
    },
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择状态',
      allowClear: true,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'phone',
    label: '手机号',
    type: 'input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入手机号',
      allowClear: true,
    },
  },
  {
    field: 'department',
    label: '部门',
    type: 'input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入部门',
      allowClear: true,
    },
  },
  {
    field: 'role',
    label: '角色',
    type: 'select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择角色',
      allowClear: true,
      options: [
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
        { label: '访客', value: 'guest' },
      ],
    },
  },
]

// 表格列配置
const tableColumns: TableColumnSchema<UserRecord>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    key: 'name',
    title: '用户名',
    dataIndex: 'name',
    width: 150,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 220,
  },
  {
    key: 'phone',
    title: '手机号',
    dataIndex: 'phone',
    width: 140,
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
  },
  {
    key: 'role',
    title: '角色',
    dataIndex: 'role',
    width: 120,
    render: ({ value }) => {
      const roleMap: Record<string, { text: string, color: string }> = {
        admin: { text: '管理员', color: 'red' },
        user: { text: '普通用户', color: 'blue' },
        guest: { text: '访客', color: 'default' },
      }
      const role = roleMap[value] || { text: value, color: 'default' }
      return h(Tag, { color: role.color }, () => role.text)
    },
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: ({ value }) => {
      return h(
        Badge,
        {
          status: value === 1 ? 'success' : 'default',
          text: value === 1 ? '启用' : '禁用',
        },
      )
    },
  },
  {
    key: 'createdAt',
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
]

// 模拟数据库
const mockDatabase = ref<UserRecord[]>(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `138${String(i + 1).padStart(8, '0')}`,
    department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
    role: ['admin', 'user', 'guest'][i % 3],
    status: Math.random() > 0.3 ? 1 : 0,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })),
)

// 模拟 API
async function fetchList(params: any) {
  await new Promise(resolve => setTimeout(resolve, 500))

  const page = params.page || 1
  const pageSize = params.pageSize || 10

  let filteredData = [...mockDatabase.value]

  // 应用搜索过滤
  if (params.name) {
    filteredData = filteredData.filter(item => item.name.includes(params.name))
  }
  if (params.email) {
    filteredData = filteredData.filter(item => item.email.includes(params.email))
  }
  if (params.phone) {
    filteredData = filteredData.filter(item => item.phone.includes(params.phone))
  }
  if (params.department) {
    filteredData = filteredData.filter(item => item.department.includes(params.department))
  }
  if (params.role) {
    filteredData = filteredData.filter(item => item.role === params.role)
  }
  if (params.status !== undefined && params.status !== null) {
    filteredData = filteredData.filter(item => item.status === params.status)
  }

  const total = filteredData.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const data = filteredData.slice(start, end)

  return { data, total }
}

// 操作处理函数
async function handleAdd() {
  message.info('打开新增用户弹窗')
  // TODO: 使用 globalModal 打开表单弹窗
}

async function handleEdit(record: UserRecord) {
  message.info(`编辑用户: ${record.name}`)
  // TODO: 使用 globalModal 打开编辑弹窗
}

async function handleDelete(record: UserRecord) {
  // 从模拟数据库中删除
  const index = mockDatabase.value.findIndex(item => item.id === record.id)
  if (index > -1) {
    mockDatabase.value.splice(index, 1)
    message.success(`删除用户成功: ${record.name}`)
    // 刷新表格
    pageRef.value?.refresh()
  }
}

async function handleView(record: UserRecord) {
  message.info(`查看用户详情: ${record.name}`)
  // TODO: 使用 globalModal 打开详情弹窗
}

async function handleBatchDelete() {
  const selectedRows = pageRef.value?.getSelectedRows() || []
  if (selectedRows.length === 0) {
    message.warning('请先选择要删除的用户')
    return
  }

  // 从模拟数据库中批量删除
  selectedRows.forEach((record: UserRecord) => {
    const index = mockDatabase.value.findIndex(item => item.id === record.id)
    if (index > -1) {
      mockDatabase.value.splice(index, 1)
    }
  })

  message.success(`批量删除成功，共删除 ${selectedRows.length} 条记录`)
  pageRef.value?.clearSelection()
  pageRef.value?.refresh()
}

async function handleExport() {
  const data = pageRef.value?.getData() || []
  message.success(`导出成功，共 ${data.length} 条记录`)
}
</script>

<template>
  <div class="">
    <a-alert
      message="SchemaPage 基础示例"
      type="info"
      show-icon
      closable
      class="mb-4"
    >
      <template #description>
        <div>
          <p class="mb-2">
            SchemaPage 是 SearchForm + SchemaTable 的组合组件，专注于快速构建 CRUD 页面。
          </p>
          <ul class="list-disc pl-4">
            <li>搜索表单：一行3个字段（span=8），操作按钮跟在最后一个字段后面，默认折叠显示1行</li>
            <li>数据表格：直接透传 SchemaTable 的所有功能</li>
            <li>工具栏操作：支持新增、批量删除、导出等操作</li>
            <li>行操作：支持查看、编辑、删除等操作，带确认提示</li>
            <li>实时搜索：搜索条件变化时自动刷新表格数据</li>
          </ul>
        </div>
      </template>
    </a-alert>

    <SchemaPage
      ref="pageRef"
      :search-schemas="searchSchemas"
      :table-columns="tableColumns"
      :api="fetchList"
      :search-collapsed-rows="1"
      :search-action-span="8"
      row-key="id"
      :row-selection="{}"
      :toolbar="{
        left: [
          {
            text: '新增用户',
            type: 'primary',
            onClick: handleAdd,
          },
          {
            text: '批量删除',
            danger: true,
            onClick: handleBatchDelete,
          },
          {
            text: '导出数据',
            onClick: handleExport,
          },
        ],
        showRefresh: true,
      }"
      :actions="[
        {
          text: '查看',
          onClick: handleView,
        },
        {
          text: '编辑',
          type: 'link',
          onClick: handleEdit,
        },
        {
          text: '删除',
          type: 'link',
          danger: true,
          confirm: {
            title: '确认删除',
            content: '确定要删除该用户吗？此操作不可恢复。',
            onConfirm: handleDelete,
          },
        },
      ]"
    />
  </div>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.pl-4 {
  padding-left: 16px;
}
</style>
