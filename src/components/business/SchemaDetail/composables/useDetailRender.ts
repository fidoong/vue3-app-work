/**
 * 详情渲染逻辑
 */

import type { VNode } from 'vue'
import type { DetailItemSchema } from '../types'

/**
 * 获取字段值
 */
export function getFieldValue(data: Record<string, any>, path: string): any {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  return keys.reduce((acc, key) => acc?.[key], data)
}

/**
 * 格式化显示值
 */
export function formatDisplayValue(
  item: DetailItemSchema,
  value: any,
  data: Record<string, any>,
): string | number | VNode {
  // 自定义格式化
  if (item.formatter) {
    return item.formatter(value, data)
  }

  // 空值处理
  if (value === null || value === undefined || value === '') {
    return item.defaultValue ?? '-'
  }

  return value
}

/**
 * 判断字段是否隐藏
 */
export function isFieldHidden(
  item: DetailItemSchema,
  data: Record<string, any>,
): boolean {
  if (typeof item.hidden === 'function') {
    return item.hidden(data)
  }
  return item.hidden ?? false
}

/**
 * 计算字段占据的列数
 */
export function getItemSpan(item: DetailItemSchema): number {
  return item.span ?? 1
}
