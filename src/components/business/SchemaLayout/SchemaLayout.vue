<script setup lang="ts">
import type { MenuItemSchema } from '../SchemaMenu/types'
import type { SchemaLayoutEmits, SchemaLayoutProps } from './types'
import {
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  UserOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { refreshCurrentPage } from '~/utils/redirect'
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
const { tabs, activeKey, addTab, removeTab, closeOtherTabs, closeAllTabs, closeLeftTabs, closeRightTabs, switchTab } = useTabs()

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
 * 刷新当前页面内容
 */
async function handleRefresh() {
  // 发送刷新事件，让父组件处理
  emit('refresh')

  // 使用工具函数刷新页面
  await refreshCurrentPage(router)
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
      }"
    >
      <div
        class="layout-sider-content"
        :style="{
          height: '100%',
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
          class="layout-menu-container"
          :style="{
            flex: 1,
            overflow: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
          }"
        >
          <SchemaMenu
            :items="menuItems"
            :theme="theme"
            mode="inline"
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
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <!-- 固定首页按钮 -->
        <a-tooltip
          title="返回首页"
          placement="bottom"
        >
          <div
            class="tabs-home-btn"
            :class="{ active: activeKey === 'home' }"
            @click="switchTab('home')"
          >
            <HomeOutlined />
            <span class="tabs-home-text">首页</span>
          </div>
        </a-tooltip>

        <a-divider
          type="vertical"
          style="height: 24px; margin: 0 8px 0 12px"
        />

        <div class="layout-tabs-wrapper">
          <a-tabs
            v-model:active-key="activeKey"
            type="editable-card"
            hide-add
            size="small"
            :tab-bar-gutter="4"
            @edit="(targetKey: any, action: 'add' | 'remove') => action === 'remove' && removeTab(String(targetKey))"
            @change="(key: string | number) => switchTab(String(key))"
          >
            <a-tab-pane
              v-for="tab in tabs.filter(t => t.key !== 'home')"
              :key="tab.key"
              :closable="tab.closable"
            >
              <template #tab>
                <div
                  class="tab-title"
                  :title="tab.title"
                  @contextmenu="(e) => handleTabContextMenu(e, tab.key)"
                >
                  {{ tab.title }}
                </div>
              </template>
            </a-tab-pane>

            <template #rightExtra>
              <a-dropdown
                placement="bottomRight"
                :trigger="['click']"
                overlay-class-name="tabs-dropdown-menu"
              >
                <a-button
                  type="text"
                  size="small"
                  class="tabs-action-btn"
                >
                  <template #icon>
                    <DownOutlined />
                  </template>
                </a-button>
                <template #overlay>
                  <a-menu class="tabs-action-menu">
                    <a-menu-item
                      key="refresh"
                      class="tabs-menu-item"
                      @click="handleRefresh"
                    >
                      <template #icon>
                        <ReloadOutlined />
                      </template>
                      <span>刷新当前页</span>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item
                      key="close-left"
                      class="tabs-menu-item"
                      :disabled="tabs.findIndex(t => t.key === activeKey) <= tabs.findIndex(t => t.closable !== false)"
                      @click="closeLeftTabs(activeKey)"
                    >
                      <template #icon>
                        <VerticalLeftOutlined />
                      </template>
                      <span>关闭左侧标签</span>
                    </a-menu-item>
                    <a-menu-item
                      key="close-right"
                      class="tabs-menu-item"
                      :disabled="tabs.findIndex(t => t.key === activeKey) >= tabs.length - 1"
                      @click="closeRightTabs(activeKey)"
                    >
                      <template #icon>
                        <VerticalRightOutlined />
                      </template>
                      <span>关闭右侧标签</span>
                    </a-menu-item>
                    <a-menu-item
                      key="close-other"
                      class="tabs-menu-item"
                      :disabled="tabs.filter(t => t.closable !== false).length <= 1"
                      @click="closeOtherTabs(activeKey)"
                    >
                      <template #icon>
                        <CloseOutlined />
                      </template>
                      <span>关闭其他标签</span>
                    </a-menu-item>
                    <a-menu-item
                      key="close-all"
                      class="tabs-menu-item"
                      :disabled="tabs.filter(t => t.closable !== false).length === 0"
                      @click="closeAllTabs"
                    >
                      <template #icon>
                        <CloseCircleOutlined />
                      </template>
                      <span>关闭全部标签</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-tabs>
        </div>
      </div>

      <!-- 内容区域 -->
      <a-layout-content
        :style="{
          margin: fixedHeader ? (showTabs ? '104px 0 0' : '64px 0 0') : '0',
          padding: '16px',
          background: '#f0f2f5',
          height: showTabs ? 'calc(100vh - 104px)' : 'calc(100vh - 64px)',
          overflow: 'auto',
        }"
      >
        <div
          class="layout-content-inner"
          :style="{
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            minHeight: '100%',
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

<style scoped lang="scss">
@use './SchemaLayout.scss';
</style>
