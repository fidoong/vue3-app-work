import type { UserModule } from '~/types'
import { setupVueQuery } from '~/lib/query'

/**
 * Vue Query 模块
 * 提供数据获取和缓存管理功能
 */
export const install: UserModule = ({ app }) => {
  setupVueQuery(app)
}
