/**
 * 用户数据
 */
export interface UserInfo {
  id: string
  username: string
  realName: string
  avatar: string
  email: string
  phone: string
  roles: string[]
  permissions: string[]
  dept: {
    id: string
    name: string
  }
  status: number
  createTime: string
}

/**
 * 模拟用户数据库
 */
export const users: Record<string, UserInfo> = {
  admin: {
    id: '1',
    username: 'admin',
    realName: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    email: 'admin@example.com',
    phone: '13800138000',
    roles: ['admin', 'super'],
    permissions: ['*:*:*'],
    dept: {
      id: '1',
      name: '总经办',
    },
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  user: {
    id: '2',
    username: 'user',
    realName: '普通用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    email: 'user@example.com',
    phone: '13800138001',
    roles: ['user'],
    permissions: ['system:user:query', 'system:role:query'],
    dept: {
      id: '2',
      name: '技术部',
    },
    status: 1,
    createTime: '2024-01-02 00:00:00',
  },
  test: {
    id: '3',
    username: 'test',
    realName: '测试用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    email: 'test@example.com',
    phone: '13800138002',
    roles: ['test'],
    permissions: ['system:user:query'],
    dept: {
      id: '3',
      name: '测试部',
    },
    status: 1,
    createTime: '2024-01-03 00:00:00',
  },
}

/**
 * 用户密码（实际项目中应该加密存储）
 */
export const passwords: Record<string, string> = {
  admin: 'admin123',
  user: 'user123',
  test: 'test123',
}

/**
 * Token 存储（模拟）
 */
export const tokens: Record<string, string> = {}

/**
 * 生成 token
 */
export function generateToken(username: string): string {
  const token = `mock-token-${username}-${Date.now()}`
  tokens[token] = username
  return token
}

/**
 * 验证 token
 */
export function validateToken(token: string): UserInfo | null {
  const username = tokens[token]
  return username ? users[username] : null
}
