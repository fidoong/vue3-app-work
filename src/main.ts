import type { UserModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import { createModalPlugin } from './components/base/BaseModal'
import '@unocss/reset/normalize.css'
import './styles/main.scss'
import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    // 安装 BaseModal 插件
    ctx.app.use(createModalPlugin({
      debug: false,
      containerClass: 'app-modal-container',
    }))

    // ctx.app.use(Previewer)
  },
)
