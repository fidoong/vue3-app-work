/**
 * 选择管理
 */

import type { Ref } from 'vue'

export interface UseSelectionOptions<T = any> {
  /** 行键字段 */
  rowKey?: string | ((record: T) => string | number)
  /** 初始选中的键 */
  initialSelectedKeys?: (string | number)[]
  /** 选择变化回调 */
  onChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void
}

export interface UseSelectionReturn<T = any> {
  /** 选中的键 */
  selectedKeys: Ref<(string | number)[]>
  /** 选中的行 */
  selectedRows: Ref<T[]>
  /** 行选择配置 */
  rowSelection: Ref<any>
  /** 选择行 */
  select: (keys: (string | number)[], rows: T[]) => void
  /** 选择单行 */
  selectOne: (key: string | number, row: T) => void
  /** 取消选择 */
  deselect: (keys: (string | number)[]) => void
  /** 取消选择单行 */
  deselectOne: (key: string | number) => void
  /** 切换选择 */
  toggle: (key: string | number, row: T) => void
  /** 全选 */
  selectAll: (rows: T[]) => void
  /** 清空选择 */
  clear: () => void
  /** 是否选中 */
  isSelected: (key: string | number) => boolean
  /** 获取选中的键 */
  getSelectedKeys: () => (string | number)[]
  /** 获取选中的行 */
  getSelectedRows: () => T[]
}

/**
 * 选择管理 Hook
 */
export function useSelection<T = any>(
  options: UseSelectionOptions<T> = {},
): UseSelectionReturn<T> {
  const {
    rowKey = 'id',
    initialSelectedKeys = [],
    onChange,
  } = options

  const selectedKeys = ref<(string | number)[]>(initialSelectedKeys)
  const selectedRows = ref([] as T[])

  /**
   * 获取行键
   */
  function getRowKey(row: T): string | number {
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    return (row as any)[rowKey]
  }

  /**
   * 行选择配置
   */
  const rowSelection = computed(() => ({
    selectedRowKeys: selectedKeys.value,
    onChange: (keys: (string | number)[], rows: T[]) => {
      selectedKeys.value = keys
      selectedRows.value = rows
      onChange?.(keys, rows)
    },
  }))

  /**
   * 选择行
   */
  function select(keys: (string | number)[], rows: T[]) {
    selectedKeys.value = [...new Set([...selectedKeys.value, ...keys])]
    selectedRows.value = [...selectedRows.value, ...rows] as T[]
    onChange?.(selectedKeys.value, selectedRows.value as T[])
  }

  /**
   * 选择单行
   */
  function selectOne(key: string | number, row: T) {
    if (!selectedKeys.value.includes(key)) {
      selectedKeys.value.push(key)
      ; (selectedRows.value as T[]).push(row)
      onChange?.(selectedKeys.value, selectedRows.value as T[])
    }
  }

  /**
   * 取消选择
   */
  function deselect(keys: (string | number)[]) {
    selectedKeys.value = selectedKeys.value.filter(k => !keys.includes(k))
    selectedRows.value = (selectedRows.value as T[]).filter(
      row => !keys.includes(getRowKey(row as T)),
    ) as T[]
    onChange?.(selectedKeys.value, selectedRows.value as T[])
  }

  /**
   * 取消选择单行
   */
  function deselectOne(key: string | number) {
    deselect([key])
  }

  /**
   * 切换选择
   */
  function toggle(key: string | number, row: T) {
    if (isSelected(key)) {
      deselectOne(key)
    }
    else {
      selectOne(key, row)
    }
  }

  /**
   * 全选
   */
  function selectAll(rows: T[]) {
    selectedKeys.value = rows.map(row => getRowKey(row))
    selectedRows.value = [...rows] as T[]
    onChange?.(selectedKeys.value, selectedRows.value as T[])
  }

  /**
   * 清空选择
   */
  function clear() {
    selectedKeys.value = []
    selectedRows.value = []
    onChange?.([], [])
  }

  /**
   * 是否选中
   */
  function isSelected(key: string | number): boolean {
    return selectedKeys.value.includes(key)
  }

  /**
   * 获取选中的键
   */
  function getSelectedKeys(): (string | number)[] {
    return [...selectedKeys.value]
  }

  /**
   * 获取选中的行
   */
  function getSelectedRows(): T[] {
    return [...selectedRows.value] as T[]
  }

  return {
    selectedKeys,
    selectedRows: selectedRows as Ref<T[]>,
    rowSelection,
    select,
    selectOne,
    deselect,
    deselectOne,
    toggle,
    selectAll,
    clear,
    isSelected,
    getSelectedKeys,
    getSelectedRows,
  }
}
