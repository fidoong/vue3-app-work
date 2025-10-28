<script setup lang="ts">
import type { BreadcrumbItem } from '../types.ts'

interface LayoutBreadcrumbProps {
  breadcrumbs: BreadcrumbItem[]
}

defineProps<LayoutBreadcrumbProps>()
</script>

<template>
  <div class="breadcrumb-container">
    <a-breadcrumb class="layout-breadcrumb">
      <a-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.path || item.title"
      >
        <router-link
          v-if="item.path"
          :to="item.path"
          class="breadcrumb-link"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="breadcrumb-icon"
          />
          {{ item.title }}
        </router-link>
        <span
          v-else
          class="breadcrumb-text"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="breadcrumb-icon"
          />
          {{ item.title }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.layout-breadcrumb {
  margin: 0;
  display: flex;
  align-items: center;

  :deep(li) {
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
    bottom: auto !important;
  }

  :deep(.ant-breadcrumb-separator) {
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
  }
}

.breadcrumb-link,
.breadcrumb-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-icon {
  font-size: 14px;
}
</style>
