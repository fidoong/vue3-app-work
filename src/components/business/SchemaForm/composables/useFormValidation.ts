/**
 * 表单验证逻辑
 */

import type { FormInstance } from 'ant-design-vue'
import type { Ref } from 'vue'
import type { SchemaFormEmits } from '../types'

export interface UseFormValidationReturn {
  /** 是否提交中 */
  isSubmitting: Ref<boolean>
  /** 提交表单 */
  handleSubmit: () => Promise<void>
  /** 重置表单 */
  handleReset: (resetFn: () => void) => void
  /** 验证表单 */
  validate: () => Promise<any>
  /** 验证指定字段 */
  validateFields: (fields: string[]) => Promise<any>
  /** 清除验证 */
  clearValidate: (fields?: string[]) => void
  /** 字段变化处理 */
  handleChange: (field: string, value: any) => void
}

/**
 * 表单验证
 */
export function useFormValidation(
  formRef: Ref<FormInstance | undefined>,
  formData: Ref<Record<string, any>>,
  emit: SchemaFormEmits,
): UseFormValidationReturn {
  const isSubmitting = ref(false)

  /**
   * 验证表单
   */
  async function validate(): Promise<any> {
    if (!formRef.value) {
      throw new Error('Form instance not found')
    }
    return formRef.value.validate()
  }

  /**
   * 验证指定字段
   */
  async function validateFields(fields: string[]): Promise<any> {
    if (!formRef.value) {
      throw new Error('Form instance not found')
    }
    return formRef.value.validateFields(fields)
  }

  /**
   * 清除验证
   */
  function clearValidate(fields?: string[]) {
    if (!formRef.value) {
      return
    }
    if (fields) {
      formRef.value.clearValidate(fields)
    }
    else {
      formRef.value.clearValidate()
    }
  }

  /**
   * 提交表单
   */
  async function handleSubmit() {
    if (isSubmitting.value) {
      return
    }

    isSubmitting.value = true
    try {
      await validate()
      emit('submit', { ...formData.value })
    }
    catch (error) {
      console.error('表单验证失败:', error)
    }
    finally {
      isSubmitting.value = false
    }
  }

  /**
   * 重置表单
   */
  function handleReset(resetFn: () => void) {
    resetFn()
    clearValidate()
    emit('reset')
  }

  /**
   * 字段变化处理
   */
  function handleChange(field: string, value: any) {
    emit('change', field, value)
    emit('update:modelValue', { ...formData.value })
  }

  return {
    isSubmitting,
    handleSubmit,
    handleReset,
    validate,
    validateFields,
    clearValidate,
    handleChange,
  }
}
