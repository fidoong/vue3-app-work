<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'

async function fetchTags() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: 1, name: 'Vue', color: '#42b883' },
    { id: 2, name: 'React', color: '#61dafb' },
    { id: 3, name: 'Angular', color: '#dd0031' },
    { id: 4, name: 'Svelte', color: '#ff3e00' },
    { id: 5, name: 'TypeScript', color: '#3178c6' },
  ]
}

const selectedTags = ref([])

// 自定义标签渲染
function customTagRender({ label, closable, onClose, option }: any) {
  return h(
    'span',
    {
      class: 'inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs mr-1',
      style: {
        backgroundColor: option.color || '#1890ff',
      },
    },
    [
      label,
      closable
        ? h(CloseOutlined, {
            class: 'cursor-pointer hover:opacity-70',
            onClick: onClose,
          })
        : null,
    ],
  )
}
</script>

<template>
  <a-form-item label="选择技术栈">
    <ApiSelect
      v-model:value="selectedTags"
      :api="fetchTags"
      :option-config="{
        valueField: 'id',
        labelField: 'name',
      }"
      mode="multiple"
      :tag-render="customTagRender"
      placeholder="选择你喜欢的技术"
      style="width: 100%"
    >
      <template #option="{ label, color }">
        <div class="flex items-center gap-2">
          <span
            class="h-3 w-3 rounded-full"
            :style="{ backgroundColor: color }"
          />
          <span>{{ label }}</span>
        </div>
      </template>
    </ApiSelect>
  </a-form-item>
  <div class="text-sm text-gray-500">
    已选择: {{ selectedTags.length }} 项
  </div>
</template>
