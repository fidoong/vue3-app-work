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
    <!-- 固定首页按钮 -->
    <a-tooltip
      title="返回首页"
      placement="bottom"
    >
      <div
        class="tabs-home-btn"
        :class="{ active: activeKey === 'home' }"
        @click="handleHomeClick"
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
        :active-key="activeKey"
        type="editable-card"
        hide-add
        size="small"
        :tab-bar-gutter="4"
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
              class="tab-title"
              :title="tab.title"
              @contextmenu="(e) => handleContextMenu(e, tab.key)"
            >
              {{ tab.title }}
            </div>
          </template>
        </a-tab-pane>

        <template #rightExtra>
          <LayoutTabsActions
            :tabs="tabs"
            :active-key="activeKey"
            @refresh="emit('refresh')"
            @close-left="(key) => emit('closeLeft', key)"
            @close-right="(key) => emit('closeRight', key)"
            @close-other="(key) => emit('closeOther', key)"
            @close-all="emit('closeAll')"
          />
        </template>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-tabs {
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
  height: 40px;
  display: flex;
  align-items: center;
}

.tabs-home-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  height: 32px;
  margin-left: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  user-select: none;

  &:hover {
    background: rgba(24, 144, 255, 0.08);
    color: #1890ff;
  }

  &.active {
    background: #1890ff;
    color: #fff;
  }

  .tabs-home-text {
    font-weight: 500;
  }
}

.layout-tabs-wrapper {
  flex: 1;
  overflow: hidden;
  min-width: 0;

  :deep(.ant-tabs) {
    height: 40px;
  }

  :deep(.ant-tabs-nav) {
    margin: 0;
    padding: 0 8px;
    background: transparent;

    &::before {
      border: none;
    }
  }

  :deep(.ant-tabs-tab) {
    padding: 4px 12px;
    margin: 0 2px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      color: #1890ff;
      border-color: #1890ff;
    }

    &.ant-tabs-tab-active {
      background: #1890ff;
      border-color: #1890ff;

      .ant-tabs-tab-btn {
        color: #fff;
      }

      .ant-tabs-tab-remove {
        color: rgba(255, 255, 255, 0.85);

        &:hover {
          color: #fff;
        }
      }
    }
  }

  :deep(.ant-tabs-tab-btn) {
    font-size: 13px;
  }

  :deep(.ant-tabs-tab-remove) {
    margin-left: 4px;
    font-size: 12px;
    transition: all 0.3s;

    &:hover {
      color: #ff4d4f;
    }
  }

  :deep(.ant-tabs-nav-operations) {
    display: none;
  }
}

.tab-title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
