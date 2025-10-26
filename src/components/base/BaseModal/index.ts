/**
 * BaseModal 组件导出
 */

export * from './components'
export * from './composables'
// 默认导出全局弹窗实例
export { globalModal as default } from './composables/useModal'
export { default as ModalProvider } from './ModalProvider.vue'
export { createModalPlugin, initModalProvider } from './plugin'

export type { ModalPluginOptions } from './plugin'

export * from './types'
