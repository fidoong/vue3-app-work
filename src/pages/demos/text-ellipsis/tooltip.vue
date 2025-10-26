<script setup lang="ts">
import type { TooltipProps } from 'ant-design-vue'
import { TextEllipsis } from '~/components/base'

const longText = '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容'

const placements: Array<{ label: string, value: TooltipProps['placement'] }> = [
  { label: '上方（top）', value: 'top' },
  { label: '上方左对齐（topLeft）', value: 'topLeft' },
  { label: '上方右对齐（topRight）', value: 'topRight' },
  { label: '下方（bottom）', value: 'bottom' },
  { label: '下方左对齐（bottomLeft）', value: 'bottomLeft' },
  { label: '下方右对齐（bottomRight）', value: 'bottomRight' },
  { label: '左侧（left）', value: 'left' },
  { label: '左侧上对齐（leftTop）', value: 'leftTop' },
  { label: '左侧下对齐（leftBottom）', value: 'leftBottom' },
  { label: '右侧（right）', value: 'right' },
  { label: '右侧上对齐（rightTop）', value: 'rightTop' },
  { label: '右侧下对齐（rightBottom）', value: 'rightBottom' },
]
</script>

<template>
  <div class="p-6">
    <a-card title="Tooltip 配置">
      <template #extra>
        <a-button
          type="link"
          @click="$router.back()"
        >
          返回
        </a-button>
      </template>

      <a-alert
        message="提示"
        description="可以自定义 tooltip 的位置、最大宽度，或者完全禁用 tooltip"
        type="info"
        show-icon
        class="mb-4"
      />

      <!-- Tooltip 位置展示 -->
      <div class="mb-6">
        <h3 class="mb-3">
          Tooltip 位置
        </h3>
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="item in placements"
            :key="item.value"
            :span="8"
          >
            <div class="placement-item">
              <div class="placement-label">
                {{ item.label }}
              </div>
              <div class="demo-box">
                <TextEllipsis
                  :placement="item.value"
                  :content="longText"
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>

      <a-divider />

      <!-- 其他配置 -->
      <a-space
        direction="vertical"
        :size="24"
        style="width: 100%"
      >
        <!-- 自定义最大宽度 -->
        <div>
          <h3 class="mb-2">
            自定义 tooltip 最大宽度（600px）
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :content="longText"
              :tooltip-max-width="600"
            />
          </div>
        </div>

        <!-- 禁用 tooltip -->
        <div>
          <h3 class="mb-2">
            禁用 tooltip
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :tooltip="false"
              :content="longText"
            />
          </div>
        </div>
      </a-space>
    </a-card>

    <a-card
      title="代码示例"
      class="mt-4"
    >
      <pre><code>{{ `<template>
  <!-- 默认位置 top -->
  <TextEllipsis :content="longText" />

  <!-- 不同位置 -->
  <TextEllipsis placement="top" :content="longText" />
  <TextEllipsis placement="topLeft" :content="longText" />
  <TextEllipsis placement="topRight" :content="longText" />
  <TextEllipsis placement="bottom" :content="longText" />
  <TextEllipsis placement="bottomLeft" :content="longText" />
  <TextEllipsis placement="bottomRight" :content="longText" />
  <TextEllipsis placement="left" :content="longText" />
  <TextEllipsis placement="leftTop" :content="longText" />
  <TextEllipsis placement="leftBottom" :content="longText" />
  <TextEllipsis placement="right" :content="longText" />
  <TextEllipsis placement="rightTop" :content="longText" />
  <TextEllipsis placement="rightBottom" :content="longText" />

  <!-- 自定义最大宽度 -->
  <TextEllipsis
    :content="longText"
    :tooltip-max-width="600"
  />

  <!-- 禁用 tooltip -->
  <TextEllipsis
    :tooltip="false"
    :content="longText"
  />
</template>` }}</code></pre>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
h3 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.placement-item {
  .placement-label {
    margin-bottom: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
}

.demo-box {
  padding: 16px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

pre {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
