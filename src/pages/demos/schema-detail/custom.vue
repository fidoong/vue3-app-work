<script setup lang="ts">
import type { DetailItemSchema } from '~/components/business'
import { UserOutlined } from '@ant-design/icons-vue'
import { Progress, Rate, Tag } from 'ant-design-vue'
import { h } from 'vue'
import { SchemaDetail } from '~/components/business'

const data = ref({
  name: '张三',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  status: 1,
  level: 5,
  tags: ['Vue', 'TypeScript', 'React'],
  progress: 75,
  rating: 4.5,
  description: '这是一段很长的描述文字，用来展示多行文本的显示效果。',
  skills: [
    { name: 'Vue', level: 90 },
    { name: 'React', level: 80 },
    { name: 'TypeScript', level: 85 },
  ],
})

const items: DetailItemSchema[] = [
  {
    key: 'name',
    label: '姓名',
  },
  {
    key: 'avatar',
    label: '头像',
    slot: 'avatar',
  },
  {
    key: 'status',
    label: '状态',
    render: (value) => {
      const color = value === 1 ? 'green' : 'red'
      const text = value === 1 ? '在线' : '离线'
      return h(Tag, { color }, () => text)
    },
  },
  {
    key: 'level',
    label: '等级',
    render: (value) => {
      return h(Tag, { color: 'blue' }, () => `Lv.${value}`)
    },
  },
  {
    key: 'tags',
    label: '技能标签',
    render: (value) => {
      if (!Array.isArray(value))
        return '-'
      return h(
        'div',
        { style: 'display: flex; gap: 8px; flex-wrap: wrap' },
        value.map(tag => h(Tag, { color: 'processing' }, () => tag)),
      )
    },
    span: 2,
  },
  {
    key: 'progress',
    label: '完成度',
    render: (value) => {
      return h(Progress, { percent: value, size: 'small' })
    },
    span: 2,
  },
  {
    key: 'rating',
    label: '评分',
    render: (value) => {
      return h(Rate, { value, disabled: true, allowHalf: true })
    },
  },
  {
    key: 'description',
    label: '描述',
    span: 3,
  },
  {
    key: 'skills',
    label: '技能详情',
    slot: 'skills',
    span: 3,
  },
]
</script>

<template>
  <div class="p-6">
    <a-card title="自定义渲染">
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
        description="支持使用 render 函数和插槽两种方式自定义渲染字段内容"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaDetail
        :data="data"
        :items="items"
        :column="3"
        title="用户信息"
        bordered
      >
        <!-- 头像插槽 -->
        <template #avatar="{ value }">
          <a-avatar
            :size="64"
            :src="value"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </template>

        <!-- 技能详情插槽 -->
        <template #skills="{ value }">
          <div class="space-y-2">
            <div
              v-for="skill in value"
              :key="skill.name"
              class="flex items-center gap-3"
            >
              <span class="w-24">{{ skill.name }}</span>
              <a-progress
                :percent="skill.level"
                :show-info="true"
                class="flex-1"
              />
            </div>
          </div>
        </template>
      </SchemaDetail>
    </a-card>
  </div>
</template>
