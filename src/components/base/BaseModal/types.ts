/**
 * BaseModal 类型定义
 */

import type { Component, VNode } from 'vue'

/**
 * 弹窗关闭类型
 */
export type ModalCloseType = 'confirm' | 'cancel' | 'close'

/**
 * 弹窗结果
 */
export interface ModalResult<T = any> {
  /** 返回数据 */
  data?: T
  /** 关闭类型 */
  type: ModalCloseType
  /** 操作类型 */
  action: string
}

/**
 * 弹窗配置
 */
export interface ModalOptions<T = any> {
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: number | string
  /** 高度 */
  height?: number | string
  /** 最小宽度 */
  minWidth?: number | string
  /** 最小高度 */
  minHeight?: number | string
  /** 是否显示遮罩 */
  mask?: boolean
  /** 是否可以点击遮罩关闭 */
  maskClosable?: boolean
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 是否显示底部按钮 */
  footer?: boolean | VNode | null
  /** 确认按钮文字 */
  okText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮类型 */
  okType?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  /** 确认按钮是否加载中 */
  confirmLoading?: boolean
  /** 层级 */
  zIndex?: number
  /** 传递给组件的属性 */
  props?: T
  /** 弹窗类名 */
  wrapClassName?: string
  /** 弹窗样式 */
  bodyStyle?: Record<string, any>
  /** 是否居中显示 */
  centered?: boolean
  /** 是否可拖拽 */
  draggable?: boolean
  /** 是否全屏 */
  fullscreen?: boolean
  /** 销毁时是否卸载子元素 */
  destroyOnClose?: boolean
  /** 是否支持键盘 ESC 关闭 */
  keyboard?: boolean
  /** 其他自定义属性 */
  [key: string]: any
}

/**
 * 弹窗实例
 */
export interface ModalInstance<T = any, R = any> {
  /** 唯一标识 */
  id: string
  /** 组件 */
  component: Component
  /** 配置 */
  options: ModalOptions<T>
  /** 是否可见 */
  visible: boolean
  /** 确认回调 */
  resolve: (result?: R) => void
  /** 取消回调 */
  reject: (reason?: any) => void
  /** 父弹窗 ID */
  parentId?: string
  /** 子弹窗 ID 列表 */
  children: string[]
  /** 层级 */
  level: number
}

/**
 * 弹窗上下文
 */
export interface ModalContext<T = any> {
  /** 弹窗 ID */
  id: string
  /** 传入的属性 */
  props?: T
  /** 关闭弹窗 */
  close: (result?: any, type?: ModalCloseType) => void
  /** 确认 */
  confirm: (result?: any) => void
  /** 取消 */
  cancel: (result?: any) => void
}
