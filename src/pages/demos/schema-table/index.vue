<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础表格',
    description: '基本的表格使用示例',
    path: '/demos/schema-table/basic',
    icon: 'i-carbon-table',
  },
  {
    title: 'API 数据',
    description: '从 API 加载数据的表格',
    path: '/demos/schema-table/api',
    icon: 'i-carbon-cloud-upload',
  },
  {
    title: '工具栏',
    description: '工具栏配置和批量操作',
    path: '/demos/schema-table/toolbar',
    icon: 'i-carbon-toolbar',
  },
  {
    title: '操作列',
    description: '包含操作按钮的表格',
    path: '/demos/schema-table/actions',
    icon: 'i-carbon-settings',
  },
  {
    title: '高级功能',
    description: '排序、筛选、展开等高级功能',
    path: '/demos/schema-table/advanced',
    icon: 'i-carbon-filter',
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <div class="header">
      <h1>SchemaTable 表格组件</h1>
      <p>基于配置的表格组件，支持 API 数据加载、分页、排序等功能</p>
    </div>

    <a-card title="示例列表">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <a-card
          v-for="demo in demos"
          :key="demo.path"
          hoverable
          class="demo-item"
          @click="navigateTo(demo.path)"
        >
          <div class="flex items-start gap-4">
            <div class="demo-icon">
              <span :class="demo.icon" />
            </div>
            <div class="flex-1">
              <h3 class="demo-title">
                {{ demo.title }}
              </h3>
              <p class="demo-description">
                {{ demo.description }}
              </p>
            </div>
            <span class="i-carbon-arrow-right text-gray-400" />
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.header p {
  color: #666;
  font-size: 14px;
}

.demo-item {
  cursor: pointer;
  transition: all 0.3s;
}

.demo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.demo-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
