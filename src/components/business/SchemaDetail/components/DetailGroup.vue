<script setup lang="ts">
import type { DetailGroupSchema } from '../types'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { getItemSpan } from '../composables'
import DetailItem from './DetailItem.vue'

interface Props {
  group: DetailGroupSchema
  data: Record<string, any>
  labelWidth?: number | string
  labelAlign?: 'left' | 'right' | 'center'
  contentAlign?: 'left' | 'right' | 'center'
  colon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelAlign: 'left',
  contentAlign: 'left',
  colon: true,
})

const emit = defineEmits<{
  copy: [field: string, value: any]
}>()

// 展开状态
const expanded = ref(props.group.defaultExpanded ?? true)

// 切换展开
function toggleExpanded() {
  if (props.group.collapsible) {
    expanded.value = !expanded.value
  }
}

// 列数
const column = computed(() => props.group.column ?? 3)

// 网格样式
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${column.value}, 1fr)`,
  gap: '0 16px',
}))
</script>

<template>
  <div
    class="detail-group"
    :class="[
      group.className,
      { 'detail-group-bordered': group.bordered },
    ]"
    :style="group.style"
  >
    <!-- 分组标题 -->
    <div
      v-if="group.title"
      class="detail-group-header"
      :class="{ 'detail-group-header-collapsible': group.collapsible }"
      @click="toggleExpanded"
    >
      <span class="detail-group-title">{{ group.title }}</span>
      <UpOutlined
        v-if="group.collapsible && expanded"
        class="detail-group-arrow"
      />
      <DownOutlined
        v-if="group.collapsible && !expanded"
        class="detail-group-arrow"
      />
    </div>

    <!-- 分组内容 -->
    <div
      v-show="expanded"
      class="detail-group-content"
      :style="gridStyle"
    >
      <div
        v-for="item in group.items"
        :key="item.key"
        :style="{
          gridColumn: `span ${getItemSpan(item)}`,
        }"
      >
        <DetailItem
          :item="item"
          :data="data"
          :label-width="labelWidth"
          :label-align="labelAlign"
          :content-align="contentAlign"
          :colon="colon"
          @copy="(field, value) => emit('copy', field, value)"
        >
          <template
            v-if="item.slot"
            #[item.slot]="slotProps"
          >
            <slot
              :name="item.slot"
              v-bind="slotProps"
            />
          </template>
        </DetailItem>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-group {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  &-bordered {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 16px;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s;

    &-collapsible {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: #1890ff;
      }
    }
  }

  &-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 1.5;
  }

  &-arrow {
    font-size: 12px;
    transition: transform 0.3s;
    color: rgba(0, 0, 0, 0.45);
  }

  &-content {
    width: 100%;
  }
}
</style>
