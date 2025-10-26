<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Input, message } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formRef = ref()
const formData = ref({
  tags: ['Vue', 'React'],
})

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
    field: 'avatar',
    label: '头像',
    slot: 'avatar',
    colProps: { span: 24 },
  },
  {
    field: 'tags',
    label: '技能标签',
    slot: 'tags',
    colProps: { span: 24 },
  },
  {
    field: 'score',
    label: '评分',
    render: ({ value, setValue }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h('a-rate', {
          value,
          'onUpdate:value': setValue,
          'allowHalf': true,
        }),
        h('span', { class: 'ml-2' }, value ? `${value} 分` : '未评分'),
      ])
    },
    colProps: { span: 24 },
  },
  {
    field: 'color',
    label: '喜欢的颜色',
    render: ({ value, setValue }) => {
      const colors = ['#f5222d', '#fa8c16', '#fadb14', '#52c41a', '#1890ff', '#722ed1']
      return h('div', { class: 'flex gap-2' }, colors.map(color =>
        h('div', {
          class: 'w-8 h-8 rounded cursor-pointer border-2',
          style: {
            backgroundColor: color,
            borderColor: value === color ? '#000' : 'transparent',
          },
          onClick: () => setValue(color),
        }),
      ))
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

const avatarUrl = ref('')
const inputTag = ref('')
const inputVisible = ref(false)

function handleAvatarChange(info: any) {
  const file = info.file.originFileObj
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarUrl.value = e.target?.result as string
      formRef.value?.setFieldValue('avatar', avatarUrl.value)
    }
    reader.readAsDataURL(file)
  }
}

function handleTagClose(tag: string) {
  const tags = formData.value.tags.filter((t: string) => t !== tag)
  formRef.value?.setFieldValue('tags', tags)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    // Focus input
  })
}

function handleInputConfirm() {
  if (inputTag.value && !formData.value.tags.includes(inputTag.value)) {
    formRef.value?.setFieldValue('tags', [...formData.value.tags, inputTag.value])
  }
  inputVisible.value = false
  inputTag.value = ''
}

function handleSubmit(_values: Record<string, any>) {
  message.success('提交成功！')
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="自定义渲染示例"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="purple">
          自定义组件
        </a-tag>
      </template>

      <a-alert
        message="支持插槽和 render 函数两种自定义渲染方式"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaForm
        ref="formRef"
        v-model="formData"
        :schemas="schemas"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        @submit="handleSubmit"
      >
        <!-- 自定义头像上传 -->
        <template #avatar="{ value }">
          <div class="flex items-center gap-4">
            <a-avatar
              :size="80"
              :src="value || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'"
            />
            <a-upload
              :show-upload-list="false"
              accept="image/*"
              @change="handleAvatarChange"
            >
              <a-button>
                <span class="i-carbon-upload mr-1" />
                上传头像
              </a-button>
            </a-upload>
          </div>
        </template>

        <!-- 自定义标签输入 -->
        <template #tags="{ value }">
          <div class="flex flex-wrap gap-2">
            <a-tag
              v-for="tag in value"
              :key="tag"
              closable
              @close="handleTagClose(tag)"
            >
              {{ tag }}
            </a-tag>
            <a-input
              v-if="inputVisible"
              v-model:value="inputTag"
              type="text"
              size="small"
              style="width: 100px"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              v-else
              style="border-style: dashed"
              @click="showInput"
            >
              <span class="i-carbon-add mr-1" />
              添加标签
            </a-tag>
          </div>
        </template>

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
      title="实现方式"
      class="demo-card mt-4"
    >
      <a-tabs>
        <a-tab-pane
          key="slot"
          tab="插槽方式"
        >
          <a-typography-paragraph>
            <pre><code>// Schema 配置
            {
            field: 'avatar',
            label: '头像',
            slot: 'avatar', // 使用插槽
            }

            // 模板使用
            &lt;template #avatar="{ value, setValue }"&gt;
            &lt;a-avatar :src="value" /&gt;
            &lt;a-button @click="handleUpload"&gt;上传&lt;/a-button&gt;
            &lt;/template&gt;</code></pre>
          </a-typography-paragraph>
        </a-tab-pane>
        <a-tab-pane
          key="render"
          tab="Render 函数"
        >
          <a-typography-paragraph>
            <pre><code>// Schema 配置
            {
            field: 'score',
            label: '评分',
            render: ({ value, setValue }) => {
            return h('div', [
            h('a-rate', {
            value,
            'onUpdate:value': setValue,
            }),
            h('span', value ? \`\${value} 分\` : '未评分'),
            ])
            },
            }</code></pre>
          </a-typography-paragraph>
        </a-tab-pane>
      </a-tabs>
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
