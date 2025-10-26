/**
 * 详情布局逻辑
 */

import type { CSSProperties, Ref } from 'vue'

export interface UseDetailLayoutOptions {
  /** 列数 */
  column?: Ref<number>
  /** 标签宽度 */
  labelWidth?: Ref<number | string | undefined>
}

export interface UseDetailLayoutReturn {
  /** 网格样式 */
  gridStyle: ComputedRef<CSSProperties>
  /** 标签宽度样式 */
  getLabelWidthStyle: (itemLabelWidth?: number | string) => string | undefined
}

/**
 * 详情布局逻辑
 */
export function useDetailLayout(options: UseDetailLayoutOptions): UseDetailLayoutReturn {
  const { column = ref(3), labelWidth = ref(undefined) } = options

  /**
   * 网格样式
   */
  const gridStyle = computed<CSSProperties>(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${column.value}, 1fr)`,
    gap: '0 16px',
  }))

  /**
   * 获取标签宽度样式
   */
  function getLabelWidthStyle(itemLabelWidth?: number | string): string | undefined {
    const width = itemLabelWidth ?? labelWidth.value
    if (!width)
      return undefined
    return typeof width === 'number' ? `${width}px` : width
  }

  return {
    gridStyle,
    getLabelWidthStyle,
  }
}
