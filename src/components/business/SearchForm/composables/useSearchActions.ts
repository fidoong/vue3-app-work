/**
 * 搜索表单操作逻辑
 */

import type { Ref } from 'vue'
import type { SearchFormEmits } from '../types'

export interface UseSearchActionsReturn {
  /** 搜索 */
  handleSearch: () => void
  /** 重置 */
  handleReset: () => void
}

/**
 * 搜索表单操作
 */
export function useSearchActions(
  formRef: Ref<any>,
  formData: Ref<Record<string, any>>,
  emit: SearchFormEmits,
): UseSearchActionsReturn {
  /**
   * 搜索
   */
  function handleSearch() {
    emit('search', { ...formData.value })
  }

  /**
   * 重置
   */
  function handleReset() {
    formRef.value?.resetFields()
    emit('reset')
    // 重置后自动触发搜索
    nextTick(() => {
      emit('search', { ...formData.value })
    })
  }

  return {
    handleSearch,
    handleReset,
  }
}
