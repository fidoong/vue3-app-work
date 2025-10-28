/**
 * 菜单状态管理
 */

import type { Ref } from 'vue'

export interface UseMenuStateReturn {
  /** 选中的菜单项 */
  selectedKeys: Ref<string[]>
  /** 展开的子菜单 */
  openKeys: Ref<string[]>
  /** 选中菜单项 */
  selectItem: (key: string) => void
  /** 展开子菜单 */
  openSubMenu: (key: string) => void
  /** 关闭子菜单 */
  closeSubMenu: (key: string) => void
  /** 切换子菜单 */
  toggleSubMenu: (key: string) => void
}

/**
 * 菜单状态管理
 */
export function useMenuState(
  defaultSelectedKeys?: string[],
  defaultOpenKeys?: string[],
  controlledSelectedKeys?: Ref<string[] | undefined>,
  controlledOpenKeys?: Ref<string[] | undefined>,
): UseMenuStateReturn {
  // 内部状态
  const internalSelectedKeys = ref<string[]>(defaultSelectedKeys || [])
  const internalOpenKeys = ref<string[]>(defaultOpenKeys || [])

  // 使用受控或非受控状态
  const selectedKeys = computed({
    get: () => controlledSelectedKeys?.value ?? internalSelectedKeys.value,
    set: (value) => {
      internalSelectedKeys.value = value
    },
  })

  const openKeys = computed({
    get: () => controlledOpenKeys?.value ?? internalOpenKeys.value,
    set: (value) => {
      internalOpenKeys.value = value
    },
  })

  /**
   * 选中菜单项
   */
  function selectItem(key: string) {
    selectedKeys.value = [key]
  }

  /**
   * 展开子菜单
   */
  function openSubMenu(key: string) {
    if (!openKeys.value.includes(key)) {
      openKeys.value = [...openKeys.value, key]
    }
  }

  /**
   * 关闭子菜单
   */
  function closeSubMenu(key: string) {
    openKeys.value = openKeys.value.filter(k => k !== key)
  }

  /**
   * 切换子菜单
   */
  function toggleSubMenu(key: string) {
    if (openKeys.value.includes(key)) {
      closeSubMenu(key)
    }
    else {
      openSubMenu(key)
    }
  }

  return {
    selectedKeys,
    openKeys,
    selectItem,
    openSubMenu,
    closeSubMenu,
    toggleSubMenu,
  }
}
