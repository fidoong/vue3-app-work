<script setup lang="ts">
import type { UserInfo } from '../types.ts'
import { UserOutlined } from '@ant-design/icons-vue'

interface LayoutUserDropdownProps {
  userInfo?: UserInfo
}

defineProps<LayoutUserDropdownProps>()

const emit = defineEmits<{
  menuClick: [key: string]
}>()

function handleMenuClick(info: any) {
  emit('menuClick', String(info.key))
}
</script>

<template>
  <a-dropdown
    v-if="userInfo"
    @click="handleMenuClick"
  >
    <div class="user-dropdown-trigger">
      <a-avatar
        v-if="userInfo.avatar"
        :src="userInfo.avatar"
      />
      <a-avatar v-else>
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <span>{{ userInfo.name }}</span>
    </div>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="profile">
          个人中心
        </a-menu-item>
        <a-menu-item key="settings">
          个人设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.user-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>
