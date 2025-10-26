<script setup lang="ts">
import { SchemaLayout } from '~/components/business/SchemaLayout'
import { useLayoutConfig } from '~/composables/useLayoutConfig'

const { t } = useI18n()

useHead({
  title: () => t('not-found'),
})

const { menuItems, userInfo, handleLogout, handleUserMenuClick } = useLayoutConfig()
</script>

<template>
  <SchemaLayout
    :menu-items="menuItems"
    :user-info="userInfo"
    title="hw"
    show-breadcrumb
    show-tabs
    @logout="handleLogout"
    @user-menu-click="handleUserMenuClick"
  >
    <RouterView />
  </SchemaLayout>
</template>
