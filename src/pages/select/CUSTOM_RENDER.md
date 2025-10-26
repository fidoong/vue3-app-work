# ApiSelect 自定义渲染指南

ApiSelect 完全支持 Ant Design Vue Select 的所有插槽和渲染属性，可以灵活自定义选项和标签的显示方式。

## 方式1: 使用 option 插槽

最常用的方式，通过 `#option` 插槽自定义每个选项的渲染内容。

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchUsers"
  :option-config="{ valueField: 'id', labelField: 'name' }"
>
  <template #option="{ label, avatar, email }">
    <div class="flex items-center gap-2">
      <img :src="avatar" class="w-8 h-8 rounded-full">
      <div>
        <div>{{ label }}</div>
        <div class="text-xs text-gray-500">{{ email }}</div>
      </div>
    </div>
  </template>
</ApiSelect>
```

**特点:**
- 可以访问选项的所有字段
- 支持复杂的 HTML 结构
- 最灵活的自定义方式

## 方式2: 使用 tagRender (多选模式)

自定义多选模式下已选标签的显示方式。

```vue
<script setup>
import { h } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

function customTagRender({ label, closable, onClose, option }) {
  return h('span', {
    class: 'custom-tag',
    style: {
      backgroundColor: option.color,
      color: 'white',
      padding: '2px 8px',
      borderRadius: '4px'
    }
  }, [
    label,
    closable ? h(CloseOutlined, {
      onClick: onClose,
      style: { marginLeft: '4px', cursor: 'pointer' }
    }) : null
  ])
}
</script>

<template>
  <ApiSelect
    v-model:value="values"
    :api="fetchTags"
    mode="multiple"
    :tag-render="customTagRender"
  />
</template>
```

**特点:**
- 完全控制标签的样式和行为
- 可以添加自定义图标和交互
- 适合需要特殊视觉效果的场景

## 方式3: 使用 maxTagPlaceholder

自定义多选模式下超出数量的标签显示。

```vue
<ApiSelect
  v-model:value="values"
  :api="fetchData"
  mode="multiple"
  :max-tag-count="3"
  :max-tag-placeholder="(omittedValues) => {
    return `+${omittedValues.length} 更多...`
  }"
/>
```

**特点:**
- 控制标签折叠的显示文本
- 可以显示被折叠的选项信息
- 优化多选时的空间占用

## 方式4: 使用 optionRender 函数

通过函数式编程的方式渲染选项。

```vue
<script setup>
import { h } from 'vue'

function renderOption(option) {
  return h('div', { class: 'flex items-center gap-2' }, [
    h('span', { class: 'text-xl' }, option.icon),
    h('span', option.label),
    h('span', { class: 'text-xs text-gray-400 ml-auto' }, option.extra)
  ])
}
</script>

<template>
  <ApiSelect
    v-model:value="value"
    :api="fetchData"
    :option-render="renderOption"
  />
</template>
```

**特点:**
- 使用 Vue 的 h 函数创建 VNode
- 更加编程化的方式
- 适合动态生成复杂结构

## 方式5: 结合 transform 和插槽

先用 `transform` 处理数据，再用插槽渲染。

```vue
<ApiSelect
  v-model:value="value"
  :api="fetchProducts"
  :transform="(data) => data.map(item => ({
    value: item.id,
    label: item.name,
    disabled: item.stock === 0,
    price: item.price,
    stock: item.stock
  }))"
>
  <template #option="{ label, price, stock }">
    <div class="flex justify-between">
      <span>{{ label }}</span>
      <span class="text-red-500">¥{{ price }}</span>
      <span :class="stock > 0 ? 'text-green-500' : 'text-gray-400'">
        {{ stock > 0 ? `库存: ${stock}` : '缺货' }}
      </span>
    </div>
  </template>
</ApiSelect>
```

**特点:**
- 数据处理和渲染分离
- 可以在 transform 中添加额外字段
- 保持代码清晰和可维护

## 其他支持的插槽

ApiSelect 透传了所有 Select 的插槽：

- `#suffixIcon` - 自定义后缀图标
- `#removeIcon` - 自定义删除图标
- `#clearIcon` - 自定义清除图标
- `#menuItemSelectedIcon` - 自定义选中图标
- `#notFoundContent` - 自定义空状态
- `#dropdownRender` - 自定义下拉菜单

## 最佳实践

1. **简单场景**: 使用 `#option` 插槽
2. **多选标签**: 使用 `tagRender`
3. **函数式**: 使用 `optionRender`
4. **复杂数据**: 结合 `transform` 和插槽

## 注意事项

1. 插槽中可以访问选项的所有字段（通过 `transform` 或 `optionConfig` 处理后的）
2. `tagRender` 只在 `mode="multiple"` 或 `mode="tags"` 时生效
3. 自定义渲染不影响搜索功能，需要配合 `filterOption` 使用
4. 使用 h 函数时需要从 vue 导入

## 示例页面

访问 `/select/custom-render` 查看完整的交互式示例。
