/**
 * Ant Design Vue 主题配置模块
 */
import type { UserModule } from '~/types'
import { theme } from 'ant-design-vue'

export const install: UserModule = ({ app }) => {
  // 配置 Ant Design Vue 全局配置
  app.provide('antdTheme', {
    algorithm: theme.defaultAlgorithm,
  })
}
