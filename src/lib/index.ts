/**
 * 核心库统一导出
 */

// 错误追踪（显式导出以避免与 HTTP 模块的 ErrorHandler 冲突）
export { ErrorTracker } from './error'

export type { ErrorContext, ErrorHandler as ErrorHandlerFn, ErrorReport } from './error'

// HTTP 客户端
export * from './http'
// 性能监控
export * from './performance'

// TanStack Query 配置
export * from './query'

// WebSocket 客户端
export * from './websocket'
