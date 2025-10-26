<script setup lang="ts">
interface Props {
  data: string
  close?: (result?: any) => void
  confirm?: (result?: any) => void
  cancel?: (result?: any) => void
}

const props = defineProps<Props>()

const loading = ref(true)
const asyncData = ref<any>(null)

/**
 * 模拟异步加载数据
 */
async function loadData() {
  loading.value = true
  try {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    asyncData.value = {
      title: '异步加载的数据',
      content: props.data,
      items: [
        { id: 1, name: '项目 1' },
        { id: 2, name: '项目 2' },
        { id: 3, name: '项目 3' },
      ],
      timestamp: new Date().toLocaleString(),
    }
  }
  finally {
    loading.value = false
  }
}

/**
 * 确认
 */
function handleConfirm() {
  props.confirm?.(asyncData.value)
}

/**
 * 取消
 */
function handleCancel() {
  props.cancel?.()
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="async-modal">
    <a-spin
      :spinning="loading"
      tip="加载中..."
    >
      <div
        v-if="asyncData"
        class="min-h-200px"
      >
        <a-descriptions
          title="异步数据"
          bordered
          :column="1"
        >
          <a-descriptions-item label="标题">
            {{ asyncData.title }}
          </a-descriptions-item>
          <a-descriptions-item label="内容">
            {{ asyncData.content }}
          </a-descriptions-item>
          <a-descriptions-item label="加载时间">
            {{ asyncData.timestamp }}
          </a-descriptions-item>
        </a-descriptions>

        <a-divider />

        <h4 class="mb-3">
          数据列表
        </h4>
        <a-list
          :data-source="asyncData.items"
          bordered
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta
                :title="item.name"
                :description="`ID: ${item.id}`"
              />
            </a-list-item>
          </template>
        </a-list>
      </div>
      <div
        v-else
        class="min-h-200px"
      />
    </a-spin>

    <div class="mt-6 flex justify-end gap-2">
      <a-button @click="handleCancel">
        取消
      </a-button>
      <a-button
        type="primary"
        :disabled="loading"
        @click="handleConfirm"
      >
        确定
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.async-modal {
  padding: 8px 0;
}
</style>
