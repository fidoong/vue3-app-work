/**
 * ApiSelect 类型定义
 */

import type { SelectProps } from 'ant-design-vue'

/**
 * API 响应数据格式
 */
export interface ApiSelectResponse<T = any> {
  /** 数据列表 */
  data: T[]
  /** 总条数（可选） */
  total?: number
}

/**
 * API 函数类型
 */
export type ApiSelectFn<T = any> = (params?: Record<string, any>) => Promise<ApiSelectResponse<T> | T[]>

/**
 * 选项配置
 */
export interface OptionConfig {
  /** 选项值字段名 */
  valueField?: string
  /** 选项标签字段名 */
  labelField?: string
  /** 选项禁用字段名 */
  disabledField?: string
}

/**
 * ApiSelect 自定义 Props
 */
export interface ApiSelectCustomProps {
  /**
   * API 函数
   * @example
   * ```ts
   * async function fetchUsers() {
   *   const res = await fetch('/api/users')
   *   return res.json()
   * }
   * ```
   */
  api: ApiSelectFn
  /**
   * API 请求参数
   * @example { status: 'active', page: 1 }
   */
  params?: Record<string, any>
  /**
   * 选项配置 - 用于映射数据字段
   * @example { valueField: 'id', labelField: 'name' }
   */
  optionConfig?: OptionConfig
  /**
   * 是否立即加载
   * @default true
   */
  immediate?: boolean
  /**
   * 自定义选项转换函数
   * @example (data) => data.map(item => ({ value: item.id, label: item.name }))
   */
  transform?: (data: any[]) => any[]
  /**
   * 是否在参数变化时重新加载
   * @default true
   */
  reloadOnParamsChange?: boolean
}

/**
 * ApiSelect 事件处理器 Props
 */
export interface ApiSelectEventProps {
  /** 数据加载成功事件 */
  onLoaded?: (data: any[]) => void
  /** 数据加载失败事件 */
  onError?: (error: Error) => void
}

/**
 * ApiSelect Props
 *
 * 继承 Ant Design Vue Select 的所有属性（包括事件处理器），并添加自定义属性
 *
 * @example
 * ```vue
 * <ApiSelect
 *   v-model:value="userId"
 *   :api="fetchUsers"
 *   :params="{ status: 'active' }"
 *   :option-config="{ valueField: 'id', labelField: 'name' }"
 *   placeholder="请选择用户"
 *   allow-clear
 *   show-search
 *   @change="handleChange"
 *   @loaded="handleLoaded"
 *   @error="handleError"
 * />
 * ```
 */
export interface ApiSelectProps extends Omit<Partial<SelectProps>, 'loading' | 'options'>, ApiSelectCustomProps, ApiSelectEventProps {}

/**
 * ApiSelect 自定义事件
 */
export interface ApiSelectCustomEmits {
  /** v-model 值更新事件 */
  (e: 'update:value', value: any): void
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * ApiSelect Emits
 *
 * 继承原生 Select 的所有事件，并添加自定义事件
 */
export interface ApiSelectEmits extends ApiSelectCustomEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, option: any): void
  /** 失去焦点事件 */
  (e: 'blur'): void
  /** 获得焦点事件 */
  (e: 'focus'): void
  /** 搜索事件 */
  (e: 'search', value: string): void
  /** 选中选项事件 */
  (e: 'select', value: any, option: any): void
  /** 取消选中事件（多选） */
  (e: 'deselect', value: any, option: any): void
  /** 下拉框显示/隐藏事件 */
  (e: 'dropdownVisibleChange', open: boolean): void
  /** 输入框键盘事件 */
  (e: 'inputKeydown', event: KeyboardEvent): void
  /** 鼠标进入事件 */
  (e: 'mouseenter', event: MouseEvent): void
  /** 鼠标离开事件 */
  (e: 'mouseleave', event: MouseEvent): void
  /** 弹出层滚动事件 */
  (e: 'popupScroll', event: UIEvent): void
}
