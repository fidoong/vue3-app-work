<script setup lang="ts">
import type { BreadcrumbItem, UserInfo } from '../types.ts'
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import LayoutBreadcrumb from './LayoutBreadcrumb.vue'
import LayoutUserDropdown from './LayoutUserDropdown.vue'

interface LayoutHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumb?: boolean
  showFullscreen?: boolean
  showUserDropdown?: boolean
  userInfo?: UserInfo
  fixedHeader?: boolean
  fixedSidebar?: boolean
  collapsed?: boolean
  sidebarWidth?: number
  collapsedWidth?: number
}

withDefaults(defineProps<LayoutHeaderProps>(), {
  breadcrumbs: () => [],
  showBreadcrumb: true,
  showFullscreen: true,
  showUserDropdown: true,
  fixedHeader: true,
  fixedSidebar: true,
  collapsed: false,
  sidebarWidth: 256,
  collapsedWidth: 80,
})

const emit = defineEmits<{
  refresh: []
  userMenuClick: [key: string]
}>()

const isFullscreen = ref(false)

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
  else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function handleUserMenuClick(key: string) {
  emit('userMenuClick', key)
}
</script>

<template>
  <a-layout-header
    :style="{
      background: '#fff',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: fixedHeader ? 'fixed' : 'relative',
      top: 0,
      right: 0,
      left: fixedSidebar ? (collapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
      zIndex: 99,
      transition: 'left 0.2s',
      borderBottom: '1px solid #f0f0f0',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
    }"
  >
    <LayoutBreadcrumb
      v-if="showBreadcrumb"
      :breadcrumbs="breadcrumbs"
    />

    <div class="header-actions">
      <a-button
        type="text"
        @click="emit('refresh')"
      >
        <ReloadOutlined />
      </a-button>

      <a-button
        v-if="showFullscreen"
        type="text"
        @click="toggleFullscreen"
      >
        <FullscreenExitOutlined v-if="isFullscreen" />
        <FullscreenOutlined v-else />
      </a-button>

      <LayoutUserDropdown
        v-if="showUserDropdown"
        :user-info="userInfo"
        @menu-click="handleUserMenuClick"
      />
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
