<script setup lang="ts">
import type { TabItem } from '../types.ts'
import {
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  ReloadOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons-vue'

interface LayoutTabsActionsProps {
  tabs: TabItem[]
  activeKey: string
}

defineProps<LayoutTabsActionsProps>()

const emit = defineEmits<{
  refresh: []
  closeLeft: [key: string]
  closeRight: [key: string]
  closeOther: [key: string]
  closeAll: []
}>()
</script>

<template>
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
          @click="emit('refresh')"
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
          @click="emit('closeLeft', activeKey)"
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
          @click="emit('closeRight', activeKey)"
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
          @click="emit('closeOther', activeKey)"
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
          @click="emit('closeAll')"
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

<style scoped lang="scss">
.tabs-action-btn {
  margin-left: 8px;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.65);
  transition: all 0.3s;

  &:hover {
    color: #1890ff;
    background: rgba(24, 144, 255, 0.08);
  }
}

:global(.tabs-dropdown-menu) {
  .ant-dropdown-menu {
    min-width: 160px;
    padding: 4px;
    border-radius: 6px;
    box-shadow:
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }

  .ant-dropdown-menu-item {
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 22px;

    &:hover:not(.ant-dropdown-menu-item-disabled) {
      background: rgba(24, 144, 255, 0.08);
      color: #1890ff;
    }

    &.ant-dropdown-menu-item-disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .anticon {
      font-size: 14px;
      transition: all 0.2s;
    }

    span {
      flex: 1;
    }
  }

  .ant-dropdown-menu-item-divider {
    margin: 4px 0;
    background: rgba(0, 0, 0, 0.06);
  }
}

.tabs-action-menu {
  .tabs-menu-item {
    user-select: none;

    &:active:not(.ant-dropdown-menu-item-disabled) {
      background: rgba(24, 144, 255, 0.15);
    }
  }
}
</style>
