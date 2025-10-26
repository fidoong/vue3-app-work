# 菜单结构说明

本文档说明了基于 `src/pages` 目录自动生成的菜单结构。

## 菜单层级

### 一级菜单

#### 1. 首页
- **路径**: `/`
- **图标**: DashboardOutlined
- **说明**: 应用首页

#### 2. 业务组件
- **图标**: AppstoreOutlined
- **说明**: 包含所有业务组件示例

#### 3. API 组件
- **图标**: ApiOutlined
- **说明**: 包含所有 API 数据源组件示例

---

### 二级菜单 - 业务组件

#### 2.1 表单组件
- **路径**: `/form`
- **图标**: FormOutlined
- **对应文件**: `src/pages/form/index.vue`

#### 2.2 表格组件
- **路径**: `/table`
- **图标**: TableOutlined
- **对应文件**: `src/pages/table/index.vue`

#### 2.3 搜索表单
- **图标**: SearchOutlined
- **子菜单**:
  - 搜索示例: `/search` → `src/pages/search/index.vue`
  - 简单搜索: `/search/simple` → `src/pages/search/simple.vue`

#### 2.4 弹窗组件
- **路径**: `/modal`
- **图标**: WindowsOutlined
- **对应文件**: `src/pages/modal/index.vue`

#### 2.5 菜单组件
- **路径**: `/menu`
- **图标**: MenuOutlined
- **对应文件**: `src/pages/menu/index.vue`

#### 2.6 布局组件
- **路径**: `/layout`
- **图标**: LayoutOutlined
- **对应文件**: `src/pages/layout/index.vue`

---

### 二级菜单 - API 组件

#### 3.1 API 组件示例
- **路径**: `/api-components`
- **对应文件**: `src/pages/api-components/index.vue`

#### 3.2 Select 组件
- **图标**: SelectOutlined
- **子菜单**:
  - 基础示例: `/select` → `src/pages/select/index.vue`
  - 简单示例: `/select/simple` → `src/pages/select/simple.vue`
  - 自定义渲染: `/select/custom-render` → `src/pages/select/custom-render.vue`
  - 事件示例: `/select/event-example` → `src/pages/select/event-example.vue`

---

## 菜单配置文件

菜单配置位于: `src/composables/useLayoutConfig.ts`

### 使用方式

```vue
<script setup lang="ts">
import { useLayoutConfig } from '~/composables/useLayoutConfig'

const { menuItems, userInfo, handleLogout, handleUserMenuClick } = useLayoutConfig()
</script>

<template>
  <SchemaLayout
    :menu-items="menuItems"
    :user-info="userInfo"
    @logout="handleLogout"
    @user-menu-click="handleUserMenuClick"
  />
</template>
```

---

## 添加新菜单项

### 步骤 1: 创建页面文件
在 `src/pages` 目录下创建对应的 `.vue` 文件

### 步骤 2: 更新菜单配置
在 `src/composables/useLayoutConfig.ts` 中添加菜单项：

```typescript
{
  key: 'new-page',
  title: '新页面',
  icon: YourIcon,
  path: '/new-page',
}
```

### 步骤 3: 路由自动生成
使用 `unplugin-vue-router`，路由会根据文件结构自动生成，无需手动配置。

---

## 图标列表

当前使用的图标来自 `@ant-design/icons-vue`:

- `DashboardOutlined` - 仪表盘
- `AppstoreOutlined` - 应用
- `ApiOutlined` - API
- `FormOutlined` - 表单
- `TableOutlined` - 表格
- `SearchOutlined` - 搜索
- `WindowsOutlined` - 弹窗
- `MenuOutlined` - 菜单
- `LayoutOutlined` - 布局
- `SelectOutlined` - 选择器

更多图标请参考: https://antdv.com/components/icon-cn

---

## 菜单特性

### 支持的功能
- ✅ 多级嵌套菜单
- ✅ 图标显示
- ✅ 路由跳转
- ✅ 菜单折叠
- ✅ 面包屑导航
- ✅ 标签页导航
- ✅ 暗色/亮色主题

### 菜单配置选项
```typescript
interface MenuItemSchema {
  key: string              // 唯一标识
  title: string            // 菜单标题
  icon?: Component         // 图标组件
  path?: string            // 路由路径
  children?: MenuItemSchema[]  // 子菜单
  disabled?: boolean       // 是否禁用
  hidden?: boolean         // 是否隐藏
}
```

---

## 注意事项

1. **路由路径**: 必须与 `src/pages` 目录结构对应
2. **唯一 key**: 每个菜单项的 key 必须唯一
3. **图标导入**: 使用前需要从 `@ant-design/icons-vue` 导入
4. **嵌套层级**: 建议不超过 3 层，保持菜单简洁

---

## 目录结构映射

```
src/pages/
├── index.vue                    → / (首页)
├── form/
│   └── index.vue               → /form (表单组件)
├── table/
│   └── index.vue               → /table (表格组件)
├── search/
│   ├── index.vue               → /search (搜索示例)
│   └── simple.vue              → /search/simple (简单搜索)
├── select/
│   ├── index.vue               → /select (基础示例)
│   ├── simple.vue              → /select/simple (简单示例)
│   ├── custom-render.vue       → /select/custom-render (自定义渲染)
│   └── event-example.vue       → /select/event-example (事件示例)
├── modal/
│   └── index.vue               → /modal (弹窗组件)
├── menu/
│   └── index.vue               → /menu (菜单组件)
├── layout/
│   └── index.vue               → /layout (布局组件)
└── api-components/
    └── index.vue               → /api-components (API 组件)
```
