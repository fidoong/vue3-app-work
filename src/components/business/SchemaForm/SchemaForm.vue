<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import type { SchemaFormEmits, SchemaFormProps } from './types'
import {
  useFormComponent,
  useFormSchema,
  useFormState,
  useFormValidation,
} from './composables'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  modelValue: () => ({}),
  labelCol: () => ({ span: 6 }),
  wrapperCol: () => ({ span: 18 }),
  layout: 'horizontal',
  disabled: false,
  loading: false,
  name: () => `form_${Date.now().toString(36)}`,
})

const emit = defineEmits<SchemaFormEmits>()

const formRef = ref<FormInstance>()
const schemasRef = toRef(props, 'schemas')
const modelValueRef = toRef(props, 'modelValue')

// 表单状态
const {
  formData,
  initFormData,
  setFieldValue,
  setFieldsValue,
  getFieldValue,
  getFormData,
  resetToInitial,
} = useFormState(schemasRef, modelValueRef)

// Schema 处理
const {
  visibleSchemas,
  getColProps,
  getDisabled,
  getFieldProps,
} = useFormSchema(schemasRef, formData)

// 组件处理
const {
  getComponent,
} = useFormComponent(formData)

// 表单验证
const {
  isSubmitting,
  handleSubmit,
  handleReset: baseHandleReset,
  validate,
  validateFields,
  clearValidate,
  handleChange,
} = useFormValidation(formRef, formData, emit)

/**
 * 重置表单
 */
function handleReset() {
  baseHandleReset(resetToInitial)
}

/**
 * 获取实际组件
 */
function getActualComponent(schema: any) {
  return getComponent(schema) || schema.component
}

/**
 * 获取组件的值属性名称
 */
function getValuePropName(schema: any): string {
  const propMap: Record<string, string> = {
    switch: 'checked',
    upload: 'fileList',
  }
  return propMap[schema.type] || 'value'
}

/**
 * 获取组件绑定（包括值和事件）
 */
function getComponentBindings(schema: any) {
  const valueProp = getValuePropName(schema)
  const updateEvent = `update:${valueProp}`

  return {
    props: {
      [valueProp]: formData.value[schema.field],
      disabled: getDisabled(schema, props.disabled, props.loading),
      placeholder: schema.placeholder,
      ...getFieldProps(schema),
    },
    events: {
      [updateEvent]: (val: any) => {
        formData.value[schema.field] = val
        handleChange(schema.field, val)
      },
    },
  }
}

/**
 * 渲染自定义内容
 */
function renderCustom(schema: any) {
  if (!schema.render) {
    return null
  }

  return () => schema.render({
    formData: formData.value,
    field: schema.field,
    value: formData.value[schema.field],
    setValue: (val: any) => setFieldValue(schema.field, val),
    disabled: getDisabled(schema, props.disabled, props.loading),
  })
}

// 暴露方法
defineExpose({
  validate,
  validateFields,
  clearValidate,
  resetFields: handleReset,
  setFieldValue,
  setFieldsValue,
  getFieldValue,
  getFormData,
  isSubmitting,
  formRef,
})

// 初始化
onMounted(() => {
  initFormData()
})
</script>

<template>
  <a-form
    ref="formRef"
    :model="formData"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :layout="layout"
    :disabled="disabled || loading"
    :name="name"
    @finish="handleSubmit"
  >
    <a-row :gutter="16">
      <a-col
        v-for="schema in visibleSchemas"
        :key="schema.field"
        v-bind="getColProps(schema)"
      >
        <a-form-item
          :name="schema.field"
          :label="schema.label"
          :rules="schema.rules"
          :help="schema.help"
          :extra="schema.extra"
          :label-align="schema.labelAlign"
          :required="schema.required"
          :colon="schema.colon"
        >
          <!-- 自定义插槽 -->
          <slot
            v-if="schema.slot"
            :name="schema.slot"
            :form-data="formData"
            :field="schema.field"
            :value="formData[schema.field]"
            :set-value="(val: any) => setFieldValue(schema.field, val)"
            :disabled="getDisabled(schema, disabled, loading)"
          />

          <!-- 自定义渲染函数 -->
          <component
            :is="renderCustom(schema)"
            v-else-if="schema.render"
          />

          <!-- 表单组件 -->
          <component
            :is="getActualComponent(schema)"
            v-else-if="schema.component || schema.type"
            v-bind="getComponentBindings(schema).props"
            v-on="getComponentBindings(schema).events"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- 底部操作区 -->
    <a-form-item
      v-if="$slots.footer"
      :wrapper-col="{ offset: labelCol?.span || 0 }"
    >
      <slot
        name="footer"
        :submit="handleSubmit"
        :reset="handleReset"
        :validate="validate"
        :is-submitting="isSubmitting"
      />
    </a-form-item>
  </a-form>
</template>
