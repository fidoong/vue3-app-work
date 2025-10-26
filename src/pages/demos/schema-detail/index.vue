<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础用法',
    description: '基本的详情展示',
    path: '/demos/schema-detail/basic',
    icon: 'i-carbon-document',
  },
  {
    title: '分组展示',
    description: '将字段分组展示',
    path: '/demos/schema-detail/groups',
    icon: 'i-carbon-group',
  },
  {
    title: '自定义渲染',
    description: '使用 render 函数和插槽自定义渲染',
    path: '/demos/schema-detail/custom',
    icon: 'i-carbon-paint-brush',
  },
  {
    title: '列数控制',
    description: '控制每行显示的列数',
    path: '/demos/schema-detail/columns',
    icon: 'i-carbon-column',
  },
  {
    title: '高级功能',
    description: '复制、图标、条件显示等功能',
    path: '/demos/schema-detail/advanced',
    icon: 'i-carbon-settings',
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <div class="header">
      <h1>SchemaDetail 详情组件</h1>
      <p>基于配置的详情展示组件，支持列数控制、自定义渲染、分组展示等功能</p>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
