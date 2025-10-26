<script setup lang="ts">
import type { TextEllipsisInstance } from '~/components/base'
import { ref } from 'vue'
import { TextEllipsis } from '~/components/base'

const textEllipsisRef = ref<TextEllipsisInstance>()
const checkResult = ref<string>('')

const longText = '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容'
const multiLineText = '这是一段多行文本内容。第一行内容。第二行内容。第三行内容。第四行内容。第五行内容。这段文本会在超出指定行数后显示省略号，并在鼠标悬停时通过 tooltip 显示完整内容。'

function handleCheckOverflow() {
  const isOverflow = textEllipsisRef.value?.checkOverflow()
  const content = textEllipsisRef.value?.getContent()

  checkResult.value = `
是否超出: ${isOverflow}
文本内容: ${content}
文本长度: ${content?.length || 0}
  `.trim()
}
</script>

<template>
  <div class="p-6">
    <a-card title="实例方法">
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
        description="通过 ref 可以调用组件暴露的方法，如检查是否超出、获取文本内容等"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-space
        direction="vertical"
        :size="24"
        style="width: 100%"
      >
        <!-- 单行文本 -->
        <div>
          <h3 class="mb-2">
            单行文本检测
          </h3>
          <div class="demo-box">
            <TextEllipsis
              ref="textEllipsisRef"
              :content="longText"
            />
            <a-button
              type="primary"
              class="mt-3"
              @click="handleCheckOverflow"
            >
              检查是否超出
            </a-button>
          </div>
        </div>

        <!-- 检查结果 -->
        <div v-if="checkResult">
          <h3 class="mb-2">
            检查结果
          </h3>
          <a-alert
            type="success"
            show-icon
          >
            <template #message>
              <pre class="result-pre">{{ checkResult }}</pre>
            </template>
          </a-alert>
        </div>

        <!-- 多行文本 -->
        <div>
          <h3 class="mb-2">
            多行文本（2行）
          </h3>
          <div class="demo-box">
            <TextEllipsis
              :lines="2"
              :content="multiLineText"
            />
          </div>
        </div>
      </a-space>
    </a-card>

    <a-card
      title="代码示例"
      class="mt-4"
    >
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'
import { TextEllipsis } from '~/components/base'
import type { TextEllipsisInstance } from '~/components/base'

const textEllipsisRef = ref<TextEllipsisInstance>()

function handleCheck() {
  // 检查是否超出
  const isOverflow = textEllipsisRef.value?.checkOverflow()
  console.log('是否超出:', isOverflow)

  // 获取文本内容
  const content = textEllipsisRef.value?.getContent()
  console.log('文本内容:', content)
}
<\/script>

<template>
  <TextEllipsis
    ref="textEllipsisRef"
    :lines="2"
    content="文本内容"
  />

  <a-button @click="handleCheck">
    检查是否超出
  </a-button>
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

.demo-box {
  padding: 16px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.result-pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
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
