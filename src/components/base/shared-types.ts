/**
 * 共享的类型定义
 * 用于所有 API 驱动组件
 */

/**
 * 通用的表单控件事件
 */
export interface CommonFormEmits {
  /** 失去焦点事件 */
  (e: 'blur'): void
  /** 获得焦点事件 */
  (e: 'focus'): void
}

/**
 * 通用的 API 组件自定义事件
 */
export interface CommonApiEmits {
  /** 数据加载成功事件 */
  (e: 'loaded', data: any[]): void
  /** 数据加载失败事件 */
  (e: 'error', error: Error): void
}

/**
 * Select 原生事件
 */
export interface SelectNativeEmits extends CommonFormEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, option: any): void
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

/**
 * TreeSelect 原生事件
 */
export interface TreeSelectNativeEmits extends CommonFormEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, label: any, extra: any): void
  /** 搜索事件 */
  (e: 'search', value: string): void
  /** 选中选项事件 */
  (e: 'select', value: any, node: any, extra: any): void
  /** 树节点展开事件 */
  (e: 'treeExpand', expandedKeys: any[]): void
  /** 下拉框显示/隐藏事件 */
  (e: 'dropdownVisibleChange', open: boolean): void
}

/**
 * Cascader 原生事件
 */
export interface CascaderNativeEmits extends CommonFormEmits {
  /** 选择变化事件 */
  (e: 'change', value: any, selectedOptions: any): void
  /** 弹出层显示/隐藏事件 */
  (e: 'popupVisibleChange', visible: boolean): void
}

/**
 * RadioGroup 原生事件
 */
export interface RadioGroupNativeEmits {
  /** 选择变化事件 */
  (e: 'change', event: any): void
}

/**
 * CheckboxGroup 原生事件
 */
export interface CheckboxGroupNativeEmits {
  /** 选择变化事件 */
  (e: 'change', checkedValue: any[]): void
}
