<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础用法',
    description: '基本的弹窗使用示例',
    path: '/demos/base-modal/basic',
    icon: 'i-carbon-popup',
  },
  {
    title: '异步加载',
    description: '异步加载弹窗组件',
    path: '/demos/base-modal/async',
    icon: 'i-carbon-cloud-upload',
  },
  {
    title: '嵌套弹窗',
    description: '在弹窗内打开新弹窗',
    path: '/demos/base-modal/nested',
    icon: 'i-carbon-layers',
  },
  {
    title: '表单弹窗',
    description: '包含表单的弹窗示例',
    path: '/demos/base-modal/form',
    icon: 'i-carbon-document',
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <div class="header">
      <h1>BaseModal 弹窗组件</h1>
      <p>函数式调用的弹窗组件，支持同步/异步加载、嵌套弹窗等功能</p>
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

<style scoped>
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
