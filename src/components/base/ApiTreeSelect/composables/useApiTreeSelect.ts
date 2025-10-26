/**
 * ApiTreeSelect 核心逻辑
 */

import type { ApiTreeSelectProps, TreeNodeConfig } from '../types'

/**
 * 默认树节点配置
 */
const DEFAULT_TREE_NODE_CONFIG: Required<TreeNodeConfig> = {
  valueField: 'value',
  titleField: 'title',
  childrenField: 'children',
  disabledField: 'disabled',
  isLeafField: 'isLeaf',
}

/**
 * 使用 ApiTreeSelect
 */
export function useApiTreeSelect(
  props: ApiTreeSelectProps,
  emit: any,
) {
  const loading = ref(false)
  const treeData = ref<any[]>([])
  const error = ref<Error | null>(null)

  /**
   * 获取树节点配置
   */
  const treeNodeConfig = computed<Required<TreeNodeConfig>>(() => ({
    ...DEFAULT_TREE_NODE_CONFIG,
    ...props.treeNodeConfig,
  }))

  /**
   * 转换原始数据为树节点格式
   */
  function transformToTreeData(data: any[]): any[] {
    if (!data || !Array.isArray(data)) {
      return []
    }

    // 如果提供了自定义转换函数，使用它
    if (props.transform) {
      return props.transform(data)
    }

    const { valueField, titleField, childrenField, disabledField, isLeafField }
      = treeNodeConfig.value

    // 递归转换树节点
    function transformNode(node: any): any {
      // 如果已经是标准格式，直接返回
      if (typeof node === 'object' && 'value' in node && 'title' in node) {
        return node
      }

      const transformed: any = {
        value: node[valueField],
        title: node[titleField],
        disabled: node[disabledField] || false,
        isLeaf: node[isLeafField],
        ...node, // 保留原始数据
      }

      // 递归处理子节点
      if (node[childrenField] && Array.isArray(node[childrenField])) {
        transformed.children = node[childrenField].map(transformNode)
      }

      return transformed
    }

    return data.map(transformNode)
  }

  /**
   * 加载数据
   */
  async function loadData() {
    if (!props.api) {
      console.warn('[ApiTreeSelect] api prop is required')
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await props.api(props.params)

      // 处理不同的响应格式
      let data: any[]
      if (Array.isArray(response)) {
        data = response
      }
      else if (response && typeof response === 'object' && 'data' in response) {
        data = response.data
      }
      else {
        console.warn('[ApiTreeSelect] Invalid API response format', response)
        data = []
      }

      treeData.value = transformToTreeData(data)
      emit('loaded', data)
    }
    catch (err) {
      error.value = err as Error
      emit('error', err)
      console.error('[ApiTreeSelect] Failed to load data:', err)
    }
    finally {
      loading.value = false
    }
  }

  /**
   * 重新加载数据
   */
  function reload() {
    return loadData()
  }

  return {
    loading,
    treeData,
    error,
    loadData,
    reload,
  }
}
