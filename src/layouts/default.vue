<script setup lang="ts">
import { AppLayout } from '~/components/layout'
import { useLayoutConfig } from '~/composables/useLayoutConfig'

const { menuItems, userInfo, handleLogout, handleUserMenuClick } = useLayoutConfig()
</script>

<template>
  <AppLayout
    :menu-items="menuItems"
    :user-info="userInfo"
    title="Vue3 组件库"
    show-breadcrumb
    show-tabs
    @logout="handleLogout"
    @user-menu-click="handleUserMenuClick"
  >
    <RouterView />
  </AppLayout>
</template>
