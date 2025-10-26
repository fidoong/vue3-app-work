/**
 * ApiTreeSelect 类型定义
 */

import type { TreeSelectProps } from 'ant-design-vue'

/**
 * API 响应数据格式
 */
export interface ApiTreeSelectResponse<T = any> {
  /** 数据列表 */
  data: T[]
  /** 总条数（可选） */
  total?: number
}

/**
 * API 函数类型
 */
export type ApiTreeSelectFn<T = any> = (params?: Record<string, any>) => Promise<ApiTreeSelectResponse<T> | T[]>

/**
 * 树节点配置
 */
export interface TreeNodeConfig {
  /** 节点值字段名 */
  valueField?: string
  /** 节点标题字段名 */
  titleField?: string
  /** 子节点字段名 */
  childrenField?: string
  /** 禁用字段名 */
  disabledField?: string
  /** 是否叶子节点字段名 */
  isLeafField?: string
}

/**
 * ApiTreeSelect 自定义 Props
 */
export interface ApiTreeSelectCustomProps {
  /** API 函数 */
  api: ApiTreeSelectFn
  /** API 请求参数 */
  params?: Record<string, any>
  /** 树节点配置 */
  treeNodeConfig?: TreeNodeConfig
  /** 是否立即加载 */
  immediate?: boolean
  /** 自定义数据转换函数 */
  transform?: (data: any[]) => any[]
  /** 是否在参数变化时重新加载 */
  reloadOnParamsChange?: boolean
}

/**
 * ApiTreeSelect 事件处理器 Props
 */
export interface ApiTreeSelectEventProps {
  /** 数据加载成功事件 */
  onLoaded?: (data: any[]) => void
  /** 数据加载失败事件 */
  onError?: (error: Error) => void
}

/**
 * ApiTreeSelect Props
 * 排除与自定义 props 冲突的原生 props (loading, treeData)
 */
export interface ApiTreeSelectProps extends Omit<Partial<TreeSelectProps>, 'loading' | 'treeData'>, ApiTreeSelectCustomProps, ApiTreeSelectEventProps {}

/**
 * ApiTreeSelect 自定义事件
 */
export interface ApiTreeSelectCustomEmits {
  /** v-model 值更新事件 */
  (e: 'update:value', value: any): void
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * ApiTreeSelect Emits
 *
 * 继承原生 TreeSelect 的所有事件，并添加自定义事件
 */
export interface ApiTreeSelectEmits extends ApiTreeSelectCustomEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, label: any, extra: any): void
  /** 失去焦点事件 */
  (e: 'blur'): void
  /** 获得焦点事件 */
  (e: 'focus'): void
  /** 搜索事件 */
  (e: 'search', value: string): void
  /** 选中选项事件 */
  (e: 'select', value: any, node: any, extra: any): void
  /** 树节点展开事件 */
  (e: 'treeExpand', expandedKeys: any[]): void
  /** 下拉框显示/隐藏事件 */
  (e: 'dropdownVisibleChange', open: boolean): void
}
