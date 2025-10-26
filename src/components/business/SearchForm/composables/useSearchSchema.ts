/**
 * 搜索表单 Schema 处理
 */

import type { Ref } from 'vue'
import type { FormItemSchema } from '../../../shared/types'

export interface UseSearchSchemaReturn {
  /** 带操作按钮的 Schema */
  schemasWithActions: Ref<FormItemSchema[]>
}

/**
 * 搜索表单 Schema 处理
 */
export function useSearchSchema(
  displaySchemas: Ref<FormItemSchema[]>,
  allSchemas: Ref<FormItemSchema[]>,
  actionPosition: 'inline' | 'footer',
  actionSpan?: number,
): UseSearchSchemaReturn {
  /**
   * 带操作按钮的 Schema
   */
  const schemasWithActions = computed(() => {
    if (actionPosition === 'footer') {
      return displaySchemas.value
    }

    // inline 模式：在最后添加操作按钮的占位
    const schemas = [...displaySchemas.value]

    // 计算当前行已占用的列数
    let currentRowSpan = 0
    for (const schema of schemas) {
      const span = Number(schema.colProps?.span || schema.span || 8)
      currentRowSpan += span
      if (currentRowSpan >= 24) {
        currentRowSpan = 0
      }
    }

    // 计算操作按钮应该占据的列数
    // 如果当前行有剩余空间，就占据剩余空间；否则占据默认的 actionSpan
    const buttonSpan = currentRowSpan > 0 ? Math.min(24 - currentRowSpan, actionSpan || 8) : (actionSpan || 8)

    // 添加操作按钮占位
    schemas.push({
      key: 'search-actions',
      field: 'search-actions',
      label: '',
      slot: 'searchActions',
      span: buttonSpan,
      colProps: { span: buttonSpan },
    })

    return schemas
  })

  return {
    schemasWithActions,
  }
}
