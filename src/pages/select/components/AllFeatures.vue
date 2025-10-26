<script setup lang="ts">
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'

async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 800))
  return {
    data: [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' },
      { id: 3, name: '王五', email: 'wangwu@example.com' },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
      { id: 5, name: '钱七', email: 'qianqi@example.com' },
    ],
  }
}

const formData = reactive({
  single: undefined,
  multiple: [],
  searchable: undefined,
  allowClear: undefined,
})
</script>

<template>
  <div class="space-y-4">
    <!-- 多选 -->
    <a-form-item label="多选模式">
      <ApiSelect
        v-model:value="formData.multiple"
        :api="fetchUsers"
        :option-config="{
          valueField: 'id',
          labelField: 'name',
        }"
        mode="multiple"
        placeholder="可以选择多个用户"
        style="width: 100%"
      />
      <div class="mt-2 text-sm text-gray-500">
        选中的值: {{ formData.multiple }}
      </div>
    </a-form-item>

    <!-- 可搜索 -->
    <a-form-item label="可搜索">
      <ApiSelect
        v-model:value="formData.searchable"
        :api="fetchUsers"
        :option-config="{
          valueField: 'id',
          labelField: 'name',
        }"
        show-search
        :filter-option="(input: string, option: any) => {
          return option.label.toLowerCase().includes(input.toLowerCase())
        }"
        placeholder="输入关键字搜索"
        style="width: 300px"
      />
    </a-form-item>

    <!-- 可清除 -->
    <a-form-item label="可清除">
      <ApiSelect
        v-model:value="formData.allowClear"
        :api="fetchUsers"
        :option-config="{
          valueField: 'id',
          labelField: 'name',
        }"
        allow-clear
        placeholder="可以清除选择"
        style="width: 300px"
      />
    </a-form-item>

    <!-- 自定义选项渲染 -->
    <a-form-item label="自定义选项">
      <ApiSelect
        v-model:value="formData.single"
        :api="fetchUsers"
        :option-config="{
          valueField: 'id',
          labelField: 'name',
        }"
        placeholder="自定义选项显示"
        style="width: 300px"
      >
        <template #option="slotProps: any">
          <div class="flex items-center justify-between">
            <span>{{ slotProps.label }}</span>
            <span class="text-xs text-gray-400">{{ slotProps.email }}</span>
          </div>
        </template>
      </ApiSelect>
    </a-form-item>
  </div>
</template>
