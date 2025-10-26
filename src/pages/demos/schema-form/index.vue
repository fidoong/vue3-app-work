<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础表单',
    description: '展示 SchemaForm 的基本用法，包括常用表单控件',
    path: '/demos/schema-form/basic',
    icon: 'i-carbon-document',
    tag: '基础',
    tagColor: 'blue',
  },
  {
    title: '表单布局',
    description: '演示水平、垂直、行内三种布局方式',
    path: '/demos/schema-form/layout',
    icon: 'i-carbon-layout',
    tag: '布局',
    tagColor: 'cyan',
  },
  {
    title: '动态表单',
    description: '根据条件动态显示或隐藏表单字段',
    path: '/demos/schema-form/dynamic',
    icon: 'i-carbon-flash',
    tag: '动态',
    tagColor: 'green',
  },
  {
    title: '自定义渲染',
    description: '使用插槽和 render 函数自定义表单项',
    path: '/demos/schema-form/custom',
    icon: 'i-carbon-paint-brush',
    tag: '自定义',
    tagColor: 'purple',
  },
  {
    title: '表单验证',
    description: '各种验证规则和自定义验证器的使用',
    path: '/demos/schema-form/validation',
    icon: 'i-carbon-checkmark-outline',
    tag: '验证',
    tagColor: 'orange',
  },
  {
    title: '异步数据',
    description: '表单项数据来自 API 接口',
    path: '/demos/schema-form/async',
    icon: 'i-carbon-cloud-upload',
    tag: '异步',
    tagColor: 'red',
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="SchemaForm 组件示例"
      class="demo-card"
    >
      <template #extra>
        <a-space>
          <a-tag color="blue">
            业务组件
          </a-tag>
          <a-tag color="green">
            6 个示例
          </a-tag>
        </a-space>
      </template>

      <a-alert
        message="SchemaForm 是一个基于配置的表单组件，通过 JSON Schema 快速构建复杂表单"
        type="info"
        show-icon
        class="mb-6"
      />

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
        <a-card
          v-for="demo in demos"
          :key="demo.path"
          hoverable
          class="demo-item"
          @click="navigateTo(demo.path)"
        >
          <template #cover>
            <div class="demo-cover">
              <span
                :class="demo.icon"
                class="demo-icon"
              />
            </div>
          </template>
          <a-card-meta
            :title="demo.title"
            :description="demo.description"
          >
            <template #avatar>
              <a-tag :color="demo.tagColor">
                {{ demo.tag }}
              </a-tag>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </a-card>

    <a-card
      title="组件特性"
      class="demo-card mt-4"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                配置驱动
              </div>
              <div class="text-sm text-gray-500">
                通过 JSON Schema 配置表单结构
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                动态表单
              </div>
              <div class="text-sm text-gray-500">
                支持根据条件动态显示字段
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                自定义渲染
              </div>
              <div class="text-sm text-gray-500">
                支持插槽和 render 函数
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                完整验证
              </div>
              <div class="text-sm text-gray-500">
                内置多种验证规则和自定义验证
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                响应式布局
              </div>
              <div class="text-sm text-gray-500">
                支持栅格布局和响应式配置
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="feature-item">
            <span class="i-carbon-checkmark-filled text-xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                TypeScript
              </div>
              <div class="text-sm text-gray-500">
                完整的类型定义和智能提示
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      title="快速开始"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>import { SchemaForm } from '~/components/business/SchemaForm'
import type { FormItemSchema } from '~/components/shared/types'

const schemas: FormItemSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    rules: [{ required: true, message: '请输入用户名' }],
  },
]

&lt;SchemaForm
  v-model="formData"
  :schemas="schemas"
  @submit="handleSubmit"
/&gt;</code></pre>
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

.demo-item {
  cursor: pointer;
  transition: all 0.3s;
}

.demo-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.demo-icon {
  font-size: 48px;
  color: white;
}

.feature-item {
  display: flex;
  align-items: flex-start;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}
</style>
