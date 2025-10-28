/**
 * 业务组件统一导出
 */

// 向后兼容：SchemaLayout 和 SchemaMenu 已迁移到 layout 目录
export { AppLayout as SchemaLayout } from '../layout/AppLayout'
export type { AppLayoutEmits as SchemaLayoutEmits, AppLayoutInstance as SchemaLayoutInstance, AppLayoutProps as SchemaLayoutProps } from '../layout/AppLayout'
export { AppMenu as SchemaMenu } from '../layout/AppMenu'
export type { MenuItemSchema, AppMenuEmits as SchemaMenuEmits, AppMenuInstance as SchemaMenuInstance, AppMenuProps as SchemaMenuProps } from '../layout/AppMenu'

export * from './SchemaDetail'
export * from './SchemaForm'
export * from './SchemaTable'
export * from './SearchForm'
