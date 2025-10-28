<script setup lang="ts">
import type { Component } from 'vue'

interface LayoutLogoProps {
  logo?: string | Component
  title?: string
  collapsed?: boolean
  theme?: 'light' | 'dark'
}

withDefaults(defineProps<LayoutLogoProps>(), {
  theme: 'light',
  collapsed: false,
})
</script>

<template>
  <div
    class="layout-logo"
    :class="{ 'layout-logo-dark': theme === 'dark' }"
  >
    <component
      :is="logo"
      v-if="logo && typeof logo !== 'string'"
      class="layout-logo-icon"
    />
    <img
      v-else-if="logo"
      :src="logo"
      alt="logo"
      class="layout-logo-icon"
    >
    <transition name="fade">
      <span
        v-if="!collapsed"
        class="layout-title"
        :class="{ 'layout-title-dark': theme === 'dark' }"
      >{{ title }}</span>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.layout-logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 24px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;

  &-dark {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  &:hover .layout-logo-icon {
    transform: scale(1.1) rotate(5deg);
  }
}

.layout-logo-icon {
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  transition: transform 0.3s;
}

.layout-title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0.5px;
  transition: all 0.3s;

  &-dark {
    color: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
