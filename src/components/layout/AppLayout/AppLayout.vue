<script setup lang="ts">
import type { MenuItemSchema } from '../AppMenu/types'
import type { AppLayoutEmits, AppLayoutProps } from './types'
import { useRoute, useRouter } from 'vue-router'
import { refreshCurrentPage } from '~/utils/redirect'
import { useBreadcrumb, useTabs } from './composables'
import LayoutHeader from './widgets/LayoutHeader.vue'
import LayoutSidebar from './widgets/LayoutSidebar.vue'
import LayoutTabs from './widgets/LayoutTabs.vue'

const props = withDefaults(defineProps<AppLayoutProps>(), {
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

const emit = defineEmits<AppLayoutEmits>()

const route = useRoute()
const router = useRouter()
const menuItemsRef = toRef(props, 'menuItems')

const internalCollapsed = ref(props.collapsed)

// 面包屑
const { breadcrumbs } = useBreadcrumb(menuItemsRef)

// 标签页
const { tabs, activeKey, addTab, removeTab, closeOtherTabs, closeAllTabs, closeLeftTabs, closeRightTabs, switchTab } = useTabs()

/**
 * 刷新当前页面内容
 */
async function handleRefresh() {
  emit('refresh')
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
function handleUserMenuClick(key: string) {
  if (key === 'logout') {
    emit('logout')
  }
  else {
    emit('userMenuClick', key)
  }
}

/**
 * 切换折叠状态
 */
function handleToggleCollapsed(collapsed: boolean) {
  internalCollapsed.value = collapsed
  emit('update:collapsed', collapsed)
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
    class="app-layout"
    style="min-height: 100vh"
  >
    <!-- 侧边栏 -->
    <LayoutSidebar
      :collapsed="internalCollapsed"
      :theme="theme"
      :logo="logo"
      :title="title"
      :menu-items="menuItems"
      :sidebar-width="sidebarWidth"
      :collapsed-width="collapsedWidth"
      :fixed-sidebar="fixedSidebar"
      @update:collapsed="handleToggleCollapsed"
      @menu-select="handleMenuSelect"
    />

    <a-layout
      :style="{
        marginLeft: fixedSidebar ? (internalCollapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
      }"
    >
      <!-- 头部 -->
      <LayoutHeader
        :breadcrumbs="breadcrumbs"
        :show-breadcrumb="showBreadcrumb"
        :show-fullscreen="showFullscreen"
        :show-user-dropdown="showUserDropdown"
        :user-info="userInfo"
        :fixed-header="fixedHeader"
        :fixed-sidebar="fixedSidebar"
        :collapsed="internalCollapsed"
        :sidebar-width="sidebarWidth"
        :collapsed-width="collapsedWidth"
        @refresh="handleRefresh"
        @user-menu-click="handleUserMenuClick"
      />

      <!-- 标签页 -->
      <LayoutTabs
        v-if="showTabs"
        :tabs="tabs"
        :active-key="activeKey"
        :fixed-header="fixedHeader"
        :fixed-sidebar="fixedSidebar"
        :collapsed="internalCollapsed"
        :sidebar-width="sidebarWidth"
        :collapsed-width="collapsedWidth"
        @update:active-key="(key) => activeKey = key"
        @remove="removeTab"
        @switch="switchTab"
        @refresh="handleRefresh"
        @close-left="closeLeftTabs"
        @close-right="closeRightTabs"
        @close-other="closeOtherTabs"
        @close-all="closeAllTabs"
        @contextmenu="handleTabContextMenu"
      />

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
@use './AppLayout.scss';
</style>
