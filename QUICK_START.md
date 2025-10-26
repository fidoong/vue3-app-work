# 快速启动指南

## 项目重构完成 ✅

已成功重构 pages 目录，创建了完整的组件演示系统。

## 目录结构

```
src/pages/
├── index.vue                           # 首页
├── base/                               # 基础组件 (6个)
│   ├── api-select/index.vue
│   ├── api-cascader/index.vue
│   ├── api-tree-select/index.vue
│   ├── api-checkbox-group/index.vue
│   ├── api-radio-group/index.vue
│   └── base-modal/index.vue
└── business/                           # 业务组件 (5个)
    ├── schema-form/index.vue
    ├── schema-table/index.vue
    ├── search-form/index.vue
    ├── schema-layout/index.vue
    └── schema-menu/index.vue
```

## 启动项目

```bash
# 安装依赖（如果还没安装）
pnpm install

# 启动开发服务器
pnpm dev
```

## 访问页面

启动后访问：http://localhost:5173

### 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 组件库首页，展示所有组件 |
| **基础组件** | | |
| ApiSelect | `/base/api-select` | 下拉选择组件 |
| ApiCascader | `/base/api-cascader` | 级联选择组件 |
| ApiTreeSelect | `/base/api-tree-select` | 树形选择组件 |
| ApiCheckboxGroup | `/base/api-checkbox-group` | 多选框组 |
| ApiRadioGroup | `/base/api-radio-group` | 单选框组 |
| BaseModal | `/base/base-modal` | 弹窗组件 |
| **业务组件** | | |
| SchemaForm | `/business/schema-form` | 动态表单 |
| SchemaTable | `/business/schema-table` | 数据表格 |
| SearchForm | `/business/search-form` | 搜索表单 |
| SchemaLayout | `/business/schema-layout` | 布局组件 |
| SchemaMenu | `/business/schema-menu` | 菜单组件 |

## 功能特性

### ✅ 已完成

1. **清理旧目录** - 删除了所有旧的混乱的页面结构
2. **新目录结构** - 按组件类型分类（base/business）
3. **11个组件示例** - 每个组件都有完整的演示页面
4. **统一的页面风格** - 所有页面采用一致的布局和样式
5. **SchemaLayout 布局** - 使用现有的 SchemaLayout 组件作为默认布局
6. **导航系统** - 侧边栏菜单 + 面包屑导航 + 标签页
7. **响应式设计** - 支持移动端和桌面端
8. **类型安全** - 完整的 TypeScript 支持
9. **菜单配置** - 集中管理在 `src/composables/useLayoutConfig.ts`

### 📝 组件导出

所有组件已正确导出：

```typescript
// 从统一入口导入
import { ApiSelect, ApiCascader, ApiTreeSelect } from '~/components/base'
import { SchemaForm, SchemaTable, SearchForm } from '~/components/business'
```

## 项目结构

```
src/
├── components/          # 组件源码
│   ├── base/           # 基础组件
│   └── business/       # 业务组件
├── pages/              # 演示页面
│   ├── base/          # 基础组件示例
│   └── business/      # 业务组件示例
├── layouts/            # 布局组件
│   └── default.vue    # 默认布局（带侧边栏）
├── config/             # 配置文件
│   └── menu.ts        # 菜单配置
└── styles/             # 样式文件
```

## 开发指南

### 添加新组件示例

1. 在对应目录创建文件夹：
```bash
mkdir -p src/pages/base/new-component
```

2. 创建 `index.vue` 文件（参考现有页面）

3. 更新菜单配置 `src/composables/useLayoutConfig.ts`：
```typescript
{
  key: 'new-component',
  title: 'NewComponent',
  path: '/base/new-component',
}
```

4. 在首页 `src/pages/index.vue` 添加组件卡片

### 页面模板

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YourComponent } from '~/components/base'

// 组件逻辑
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

    <a-space
      direction="vertical"
      :size="24"
      style="width: 100%"
    >
      <a-card title="基础用法">
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

1. **路径别名**：使用 `~/` 而不是 `@/`
2. **组件导入**：从 `~/components/base` 或 `~/components/business` 导入
3. **类型定义**：确保 API 函数有正确的返回类型
4. **代码风格**：使用 `function` 声明顶层函数，不使用箭头函数
5. **布局系统**：所有页面默认使用 `default.vue` 布局（SchemaLayout）
6. **菜单配置**：在 `src/composables/useLayoutConfig.ts` 中配置菜单项

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Ant Design Vue** - UI 组件库
- **Vue Router** - 路由管理（文件系统路由）
- **Vite** - 构建工具
- **UnoCSS** - 原子化 CSS

## 下一步

可以考虑添加：
- [ ] 更多使用场景示例
- [ ] API 文档说明
- [ ] 代码高亮展示
- [ ] 在线编辑功能
- [ ] 主题切换功能
- [ ] 组件搜索功能

## 相关文档

- [Pages 目录说明](src/pages/README.md)
- [重构总结](PAGES_RESTRUCTURE.md)
- [组件文档](src/components/README.md)

---

🎉 现在可以开始使用了！运行 `pnpm dev` 启动项目。
