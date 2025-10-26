import type { ApiCascaderProps, CascaderOptionConfig } from '../types'

const DEFAULT_OPTION_CONFIG: Required<CascaderOptionConfig> = {
  valueField: 'value',
  labelField: 'label',
  childrenField: 'children',
  disabledField: 'disabled',
}

export function useApiCascader(props: ApiCascaderProps, emit: any) {
  const loading = ref(false)
  const options = ref<any[]>([])
  const error = ref<Error | null>(null)

  const optionConfig = computed<Required<CascaderOptionConfig>>(() => ({
    ...DEFAULT_OPTION_CONFIG,
    ...props.optionConfig,
  }))

  function transformToOptions(data: any[]): any[] {
    if (!data || !Array.isArray(data))
      return []

    if (props.transform)
      return props.transform(data)

    const { valueField, labelField, childrenField, disabledField } = optionConfig.value

    function transformNode(node: any): any {
      if (typeof node === 'object' && 'value' in node && 'label' in node) {
        return node
      }

      const transformed: any = {
        value: node[valueField],
        label: node[labelField],
        disabled: node[disabledField] || false,
        ...node,
      }

      if (node[childrenField] && Array.isArray(node[childrenField])) {
        transformed.children = node[childrenField].map(transformNode)
      }

      return transformed
    }

    return data.map(transformNode)
  }

  async function loadData() {
    if (!props.api) {
      console.warn('[ApiCascader] api prop is required')
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await props.api(props.params)
      let data: any[]

      if (Array.isArray(response)) {
        data = response
      }
      else if (response && typeof response === 'object' && 'data' in response) {
        data = response.data
      }
      else {
        console.warn('[ApiCascader] Invalid API response format', response)
        data = []
      }

      options.value = transformToOptions(data)
      emit('loaded', data)
    }
    catch (err) {
      error.value = err as Error
      emit('error', err)
      console.error('[ApiCascader] Failed to load data:', err)
    }
    finally {
      loading.value = false
    }
  }

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
