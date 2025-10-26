<script setup lang="ts">
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'
// 模拟 API 函数
async function fetchUsers(params?: Record<string, any>) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    data: [
      { id: 1, name: '张三', status: 'active' },
      { id: 2, name: '李四', status: 'active' },
      { id: 3, name: '王五', status: 'inactive' },
      { id: 4, name: '赵六', status: 'active' },
    ].filter((user) => {
      if (params?.status) {
        return user.status === params.status
      }
      return true
    }),
  }
}

async function fetchRoles() {
  await new Promise(resolve => setTimeout(resolve, 800))
  return ['管理员', '编辑者', '查看者', '访客']
}

async function fetchDepartments() {
  await new Promise(resolve => setTimeout(resolve, 600))
  return {
    data: [
      { deptId: 'dept1', deptName: '技术部', enabled: true },
      { deptId: 'dept2', deptName: '产品部', enabled: true },
      { deptId: 'dept3', deptName: '市场部', enabled: false },
      { deptId: 'dept4', deptName: '人事部', enabled: true },
    ],
  }
}

// 表单数据
const formData = reactive({
  user: undefined,
  role: undefined,
  department: undefined,
  userWithParams: undefined,
})

// 动态参数
const userParams = ref({ status: 'active' })

// 事件处理
function handleUserChange(_value: any, _option: any) {
  // 用户选择变化
}

function handleLoaded(_data: any[]) {
  // 数据加载完成
}

// 切换参数
function toggleStatus() {
  userParams.value.status = userParams.value.status === 'active' ? 'inactive' : 'active'
}
</script>

<template>
  <div class="p-6 space-y-8">
    <div>
      <h1 class="mb-2 text-2xl font-bold">
        ApiSelect 使用示例
      </h1>
      <p class="text-gray-600">
        ApiSelect 是一个支持异步数据加载的下拉选择组件
      </p>
    </div>

    <!-- 基础用法 -->
    <a-card title="基础用法">
      <p class="mb-4 text-gray-600">
        最简单的用法，传入 API 函数和选项配置
      </p>
      <a-form-item label="选择用户">
        <ApiSelect
          v-model:value="formData.user"
          :api="fetchUsers"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="请选择用户"
          style="width: 300px"
          @change="handleUserChange"
          @loaded="handleLoaded"
        />
      </a-form-item>
      <div class="text-sm text-gray-500">
        选中的值: {{ formData.user }}
      </div>
    </a-card>

    <!-- 简单数组数据 -->
    <a-card title="简单数组数据">
      <p class="mb-4 text-gray-600">
        API 返回简单数组时，会自动转换为选项格式
      </p>
      <a-form-item label="选择角色">
        <ApiSelect
          v-model:value="formData.role"
          :api="fetchRoles"
          placeholder="请选择角色"
          style="width: 300px"
        />
      </a-form-item>
      <div class="text-sm text-gray-500">
        选中的值: {{ formData.role }}
      </div>
    </a-card>

    <!-- 自定义字段映射 -->
    <a-card title="自定义字段映射">
      <p class="mb-4 text-gray-600">
        通过 optionConfig 配置自定义字段名称
      </p>
      <a-form-item label="选择部门">
        <ApiSelect
          v-model:value="formData.department"
          :api="fetchDepartments"
          :option-config="{
            valueField: 'deptId',
            labelField: 'deptName',
            disabledField: 'enabled',
          }"
          :transform="(data: any[]) => data.map((item: any) => ({
            value: item.deptId,
            label: item.deptName,
            disabled: !item.enabled,
          }))"
          placeholder="请选择部门"
          style="width: 300px"
        />
      </a-form-item>
      <div class="text-sm text-gray-500">
        选中的值: {{ formData.department }}
      </div>
    </a-card>

    <!-- 动态参数 -->
    <a-card title="动态参数">
      <p class="mb-4 text-gray-600">
        支持传入动态参数，参数变化时自动重新加载数据
      </p>
      <div class="mb-4">
        <a-button @click="toggleStatus">
          切换状态 (当前: {{ userParams.status }})
        </a-button>
      </div>
      <a-form-item label="选择用户">
        <ApiSelect
          v-model:value="formData.userWithParams"
          :api="fetchUsers"
          :params="userParams"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="请选择用户"
          style="width: 300px"
        />
      </a-form-item>
      <div class="text-sm text-gray-500">
        选中的值: {{ formData.userWithParams }}
      </div>
    </a-card>

    <!-- 手动加载 -->
    <a-card title="手动加载">
      <p class="mb-4 text-gray-600">
        设置 immediate 为 false，手动触发加载
      </p>
      <ManualLoad />
    </a-card>

    <!-- 错误处理 -->
    <a-card title="错误处理">
      <p class="mb-4 text-gray-600">
        API 请求失败时的错误处理
      </p>
      <ErrorHandling />
    </a-card>

    <!-- 自定义渲染 -->
    <a-card title="自定义渲染">
      <p class="mb-4 text-gray-600">
        支持多种方式自定义选项和标签的渲染
      </p>
      <div class="space-y-4">
        <div>
          <h4 class="mb-2 font-semibold">
            支持的自定义方式:
          </h4>
          <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>使用 #option 插槽自定义选项渲染</li>
            <li>使用 tagRender 自定义多选标签</li>
            <li>使用 maxTagPlaceholder 自定义标签折叠显示</li>
            <li>使用 optionRender 函数式渲染</li>
          </ul>
        </div>
        <div>
          <router-link
            to="/select/custom-render"
            class="text-blue-500 hover:underline"
          >
            查看完整自定义渲染示例 →
          </router-link>
        </div>
      </div>
    </a-card>

    <!-- 所有 Select 属性 -->
    <a-card title="支持所有 Select 属性">
      <p class="mb-4 text-gray-600">
        ApiSelect 继承了 Ant Design Vue Select 的所有属性
      </p>
      <AllFeatures />
    </a-card>
  </div>
</template>
