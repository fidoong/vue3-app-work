<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'

async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return ['选项1', '选项2', '选项3', '选项4']
}

const value = ref()
const selectRef = ref()

function handleReload() {
  selectRef.value?.reload()
}
</script>

<template>
  <div>
    <div class="mb-4">
      <a-button
        type="primary"
        @click="handleReload"
      >
        手动加载数据
      </a-button>
    </div>
    <a-form-item label="选择选项">
      <ApiSelect
        ref="selectRef"
        v-model:value="value"
        :api="fetchData"
        :immediate="false"
        placeholder="点击按钮加载数据"
        style="width: 300px"
      />
    </a-form-item>
    <div class="text-sm text-gray-500">
      选中的值: {{ value }}
    </div>
  </div>
</template>
