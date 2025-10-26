/**
 * SchemaForm 类型定义
 */

import type { FormInstance } from 'ant-design-vue'
import type { Ref } from 'vue'
import type { FormConfig, FormItemSchema } from '../../shared/types'

/**
 * SchemaForm Props
 */
export interface SchemaFormProps extends FormConfig {
  /** 表单配置 */
  schemas: FormItemSchema[]
  /** 表单数据 */
  modelValue?: Record<string, any>
  /** 标签列配置 */
  labelCol?: Record<string, any>
  /** 内容列配置 */
  wrapperCol?: Record<string, any>
  /** 布局方式 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 表单名称 */
  name?: string
}

/**
 * SchemaForm Emits
 */
export interface SchemaFormEmits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit', value: Record<string, any>): void
  (e: 'reset'): void
  (e: 'change', field: string, value: any): void
  (e: 'validate', field: string, valid: boolean, message?: string): void
}

/**
 * SchemaForm 实例方法
 */
export interface SchemaFormInstance {
  /** 验证表单 */
  validate: () => Promise<any>
  /** 验证指定字段 */
  validateFields: (fields: string[]) => Promise<any>
  /** 清除验证 */
  clearValidate: (fields?: string[]) => void
  /** 重置表单 */
  resetFields: () => void
  /** 设置字段值 */
  setFieldValue: (field: string, value: any) => void
  /** 批量设置字段值 */
  setFieldsValue: (values: Record<string, any>) => void
  /** 获取字段值 */
  getFieldValue: (field: string) => any
  /** 获取表单数据 */
  getFormData: () => Record<string, any>
  /** 是否提交中 */
  isSubmitting: Ref<boolean>
  /** 表单实例 */
  formRef: Ref<FormInstance | undefined>
}
