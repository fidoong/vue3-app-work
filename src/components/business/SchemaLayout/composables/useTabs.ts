/**
 * 标签页管理
 */

import type { Ref } from 'vue'
import type { TabItem } from '../types'
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
}

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
   * 添加标签页
   */
  function addTab(tab: TabItem) {
    const existingTab = tabs.value.find(t => t.key === tab.key)

    if (!existingTab) {
      tabs.value.push(tab)
    }

    activeKey.value = tab.key
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
   * 切换标签页
   */
  function switchTab(key: string) {
    const tab = tabs.value.find(t => t.key === key)
    if (tab) {
      activeKey.value = key
      router.push(tab.path)
    }
  }

  return {
    tabs,
    activeKey,
    addTab,
    removeTab,
    closeOtherTabs,
    closeAllTabs,
    switchTab,
  }
}
