/**
 * 表格操作列处理
 */

import type { ButtonConfig, FixedType } from '../../../shared/types'
import type { TableColumnSchema } from '../types'
import { resolveDynamicValue } from '../../../shared/utils'

export interface UseTableActionsReturn<T = any> {
  /** 获取操作列配置 */
  getActionsColumn: () => TableColumnSchema<T> | null
}

/**
 * 表格操作列处理
 */
export function useTableActions<T = any>(
  actions?: ButtonConfig<T>[],
  width?: number,
  title?: string,
  fixed?: FixedType,
): UseTableActionsReturn<T> {
  /**
   * 获取操作列配置
   */
  function getActionsColumn(): TableColumnSchema<T> | null {
    if (!actions || actions.length === 0) {
      return null
    }

    return {
      key: 'actions',
      title: title || '操作',
      width: width || 150,
      fixed: fixed || 'right',
      align: 'center',
      render: ({ record, index }) => {
        // 过滤可见的按钮
        const visibleActions = actions.filter((action) => {
          const visible = resolveDynamicValue(action.visible, record, true)
          return visible
        })

        return h(
          'a-space',
          { size: 8 },
          visibleActions.map((action) => {
            const disabled = resolveDynamicValue(action.disabled, record, false)
            const props = resolveDynamicValue(action.props, record, {})

            const buttonProps = {
              type: action.type || 'link',
              danger: action.danger,
              disabled,
              size: 'small',
              ...props,
            }

            // 如果有确认配置
            if (action.confirm) {
              return h(
                'a-popconfirm',
                {
                  title: action.confirm.title || '确认执行此操作？',
                  onConfirm: () => action.confirm?.onConfirm?.(record, index),
                },
                {
                  default: () => h(
                    'a-button',
                    buttonProps,
                    {
                      default: () => [
                        action.icon ? h(action.icon) : null,
                        action.text,
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
                onClick: () => action.onClick?.(record, index),
              },
              {
                default: () => [
                  action.icon ? h(action.icon) : null,
                  action.text,
                ],
              },
            )
          }),
        )
      },
    }
  }

  return {
    getActionsColumn,
  }
}
