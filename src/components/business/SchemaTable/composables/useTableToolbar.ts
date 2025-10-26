/**
 * 表格工具栏处理
 */

import type { Ref, VNode } from 'vue'
import type { ButtonConfig } from '../../../shared/types'
import type { ToolbarConfig } from '../types'
import { resolveDynamicValue } from '../../../shared/utils'

export interface UseTableToolbarReturn {
  /** 渲染工具栏 */
  renderToolbar: () => VNode | null
}

/**
 * 表格工具栏处理
 */
export function useTableToolbar<T = any>(
  toolbar: ToolbarConfig | undefined,
  onRefresh: () => void,
  onReset: () => void,
  loading: Ref<boolean>,
  selectedRows: Ref<T[]>,
): UseTableToolbarReturn {
  /**
   * 渲染按钮
   */
  function renderButton(button: ButtonConfig<T>) {
    const disabled = resolveDynamicValue(button.disabled, selectedRows.value, false)
    const visible = resolveDynamicValue(button.visible, selectedRows.value, true)

    if (!visible) {
      return null
    }

    const props = resolveDynamicValue(button.props, selectedRows.value, {})

    const buttonProps = {
      type: button.type || 'default',
      danger: button.danger,
      disabled,
      loading: loading.value,
      ...props,
    }

    // 如果有确认配置
    if (button.confirm) {
      return h(
        'a-popconfirm',
        {
          title: button.confirm.title || '确认执行此操作？',
          onConfirm: () => button.confirm?.onConfirm?.(selectedRows.value),
        },
        {
          default: () => h(
            'a-button',
            buttonProps,
            {
              default: () => [
                button.icon ? h(button.icon) : null,
                button.text,
              ],
            },
          ),
        },
      )
    }

    // 普通按钮
    return h(
      'a-button',
      {
        ...buttonProps,
        onClick: () => button.onClick?.(selectedRows.value),
      },
      {
        default: () => [
          button.icon ? h(button.icon) : null,
          button.text,
        ],
      },
    )
  }

  /**
   * 渲染工具栏
   */
  function renderToolbar(): VNode | null {
    if (!toolbar) {
      return null
    }

    const leftButtons = toolbar.left || []
    const rightButtons = toolbar.right || []

    // 添加默认按钮
    const defaultRightButtons: ButtonConfig[] = []

    if (toolbar.showRefresh) {
      defaultRightButtons.push({
        text: '刷新',
        type: 'default',
        onClick: onRefresh,
      })
    }

    if (toolbar.showReset) {
      defaultRightButtons.push({
        text: '重置',
        type: 'default',
        onClick: onReset,
      })
    }

    const allRightButtons = [...rightButtons, ...defaultRightButtons]

    return h(
      'div',
      { class: 'schema-table-toolbar' },
      [
        // 左侧按钮
        h(
          'div',
          { class: 'toolbar-left' },
          h(
            'a-space',
            { size: 8 },
            leftButtons.map(button => renderButton(button)).filter(Boolean),
          ),
        ),
        // 右侧按钮
        h(
          'div',
          { class: 'toolbar-right' },
          h(
            'a-space',
            { size: 8 },
            allRightButtons.map(button => renderButton(button)).filter(Boolean),
          ),
        ),
      ],
    )
  }

  return {
    renderToolbar,
  }
}
