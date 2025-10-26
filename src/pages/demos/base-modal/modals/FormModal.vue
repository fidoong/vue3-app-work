<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Input, message } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

interface Props {
  data?: Record<string, any>
  mode?: 'create' | 'edit'
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  data: () => ({}),
})

const formRef = ref()
const formData = ref({ ...props.data })
const loading = ref(false)

const schemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: Input,
    required: true,
    rules: [{ required: true, message: '请输入姓名' }],
    componentProps: { placeholder: '请输入姓名' },
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
    rules: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }],
    componentProps: { placeholder: '请输入手机号' },
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注',
    component: Input.TextArea,
    componentProps: {
      placeholder: '请输入备注',
      rows: 3,
    },
    colProps: { span: 24 },
  },
]

async function handleConfirm() {
  try {
    await formRef.value?.validate()
    loading.value = true

    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    message.success(props.mode === 'create' ? '创建成功' : '更新成功')
    props.confirm?.({ success: true, data: formData.value })
  }
  catch (error) {
    console.error('验证失败:', error)
  }
  finally {
    loading.value = false
  }
}

function handleCancel() {
  props.cancel?.()
}
</script>

<template>
  <div class="form-modal">
    <SchemaForm
      ref="formRef"
      v-model="formData"
      :schemas="schemas"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    />

    <div class="modal-footer">
      <a-space>
        <a-button @click="handleCancel">
          取消
        </a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ mode === 'create' ? '创建' : '更新' }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped>
.form-modal {
  padding: 24px;
}

.modal-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}
</style>
