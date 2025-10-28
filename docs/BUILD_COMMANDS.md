# 构建命令使用指南

## 开发环境

### 启动开发服务器
```bash
pnpm dev
```
- 端口: 3333
- 自动打开浏览器
- 热模块替换 (HMR)
- 预热常用文件

## 生产构建

### 标准构建
```bash
pnpm build
```
生成优化后的生产代码到 `dist/` 目录

### 构建 + 可视化分析
```bash
pnpm build:analyze
```
- 生成构建产物
- 自动打开 bundle 可视化报告 (treemap)
- 显示 gzip 和 brotli 压缩后的大小

### 构建 + 文本报告
```bash
pnpm build:report
```
- 生成构建产物
- 在终端显示详细的文本报告
- 包含文件大小、优化建议等

### 快速分析
```bash
pnpm analyze
```
使用 vite-bundle-visualizer 快速分析现有构建

## 预览构建结果

### HTTP 预览
```bash
pnpm preview
```
在本地启动 HTTP 服务器预览构建结果

### HTTPS 预览
```bash
pnpm preview:https
```
使用 HTTPS 预览（需要安装 `serve`）

## 代码质量检查

### 类型检查
```bash
pnpm typecheck
```

### 代码检查和修复
```bash
pnpm lint
```

### 完整检查
```bash
pnpm check
```
运行 lint + typecheck + unit tests

## 测试

### 单元测试
```bash
pnpm test:unit
```

### E2E 测试
```bash
pnpm test:e2e
```

### 测试覆盖率
```bash
pnpm test:coverage
```

## 依赖管理

### 更新依赖
```bash
pnpm up
```
使用 taze 更新主要版本依赖

### 检查包大小
```bash
pnpm sizecheck
```

## 构建产物说明

### 目录结构
```
dist/
├── assets/
│   ├── js/           # JavaScript 文件
│   │   ├── vue-core-[hash].js
│   │   ├── vue-router-[hash].js
│   │   ├── antd-base-[hash].js
│   │   ├── lib-http-[hash].js
│   │   └── ...
│   ├── css/          # CSS 文件
│   ├── images/       # 图片资源
│   └── fonts/        # 字体文件
├── index.html
└── stats.html        # Bundle 分析报告 (使用 build:analyze)
```

### Chunk 说明

#### 核心依赖
- `vue-core.js` - Vue 核心库
- `vue-router.js` - 路由管理
- `pinia.js` - 状态管理
- `vue-i18n.js` - 国际化

#### UI 组件
- `antd-base.js` - 基础 UI 组件
- `antd-form.js` - 表单组件
- `antd-data.js` - 数据展示组件
- `antd-feedback.js` - 反馈组件

#### 项目代码
- `lib-http.js` - HTTP 客户端
- `lib-websocket.js` - WebSocket 客户端
- `components-business.js` - 业务组件
- `api-services.js` - API 服务
- `pages-main.js` - 主要页面

## 性能优化建议

### 1. 首次构建慢
```bash
# 清理缓存重新构建
rm -rf node_modules/.vite
pnpm build
```

### 2. 构建产物过大
```bash
# 分析哪些依赖占用空间大
pnpm build:analyze

# 查看详细报告
pnpm build:report
```

### 3. 开发服务器慢
```bash
# 检查是否有大量依赖需要预构建
# 在 vite.config.ts 中添加到 optimizeDeps.include
```

## CI/CD 集成

### GitHub Actions 示例
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test:unit --run

      - name: Build
        run: pnpm build

      - name: Analyze bundle
        run: pnpm build:report
```

## 故障排查

### 构建失败
1. 检查 Node.js 版本 (推荐 18+)
2. 清理依赖: `rm -rf node_modules && pnpm install`
3. 清理缓存: `rm -rf node_modules/.vite`

### 类型错误
```bash
# 重新生成类型文件
pnpm typecheck
```

### 内存不足
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

## 相关文档

- [构建优化指南](./BUILD_OPTIMIZATION.md)
- [Vite 官方文档](https://vitejs.dev/)
- [性能优化最佳实践](https://web.dev/performance/)
