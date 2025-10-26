/**
 * 搜索表单展开/收起逻辑
 */

import type { Ref } from 'vue'
import type { FormItemSchema } from '../../../shared/types'

export interface UseSearchCollapseReturn {
  /** 是否展开 */
  expanded: Ref<boolean>
  /** 是否显示展开按钮 */
  showExpandButton: Ref<boolean>
  /** 显示的 Schema */
  displaySchemas: Ref<FormItemSchema[]>
  /** 切换展开状态 */
  toggleExpand: () => void
  /** 展开 */
  expand: () => void
  /** 收起 */
  collapse: () => void
}

/**
 * 搜索表单展开/收起
 */
export function useSearchCollapse(
  schemas: Ref<FormItemSchema[]>,
  defaultExpanded: boolean,
  collapsedRows: number,
): UseSearchCollapseReturn {
  const expanded = ref(defaultExpanded)

  /**
   * 计算每行可以显示的字段数（假设每个字段占 8 列，一行 24 列）
   */
  const fieldsPerRow = computed(() => {
    // 简化计算：假设每个字段平均占 8 列
    return 3
  })

  /**
   * 收起时显示的字段数
   */
  const collapsedFieldCount = computed(() => {
    return fieldsPerRow.value * collapsedRows
  })

  /**
   * 是否需要展开按钮
   */
  const showExpandButton = computed(() => {
    return schemas.value.length > collapsedFieldCount.value
  })

  /**
   * 显示的 Schema
   */
  const displaySchemas = computed(() => {
    if (expanded.value || !showExpandButton.value) {
      return schemas.value
    }
    return schemas.value.slice(0, collapsedFieldCount.value)
  })

  /**
   * 切换展开状态
   */
  function toggleExpand() {
    expanded.value = !expanded.value
  }

  /**
   * 展开
   */
  function expand() {
    expanded.value = true
  }

  /**
   * 收起
   */
  function collapse() {
    expanded.value = false
  }

  return {
    expanded,
    showExpandButton,
    displaySchemas,
    toggleExpand,
    expand,
    collapse,
  }
}
