<script setup lang="ts">
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'
// 简单的 API 函数示例
async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    data: [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ],
  }
}

const userId = ref()
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">
      ApiSelect 简单示例
    </h1>

    <div class="max-w-md">
      <a-form-item label="选择用户">
        <ApiSelect
          v-model:value="userId"
          :api="fetchUsers"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="请选择用户"
          allow-clear
        />
      </a-form-item>

      <div class="mt-4 rounded bg-gray-100 p-4">
        <p class="text-sm text-gray-600">
          选中的值: <strong>{{ userId || '未选择' }}</strong>
        </p>
      </div>

      <div class="mt-4">
        <router-link
          to="/select"
          class="text-blue-500 hover:underline"
        >
          查看完整示例 →
        </router-link>
      </div>
    </div>
  </div>
</template>
