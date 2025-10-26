/**
 * Schema 处理逻辑
 */

import type { ColProps } from 'ant-design-vue/es/grid'
import type { Ref } from 'vue'
import type { FormItemSchema } from '../../../shared/types'
import { resolveDynamicValue } from '../../../shared/utils'

export interface UseFormSchemaReturn {
  /** 可见的 Schema */
  visibleSchemas: Ref<FormItemSchema[]>
  /** 获取列配置 */
  getColProps: (schema: FormItemSchema) => ColProps
  /** 获取禁用状态 */
  getDisabled: (schema: FormItemSchema, globalDisabled: boolean, loading: boolean) => boolean
  /** 获取字段属性 */
  getFieldProps: (schema: FormItemSchema) => Record<string, any>
}

/**
 * Schema 处理
 */
export function useFormSchema(
  schemas: Ref<FormItemSchema[]>,
  formData: Ref<Record<string, any>>,
): UseFormSchemaReturn {
  /**
   * 可见的 Schema（过滤隐藏项）
   */
  const visibleSchemas = computed(() => {
    return schemas.value.filter((schema) => {
      // 检查 hidden 属性
      const hidden = resolveDynamicValue(schema.hidden, formData.value, false)
      if (hidden) {
        return false
      }

      // 检查 show 属性（支持 computed 和普通值）
      if (schema.show !== undefined) {
        // 如果是 computed ref，获取其 value
        const showValue = typeof schema.show === 'object' && 'value' in schema.show
          ? schema.show.value
          : schema.show
        return showValue
      }

      return true
    })
  })

  /**
   * 获取列配置
   */
  function getColProps(schema: FormItemSchema): ColProps {
    if (schema.colProps) {
      return schema.colProps
    }

    if (schema.span) {
      return { span: schema.span }
    }

    return { span: 24 }
  }

  /**
   * 获取禁用状态
   */
  function getDisabled(
    schema: FormItemSchema,
    globalDisabled: boolean,
    loading: boolean,
  ): boolean {
    if (globalDisabled || loading) {
      return true
    }

    const schemaDisabled = resolveDynamicValue(schema.disabled, formData.value, false)
    return schemaDisabled ?? false
  }

  /**
   * 获取字段属性
   */
  function getFieldProps(schema: FormItemSchema): Record<string, any> {
    return resolveDynamicValue(schema.props, formData.value, {}) ?? {}
  }

  return {
    visibleSchemas,
    getColProps,
    getDisabled,
    getFieldProps,
  }
}
