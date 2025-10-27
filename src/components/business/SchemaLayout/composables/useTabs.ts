/**
 * 标签页管理
 */

import type { Ref } from 'vue'
import type { TabItem } from '../types'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export interface UseTabsReturn {
  /** 标签页列表 */
  tabs: Ref<TabItem[]>
  /** 当前激活的标签页 */
  activeKey: Ref<string>
  /** 添加标签页 */
  addTab: (tab: TabItem) => void
  /** 移除标签页 */
  removeTab: (key: string) => void
  /** 关闭其他标签页 */
  closeOtherTabs: (key: string) => void
  /** 关闭所有标签页 */
  closeAllTabs: () => void
  /** 切换标签页 */
  switchTab: (key: string) => void
  /** 关闭左侧标签页 */
  closeLeftTabs: (key: string) => void
  /** 关闭右侧标签页 */
  closeRightTabs: (key: string) => void
}

// 最大标签页数量
const MAX_TABS = 20

/**
 * 标签页管理
 */
export function useTabs(): UseTabsReturn {
  const router = useRouter()

  const tabs = ref<TabItem[]>([
    {
      key: 'home',
      title: '首页',
      path: '/',
      closable: false,
    },
  ])

  const activeKey = ref('home')

  /**
   * 滚动到激活的标签页
   */
  function scrollToActiveTab() {
    nextTick(() => {
      setTimeout(() => {
        const activeTab = document.querySelector('.ant-tabs-tab-active') as HTMLElement
        if (!activeTab)
          return

        const navWrap = document.querySelector('.ant-tabs-nav-wrap') as HTMLElement
        if (!navWrap)
          return

        // 计算标签页相对于容器的位置
        const offsetLeft = activeTab.offsetLeft
        const tabWidth = activeTab.offsetWidth
        const wrapWidth = navWrap.clientWidth
        const scrollLeft = navWrap.scrollLeft

        const PADDING = 40 // 边距

        // 判断标签页是否在可视区域内
        const isLeftVisible = offsetLeft >= scrollLeft + PADDING
        const isRightVisible = offsetLeft + tabWidth <= scrollLeft + wrapWidth - PADDING

        // 只有当标签页不完全可见时才滚动
        if (!isLeftVisible) {
          // 标签页在左侧不可见，滚动到左侧
          navWrap.scrollTo({
            left: Math.max(0, offsetLeft - PADDING),
            behavior: 'smooth',
          })
        }
        else if (!isRightVisible) {
          // 标签页在右侧不可见，滚动到右侧
          navWrap.scrollTo({
            left: offsetLeft + tabWidth - wrapWidth + PADDING,
            behavior: 'smooth',
          })
        }
      }, 100) // 延迟一点确保 DOM 已更新
    })
  }

  /**
   * 添加标签页
   */
  function addTab(tab: TabItem) {
    const existingTab = tabs.value.find(t => t.key === tab.key)

    if (!existingTab) {
      // 检查标签页数量限制
      if (tabs.value.length >= MAX_TABS) {
        // 移除最早打开的可关闭标签页
        const firstClosableIndex = tabs.value.findIndex(t => t.closable !== false)
        if (firstClosableIndex !== -1) {
          tabs.value.splice(firstClosableIndex, 1)
        }
        else {
          message.warning(`最多只能打开 ${MAX_TABS} 个标签页`)
          return
        }
      }

      tabs.value.push(tab)
    }

    activeKey.value = tab.key
    scrollToActiveTab()
  }

  /**
   * 移除标签页
   */
  function removeTab(key: string) {
    const index = tabs.value.findIndex(t => t.key === key)

    if (index === -1) {
      return
    }

    const tab = tabs.value[index]

    // 不允许关闭不可关闭的标签页
    if (tab.closable === false) {
      return
    }

    tabs.value.splice(index, 1)

    // 如果关闭的是当前标签页，切换到相邻标签页
    if (activeKey.value === key) {
      const nextTab = tabs.value[index] || tabs.value[index - 1]
      if (nextTab) {
        switchTab(nextTab.key)
      }
    }
  }

  /**
   * 关闭其他标签页
   */
  function closeOtherTabs(key: string) {
    tabs.value = tabs.value.filter(t => t.key === key || t.closable === false)
    activeKey.value = key
  }

  /**
   * 关闭所有标签页
   */
  function closeAllTabs() {
    tabs.value = tabs.value.filter(t => t.closable === false)
    const firstTab = tabs.value[0]
    if (firstTab) {
      switchTab(firstTab.key)
    }
  }

  /**
   * 关闭左侧标签页
   */
  function closeLeftTabs(key: string) {
    const index = tabs.value.findIndex(t => t.key === key)
    if (index === -1)
      return

    tabs.value = [
      ...tabs.value.slice(0, index).filter(t => t.closable === false),
      ...tabs.value.slice(index),
    ]
  }

  /**
   * 关闭右侧标签页
   */
  function closeRightTabs(key: string) {
    const index = tabs.value.findIndex(t => t.key === key)
    if (index === -1)
      return

    tabs.value = [
      ...tabs.value.slice(0, index + 1),
      ...tabs.value.slice(index + 1).filter(t => t.closable === false),
    ]
  }

  /**
   * 切换标签页
   */
  function switchTab(key: string) {
    const tab = tabs.value.find(t => t.key === key)
    if (tab) {
      activeKey.value = key
      router.push(tab.path)
      scrollToActiveTab()
    }
  }

  return {
    tabs,
    activeKey,
    addTab,
    removeTab,
    closeOtherTabs,
    closeAllTabs,
    closeLeftTabs,
    closeRightTabs,
    switchTab,
  }
}
