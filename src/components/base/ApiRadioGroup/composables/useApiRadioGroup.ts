import type { ApiRadioGroupProps, RadioOptionConfig } from '../types'

const DEFAULT_OPTION_CONFIG: Required<RadioOptionConfig> = {
  valueField: 'value',
  labelField: 'label',
  disabledField: 'disabled',
}

export function useApiRadioGroup(props: ApiRadioGroupProps, emit: any) {
  const loading = ref(false)
  const options = ref<any[]>([])
  const error = ref<Error | null>(null)

  const optionConfig = computed<Required<RadioOptionConfig>>(() => ({
    ...DEFAULT_OPTION_CONFIG,
    ...props.optionConfig,
  }))

  function transformToOptions(data: any[]): any[] {
    if (!data || !Array.isArray(data))
      return []

    if (props.transform)
      return props.transform(data)

    const { valueField, labelField, disabledField } = optionConfig.value

    return data.map((item) => {
      if (typeof item === 'object' && 'value' in item && 'label' in item) {
        return item
      }

      if (typeof item !== 'object') {
        return {
          value: item,
          label: String(item),
          disabled: false,
        }
      }

      return {
        value: item[valueField],
        label: item[labelField],
        disabled: item[disabledField] || false,
        ...item,
      }
    })
  }

  async function loadData() {
    if (!props.api) {
      console.warn('[ApiRadioGroup] api prop is required')
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
        console.warn('[ApiRadioGroup] Invalid API response format', response)
        data = []
      }

      options.value = transformToOptions(data)
      emit('loaded', data)
    }
    catch (err) {
      error.value = err as Error
      emit('error', err)
      console.error('[ApiRadioGroup] Failed to load data:', err)
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
