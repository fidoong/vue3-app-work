<script setup lang="ts">
import type { DetailItemSchema } from '~/components/business'
import { HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { SchemaDetail } from '~/components/business'

const data = ref({
  name: '张三',
  age: 28,
  email: 'zhangsan@example.com',
  phone: '13800138000',
  address: '北京市朝阳区某某街道',
  isVip: true,
  vipLevel: 'Gold',
  secretInfo: '这是机密信息',
  showSecret: false,
})

const items: DetailItemSchema[] = [
  {
    key: 'name',
    label: '姓名',
    prefixIcon: UserOutlined,
  },
  {
    key: 'age',
    label: '年龄',
  },
  {
    key: 'email',
    label: '邮箱',
    prefixIcon: MailOutlined,
    copyable: true,
  },
  {
    key: 'phone',
    label: '手机号',
    prefixIcon: PhoneOutlined,
    copyable: true,
  },
  {
    key: 'address',
    label: '地址',
    prefixIcon: HomeOutlined,
    copyable: true,
    span: 2,
  },
  {
    key: 'vipLevel',
    label: 'VIP等级',
    hidden: record => !record.isVip,
  },
  {
    key: 'secretInfo',
    label: '机密信息',
    hidden: record => !record.showSecret,
    span: 2,
  },
]

function handleCopy(field: string, value: any) {
  message.success(`已复制 ${field}: ${value}`)
}

function toggleSecret() {
  data.value.showSecret = !data.value.showSecret
}
</script>

<template>
  <div class="p-6">
    <a-card title="高级功能">
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
        description="展示复制功能、图标、条件显示等高级功能"
        type="info"
        show-icon
        class="mb-4"
      />

      <div class="mb-4 space-y-4">
        <a-space>
          <a-switch
            v-model:checked="data.isVip"
            checked-children="VIP"
            un-checked-children="普通"
          />
          <span>切换 VIP 状态（影响 VIP 等级字段显示）</span>
        </a-space>

        <a-space>
          <a-button
            type="primary"
            @click="toggleSecret"
          >
            {{ data.showSecret ? '隐藏' : '显示' }}机密信息
          </a-button>
        </a-space>
      </div>

      <SchemaDetail
        :data="data"
        :items="items"
        :column="3"
        title="用户详情"
        bordered
        @copy="handleCopy"
      />

      <a-divider />

      <a-card
        title="功能说明"
        size="small"
      >
        <ul class="list-disc list-inside space-y-2">
          <li>
            <strong>复制功能：</strong>设置 <code>copyable: true</code> 可以在字段值后显示复制按钮
          </li>
          <li>
            <strong>图标：</strong>使用 <code>prefixIcon</code> 和 <code>suffixIcon</code> 添加图标
          </li>
          <li>
            <strong>条件显示：</strong>使用 <code>hidden</code> 函数根据数据动态控制字段显示
          </li>
          <li>
            <strong>默认值：</strong>使用 <code>defaultValue</code> 设置空值时的默认显示
          </li>
          <li>
            <strong>格式化：</strong>使用 <code>formatter</code> 函数格式化显示值
          </li>
        </ul>
      </a-card>
    </a-card>
  </div>
</template>

<style scoped>
code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
</style>
