/**
 * 监控模块统一导出
 * 集成 Sentry 错误追踪 + Web Vitals 性能监控
 */

// 配置和类型
export * from './config'

// 核心功能 - Integration
export { integrateHttpClient, sendWebVitalsToSentry } from './integration'

// 核心功能 - Sentry
export * from './sentry'

export * from './types'
// 实用工具
export {
  createPerformanceReport,
  deferMonitoring,
  getMetricUnit,
  getPerformanceColor,
  getPerformanceText,
  isDevelopment,
  isGoodPerformance,
  isPoorPerformance,
  isProduction,
  needsImprovement,
  safeMonitoring,
} from './utils'

// 重新导出避免冲突的函数
export {
  formatMetricValue as formatWebVitalsValue,
  getPerformanceRating as getWebVitalsRating,
} from './utils'

// Web Vitals - 避免命名冲突，使用命名空间导出
export {
  getMetricThresholds,
  initWebVitals,
  type WebVitalsConfig,
} from './web-vitals'
