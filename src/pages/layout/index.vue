<script setup lang="ts">
// SchemaLayout 组件较为复杂，需要配合多个子组件使用
// 这里提供一个简单的说明页面
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">
        SchemaLayout 组件示例
      </h1>
      <p class="text-gray-600">
        完整的后台管理布局组件
      </p>
    </div>

    <a-card title="组件说明">
      <a-space
        direction="vertical"
        :size="16"
        style="width: 100%"
      >
        <a-alert
          message="组件已重构"
          description="SchemaLayout 组件已完成重构，类型定义和 composables 已更新到 src/components/business/SchemaLayout/"
          type="success"
          show-icon
        />

        <a-descriptions
          title="主要功能"
          bordered
        >
          <a-descriptions-item label="侧边栏">
            支持折叠、固定、自定义宽度
          </a-descriptions-item>
          <a-descriptions-item label="头部">
            支持固定、面包屑、用户信息
          </a-descriptions-item>
          <a-descriptions-item label="标签页">
            支持多标签页、关闭、刷新
          </a-descriptions-item>
          <a-descriptions-item label="主题">
            支持亮色/暗色主题切换
          </a-descriptions-item>
        </a-descriptions>

        <a-alert
          message="使用说明"
          description="请参考 src/components/EXAMPLES.md 查看详细使用示例，或查看 src/composables/useLayoutConfig.ts 了解配置方式"
          type="info"
          show-icon
        />

        <div>
          <h3 class="mb-2 text-lg font-semibold">
            快速开始
          </h3>
          <pre class="rounded bg-gray-100 p-4">
            <code>import { SchemaLayout } from '~/components/business/SchemaLayout'
import type { MenuItemSchema, UserInfo } from '~/components/business/SchemaLayout/types'

// 配置菜单和用户信息
const menuItems: MenuItemSchema[] = [...]
const userInfo: UserInfo = {...}

// 使用组件
&lt;SchemaLayout
  :menu-items="menuItems"
  :user-info="userInfo"
  @logout="handleLogout"
/&gt;   </code>
        </pre>
        </div>
      </a-space>
    </a-card>
  </div>
</template>
