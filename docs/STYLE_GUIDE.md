# 样式系统指南

## 概述

项目采用模块化的 CSS 架构，使用 CSS 变量实现主题系统，提供丰富的工具类和组件样式增强。

## 文件结构

```
src/styles/
├── variables.css      # CSS 变量定义（颜色、间距、字体等）
├── base.css          # 基础样式和重置
├── utilities.css     # 工具类（原子类）
├── components.css    # Ant Design Vue 组件样式增强
├── markdown.css      # Markdown 样式
└── main.css          # 主入口文件
```

## CSS 变量系统

### 颜色系统

```css
/* 主色 */
--color-primary: #1890ff;
--color-primary-hover: #40a9ff;
--color-primary-active: #096dd9;
--color-primary-light: #e6f7ff;

/* 状态色 */
--color-success: #52c41a;
--color-warning: #faad14;
--color-error: #ff4d4f;
--color-info: #1890ff;

/* 文本色 */
--color-text-primary: rgba(0, 0, 0, 0.88);
--color-text-secondary: rgba(0, 0, 0, 0.65);
--color-text-tertiary: rgba(0, 0, 0, 0.45);

/* 背景色 */
--color-bg-base: #ffffff;
--color-bg-container: #ffffff;
--color-bg-layout: #f5f5f5;
```

### 间距系统

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-xxl: 24px;
--spacing-xxxl: 32px;
```

### 字体系统

```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 14px;
--font-size-lg: 16px;
--font-size-xl: 20px;
--font-size-xxl: 24px;
```

### 圆角

```css
--border-radius-sm: 2px;
--border-radius-base: 6px;
--border-radius-lg: 8px;
--border-radius-xl: 12px;
```

### 阴影

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03)...;
--shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.03)...;
--shadow-md: 0 6px 16px 0 rgba(0, 0, 0, 0.08)...;
--shadow-lg: 0 9px 28px 8px rgba(0, 0, 0, 0.05)...;
```

## 工具类使用

### 布局

```html
<!-- Flex 布局 -->
<div class="flex items-center justify-between">
  <span>左侧内容</span>
  <span>右侧内容</span>
</div>

<!-- 列布局 -->
<div class="flex flex-col">
  <div>第一行</div>
  <div>第二行</div>
</div>
```

### 间距

```html
<!-- Margin -->
<div class="mt-lg mb-xl">内容</div>

<!-- Padding -->
<div class="p-lg">内容</div>

<!-- 组合使用 -->
<div class="mt-sm mb-md px-lg py-sm">内容</div>
```

### 文本

```html
<!-- 文本对齐 -->
<div class="text-center">居中文本</div>
<div class="text-right">右对齐文本</div>

<!-- 文本大小 -->
<span class="text-lg">大号文本</span>
<span class="text-sm">小号文本</span>

<!-- 文本颜色 -->
<span class="text-primary">主色文本</span>
<span class="text-secondary">次要文本</span>
<span class="text-error">错误文本</span>

<!-- 文本截断 -->
<div class="truncate">这是一段很长的文本...</div>
<div class="line-clamp-2">这是一段需要限制行数的文本...</div>
```

### 显示和隐藏

```html
<div class="block">块级元素</div>
<div class="inline-block">行内块元素</div>
<div class="hidden">隐藏元素</div>
```

### 圆角和阴影

```html
<!-- 圆角 -->
<div class="rounded">默认圆角</div>
<div class="rounded-lg">大圆角</div>
<div class="rounded-full">完全圆角</div>

<!-- 阴影 -->
<div class="shadow">默认阴影</div>
<div class="shadow-md">中等阴影</div>
<div class="shadow-lg">大阴影</div>
```

## 页面布局

### 标准页面结构

```html
<div class="page-container">
  <!-- 页面头部 -->
  <div class="page-header">
    <h1 class="page-title">页面标题</h1>
    <p class="page-description">页面描述</p>
  </div>

  <!-- 页面内容 -->
  <div class="page-content">
    <!-- 你的内容 -->
  </div>
</div>
```

### 使用示例

```vue
<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">用户管理</h1>
      <p class="page-description">管理系统用户信息</p>
    </div>

    <div class="page-content">
      <a-space direction="vertical" :size="16" style="width: 100%">
        <!-- 搜索表单 -->
        <SearchForm :schemas="searchSchemas" @search="handleSearch" />

        <!-- 数据表格 -->
        <SchemaTable :columns="columns" :api="fetchUsers" />
      </a-space>
    </div>
  </div>
</template>
```

## 暗色主题

项目支持暗色主题，所有 CSS 变量在暗色模式下会自动切换：

```css
html.dark {
  --color-text-primary: rgba(255, 255, 255, 0.85);
  --color-bg-base: #000000;
  --color-bg-container: #141414;
  /* ... 其他变量 */
}
```

切换主题：

```typescript
// 切换到暗色主题
document.documentElement.classList.add('dark')

// 切换到亮色主题
document.documentElement.classList.remove('dark')
```

## 组件样式增强

项目对 Ant Design Vue 组件进行了样式增强，包括：

- 统一的圆角和阴影
- 更流畅的过渡动画
- 更好的悬停效果
- 优化的间距和排版

所有增强都在 `components.css` 中定义，无需额外配置即可使用。

## 响应式设计

使用 Ant Design Vue 的栅格系统：

```html
<a-row :gutter="[16, 16]">
  <a-col :xs="24" :sm="12" :md="8" :lg="6">
    <a-card>卡片内容</a-card>
  </a-col>
</a-row>
```

断点说明：
- `xs`: < 576px
- `sm`: ≥ 576px
- `md`: ≥ 768px
- `lg`: ≥ 992px
- `xl`: ≥ 1200px
- `xxl`: ≥ 1600px

## 性能优化

### 硬件加速

```css
.ant-modal {
  transform: translateZ(0);
  will-change: transform, opacity;
}
```

### 减少重排

```css
input,
textarea,
select {
  contain: layout style;
}
```

## 最佳实践

1. **优先使用 CSS 变量**
   ```css
   /* ✅ 推荐 */
   color: var(--color-primary);

   /* ❌ 不推荐 */
   color: #1890ff;
   ```

2. **使用工具类而非内联样式**
   ```html
   <!-- ✅ 推荐 -->
   <div class="flex items-center mt-lg">

   <!-- ❌ 不推荐 -->
   <div style="display: flex; align-items: center; margin-top: 16px;">
   ```

3. **保持样式模块化**
   - 组件样式使用 `scoped`
   - 全局样式放在 `styles/` 目录
   - 避免深层嵌套选择器

4. **使用语义化的类名**
   ```html
   <!-- ✅ 推荐 -->
   <div class="user-card">

   <!-- ❌ 不推荐 -->
   <div class="box1">
   ```

## 调试技巧

### 查看 CSS 变量

```javascript
// 在浏览器控制台
getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
```

### 修改 CSS 变量

```javascript
// 临时修改
document.documentElement.style.setProperty('--color-primary', '#ff0000')
```

## 扩展样式系统

### 添加新的 CSS 变量

在 `variables.css` 中添加：

```css
:root {
  --my-custom-color: #123456;
}

html.dark {
  --my-custom-color: #654321;
}
```

### 添加新的工具类

在 `utilities.css` 中添加：

```css
.my-custom-class {
  /* 你的样式 */
}
```

### 增强组件样式

在 `components.css` 中添加：

```css
.ant-my-component {
  /* 你的增强样式 */
}
```
