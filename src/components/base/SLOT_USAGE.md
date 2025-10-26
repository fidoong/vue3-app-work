# API 组件插槽使用指南

## 问题说明

在使用 API 驱动组件的插槽时，TypeScript 可能无法正确推断插槽参数的类型，导致类型错误。

## 解决方案

### 方案1: 使用 transform 函数（推荐）

最简单且类型安全的方式是使用 `transform` 属性来格式化数据：

```vue
<ApiSelect
  v-model:value="userId"
  :api="fetchUsers"
  :transform="(data: any[]) => data.map((item: any) => ({
    value: item.id,
    label: `${item.name} (${item.email})`,  // 在这里组合显示内容
  }))"
  placeholder="请选择用户"
/>
```

**优点:**
- 类型安全
- 代码简洁
- 性能更好（不需要渲染额外的 DOM）

**缺点:**
- 只能修改文本内容，无法自定义 HTML 结构

---

### 方案2: 在独立组件中使用插槽

如果需要复杂的自定义渲染，建议创建一个独立的组件：

```vue
<!-- UserSelect.vue -->
<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'

defineProps<{
  modelValue?: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()

async function fetchUsers() {
  // API 调用
}
</script>

<template>
  <ApiSelect
    :model-value="modelValue"
    :api="fetchUsers"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #option="option">
      <div class="flex items-center gap-2">
        <img :src="option.avatar" class="w-6 h-6 rounded-full">
        <div>
          <div>{{ option.label }}</div>
          <div class="text-xs text-gray-500">{{ option.email }}</div>
        </div>
      </div>
    </template>
  </ApiSelect>
</template>
```

然后在页面中使用：

```vue
<UserSelect v-model="userId" />
```

**优点:**
- 完全的自定义能力
- 可复用
- 类型错误被隔离在组件内部

**缺点:**
- 需要创建额外的组件文件

---

### 方案3: 使用 @ts-expect-error（不推荐）

如果确实需要在页面中直接使用插槽，可以使用 TypeScript 指令忽略错误：

```vue
<ApiSelect :api="fetchUsers">
  <!-- @ts-expect-error Ant Design Vue slot type inference issue -->
  <template #option="option">
    <div>{{ option.label }}</div>
  </template>
</ApiSelect>
```

**优点:**
- 可以直接使用插槽

**缺点:**
- 失去类型检查
- 可能隐藏真实的错误

---

### 方案4: 使用 optionRender 属性

对于 Ant Design Vue 4.x，可以使用 `optionRender` 属性：

```vue
<script setup>
import { h } from 'vue'

function renderOption(option: any) {
  return h('div', { class: 'flex items-center gap-2' }, [
    h('img', { src: option.avatar, class: 'w-6 h-6 rounded-full' }),
    h('div', [
      h('div', option.label),
      h('div', { class: 'text-xs text-gray-500' }, option.email),
    ]),
  ])
}
</script>

<template>
  <ApiSelect
    :api="fetchUsers"
    :option-render="renderOption"
  />
</template>
```

**优点:**
- 类型安全
- 完全的自定义能力

**缺点:**
- 需要使用 h 函数，代码可读性较差
- 仅 Ant Design Vue 4.x 支持

---

## 推荐实践

### 简单场景
使用 **transform** 函数：
```vue
<ApiSelect
  :api="fetchData"
  :transform="(data) => data.map(item => ({
    value: item.id,
    label: `${item.name} - ${item.code}`
  }))"
/>
```

### 复杂场景
创建**独立组件**：
```vue
<!-- components/UserSelect.vue -->
<ApiSelect :api="fetchUsers">
  <template #option="option">
    <!-- 复杂的自定义渲染 -->
  </template>
</ApiSelect>
```

### 可复用场景
使用 **optionRender** 函数：
```vue
<script setup>
const renderOption = (option) => h('div', ...)
</script>

<template>
  <ApiSelect :option-render="renderOption" />
</template>
```

---

## 示例对比

### ❌ 不推荐（类型错误）
```vue
<ApiSelect :api="fetchUsers">
  <template #option="option">
    <div>{{ option.label }}</div>
  </template>
</ApiSelect>
```

### ✅ 推荐方式1（transform）
```vue
<ApiSelect
  :api="fetchUsers"
  :transform="(data) => data.map(item => ({
    value: item.id,
    label: `${item.name} (${item.email})`
  }))"
/>
```

### ✅ 推荐方式2（独立组件）
```vue
<!-- UserSelect.vue -->
<ApiSelect :api="fetchUsers">
  <template #option="option">
    <div>{{ option.label }}</div>
  </template>
</ApiSelect>

<!-- 使用 -->
<UserSelect v-model="userId" />
```

---

## 相关链接

- [ApiSelect 完整示例](/select)
- [自定义渲染示例](/select/custom-render)
- [组件文档](./README.md)
