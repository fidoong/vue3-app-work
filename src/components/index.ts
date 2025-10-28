/**
 * 组件统一导出
 */

// 基础组件
export * from './base'

export { globalModal as FunModal } from './base/BaseModal'

// 业务组件
export * from './business'

// 向后兼容：保留旧的导出路径
export { SchemaForm as DynamicForm } from './business/SchemaForm'

export { default as DynamicFormCompat } from './business/SchemaForm'
// 布局组件
export * from './layout'
// 共享模块
export * from './shared'
