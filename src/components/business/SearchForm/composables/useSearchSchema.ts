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

    // 添加操作按钮占位
    schemas.push({
      key: 'search-actions',
      field: 'search-actions',
      label: '',
      slot: 'searchActions',
      span: actionSpan || 8,
      colProps: { span: actionSpan || 8 },
    })

    return schemas
  })

  return {
    schemasWithActions,
  }
}
