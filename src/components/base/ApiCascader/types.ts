import type { CascaderProps } from 'ant-design-vue'

export interface ApiCascaderResponse<T = any> {
  data: T[]
  total?: number
}

export type ApiCascaderFn<T = any> = (params?: Record<string, any>) => Promise<ApiCascaderResponse<T> | T[]>

export interface CascaderOptionConfig {
  valueField?: string
  labelField?: string
  childrenField?: string
  disabledField?: string
}

/**
 * ApiCascader 自定义 Props
 */
export interface ApiCascaderCustomProps {
  api: ApiCascaderFn
  params?: Record<string, any>
  optionConfig?: CascaderOptionConfig
  immediate?: boolean
  transform?: (data: any[]) => any[]
  reloadOnParamsChange?: boolean
}

/**
 * ApiCascader 事件处理器 Props
 */
export interface ApiCascaderEventProps {
  /** 数据加载成功事件 */
  onLoaded?: (data: any[]) => void
  /** 数据加载失败事件 */
  onError?: (error: Error) => void
}

/**
 * ApiCascader Props
 * 排除与自定义 props 冲突的原生 props (loading, options)
 */
export interface ApiCascaderProps extends Omit<Partial<CascaderProps>, 'loading' | 'options'>, ApiCascaderCustomProps, ApiCascaderEventProps {}

/**
 * ApiCascader 自定义事件
 */
export interface ApiCascaderCustomEmits {
  /** v-model 值更新事件 */
  (e: 'update:value', value: any): void
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * ApiCascader Emits
 *
 * 继承原生 Cascader 的所有事件，并添加自定义事件
 */
export interface ApiCascaderEmits extends ApiCascaderCustomEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, selectedOptions: any): void
  /** 失去焦点事件 */
  (e: 'blur'): void
  /** 获得焦点事件 */
  (e: 'focus'): void
  /** 弹出层显示/隐藏事件 */
  (e: 'popupVisibleChange', visible: boolean): void
}
