<script setup lang="ts">
import type { DetailGroupSchema } from '~/components/business'
import { SchemaDetail } from '~/components/business'

const data = ref({
  name: '张三',
  age: 28,
  gender: 'male',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  idCard: '110101199001011234',
  address: '北京市朝阳区某某街道某某小区',
  company: '某某科技有限公司',
  position: '前端开发工程师',
  department: '技术部',
  salary: 15000,
  entryDate: '2020-03-15',
  emergencyContact: '李四',
  emergencyPhone: '13900139000',
  education: '本科',
  school: '某某大学',
  major: '计算机科学与技术',
})

const groups: DetailGroupSchema[] = [
  {
    title: '基本信息',
    key: 'basic',
    column: 3,
    bordered: true,
    items: [
      { key: 'name', label: '姓名' },
      { key: 'age', label: '年龄' },
      {
        key: 'gender',
        label: '性别',
        formatter: value => (value === 'male' ? '男' : '女'),
      },
      { key: 'email', label: '邮箱', copyable: true },
      { key: 'phone', label: '手机号', copyable: true },
      { key: 'idCard', label: '身份证号', copyable: true },
      { key: 'address', label: '地址', span: 3 },
    ],
  },
  {
    title: '工作信息',
    key: 'work',
    column: 2,
    bordered: true,
    collapsible: true,
    defaultExpanded: true,
    items: [
      { key: 'company', label: '公司' },
      { key: 'position', label: '职位' },
      { key: 'department', label: '部门' },
      {
        key: 'salary',
        label: '薪资',
        formatter: value => `¥${value.toLocaleString()}`,
      },
      { key: 'entryDate', label: '入职日期', span: 2 },
    ],
  },
  {
    title: '紧急联系人',
    key: 'emergency',
    column: 2,
    bordered: true,
    collapsible: true,
    defaultExpanded: false,
    items: [
      { key: 'emergencyContact', label: '联系人' },
      { key: 'emergencyPhone', label: '联系电话', copyable: true },
    ],
  },
  {
    title: '教育背景',
    key: 'education',
    column: 3,
    bordered: true,
    items: [
      { key: 'education', label: '学历' },
      { key: 'school', label: '学校' },
      { key: 'major', label: '专业' },
    ],
  },
]
</script>

<template>
  <div class="p-6">
    <a-card title="分组展示">
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
        description="使用 groups 配置将字段分组展示，每个分组可以独立配置列数、边框、折叠等"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaDetail
        :data="data"
        :groups="groups"
        title="员工档案"
      />
    </a-card>
  </div>
</template>
