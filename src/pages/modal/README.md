# BaseModal 使用示例

本目录包含 BaseModal 组件的各种使用示例。

## 示例列表

### 1. ConfirmModal - 确认弹窗
简单的确认对话框，支持不同类型的提示图标。

**特性：**
- 支持 info/warning/error/success 类型
- 支持嵌套弹窗演示
- 简洁的确认/取消操作

**使用场景：**
- 删除确认
- 操作确认
- 提示信息

### 2. FormModal - 表单弹窗
包含完整表单的弹窗，集成 SchemaForm 组件。

**特性：**
- 完整的表单验证
- 支持初始数据
- 加载状态处理
- 多种表单控件

**使用场景：**
- 新增/编辑数据
- 用户信息录入
- 配置设置

### 3. SelectModal - 选择弹窗
单选列表弹窗，支持选项描述。

**特性：**
- 单选列表
- 选项描述
- 选中状态高亮

**使用场景：**
- 选择选项
- 配置选择
- 模板选择

### 4. AsyncModal - 异步加载弹窗
演示异步加载数据的弹窗。

**特性：**
- 异步数据加载
- 加载状态显示
- 数据展示

**使用场景：**
- 详情查看
- 数据预览
- 远程数据加载

## 使用方式

### 基础用法

```typescript
import { globalModal } from '~/components/base/BaseModal'
import MyModal from './MyModal.vue'

const { openModal } = globalModal

async function handleOpen() {
  try {
    const result = await openModal(MyModal, {
      title: '标题',
      width: 600,
      props: {
        // 传递给组件的属性
        data: 'test'
      }
    })
    console.log('返回结果:', result.data)
  } catch (error) {
    console.log('已取消')
  }
}
```

### 异步加载

```typescript
async function handleAsyncOpen() {
  const result = await openAsyncModal(
    () => import('./MyModal.vue'),
    {
      title: '异步加载',
      width: 600
    }
  )
}
```

### 弹窗组件

```vue
<script setup lang="ts">
interface Props {
  data: string
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = defineProps<Props>()

function handleConfirm() {
  props.confirm?.({ result: 'success' })
}

function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div>
    <!-- 弹窗内容 -->
    <p>{{ data }}</p>

    <!-- 操作按钮 -->
    <div class="mt-4 flex justify-end gap-2">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleConfirm">确定</a-button>
    </div>
  </div>
</template>
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 弹窗标题 |
| width | number/string | - | 弹窗宽度 |
| height | number/string | - | 弹窗高度 |
| centered | boolean | false | 是否居中显示 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| keyboard | boolean | true | 是否支持 ESC 关闭 |
| okText | string | '确定' | 确认按钮文字 |
| cancelText | string | '取消' | 取消按钮文字 |
| props | any | - | 传递给组件的属性 |

## 返回值

### 确认返回
```typescript
{
  data: any,        // 返回的数据
  type: 'confirm',  // 类型
  action: 'confirm' // 操作
}
```

### 取消/关闭
抛出异常：
```typescript
{
  data: any,
  type: 'cancel' | 'close',
  action: 'cancel' | 'close'
}
```

## 最佳实践

1. **使用 try-catch 处理取消操作**
```typescript
try {
  const result = await openModal(...)
  // 处理确认
} catch (error) {
  if (error.type === 'cancel') {
    // 处理取消
  }
}
```

2. **传递必要的属性**
```typescript
openModal(MyModal, {
  props: {
    id: 123,
    mode: 'edit'
  }
})
```

3. **处理加载状态**
```typescript
const loading = ref(false)

async function handleConfirm() {
  loading.value = true
  try {
    await api.save()
    props.confirm?.({ success: true })
  } finally {
    loading.value = false
  }
}
```

4. **嵌套弹窗**
```typescript
// 在弹窗内部可以继续打开新弹窗
const result = await globalModal.openModal(AnotherModal, {...})
```
