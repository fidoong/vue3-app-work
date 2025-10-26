<script setup lang="ts">
import type { SchemaDetailEmits, SchemaDetailInstance, SchemaDetailProps } from './types'
import { DetailGroup, DetailItem } from './components'
import { useDetailLayout } from './composables'

const props = withDefaults(defineProps<SchemaDetailProps>(), {
  column: 3,
  labelAlign: 'left',
  contentAlign: 'left',
  bordered: false,
  colon: true,
  layout: 'horizontal',
  size: 'middle',
  loading: false,
})

const emit = defineEmits<SchemaDetailEmits>()

// 布局逻辑
const { gridStyle } = useDetailLayout({
  column: toRef(props, 'column'),
  labelWidth: toRef(props, 'labelWidth'),
})

// 处理复制事件
function handleCopy(field: string, value: any) {
  emit('copy', field, value)
}

// 刷新数据
function refresh() {
  // 可以在这里触发数据重新加载
}

// 获取数据
function getData() {
  return props.data
}

// 暴露实例方法
defineExpose<SchemaDetailInstance>({
  refresh,
  getData,
})
</script>

<template>
  <a-spin :spinning="loading">
    <div
      class="schema-detail"
      :class="[
        `schema-detail-${size}`,
        `schema-detail-${layout}`,
        { 'schema-detail-bordered': bordered },
      ]"
    >
      <!-- 标题和额外操作 -->
      <div
        v-if="title || extra"
        class="schema-detail-header"
      >
        <div
          v-if="title"
          class="schema-detail-title"
        >
          {{ title }}
        </div>
        <div
          v-if="extra"
          class="schema-detail-extra"
        >
          <component
            :is="extra"
            v-if="typeof extra !== 'string'"
          />
          <span v-else>{{ extra }}</span>
        </div>
      </div>

      <!-- 分组模式 -->
      <div
        v-if="groups && groups.length > 0"
        class="schema-detail-groups"
      >
        <DetailGroup
          v-for="(group, index) in groups"
          :key="group.key || index"
          :group="group"
          :data="data"
          :label-width="labelWidth"
          :label-align="labelAlign"
          :content-align="contentAlign"
          :colon="colon"
          @copy="handleCopy"
        >
          <!-- 传递所有插槽 -->
          <template
            v-for="(_, name) in $slots"
            #[name]="slotProps"
          >
            <slot
              :name="name"
              v-bind="slotProps"
            />
          </template>
        </DetailGroup>
      </div>

      <!-- 简单模式 -->
      <div
        v-else-if="items && items.length > 0"
        class="schema-detail-items"
        :style="gridStyle"
      >
        <div
          v-for="item in items"
          :key="item.key"
          :style="{
            gridColumn: `span ${item.span ?? 1}`,
          }"
        >
          <DetailItem
            :item="item"
            :data="data"
            :label-width="labelWidth"
            :label-align="labelAlign"
            :content-align="contentAlign"
            :colon="colon"
            @copy="handleCopy"
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

      <!-- 默认插槽 -->
      <div
        v-else
        class="schema-detail-content"
      >
        <slot />
      </div>
    </div>
  </a-spin>
</template>

<style scoped lang="scss">
.schema-detail {
  background: #fff;

  &-bordered {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 24px;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  &-title {
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }

  &-extra {
    color: rgba(0, 0, 0, 0.65);
  }

  &-groups,
  &-items,
  &-content {
    width: 100%;
  }

  // 尺寸变体
  &-small {
    font-size: 12px;

    .detail-item {
      padding: 8px 0;
    }
  }

  &-middle {
    font-size: 14px;

    .detail-item {
      padding: 12px 0;
    }
  }

  &-large {
    font-size: 16px;

    .detail-item {
      padding: 16px 0;
    }
  }

  // 布局变体
  &-vertical {
    .detail-item {
      flex-direction: column;
      align-items: flex-start;

      &-label {
        margin-bottom: 8px;
        padding-right: 0;
      }

      &-content {
        width: 100%;
      }
    }
  }
}
</style>
