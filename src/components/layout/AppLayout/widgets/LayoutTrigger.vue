<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

interface LayoutTriggerProps {
  collapsed?: boolean
  theme?: 'light' | 'dark'
}

defineProps<LayoutTriggerProps>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="layout-trigger"
    :class="{ 'layout-trigger-dark': theme === 'dark' }"
    @click="emit('click')"
  >
    <MenuFoldOutlined v-if="!collapsed" />
    <MenuUnfoldOutlined v-else />
  </div>
</template>

<style scoped lang="scss">
.layout-trigger {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
  font-size: 18px;

  &:hover {
    background: #f0f0f0;
    color: #1890ff;
  }

  &-dark {
    background: #001529;
    border-top-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.65);

    &:hover {
      background: #1890ff;
      color: #fff;
    }
  }
}
</style>
