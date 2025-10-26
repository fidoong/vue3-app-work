# SCSS 样式优化指南

## 优化原则

### 1. 使用嵌套减少重复
**优化前**:
```scss
.search-actions {
  display: flex;
}

.search-actions-footer {
  display: flex;
}
```

**优化后**:
```scss
.search-actions {
  display: flex;

  &-footer {
    display: flex;
  }
}
```

### 2. 使用父选择器引用 (&)
**优化前**:
```scss
.button {
  color: blue;
}

.button:hover {
  color: red;
}

.button-primary {
  background: blue;
}
```

**优化后**:
```scss
.button {
  color: blue;

  &:hover {
    color: red;
  }

  &-primary {
    background: blue;
  }
}
```

### 3. 提取大型样式为独立文件
当组件样式超过 50 行时，考虑提取为独立的 `.scss` 文件：

```vue
<style scoped lang="scss">
@import './ComponentName.scss';
</style>
```

### 4. 使用注释分组
```scss
// ========== 主容器 ==========
.container {
  ...
}

// ========== 子元素 ==========
.item {
  ...
}
```

### 5. 合理使用 :deep()
**优化前**:
```scss
.parent :deep(.child) {
  color: red;
}

.parent :deep(.child:hover) {
  color: blue;
}
```

**优化后**:
```scss
.parent {
  :deep(.child) {
    color: red;

    &:hover {
      color: blue;
    }
  }
}
```

## 已优化的组件

### 1. SearchForm.vue
- ✅ 使用 `&-footer` 嵌套
- ✅ 减少重复代码

### 2. SchemaTable.vue
- ✅ 使用 `&-toolbar` 嵌套
- ✅ 添加注释分组
- ✅ 优化 toolbar 子元素

### 3. SchemaLayout.vue
- ✅ 提取为独立 SCSS 文件
- ✅ 使用变量和 mixin
- ✅ 完整的嵌套结构

### 4. index.vue (首页)
- ✅ 提取为独立 SCSS 文件
- ✅ 使用 BEM 命名规范
- ✅ 完整的嵌套结构
- ✅ 注释分组

## 优化示例

### 示例 1: 卡片组件

**优化前**:
```scss
.card {
  padding: 16px;
}

.card-header {
  font-size: 18px;
}

.card-body {
  margin-top: 12px;
}

.card-footer {
  border-top: 1px solid #eee;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**优化后**:
```scss
.card {
  padding: 16px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  &-header {
    font-size: 18px;
  }

  &-body {
    margin-top: 12px;
  }

  &-footer {
    border-top: 1px solid #eee;
  }
}
```

### 示例 2: 表单组件

**优化前**:
```scss
.form-item {
  margin-bottom: 16px;
}

.form-item-label {
  font-weight: 500;
}

.form-item-input {
  width: 100%;
}

.form-item-error {
  color: red;
}

.form-item.is-required .form-item-label::after {
  content: '*';
  color: red;
}
```

**优化后**:
```scss
.form-item {
  margin-bottom: 16px;

  &-label {
    font-weight: 500;
  }

  &-input {
    width: 100%;
  }

  &-error {
    color: red;
  }

  &.is-required &-label::after {
    content: '*';
    color: red;
  }
}
```

### 示例 3: 使用变量

**优化前**:
```scss
.button-primary {
  background: #1890ff;
  color: white;
}

.link-primary {
  color: #1890ff;
}

.border-primary {
  border-color: #1890ff;
}
```

**优化后**:
```scss
$primary-color: #1890ff;

.button-primary {
  background: $primary-color;
  color: white;
}

.link-primary {
  color: $primary-color;
}

.border-primary {
  border-color: $primary-color;
}
```

### 示例 4: 使用 Mixin

**优化前**:
```scss
.card {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**优化后**:
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  @include flex-center;
}

.modal {
  @include flex-center;
}
```

## 最佳实践

### 1. 命名规范
- 使用 BEM 命名: `.block__element--modifier`
- 或使用连字符: `.block-element-modifier`
- 保持一致性

### 2. 嵌套深度
- 最多 3-4 层嵌套
- 过深的嵌套会降低可读性

### 3. 选择器优先级
- 避免使用 `!important`
- 使用类选择器而非 ID 选择器
- 保持选择器简洁

### 4. 性能考虑
- 避免过度嵌套
- 使用高效的选择器
- 合理使用 `:deep()`

### 5. 可维护性
- 添加注释说明
- 使用有意义的类名
- 保持代码整洁

## 工具和资源

### 推荐工具
- **Stylelint**: SCSS 代码检查
- **Prettier**: 代码格式化
- **VS Code SCSS IntelliSense**: 智能提示

### 学习资源
- [SASS 官方文档](https://sass-lang.com/)
- [SCSS 最佳实践](https://sass-guidelin.es/)
- [BEM 命名规范](http://getbem.com/)

## 下一步

1. 逐步优化其他页面组件
2. 提取公共样式到 `src/styles/`
3. 创建可复用的 mixin 库
4. 统一命名规范

## 注意事项

- 优化时保持功能不变
- 测试样式是否正常显示
- 保持代码可读性
- 遵循项目规范
