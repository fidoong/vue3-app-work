/**
 * 权限判断工具函数
 */

/**
 * 权限配置
 */
interface PermissionConfig {
  /** 用户权限列表 */
  permissions: string[]
  /** 用户角色列表 */
  roles: string[]
}

let permissionConfig: PermissionConfig = {
  permissions: [],
  roles: [],
}

/**
 * 设置权限配置
 */
export function setPermissionConfig(config: Partial<PermissionConfig>): void {
  permissionConfig = { ...permissionConfig, ...config }
}

/**
 * 获取权限配置
 */
export function getPermissionConfig(): PermissionConfig {
  return { ...permissionConfig }
}

/**
 * 判断是否有指定权限（满足任一即可）
 * @param permission - 权限标识或权限数组
 * @returns 是否有权限
 * @example
 * hasPermission('user:create') // true/false
 * hasPermission(['user:edit', 'user:delete']) // 有任一权限即返回 true
 */
export function hasPermission(permission: string | string[]): boolean {
  const { permissions } = permissionConfig

  if (Array.isArray(permission))
    return permission.some(p => permissions.includes(p))

  return permissions.includes(permission)
}

/**
 * 判断是否有所有指定权限
 */
export function hasAllPermissions(permissions: string[]): boolean {
  const { permissions: userPermissions } = permissionConfig
  return permissions.every(p => userPermissions.includes(p))
}

/**
 * 判断是否有指定角色
 */
export function hasRole(role: string | string[]): boolean {
  const { roles } = permissionConfig

  if (Array.isArray(role))
    return role.some(r => roles.includes(r))

  return roles.includes(role)
}

/**
 * 判断是否有所有指定角色
 */
export function hasAllRoles(roles: string[]): boolean {
  const { roles: userRoles } = permissionConfig
  return roles.every(r => userRoles.includes(r))
}

/**
 * 判断是否为超级管理员
 */
export function isSuperAdmin(): boolean {
  return hasRole('super_admin') || hasRole('admin')
}

/**
 * 权限指令检查
 */
export function checkPermission(value: string | string[], mode: 'some' | 'every' = 'some'): boolean {
  const permissions = Array.isArray(value) ? value : [value]

  if (permissions.length === 0)
    return true

  if (isSuperAdmin())
    return true

  return mode === 'some' ? hasPermission(permissions) : hasAllPermissions(permissions)
}

/**
 * 角色指令检查
 */
export function checkRole(value: string | string[], mode: 'some' | 'every' = 'some'): boolean {
  const roles = Array.isArray(value) ? value : [value]

  if (roles.length === 0)
    return true

  return mode === 'some' ? hasRole(roles) : hasAllRoles(roles)
}

/**
 * 清空权限配置
 */
export function clearPermissionConfig(): void {
  permissionConfig = {
    permissions: [],
    roles: [],
  }
}
