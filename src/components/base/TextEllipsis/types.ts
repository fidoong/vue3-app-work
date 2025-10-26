/**
 * TextEllipsis 组件类型定义
 */

import type { TooltipProps } from 'ant-design-vue'

export interface TextEllipsisProps {
  /**
   * 文本内容
   */
  content?: string
  /**
   * 最大行数，默认 1
   */
  lines?: number
  /**
   * 是否启用 tooltip，默认 true
   */
  tooltip?: boolean
  /**
   * tooltip 的位置
   */
  placement?: TooltipProps['placement']
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 自定义样式
   */
  style?: Record<string, any>
  /**
   * tooltip 的最大宽度
   */
  tooltipMaxWidth?: number | string
}

export interface TextEllipsisInstance {
  /**
   * 检查是否超出
   */
  checkOverflow: () => boolean
  /**
   * 获取文本内容
   */
  getContent: () => string
}
