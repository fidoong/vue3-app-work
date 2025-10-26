<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { SchemaForm } from '~/components/business/SchemaForm'

interface Props {
  userId?: number
  initialData?: Record<string, any>
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
})

const formRef = ref()
const formData = ref({ ...props.initialData })
const loading = ref(false)

const schemas: FormItemSchema[] = [
  {
    key: 'name',
    field: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    rules: [{ required: true, message: '请输入姓名' }],
    span: 24,
  },
  {
    key: 'email',
    field: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
    span: 24,
  },
  {
    key: 'age',
    field: 'age',
    label: '年龄',
    type: 'number',
    placeholder: '请输入年龄',
    props: {
      min: 1,
      max: 150,
    },
    span: 24,
  },
  {
    key: 'gender',
    field: 'gender',
    label: '性别',
    type: 'radio',
    props: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    span: 24,
  },
  {
    key: 'hobbies',
    field: 'hobbies',
    label: '爱好',
    type: 'checkbox',
    props: {
      options: [
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
        { label: '旅游', value: 'travel' },
      ],
    },
    span: 24,
  },
]

/**
 * 提交
 */
async function handleSubmit() {
  try {
    await formRef.value?.validate()
    loading.value = true

    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    props.confirm?.({
      userId: props.userId,
      formData: formData.value,
    })
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
  finally {
    loading.value = false
  }
}

/**
 * 取消
 */
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
      :loading="loading"
    />

    <div class="mt-6 flex justify-end gap-2">
      <a-button @click="handleCancel">
        取消
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        @click="handleSubmit"
      >
        保存
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.form-modal {
  padding: 8px 0;
}
</style>
