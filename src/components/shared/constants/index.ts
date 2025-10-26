/**
 * 常量定义
 */

/**
 * 组件尺寸
 */
export const COMPONENT_SIZES = ['small', 'default', 'large'] as const

/**
 * 表单布局
 */
export const FORM_LAYOUTS = ['horizontal', 'vertical', 'inline'] as const

/**
 * 按钮类型
 */
export const BUTTON_TYPES = ['primary', 'default', 'dashed', 'link', 'text'] as const

/**
 * 对齐方式
 */
export const ALIGN_TYPES = ['left', 'center', 'right'] as const

/**
 * 默认分页配置
 */
export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 10,
  showTotal: (total: number) => `共 ${total} 条`,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
} as const

/**
 * 默认表单列配置
 */
export const DEFAULT_FORM_COL = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
} as const

/**
 * 动画持续时间（毫秒）
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

/**
 * Z-Index 层级
 */
export const Z_INDEX = {
  base: 1000,
  modal: 1000,
  drawer: 1000,
  message: 1010,
  notification: 1010,
  tooltip: 1060,
} as const
