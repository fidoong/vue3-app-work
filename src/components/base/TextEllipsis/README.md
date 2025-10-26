# TextEllipsis 文本超出显示组件

支持单行/多行文本超出显示 tooltip 的组件，自动检测文本是否超出并显示提示。

## 特性

- ✅ 支持单行和多行文本超出
- ✅ 自动检测文本是否超出
- ✅ 只在超出时显示 tooltip
- ✅ 支持自定义 tooltip 位置和样式
- ✅ 支持插槽自定义内容
- ✅ 响应式监听内容和窗口变化
- ✅ 完整的 TypeScript 类型支持

## 基本用法

### 单行文本超出

```vue
<template>
  <TextEllipsis content="这是一段很长的文本内容，超出部分会显示省略号" />
</template>

<script setup lang="ts">
import { TextEllipsis } from '~/components/base'
</script>
```

### 多行文本超出

```vue
<template>
  <TextEllipsis
    :lines="3"
    content="这是一段很长的文本内容，可以显示多行，超出指定行数后会显示省略号并在鼠标悬停时显示完整内容"
  />
</template>
```

### 使用插槽

```vue
<template>
  <TextEllipsis :lines="2">
    <span style="color: red;">自定义内容</span>
    这是一段很长的文本
  </TextEllipsis>
</template>
```

### 在表格中使用

```vue
<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'description'">
        <TextEllipsis :content="record.description" />
      </template>
    </template>
  </a-table>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 文本内容 | `string` | - |
| lines | 最大行数 | `number` | `1` |
| tooltip | 是否启用 tooltip | `boolean` | `true` |
| placement | tooltip 的位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'right'` | `'top'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `Record<string, any>` | - |
| tooltipMaxWidth | tooltip 的最大宽度 | `number \| string` | `400` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义文本内容，优先级高于 content 属性 |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| checkOverflow | 检查文本是否超出 | - | `boolean` |
| getContent | 获取文本内容 | - | `string` |

### 示例

```vue
<template>
  <TextEllipsis
    ref="textEllipsisRef"
    :lines="2"
    content="文本内容"
  />
  <a-button @click="handleCheck">检查是否超出</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TextEllipsis } from '~/components/base'
import type { TextEllipsisInstance } from '~/components/base'

const textEllipsisRef = ref<TextEllipsisInstance>()

function handleCheck() {
  const isOverflow = textEllipsisRef.value?.checkOverflow()
  console.log('是否超出:', isOverflow)
  console.log('文本内容:', textEllipsisRef.value?.getContent())
}
</script>
```

## 更多示例

查看完整示例请访问：`/demos/text-ellipsis`

## 注意事项

1. 组件会自动监听窗口大小变化，无需手动触发检查
2. 多行文本超出使用 `-webkit-line-clamp`，需要浏览器支持
3. 使用插槽时，tooltip 会显示插槽的文本内容
4. 组件宽度默认为 100%，可通过 style 或 className 自定义
