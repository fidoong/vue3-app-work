<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础用法',
    description: '单行和多行文本超出显示',
    path: '/demos/text-ellipsis/basic',
    icon: 'i-carbon-text-align-left',
  },
  {
    title: 'Tooltip 配置',
    description: '自定义 tooltip 位置和样式',
    path: '/demos/text-ellipsis/tooltip',
    icon: 'i-carbon-information',
  },
  {
    title: '表格中使用',
    description: '在表格单元格中使用文本超出',
    path: '/demos/text-ellipsis/table',
    icon: 'i-carbon-table',
  },
  {
    title: '实例方法',
    description: '使用组件暴露的方法',
    path: '/demos/text-ellipsis/methods',
    icon: 'i-carbon-code',
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <div class="header">
      <h1>TextEllipsis 文本超出组件</h1>
      <p>支持单行/多行文本超出显示 tooltip，自动检测文本是否超出</p>
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
