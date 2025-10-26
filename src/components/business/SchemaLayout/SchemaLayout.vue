<script setup lang="ts">
import type { MenuItemSchema } from '../SchemaMenu/types'
import type { SchemaLayoutEmits, SchemaLayoutProps } from './types'
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { SchemaMenu } from '../SchemaMenu'
import { useBreadcrumb, useTabs } from './composables'

const props = withDefaults(defineProps<SchemaLayoutProps>(), {
  theme: 'light',
  menuItems: () => [],
  fixedHeader: true,
  fixedSidebar: true,
  sidebarWidth: 256,
  collapsedWidth: 80,
  collapsed: false,
  showBreadcrumb: true,
  showTabs: false,
  title: '管理系统',
  showUserDropdown: true,
  showFullscreen: true,
  showSettings: false,
})

const emit = defineEmits<SchemaLayoutEmits>()

const route = useRoute()
const router = useRouter()
const menuItemsRef = toRef(props, 'menuItems')

const internalCollapsed = ref(props.collapsed)
const isFullscreen = ref(false)

// 面包屑
const { breadcrumbs } = useBreadcrumb(menuItemsRef)

// 标签页
const { tabs, activeKey, addTab, removeTab, closeOtherTabs, closeAllTabs, switchTab } = useTabs()

/**
 * 切换折叠
 */
function toggleCollapsed() {
  internalCollapsed.value = !internalCollapsed.value
  emit('update:collapsed', internalCollapsed.value)
}

/**
 * 切换全屏
 */
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

/**
 * 刷新当前页面
 */
function handleRefresh() {
  router.go(0)
}

/**
 * 菜单选择
 */
function handleMenuSelect(key: string, item: MenuItemSchema) {
  emit('menuSelect', key, item)

  // 添加标签页
  if (props.showTabs && item.path && item.path !== '/') {
    addTab({
      key,
      title: item.title,
      path: item.path,
      closable: true,
    })
  }
}

/**
 * 用户菜单点击
 */
function handleUserMenuClick(info: any) {
  const key = String(info.key)
  if (key === 'logout') {
    handleLogout()
  }
  else {
    emit('userMenuClick', key)
  }
}

/**
 * 退出登录
 */
function handleLogout() {
  emit('logout')
}

/**
 * 标签页右键菜单
 */
function handleTabContextMenu(e: MouseEvent, tabKey: string) {
  e.preventDefault()
  // 可以在这里显示右键菜单
  console.warn('tabKey', tabKey)
}

// 监听外部 collapsed 变化
watch(() => props.collapsed, (val) => {
  internalCollapsed.value = val
})

// 监听路由变化，更新标签页
watch(() => route.path, (newPath) => {
  if (props.showTabs && newPath !== '/') {
    // 查找对应的菜单项
    const findMenuItem = (items: MenuItemSchema[]): MenuItemSchema | null => {
      for (const item of items) {
        if (item.path === newPath) {
          return item
        }
        if (item.children) {
          const found = findMenuItem(item.children)
          if (found)
            return found
        }
      }
      return null
    }

    const menuItem = findMenuItem(props.menuItems)
    if (menuItem) {
      addTab({
        key: menuItem.key,
        title: menuItem.title,
        path: menuItem.path!,
        closable: true,
      })
    }
  }
}, { immediate: true })
</script>

