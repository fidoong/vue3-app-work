# 构建优化指南

## 代码分割策略

### 1. 依赖分割

项目采用智能代码分割策略，自动将依赖按使用频率和功能分组：

#### Vue 生态系统
- `vue-core` - Vue 核心库
- `vue-router` - 路由管理
- `pinia` - 状态管理
- `vue-i18n` - 国际化
- `vueuse` - Vue 工具库

#### UI 组件库 (Ant Design Vue)
- `antd-base` - 基础组件 (Button, Icon, Layout)
- `antd-form` - 表单组件 (Form, Input, Select)
- `antd-data` - 数据展示 (Table, Tree, Calendar)
- `antd-feedback` - 反馈组件 (Modal, Message, Notification)

#### 工具库
- `axios` - HTTP 客户端
- `vue-query` - 数据请求管理
- `motion` - 动画库
- `iconify` - 图标库

#### 监控和性能
- `sentry` - 错误追踪
- `web-vitals` - 性能监控

### 2. 项目代码分割

#### 核心库模块
- `lib-http` - HTTP 客户端封装
- `lib-websocket` - WebSocket 客户端
- `lib-monitoring` - 监控系统
- `lib-error` - 错误处理
- `lib-core` - 其他核心功能

#### 组件库
- `components-business` - 业务组件 (SchemaForm, SchemaTable)
- `components-base` - 基础组件 (ErrorBoundary, BaseModal)
- `components-shared` - 共享资源

#### 其他模块
- `utils` - 工具函数
- `api-services` - API 服务层
- `pages-main` - 主要页面
- `pages-demos` - 演示页面

## 构建命令

### 开发环境
```bash
pnpm dev
```

### 生产构建
```bash
pnpm build
```

### 构建分析
```bash
# 生成 bundle 分析报告
pnpm analyze

# 或使用专用配置
vite build --config vite.config.analyze.ts
```

### 预览构建结果
```bash
pnpm preview
```

## 性能优化建议

### 1. 懒加载路由

```typescript
// 推荐: 使用动态导入
const routes = [
  {
    path: '/admin',
    component: () => import('./pages/admin/index.vue'),
  },
]

// 不推荐: 直接导入
import AdminPage from './pages/admin/index.vue'
```

### 2. 按需导入组件

```typescript
// 推荐: 按需导入
import { Button, Form } from 'ant-design-vue'

// 不推荐: 全量导入
import Antd from 'ant-design-vue'
```

### 3. 使用 Tree Shaking

```typescript
// 推荐: 具名导入
import { debounce, throttle } from 'lodash-es'

// 不推荐: 默认导入
import _ from 'lodash'
```

### 4. 图片优化

```typescript
// 使用 WebP 格式
<img src="image.webp" alt="优化后的图片" />

// 使用懒加载
<img loading="lazy" src="image.jpg" alt="懒加载图片" />

// 使用响应式图片
<img
  srcset="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 640px) 100vw, 640px"
  src="image-640w.jpg"
  alt="响应式图片"
/>
```

### 5. CSS 优化

```vue
<!-- 使用 scoped 样式 -->
<style scoped>
.component { }
</style>

<!-- 使用 CSS Modules -->
<style module>
.component { }
</style>

<!-- 使用 UnoCSS 原子类 -->
<div class="flex items-center justify-center">
```

## 构建产物分析

### 查看 Bundle 大小

```bash
# 构建后查看产物
ls -lh dist/assets/js/

# 使用 bundle analyzer
pnpm analyze
```

### 优化目标

- **首屏 JS**: < 200KB (gzip)
- **首屏 CSS**: < 50KB (gzip)
- **总体积**: < 1MB (gzip)
- **Chunk 数量**: 10-20 个

### 常见问题

#### 1. Chunk 过大

**问题**: 某个 chunk 超过 500KB

**解决**:
```typescript
// 进一步拆分大型依赖
if (id.includes('large-library')) {
  return 'large-library-chunk'
}
```

#### 2. Chunk 过多

**问题**: 生成了 50+ 个 chunk

**解决**:
```typescript
// 合并小型 chunk
if (size < 20 * 1024) { // 小于 20KB
  return 'vendor'
}
```

#### 3. 重复依赖

**问题**: 多个 chunk 包含相同的依赖

**解决**:
```typescript
// 提取公共依赖
if (isCommonDependency(id)) {
  return 'common'
}
```

## 性能指标

### 目标指标

- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.8s
- **TBT** (Total Blocking Time): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 监控工具

- Lighthouse
- WebPageTest
- Chrome DevTools Performance
- Vite Bundle Analyzer

## 持续优化

### 定期检查

```bash
# 每次发版前运行
pnpm analyze
pnpm typecheck
pnpm test:coverage
```

### 优化清单

- [ ] 检查 bundle 大小
- [ ] 分析依赖关系
- [ ] 移除未使用的代码
- [ ] 优化图片资源
- [ ] 压缩静态资源
- [ ] 启用 CDN 加速
- [ ] 配置缓存策略

## 相关资源

- [Vite 构建优化](https://vitejs.dev/guide/build.html)
- [Rollup 代码分割](https://rollupjs.org/guide/en/#code-splitting)
- [Web Performance](https://web.dev/performance/)
