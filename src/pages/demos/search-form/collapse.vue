<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { DatePicker, Input, InputNumber, message, Select } from 'ant-design-vue'
import { SearchForm } from '~/components/business/SearchForm'

const loading = ref(false)
const tableData = ref<any[]>([])

const schemas: FormItemSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: Input,
    componentProps: { placeholder: '请输入名称' },
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '编码',
    component: Input,
    componentProps: { placeholder: '请输入编码' },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: Select,
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' },
        { label: '待审核', value: 'pending' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'category',
    label: '分类',
    component: Select,
    componentProps: {
      placeholder: '请选择分类',
      options: [
        { label: '分类A', value: 'a' },
        { label: '分类B', value: 'b' },
        { label: '分类C', value: 'c' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'dateRange',
    label: '日期范围',
    component: DatePicker.RangePicker,
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
      style: { width: '100%' },
    },
    colProps: { span: 8 },
  },
  {
    field: 'amount',
    label: '金额',
    component: InputNumber,
    componentProps: {
      placeholder: '请输入金额',
      style: { width: '100%' },
      min: 0,
    },
    colProps: { span: 8 },
  },
  {
    field: 'creator',
    label: '创建人',
    component: Input,
    componentProps: { placeholder: '请输入创建人' },
    colProps: { span: 8 },
  },
  {
    field: 'department',
    label: '部门',
    component: Select,
    componentProps: {
      placeholder: '请选择部门',
      options: [
        { label: '技术部', value: 'tech' },
        { label: '产品部', value: 'product' },
        { label: '运营部', value: 'operation' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'remark',
    label: '备注',
    component: Input,
    componentProps: { placeholder: '请输入备注' },
    colProps: { span: 8 },
  },
]

function handleSearch(values: Record<string, any>) {
  loading.value = true
  message.info(`搜索条件: ${JSON.stringify(values)}`)

  setTimeout(() => {
    tableData.value = [
      { id: 1, name: '数据 1', code: 'CODE001', status: 'enabled' },
      { id: 2, name: '数据 2', code: 'CODE002', status: 'disabled' },
      { id: 3, name: '数据 3', code: 'CODE003', status: 'pending' },
    ]
    loading.value = false
    message.success('查询成功')
  }, 1000)
}

function handleReset() {
  message.info('表单已重置')
  tableData.value = []
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="展开收起搜索表单"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="green">
          展开收起
        </a-tag>
      </template>

      <a-alert
        message="当搜索字段超过一行时，默认收起多余字段，点击展开按钮可以显示全部字段"
        type="info"
        show-icon
        class="mb-4"
      />

      <SearchForm
        :schemas="schemas"
        :loading="loading"
        :collapsed-rows="1"
        @search="handleSearch"
        @reset="handleReset"
      />
    </a-card>

    <a-card
      title="搜索结果"
      class="demo-card mt-4"
    >
      <a-table
        :columns="[
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: '名称', dataIndex: 'name', key: 'name' },
          { title: '编码', dataIndex: 'code', key: 'code' },
          { title: '状态', dataIndex: 'status', key: 'status' },
        ]"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      />
    </a-card>

    <a-card
      title="功能说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="collapsedRows">
          收起时显示的行数，默认为 1
        </a-descriptions-item>
        <a-descriptions-item label="defaultExpanded">
          默认是否展开，默认为 false
        </a-descriptions-item>
        <a-descriptions-item label="展开按钮">
          当字段数量超过 collapsedRows 行时自动显示
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
