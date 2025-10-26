<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Cascader, DatePicker, Input, InputNumber, message, Radio, Select, TreeSelect } from 'ant-design-vue'
import { SearchForm } from '~/components/business/SearchForm'

const searchFormRef = ref()
const loading = ref(false)
const tableData = ref<any[]>([])

const schemas: FormItemSchema[] = [
  {
    field: 'keyword',
    label: '关键词',
    component: Input,
    componentProps: {
      placeholder: '请输入关键词搜索',
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: '类型',
    component: Radio.Group,
    defaultValue: 'all',
    componentProps: {
      options: [
        { label: '全部', value: 'all' },
        { label: '文章', value: 'article' },
        { label: '视频', value: 'video' },
        { label: '图片', value: 'image' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: Select,
    componentProps: {
      placeholder: '请选择状态',
      mode: 'multiple',
      options: [
        { label: '草稿', value: 'draft' },
        { label: '已发布', value: 'published' },
        { label: '已下架', value: 'offline' },
        { label: '已删除', value: 'deleted' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'category',
    label: '分类',
    component: TreeSelect,
    componentProps: {
      placeholder: '请选择分类',
      treeData: [
        {
          title: '技术',
          value: 'tech',
          children: [
            { title: '前端', value: 'frontend' },
            { title: '后端', value: 'backend' },
            { title: '移动端', value: 'mobile' },
          ],
        },
        {
          title: '产品',
          value: 'product',
          children: [
            { title: '需求分析', value: 'requirement' },
            { title: '产品设计', value: 'design' },
          ],
        },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'region',
    label: '地区',
    component: Cascader,
    componentProps: {
      placeholder: '请选择地区',
      options: [
        {
          label: '浙江',
          value: 'zhejiang',
          children: [
            { label: '杭州', value: 'hangzhou' },
            { label: '宁波', value: 'ningbo' },
          ],
        },
        {
          label: '江苏',
          value: 'jiangsu',
          children: [
            { label: '南京', value: 'nanjing' },
            { label: '苏州', value: 'suzhou' },
          ],
        },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'dateRange',
    label: '创建时间',
    component: DatePicker.RangePicker,
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
      style: { width: '100%' },
      showTime: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'viewCount',
    label: '浏览量',
    component: InputNumber,
    componentProps: {
      placeholder: '最小浏览量',
      style: { width: '100%' },
      min: 0,
    },
    colProps: { span: 8 },
  },
  {
    field: 'author',
    label: '作者',
    component: Select,
    componentProps: {
      placeholder: '请选择作者',
      showSearch: true,
      options: [
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' },
        { label: '王五', value: 'wangwu' },
      ],
      allowClear: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'tags',
    label: '标签',
    component: Select,
    componentProps: {
      placeholder: '请选择标签',
      mode: 'tags',
      options: [
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
      ],
    },
    colProps: { span: 8 },
  },
]

function handleSearch(values: Record<string, any>) {
  loading.value = true
  message.info(`搜索条件: ${JSON.stringify(values, null, 2)}`)

  setTimeout(() => {
    tableData.value = [
      {
        id: 1,
        title: '文章标题 1',
        type: 'article',
        status: 'published',
        author: '张三',
        viewCount: 1234,
        createTime: '2024-01-01 10:00:00',
      },
      {
        id: 2,
        title: '视频标题 2',
        type: 'video',
        status: 'draft',
        author: '李四',
        viewCount: 567,
        createTime: '2024-01-02 11:00:00',
      },
      {
        id: 3,
        title: '图片标题 3',
        type: 'image',
        status: 'published',
        author: '王五',
        viewCount: 890,
        createTime: '2024-01-03 12:00:00',
      },
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
      title="高级搜索表单"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="purple">
          高级搜索
        </a-tag>
      </template>

      <a-alert
        message="包含多种复杂表单组件：多选、树选择、级联选择、标签输入等"
        type="info"
        show-icon
        class="mb-4"
      />

      <SearchForm
        ref="searchFormRef"
        :schemas="schemas"
        :loading="loading"
        :collapsed-rows="2"
        :default-expanded="false"
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
          { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
          { title: '标题', dataIndex: 'title', key: 'title' },
          { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
          { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
          { title: '作者', dataIndex: 'author', key: 'author', width: 100 },
          { title: '浏览量', dataIndex: 'viewCount', key: 'viewCount', width: 100 },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
        ]"
        :data-source="tableData"
        :loading="loading"
        :pagination="{ pageSize: 10 }"
      />
    </a-card>

    <a-card
      title="支持的组件类型"
      class="demo-card mt-4"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-text-input text-2xl text-blue-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  基础输入
                </div>
                <div class="text-sm text-gray-500">
                  Input, InputNumber
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-checkbox text-2xl text-green-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  选择器
                </div>
                <div class="text-sm text-gray-500">
                  Select, Radio, Checkbox
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-calendar text-2xl text-orange-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  日期时间
                </div>
                <div class="text-sm text-gray-500">
                  DatePicker, RangePicker
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-tree-view text-2xl text-purple-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  树形选择
                </div>
                <div class="text-sm text-gray-500">
                  TreeSelect, Cascader
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-tag text-2xl text-cyan-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  标签输入
                </div>
                <div class="text-sm text-gray-500">
                  Select (mode: tags)
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card size="small">
            <div class="component-type">
              <span class="i-carbon-search text-2xl text-red-500" />
              <div class="ml-2">
                <div class="font-semibold">
                  搜索选择
                </div>
                <div class="text-sm text-gray-500">
                  Select (showSearch)
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
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

.component-type {
  display: flex;
  align-items: center;
}
</style>
