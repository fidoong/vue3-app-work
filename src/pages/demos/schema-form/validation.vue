<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Checkbox, Input, InputNumber, message } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formRef = ref()
const formData = ref<Record<string, any>>({})

const schemas: FormItemSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: Input,
    required: true,
    rules: [
      { required: true, message: '请输入用户名' },
      { min: 3, max: 20, message: '用户名长度为 3-20 个字符' },
      { pattern: /^\w+$/, message: '用户名只能包含字母、数字和下划线' },
    ],
    componentProps: { placeholder: '请输入用户名' },
    help: '用户名只能包含字母、数字和下划线，长度 3-20 个字符',
    colProps: { span: 24 },
  },
  {
    field: 'password',
    label: '密码',
    component: Input.Password,
    required: true,
    rules: [
      { required: true, message: '请输入密码' },
      { min: 8, message: '密码至少 8 个字符' },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        message: '密码必须包含大小写字母和数字',
      },
    ],
    componentProps: { placeholder: '请输入密码' },
    help: '密码至少 8 个字符，必须包含大小写字母和数字',
    colProps: { span: 24 },
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: Input.Password,
    required: true,
    rules: [
      { required: true, message: '请确认密码' },
      {
        validator: (_rule: any, value: string) => {
          if (!value) {
            return Promise.reject(new Error('请确认密码'))
          }
          if (value !== formData.value.password) {
            return Promise.reject(new Error('两次输入的密码不一致'))
          }
          return Promise.resolve()
        },
      },
    ],
    componentProps: { placeholder: '请再次输入密码' },
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
    componentProps: { placeholder: '请输入邮箱' },
    colProps: { span: 24 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: Input,
    required: true,
    rules: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
    ],
    componentProps: { placeholder: '请输入手机号' },
    colProps: { span: 24 },
  },
  {
    field: 'age',
    label: '年龄',
    component: InputNumber,
    required: true,
    rules: [
      { required: true, message: '请输入年龄' },
      { type: 'number', min: 18, max: 65, message: '年龄必须在 18-65 之间' },
    ],
    componentProps: {
      min: 18,
      max: 65,
      placeholder: '请输入年龄',
      style: { width: '100%' },
    },
    colProps: { span: 24 },
  },
  {
    field: 'website',
    label: '个人网站',
    component: Input,
    rules: [
      { type: 'url', message: '请输入正确的网址格式' },
    ],
    componentProps: { placeholder: '请输入个人网站' },
    help: '例如: https://example.com',
    colProps: { span: 24 },
  },
  {
    field: 'agreement',
    label: '用户协议',
    component: Checkbox,
    required: true,
    rules: [
      {
        validator: (_rule: any, value: boolean) => {
          if (!value) {
            return Promise.reject(new Error('请阅读并同意用户协议'))
          }
          return Promise.resolve()
        },
      },
    ],
    componentProps: {
      children: '我已阅读并同意用户协议',
    },
    colProps: { span: 24 },
  },
]

async function handleSubmit(_values: Record<string, any>) {
  message.success('验证通过，提交成功！')
}

async function handleValidateField(field: string) {
  try {
    await formRef.value?.validateFields([field])
    message.success(`${field} 验证通过`)
  }
  catch (error) {
    console.error('验证失败:', error)
  }
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="表单验证示例"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="orange">
          复杂验证
        </a-tag>
      </template>

      <a-alert
        message="包含多种验证规则：必填、长度、格式、自定义验证等"
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
        <template #footer="{ submit, reset, validate }">
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
            <a-button @click="validate">
              验证全部
            </a-button>
            <a-button @click="handleValidateField('username')">
              验证用户名
            </a-button>
          </a-space>
        </template>
      </SchemaForm>
    </a-card>

    <a-card
      title="验证规则说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="用户名">
          必填，3-20 个字符，只能包含字母、数字和下划线
        </a-descriptions-item>
        <a-descriptions-item label="密码">
          必填，至少 8 个字符，必须包含大小写字母和数字
        </a-descriptions-item>
        <a-descriptions-item label="确认密码">
          必填，必须与密码一致（自定义验证器）
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          必填，邮箱格式验证
        </a-descriptions-item>
        <a-descriptions-item label="手机号">
          必填，中国大陆手机号格式验证
        </a-descriptions-item>
        <a-descriptions-item label="年龄">
          必填，数字类型，范围 18-65
        </a-descriptions-item>
        <a-descriptions-item label="个人网站">
          选填，URL 格式验证
        </a-descriptions-item>
        <a-descriptions-item label="用户协议">
          必填，自定义验证器（必须勾选）
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>// 自定义验证器示例
{
  field: 'confirmPassword',
  label: '确认密码',
  component: 'InputPassword',
  rules: [
    {
      validator: (_rule: any, value: string) => {
        if (!value) {
          return Promise.reject(new Error('请确认密码'))
        }
        if (value !== formData.value.password) {
          return Promise.reject(new Error('两次输入的密码不一致'))
        }
        return Promise.resolve()
      },
    },
  ],
}</code></pre>
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

code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
</style>
