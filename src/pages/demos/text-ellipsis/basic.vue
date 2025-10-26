<script setup lang="ts">
import { TextEllipsis } from '~/components/base'

const shortText = '这是一段短文本'
const longText = '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容'
const multiLineText = '这是一段多行文本内容。第一行内容。第二行内容。第三行内容。第四行内容。第五行内容。这段文本会在超出指定行数后显示省略号，并在鼠标悬停时通过这是一段多行文本内容。第一行内容。第二行内容。第三行内容。第四行内容。第五行内容。这段文本会在超出指定行数后显示省略号，并在鼠标悬停时通过这是一段多行文本内容。第一行内容。第二行内容。第三行内容。第四行内容。第五行内容。这段文本会在超出指定行数后显示省略号，并在鼠标悬停时通过这是一段多行文本内容。第一行内容。第二行内容。第三行内容。第四行内容。第五行内容。这段文本会在超出指定行数后显示省略号，并在鼠标悬停时通过 tooltip 显示完整内容。支持自定义行数、tooltip 位置等配置。'
</script>

<template>
  <div class="p-6">
    <a-card title="基础用法">
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
        description="组件会自动检测文本是否超出，只在超出时显示 tooltip"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-space
        direction="vertical"
        :size="24"
        style="width: 100%"
      >
        <!-- 单行文本超出 -->
        <div>
          <h3 class="mb-2">
            单行文本超出（默认）
          </h3>
          <div class="demo-box">
            <TextEllipsis :content="longText" />
          </div>
        </div>

        <!-- 短文本不超出 -->
        <div>
          <h3 class="mb-2">
            短文本（不超出，不显示 tooltip）
          </h3>
          <div class="demo-box">
            <TextEllipsis :content="shortText" />
          </div>
        </div>

        <!-- 多行文本超出 2 行 -->
        <div>
          <h3 class="mb-2">
            多行文本超出（2行）
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :lines="2"
              :content="multiLineText"
            />
          </div>
        </div>

        <!-- 多行文本超出 3 行 -->
        <div>
          <h3 class="mb-2">
            多行文本超出（3行）
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :lines="3"
              :content="multiLineText"
            />
          </div>
        </div>

        <!-- 使用插槽 -->
        <div>
          <h3 class="mb-2">
            使用插槽
          </h3>
          <div class="demo-box">
            <TextEllipsis :lines="2">
              <span style="color: #1890ff; font-weight: bold;">【重要】</span>
              {{ multiLineText }}
            </TextEllipsis>
          </div>
        </div>

        <!-- 自定义样式 -->
        <div>
          <h3 class="mb-2">
            自定义样式
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :lines="2"
              :content="multiLineText"
              :style="{ fontSize: '16px', color: '#52c41a', lineHeight: '1.8' }"
            />
          </div>
        </div>

        <!-- 固定宽度容器 -->
        <div>
          <h3 class="mb-2">
            固定宽度容器（300px）
          </h3>
          <div
            class="demo-box"
            style="width: 300px"
          >
            <TextEllipsis :content="longText" />
          </div>
        </div>
      </a-space>
    </a-card>

    <a-card
      title="代码示例"
      class="mt-4"
    >
      <pre><code>&lt;script setup lang="ts"&gt;
import { TextEllipsis } from '~/components/base'

const longText = '这是一段很长的文本...'
const multiLineText = '这是一段多行文本...'
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 单行文本超出 --&gt;
  &lt;TextEllipsis :content="longText" /&gt;

  &lt;!-- 多行文本超出 --&gt;
  &lt;TextEllipsis :lines="3" :content="multiLineText" /&gt;

  &lt;!-- 使用插槽 --&gt;
  &lt;TextEllipsis :lines="2"&gt;
    &lt;span style="color: red;"&gt;【重要】&lt;/span&gt;
    &#123;&#123; multiLineText &#125;&#125;
  &lt;/TextEllipsis&gt;

  &lt;!-- 自定义样式 --&gt;
  &lt;TextEllipsis
    :lines="2"
    :content="multiLineText"
    :style="{ fontSize: '16px', color: '#52c41a' }"
  /&gt;
&lt;/template&gt;</code></pre>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
h3 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
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
