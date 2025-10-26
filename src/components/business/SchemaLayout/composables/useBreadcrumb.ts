/**
 * 面包屑处理
 */

import type { Ref } from 'vue'
import type { MenuItemSchema } from '../../SchemaMenu/types'
import type { BreadcrumbItem } from '../types'
import { useRoute } from 'vue-router'

export interface UseBreadcrumbReturn {
  /** 面包屑列表 */
  breadcrumbs: Ref<BreadcrumbItem[]>
}

/**
 * 面包屑处理
 */
export function useBreadcrumb(
  menuItems: Ref<MenuItemSchema[]>,
): UseBreadcrumbReturn {
  const route = useRoute()

  /**
   * 根据路径查找菜单项路径
   */
  function findMenuPath(path: string): MenuItemSchema[] {
    const result: MenuItemSchema[] = []

    function search(items: MenuItemSchema[], parents: MenuItemSchema[] = []): boolean {
      for (const item of items) {
        if (item.path === path) {
          result.push(...parents, item)
          return true
        }
        if (item.children) {
          if (search(item.children, [...parents, item])) {
            return true
          }
        }
      }
      return false
    }

    search(menuItems.value)
    return result
  }

  /**
   * 面包屑列表
   */
  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const currentPath = route.path
    const menuPath = findMenuPath(currentPath)

    return menuPath.map(item => ({
      title: item.title,
      path: item.path,
      icon: item.icon,
    }))
  })

  return {
    breadcrumbs,
  }
}
