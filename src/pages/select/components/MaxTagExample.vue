<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'

async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
  }))
}

const selectedUsers = ref([])

// 自定义超出标签的显示
function maxTagPlaceholder(omittedValues: any[]) {
  return `+${omittedValues.length} 更多...`
}
</script>

<template>
  <a-form-item label="选择用户">
    <ApiSelect
      v-model:value="selectedUsers"
      :api="fetchUsers"
      :option-config="{
        valueField: 'id',
        labelField: 'name',
      }"
      mode="multiple"
      :max-tag-count="3"
      :max-tag-placeholder="maxTagPlaceholder"
      placeholder="可以选择多个用户"
      style="width: 100%"
    />
  </a-form-item>
  <div class="text-sm text-gray-500">
    已选择: {{ selectedUsers.length }} 个用户
  </div>
</template>
