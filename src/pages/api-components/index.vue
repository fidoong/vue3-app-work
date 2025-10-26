<script setup lang="ts">
import ApiTreeSelect from '~//components/base/ApiTreeSelect/ApiTreeSelect.vue'
import ApiCascader from '~/components/base/ApiCascader/ApiCascader.vue'
import ApiCheckboxGroup from '~/components/base/ApiCheckboxGroup/ApiCheckboxGroup.vue'
import ApiRadioGroup from '~/components/base/ApiRadioGroup/ApiRadioGroup.vue'
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'

// 模拟 API 函数
async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    data: [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' },
      { id: 3, name: '王五', email: 'wangwu@example.com' },
    ],
  }
}

async function fetchDepartments() {
  await new Promise(resolve => setTimeout(resolve, 600))
  return {
    data: [
      {
        id: '1',
        name: '技术部',
        children: [
          { id: '1-1', name: '前端组' },
          { id: '1-2', name: '后端组' },
        ],
      },
      {
        id: '2',
        name: '产品部',
        children: [
          { id: '2-1', name: '产品组' },
          { id: '2-2', name: '设计组' },
        ],
      },
    ],
  }
}

async function fetchAreas() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    {
      code: '110000',
      name: '北京市',
      children: [
        {
          code: '110100',
          name: '北京市',
          children: [
            { code: '110101', name: '东城区' },
            { code: '110102', name: '西城区' },
          ],
        },
      ],
    },
    {
      code: '310000',
      name: '上海市',
      children: [
        {
          code: '310100',
          name: '上海市',
          children: [
            { code: '310101', name: '黄浦区' },
            { code: '310104', name: '徐汇区' },
          ],
        },
      ],
    },
  ]
}

async function fetchStatuses() {
  await new Promise(resolve => setTimeout(resolve, 400))
  return [
    { code: 'active', name: '启用' },
    { code: 'inactive', name: '禁用' },
    { code: 'pending', name: '待审核' },
  ]
}

async function fetchPermissions() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    data: [
      { id: 'read', name: '查看' },
      { id: 'write', name: '编辑' },
      { id: 'delete', name: '删除' },
      { id: 'admin', name: '管理' },
    ],
  }
}

// 表单数据
const formData = reactive({
  user: undefined,
  department: undefined,
  area: [],
  status: 'active',
  permissions: ['read'],
})
</script>

<script lang="ts">
const components = [
  {
    name: 'ApiSelect',
    description: 'API 下拉选择器，支持单选和多选',
    scenes: ['用户选择', '部门选择', '状态选择', '标签选择'],
  },
  {
    name: 'ApiTreeSelect',
    description: 'API 树形选择器，用于层级数据选择',
    scenes: ['组织架构', '多级分类', '权限树', '区域选择'],
  },
  {
    name: 'ApiCascader',
    description: 'API 级联选择器，用于级联数据选择',
    scenes: ['省市区', '多级分类', '层级筛选'],
  },
  {
    name: 'ApiRadioGroup',
    description: 'API 单选组，用于动态单选选项',
    scenes: ['状态选择', '类型选择', '性别选择', '是否选择'],
  },
  {
    name: 'ApiCheckboxGroup',
    description: 'API 多选组，用于动态多选选项',
    scenes: ['权限选择', '标签选择', '兴趣选择', '功能开关'],
  },
]
</script>

<template>
  <div class="mx-auto max-w-4xl p-6 space-y-8">
    <div>
      <h1 class="mb-2 text-2xl font-bold">
        API 驱动组件示例
      </h1>
      <p class="text-gray-600">
        统一的异步数据加载组件库
      </p>
    </div>

    <a-card title="表单示例">
      <a-form
        :model="formData"
        :label-col="{ span: 4 }"
      >
        <!-- ApiSelect -->
        <a-form-item label="选择用户">
          <ApiSelect
            v-model:value="formData.user"
            :api="fetchUsers"
            :option-config="{
              valueField: 'id',
              labelField: 'name',
            }"
            :transform="(data: any[]) => data.map((item: any) => ({
              value: item.id,
              label: `${item.name} (${item.email})`,
            }))"
            placeholder="请选择用户"
            allow-clear
          />
        </a-form-item>

        <!-- ApiTreeSelect -->
        <a-form-item label="选择部门">
          <ApiTreeSelect
            v-model:value="formData.department"
            :api="fetchDepartments"
            :tree-node-config="{
              valueField: 'id',
              titleField: 'name',
              childrenField: 'children',
            }"
            placeholder="请选择部门"
            allow-clear
          />
        </a-form-item>

        <!-- ApiCascader -->
        <a-form-item label="选择地区">
          <ApiCascader
            v-model:value="formData.area"
            :api="fetchAreas"
            :option-config="{
              valueField: 'code',
              labelField: 'name',
              childrenField: 'children',
            }"
            placeholder="请选择地区"
            allow-clear
          />
        </a-form-item>

        <!-- ApiRadioGroup -->
        <a-form-item label="选择状态">
          <ApiRadioGroup
            v-model:value="formData.status"
            :api="fetchStatuses"
            :option-config="{
              valueField: 'code',
              labelField: 'name',
            }"
            option-type="button"
          />
        </a-form-item>

        <!-- ApiCheckboxGroup -->
        <a-form-item label="选择权限">
          <ApiCheckboxGroup
            v-model:value="formData.permissions"
            :api="fetchPermissions"
            :option-config="{
              valueField: 'id',
              labelField: 'name',
            }"
          />
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 表单数据展示 -->
    <a-card title="表单数据">
      <pre class="text-sm">{{ formData }}</pre>
    </a-card>

    <!-- 组件列表 -->
    <a-card title="组件列表">
      <div class="space-y-4">
        <div
          v-for="item in components"
          :key="item.name"
          class="border-b pb-4 last:border-b-0"
        >
          <h3 class="mb-2 font-semibold">
            {{ item.name }}
          </h3>
          <p class="mb-2 text-sm text-gray-600">
            {{ item.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <a-tag
              v-for="scene in item.scenes"
              :key="scene"
              color="blue"
            >
              {{ scene }}
            </a-tag>
          </div>
        </div>
      </div>
    </a-card>

    <!-- 特性说明 -->
    <a-card title="统一特性">
      <ul class="text-sm space-y-2">
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>自动加载 - 组件挂载时自动加载数据</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>动态参数 - 参数变化自动重新加载</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>字段映射 - 灵活配置数据字段</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>数据转换 - 支持自定义数据转换</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>加载状态 - 自动管理加载状态</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>错误处理 - 统一的错误处理机制</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>手动刷新 - 支持手动刷新数据</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>TypeScript - 完整的类型支持</span>
        </li>
      </ul>
    </a-card>

    <!-- 相关链接 -->
    <div class="text-center space-x-4">
      <router-link
        to="/select"
        class="text-blue-500 hover:underline"
      >
        ApiSelect 详细示例 →
      </router-link>
      <router-link
        to="/select/custom-render"
        class="text-blue-500 hover:underline"
      >
        自定义渲染示例 →
      </router-link>
    </div>
  </div>
</template>
