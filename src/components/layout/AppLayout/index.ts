/**
 * AppLayout 组件导出
 */

import AppLayout from './AppLayout.vue'

export { AppLayout }
export default AppLayout

// 重新导出 MenuItemSchema 以便外部使用
export type { MenuItemSchema } from '../AppMenu/types'
export * from './composables'
export * from './types'
