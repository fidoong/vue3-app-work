# BaseModal 组件

函数式调用的弹窗组件，支持同步/异步加载、嵌套弹窗等功能。

## 特性

- 🎯 **函数式调用**：通过函数调用打开弹窗，返回 Promise
- 🔄 **异步加载**：支持异步组件加载
- 📦 **嵌套弹窗**：支持在弹窗内打开新弹窗
- 🎨 **灵活配置**：丰富的配置选项
- 💪 **类型安全**：完整的 TypeScript 类型支持
- 🌐 **上下文继承**：自动继承 Vue 应用上下文

## 安装

### 1. 安装插件

在 `main.ts` 中安装插件：

```typescript
import { createModalPlugin } from './components/base/BaseModal'

app.use(createModalPlugin({
  debug: false,
  containerClass: 'app-modal-container',
  autoInit: true, // 自动初始化（默认）
}))
```

### 2. 插件选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| debug | boolean | false | 是否启用调试模式 |
| containerClass | string | - | 容器类名 |
| autoInit | boolean | true | 是否自动初始化 |

### 3. 手动初始化（可选）

如果自动初始化失败或需要延迟初始化，可以手动调用：

```typescript
import { initModalProvider } from './components/base/BaseModal'

// 在合适的时机手动初始化
onMounted(() => {
  initModalProvider()
})
```

## 基础用法

### 打开弹窗

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
        data: 'test'
      }
    })
    console.log('返回结果:', result.data)
  } catch (error) {
    if (error.type === 'cancel') {
      console.log('用户取消')
    }
  }
}
```

### 异步加载

```typescript
const { openAsyncModal } = globalModal

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

## 弹窗组件

### 组件 Props

弹窗组件会自动接收以下 props：

```typescript
interface ModalComponentProps {
  // 弹窗 ID
  modalId?: string

  // 关闭弹窗（任意类型）
  close?: (result?: any) => void

  // 确认（返回数据）
  confirm?: (result?: any) => void

  // 取消
  cancel?: (result?: any) => void

  // 自定义传入的 props
  [key: string]: any
}
```

### 组件示例

```vue
<script setup lang="ts">
interface Props {
  data: string
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = defineProps<Props>()

const formData = ref({})

async function handleConfirm() {
  // 执行业务逻辑
  await saveData(formData.value)

  // 确认并关闭弹窗
  props.confirm?.({ success: true, data: formData.value })
}

function handleCancel() {
  // 取消并关闭弹窗
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

### ModalOptions

```typescript
interface ModalOptions<T = any> {
  // 基础配置
  title?: string                    // 标题
  width?: number | string           // 宽度
  height?: number | string          // 高度
  minWidth?: number | string        // 最小宽度
  minHeight?: number | string       // 最小高度

  // 显示配置
  mask?: boolean                    // 是否显示遮罩
  maskClosable?: boolean            // 点击遮罩是否关闭
  closable?: boolean                // 是否显示关闭按钮
  centered?: boolean                // 是否居中显示

  // 按钮配置
  footer?: boolean | VNode          // 是否显示底部按钮
  okText?: string                   // 确认按钮文字
  cancelText?: string               // 取消按钮文字
  okType?: string                   // 确认按钮类型
  confirmLoading?: boolean          // 确认按钮加载状态

  // 其他配置
  keyboard?: boolean                // 是否支持 ESC 关闭
  destroyOnClose?: boolean          // 关闭时是否销毁子元素
  zIndex?: number                   // 层级
  wrapClassName?: string            // 弹窗类名
  bodyStyle?: Record<string, any>   // 弹窗样式

  // 传递给组件的属性
  props?: T
}
```

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

## 高级功能

### 嵌套弹窗

在弹窗内部可以继续打开新弹窗：

```typescript
import { globalModal } from '~/components/base/BaseModal'

async function handleNested() {
  const result = await globalModal.openModal(AnotherModal, {
    title: '嵌套弹窗',
    width: 500
  })
}
```

### 预加载组件

```typescript
const { preloadComponent } = globalModal

// 预加载组件
await preloadComponent(() => import('./MyModal.vue'))

// 后续打开会更快
await openAsyncModal(() => import('./MyModal.vue'), {...})
```

### 获取当前弹窗

```typescript
const { getCurrentModal } = globalModal

const currentModal = getCurrentModal()
console.log(currentModal?.id)
```

### 关闭所有弹窗

```typescript
const { closeAllModals } = globalModal

closeAllModals()
```

## 工作原理

1. **插件安装**：创建全局容器并挂载 ModalProvider 组件
2. **上下文继承**：ModalProvider 继承主应用的 Vue 上下文
3. **实例管理**：使用 Map 管理所有弹窗实例
4. **动态渲染**：通过 ModalContainer 动态渲染弹窗组件
5. **Promise 封装**：将弹窗操作封装为 Promise

## 最佳实践

### 1. 错误处理

```typescript
try {
  const result = await openModal(...)
  // 处理确认
} catch (error) {
  if (error.type === 'cancel') {
    // 处理取消
  } else if (error.type === 'close') {
    // 处理关闭
  }
}
```

### 2. 加载状态

```typescript
const loading = ref(false)

async function handleConfirm() {
  loading.value = true
  try {
    await api.save()
    props.confirm?.({ success: true })
  } catch (error) {
    message.error('保存失败')
  } finally {
    loading.value = false
  }
}
```

### 3. 表单验证

```typescript
const formRef = ref()

async function handleConfirm() {
  try {
    await formRef.value?.validate()
    props.confirm?.(formData.value)
  } catch (error) {
    console.error('验证失败')
  }
}
```

### 4. 类型安全

```typescript
interface MyModalProps {
  userId: number
  mode: 'edit' | 'view'
}

const result = await openModal<MyModalProps, { success: boolean }>(
  MyModal,
  {
    props: {
      userId: 123,
      mode: 'edit'
    }
  }
)

// result.data 的类型为 { success: boolean }
```

## 示例

查看 `src/pages/modal/` 目录下的完整示例。

## 迁移指南

从 FunModal 迁移：

1. 导入路径更改：
```typescript
// 旧
import { globalModal } from '~/components/FunModal'

// 新
import { globalModal } from '~/components/base/BaseModal'
```

2. 插件安装更改：
```typescript
// 旧
import { createModalPlugin } from './components/FunModal'

// 新
import { createModalPlugin } from './components/base/BaseModal'
```

3. API 保持兼容，无需修改其他代码
