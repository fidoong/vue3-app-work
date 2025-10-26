<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'

async function fetchDataWithError() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  throw new Error('模拟 API 请求失败')
}

const value = ref()
const errorMessage = ref('')

function handleError(error: Error) {
  errorMessage.value = error.message
}
</script>

<template>
  <div>
    <a-form-item label="选择选项">
      <ApiSelect
        v-model:value="value"
        :api="fetchDataWithError"
        placeholder="这个请求会失败"
        style="width: 300px"
        @error="handleError"
      />
    </a-form-item>
    <a-alert
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      show-icon
      closable
      @close="errorMessage = ''"
    />
  </div>
</template>
