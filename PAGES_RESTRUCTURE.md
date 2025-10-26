# Pages 目录重构完成

## 概述

已完成 pages 目录的重新规划和组件 demo 页面的创建。新的目录结构更加清晰，按照组件类型进行分类。

## 新目录结构

```
src/pages/
├── index.vue                    # 首页 - 展示所有组件
├── base/                        # 基础组件示例
│   ├── api-select/             # ApiSelect 下拉选择
│   ├── api-cascader/           # ApiCascader 级联选择
│   ├── api-tree-select/        # ApiTreeSelect 树形选择
│   ├── api-checkbox-group/     # ApiCheckboxGroup 多选框组
│   ├── api-radio-group/        # ApiRadioGroup 单选框组
│   └── base-modal/             # BaseModal 弹窗
└── business/                    # 业务组件示例
    ├── schema-form/            # SchemaForm 动态表单
    ├── schema-table/           # SchemaTable 数据表格
    ├── search-form/            # SearchForm 搜索表单
    ├── schema-layout/          # SchemaLayout 布局
    └── schema-menu/            # SchemaMenu 菜单
```

## 已创建的文件

### 页面文件 (11个)
1. `src/pages/base/api-select/index.vue` - ApiSelect 组件示例
2. `src/pages/base/api-cascader/index.vue` - ApiCascader 组件示例
3. `src/pages/base/api-tree-select/index.vue` - ApiTreeSelect 组件示例
4. `src/pages/base/api-checkbox-group/index.vue` - ApiCheckboxGroup 组件示例
5. `src/pages/base/api-radio-group/index.vue` - ApiRadioGroup 组件示例
6. `src/pages/base/base-modal/index.vue` - BaseModal 组件示例
7. `src/pages/business/schema-form/index.vue` - SchemaForm 组件示例
8. `src/pages/business/schema-table/index.vue` - SchemaTable 组件示例
9. `src/pages/business/search-form/index.vue` - SearchForm 组件示例
10. `src/pages/business/schema-layout/index.vue` - SchemaLayout 组件示例
11. `src/pages/business/schema-menu/index.vue` - SchemaMenu 组件示例

### 配置文件
- `src/config/menu.ts` - 菜单配置文件
- `src/layouts/default.vue` - 默认布局组件（包含侧边栏菜单）

### 文档文件
- `src/pages/README.md` - Pages 目录说明文档

## 更新的文件

- `src/pages/index.vue` - 更新首页，展示所有组件分类

## 删除的旧目录

已删除以下旧的页面目录：
- `src/pages/api-components/`
- `src/pages/form/`
- `src/pages/layout/`
- `src/pages/menu/`
- `src/pages/modal/`
- `src/pages/search/`
- `src/pages/select/`
- `src/pages/table/`

## 菜单结构

新的菜单结构分为三个主要部分：

### 1. 首页
- 路径: `/`
- 展示所有组件的入口页面

### 2. 基础组件
包含 6 个支持 API 数据源的表单组件：
- ApiSelect - 下拉选择
- ApiCascader - 级联选择
- ApiTreeSelect - 树形选择
- ApiCheckboxGroup - 多选框组
- ApiRadioGroup - 单选框组
- BaseModal - 弹窗组件

### 3. 业务组件
包含 5 个基于 Schema 配置的业务组件：
- SchemaForm - 动态表单
- SchemaTable - 数据表格
- SearchForm - 搜索表单
- SchemaLayout - 布局组件
- SchemaMenu - 菜单组件

## 路由映射

| 组件 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 组件库首页 |
| ApiSelect | `/base/api-select` | 下拉选择组件 |
| ApiCascader | `/base/api-cascader` | 级联选择组件 |
| ApiTreeSelect | `/base/api-tree-select` | 树形选择组件 |
| ApiCheckboxGroup | `/base/api-checkbox-group` | 多选框组组件 |
| ApiRadioGroup | `/base/api-radio-group` | 单选框组组件 |
| BaseModal | `/base/base-modal` | 弹窗组件 |
| SchemaForm | `/business/schema-form` | 动态表单组件 |
| SchemaTable | `/business/schema-table` | 数据表格组件 |
| SearchForm | `/business/search-form` | 搜索表单组件 |
| SchemaLayout | `/business/schema-layout` | 布局组件 |
| SchemaMenu | `/business/schema-menu` | 菜单组件 |

## 特性

### 1. 统一的页面风格
所有 demo 页面采用统一的布局和样式：
- 标题和描述
- 分隔线
- 卡片式示例展示
- 响应式布局

### 2. 完整的示例代码
每个页面都包含：
- 基础用法示例
- 实际可运行的代码
- 数据展示
- 交互演示

### 3. 导航系统
- 侧边栏菜单：展示所有组件分类
- 面包屑导航：显示当前位置
- 首页卡片：快速访问各个组件

### 4. 响应式设计
- 支持移动端和桌面端
- 侧边栏可折叠
- 卡片网格自适应

## 使用方法

### 启动开发服务器
```bash
pnpm dev
```

### 访问页面
- 首页: http://localhost:5173/
- 基础组件: http://localhost:5173/base/api-select
- 业务组件: http://localhost:5173/business/schema-form

### 添加新组件示例

1. 在对应目录创建组件文件夹：
```bash
mkdir -p src/pages/base/new-component
```

2. 创建 index.vue 文件：
```vue
<script setup lang="ts">
// 组件逻辑
</script>

<template>
  <div class="demo-page">
    <!-- 组件示例 -->
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

3. 在 `src/config/menu.ts` 中添加菜单项

4. 在 `src/pages/index.vue` 中添加组件卡片

## 技术栈

- Vue 3 + TypeScript
- Ant Design Vue
- Vue Router (文件系统路由)
- Vite

## 注意事项

1. 路径别名使用 `~/` 而不是 `@/`
2. 所有组件从 `~/components` 导入
3. 菜单配置在 `~/config/menu.ts`
4. 布局文件在 `~/layouts/default.vue`

## 下一步

可以考虑添加：
- 更多示例场景
- API 文档说明
- 代码高亮展示
- 在线编辑功能
- 主题切换功能
