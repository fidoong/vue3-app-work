<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FeatureCard {
  title: string
  description: string
  icon: string
  path: string
  color: string
  category: 'base' | 'business'
}

const baseComponents = ref<FeatureCard[]>([
  {
    title: 'ApiSelect',
    description: '支持 API 数据源的下拉选择组件',
    icon: '📋',
    path: '/base/api-select',
    color: '#1890ff',
    category: 'base',
  },
  {
    title: 'ApiCascader',
    description: '支持 API 数据源的级联选择组件',
    icon: '🔗',
    path: '/base/api-cascader',
    color: '#52c41a',
    category: 'base',
  },
  {
    title: 'ApiTreeSelect',
    description: '支持 API 数据源的树形选择组件',
    icon: '🌲',
    path: '/base/api-tree-select',
    color: '#faad14',
    category: 'base',
  },
  {
    title: 'ApiCheckboxGroup',
    description: '支持 API 数据源的多选框组',
    icon: '☑️',
    path: '/base/api-checkbox-group',
    color: '#13c2c2',
    category: 'base',
  },
  {
    title: 'ApiRadioGroup',
    description: '支持 API 数据源的单选框组',
    icon: '🔘',
    path: '/base/api-radio-group',
    color: '#722ed1',
    category: 'base',
  },
  {
    title: 'BaseModal',
    description: '服务式弹窗组件',
    icon: '💬',
    path: '/base/base-modal',
    color: '#eb2f96',
    category: 'base',
  },
])

const businessComponents = ref<FeatureCard[]>([
  {
    title: 'SchemaForm',
    description: '基于 Schema 配置的动态表单',
    icon: '📝',
    path: '/business/schema-form',
    color: '#1890ff',
    category: 'business',
  },
  {
    title: 'SchemaTable',
    description: '功能强大的数据表格组件',
    icon: '📊',
    path: '/business/schema-table',
    color: '#52c41a',
    category: 'business',
  },
  {
    title: 'SearchForm',
    description: '可折叠的搜索表单组件',
    icon: '🔍',
    path: '/business/search-form',
    color: '#faad14',
    category: 'business',
  },
  {
    title: 'SchemaLayout',
    description: '企业级后台布局组件',
    icon: '🏗️',
    path: '/business/schema-layout',
    color: '#13c2c2',
    category: 'business',
  },
  {
    title: 'SchemaMenu',
    description: '基于配置的菜单组件',
    icon: '📑',
    path: '/business/schema-menu',
    color: '#722ed1',
    category: 'business',
  },
])

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Vue3 企业级组件库
        </h1>
        <p class="hero-description">
          基于 Vue 3 + TypeScript + Ant Design Vue 构建的企业级组件库
        </p>
        <p class="hero-subtitle">
          提供丰富的业务组件和基础组件，帮助你快速构建企业级应用
        </p>
        <div class="hero-actions">
          <a-button
            type="primary"
            size="large"
            @click="navigateTo('/base/api-select')"
          >
            开始使用
          </a-button>
          <a-button
            size="large"
            @click="navigateTo('/business/schema-form')"
          >
            查看示例
          </a-button>
        </div>
      </div>
    </div>

    <!-- Base Components Section -->
    <div class="features-section">
      <h2 class="section-title">
        基础组件
      </h2>
      <p class="section-subtitle">
        支持 API 数据源的表单组件，自动处理数据加载和错误状态
      </p>
      <a-row :gutter="[24, 24]">
        <a-col
          v-for="feature in baseComponents"
          :key="feature.path"
          :xs="24"
          :sm="12"
          :lg="8"
        >
          <a-card
            hoverable
            class="feature-card"
            @click="navigateTo(feature.path)"
          >
            <div
              class="feature-icon"
              :style="{ backgroundColor: `${feature.color}20` }"
            >
              <span class="icon-emoji">{{ feature.icon }}</span>
            </div>
            <h3 class="feature-title">
              {{ feature.title }}
            </h3>
            <p class="feature-description">
              {{ feature.description }}
            </p>
            <a-button
              type="link"
              class="feature-link"
            >
              查看详情 →
            </a-button>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- Business Components Section -->
    <div class="features-section business-section">
      <h2 class="section-title">
        业务组件
      </h2>
      <p class="section-subtitle">
        基于 Schema 配置的业务组件，快速构建企业级应用
      </p>
      <a-row :gutter="[24, 24]">
        <a-col
          v-for="feature in businessComponents"
          :key="feature.path"
          :xs="24"
          :sm="12"
          :lg="8"
        >
          <a-card
            hoverable
            class="feature-card"
            @click="navigateTo(feature.path)"
          >
            <div
              class="feature-icon"
              :style="{ backgroundColor: `${feature.color}20` }"
            >
              <span class="icon-emoji">{{ feature.icon }}</span>
            </div>
            <h3 class="feature-title">
              {{ feature.title }}
            </h3>
            <p class="feature-description">
              {{ feature.description }}
            </p>
            <a-button
              type="link"
              class="feature-link"
            >
              查看详情 →
            </a-button>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- Highlights Section -->
    <div class="highlights-section">
      <h2 class="section-title">
        技术特性
      </h2>
      <a-row :gutter="[24, 24]">
        <a-col
          :xs="24"
          :sm="12"
          :lg="6"
        >
          <div class="highlight-item">
            <div class="highlight-icon">
              ⚡
            </div>
            <h4>高性能</h4>
            <p>基于 Vue 3 Composition API，性能更优</p>
          </div>
        </a-col>
        <a-col
          :xs="24"
          :sm="12"
          :lg="6"
        >
          <div class="highlight-item">
            <div class="highlight-icon">
              🎯
            </div>
            <h4>类型安全</h4>
            <p>完整的 TypeScript 类型定义</p>
          </div>
        </a-col>
        <a-col
          :xs="24"
          :sm="12"
          :lg="6"
        >
          <div class="highlight-item">
            <div class="highlight-icon">
              🎨
            </div>
            <h4>主题定制</h4>
            <p>支持亮色/暗色主题切换</p>
          </div>
        </a-col>
        <a-col
          :xs="24"
          :sm="12"
          :lg="6"
        >
          <div class="highlight-item">
            <div class="highlight-icon">
              📱
            </div>
            <h4>响应式</h4>
            <p>完美适配各种屏幕尺寸</p>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--color-bg-container) 0%, var(--color-bg-layout) 100%);
}

/* Hero Section */
.hero-section {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hero-description {
  font-size: 20px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.95);
}

.hero-subtitle {
  font-size: 16px;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.85);
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* Features Section */
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.business-section {
  background-color: var(--color-bg-container);
  border-radius: var(--border-radius-xl);
  padding: 60px 24px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text-primary);
}

.section-subtitle {
  text-align: center;
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 48px;
}

.feature-card {
  height: 100%;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-base) var(--ease-in-out);
  cursor: pointer;
  border: 1px solid var(--color-border-secondary);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.icon-emoji {
  font-size: 32px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text-primary);
}

.feature-description {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.feature-link {
  padding: 0;
  font-weight: 500;
}

/* Highlights Section */
.highlights-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  background-color: var(--color-bg-container);
  border-radius: var(--border-radius-xl);
}

.highlight-item {
  text-align: center;
  padding: 24px;
}

.highlight-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.highlight-item h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}

.highlight-item p {
  color: var(--color-text-secondary);
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
