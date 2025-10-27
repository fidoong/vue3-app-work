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

<style scoped lang="scss">
@use './index.scss';
</style>
