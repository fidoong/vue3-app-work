<script setup lang="ts">
import type { MenuItemSchema } from '../SchemaMenu/types'
import type { SchemaLayoutEmits, SchemaLayoutProps } from './types'
import {
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
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
        overflow: 'hidden',
        height: '100vh',
        position: fixedSidebar ? 'fixed' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <!-- Logo 和标题 -->
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
            v-if="!internalCollapsed"
            class="layout-title"
            :class="{ 'layout-title-dark': theme === 'dark' }"
          >{{
            title }}</span>
        </transition>
      </div>

      <!-- 菜单 -->
      <div
        :style="{
          flex: 1,
          overflow: 'auto',
        }"
      >
        <SchemaMenu
          :items="menuItems"
          :theme="theme"
          mode="inline"
          :collapsed="internalCollapsed"
          @select="handleMenuSelect"
        />
      </div>

      <!-- 折叠按钮 -->
      <div
        class="layout-trigger"
        :class="{ 'layout-trigger-dark': theme === 'dark' }"
        @click="toggleCollapsed"
      >
        <MenuFoldOutlined v-if="!internalCollapsed" />
        <MenuUnfoldOutlined v-else />
      </div>
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
          padding: '0 24px',
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
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        }"
      >
        <div class="breadcrumb-container">
          <!-- 面包屑 -->
          <a-breadcrumb
            v-if="showBreadcrumb"
            class="layout-breadcrumb"
          >
            <a-breadcrumb-item
              v-for="item in breadcrumbs"
              :key="item.path || item.title"
            >
              <router-link
                v-if="item.path"
                :to="item.path"
                class="breadcrumb-link"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="breadcrumb-icon"
                />
                {{ item.title }}
              </router-link>
              <span
                v-else
                class="breadcrumb-text"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="breadcrumb-icon"
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
          background: '#fafafa',
          borderBottom: '1px solid #e8e8e8',
          padding: '0 16px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <a-tabs
          v-model:active-key="activeKey"
          type="editable-card"
          hide-add
          size="small"
          @edit="(targetKey, action) => action === 'remove' && removeTab(String(targetKey))"
          @change="(key) => switchTab(String(key))"
        >
          <a-tab-pane
            v-for="tab in tabs"
            :key="tab.key"
            :closable="tab.closable"
          >
            <template #tab>
              <div
                class="tab-title"
                @contextmenu="(e) => handleTabContextMenu(e, tab.key)"
              >
                {{ tab.title }}
              </div>
            </template>
          </a-tab-pane>

          <template #rightExtra>
            <a-dropdown placement="bottomRight">
              <a-button
                type="text"
                size="small"
                style="margin-left: 8px"
              >
                <template #icon>
                  <DownOutlined />
                </template>
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    key="refresh"
                    @click="handleRefresh"
                  >
                    <ReloadOutlined />
                    刷新当前
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item
                    key="close-other"
                    @click="closeOtherTabs(activeKey)"
                  >
                    <CloseOutlined />
                    关闭其他
                  </a-menu-item>
                  <a-menu-item
                    key="close-all"
                    @click="closeAllTabs"
                  >
                    <CloseCircleOutlined />
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
          margin: fixedHeader ? (showTabs ? '104px 0 0' : '64px 0 0') : '0',
          padding: '16px',
          background: '#f0f2f5',
          minHeight: showTabs ? 'calc(100vh - 104px)' : 'calc(100vh - 64px)',
        }"
      >
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            minHeight: showTabs ? 'calc(100vh - 136px)' : 'calc(100vh - 96px)',
          }"
        >
          <slot />
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer
        v-if="footer"
        :style="{
          textAlign: 'center',
          padding: '24px 16px',
          background: '#f0f2f5',
          color: 'rgba(0, 0, 0, 0.45)',
        }"
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
  justify-content: flex-start;
  gap: 12px;
  padding: 0 24px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;
}

.layout-logo-dark {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.layout-logo-icon {
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  transition: transform 0.3s;
}

.layout-logo:hover .layout-logo-icon {
  transform: scale(1.1) rotate(5deg);
}

.layout-title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0.5px;
  transition: all 0.3s;
}

.layout-title-dark {
  color: #fff;
}

/* Fade 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Tabs 样式优化 */
.layout-tabs {
  box-shadow: none;
}

.layout-tabs :deep(.ant-tabs) {
  flex: 1;
}

.layout-tabs :deep(.ant-tabs-nav) {
  margin: 0;
  padding: 0;
  height: 40px;
}

.layout-tabs :deep(.ant-tabs-nav::before) {
  border: none;
}

.layout-tabs :deep(.ant-tabs-nav-wrap) {
  display: flex;
  align-items: center;
}

.layout-tabs :deep(.ant-tabs-nav-list) {
  display: flex;
  align-items: center;
}

.layout-tabs :deep(.ant-tabs-tab) {
  border: 1px solid transparent;
  background: transparent;
  margin: 0 2px 0 0;
  padding: 0 12px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.layout-tabs :deep(.ant-tabs-tab:hover) {
  background: #fff;
  color: #1890ff;
}

.layout-tabs :deep(.ant-tabs-tab-active) {
  background: #fff;
  border-color: #d9d9d9;
  color: #1890ff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.layout-tabs :deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #1890ff;
  font-weight: 500;
}

.layout-tabs :deep(.ant-tabs-tab-remove) {
  margin-left: 6px;
  margin-right: -4px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.layout-tabs :deep(.ant-tabs-tab-remove:hover) {
  color: #ff4d4f;
}

.layout-tabs :deep(.ant-tabs-tab .ant-tabs-tab-btn) {
  display: flex;
  align-items: center;
}

.layout-tabs :deep(.ant-tabs-ink-bar) {
  display: none;
}

.tab-title {
  display: flex;
  align-items: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  line-height: 1;
}

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
}

.layout-trigger:hover {
  background: #f0f0f0;
  color: #1890ff;
}

.layout-trigger-dark {
  background: #001529;
  border-top-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.65);
}

.layout-trigger-dark:hover {
  background: #1890ff;
  color: #fff;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.layout-breadcrumb {
  margin: 0;
  display: flex;
  align-items: center;
}

.layout-breadcrumb :deep(li) {
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  bottom: auto !important;
}

.layout-breadcrumb :deep(.ant-breadcrumb-separator) {
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
}

.breadcrumb-link,
.breadcrumb-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-icon {
  font-size: 14px;
}
</style>
