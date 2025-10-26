<script setup lang="ts">
import type { MenuItemSchema } from '~/components/business/SchemaMenu/types'
import {
  DashboardOutlined,
  FormOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { SchemaMenu } from '~/components/business/SchemaMenu'

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
        key: 'user-role',
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

function handleSelect(_key: string, _item: MenuItemSchema) {
  // 菜单选中处理
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">
        SchemaMenu 组件示例
      </h1>
      <p class="text-gray-600">
        基于 Schema 配置的菜单组件
      </p>
    </div>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="基础菜单">
          <SchemaMenu
            :items="menuItems"
            mode="inline"
            @select="handleSelect"
          />
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="可折叠菜单">
          <SchemaMenu
            :items="menuItems"
            mode="inline"
            :collapsed="false"
            @select="handleSelect"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-alert
      class="mt-4"
      message="示例说明"
      description="旧的 examples 已被移除，请参考 src/components/EXAMPLES.md 查看详细使用示例"
      type="info"
      show-icon
    />
  </div>
</template>
