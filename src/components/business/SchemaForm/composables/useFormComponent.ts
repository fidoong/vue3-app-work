/**
 * 表单组件处理
 */

import type { Component } from 'vue'
import type { FormComponentType, FormItemSchema } from '../../../shared/types'
import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from 'ant-design-vue'

/**
 * 组件配置映射
 */
const COMPONENT_MAP: Record<FormComponentType, { component: Component | string, valueProp: string, event: string }> = {
  input: { component: Input, valueProp: 'value', event: 'update:value' },
  textarea: { component: Input.TextArea, valueProp: 'value', event: 'update:value' },
  password: { component: Input.Password, valueProp: 'value', event: 'update:value' },
  number: { component: InputNumber, valueProp: 'value', event: 'update:value' },
  select: { component: Select, valueProp: 'value', event: 'update:value' },
  radio: { component: Radio.Group, valueProp: 'value', event: 'update:value' },
  checkbox: { component: Checkbox.Group, valueProp: 'value', event: 'update:value' },
  date: { component: DatePicker, valueProp: 'value', event: 'update:value' },
  dateRange: { component: DatePicker.RangePicker, valueProp: 'value', event: 'update:value' },
  time: { component: TimePicker, valueProp: 'value', event: 'update:value' },
  timeRange: { component: TimePicker.RangePicker, valueProp: 'value', event: 'update:value' },
  switch: { component: Switch, valueProp: 'checked', event: 'update:checked' },
  slider: { component: Slider, valueProp: 'value', event: 'update:value' },
  rate: { component: Rate, valueProp: 'value', event: 'update:value' },
  upload: { component: Upload, valueProp: 'fileList', event: 'update:fileList' },
  cascader: { component: Cascader, valueProp: 'value', event: 'update:value' },
  treeSelect: { component: TreeSelect, valueProp: 'value', event: 'update:value' },
  custom: { component: '', valueProp: 'value', event: 'update:value' },
}

export interface UseFormComponentReturn {
  /** 获取组件 */
  getComponent: (schema: FormItemSchema) => Component | string | undefined
  /** 获取组件属性 */
  getComponentProps: (schema: FormItemSchema, fieldProps: Record<string, any>) => Record<string, any>
  /** 获取组件事件 */
  getComponentEvents: (schema: FormItemSchema, onChange: (field: string, value: any) => void) => Record<string, any>
}

/**
 * 表单组件处理
 */
export function useFormComponent(
  formData: Ref<Record<string, any>>,
): UseFormComponentReturn {
  /**
   * 获取组件
   */
  function getComponent(schema: FormItemSchema): Component | string | undefined {
    if (schema.component) {
      return schema.component
    }

    if (schema.type) {
      const config = COMPONENT_MAP[schema.type]
      return config?.component
    }

    return undefined
  }

  /**
   * 获取组件属性
   */
  function getComponentProps(
    schema: FormItemSchema,
    fieldProps: Record<string, any>,
  ): Record<string, any> {
    const config = schema.type ? COMPONENT_MAP[schema.type] : null
    const valueProp = config?.valueProp || 'value'

    return {
      [valueProp]: formData.value[schema.field],
      ...fieldProps,
    }
  }

  /**
   * 获取组件事件
   */
  function getComponentEvents(
    schema: FormItemSchema,
    onChange: (field: string, value: any) => void,
  ): Record<string, any> {
    const config = schema.type ? COMPONENT_MAP[schema.type] : null
    const event = config?.event || 'update:value'

    const events: Record<string, any> = {
      [event]: (value: any) => {
        formData.value[schema.field] = value
        onChange(schema.field, value)
      },
    }

    // 合并自定义事件
    if (schema.on) {
      Object.assign(events, schema.on)
    }

    return events
  }

  return {
    getComponent,
    getComponentProps,
    getComponentEvents,
  }
}
