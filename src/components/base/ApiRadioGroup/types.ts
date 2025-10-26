import type { RadioGroupProps } from 'ant-design-vue'

export interface ApiRadioGroupResponse<T = any> {
  data: T[]
  total?: number
}

export type ApiRadioGroupFn<T = any> = (params?: Record<string, any>) => Promise<ApiRadioGroupResponse<T> | T[]>

export interface RadioOptionConfig {
  valueField?: string
  labelField?: string
  disabledField?: string
}

/**
 * ApiRadioGroup 自定义 Props
 */
export interface ApiRadioGroupCustomProps {
  api: ApiRadioGroupFn
  params?: Record<string, any>
  optionConfig?: RadioOptionConfig
  immediate?: boolean
  transform?: (data: any[]) => any[]
  reloadOnParamsChange?: boolean
  optionType?: 'default' | 'button'
}

/**
 * ApiRadioGroup 事件处理器 Props
 */
export interface ApiRadioGroupEventProps {
  /** 数据加载成功事件 */
  onLoaded?: (data: any[]) => void
  /** 数据加载失败事件 */
  onError?: (error: Error) => void
}

/**
 * ApiRadioGroup Props
 * 排除与自定义 props 冲突的原生 props (options)
 */
export interface ApiRadioGroupProps extends Omit<Partial<RadioGroupProps>, 'options'>, ApiRadioGroupCustomProps, ApiRadioGroupEventProps {}

/**
 * ApiRadioGroup 自定义事件
 */
export interface ApiRadioGroupCustomEmits {
  /** v-model 值更新事件 */
  (e: 'update:value', value: any): void
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * ApiRadioGroup Emits
 *
 * 继承原生 RadioGroup 的所有事件，并添加自定义事件
 */
export interface ApiRadioGroupEmits extends ApiRadioGroupCustomEmits {
  /** 选择变化事件 */
  (e: 'change', event: any): void
}
