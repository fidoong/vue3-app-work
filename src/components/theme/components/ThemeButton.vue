<script setup lang="ts">
import { ref } from 'vue'
import ThemeDrawer from './ThemeDrawer.vue'

const drawerVisible = ref(false)

function toggleDrawer() {
  drawerVisible.value = !drawerVisible.value
}
</script>

<template>
  <div class="theme-button-wrapper">
    <button
      class="theme-button"
      title="主题设置"
      @click="toggleDrawer"
    >
      <span class="theme-icon">🎨</span>
    </button>

    <ThemeDrawer v-model:visible="drawerVisible" />
  </div>
</template>

<style scoped lang="scss">
.theme-button-wrapper {
  position: fixed;
  right: var(--spacing-xxl);
  bottom: var(--spacing-xxl);
  z-index: calc(var(--z-index-modal) - 1);
}

.theme-button {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  border: none;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);
  transform: translateZ(0);

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-2px) scale(1);
  }
}

.theme-icon {
  font-size: 24px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

// 响应式
@media (max-width: 768px) {
  .theme-button-wrapper {
    right: var(--spacing-lg);
    bottom: var(--spacing-lg);
  }

  .theme-button {
    width: 48px;
    height: 48px;
  }

  .theme-icon {
    font-size: 20px;
  }
}

// 打印时隐藏
@media print {
  .theme-button-wrapper {
    display: none;
  }
}
</style>
