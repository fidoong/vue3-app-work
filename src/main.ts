import type { UserModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import { createModalPlugin } from './components/base/BaseModal'
import { setupVueQuery } from './lib/query'
import '@unocss/reset/normalize.css'
import './styles/main.scss'
import 'uno.css'

const app = createApp(App)

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({ app, router, isClient: true }))

// 安装 BaseModal 插件
app.use(createModalPlugin({
  debug: false,
  containerClass: 'app-modal-container',
}))

// 安装 Vue Query
setupVueQuery(app)

app.mount('#app')
