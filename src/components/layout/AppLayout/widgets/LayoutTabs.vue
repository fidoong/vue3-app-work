<script setup lang="ts">
import type { TabItem } from '../types.ts'
import { HomeOutlined } from '@ant-design/icons-vue'
import LayoutTabsActions from './LayoutTabsActions.vue'

interface LayoutTabsProps {
  tabs: TabItem[]
  activeKey: string
  fixedHeader?: boolean
  fixedSidebar?: boolean
  collapsed?: boolean
  sidebarWidth?: number
  collapsedWidth?: number
}

withDefaults(defineProps<LayoutTabsProps>(), {
  fixedHeader: true,
  fixedSidebar: true,
  collapsed: false,
  sidebarWidth: 256,
  collapsedWidth: 80,
})

const emit = defineEmits<{
  'update:activeKey': [key: string]
  'remove': [key: string]
  'switch': [key: string]
  'refresh': []
  'closeLeft': [key: string]
  'closeRight': [key: string]
  'closeOther': [key: string]
  'closeAll': []
  'contextmenu': [e: MouseEvent, key: string]
}>()

function handleTabChange(key: string | number) {
  const tabKey = String(key)
  emit('update:activeKey', tabKey)
  emit('switch', tabKey)
}

function handleTabEdit(targetKey: any, action: 'add' | 'remove') {
  if (action === 'remove') {
    emit('remove', String(targetKey))
  }
}

function handleHomeClick() {
  emit('switch', 'home')
}

function handleContextMenu(e: MouseEvent, key: string) {
  e.preventDefault()
  emit('contextmenu', e, key)
}
</script>

<template>
  <div
    class="layout-tabs"
    :style="{
      position: fixedHeader ? 'fixed' : 'relative',
      top: fixedHeader ? '64px' : '0',
      right: 0,
      left: fixedSidebar ? (collapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`) : '0',
      zIndex: 98,
      transition: 'left 0.2s',
    }"
  >
    <!-- 首页按钮 -->
    <div
      class="tabs-home-btn"
      :class="{ active: activeKey === 'home' }"
      @click="handleHomeClick"
    >
      <HomeOutlined class="home-icon" />
      <span class="home-text">首页</span>
    </div>

    <div class="tabs-divider" />

    <!-- 标签页区域 -->
    <div class="tabs-content">
      <a-tabs
        :active-key="activeKey"
        type="editable-card"
        hide-add
        size="small"
        @edit="handleTabEdit"
        @change="handleTabChange"
      >
        <a-tab-pane
          v-for="tab in tabs.filter(t => t.key !== 'home')"
          :key="tab.key"
          :closable="tab.closable"
        >
          <template #tab>
            <div
              class="tab-label"
              :title="tab.title"
              @contextmenu="(e) => handleContextMenu(e, tab.key)"
            >
              {{ tab.title }}
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- 操作按钮 -->
    <div class="tabs-actions">
      <LayoutTabsActions
        :tabs="tabs"
        :active-key="activeKey"
        @refresh="emit('refresh')"
        @close-left="(key) => emit('closeLeft', key)"
        @close-right="(key) => emit('closeRight', key)"
        @close-other="(key) => emit('closeOther', key)"
        @close-all="emit('closeAll')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-tabs {
  display: flex;
  align-items: center;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.tabs-home-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  margin-left: 12px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  flex-shrink: 0;

  .home-icon {
    font-size: 16px;
  }

  .home-text {
    font-weight: 500;
  }

  &:hover {
    color: #1890ff;
    background: #e6f7ff;
  }

  &.active {
    color: #fff;
    background: #1890ff;
  }
}

.tabs-divider {
  width: 1px;
  height: 20px;
  margin: 0 12px;
  background: #f0f0f0;
  flex-shrink: 0;
}

.tabs-content {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
    z-index: 1;
  }

  :deep(.ant-tabs) {
    width: 100%;

    .ant-tabs-nav {
      margin: 0;
      padding: 0;
      background: transparent;

      &::before {
        display: none;
      }
    }

    .ant-tabs-nav-wrap {
      padding: 0 8px;
      display: flex;
      align-items: center;
      overflow: hidden;

      &::after {
        display: none;
      }
    }

    .ant-tabs-nav-list {
      display: flex;
      align-items: center;
    }

    .ant-tabs-ink-bar {
      display: none;
    }

    .ant-tabs-tab {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 12px;
      margin: 0 4px 0 0;
      background: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        color: #1890ff;
        background: #e6f7ff;
        border-color: #91d5ff;
      }

      &.ant-tabs-tab-active {
        color: #1890ff;
        background: #fff;
        border-color: #1890ff;

        .ant-tabs-tab-btn {
          color: #1890ff;
          font-weight: 500;
        }
      }
    }

    .ant-tabs-tab-btn {
      display: flex;
      align-items: center;
      font-size: 13px;
      line-height: 1;
      color: inherit;
    }

    .ant-tabs-tab-remove {
      display: flex;
      align-items: center;
      margin-left: 6px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      transition: all 0.2s;

      &:hover {
        color: #ff4d4f;
      }
    }

    .ant-tabs-nav-operations {
      display: none;
    }

    .ant-tabs-extra-content {
      display: none;
    }
  }
}

.tabs-actions {
  display: flex;
  align-items: center;
  padding: 0 12px;
  flex-shrink: 0;
}

.tab-label {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
