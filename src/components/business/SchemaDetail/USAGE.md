# SchemaDetail 使用文档

SchemaDetail 是一个基于配置的详情展示组件，支持列数控制、自定义渲染、分组展示等功能。

## 基础用法

### 简单模式

```vue
<script setup lang="ts">
import { SchemaDetail } from '~/components/business'
import type { DetailItemSchema } from '~/components/business'

const data = {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  phone: '13800138000',
  address: '北京市朝阳区',
  status: 1,
}

const items: DetailItemSchema[] = [
  {
    key: 'name',
    label: '姓名',
  },
  {
    key: 'age',
    label: '年龄',
  },
  {
    key: 'email',
    label: '邮箱',
    copyable: true,
  },
  {
    key: 'phone',
    label: '手机号',
    copyable: true,
  },
  {
    key: 'address',
    label: '地址',
    span: 2, // 占据2列
  },
  {
    key: 'status',
    label: '状态',
    formatter: (value) => value === 1 ? '启用' : '禁用',
  },
]
</script>

<template>
  <SchemaDetail
    :data="data"
    :items="items"
    :column="3"
    title="用户详情"
  />
</template>
```

### 分组模式

```vue
<script setup lang="ts">
import { SchemaDetail } from '~/components/business'
import type { DetailGroupSchema } from '~/components/business'

const data = {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  company: '某某公司',
  position: '前端工程师',
  address: '北京市朝阳区',
}

const groups: DetailGroupSchema[] = [
  {
    title: '基本信息',
    key: 'basic',
    column: 2,
    bordered: true,
    items: [
      { key: 'name', label: '姓名' },
      { key: 'age', label: '年龄' },
      { key: 'email', label: '邮箱', copyable: true },
    ],
  },
  {
    title: '工作信息',
    key: 'work',
    column: 2,
    bordered: true,
    collapsible: true,
    items: [
      { key: 'company', label: '公司' },
      { key: 'position', label: '职位' },
    ],
  },
  {
    title: '其他信息',
    key: 'other',
    column: 1,
    bordered: true,
    items: [
      { key: 'address', label: '地址', span: 1 },
    ],
  },
]
</script>

<template>
  <SchemaDetail
    :data="data"
    :groups="groups"
    title="员工详情"
  />
</template>
```

## 自定义渲染

### 使用 render 函数

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Tag } from 'ant-design-vue'

const items: DetailItemSchema[] = [
  {
    key: 'status',
    label: '状态',
    render: (value) => {
      const color = value === 1 ? 'green' : 'red'
      const text = value === 1 ? '启用' : '禁用'
      return h(Tag, { color }, () => text)
    },
  },
  {
    key: 'tags',
    label: '标签',
    render: (value) => {
      if (!Array.isArray(value)) return '-'
      return h('div', { style: 'display: flex; gap: 8px' },
        value.map(tag => h(Tag, { color: 'blue' }, () => tag))
      )
    },
  },
]
</script>
```

### 使用插槽

```vue
<script setup lang="ts">
const items: DetailItemSchema[] = [
  {
    key: 'avatar',
    label: '头像',
    slot: 'avatar',
  },
  {
    key: 'status',
    label: '状态',
    slot: 'status',
  },
]
</script>

<template>
  <SchemaDetail
    :data="data"
    :items="items"
  >
    <template #avatar="{ value }">
      <a-avatar :src="value" />
    </template>

    <template #status="{ value }">
      <a-tag :color="value === 1 ? 'green' : 'red'">
        {{ value === 1 ? '启用' : '禁用' }}
      </a-tag>
    </template>
  </SchemaDetail>
</template>
```

### 使用 formatter

```vue
<script setup lang="ts">
import dayjs from 'dayjs'

const items: DetailItemSchema[] = [
  {
    key: 'createTime',
    label: '创建时间',
    formatter: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: 'price',
    label: '价格',
    formatter: (value) => `¥${value.toFixed(2)}`,
  },
]
</script>
```

## 列数控制

```vue
<template>
  <!-- 全局设置3列 -->
  <SchemaDetail
    :data="data"
    :items="items"
    :column="3"
  />

  <!-- 某个字段占据2列 -->
  <SchemaDetail
    :data="data"
    :items="[
      { key: 'name', label: '姓名' },
      { key: 'age', label: '年龄' },
      { key: 'address', label: '地址', span: 2 },
    ]"
    :column="3"
  />
</template>
```

## 其他功能

### 复制功能

```vue
<script setup lang="ts">
const items: DetailItemSchema[] = [
  {
    key: 'email',
    label: '邮箱',
    copyable: true, // 显示复制按钮
  },
]

function handleCopy(field: string, value: any) {
  console.log('复制了字段:', field, '值:', value)
}
</script>

<template>
  <SchemaDetail
    :data="data"
    :items="items"
    @copy="handleCopy"
  />
</template>
```

### 条件显示

```vue
<script setup lang="ts">
const items: DetailItemSchema[] = [
  {
    key: 'vipLevel',
    label: 'VIP等级',
    hidden: (record) => !record.isVip, // 非VIP用户不显示
  },
]
</script>
```

### 图标

```vue
<script setup lang="ts">
import { UserOutlined, MailOutlined } from '@ant-design/icons-vue'

const items: DetailItemSchema[] = [
  {
    key: 'name',
    label: '姓名',
    prefixIcon: UserOutlined,
  },
  {
    key: 'email',
    label: '邮箱',
    prefixIcon: MailOutlined,
  },
]
</script>
```

### 布局方式

```vue
<template>
  <!-- 水平布局（默认） -->
  <SchemaDetail
    :data="data"
    :items="items"
    layout="horizontal"
  />

  <!-- 垂直布局 -->
  <SchemaDetail
    :data="data"
    :items="items"
    layout="vertical"
  />
</template>
```

### 尺寸

```vue
<template>
  <SchemaDetail
    :data="data"
    :items="items"
    size="small"
  />

  <SchemaDetail
    :data="data"
    :items="items"
    size="middle"
  />

  <SchemaDetail
    :data="data"
    :items="items"
    size="large"
  />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 详情数据 | `Record<string, any>` | - |
| items | 详情项配置（简单模式） | `DetailItemSchema[]` | - |
| groups | 详情分组配置（分组模式） | `DetailGroupSchema[]` | - |
| column | 每行列数 | `number` | 3 |
| labelWidth | 标签宽度 | `number \| string` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right' \| 'center'` | 'left' |
| contentAlign | 内容对齐方式 | `'left' \| 'right' \| 'center'` | 'left' |
| bordered | 是否显示边框 | `boolean` | false |
| colon | 是否显示冒号 | `boolean` | true |
| layout | 布局方式 | `'horizontal' \| 'vertical'` | 'horizontal' |
| size | 组件大小 | `'small' \| 'middle' \| 'large'` | 'middle' |
| loading | 是否加载中 | `boolean` | false |
| title | 标题 | `string` | - |
| extra | 额外操作区域 | `string \| VNode` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| copy | 复制时触发 | `(field: string, value: any)` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 刷新数据 | - |
| getData | 获取数据 | - |
