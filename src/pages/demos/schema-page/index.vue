<script setup lang="ts">
const router = useRouter()

const demos = [
  {
    title: '基础用法',
    description: '展示 SchemaPage 的基本使用，包括搜索、表格、CRUD 操作',
    path: '/demos/schema-page/basic',
    icon: 'i-carbon-application',
    features: ['搜索表单', '数据表格', '工具栏操作', '行操作', '批量操作'],
  },
  {
    title: '自定义渲染',
    description: '展示如何使用自定义渲染函数实现丰富的表格展示效果',
    path: '/demos/schema-page/custom-render',
    icon: 'i-carbon-paint-brush',
    features: ['图片渲染', '复合内容', '自定义样式', '组件渲染'],
  },
]

function navigateTo(path: string) {
  router.push(path)
}

function goBack() {
  router.push('/demos')
}
</script>

<template>
  <div class="demo-page">
    <div class="page-header">
      <a-button
        type="text"
        @click="goBack"
      >
        <span class="i-carbon-arrow-left mr-2" />
        返回
      </a-button>
      <div class="header-content">
        <div class="header-icon">
          <span class="i-carbon-application" />
        </div>
        <div>
          <h1 class="page-title">
            SchemaPage 示例
          </h1>
          <p class="page-description">
            完整的 CRUD 页面组件，集成搜索表单、数据表格和弹窗操作
          </p>
        </div>
      </div>
    </div>

    <a-card title="组件特性">
      <a-row :gutter="[16, 16]">
        <a-col :span="6">
          <div class="feature-item">
            <span class="i-carbon-search text-2xl text-blue-500" />
            <div class="ml-3">
              <div class="font-semibold">
                搜索表单
              </div>
              <div class="text-sm text-gray-500">
                集成 SearchForm 组件
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="feature-item">
            <span class="i-carbon-table text-2xl text-green-500" />
            <div class="ml-3">
              <div class="font-semibold">
                数据表格
              </div>
              <div class="text-sm text-gray-500">
                集成 SchemaTable 组件
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="feature-item">
            <span class="i-carbon-popup text-2xl text-purple-500" />
            <div class="ml-3">
              <div class="font-semibold">
                函数式弹窗
              </div>
              <div class="text-sm text-gray-500">
                使用 globalModal 打开弹窗
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="feature-item">
            <span class="i-carbon-settings text-2xl text-orange-500" />
            <div class="ml-3">
              <div class="font-semibold">
                灵活配置
              </div>
              <div class="text-sm text-gray-500">
                支持自定义操作和组件
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      title="示例列表"
      class="mt-6"
    >
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <a-card
          v-for="demo in demos"
          :key="demo.path"
          hoverable
          class="demo-card"
          @click="navigateTo(demo.path)"
        >
          <div class="demo-header">
            <div class="demo-icon">
              <span :class="demo.icon" />
            </div>
            <h3 class="demo-title">
              {{ demo.title }}
            </h3>
          </div>
          <p class="demo-description">
            {{ demo.description }}
          </p>
          <div class="demo-features">
            <a-tag
              v-for="feature in demo.features"
              :key="feature"
              color="blue"
            >
              {{ feature }}
            </a-tag>
          </div>
          <div class="demo-footer">
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
      title="核心功能"
      class="mt-6"
    >
      <a-descriptions bordered>
        <a-descriptions-item label="搜索功能">
          支持配置搜索表单，自动集成展开收起功能
        </a-descriptions-item>
        <a-descriptions-item label="表格展示">
          基于 SchemaTable 组件，支持分页、排序、筛选等功能
        </a-descriptions-item>
        <a-descriptions-item label="工具栏操作">
          支持配置页面级操作按钮，如新增、导出等
        </a-descriptions-item>
        <a-descriptions-item label="行操作">
          支持配置每行的操作按钮，如编辑、删除、查看等
        </a-descriptions-item>
        <a-descriptions-item label="弹窗操作">
          使用函数式弹窗，支持表单弹窗和自定义组件弹窗
        </a-descriptions-item>
        <a-descriptions-item label="自动刷新">
          操作完成后自动刷新数据，无需手动处理
        </a-descriptions-item>
        <a-descriptions-item label="确认提示">
          支持操作前确认提示，避免误操作
        </a-descriptions-item>
        <a-descriptions-item label="类型安全">
          完整的 TypeScript 类型定义，开发体验更好
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="使用场景"
      class="mt-6"
    >
      <a-list
        :data-source="[
          '用户管理页面',
          '商品管理页面',
          '订单管理页面',
          '文章管理页面',
          '权限管理页面',
          '配置管理页面',
        ]"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <span class="i-carbon-checkmark-filled mr-2 text-green-500" />
            {{ item }}
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<style scoped>
.demo-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
}

.header-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.page-description {
  font-size: 16px;
  color: #666;
  margin: 8px 0 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  background: #fafafa;
  height: 100%;
}

.demo-card {
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.demo-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.demo-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.6;
}

.demo-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.demo-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 12px;
}
</style>
