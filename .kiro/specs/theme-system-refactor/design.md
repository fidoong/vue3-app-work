# Design Document - 主题系统重构

## 架构设计

### 1. 主题系统架构

```
Theme System
├── useTheme (主题管理)
│   ├── 原生 localStorage 持久化
│   ├── 原生 matchMedia 暗色模式检测
│   ├── 主题预设管理
│   └── CSS 变量动态应用
├── useMotion (动画管理)
│   ├── 原生 IntersectionObserver
│   ├── 原生事件监听
│   ├── 减少动画偏好检测
│   └── 动画预设配置
└── CSS Variables (样式变量)
    ├── 主题颜色 (--theme-color-*)
    ├── 动画配置 (--motion-*)
    └── 语义化变量 (--color-*, --spacing-*)
```

### 2. 核心特性

#### 2.1 原生 API 实现
- **localStorage**: 替代 VueUse 的 useStorage
- **matchMedia**: 替代 VueUse 的 useDark
- **IntersectionObserver**: 替代 VueUse 的 useIntersectionObserver
- **addEventListener**: 替代 VueUse 的 useEventListener

#### 2.2 性能优化
- **防抖机制**: 主题切换时 100ms 防抖，避免频繁 DOM 操作
- **批量更新**: CSS 变量批量应用，减少重排重绘
- **GPU 加速**: 动画使用 transform 和 opacity
- **懒加载**: 主题资源按需加载

#### 2.3 CSS 变量分层
```scss
// 第一层：主题令牌（JS 控制）
--theme-color-primary
--theme-color-success

// 第二层：语义化变量（CSS 引用）
--color-primary: var(--theme-color-primary, #1890ff)
--color-primary-hover
```

### 3. 数据流设计

```
用户操作
  ↓
setThemeMode/setThemePreset
  ↓
更新 themeConfig (ref)
  ↓
saveThemeConfig (localStorage)
  ↓
applyTheme (防抖)
  ↓
批量更新 CSS 变量
  ↓
DOM 样式更新
```

## 技术实现

### 1. 主题配置结构

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  preset: string
  customColors: Partial<ThemeColors>
}
```

### 2. 暗色模式检测

```typescript
// 原生 matchMedia API
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeQuery.addEventListener('change', handleChange)
```

### 3. 动画系统

#### 3.1 动画预设
- fade: 淡入淡出
- slide: 滑动（支持 4 个方向）
- scale: 缩放
- bounce: 弹跳
- flip: 翻转
- zoom: 放大

#### 3.2 减少动画支持
```typescript
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (mediaQuery.matches) {
  // 简化动画，duration < 50ms
}
```

### 4. CSS 变量命名规范

```scss
// 主题颜色（JS 动态修改）
--theme-color-{name}

// 动画配置
--motion-duration-{speed}
--motion-ease-{type}

// 语义化颜色
--color-{semantic}-{variant}

// 间距
--spacing-{size}

// 字体
--font-{property}-{size}
```

## 使用示例

### 1. 主题切换

```vue
<script setup>
const { isDark, toggleDark, setThemePreset } = useTheme()

// 切换暗色模式
toggleDark()

// 切换主题预设
setThemePreset('purple')
</script>
```

### 2. 自定义主题

```typescript
const { setCustomColor, setCustomColors } = useTheme()

// 单个颜色
setCustomColor('primary', '#722ed1')

// 批量设置
setCustomColors({
  primary: '#722ed1',
  success: '#52c41a',
})
```

### 3. 动画使用

```vue
<script setup>
const { getPreset, createMotion } = useMotion()

// 使用预设
const fadeConfig = getPreset('fade')

// 自定义配置
const customMotion = createMotion({
  duration: 300,
  easing: 'easeOutBack',
})
</script>

<template>
  <Transition v-bind="pageTransition">
    <router-view />
  </Transition>
</template>
```

### 4. 视口动画

```vue
<script setup>
const target = ref<HTMLElement | null>(null)
const { isVisible, motionConfig } = useIntersectionMotion(target, 'slide', 'up')
</script>

<template>
  <div ref="target" :style="motionConfig">
    内容在进入视口时滑入
  </div>
</template>
```

## 迁移指南

### 从 VueUse 迁移

```typescript
// 旧代码
import { useDark, useToggle, useStorage } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 新代码
import { useTheme } from '~/composables/useTheme'
const { isDark, toggleDark } = useTheme()
```

### CSS 变量更新

```scss
// 旧代码
color: var(--color-primary);

// 新代码（保持兼容）
color: var(--color-primary); // 仍然有效

// 或直接使用主题令牌
color: var(--theme-color-primary);
```

## 测试策略

### 1. 单元测试
- 主题配置加载/保存
- 暗色模式切换
- 自定义颜色应用

### 2. 集成测试
- 主题切换流程
- 动画预设应用
- 视口动画触发

### 3. 性能测试
- 主题切换响应时间 < 100ms
- 动画帧率 > 60fps
- 内存占用稳定

## 浏览器兼容性

- Chrome/Edge: 88+
- Firefox: 78+
- Safari: 14+
- 支持 CSS Variables
- 支持 IntersectionObserver
- 支持 matchMedia

## 未来扩展

1. **主题编辑器**: 可视化主题配置工具
2. **主题市场**: 社区主题分享
3. **动画编辑器**: 自定义动画曲线
4. **主题导入导出**: JSON 格式主题文件
