import type { MenuItemSchema, UserInfo } from '~/components/business/SchemaLayout/types'
import {
  DashboardOutlined,
  FormOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

/**
 * 布局配置 Hook
 * 提供统一的菜单和用户信息配置
 */
export function useLayoutConfig() {
  // 菜单配置
  const menuItems: MenuItemSchema[] = [
    {
      key: 'dashboard',
      title: '仪表盘',
      icon: DashboardOutlined,
      path: '/',
    },
    {
      key: 'table',
      title: '表格示例',
      icon: TableOutlined,
      path: '/table',
    },
    {
      key: 'form',
      title: '表单示例',
      icon: FormOutlined,
      children: [
        {
          key: 'basic-form',
          title: '基础表单',
          path: '/form/basic',
        },
        {
          key: 'advanced-form',
          title: '高级表单',
          path: '/form/advanced',
        },
      ],
    },
    {
      key: 'user',
      title: '用户管理',
      icon: UserOutlined,
      children: [
        {
          key: 'user-list',
          title: '用户列表',
          path: '/users',
        },
        {
          key: 'user-roles',
          title: '角色管理',
          path: '/roles',
        },
      ],
    },
    {
      key: 'settings',
      title: '系统设置',
      icon: SettingOutlined,
      path: '/settings',
    },
  ]

  // 用户信息
  const userInfo: UserInfo = {
    name: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    email: 'admin@example.com',
    role: 'Administrator',
  }

  // 退出登录
  function handleLogout() {
    message.success('退出登录成功')
    // 这里可以添加实际的退出登录逻辑
    // 例如：清除 token、跳转到登录页等
  }

  // 用户菜单点击
  function handleUserMenuClick(key: string) {
    if (key === 'profile') {
      message.info('跳转到个人中心')
      // router.push('/profile')
    }
    else if (key === 'settings') {
      message.info('跳转到个人设置')
      // router.push('/user/settings')
    }
  }

  return {
    menuItems,
    userInfo,
    handleLogout,
    handleUserMenuClick,
  }
}
