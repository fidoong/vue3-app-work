/**
 * 表单状态管理
 */

import type { Ref } from 'vue'
import type { FormItemSchema } from '../../../shared/types'

export interface UseFormStateReturn {
  /** 表单数据 */
  formData: Ref<Record<string, any>>
  /** 初始数据 */
  initialData: Ref<Record<string, any>>
  /** 初始化表单数据 */
  initFormData: () => void
  /** 设置字段值 */
  setFieldValue: (field: string, value: any) => void
  /** 批量设置字段值 */
  setFieldsValue: (values: Record<string, any>) => void
  /** 获取字段值 */
  getFieldValue: (field: string) => any
  /** 获取表单数据 */
  getFormData: () => Record<string, any>
  /** 重置到初始值 */
  resetToInitial: () => void
}

/**
 * 表单状态管理
 */
export function useFormState(
  schemas: Ref<FormItemSchema[]>,
  modelValue: Ref<Record<string, any>>,
): UseFormStateReturn {
  const formData = ref<Record<string, any>>({})
  const initialData = ref<Record<string, any>>({})

  /**
   * 初始化表单数据
   */
  function initFormData() {
    const data: Record<string, any> = {}

    schemas.value.forEach((schema) => {
      const value = modelValue.value[schema.field] ?? schema.defaultValue
      data[schema.field] = value
    })

    formData.value = data
    initialData.value = { ...data }
  }

  /**
   * 设置字段值
   */
  function setFieldValue(field: string, value: any) {
    formData.value[field] = value
  }

  /**
   * 批量设置字段值
   */
  function setFieldsValue(values: Record<string, any>) {
    Object.assign(formData.value, values)
  }

  /**
   * 获取字段值
   */
  function getFieldValue(field: string): any {
    return formData.value[field]
  }

  /**
   * 获取表单数据
   */
  function getFormData(): Record<string, any> {
    return { ...formData.value }
  }

  /**
   * 重置到初始值
   */
  function resetToInitial() {
    formData.value = { ...initialData.value }
  }

  /**
   * 监听外部数据变化
   */
  watch(
    () => modelValue.value,
    (newVal) => {
      if (newVal && Object.keys(newVal).length > 0) {
        Object.assign(formData.value, newVal)
      }
    },
    { deep: true },
  )

  return {
    formData,
    initialData,
    initFormData,
    setFieldValue,
    setFieldsValue,
    getFieldValue,
    getFormData,
    resetToInitial,
  }
}
