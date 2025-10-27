import type { MenuItemSchema, UserInfo } from '~/components/business/SchemaLayout/types'
import {
  AlignLeftOutlined,
  ApiOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  SearchOutlined,
  TableOutlined,
  WindowsOutlined,
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
      key: 'home',
      title: '首页',
      icon: DashboardOutlined,
      path: '/',
    },
    {
      key: 'demos',
      title: '组件示例',
      icon: AppstoreOutlined,
      children: [
        {
          key: 'api-services',
          title: 'API Services',
          icon: ApiOutlined,
          children: [
            {
              key: 'api-services-basic',
              title: '基础 CRUD',
              path: '/demos/api-services/basic',
            },
            {
              key: 'api-services-cache',
              title: '缓存管理',
              path: '/demos/api-services/cache',
            },
            {
              key: 'api-services-error',
              title: '错误处理',
              path: '/demos/api-services/error',
            },
            {
              key: 'api-services-file',
              title: '文件上传下载',
              path: '/demos/api-services/file',
            },
          ],
        },
        {
          key: 'schema-form',
          title: 'SchemaForm 表单',
          icon: FormOutlined,
          children: [
            {
              key: 'schema-form-basic',
              title: '基础表单',
              path: '/demos/schema-form/basic',
            },
            {
              key: 'schema-form-layout',
              title: '表单布局',
              path: '/demos/schema-form/layout',
            },
            {
              key: 'schema-form-dynamic',
              title: '动态表单',
              path: '/demos/schema-form/dynamic',
            },
            {
              key: 'schema-form-custom',
              title: '自定义渲染',
              path: '/demos/schema-form/custom',
            },
            {
              key: 'schema-form-validation',
              title: '表单验证',
              path: '/demos/schema-form/validation',
            },
            {
              key: 'schema-form-async',
              title: '异步数据',
              path: '/demos/schema-form/async',
            },
          ],
        },
        {
          key: 'search-form',
          title: 'SearchForm 搜索',
          icon: SearchOutlined,
          children: [
            {
              key: 'search-form-basic',
              title: '基础用法',
              path: '/demos/search-form/basic',
            },
            {
              key: 'search-form-collapse',
              title: '展开收起',
              path: '/demos/search-form/collapse',
            },
            {
              key: 'search-form-advanced',
              title: '高级搜索',
              path: '/demos/search-form/advanced',
            },
            {
              key: 'search-form-layout',
              title: '布局方式',
              path: '/demos/search-form/layout',
            },
          ],
        },
        {
          key: 'base-modal',
          title: 'BaseModal 弹窗',
          icon: WindowsOutlined,
          children: [
            {
              key: 'base-modal-basic',
              title: '基础用法',
              path: '/demos/base-modal/basic',
            },
            {
              key: 'base-modal-async',
              title: '异步加载',
              path: '/demos/base-modal/async',
            },
            {
              key: 'base-modal-nested',
              title: '嵌套弹窗',
              path: '/demos/base-modal/nested',
            },
            {
              key: 'base-modal-form',
              title: '表单弹窗',
              path: '/demos/base-modal/form',
            },
          ],
        },
        {
          key: 'schema-table',
          title: 'SchemaTable 表格',
          icon: TableOutlined,
          children: [
            {
              key: 'schema-table-basic',
              title: '基础表格',
              path: '/demos/schema-table/basic',
            },
            {
              key: 'schema-table-api',
              title: 'API 数据',
              path: '/demos/schema-table/api',
            },
            {
              key: 'schema-table-toolbar',
              title: '工具栏',
              path: '/demos/schema-table/toolbar',
            },
            {
              key: 'schema-table-actions',
              title: '操作列',
              path: '/demos/schema-table/actions',
            },
            {
              key: 'schema-table-advanced',
              title: '高级功能',
              path: '/demos/schema-table/advanced',
            },
          ],
        },
        {
          key: 'schema-detail',
          title: 'SchemaDetail 详情',
          icon: FileOutlined,
          children: [
            {
              key: 'schema-detail-basic',
              title: '基础用法',
              path: '/demos/schema-detail/basic',
            },
            {
              key: 'schema-detail-groups',
              title: '分组展示',
              path: '/demos/schema-detail/groups',
            },
            {
              key: 'schema-detail-custom',
              title: '自定义渲染',
              path: '/demos/schema-detail/custom',
            },
            {
              key: 'schema-detail-columns',
              title: '列数控制',
              path: '/demos/schema-detail/columns',
            },
            {
              key: 'schema-detail-advanced',
              title: '高级功能',
              path: '/demos/schema-detail/advanced',
            },
          ],
        },
        {
          key: 'schema-page',
          title: 'SchemaPage 页面',
          icon: FileTextOutlined,
          children: [
            {
              key: 'schema-page-basic',
              title: '基础用法',
              path: '/demos/schema-page/basic',
            },
            {
              key: 'schema-page-custom-render',
              title: '自定义渲染',
              path: '/demos/schema-page/custom-render',
            },
          ],
        },
        {
          key: 'dropdown-button',
          title: 'DropdownButton 下拉按钮',
          icon: WindowsOutlined,
          children: [
            {
              key: 'dropdown-button-basic',
              title: '基础用法',
              path: '/demos/dropdown-button/basic',
            },
          ],
        },
        {
          key: 'text-ellipsis',
          title: 'TextEllipsis 文本超出',
          icon: AlignLeftOutlined,
          children: [
            {
              key: 'text-ellipsis-basic',
              title: '基础用法',
              path: '/demos/text-ellipsis/basic',
            },
            {
              key: 'text-ellipsis-tooltip',
              title: 'Tooltip 配置',
              path: '/demos/text-ellipsis/tooltip',
            },
            {
              key: 'text-ellipsis-table',
              title: '表格中使用',
              path: '/demos/text-ellipsis/table',
            },
            {
              key: 'text-ellipsis-methods',
              title: '实例方法',
              path: '/demos/text-ellipsis/methods',
            },
          ],
        },
      ],
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
