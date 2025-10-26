<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Input, message } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formData = ref({})
const layout = ref<'horizontal' | 'vertical' | 'inline'>('horizontal')

const schemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: Input,
    required: true,
    rules: [{ required: true, message: '请输入姓名' }],
    componentProps: { placeholder: '请输入姓名' },
    colProps: { span: 12 },
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
    colProps: { span: 12 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: Input,
    componentProps: { placeholder: '请输入手机号' },
    colProps: { span: 12 },
  },
  {
    field: 'address',
    label: '地址',
    component: Input,
    componentProps: { placeholder: '请输入地址' },
    colProps: { span: 12 },
  },
]

function handleSubmit(_values: Record<string, any>) {
  message.success('提交成功！')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="表单布局示例"
      class="demo-card"
    >
      <template #extra>
        <a-radio-group
          v-model:value="layout"
          button-style="solid"
        >
          <a-radio-button value="horizontal">
            水平布局
          </a-radio-button>
          <a-radio-button value="vertical">
            垂直布局
          </a-radio-button>
          <a-radio-button value="inline">
            行内布局
          </a-radio-button>
        </a-radio-group>
      </template>

      <a-alert
        :message="`当前布局: ${layout}`"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaForm
        v-model="formData"
        :schemas="schemas"
        :layout="layout"
        :label-col="layout === 'horizontal' ? { span: 6 } : undefined"
        :wrapper-col="layout === 'horizontal' ? { span: 18 } : undefined"
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
      title="布局说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="horizontal">
          水平布局，标签和表单控件水平排列
        </a-descriptions-item>
        <a-descriptions-item label="vertical">
          垂直布局，标签和表单控件垂直排列
        </a-descriptions-item>
        <a-descriptions-item label="inline">
          行内布局，表单项在一行内排列
        </a-descriptions-item>
      </a-descriptions>
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
</style>
