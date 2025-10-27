import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { UserModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import AppRoot from './App.vue'

// 样式导入
import '@unocss/reset/normalize.css'
import './styles/main.scss'
import 'uno.css'

/**
 * 创建路由实例
 */
function setupRouter(): Router {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes),
  })
}

/**
 * 安装用户模块
 * 自动加载 modules 目录下的所有模块
 */
function setupModules(app: App, router: Router): void {
  const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })
  Object.values(modules).forEach((module) => {
    module.install?.({ app, router, isClient: true })
  })
}

/**
 * 初始化应用
 */
async function bootstrap(): Promise<void> {
  const app = createApp(AppRoot)
  const router = setupRouter()

  // 注册路由
  app.use(router)

  // 安装所有模块（包括插件、状态管理等）
  setupModules(app, router)

  // 等待路由准备就绪
  await router.isReady()

  // 挂载应用
  app.mount('#app')
}

// 启动应用
bootstrap().catch(console.error)
