# Pages 目录结构说明

本目录包含所有组件的演示页面，按照组件类型进行分类。

## 目录结构

```
src/pages/
├── index.vue                    # 首页 - 展示所有组件的入口
├── base/                        # 基础组件示例
│   ├── api-select/             # ApiSelect 下拉选择组件
│   ├── api-cascader/           # ApiCascader 级联选择组件
│   ├── api-tree-select/        # ApiTreeSelect 树形选择组件
│   ├── api-checkbox-group/     # ApiCheckboxGroup 多选框组
│   ├── api-radio-group/        # ApiRadioGroup 单选框组
│   └── base-modal/             # BaseModal 弹窗组件
└── business/                    # 业务组件示例
    ├── schema-form/            # SchemaForm 动态表单
    ├── schema-table/           # SchemaTable 数据表格
    ├── schema-layout/          # SchemaLayout 布局组件
    ├── schema-menu/            # SchemaMenu 菜单组件
    └── search-form/            # SearchForm 搜索表单
```

## 组件分类

### 基础组件 (Base Components)

基础组件是支持 API 数据源的表单组件，主要特点：

- 自动处理数据加载
- 统一的错误处理
- 支持加载状态显示
- 完整的 TypeScript 类型支持

包含组件：
- **ApiSelect**: 下拉选择组件
- **ApiCascader**: 级联选择组件
- **ApiTreeSelect**: 树形选择组件
- **ApiCheckboxGroup**: 多选框组组件
- **ApiRadioGroup**: 单选框组组件
- **BaseModal**: 服务式弹窗组件

### 业务组件 (Business Components)

业务组件是基于 Schema 配置的高级组件，主要特点：

- 配置化开发
- 快速构建复杂功能
- 高度可定制
- 适用于企业级应用

包含组件：
- **SchemaForm**: 基于 Schema 的动态表单
- **SchemaTable**: 功能完整的数据表格
- **SearchForm**: 可折叠的搜索表单
- **SchemaLayout**: 企业级后台布局
- **SchemaMenu**: 基于配置的菜单组件

## 页面规范

每个组件的演示页面应包含：

1. **组件标题和描述**: 清晰说明组件的用途
2. **基础用法**: 展示最简单的使用方式
3. **常见场景**: 展示常见的使用场景
4. **代码示例**: 提供可运行的代码示例
5. **API 文档**: 说明组件的 Props、Events、Slots 等

## 路由配置

路由采用文件系统路由，由 `vite-plugin-pages` 自动生成：

- `/` - 首页
- `/base/api-select` - ApiSelect 组件示例
- `/base/api-cascader` - ApiCascader 组件示例
- `/business/schema-form` - SchemaForm 组件示例
- ...

## 菜单配置

菜单配置位于 `src/config/menu.ts`，采用树形结构：

```typescript
export const menuConfig: MenuConfig[] = [
  {
    key: 'home',
    label: '首页',
    path: '/',
    icon: '🏠',
  },
  {
    key: 'base',
    label: '基础组件',
    icon: '🧩',
    children: [
      // 基础组件菜单项
    ],
  },
  {
    key: 'business',
    label: '业务组件',
    icon: '💼',
    children: [
      // 业务组件菜单项
    ],
  },
]
```

## 开发指南

### 添加新的组件示例

1. 在对应分类目录下创建组件文件夹
2. 创建 `index.vue` 文件
3. 在 `src/config/menu.ts` 中添加菜单项
4. 在首页 `src/pages/index.vue` 中添加组件卡片

### 示例页面模板

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YourComponent } from '@/components/...'

// 组件状态和逻辑
</script>

<template>
  <div class="demo-page">
    <a-typography-title :level="2">
      组件名称
    </a-typography-title>
    <a-typography-paragraph>
      组件描述
    </a-typography-paragraph>

    <a-divider />

    <a-space direction="vertical" :size="24" style="width: 100%">
      <a-card title="示例标题">
        <!-- 组件示例 -->
      </a-card>
    </a-space>
  </div>
</template>

<style scoped>
.demo-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
```

## 注意事项

1. 所有示例页面应保持统一的样式风格
2. 确保示例代码可以直接运行
3. 提供清晰的注释和说明
4. 考虑响应式布局
5. 处理好加载和错误状态
