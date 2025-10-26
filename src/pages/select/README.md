# ApiSelect 使用指南

ApiSelect 是一个基于 Ant Design Vue Select 封装的异步数据加载下拉选择组件。

## 特性

- 🚀 支持异步数据加载
- 🔄 自动处理加载状态
- 📦 灵活的数据格式支持
- 🎯 自定义字段映射
- 🔧 支持动态参数
- ♻️ 参数变化自动重新加载
- 🎨 完全继承 Select 的所有属性和插槽

## 基础用法

```vue
<script setup lang="ts">
import { ApiSelect } from '@/components/base/ApiSelect'

const fetchUsers = async () => {
  const response = await fetch('/api/users')
  return response.json()
}

const userId = ref()
</script>

<template>
  <ApiSelect
    v-model:value="userId"
    :api="fetchUsers"
    :option-config="{
      valueField: 'id',
      labelField: 'name',
    }"
    placeholder="请选择用户"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| api | API 函数 | `(params?: Record<string, any>) => Promise<T[]>` | - |
| params | API 请求参数 | `Record<string, any>` | `{}` |
| optionConfig | 选项字段配置 | `OptionConfig` | `{}` |
| immediate | 是否立即加载 | `boolean` | `true` |
| reloadOnParamsChange | 参数变化时是否重新加载 | `boolean` | `true` |
| transform | 自定义数据转换函数 | `(data: any[]) => any[]` | - |

### OptionConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| valueField | 选项值字段名 | `string` | `'value'` |
| labelField | 选项标签字段名 | `string` | `'label'` |
| disabledField | 选项禁用字段名 | `string` | `'disabled'` |

### Events

| 事件名 | 说明 | 回调参数 | 使用场景 |
|--------|------|----------|----------|
| change | 选择变化时触发 | `(value: any, option: any) => void` | 监听用户选择、表单验证、联动其他字段 |
| loaded | 数据加载完成时触发 | `(data: any[]) => void` | 显示成功提示、获取原始数据、后续处理 |
| error | 数据加载失败时触发 | `(error: Error) => void` | 错误提示、日志记录、降级处理 |

**注意：**
- `loaded` 事件返回的是原始数据（未经过 `transform` 处理）
- `error` 事件在 API 请求失败时触发
- 这些事件不会传递给底层的 Ant Design Vue 组件

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reload | 重新加载数据 | - |

## 数据格式

ApiSelect 支持多种 API 响应格式：

### 1. 标准对象格式

```typescript
{
  data: [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' }
  ]
}
```

### 2. 直接数组格式

```typescript
[
  { id: 1, name: '张三' },
  { id: 2, name: '李四' }
]
```

### 3. 简单数组

```typescript
['选项1', '选项2', '选项3']
```

## 使用场景

### 1. 基础用法

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchData"
  :option-config="{ valueField: 'id', labelField: 'name' }"
/>
```

### 2. 动态参数

```vue
<script setup>
const params = ref({ status: 'active' })
</script>

<template>
  <ApiSelect
    v-model:value="value"
    :api="fetchUsers"
    :params="params"
    :option-config="{ valueField: 'id', labelField: 'name' }"
  />
</template>
```

### 3. 手动加载

```vue
<script setup>
const selectRef = ref()

function reload() {
  selectRef.value?.reload()
}
</script>

<template>
  <ApiSelect
    ref="selectRef"
    v-model:value="value"
    :api="fetchData"
    :immediate="false"
  />
  <button @click="reload">加载数据</button>
</template>
```

### 4. 自定义转换

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchData"
  :transform="(data) => data.map(item => ({
    value: item.id,
    label: `${item.name} (${item.email})`,
    disabled: !item.active
  }))"
/>
```

### 5. 多选模式

```vue
<ApiSelect
  v-model:value="values"
  :api="fetchData"
  mode="multiple"
  :option-config="{ valueField: 'id', labelField: 'name' }"
/>
```

### 6. 可搜索

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchData"
  show-search
  :filter-option="(input, option) => {
    return option.label.toLowerCase().includes(input.toLowerCase())
  }"
/>
```

### 7. 自定义选项渲染

使用 `#option` 插槽自定义选项显示：

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchUsers"
  :option-config="{ valueField: 'id', labelField: 'name' }"
>
  <template #option="option">
    <div class="flex items-center gap-2">
      <img :src="option.avatar" class="w-8 h-8 rounded-full">
      <div>
        <div>{{ option.label }}</div>
        <div class="text-xs text-gray-500">{{ option.email }}</div>
      </div>
    </div>
  </template>
</ApiSelect>
```

### 8. 自定义标签渲染 (多选)

使用 `tagRender` 自定义多选标签：

```vue
<script setup>
function customTagRender({ label, closable, onClose, option }) {
  return h('span', {
    class: 'custom-tag',
    style: { backgroundColor: option.color }
  }, [
    label,
    closable ? h(CloseOutlined, { onClick: onClose }) : null
  ])
}
</script>

<template>
  <ApiSelect
    v-model:value="values"
    :api="fetchData"
    mode="multiple"
    :tag-render="customTagRender"
  />
</template>
```

### 9. 自定义标签折叠

使用 `maxTagPlaceholder` 自定义超出标签的显示：

```vue
<ApiSelect
  v-model:value="values"
  :api="fetchData"
  mode="multiple"
  :max-tag-count="3"
  :max-tag-placeholder="(omittedValues) => `+${omittedValues.length} 更多`"
/>
```

## 注意事项

1. `api` 属性是必需的
2. API 函数应该返回 Promise
3. 支持的响应格式：`T[]` 或 `{ data: T[] }`
4. 默认情况下，参数变化会自动重新加载数据
5. 组件会自动处理加载状态和错误
