<script setup lang="ts">
import { SchemaLayout } from '~/components/business/SchemaLayout'
import { useLayoutConfig } from '~/composables/useLayoutConfig'

const { menuItems, userInfo, handleLogout, handleUserMenuClick } = useLayoutConfig()
</script>

<template>
  <SchemaLayout
    :menu-items="menuItems"
    :user-info="userInfo"
    title="Vue3 组件库"
    show-breadcrumb
    show-tabs
    @logout="handleLogout"
    @user-menu-click="handleUserMenuClick"
  >
    <RouterView />
  </SchemaLayout>
</template>
