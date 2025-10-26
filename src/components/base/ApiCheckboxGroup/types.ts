import type { CheckboxGroupProps } from 'ant-design-vue'

export interface ApiCheckboxGroupResponse<T = any> {
  data: T[]
  total?: number
}

export type ApiCheckboxGroupFn<T = any> = (params?: Record<string, any>) => Promise<ApiCheckboxGroupResponse<T> | T[]>

export interface CheckboxOptionConfig {
  valueField?: string
  labelField?: string
  disabledField?: string
}

/**
 * ApiCheckboxGroup 自定义 Props
 */
export interface ApiCheckboxGroupCustomProps {
  api: ApiCheckboxGroupFn
  params?: Record<string, any>
  optionConfig?: CheckboxOptionConfig
  immediate?: boolean
  transform?: (data: any[]) => any[]
  reloadOnParamsChange?: boolean
}

/**
 * ApiCheckboxGroup 事件处理器 Props
 */
export interface ApiCheckboxGroupEventProps {
  /** 数据加载成功事件 */
  onLoaded?: (data: any[]) => void
  /** 数据加载失败事件 */
  onError?: (error: Error) => void
}

/**
 * ApiCheckboxGroup Props
 * 排除与自定义 props 冲突的原生 props (options)
 */
export interface ApiCheckboxGroupProps extends Omit<Partial<CheckboxGroupProps>, 'options'>, ApiCheckboxGroupCustomProps, ApiCheckboxGroupEventProps {}

/**
 * ApiCheckboxGroup 自定义事件
 */
export interface ApiCheckboxGroupCustomEmits {
  /** v-model 值更新事件 */
  (e: 'update:value', value: any[]): void
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * ApiCheckboxGroup Emits
 *
 * 继承原生 CheckboxGroup 的所有事件，并添加自定义事件
 */
export interface ApiCheckboxGroupEmits extends ApiCheckboxGroupCustomEmits {
  /** 选择变化事件 */
  (e: 'change', checkedValue: any[]): void
}
