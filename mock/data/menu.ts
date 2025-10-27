/**
 * 菜单数据结构
 */
export interface MenuItem {
  id: string
  parentId: string | null
  name: string
  path: string
  component?: string
  redirect?: string
  icon?: string
  type: 'menu' | 'button' | 'catalog'
  orderNum: number
  visible: boolean
  status: number
  perms?: string
  meta?: {
    title: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    alwaysShow?: boolean
  }
  children?: MenuItem[]
}

/**
 * 菜单数据
 */
export const menuList: MenuItem[] = [
  {
    id: '1',
    parentId: null,
    name: 'Dashboard',
    path: '/dashboard',
    component: 'Layout',
    redirect: '/dashboard/workplace',
    icon: 'carbon:dashboard',
    type: 'catalog',
    orderNum: 1,
    visible: true,
    status: 1,
    meta: {
      title: '仪表盘',
      icon: 'carbon:dashboard',
    },
    children: [
      {
        id: '1-1',
        parentId: '1',
        name: 'Workplace',
        path: '/dashboard/workplace',
        component: '/dashboard/workplace/index',
        icon: 'carbon:workspace',
        type: 'menu',
        orderNum: 1,
        visible: true,
        status: 1,
        perms: 'dashboard:workplace:view',
        meta: {
          title: '工作台',
          icon: 'carbon:workspace',
          keepAlive: true,
        },
      },
      {
        id: '1-2',
        parentId: '1',
        name: 'Analysis',
        path: '/dashboard/analysis',
        component: '/dashboard/analysis/index',
        icon: 'carbon:analytics',
        type: 'menu',
        orderNum: 2,
        visible: true,
        status: 1,
        perms: 'dashboard:analysis:view',
        meta: {
          title: '分析页',
          icon: 'carbon:analytics',
          keepAlive: true,
        },
      },
    ],
  },
  {
    id: '2',
    parentId: null,
    name: 'System',
    path: '/system',
    component: 'Layout',
    redirect: '/system/user',
    icon: 'carbon:settings',
    type: 'catalog',
    orderNum: 2,
    visible: true,
    status: 1,
    meta: {
      title: '系统管理',
      icon: 'carbon:settings',
    },
    children: [
      {
        id: '2-1',
        parentId: '2',
        name: 'User',
        path: '/system/user',
        component: '/system/user/index',
        icon: 'carbon:user',
        type: 'menu',
        orderNum: 1,
        visible: true,
        status: 1,
        perms: 'system:user:view',
        meta: {
          title: '用户管理',
          icon: 'carbon:user',
          keepAlive: true,
        },
      },
      {
        id: '2-2',
        parentId: '2',
        name: 'Role',
        path: '/system/role',
        component: '/system/role/index',
        icon: 'carbon:user-role',
        type: 'menu',
        orderNum: 2,
        visible: true,
        status: 1,
        perms: 'system:role:view',
        meta: {
          title: '角色管理',
          icon: 'carbon:user-role',
          keepAlive: true,
        },
      },
      {
        id: '2-3',
        parentId: '2',
        name: 'Menu',
        path: '/system/menu',
        component: '/system/menu/index',
        icon: 'carbon:menu',
        type: 'menu',
        orderNum: 3,
        visible: true,
        status: 1,
        perms: 'system:menu:view',
        meta: {
          title: '菜单管理',
          icon: 'carbon:menu',
          keepAlive: true,
        },
      },
      {
        id: '2-4',
        parentId: '2',
        name: 'Dept',
        path: '/system/dept',
        component: '/system/dept/index',
        icon: 'carbon:tree-view',
        type: 'menu',
        orderNum: 4,
        visible: true,
        status: 1,
        perms: 'system:dept:view',
        meta: {
          title: '部门管理',
          icon: 'carbon:tree-view',
          keepAlive: true,
        },
      },
      {
        id: '2-5',
        parentId: '2',
        name: 'Dict',
        path: '/system/dict',
        component: '/system/dict/index',
        icon: 'carbon:book',
        type: 'menu',
        orderNum: 5,
        visible: true,
        status: 1,
        perms: 'system:dict:view',
        meta: {
          title: '字典管理',
          icon: 'carbon:book',
          keepAlive: true,
        },
      },
    ],
  },
  {
    id: '3',
    parentId: null,
    name: 'Business',
    path: '/business',
    component: 'Layout',
    redirect: '/business/order',
    icon: 'carbon:application',
    type: 'catalog',
    orderNum: 3,
    visible: true,
    status: 1,
    meta: {
      title: '业务管理',
      icon: 'carbon:application',
    },
    children: [
      {
        id: '3-1',
        parentId: '3',
        name: 'Order',
        path: '/business/order',
        component: '/business/order/index',
        icon: 'carbon:shopping-cart',
        type: 'menu',
        orderNum: 1,
        visible: true,
        status: 1,
        perms: 'business:order:view',
        meta: {
          title: '订单管理',
          icon: 'carbon:shopping-cart',
          keepAlive: true,
        },
      },
      {
        id: '3-2',
        parentId: '3',
        name: 'Product',
        path: '/business/product',
        component: '/business/product/index',
        icon: 'carbon:product',
        type: 'menu',
        orderNum: 2,
        visible: true,
        status: 1,
        perms: 'business:product:view',
        meta: {
          title: '商品管理',
          icon: 'carbon:product',
          keepAlive: true,
        },
      },
      {
        id: '3-3',
        parentId: '3',
        name: 'Customer',
        path: '/business/customer',
        component: '/business/customer/index',
        icon: 'carbon:user-multiple',
        type: 'menu',
        orderNum: 3,
        visible: true,
        status: 1,
        perms: 'business:customer:view',
        meta: {
          title: '客户管理',
          icon: 'carbon:user-multiple',
          keepAlive: true,
        },
      },
    ],
  },
]

/**
 * 根据角色获取菜单
 */
export function getMenuByRoles(roles: string[]): MenuItem[] {
  // 管理员返回所有菜单
  if (roles.includes('admin') || roles.includes('super')) {
    return menuList
  }

  // 普通用户返回部分菜单
  if (roles.includes('user')) {
    return menuList.filter(menu => ['1', '3'].includes(menu.id))
  }

  // 测试用户只返回仪表盘
  return menuList.filter(menu => menu.id === '1')
}
