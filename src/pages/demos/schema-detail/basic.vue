<script setup lang="ts">
import type { DetailItemSchema } from '~/components/business'
import { SchemaDetail } from '~/components/business'

const data = ref({
  name: '张三',
  age: 28,
  gender: 'male',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  address: '北京市朝阳区某某街道某某小区',
  company: '某某科技有限公司',
  position: '前端开发工程师',
  department: '技术部',
  status: 1,
  createTime: '2024-01-15 10:30:00',
  updateTime: '2024-10-26 14:20:00',
})

const items: DetailItemSchema[] = [
  {
    key: 'name',
    label: '姓名',
  },
  {
    key: 'age',
    label: '年龄',
  },
  {
    key: 'gender',
    label: '性别',
    formatter: value => (value === 'male' ? '男' : '女'),
  },
  {
    key: 'email',
    label: '邮箱',
  },
  {
    key: 'phone',
    label: '手机号',
  },
  {
    key: 'address',
    label: '地址',
    span: 2,
  },
  {
    key: 'company',
    label: '公司',
  },
  {
    key: 'position',
    label: '职位',
  },
  {
    key: 'department',
    label: '部门',
  },
  {
    key: 'status',
    label: '状态',
    formatter: value => (value === 1 ? '在职' : '离职'),
  },
  {
    key: 'createTime',
    label: '创建时间',
  },
  {
    key: 'updateTime',
    label: '更新时间',
  },
]
</script>

<template>
  <div class="p-6">
    <a-card title="基础用法">
      <template #extra>
        <a-space>
          <a-button
            type="link"
            @click="$router.back()"
          >
            返回
          </a-button>
        </a-space>
      </template>

      <a-alert
        message="提示"
        description="这是最基础的详情展示，使用 items 配置字段，默认 3 列布局"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaDetail
        :data="data"
        :items="items"
        :column="3"
        title="员工详情"
        bordered
      />
    </a-card>

    <a-card
      title="代码示例"
      class="mt-4"
    >
      <pre><code>{{ `<script setup lang="ts">
import { SchemaDetail } from '~/components/business'
import type { DetailItemSchema } from '~/components/business'

const data = ref({
  name: '张三',
  age: 28,
  email: 'zhangsan@example.com',
  // ...
})

const items: DetailItemSchema[] = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄' },
  { key: 'email', label: '邮箱' },
  { key: 'address', label: '地址', span: 2 }, // 占据2列
]
<\/script>

<template>
  <SchemaDetail
    :data="data"
    :items="items"
    :column="3"
    title="员工详情"
    bordered
  />
</template>` }}</code></pre>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
pre {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
