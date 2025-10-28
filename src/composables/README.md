# Composables 通用组合式函数

提供常用的业务逻辑封装，提高开发效率。

## 📦 可用的 Composables

### useTable - 表格管理

处理表格数据加载、分页、排序、筛选等逻辑。

```vue
<script setup lang="ts">
import { useTable } from '~/composables/useTable'
import { userApi } from '~/api/services/user'

const {
  dataSource,
  loading,
  pagination,
  search,
  refresh,
  reset,
} = useTable({
  api: userApi.getList,
  initialPageSize: 20,
  immediate: true,
})

function handleSearch(params: any) {
  search(params)
}
</script>

<template>
  <a-table
    :data-source="dataSource"
    :loading="loading"
    :pagination="pagination"
  />
</template>
```

### useForm - 表单管理

处理表单提交、验证、重置等逻辑。

```vue
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { userApi } from '~/api/services/user'

const {
  formData,
  formRef,
  loading,
  handleSubmit,
  resetForm,
} = useForm({
  initialValues: { name: '', email: '' },
  onSubmit: async (values) => {
    await userApi.create(values)
  },
  onSuccess: () => {
    message.success('创建成功')
  },
})
</script>

<template>
  <a-form ref="formRef" :model="formData">
    <a-form-item name="name" label="姓名">
      <a-input v-model:value="formData.name" />
    </a-form-item>
    <a-button :loading="loading" @click="handleSubmit">
      提交
    </a-button>
  </a-form>
</template>
```

### useDialog - 对话框管理

处理对话框的打开、关闭、确认等逻辑。

```vue
<script setup lang="ts">
import { useDialog } from '~/composables/useDialog'

const {
  visible,
  loading,
  open,
  close,
  confirm,
} = useDialog({
  onConfirm: async () => {
    await saveData()
  },
  onOpened: () => {
    console.log('对话框已打开')
  },
})
</script>

<template>
  <a-button @click="open">打开对话框</a-button>

  <a-modal
    v-model:open="visible"
    :confirm-loading="loading"
    @ok="confirm"
    @cancel="close"
  >
    <!-- 对话框内容 -->
  </a-modal>
</template>
```

### useUpload - 文件上传

处理文件上传、进度、预览等逻辑。

```vue
<script setup lang="ts">
import { useUpload } from '~/composables/useUpload'
import { uploadClient } from '~/lib/http'

const {
  fileList,
  isUploading,
  handleUpload,
  removeFile,
  getUrls,
} = useUpload({
  upload: (file) => uploadClient.upload('/api/upload', file),
  maxCount: 5,
  maxSize: 10,
  accept: ['.jpg', '.png', '.pdf'],
  onSuccess: (file) => {
    message.success(`${file.name} 上传成功`)
  },
})
</script>

<template>
  <a-upload
    :file-list="fileList"
    :before-upload="handleUpload"
    @remove="removeFile"
  >
    <a-button :loading="isUploading">
      上传文件
    </a-button>
  </a-upload>
</template>
```

### useExport - 数据导出

处理数据导出、下载等逻辑。

```vue
<script setup lang="ts">
import { useExport } from '~/composables/useExport'
import { userApi } from '~/api/services/user'

const {
  exporting,
  progress,
  handleExport,
} = useExport({
  exportFn: userApi.export,
  filename: 'users.xlsx',
  onSuccess: () => {
    message.success('导出成功')
  },
})
</script>

<template>
  <a-button
    :loading="exporting"
    @click="handleExport({ status: 1 })"
  >
    导出数据
  </a-button>

  <a-progress v-if="exporting" :percent="progress" />
</template>
```

## 🎯 设计原则

1. **单一职责** - 每个 composable 只负责一个功能
2. **可组合** - 可以组合使用多个 composables
3. **类型安全** - 完整的 TypeScript 类型支持
4. **易于测试** - 纯函数，易于单元测试
5. **灵活配置** - 提供丰富的配置选项

## 💡 最佳实践

1. 在 setup 函数顶部调用 composables
2. 使用解构获取需要的属性和方法
3. 合理使用 immediate 选项控制初始化行为
4. 提供回调函数处理业务逻辑
5. 使用 TypeScript 泛型提供类型推导
