<script setup lang="ts">
const router = useRouter()

const components = [
  {
    title: 'SchemaForm',
    description: '基于配置的表单组件，快速构建复杂表单',
    path: '/demos/schema-form',
    icon: 'i-carbon-document',
    color: 'blue',
    count: 6,
  },
  {
    title: 'SearchForm',
    description: '搜索表单组件，支持展开收起',
    path: '/demos/search-form',
    icon: 'i-carbon-search',
    color: 'green',
    count: 4,
    disabled: false,
  },
  {
    title: 'SchemaTable',
    description: '基于配置的表格组件',
    path: '/demos/schema-table',
    icon: 'i-carbon-table',
    color: 'purple',
    count: 5,
    disabled: false,
  },
  {
    title: 'SchemaPage',
    description: '完整的 CRUD 页面组件，集成搜索、表格和弹窗',
    path: '/demos/schema-page',
    icon: 'i-carbon-application',
    color: 'indigo',
    count: 1,
    disabled: false,
  },
  {
    title: 'SchemaLayout',
    description: '后台布局组件',
    path: '/demos/schema-layout',
    icon: 'i-carbon-layout',
    color: 'orange',
    count: 0,
    disabled: true,
  },
  {
    title: 'SchemaMenu',
    description: '菜单组件',
    path: '/demos/schema-menu',
    icon: 'i-carbon-menu',
    color: 'cyan',
    count: 0,
    disabled: true,
  },
  {
    title: 'BaseModal',
    description: '基础弹窗组件',
    path: '/demos/base-modal',
    icon: 'i-carbon-popup',
    color: 'red',
    count: 4,
    disabled: false,
  },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="demo-container">
    <div class="hero-section">
      <h1 class="hero-title">
        组件示例中心
      </h1>
      <p class="hero-description">
        探索所有业务组件的详细使用示例和最佳实践
      </p>
    </div>

    <a-card
      title="业务组件"
      class="demo-card"
    >
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        <a-card
          v-for="component in components"
          :key="component.path"
          :hoverable="!component.disabled"
          class="component-card"
          :class="{ 'component-card-disabled': component.disabled }"
          @click="!component.disabled && navigateTo(component.path)"
        >
          <div class="component-header">
            <div
              class="component-icon"
              :style="{ background: `var(--ant-${component.color}-6)` }"
            >
              <span :class="component.icon" />
            </div>
            <a-badge
              v-if="component.count > 0"
              :count="component.count"
              :number-style="{ backgroundColor: `var(--ant-${component.color}-6)` }"
            />
            <a-tag
              v-if="component.disabled"
              color="default"
            >
              即将推出
            </a-tag>
          </div>
          <h3 class="component-title">
            {{ component.title }}
          </h3>
          <p class="component-description">
            {{ component.description }}
          </p>
          <div
            v-if="!component.disabled"
            class="component-footer"
          >
            <a-button
              type="link"
              size="small"
            >
              查看示例
              <span class="i-carbon-arrow-right ml-1" />
            </a-button>
          </div>
        </a-card>
      </div>
    </a-card>

    <a-card
      title="快速导航"
      class="demo-card mt-6"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <div class="nav-item">
            <span class="i-carbon-document text-2xl text-blue-500" />
            <div class="ml-3">
              <div class="font-semibold">
                组件文档
              </div>
              <div class="text-sm text-gray-500">
                查看完整的组件 API 文档
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="nav-item">
            <span class="i-carbon-code text-2xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                源码查看
              </div>
              <div class="text-sm text-gray-500">
                在 GitHub 上查看源代码
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="nav-item">
            <span class="i-carbon-help text-2xl text-orange-500" />
            <div class="ml-3">
              <div class="font-semibold">
                常见问题
              </div>
              <div class="text-sm text-gray-500">
                查看常见问题和解决方案
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 32px;
  color: white;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-description {
  font-size: 20px;
  opacity: 0.9;
}

.demo-card {
  margin-bottom: 16px;
}

.component-card {
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
}

.component-card:hover:not(.component-card-disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.component-card-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.component-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.component-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.component-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
  min-height: 40px;
}

.component-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 12px;
}

.nav-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s;
  cursor: pointer;
}

.nav-item:hover {
  background: #f0f0f0;
  transform: translateX(4px);
}
</style>
