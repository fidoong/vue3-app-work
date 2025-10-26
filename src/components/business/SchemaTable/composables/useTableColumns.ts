/**
 * 表格列处理
 */

import type { Ref } from 'vue'
import type { TableColumnSchema } from '../types'

export interface UseTableColumnsReturn<T = any> {
  /** 可见的列 */
  visibleColumns: Ref<TableColumnSchema<T>[]>
}

/**
 * 表格列处理
 */
export function useTableColumns<T = any>(
  columns: Ref<TableColumnSchema<T>[]>,
): UseTableColumnsReturn<T> {
  /**
   * 可见的列（过滤隐藏列）
   */
  const visibleColumns = computed(() => {
    return columns.value.filter((column) => {
      if (typeof column.hidden === 'function') {
        // 如果是函数，暂时返回 true，实际使用时需要传入 record
        return true
      }
      return !column.hidden
    })
  })

  return {
    visibleColumns,
  }
}
