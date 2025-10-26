<script setup lang="ts">
import type { SearchFormEmits, SearchFormProps } from './types'
import { SchemaForm } from '../SchemaForm'
import {
  useSearchActions,
  useSearchCollapse,
  useSearchSchema,
} from './composables'

const props = withDefaults(defineProps<SearchFormProps>(), {
  layout: 'horizontal',
  labelCol: () => ({ span: 6 }),
  wrapperCol: () => ({ span: 18 }),
  defaultExpanded: false,
  collapsedRows: 1,
  loading: false,
  actionPosition: 'inline',
})

const emit = defineEmits<SearchFormEmits>()

const formRef = ref()
const formData = ref<Record<string, any>>({})
const schemasRef = toRef(props, 'schemas')

// 展开/收起功能
const {
  expanded,
  showExpandButton,
  displaySchemas,
  toggleExpand,
} = useSearchCollapse(schemasRef, props.defaultExpanded, props.collapsedRows)

// Schema 处理
const { schemasWithActions } = useSearchSchema(
  displaySchemas,
  schemasRef,
  props.actionPosition,
  props.actionSpan,
)

// 操作处理
const { handleSearch, handleReset } = useSearchActions(formRef, formData, emit)

// 暴露方法
defineExpose({
  getFieldsValue: () => formData.value,
  setFieldsValue: (values: Record<string, any>) => {
    formRef.value?.setFieldsValue(values)
  },
  resetFields: handleReset,
  validate: () => formRef.value?.validate(),
  search: handleSearch,
})
</script>

<template>
  <SchemaForm
    ref="formRef"
    v-model="formData"
    :schemas="schemasWithActions"
    :layout="layout"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- 传递所有自定义插槽 -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <!-- 操作按钮插槽 -->
    <template #searchActions>
      <div class="search-actions">
        <a-space :size="6">
          <a-button
            type="primary"
            :loading="loading"
            @click="handleSearch"
          >
            查询
          </a-button>
          <a-button @click="handleReset">
            重置
          </a-button>
        </a-space>
        <a-button
          v-if="showExpandButton"
          type="link"
          @click="toggleExpand"
        >
          <span
            :class="expanded ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'"
            class="ml-1"
          />
        </a-button>
      </div>
    </template>

    <!-- footer 模式的操作按钮 -->
    <template
      v-if="actionPosition === 'footer'"
      #footer
    >
      <div class="search-actions-footer">
        <a-space :size="8">
          <a-button
            type="primary"
            :loading="loading"
            @click="handleSearch"
          >
            查询
          </a-button>
          <a-button @click="handleReset">
            重置
          </a-button>
          <a-button
            v-if="showExpandButton"
            type="link"
            @click="toggleExpand"
          >
            {{ expanded ? '收起' : '展开' }}
            <span
              :class="expanded ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'"
              class="ml-1"
            />
          </a-button>
        </a-space>
      </div>
    </template>
  </SchemaForm>
</template>

<style scoped>
.search-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 32px;
}

.search-actions-footer {
  display: flex;
  justify-content: end;
}
</style>
