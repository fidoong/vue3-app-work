# Theme System

完整的主题系统，提供主题配置、暗色模式、Ant Design Vue 集成等功能。

## 📁 目录结构

```
theme/
├── index.ts                    # 统一导出
├── README.md                   # 文档
├── components/                 # 组件
│   ├── ThemeProvider.vue      # 主题提供者（包含 Ant Design 集成）
│   ├── ThemeButton.vue        # 浮动按钮
│   └── ThemeDrawer.vue        # 设置抽屉
├── composables/               # Composables
│   ├── index.ts
│   ├── useTheme.ts            # 主题管理
│   └── useThemeDrawer.ts      # 抽屉状态
├── constants/                 # 常量
│   ├── index.ts
│   └── presets.ts             # 主题预设
├── types/                     # 类型定义
│   └── index.ts
└── utils/                     # 工具函数
    ├── index.ts
    ├── storage.ts             # 存储工具
    └── dom.ts                 # DOM 操作
```

## 🚀 快速开始

### 1. 在 App.vue 中使用

```vue
<script setup>
import { ThemeProvider } from '~/components/theme'
</script>

<template>
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>
```

### 2. 在组件中使用

```vue
<script setup>
import { useTheme } from '~/components/theme'

const { isDark, toggleDark, setThemePreset } = useTheme()
</script>

<template>
  <button @click="toggleDark">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>
```

## 📚 API

### useTheme()

```typescript
const {
  // 状态
  isDark,           // Ref<boolean> - 是否暗色模式
  themeConfig,      // Readonly<Ref<ThemeConfig>> - 主题配置
  currentPreset,    // ComputedRef<ThemePreset> - 当前预设
  themeColors,      // ComputedRef<ThemeColors> - 主题颜色

  // 方法
  toggleDark,       // () => void - 切换暗色模式
  setThemeMode,     // (mode: ThemeMode) => void - 设置主题模式
  setThemePreset,   // (preset: string) => void - 设置主题预设
  setCustomColor,   // (key: string, value: string) => void - 自定义颜色
  setCustomColors,  // (colors: Record<string, string>) => void - 批量自定义
  resetTheme,       // () => void - 重置主题
  getThemePresets,  // () => Array - 获取所有预设
  applyTheme,       // () => void - 应用主题
} = useTheme()
```

## 🎨 主题预设

- `default` - 默认蓝色 (#1890ff)
- `purple` - 紫色 (#722ed1)
- `green` - 绿色 (#52c41a)
- `orange` - 橙色 (#fa8c16)
- `red` - 红色 (#f5222d)

## 💡 使用示例

查看 `/theme-demo` 和 `/dark-theme-test` 页面。
