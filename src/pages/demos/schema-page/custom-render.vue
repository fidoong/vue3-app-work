<script setup lang="ts">
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import type { FormItemSchema } from '~/components/shared/types'
import { Badge, message, Rate, Statistic, Tag } from 'ant-design-vue'
import { SchemaPage } from '~/components/business/SchemaPage'

interface ProductRecord {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'on_sale' | 'off_sale' | 'sold_out'
  image: string
  rating: number
  sales: number
  createdAt: string
}

const pageRef = ref()

// 搜索表单配置
const searchSchemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '商品名称',
    type: 'input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入商品名称',
      allowClear: true,
    },
  },
  {
    field: 'category',
    label: '商品分类',
    type: 'select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择分类',
      allowClear: true,
      options: [
        { label: '电子产品', value: '电子产品' },
        { label: '服装鞋包', value: '服装鞋包' },
        { label: '食品饮料', value: '食品饮料' },
        { label: '家居用品', value: '家居用品' },
      ],
    },
  },
  {
    field: 'status',
    label: '商品状态',
    type: 'select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择状态',
      allowClear: true,
      options: [
        { label: '在售', value: 'on_sale' },
        { label: '下架', value: 'off_sale' },
        { label: '售罄', value: 'sold_out' },
      ],
    },
  },
]

// 表格列配置 - 展示自定义渲染
const tableColumns: TableColumnSchema<ProductRecord>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    key: 'image',
    title: '商品图片',
    dataIndex: 'image',
    width: 100,
    render: ({ value }) => {
      return h('img', {
        src: value,
        alt: '商品图片',
        style: {
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '4px',
        },
      })
    },
  },
  {
    key: 'name',
    title: '商品名称',
    dataIndex: 'name',
    width: 200,
    render: ({ value, record }) => {
      return h('div', [
        h('div', { style: { fontWeight: 'bold' } }, value),
        h('div', { style: { fontSize: '12px', color: '#999' } }, `分类: ${record.category}`),
      ])
    },
  },
  {
    key: 'price',
    title: '价格',
    dataIndex: 'price',
    width: 120,
    render: ({ value }) => {
      return h('span', { style: { color: '#ff4d4f', fontWeight: 'bold', fontSize: '16px' } }, `¥${value.toFixed(2)}`)
    },
  },
  {
    key: 'stock',
    title: '库存',
    dataIndex: 'stock',
    width: 100,
    render: ({ value }) => {
      const color = value > 50 ? 'success' : value > 10 ? 'warning' : 'error'
      return h(Badge, { status: color, text: `${value} 件` })
    },
  },
  {
    key: 'rating',
    title: '评分',
    dataIndex: 'rating',
    width: 150,
    render: ({ value }) => {
      return h(Rate, {
        value,
        disabled: true,
        allowHalf: true,
      })
    },
  },
  {
    key: 'sales',
    title: '销量',
    dataIndex: 'sales',
    width: 100,
    render: ({ value }) => {
      return h(Statistic, {
        value,
        valueStyle: { fontSize: '14px' },
        suffix: '件',
      })
    },
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: ({ value }) => {
      const statusMap: Record<string, { text: string, color: string }> = {
        on_sale: { text: '在售', color: 'success' },
        off_sale: { text: '下架', color: 'default' },
        sold_out: { text: '售罄', color: 'error' },
      }
      const status = statusMap[value] || { text: value, color: 'default' }
      return h(Tag, { color: status.color }, () => status.text)
    },
  },
  {
    key: 'createdAt',
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
]

// 模拟数据
const mockDatabase = ref<ProductRecord[]>(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `商品${i + 1}`,
    category: ['电子产品', '服装鞋包', '食品饮料', '家居用品'][i % 4],
    price: Math.random() * 1000 + 50,
    stock: Math.floor(Math.random() * 100),
    status: (['on_sale', 'off_sale', 'sold_out'] as const)[i % 3],
    image: `https://picsum.photos/seed/${i + 1}/200/200`,
    rating: Math.random() * 2 + 3,
    sales: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })),
)

// 模拟 API
async function fetchList(params: any) {
  await new Promise(resolve => setTimeout(resolve, 500))

  const page = params.page || 1
  const pageSize = params.pageSize || 10

  let filteredData = [...mockDatabase.value]

  if (params.name) {
    filteredData = filteredData.filter(item => item.name.includes(params.name))
  }
  if (params.category) {
    filteredData = filteredData.filter(item => item.category === params.category)
  }
  if (params.status) {
    filteredData = filteredData.filter(item => item.status === params.status)
  }

  const total = filteredData.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const data = filteredData.slice(start, end)

  return { data, total }
}

async function handleEdit(record: ProductRecord) {
  message.info(`编辑商品: ${record.name}`)
}

async function handleChangeStatus(record: ProductRecord) {
  message.success(`修改商品状态: ${record.name}`)
  pageRef.value?.refresh()
}
</script>

<template>
  <div class="">
    <a-alert
      message="自定义渲染示例"
      type="info"
      show-icon
      closable
      class="mb-4"
    >
      <template #description>
        <div>
          <p class="mb-2">
            展示如何在 SchemaPage 中使用自定义渲染函数来实现丰富的表格展示效果。
          </p>
          <ul class="list-disc pl-4">
            <li>图片渲染：展示商品图片</li>
            <li>复合内容：商品名称 + 分类信息</li>
            <li>价格样式：自定义价格显示样式</li>
            <li>库存状态：根据库存数量显示不同颜色</li>
            <li>评分组件：使用 Rate 组件展示评分</li>
            <li>统计数字：使用 Statistic 组件展示销量</li>
          </ul>
        </div>
      </template>
    </a-alert>

    <SchemaPage
      ref="pageRef"
      :search-schemas="searchSchemas"
      :table-columns="tableColumns"
      :api="fetchList"
      :search-collapsed-rows="1"
      :search-action-span="8"
      row-key="id"
      :toolbar="{
        showRefresh: true,
      }"
      :actions="[
        {
          text: '编辑',
          type: 'link',
          onClick: handleEdit,
        },
        {
          text: '修改状态',
          type: 'link',
          onClick: handleChangeStatus,
        },
      ]"
    />
  </div>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.pl-4 {
  padding-left: 16px;
}
</style>
