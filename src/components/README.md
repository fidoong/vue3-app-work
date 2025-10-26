# Components 组件库

重构后的组件库，提供统一、规范、易用的组件系统。

## 目录结构

```
src/components/
├── shared/           # 共享资源
│   ├── types/       # 通用类型定义
│   ├── utils/       # 通用工具函数
│   ├── composables/ # 通用组合式函数
│   └── constants/   # 常量定义
├── base/            # 基础组件
│   └── BaseModal/   # 弹窗组件
├── business/        # 业务组件
│   ├── SchemaForm/  # 表单组件
│   ├── SchemaTable/ # 表格组件
│   ├── SearchForm/  # 搜索表单
│   ├── SchemaMenu/  # 菜单组件
│   └── SchemaLayout/# 布局组件
└── index.ts         # 统一导出
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 使用组件

```typescript
// 导入组件
import { SchemaForm, SchemaTable, SearchForm } from '@/components'

// 导入类型
import type { FormItemSchema, TableColumnSchema } from '@/components'

// 导入工具
import { formatDate, isEmail, useLoading } from '@/components'
```

## 组件列表

### 业务组件

#### SchemaForm - 表单组件

基于配置驱动的动态表单组件。

```vue
<SchemaForm
  v-model="formData"
  :schemas="schemas"
  @submit="handleSubmit"
/>
```

[查看详细文档](./business/SchemaForm/README.md)

#### SchemaTable - 表格组件

功能强大的数据表格组件。

```vue
<SchemaTable
  :columns="columns"
  :api="loadData"
  :immediate="true"
/>
```

#### SearchForm - 搜索表单

带展开/收起功能的搜索表单。

```vue
<SearchForm
  :schemas="schemas"
  @search="handleSearch"
/>
```

#### SchemaMenu - 菜单组件

支持多级菜单的导航组件。

```vue
<SchemaMenu
  :items="menuItems"
  @select="handleSelect"
/>
```

#### SchemaLayout - 布局组件

完整的后台管理布局。

```vue
<SchemaLayout
  :menu-items="menuItems"
  :user-info="userInfo"
/>
```

### 基础组件

#### BaseModal - 弹窗组件

函数式调用的弹窗组件。

```typescript
import { useModal } from '@/components'

const { openModal } = useModal()

const result = await openModal(MyComponent, {
  title: '标题',
  props: { data: 'test' }
})
```

## 共享资源

### 类型定义

```typescript
import type {
  DynamicValue,      // 动态值类型
  PaginationConfig,  // 分页配置
  QueryParams,       // 查询参数
  ButtonConfig,      // 按钮配置
  FormItemSchema,    // 表单项配置
  TableColumnSchema, // 表格列配置
} from '@/components/shared/types'
```

### 工具函数

```typescript
import {
  // 格式化
  formatDate,
  formatCurrency,
  formatFileSize,

  // 验证
  isEmail,
  isPhone,
  isUrl,

  // 转换
  deepClone,
  deepMerge,
  pick,
  omit,
} from '@/components/shared/utils'
```

### 组合式函数

```typescript
import {
  useLoading,    // 加载状态管理
  usePagination, // 分页管理
  useSelection,  // 选择管理
} from '@/components/shared/composables'
```

## 设计原则

1. **配置驱动**：通过配置生成组件，减少重复代码
2. **类型安全**：完整的 TypeScript 类型支持
3. **高度复用**：提取通用逻辑，提高代码复用率
4. **易于扩展**：模块化设计，便于扩展新功能
5. **向后兼容**：保留旧 API，平滑迁移

## 编码规范

### 组件结构

```vue
<script setup lang="ts">
// 1. 类型导入
import type { Props, Emits } from './types'

// 2. 外部依赖
import { ref, computed } from 'vue'

// 3. 内部依赖
import { useComposable } from './composables'

// 4. Props & Emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 5. 响应式数据
const state = ref()

// 6. 计算属性
const computed = computed()

// 7. 方法
function method() {}

// 8. 生命周期
onMounted(() => {})

// 9. 暴露
defineExpose({})
</script>

<template>
  <!-- 模板 -->
</template>

<style scoped>
/* 样式 */
</style>
```

### 命名规范

- 组件：PascalCase（SchemaForm）
- 文件：PascalCase（SchemaForm.vue）
- 变量：camelCase（formData）
- 常量：UPPER_CASE（DEFAULT_PAGE_SIZE）
- 类型：PascalCase（FormItemSchema）

## 迁移指南

从旧组件迁移到新组件，请参考 [迁移指南](../../MIGRATION_GUIDE.txt)。

## 贡献指南

1. 遵循编码规范
2. 添加类型定义
3. 编写单元测试
4. 更新文档
5. 提交 PR

## 许可证

MIT
