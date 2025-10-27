import type { UserModule } from '~/types'
import { createModalPlugin } from '~/components/base/BaseModal'

/**
 * BaseModal 插件模块
 * 提供全局模态框管理功能
 */
export const install: UserModule = ({ app }) => {
  app.use(createModalPlugin({
    debug: import.meta.env.DEV,
    containerClass: 'app-modal-container',
  }))
}
