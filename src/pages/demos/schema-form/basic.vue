<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Input, InputNumber, message, Radio } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formRef = ref()
const formData = ref({})

const schemas: FormItemSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: Input,
    required: true,
    rules: [
      { required: true, message: '请输入用户名' },
      { min: 3, max: 20, message: '用户名长度为 3-20 个字符' },
    ],
    componentProps: {
      placeholder: '请输入用户名',
    },
    colProps: { span: 24 },
  },
  {
    field: 'email',
    label: '邮箱',
    component: Input,
    required: true,
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱格式' },
    ],
    componentProps: {
      placeholder: '请输入邮箱',
    },
    colProps: { span: 24 },
  },
  {
    field: 'password',
    label: '密码',
    component: Input.Password,
    required: true,
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码至少 6 个字符' },
    ],
    componentProps: {
      placeholder: '请输入密码',
    },
    colProps: { span: 24 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: Input,
    rules: [
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
    ],
    componentProps: {
      placeholder: '请输入手机号',
    },
    colProps: { span: 24 },
  },
  {
    field: 'gender',
    label: '性别',
    component: Radio.Group,
    defaultValue: 'male',
    componentProps: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'age',
    label: '年龄',
    component: InputNumber,
    componentProps: {
      min: 1,
      max: 150,
      placeholder: '请输入年龄',
    },
    colProps: { span: 24 },
  },
  {
    field: 'bio',
    label: '个人简介',
    component: Input.TextArea,
    componentProps: {
      placeholder: '请输入个人简介',
      rows: 4,
      maxlength: 200,
      showCount: true,
    },
    colProps: { span: 24 },
  },
]

function handleSubmit(_values: Record<string, any>) {
  message.success('提交成功！')
}

function handleReset() {
  message.info('表单已重置')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="基础表单示例"
      class="demo-card"
    >
      <template #extra>
        <a-space>
          <a-tag color="blue">
            基础用法
          </a-tag>
        </a-space>
      </template>

      <SchemaForm
        ref="formRef"
        v-model="formData"
        :schemas="schemas"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #footer="{ submit, reset, isSubmitting }">
          <a-space>
            <a-button
              type="primary"
              :loading="isSubmitting"
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
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>const schemas: FormItemSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    rules: [
      { required: true, message: '请输入用户名' },
      { min: 3, max: 20, message: '用户名长度为 3-20 个字符' },
    ],
    componentProps: {
      placeholder: '请输入用户名',
    },
    colProps: { span: 24 },
  },
  // ... 更多字段配置
]</code></pre>
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped>
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
</style>
