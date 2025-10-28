/**
 * 菜单项处理
 */

import type { Ref } from 'vue'
import type { MenuItemSchema } from '../types'

export interface UseMenuItemsReturn {
  /** 可见的菜单项 */
  visibleItems: Ref<MenuItemSchema[]>
  /** 根据 key 查找菜单项 */
  findItemByKey: (key: string) => MenuItemSchema | null
  /** 根据路径查找菜单项 */
  findItemByPath: (path: string) => { key: string, item: MenuItemSchema } | null
  /** 获取父级菜单键 */
  getParentKeys: (key: string) => string[]
}

/**
 * 菜单项处理
 */
export function useMenuItems(
  items: Ref<MenuItemSchema[]>,
): UseMenuItemsReturn {
  /**
   * 可见的菜单项（过滤隐藏项）
   */
  const visibleItems = computed(() => {
    function filterVisible(items: MenuItemSchema[]): MenuItemSchema[] {
      return items
        .filter(item => !item.hidden)
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: filterVisible(item.children),
            }
          }
          return item
        })
    }

    return filterVisible(items.value)
  })

  /**
   * 根据 key 查找菜单项
   */
  function findItemByKey(key: string): MenuItemSchema | null {
    function search(items: MenuItemSchema[]): MenuItemSchema | null {
      for (const item of items) {
        if (item.key === key) {
          return item
        }
        if (item.children) {
          const found = search(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    return search(items.value)
  }

  /**
   * 根据路径查找菜单项
   */
  function findItemByPath(path: string): { key: string, item: MenuItemSchema } | null {
    function search(items: MenuItemSchema[]): { key: string, item: MenuItemSchema } | null {
      for (const item of items) {
        if (item.path === path) {
          return { key: item.key, item }
        }
        if (item.children) {
          const found = search(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    return search(items.value)
  }

  /**
   * 获取父级菜单键
   */
  function getParentKeys(key: string): string[] {
    const parentKeys: string[] = []

    function search(items: MenuItemSchema[], parents: string[] = []): boolean {
      for (const item of items) {
        if (item.key === key) {
          parentKeys.push(...parents)
          return true
        }
        if (item.children) {
          if (search(item.children, [...parents, item.key])) {
            return true
          }
        }
      }
      return false
    }

    search(items.value)
    return parentKeys
  }

  return {
    visibleItems,
    findItemByKey,
    findItemByPath,
    getParentKeys,
  }
}
