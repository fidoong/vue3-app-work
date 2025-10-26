# 组件使用示例

## SchemaForm 表单示例

### 基础表单

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm } from '@/components'
import type { FormItemSchema } from '@/components'

const formData = ref({})

const schemas: FormItemSchema[] = [
  {
    key: 'username',
    field: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 12,
  },
  {
    key: 'email',
    field: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
    span: 12,
  },
]

function handleSubmit(values: Record<string, any>) {
  console.log('提交数据:', values)
}
</script>

<template>
  <SchemaForm
    v-model="formData"
    :schemas="schemas"
    @submit="handleSubmit"
  >
    <template #footer="{ submit, reset }">
      <a-space>
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </template>
  </SchemaForm>
</template>
```

### 动态表单

```typescript
const schemas: FormItemSchema[] = [
  {
    key: 'type',
    field: 'type',
    label: '类型',
    type: 'select',
    props: {
      options: [
        { label: '个人', value: 'personal' },
        { label: '企业', value: 'company' },
      ],
    },
  },
  {
    key: 'companyName',
    field: 'companyName',
    label: '企业名称',
    type: 'input',
    // 根据类型动态显示
    hidden: (formData) => formData.type !== 'company',
  },
]
```

## SchemaTable 表格示例

### 基础表格

```vue
<script setup lang="ts">
import { SchemaTable } from '@/components'
import type { TableColumnSchema } from '@/components'

const columns: TableColumnSchema[] = [
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
    width: 80,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
  },
]

async function loadData(params: any) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return response.json()
}
</script>

<template>
  <SchemaTable
    :columns="columns"
    :api="loadData"
    :immediate="true"
  />
</template>
```

### 带操作列的表格

```typescript
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
      title: '确认删除？',
      onConfirm: (record) => {
        console.log('删除', record)
      },
    },
  },
]
```

```vue
<SchemaTable
  :columns="columns"
  :api="loadData"
  :actions="actions"
/>
```

## SearchForm 搜索表单示例

```vue
<script setup lang="ts">
import { SearchForm } from '@/components'
import type { FormItemSchema } from '@/components'

const schemas: FormItemSchema[] = [
  {
    key: 'keyword',
    field: 'keyword',
    label: '关键词',
    type: 'input',
    placeholder: '请输入关键词',
    span: 8,
  },
  {
    key: 'status',
    field: 'status',
    label: '状态',
    type: 'select',
    props: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' },
      ],
    },
    span: 8,
  },
]

function handleSearch(values: Record<string, any>) {
  console.log('搜索参数:', values)
}
</script>

<template>
  <SearchForm
    :schemas="schemas"
    :collapsed-rows="1"
    @search="handleSearch"
  />
</template>
```

## SchemaMenu 菜单示例

```vue
<script setup lang="ts">
import { SchemaMenu } from '@/components'
import type { MenuItemSchema } from '@/components'

const menuItems: MenuItemSchema[] = [
  {
    key: 'dashboard',
    title: '仪表盘',
    path: '/dashboard',
  },
  {
    key: 'user',
    title: '用户管理',
    children: [
      {
        key: 'user-list',
        title: '用户列表',
        path: '/user/list',
      },
      {
        key: 'user-role',
        title: '角色管理',
        path: '/user/role',
      },
    ],
  },
]

function handleSelect(key: string, item: MenuItemSchema) {
  console.log('选中菜单:', key, item)
}
</script>

<template>
  <SchemaMenu
    :items="menuItems"
    mode="inline"
    @select="handleSelect"
  />
</template>
```

## BaseModal 弹窗示例

### 基础用法

```vue
<script setup lang="ts">
import { useModal } from '@/components'
import MyFormModal from './MyFormModal.vue'

const { openModal } = useModal()

async function handleOpenModal() {
  try {
    const result = await openModal(MyFormModal, {
      title: '编辑用户',
      width: 600,
      props: {
        userId: 123,
      },
    })
    console.log('弹窗返回:', result)
  }
  catch (error) {
    console.log('弹窗取消')
  }
}
</script>

<template>
  <a-button @click="handleOpenModal">打开弹窗</a-button>
</template>
```

### 弹窗组件

```vue
<!-- MyFormModal.vue -->
<script setup lang="ts">
interface Props {
  userId: number
  close?: (result?: any) => void
  confirm?: (result?: any) => void
}

const props = defineProps<Props>()

const formData = ref({})

function handleSubmit() {
  // 确认并关闭弹窗
  props.confirm?.(formData.value)
}
</script>

<template>
  <div>
    <a-form v-model="formData">
      <!-- 表单内容 -->
    </a-form>
    <div class="modal-footer">
      <a-button @click="props.close?.()">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确定</a-button>
    </div>
  </div>
</template>
```

## 使用共享工具

### 加载状态管理

```vue
<script setup lang="ts">
import { useLoading } from '@/components'

const { loading, withLoading } = useLoading()

async function loadData() {
  await withLoading(async () => {
    // 执行异步操作
    await fetch('/api/data')
  })
}
</script>

<template>
  <a-spin :spinning="loading">
    <div>内容</div>
  </a-spin>
</template>
```

### 分页管理

```vue
<script setup lang="ts">
import { usePagination } from '@/components'

const total = ref(100)
const { current, pageSize, pagination, setPage } = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total,
})
</script>

<template>
  <a-pagination v-bind="pagination" @change="setPage" />
</template>
```

### 选择管理

```vue
<script setup lang="ts">
import { useSelection } from '@/components'

const { rowSelection, getSelectedRows, clearSelection } = useSelection({
  rowKey: 'id',
})
</script>

<template>
  <a-table :row-selection="rowSelection" />
  <a-button @click="clearSelection">清空选择</a-button>
</template>
```

### 工具函数

```typescript
import { formatDate, formatCurrency, isEmail } from '@/components'

// 格式化日期
const dateStr = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 格式化货币
const price = formatCurrency(12345.67) // ¥12,345.67

// 验证邮箱
const valid = isEmail('test@example.com') // true
```
