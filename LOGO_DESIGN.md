# Logo 设计说明

## Logo 文件

**位置**: `public/logo.svg`

### 设计元素

1. **主体**: 蓝色渐变圆形背景
   - 起始色: `#1890ff` (Ant Design 主色)
   - 结束色: `#096dd9` (深蓝色)
   - 尺寸: 32x32px

2. **图标**: 字母 "V" (代表 Vue)
   - 颜色: 白色
   - 位置: 居中
   - 样式: 简洁现代

3. **装饰**: 底部弧线
   - 颜色: 白色 (60% 透明度)
   - 样式: 圆角线条
   - 寓意: 连接与流动

## 使用方式

### 在布局中使用

```vue
<template>
  <SchemaLayout
    logo="/logo.svg"
    title="Vue Admin"
    :menu-items="menuItems"
  />
</template>
```

### 使用组件

```vue
<template>
  <SchemaLayout
    :logo="LogoComponent"
    title="Your App"
  />
</template>

<script setup>
import LogoComponent from './Logo.vue'
</script>
```

## Logo 区域样式

### 布局特性

- **高度**: 64px (与头部高度一致)
- **内边距**: 0 24px
- **对齐**: 左对齐
- **间距**: Logo 与标题间距 12px

### 视觉效果

**亮色主题:**
- 边框: `rgba(0, 0, 0, 0.06)`
- 标题颜色: `rgba(0, 0, 0, 0.85)`

**暗色主题:**
- 边框: `rgba(255, 255, 255, 0.1)`
- 标题颜色: `#fff`

### 交互动画

1. **Logo 悬停效果**
   ```css
   transform: scale(1.1) rotate(5deg)
   transition: 0.3s
   ```

2. **标题淡入淡出**
   - 侧边栏展开: 淡入显示
   - 侧边栏折叠: 淡出隐藏
   - 过渡时间: 0.3s

3. **鼠标悬停**
   - Logo 放大 10% 并旋转 5°
   - 平滑过渡效果

## 自定义 Logo

### 方法 1: 替换 SVG 文件

直接替换 `public/logo.svg` 文件，保持尺寸为 32x32px。

### 方法 2: 使用图片

```vue
<SchemaLayout
  logo="/your-logo.png"
  title="Your App"
/>
```

支持的格式: PNG, JPG, SVG, WebP

### 方法 3: 使用 Vue 组件

创建自定义 Logo 组件:

```vue
<!-- components/Logo.vue -->
<template>
  <div class="custom-logo">
    <svg>...</svg>
  </div>
</template>

<style scoped>
.custom-logo {
  width: 32px;
  height: 32px;
}
</style>
```

使用:

```vue
<script setup>
import CustomLogo from './components/Logo.vue'
</script>

<template>
  <SchemaLayout
    :logo="CustomLogo"
    title="Your App"
  />
</template>
```

## 标题样式

### 字体设置

- **字号**: 18px
- **字重**: 600 (Semi-bold)
- **字间距**: 0.5px
- **最大宽度**: 自适应

### 响应式行为

- **展开状态**: 显示完整标题
- **折叠状态**: 隐藏标题，仅显示 Logo
- **过渡**: 淡入淡出动画

## 设计建议

### Logo 设计原则

1. **简洁**: 保持图标简单，易于识别
2. **对比**: 确保在亮色/暗色主题下都清晰可见
3. **尺寸**: 建议 32x32px，最大不超过 40x40px
4. **格式**: 优先使用 SVG，支持缩放不失真

### 标题文本建议

1. **长度**: 建议 2-4 个汉字或 6-12 个英文字符
2. **风格**: 与品牌调性一致
3. **可读性**: 确保在小尺寸下清晰可读

### 颜色搭配

**推荐配色方案:**

1. **蓝色系** (默认)
   - 主色: `#1890ff`
   - 辅色: `#096dd9`

2. **绿色系**
   - 主色: `#52c41a`
   - 辅色: `#389e0d`

3. **紫色系**
   - 主色: `#722ed1`
   - 辅色: `#531dab`

4. **橙色系**
   - 主色: `#fa8c16`
   - 辅色: `#d46b08`

## 示例代码

### 完整示例

```vue
<script setup lang="ts">
import { SchemaLayout } from '~/components/business/SchemaLayout'
import type { MenuItemSchema, UserInfo } from '~/components/business/SchemaLayout/types'

const menuItems: MenuItemSchema[] = [...]
const userInfo: UserInfo = {...}
</script>

<template>
  <SchemaLayout
    logo="/logo.svg"
    title="Vue Admin"
    theme="light"
    :menu-items="menuItems"
    :user-info="userInfo"
    show-breadcrumb
    show-tabs
    fixed-header
    fixed-sidebar
  >
    <RouterView />
  </SchemaLayout>
</template>
```

## 技术细节

### CSS 类名

- `.layout-logo` - Logo 容器
- `.layout-logo-dark` - 暗色主题
- `.layout-logo-icon` - Logo 图标
- `.layout-title` - 标题文本
- `.layout-title-dark` - 暗色标题

### 过渡动画

```css
/* Logo 图标动画 */
.layout-logo-icon {
  transition: transform 0.3s;
}

.layout-logo:hover .layout-logo-icon {
  transform: scale(1.1) rotate(5deg);
}

/* 标题淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 性能优化

1. **SVG 优化**: 使用 SVGO 压缩 SVG 文件
2. **懒加载**: Logo 图片使用懒加载
3. **缓存**: 利用浏览器缓存机制
4. **CDN**: 生产环境建议使用 CDN

## 常见问题

### Q: Logo 显示模糊？
A: 使用 SVG 格式或 2x/3x 高清图片。

### Q: 如何调整 Logo 大小？
A: 修改 `.layout-logo-icon` 的 `width` 和 `height`。

### Q: 标题文字过长怎么办？
A: 使用 `text-overflow: ellipsis` 或缩短标题文本。

### Q: 如何禁用悬停动画？
A: 移除 `.layout-logo:hover .layout-logo-icon` 样式。

---

**设计师**: Kiro AI
**版本**: 1.0.0
**更新日期**: 2025-10-26
