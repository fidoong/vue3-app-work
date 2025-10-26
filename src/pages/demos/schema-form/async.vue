<script setup lang="ts">
import type { FormItemSchema } from '~/components/shared/types'
import { Input, message, Select } from 'ant-design-vue'
import { SchemaForm } from '~/components/business/SchemaForm'

const formRef = ref()
const formData = ref<Record<string, any>>({})
const loading = ref(false)

// 模拟 API 请求
const mockApi = {
  getProvinces: () => {
    return new Promise<Array<{ label: string, value: string }>>((resolve) => {
      setTimeout(() => {
        resolve([
          { label: '北京市', value: 'beijing' },
          { label: '上海市', value: 'shanghai' },
          { label: '广东省', value: 'guangdong' },
          { label: '浙江省', value: 'zhejiang' },
        ])
      }, 1000)
    })
  },
  getCities: (province: string) => {
    return new Promise<Array<{ label: string, value: string }>>((resolve) => {
      setTimeout(() => {
        const cityMap: Record<string, Array<{ label: string, value: string }>> = {
          beijing: [{ label: '北京市', value: 'beijing' }],
          shanghai: [{ label: '上海市', value: 'shanghai' }],
          guangdong: [
            { label: '广州市', value: 'guangzhou' },
            { label: '深圳市', value: 'shenzhen' },
            { label: '东莞市', value: 'dongguan' },
          ],
          zhejiang: [
            { label: '杭州市', value: 'hangzhou' },
            { label: '宁波市', value: 'ningbo' },
            { label: '温州市', value: 'wenzhou' },
          ],
        }
        resolve(cityMap[province] || [])
      }, 800)
    })
  },
  getDepartments: () => {
    return new Promise<Array<{ label: string, value: string }>>((resolve) => {
      setTimeout(() => {
        resolve([
          { label: '技术部', value: 'tech' },
          { label: '产品部', value: 'product' },
          { label: '运营部', value: 'operation' },
          { label: '市场部', value: 'marketing' },
        ])
      }, 1000)
    })
  },
}

const provinces = ref<Array<{ label: string, value: string }>>([])
const cities = ref<Array<{ label: string, value: string }>>([])
const departments = ref<Array<{ label: string, value: string }>>([])
const loadingProvinces = ref(false)
const loadingCities = ref(false)
const loadingDepartments = ref(false)

const schemas = computed<FormItemSchema[]>(() => [
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
    field: 'department',
    label: '部门',
    component: Select,
    required: true,
    rules: [{ required: true, message: '请选择部门' }],
    componentProps: {
      placeholder: '请选择部门',
      options: departments.value,
      loading: loadingDepartments.value,
    },
    colProps: { span: 24 },
  },
  {
    field: 'province',
    label: '省份',
    component: Select,
    required: true,
    rules: [{ required: true, message: '请选择省份' }],
    componentProps: {
      placeholder: '请选择省份',
      options: provinces.value,
      loading: loadingProvinces.value,
      onChange: handleProvinceChange,
    },
    colProps: { span: 24 },
  },
  {
    field: 'city',
    label: '城市',
    component: Select,
    required: true,
    rules: [{ required: true, message: '请选择城市' }],
    componentProps: {
      placeholder: '请选择城市',
      options: cities.value,
      loading: loadingCities.value,
      disabled: !formData.value.province,
    },
    colProps: { span: 24 },
  },
  {
    field: 'address',
    label: '详细地址',
    component: Input.TextArea,
    componentProps: {
      placeholder: '请输入详细地址',
      rows: 3,
    },
    colProps: { span: 24 },
  },
])

async function handleProvinceChange(value: string) {
  formRef.value?.setFieldValue('city', undefined)
  cities.value = []

  if (value) {
    loadingCities.value = true
    try {
      cities.value = await mockApi.getCities(value)
    }
    finally {
      loadingCities.value = false
    }
  }
}

async function loadInitialData() {
  loading.value = true
  try {
    // 并行加载省份和部门数据
    const [provincesData, departmentsData] = await Promise.all([
      mockApi.getProvinces(),
      mockApi.getDepartments(),
    ])
    provinces.value = provincesData
    departments.value = departmentsData
  }
  catch (error) {
    message.error('加载数据失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function handleSubmit(_values: Record<string, any>) {
  message.success('提交成功！')
}

onMounted(() => {
  loadInitialData()
})
</script>

<template>
  <div class="demo-container">
    <a-card
      title="异步数据表单"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="red">
          异步加载
        </a-tag>
      </template>

      <a-alert
        message="表单选项数据来自 API 接口，支持级联选择和动态加载"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-spin
        :spinning="loading"
        tip="加载中..."
      >
        <SchemaForm
          ref="formRef"
          v-model="formData"
          :schemas="schemas"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          @submit="handleSubmit"
        >
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
      </a-spin>
    </a-card>

    <a-card
      title="表单数据"
      class="demo-card mt-4"
    >
      <pre>{{ formData }}</pre>
    </a-card>

    <a-card
      title="实现说明"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <h4>功能特性：</h4>
        <ul>
          <li>页面加载时异步获取省份和部门数据</li>
          <li>选择省份后动态加载对应的城市数据</li>
          <li>城市选择器在未选择省份时禁用</li>
          <li>显示加载状态提示用户</li>
        </ul>

        <h4 class="mt-4">
          关键代码：
        </h4>
        <pre><code>// 级联选择处理
async function handleProvinceChange(value: string) {
  // 清空城市选择
  formRef.value?.setFieldValue('city', undefined)
  cities.value = []

  if (value) {
    loadingCities.value = true
    try {
      cities.value = await mockApi.getCities(value)
    } finally {
      loadingCities.value = false
    }
  }
}

// Schema 配置
{
  field: 'province',
  component: 'Select',
  componentProps: {
    options: provinces.value,
    loading: loadingProvinces.value,
    onChange: handleProvinceChange,  // 监听变化
  },
}</code></pre>
      </a-typography-paragraph>
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

h4 {
  font-weight: 600;
  margin-bottom: 8px;
}

ul {
  margin-left: 20px;
}

li {
  margin-bottom: 4px;
}
</style>
