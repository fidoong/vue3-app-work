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
import { computed } from 'vue'

interface LayoutTabsActionsProps {
  tabs: TabItem[]
  activeKey: string
}

const props = defineProps<LayoutTabsActionsProps>()

const emit = defineEmits<{
  refresh: []
  closeLeft: [key: string]
  closeRight: [key: string]
  closeOther: [key: string]
  closeAll: []
}>()

const currentIndex = computed(() => {
  return props.tabs.findIndex(t => t.key === props.activeKey)
})

const firstClosableIndex = computed(() => {
  return props.tabs.findIndex(t => t.closable !== false)
})

const closableTabs = computed(() => {
  return props.tabs.filter(t => t.closable !== false)
})

const canCloseLeft = computed(() => {
  return currentIndex.value > firstClosableIndex.value
})

const canCloseRight = computed(() => {
  const lastClosableIndex = props.tabs.map((t, i) => ({ ...t, index: i }))
    .filter(t => t.closable !== false)
    .pop()
    ?.index ?? -1
  return currentIndex.value < lastClosableIndex
})

const canCloseOther = computed(() => {
  return closableTabs.value.length > 1
})

const canCloseAll = computed(() => {
  return closableTabs.value.length > 0
})
</script>

<template>
  <a-dropdown
    placement="bottomRight"
    :trigger="['click']"
  >
    <a-button
      type="text"
      size="small"
      class="action-trigger"
    >
      <DownOutlined />
    </a-button>
    <template #overlay>
      <a-menu class="action-menu">
        <a-menu-item
          key="refresh"
          @click="emit('refresh')"
        >
          <ReloadOutlined class="menu-icon" />
          <span>刷新当前页</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item
          key="close-left"
          :disabled="!canCloseLeft"
          @click="emit('closeLeft', activeKey)"
        >
          <VerticalLeftOutlined class="menu-icon" />
          <span>关闭左侧</span>
        </a-menu-item>
        <a-menu-item
          key="close-right"
          :disabled="!canCloseRight"
          @click="emit('closeRight', activeKey)"
        >
          <VerticalRightOutlined class="menu-icon" />
          <span>关闭右侧</span>
        </a-menu-item>
        <a-menu-item
          key="close-other"
          :disabled="!canCloseOther"
          @click="emit('closeOther', activeKey)"
        >
          <CloseOutlined class="menu-icon" />
          <span>关闭其他</span>
        </a-menu-item>
        <a-menu-item
          key="close-all"
          :disabled="!canCloseAll"
          @click="emit('closeAll')"
        >
          <CloseCircleOutlined class="menu-icon" />
          <span>关闭全部</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.action-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #1890ff;
    background: #e6f7ff;
  }
}

.action-menu {
  min-width: 140px;
  padding: 4px;

  :deep(.ant-dropdown-menu-item) {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 4px 12px;
    font-size: 13px;
    line-height: 24px;
    border-radius: 4px;
    transition: all 0.2s;

    .menu-icon {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }

    &:hover:not(.ant-dropdown-menu-item-disabled) {
      color: #1890ff;
      background: #e6f7ff;

      .menu-icon {
        color: #1890ff;
      }
    }

    &.ant-dropdown-menu-item-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;

      .menu-icon {
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }

  :deep(.ant-dropdown-menu-item-divider) {
    margin: 4px 0;
    background: #f0f0f0;
  }
}
</style>
