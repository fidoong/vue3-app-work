/**
 * ApiSelect 核心逻辑
 */

import type { ApiSelectProps, OptionConfig } from '../types'

/**
 * 默认选项配置
 */
const DEFAULT_OPTION_CONFIG: Required<OptionConfig> = {
  valueField: 'value',
  labelField: 'label',
  disabledField: 'disabled',
}

/**
 * 使用 ApiSelect
 */
export function useApiSelect(
  props: ApiSelectProps,
  emit: any,
) {
  const loading = ref(false)
  const options = ref<any[]>([])
  const error = ref<Error | null>(null)

  /**
   * 获取选项配置
   */
  const optionConfig = computed<Required<OptionConfig>>(() => ({
    ...DEFAULT_OPTION_CONFIG,
    ...props.optionConfig,
  }))

  /**
   * 转换原始数据为选项格式
   */
  function transformToOptions(data: any[]): any[] {
    if (!data || !Array.isArray(data)) {
      return []
    }

    // 如果提供了自定义转换函数，使用它
    if (props.transform) {
      return props.transform(data)
    }

    const { valueField, labelField, disabledField } = optionConfig.value

    // 转换为标准选项格式
    return data.map((item) => {
      // 如果已经是标准格式，直接返回
      if (typeof item === 'object' && 'value' in item && 'label' in item) {
        return item
      }

      // 如果是简单类型，value 和 label 都使用该值
      if (typeof item !== 'object') {
        return {
          value: item,
          label: String(item),
          disabled: false,
        }
      }

      // 根据配置字段转换
      return {
        value: item[valueField],
        label: item[labelField],
        disabled: item[disabledField] || false,
        ...item, // 保留原始数据
      }
    })
  }

  /**
   * 加载数据
   */
  async function loadData() {
    if (!props.api) {
      console.warn('[ApiSelect] api prop is required')
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await props.api(props.params)

      // 处理不同的响应格式
      let data: any[]
      if (Array.isArray(response)) {
        // 直接返回数组
        data = response
      }
      else if (response && typeof response === 'object' && 'data' in response) {
        // 返回 { data: [] } 格式
        data = response.data
      }
      else {
        console.warn('[ApiSelect] Invalid API response format', response)
        data = []
      }

      options.value = transformToOptions(data)
      emit('loaded', data)
    }
    catch (err) {
      error.value = err as Error
      emit('error', err)
      console.error('[ApiSelect] Failed to load data:', err)
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
    options,
    error,
    loadData,
    reload,
  }
}
