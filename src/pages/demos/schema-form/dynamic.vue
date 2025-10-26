<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { DatePicker, Input, InputNumber, message, Radio } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formRef = ref()
const formData = ref({
  userType: 'personal',
})

const schemas = computed<FormItemSchema[]>(() => {
  const baseSchemas: FormItemSchema[] = [
    {
      field: 'userType',
      label: '用户类型',
      component: Radio.Group,
      required: true,
      defaultValue: 'personal',
      componentProps: {
        options: [
          { label: '个人用户', value: 'personal' },
          { label: '企业用户', value: 'company' },
        ],
      },
      colProps: { span: 24 },
    },
    {
      field: 'name',
      label: formData.value.userType === 'personal' ? '姓名' : '企业名称',
      component: Input,
      required: true,
      rules: [{ required: true, message: '请输入' }],
      componentProps: {
        placeholder: formData.value.userType === 'personal' ? '请输入姓名' : '请输入企业名称',
      },
      colProps: { span: 24 },
    },
  ]

  // 个人用户字段
  if (formData.value.userType === 'personal') {
    baseSchemas.push(
      {
        field: 'idCard',
        label: '身份证号',
        component: Input,
        required: true,
        rules: [
          { required: true, message: '请输入身份证号' },
          { pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/i, message: '请输入正确的身份证号' },
        ],
        componentProps: { placeholder: '请输入身份证号' },
        colProps: { span: 24 },
      },
      {
        field: 'birthday',
        label: '出生日期',
        component: DatePicker,
        componentProps: {
          placeholder: '请选择出生日期',
          style: { width: '100%' },
        },
        colProps: { span: 24 },
      },
    )
  }

  // 企业用户字段
  if (formData.value.userType === 'company') {
    baseSchemas.push(
      {
        field: 'creditCode',
        label: '统一社会信用代码',
        component: Input,
        required: true,
        rules: [
          { required: true, message: '请输入统一社会信用代码' },
          { len: 18, message: '统一社会信用代码为 18 位' },
        ],
        componentProps: { placeholder: '请输入统一社会信用代码' },
        colProps: { span: 24 },
      },
      {
        field: 'legalPerson',
        label: '法人代表',
        component: Input,
        required: true,
        rules: [{ required: true, message: '请输入法人代表' }],
        componentProps: { placeholder: '请输入法人代表' },
        colProps: { span: 24 },
      },
      {
        field: 'registeredCapital',
        label: '注册资本（万元）',
        component: InputNumber,
        componentProps: {
          min: 0,
          placeholder: '请输入注册资本',
          style: { width: '100%' },
        },
        colProps: { span: 24 },
      },
    )
  }

  // 通用字段
  baseSchemas.push(
    {
      field: 'phone',
      label: '联系电话',
      component: Input,
      required: true,
      rules: [
        { required: true, message: '请输入联系电话' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
      ],
      componentProps: { placeholder: '请输入联系电话' },
      colProps: { span: 24 },
    },
    {
      field: 'email',
      label: '邮箱',
      component: Input,
      rules: [{ type: 'email', message: '请输入正确的邮箱格式' }],
      componentProps: { placeholder: '请输入邮箱' },
      colProps: { span: 24 },
    },
    {
      field: 'address',
      label: '地址',
      component: Input.TextArea,
      componentProps: {
        placeholder: '请输入地址',
        rows: 3,
      },
      colProps: { span: 24 },
    },
  )

  return baseSchemas
})

function handleSubmit(_values: Record<string, any>) {
  message.success('提交成功！')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="动态表单示例"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="green">
          动态字段
        </a-tag>
      </template>

      <a-alert
        message="根据用户类型动态显示不同的表单字段"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaForm
        ref="formRef"
        v-model="formData"
        :schemas="schemas"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @submit="handleSubmit"
      >
        <template #footer="{ submit, reset }">
          <a-space>
            <a-button
              type="primary"
              @click="submit"
            >
              提交
            </a-button>
            <a-button @click="reset">
              重置
            </a-button>
          </a-space>
        </template>
      </SchemaForm>
    </a-card>

    <a-card
      title="表单数据"
      class="demo-card mt-4"
    >
      <pre>{{ formData }}</pre>
    </a-card>

    <a-card
      title="实现说明"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <ul>
          <li>使用 <code>computed</code> 动态计算 schemas</li>
          <li>根据 <code>formData.userType</code> 的值显示不同字段</li>
          <li>个人用户显示：身份证号、出生日期</li>
          <li>企业用户显示：统一社会信用代码、法人代表、注册资本</li>
          <li>通用字段：联系电话、邮箱、地址</li>
        </ul>
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 24px;
}

.demo-card {
  margin-bottom: 16px;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
</style>
