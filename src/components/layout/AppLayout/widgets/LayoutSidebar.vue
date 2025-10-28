<script setup lang="ts">
import type { Component } from 'vue'
import type { MenuItemSchema } from '../../AppMenu/types'
import { AppMenu } from '../../AppMenu'
import LayoutLogo from './LayoutLogo.vue'
import LayoutTrigger from './LayoutTrigger.vue'

interface LayoutSidebarProps {
  collapsed?: boolean
  theme?: 'light' | 'dark'
  logo?: string | Component
  title?: string
  menuItems?: MenuItemSchema[]
  sidebarWidth?: number
  collapsedWidth?: number
  fixedSidebar?: boolean
}

const props = withDefaults(defineProps<LayoutSidebarProps>(), {
  theme: 'light',
  collapsed: false,
  menuItems: () => [],
  sidebarWidth: 256,
  collapsedWidth: 80,
  fixedSidebar: true,
})

const emit = defineEmits<{
  'update:collapsed': [collapsed: boolean]
  'menuSelect': [key: string, item: MenuItemSchema]
}>()

function handleToggleCollapsed() {
  emit('update:collapsed', !props.collapsed)
}

function handleMenuSelect(key: string, item: MenuItemSchema) {
  emit('menuSelect', key, item)
}
</script>

<template>
  <a-layout-sider
    :collapsed="collapsed"
    :theme="theme"
    :width="sidebarWidth"
    :collapsed-width="collapsedWidth"
    :style="{
      overflow: 'hidden',
      height: '100vh',
      position: fixedSidebar ? 'fixed' : 'relative',
      left: 0,
      top: 0,
      bottom: 0,
    }"
  >
    <div class="layout-sider-content">
      <LayoutLogo
        :logo="logo"
        :title="title"
        :collapsed="collapsed"
        :theme="theme"
      />

      <div class="layout-menu-container">
        <AppMenu
          :items="menuItems"
          :theme="theme"
          mode="inline"
          @select="handleMenuSelect"
        />
      </div>

      <LayoutTrigger
        :collapsed="collapsed"
        :theme="theme"
        @click="handleToggleCollapsed"
      />
    </div>
  </a-layout-sider>
</template>

<style scoped lang="scss">
@mixin custom-scrollbar(
  $width: 6px,
  $thumb-color: rgba(0, 0, 0, 0.12),
  $thumb-hover-color: rgba(0, 0, 0, 0.2),
  $thumb-active-color: rgba(0, 0, 0, 0.3)
) {
  scrollbar-width: thin;
  scrollbar-color: $thumb-color transparent;
  scrollbar-gutter: stable;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: $width;
    height: $width;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $thumb-color;
    border-radius: calc($width / 2);
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: $thumb-hover-color;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: $thumb-active-color;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}

.layout-sider-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout-menu-container {
  @include custom-scrollbar(6px);
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  min-height: 0;
  padding: 8px 8px 8px 0;

  :deep(.ant-menu) {
    border-inline-end: none;
  }
}

.ant-layout-sider-dark .layout-menu-container {
  @include custom-scrollbar(6px, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.35));
}
</style>
