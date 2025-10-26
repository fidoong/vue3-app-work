<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { SearchForm } from '~/components/business/SearchForm'

const searchFormRef = ref()
const loading = ref(false)
const searchParams = ref<Record<string, any>>({})

// 搜索表单配置
const searchSchemas: FormItemSchema[] = [
  {
    key: 'username',
    field: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 6,
  },
  {
    key: 'email',
    field: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    span: 6,
  },
  {
    key: 'phone',
    field: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号',
    span: 6,
  },
  {
    key: 'status',
    field: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    props: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
      allowClear: true,
    },
    span: 6,
  },
  {
    key: 'department',
    field: 'department',
    label: '部门',
    type: 'select',
    placeholder: '请选择部门',
    props: {
      options: [
        { label: '技术部', value: 'tech' },
        { label: '产品部', value: 'product' },
        { label: '运营部', value: 'operation' },
        { label: '市场部', value: 'marketing' },
      ],
      allowClear: true,
    },
    span: 6,
  },
  {
    key: 'role',
    field: 'role',
    label: '角色',
    type: 'select',
    placeholder: '请选择角色',
    props: {
      mode: 'multiple',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
        { label: '访客', value: 'guest' },
      ],
      allowClear: true,
    },
    span: 6,
  },
  {
    key: 'dateRange',
    field: 'dateRange',
    label: '创建时间',
    type: 'dateRange',
    span: 6,
  },
  {
    key: 'ageRange',
    field: 'ageRange',
    label: '年龄范围',
    slot: 'ageRange',
    span: 6,
  },
]

// 表格列配置
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
]

// 表格数据
const dataSource = ref([
  {
    id: 1,
    username: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    department: '技术部',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    username: '李四',
    email: 'lisi@example.com',
    phone: '13800138001',
    department: '产品部',
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    username: '王五',
    email: 'wangwu@example.com',
    phone: '13800138002',
    department: '运营部',
    status: 'inactive',
    createdAt: '2024-01-03',
  },
])

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 3,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

// 查询
async function handleSearch(values: Record<string, any>) {
  loading.value = true
  searchParams.value = values

  // 模拟 API 请求
  setTimeout(() => {
    message.success('查询成功')
    loading.value = false
  }, 500)
}

// 重置
function handleReset() {
  searchParams.value = {}
  pagination.value.current = 1
  message.info('已重置查询条件')
}

// 表格变化
function handleTableChange(pag: any) {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  handleSearch(searchParams.value)
}

// 新增
function handleAdd() {
  message.info('打开新增弹窗')
}

// 编辑
function handleEdit(record: any) {
  message.info(`编辑用户: ${record.username}`)
}

// 删除
function handleDelete(record: any) {
  message.warning(`删除用户: ${record.username}`)
}

// 导出
function handleExport() {
  message.info('导出数据')
}
</script>

<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <SearchForm
      ref="searchFormRef"
      :schemas="searchSchemas"
      :loading="loading"
      :collapsed-rows="2"
      @search="handleSearch"
      @reset="handleReset"
    >
      <template #ageRange="{ value, setValue }">
        <div class="flex items-center gap-2">
          <a-input-number
            :value="value?.[0]"
            placeholder="最小年龄"
            :min="0"
            :max="150"
            style="flex: 1"
            @update:value="(v: any) => setValue([v, value?.[1]])"
          />
          <span>~</span>
          <a-input-number
            :value="value?.[1]"
            placeholder="最大年龄"
            :min="0"
            :max="150"
            style="flex: 1"
            @update:value="(v: any) => setValue([value?.[0], v])"
          />
        </div>
      </template>
    </SearchForm>

    <!-- 表格 -->
    <a-card
      title="用户列表"
      :bordered="false"
    >
      <template #extra>
        <a-space>
          <a-button
            type="primary"
            @click="handleAdd"
          >
            新增
          </a-button>
          <a-button @click="handleExport">
            导出
          </a-button>
        </a-space>
      </template>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button
                type="link"
                size="small"
                @click="handleEdit(record)"
              >
                编辑
              </a-button>
              <a-button
                type="link"
                size="small"
                danger
                @click="handleDelete(record)"
              >
                删除
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
