# Vue 样式转换为 SCSS

## 转换概述

已将项目中所有 Vue 单文件组件的样式从普通 CSS 转换为 SCSS 格式。

## 转换统计

- **转换文件数**: 37 个 Vue 文件
- **转换类型**: `<style scoped>` → `<style scoped lang="scss">`
- **转换时间**: 自动批量转换

## 转换的文件

### 业务组件
- ✅ `SearchForm.vue` - 搜索表单组件
- ✅ `SchemaPage.vue` - 页面组件
- ✅ `SchemaTable.vue` - 表格组件（合并了两个 style 标签）
- ✅ `SchemaLayout.vue` - 布局组件（提取为独立 SCSS 文件）
- ✅ `DropdownButton.vue` - 下拉按钮组件

### 页面文件
- ✅ 所有 demo 页面（33 个文件）
- ✅ 主页面和索引页面

## 主要改进

### 1. SchemaTable 组件优化
**优化前**:
```vue
<style scoped>
.schema-table { ... }
</style>

<style>
.schema-table :deep(.table-striped) { ... }
</style>
```

**优化后**:
```vue
<style scoped lang="scss">
.schema-table {
  width: 100%;

  :deep(.table-striped) {
    background-color: #fafafa;
  }
}
</style>
```

### 2. SchemaLayout 组件重构
- 提取为独立的 `SchemaLayout.scss` 文件
- 使用 SASS 变量和 mixin
- 嵌套结构更清晰

## 使用 SCSS 的优势

### 1. 嵌套语法
```scss
.parent {
  color: blue;

  .child {
    color: red;
  }

  &:hover {
    color: green;
  }
}
```

### 2. 变量
```scss
$primary-color: #1890ff;
$spacing: 16px;

.button {
  color: $primary-color;
  padding: $spacing;
}
```

### 3. Mixin
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  @include flex-center;
}
```

### 4. 父选择器引用
```scss
.button {
  &-primary { ... }
  &-secondary { ... }
  &:hover { ... }
}
```

## 转换脚本

已创建自动转换脚本：`scripts/convert-styles-to-scss.sh`

```bash
# 使用方法
./scripts/convert-styles-to-scss.sh
```

## 后续建议

### 1. 逐步优化现有样式
可以逐步将现有的 CSS 样式优化为 SCSS 语法：
- 使用嵌套减少重复
- 提取公共变量
- 创建可复用的 mixin

### 2. 创建全局 SCSS 工具
在 `src/styles/` 目录中：
- `_variables.scss` - 全局变量
- `_mixins.scss` - 全局 mixin
- `_utilities.scss` - 工具类

### 3. 组件样式模块化
对于复杂组件，可以像 SchemaLayout 一样：
- 提取为独立的 `.scss` 文件
- 使用 `@import` 导入
- 便于维护和复用

## 验证

所有转换后的文件已通过编译检查，无错误和警告。

## 注意事项

1. **保持 scoped**：所有样式仍然保持 `scoped` 作用域
2. **兼容性**：SCSS 完全向后兼容 CSS，现有样式无需修改即可工作
3. **构建配置**：项目已配置 SASS 支持，无需额外配置

## 相关文档

- [SASS 官方文档](https://sass-lang.com/)
- [Vue 样式指南](https://vuejs.org/api/sfc-css-features.html)
- [项目样式指南](./STYLE_GUIDE.md)
