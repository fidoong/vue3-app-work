# SchemaDetail 详情组件

基于配置的详情展示组件，支持列数控制、自定义渲染、分组展示等功能。

## 目录结构

```
SchemaDetail/
├── components/           # 子组件
│   ├── DetailItem.vue   # 详情项组件
│   ├── DetailGroup.vue  # 详情分组组件
│   └── index.ts         # 组件导出
├── composables/         # 组合式函数
│   ├── useDetailLayout.ts   # 布局逻辑
│   ├── useDetailRender.ts   # 渲染逻辑
│   ├── useDetailState.ts    # 状态管理
│   └── index.ts             # Composables 导出
├── SchemaDetail.vue     # 主组件
├── types.ts             # 类型定义
├── index.ts             # 统一导出
├── README.md            # 组件文档
├── USAGE.md             # 使用文档
└── CHANGELOG.md         # 更新日志
```

## 特性

- ✅ **列数控制** - 支持全局和单个字段的列数配置
- ✅ **自定义渲染** - 支持 render 函数、插槽、formatter 三种方式
- ✅ **分组展示** - 支持字段分组，每组可独立配置
- ✅ **复制功能** - 字段值一键复制到剪贴板
- ✅ **条件显示** - 支持根据数据动态显示/隐藏字段
- ✅ **图标支持** - 支持前缀和后缀图标
- ✅ **多种布局** - 支持水平和垂直布局
- ✅ **多种尺寸** - 支持 small、middle、large 三种尺寸
- ✅ **加载状态** - 支持 loading 状态
- ✅ **边框样式** - 支持显示边框

## 快速开始

### 基础用法

```vue
<script setup lang="ts">
import { SchemaDetail } from '~/components/business'
import type { DetailItemSchema } from '~/components/business'

const data = ref({
  name: '张三',
  age: 28,
  email: 'zhangsan@example.com',
})

const items: DetailItemSchema[] = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄' },
  { key: 'email', label: '邮箱', copyable: true },
]
</script>

<template>
  <SchemaDetail
    :data="data"
    :items="items"
    :column="3"
    title="用户详情"
    bordered
  />
</template>
```

### 分组展示

```vue
<script setup lang="ts">
import { SchemaDetail } from '~/components/business'
import type { DetailGroupSchema } from '~/components/business'

const groups: DetailGroupSchema[] = [
  {
    title: '基本信息',
    column: 2,
    bordered: true,
    items: [
      { key: 'name', label: '姓名' },
      { key: 'age', label: '年龄' },
    ],
  },
  {
    title: '联系方式',
    column: 2,
    bordered: true,
    collapsible: true,
    items: [
      { key: 'email', label: '邮箱' },
      { key: 'phone', label: '手机号' },
    ],
  },
]
</script>

<template>
  <SchemaDetail
    :data="data"
    :groups="groups"
  />
</template>
```

## 组件架构

### 主组件 (SchemaDetail.vue)

负责整体布局和数据流转，支持简单模式和分组模式。

### 子组件

#### DetailItem.vue
单个详情项的展示组件，支持：
- 自定义渲染
- 插槽
- 格式化
- 复制功能
- 图标

#### DetailGroup.vue
详情分组容器组件，支持：
- 分组标题
- 折叠/展开
- 独立列数配置
- 边框样式

### Composables

#### useDetailLayout
布局相关逻辑：
- 网格样式计算
- 标签宽度处理

#### useDetailRender
渲染相关逻辑：
- 字段值获取
- 显示值格式化
- 隐藏判断
- 列数计算

#### useDetailState
状态管理：
- 数据管理
- 刷新逻辑

## API

详见 [USAGE.md](./USAGE.md)

## 示例

访问 `/demos/schema-detail` 查看完整示例。

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)
