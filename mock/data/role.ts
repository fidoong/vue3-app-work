/**
 * 角色信息
 */
export interface Role {
  id: string
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  status: number
  remark?: string
  menuIds: string[]
  deptIds: string[]
  createTime: string
  updateTime: string
}

/**
 * 角色列表
 */
export const roles: Role[] = [
  {
    id: '1',
    roleName: '超级管理员',
    roleKey: 'super',
    roleSort: 1,
    dataScope: '1', // 全部数据权限
    status: 1,
    remark: '超级管理员',
    menuIds: ['1', '1-1', '1-2', '2', '2-1', '2-2', '2-3', '2-4', '2-5', '3', '3-1', '3-2', '3-3'],
    deptIds: ['1', '2', '3', '4', '5'],
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '2',
    roleName: '管理员',
    roleKey: 'admin',
    roleSort: 2,
    dataScope: '2', // 自定义数据权限
    status: 1,
    remark: '管理员',
    menuIds: ['1', '1-1', '1-2', '2', '2-1', '2-2', '3', '3-1', '3-2', '3-3'],
    deptIds: ['2', '3', '4'],
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '3',
    roleName: '普通用户',
    roleKey: 'user',
    roleSort: 3,
    dataScope: '3', // 本部门数据权限
    status: 1,
    remark: '普通用户',
    menuIds: ['1', '1-1', '3', '3-1', '3-2'],
    deptIds: ['3'],
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '4',
    roleName: '测试角色',
    roleKey: 'test',
    roleSort: 4,
    dataScope: '4', // 本部门及以下数据权限
    status: 1,
    remark: '测试角色',
    menuIds: ['1', '1-1'],
    deptIds: ['4', '5'],
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '5',
    roleName: '访客',
    roleKey: 'guest',
    roleSort: 5,
    dataScope: '5', // 仅本人数据权限
    status: 1,
    remark: '访客角色',
    menuIds: ['1', '1-1'],
    deptIds: [],
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
]

/**
 * 根据角色 key 获取角色信息
 */
export function getRoleByKey(roleKey: string): Role | undefined {
  return roles.find(role => role.roleKey === roleKey)
}

/**
 * 根据角色 ID 获取角色信息
 */
export function getRoleById(roleId: string): Role | undefined {
  return roles.find(role => role.id === roleId)
}
