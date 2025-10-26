/**
 * BaseModal 插件
 */

import type { App } from 'vue'
import { createApp, nextTick } from 'vue'
import { globalModal } from './composables/useModal'
import ModalProvider from './ModalProvider.vue'

export interface ModalPluginOptions {
  /** 是否启用调试模式 */
  debug?: boolean
  /** 容器类名 */
  containerClass?: string
  /** 是否自动初始化（默认 true） */
  autoInit?: boolean
}

// 全局状态
let globalInitFn: (() => void) | null = null
let isInitialized = false

/**
 * 手动初始化 Modal Provider
 * 在某些情况下，如果自动初始化失败，可以手动调用此函数
 */
export function initModalProvider() {
  if (globalInitFn) {
    globalInitFn()
  }
  else {
    console.warn('[BaseModal] Plugin not installed yet')
  }
}

/**
 * 创建 Modal 插件
 */
export function createModalPlugin(options: ModalPluginOptions = {}) {
  const { autoInit = true, debug = false } = options
  let modalApp: App | null = null
  let container: HTMLElement | null = null
  let domReadyListener: (() => void) | null = null

  return {
    install(app: App) {
      // 将 globalModal 挂载到 app.config.globalProperties
      app.config.globalProperties.$modal = globalModal

      // 初始化函数
      const initModalProviderFn = () => {
        // 检查是否在浏览器环境
        if (typeof window === 'undefined' || typeof document === 'undefined') {
          if (debug) {
            console.warn('[BaseModal] Not in browser environment, skipping initialization')
          }
          return
        }

        // 避免重复初始化
        if (isInitialized || container) {
          if (debug) {
            console.warn('[BaseModal] Already initialized')
          }
          return
        }

        // 标记为已初始化
        isInitialized = true

        // 创建容器元素
        container = document.createElement('div')
        container.id = 'modal-container'
        if (options.containerClass) {
          container.className = options.containerClass
        }
        document.body.appendChild(container)

        // 挂载 ModalProvider
        modalApp = createApp(ModalProvider)

        // 继承父应用的上下文
        modalApp._context = app._context

        modalApp.mount(container)

        if (debug) {
          console.warn('[BaseModal] Plugin initialized successfully')
        }

        // 清理 DOMContentLoaded 监听器
        if (domReadyListener) {
          document.removeEventListener('DOMContentLoaded', domReadyListener)
          domReadyListener = null
        }
      }

      // 保存初始化函数到全局，以便手动调用
      globalInitFn = initModalProviderFn

      // 自动初始化
      if (autoInit && typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
          // DOM 还在加载，等待 DOMContentLoaded
          domReadyListener = initModalProviderFn
          document.addEventListener('DOMContentLoaded', domReadyListener, { once: true })
        }
        else {
          // DOM 已就绪，使用 nextTick 确保在主应用挂载后初始化
          nextTick(initModalProviderFn)
        }
      }
      else if (debug) {
        console.warn('[BaseModal] Auto-init disabled, call initModalProvider() manually')
      }

      // 清理函数
      const originalUnmount = app.unmount
      app.unmount = function (this: App) {
        // 清理 ModalProvider
        if (modalApp) {
          modalApp.unmount()
          modalApp = null
        }

        // 清理容器
        if (container) {
          container.remove()
          container = null
        }

        // 清理监听器
        if (domReadyListener) {
          document.removeEventListener('DOMContentLoaded', domReadyListener)
          domReadyListener = null
        }

        // 重置全局状态
        globalInitFn = null
        isInitialized = false

        if (debug) {
          console.warn('[BaseModal] Plugin cleaned up')
        }

        return originalUnmount.call(this)
      }
    },
  }
}

// 默认导出
export default createModalPlugin
