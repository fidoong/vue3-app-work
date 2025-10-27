## Modules

自定义用户模块系统。在此目录下创建 `.ts` 文件，它们会被自动加载和安装。

### 模块模板

```ts
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // 在这里进行插件安装、配置等操作
}
```

### 现有模块

- **i18n.ts** - 国际化支持
- **pinia.ts** - 状态管理
- **nprogress.ts** - 页面加载进度条
- **pwa.ts** - PWA 支持
- **modal.ts** - 全局模态框管理
- **query.ts** - Vue Query 数据获取和缓存

### 添加新模块

1. 在 `src/modules` 目录下创建新的 `.ts` 文件
2. 导出 `install` 函数，遵循 `UserModule` 类型
3. 模块会在应用启动时自动加载

### 示例

```ts
// src/modules/my-plugin.ts
import type { UserModule } from '~/types'
import MyPlugin from 'my-plugin'

export const install: UserModule = ({ app }) => {
  app.use(MyPlugin, {
    // 插件配置
  })
}
```
