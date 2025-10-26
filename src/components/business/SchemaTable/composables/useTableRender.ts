/**
 * 表格渲染处理
 */

import type { TableColumnSchema } from '../types'
import { getValueByPath } from '../../../shared/utils'

export interface UseTableRenderReturn<T = any> {
  /** 渲染列 */
  renderColumn: (column: TableColumnSchema<T>, record: T, index: number) => any
}

/**
 * 表格渲染处理
 */
export function useTableRender<T = any>(): UseTableRenderReturn<T> {
  /**
   * 渲染列
   */
  function renderColumn(
    column: TableColumnSchema<T>,
    record: T,
    index: number,
  ): any {
    // 获取值
    const value = column.dataIndex
      ? getValueByPath(record, column.dataIndex)
      : undefined

    // 自定义渲染函数
    if (column.render) {
      return column.render({
        record,
        index,
        value,
        column,
      })
    }

    // 自定义组件
    if (column.component) {
      const props = typeof column.props === 'function'
        ? column.props(record)
        : column.props || {}

      return h(column.component, {
        ...props,
        value,
        record,
        index,
      })
    }

    // 默认显示值
    return value
  }

  return {
    renderColumn,
  }
}
