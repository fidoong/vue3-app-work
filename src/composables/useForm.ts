/**
 * 表单通用 Composable
 * 处理表单提交、验证、重置等逻辑
 */

import { reactive, ref } from 'vue'

export interface UseFormOptions<T = any> {
  /** 初始值 */
  initialValues?: Partial<T>
  /** 提交函数 */
  onSubmit?: (values: T) => Promise<void>
  /** 提交成功回调 */
  onSuccess?: (result: any) => void
  /** 提交失败回调 */
  onError?: (error: any) => void
}

export function useForm<T extends Record<string, any> = any>(options: UseFormOptions<T> = {}) {
  const {
    initialValues = {} as Partial<T>,
    onSubmit,
    onSuccess,
    onError,
  } = options

  // 表单数据
  const formData = reactive<T>({ ...initialValues } as T)

  // 表单引用
  const formRef = ref()

  // 加载状态
  const loading = ref(false)

  // 提交表单
  const handleSubmit = async () => {
    if (!onSubmit)
      return

    try {
      // 验证表单
      await formRef.value?.validate()

      loading.value = true
      const result = await onSubmit({ ...formData } as T)

      onSuccess?.(result)
    }
    catch (error) {
      console.error('Form submit failed:', error)
      onError?.(error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  // 重置表单
  const resetForm = () => {
    formRef.value?.resetFields()
    Object.assign(formData, initialValues)
  }

  // 清空表单
  const clearForm = () => {
    formRef.value?.clearValidate()
    Object.keys(formData).forEach((key) => {
      formData[key] = undefined as any
    })
  }

  // 设置表单值
  const setFormData = (data: Partial<T>) => {
    Object.assign(formData, data)
  }

  // 验证表单
  const validate = async () => {
    try {
      await formRef.value?.validate()
      return true
    }
    catch {
      return false
    }
  }

  // 验证指定字段
  const validateField = async (field: keyof T) => {
    try {
      await formRef.value?.validateFields([field as string])
      return true
    }
    catch {
      return false
    }
  }

  // 清除验证
  const clearValidate = (fields?: (keyof T)[]) => {
    if (fields) {
      formRef.value?.clearValidate(fields as string[])
    }
    else {
      formRef.value?.clearValidate()
    }
  }

  return {
    // 数据
    formData,
    formRef,
    loading,

    // 方法
    handleSubmit,
    resetForm,
    clearForm,
    setFormData,
    validate,
    validateField,
    clearValidate,
  }
}