<template>
  <a-layout
    class="schema-layout"
    style="min-height: 100vh"
  >
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="internalCollapsed"
      :theme="theme"
      :width="sidebarWidth"
      :collapsed-width="collapsedWidth"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: fixedSidebar ? 'fixed' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
      }"
    >
      <!-- Logo 和标题 -->
      <div class="layout-logo">
        <component
          :is="logo"
          v-if="logo && typeof logo !== 'string'"
        />
        <img
          v-else-if="logo"
          :src="logo"
          alt="logo"
        >
        <span
          v-if="!internalCollapsed"
          class="layout-title"
          :class="{ 'layout-title-dark': theme === 'dark' }"
        >{{ title
        }}</span>
      </div>

      <!-- 菜单 -->
      <SchemaMenu
        :items="menuItems"
        :theme="theme"
        mode="inline"
        :collapsed="internalCollapsed"
        @select="handleMenuSelect"
      />
    </a-layout-sider>

    <a-layout
      :style="{
        marginLeft: fixedSidebar ? (internalCollapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
      }"
    >
      <!-- 头部 -->
      <a-layout-header
        :style="{
          background: '#fff',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: fixedHeader ? 'fixed' : 'relative',
          top: 0,
          right: 0,
          left: fixedSidebar ? (internalCollapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
          zIndex: 99,
          transition: 'left 0.2s',
          borderBottom: '1px solid #f0f0f0',
        }"
      >
        <div style="display: flex; align-items: center; gap: 16px">
          <!-- 折叠按钮 -->
          <a-button
            type="text"
            @click="toggleCollapsed"
          >
            <MenuUnfoldOutlined v-if="internalCollapsed" />
            <MenuFoldOutlined v-else />
          </a-button>

          <!-- 面包屑 -->
          <a-breadcrumb v-if="showBreadcrumb">
            <a-breadcrumb-item
              v-for="item in breadcrumbs"
              :key="item.path || item.title"
            >
              <router-link
                v-if="item.path"
                :to="item.path"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  style="margin-right: 4px"
                />
                {{ item.title }}
              </router-link>
              <span v-else>
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  style="margin-right: 4px"
                />
                {{ item.title }}
              </span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div style="display: flex; align-items: center; gap: 16px">
          <!-- 刷新按钮 -->
          <a-button
            type="text"
            @click="handleRefresh"
          >
            <ReloadOutlined />
          </a-button>

          <!-- 全屏按钮 -->
          <a-button
            v-if="showFullscreen"
            type="text"
            @click="toggleFullscreen"
          >
            <FullscreenExitOutlined v-if="isFullscreen" />
            <FullscreenOutlined v-else />
          </a-button>

          <!-- 用户信息 -->
          <a-dropdown
            v-if="showUserDropdown && userInfo"
            @click="handleUserMenuClick"
          >
            <div style="display: flex; align-items: center; gap: 8px; cursor: pointer">
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
              <a-menu @click="handleUserMenuClick">
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
        </div>
      </a-layout-header>

      <!-- 标签页 -->
      <div
        v-if="showTabs"
        class="layout-tabs"
        :style="{
          position: fixedHeader ? 'fixed' : 'relative',
          top: fixedHeader ? '64px' : '0',
          right: 0,
          left: fixedSidebar ? (internalCollapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
          zIndex: 98,
          transition: 'left 0.2s',
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '4px 16px 0',
        }"
      >
        <a-tabs
          v-model:active-key="activeKey"
          type="editable-card"
          hide-add
          @edit="(targetKey, action) => action === 'remove' && removeTab(String(targetKey))"
          @change="(key) => switchTab(String(key))"
        >
          <a-tab-pane
            v-for="tab in tabs"
            :key="tab.key"
            :tab="tab.title"
            :closable="tab.closable"
          >
            <template #tab>
              <span @contextmenu="(e) => handleTabContextMenu(e, tab.key)">
                {{ tab.title }}
              </span>
            </template>
          </a-tab-pane>

          <template #rightExtra>
            <a-dropdown>
              <a-button
                type="text"
                size="small"
              >
                操作
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="closeOtherTabs(activeKey)">
                    关闭其他
                  </a-menu-item>
                  <a-menu-item @click="closeAllTabs">
                    关闭所有
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tabs>
      </div>

      <!-- 内容区域 -->
      <a-layout-content
        :style="{
          margin: fixedHeader ? (showTabs ? '112px 16px 0' : '64px 16px 0') : '0 16px',
          padding: '24px',
          background: '#f0f2f5',
          minHeight: '280px',
        }"
      >
        <slot />
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer
        v-if="footer"
        style="text-align: center"
      >
        <component
          :is="footer"
          v-if="typeof footer !== 'string'"
        />
        <div v-else>
          {{ footer }}
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.schema-layout {
  width: 100%;
  height: 100%;
}

.layout-logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
  overflow: hidden;
}

.layout-logo img {
  height: 32px;
  width: 32px;
}

.layout-title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
}

.layout-title-dark {
  color: #fff;
}

.layout-tabs :deep(.ant-tabs-nav) {
  margin: 0;
}

.layout-tabs :deep(.ant-tabs-tab) {
  border-radius: 4px 4px 0 0;
}
</style>
