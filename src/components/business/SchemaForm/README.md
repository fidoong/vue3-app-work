# SchemaForm 组件

基于配置驱动的动态表单组件，支持灵活的表单项配置和验证。

## 特性

- 📝 **配置驱动**：通过 JSON Schema 配置生成表单
- 🎯 **类型安全**：完整的 TypeScript 类型支持
- 🔄 **动态联动**：支持字段间的动态联动
- ✅ **表单验证**：集成 Ant Design Vue 验证规则
- 🎨 **灵活渲染**：支持自定义渲染、插槽和组件
- 📦 **开箱即用**：内置常用表单组件映射

## 基础用法

```vue
<script setup lang="ts">
import { SchemaForm } from '@/components/business/SchemaForm'
import type { FormItemSchema } from '@/components/shared/types'

const formData = ref({})

const schemas: FormItemSchema[] = [
  {
    field: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 12,
  },
  {
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

## 支持的组件类型

- `input` - 输入框
- `textarea` - 文本域
- `password` - 密码输入框
- `number` - 数字输入框
- `select` - 下拉选择
- `radio` - 单选框组
- `checkbox` - 多选框组
- `date` - 日期选择器
- `dateRange` - 日期范围选择器
- `time` - 时间选择器
- `timeRange` - 时间范围选择器
- `switch` - 开关
- `slider` - 滑块
- `rate` - 评分
- `upload` - 上传
- `cascader` - 级联选择
- `treeSelect` - 树选择
- `custom` - 自定义组件

## 动态配置

### 动态显示/隐藏

```typescript
const schemas: FormItemSchema[] = [
  {
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
    field: 'companyName',
    label: '企业名称',
    type: 'input',
    // 根据类型字段动态显示
    hidden: (formData) => formData.type !== 'company',
  },
]
```

### 动态禁用

```typescript
const schemas: FormItemSchema[] = [
  {
    field: 'agree',
    label: '同意协议',
    type: 'checkbox',
  },
  {
    field: 'submit',
    label: '提交',
    type: 'input',
    // 根据是否同意协议动态禁用
    disabled: (formData) => !formData.agree,
  },
]
```

### 动态属性

```typescript
const schemas: FormItemSchema[] = [
  {
    field: 'city',
    label: '城市',
    type: 'select',
    // 根据省份动态加载城市列表
    props: (formData) => ({
      options: getCitiesByProvince(formData.province),
    }),
  },
]
```

## 自定义渲染

### 使用渲染函数

```typescript
const schemas: FormItemSchema[] = [
  {
    field: 'custom',
    label: '自定义',
    render: ({ value, setValue }) => {
      return h('div', [
        h('span', `当前值: ${value}`),
        h('button', { onClick: () => setValue(value + 1) }, '增加'),
      ])
    },
  },
]
```

### 使用插槽

```vue
<SchemaForm v-model="formData" :schemas="schemas">
  <template #customSlot="{ value, setValue }">
    <div>
      <span>当前值: {{ value }}</span>
      <a-button @click="setValue(value + 1)">增加</a-button>
    </div>
  </template>
</SchemaForm>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| schemas | 表单配置 | `FormItemSchema[]` | `[]` |
| modelValue | 表单数据 | `Record<string, any>` | `{}` |
| labelCol | 标签列配置 | `Record<string, any>` | `{ span: 6 }` |
| wrapperCol | 内容列配置 | `Record<string, any>` | `{ span: 18 }` |
| layout | 布局方式 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| name | 表单名称 | `string` | 自动生成 |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 表单数据更新 | `(value: Record<string, any>) => void` |
| submit | 表单提交 | `(value: Record<string, any>) => void` |
| reset | 表单重置 | `() => void` |
| change | 字段值变化 | `(field: string, value: any) => void` |

### Methods

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| validate | 验证表单 | `() => Promise<any>` |
| validateFields | 验证指定字段 | `(fields: string[]) => Promise<any>` |
| clearValidate | 清除验证 | `(fields?: string[]) => void` |
| resetFields | 重置表单 | `() => void` |
| setFieldValue | 设置字段值 | `(field: string, value: any) => void` |
| setFieldsValue | 批量设置字段值 | `(values: Record<string, any>) => void` |
| getFieldValue | 获取字段值 | `(field: string) => any` |
| getFormData | 获取表单数据 | `() => Record<string, any>` |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| footer | 底部操作区 | `{ submit, reset, validate, isSubmitting }` |
| [schema.slot] | 自定义字段插槽 | `{ formData, field, value, setValue, disabled }` |

## 迁移指南

从 `DynamicForm` 迁移到 `SchemaForm`：

1. 导入路径更改：
```typescript
// 旧
import DynamicForm from '@/components/DynamicForm'

// 新
import { SchemaForm } from '@/components/business/SchemaForm'
```

2. 组件名称更改：
```vue
<!-- 旧 -->
<DynamicForm />

<!-- 新 -->
<SchemaForm />
```

3. API 保持兼容，无需修改其他代码

## 最佳实践

1. **使用 TypeScript**：充分利用类型提示
2. **合理拆分**：复杂表单拆分为多个 Schema 配置
3. **性能优化**：避免在动态函数中进行复杂计算
4. **验证规则**：使用 Ant Design Vue 的验证规则
5. **错误处理**：在 submit 事件中处理验证失败的情况
