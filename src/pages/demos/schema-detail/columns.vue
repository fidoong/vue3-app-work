<script setup lang="ts">
import type { DetailItemSchema } from '~/components/business'
import { SchemaDetail } from '~/components/business'

const data = ref({
  field1: '字段1',
  field2: '字段2',
  field3: '字段3',
  field4: '字段4',
  field5: '字段5',
  field6: '字段6',
  field7: '字段7',
  field8: '字段8',
  field9: '字段9',
  longField: '这是一个很长的字段内容，需要占据多列来显示完整的信息',
})

const items1: DetailItemSchema[] = [
  { key: 'field1', label: '字段1' },
  { key: 'field2', label: '字段2' },
  { key: 'field3', label: '字段3' },
  { key: 'field4', label: '字段4' },
]

const items2: DetailItemSchema[] = [
  { key: 'field1', label: '字段1' },
  { key: 'field2', label: '字段2' },
  { key: 'field3', label: '字段3' },
  { key: 'field4', label: '字段4' },
  { key: 'field5', label: '字段5' },
  { key: 'field6', label: '字段6' },
]

const items3: DetailItemSchema[] = [
  { key: 'field1', label: '字段1' },
  { key: 'field2', label: '字段2' },
  { key: 'field3', label: '字段3', span: 2 },
  { key: 'field4', label: '字段4' },
  { key: 'field5', label: '字段5' },
  { key: 'field6', label: '字段6' },
  { key: 'longField', label: '长字段', span: 3 },
]
</script>

<template>
  <div class="p-6">
    <a-card title="列数控制">
      <template #extra>
        <a-space>
          <a-button
            type="link"
            @click="$router.back()"
          >
            返回
          </a-button>
        </a-space>
      </template>

      <a-alert
        message="提示"
        description="通过 column 属性控制每行显示的列数，通过 span 属性控制单个字段占据的列数"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-space
        direction="vertical"
        :size="24"
        class="w-full"
      >
        <!-- 2列布局 -->
        <a-card
          title="2列布局"
          size="small"
        >
          <SchemaDetail
            :data="data"
            :items="items1"
            :column="2"
            bordered
          />
        </a-card>

        <!-- 3列布局 -->
        <a-card
          title="3列布局（默认）"
          size="small"
        >
          <SchemaDetail
            :data="data"
            :items="items2"
            :column="3"
            bordered
          />
        </a-card>

        <!-- 混合布局 -->
        <a-card
          title="混合布局（不同字段占据不同列数）"
          size="small"
        >
          <SchemaDetail
            :data="data"
            :items="items3"
            :column="3"
            bordered
          />
        </a-card>
      </a-space>
    </a-card>
  </div>
</template>
