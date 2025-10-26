<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'
import { message } from 'ant-design-vue'

// 模拟 API
async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    data: [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ],
  }
}

// 模拟会失败的 API
async function fetchUsersWithError() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  throw new Error('网络请求失败')
}

const userId = ref()
const userId2 = ref()

/**
 * 数据加载成功的回调
 * @param data - 原始数据（未经过 transform 处理）
 */
function handleLoaded(data: any[]) {
  // 数据加载成功
  message.success(`成功加载 ${data.length} 条数据`)
}

/**
 * 数据加载失败的回调
 * @param error - 错误对象
 */
function handleError(error: Error) {
  console.error('数据加载失败:', error)
  message.error(`加载失败: ${error.message}`)
}

/**
 * 值变化的回调
 */
function handleChange(_value: any, _option: any) {
  // 选择变化
}
</script>

<template>
  <div class="mx-auto max-w-2xl p-6 space-y-8">
    <div>
      <h1 class="mb-2 text-2xl font-bold">
        事件监听示例
      </h1>
      <p class="text-gray-600">
        演示 @loaded 和 @error 事件的使用
      </p>
    </div>

    <!-- 成功加载示例 -->
    <a-card title="成功加载示例">
      <p class="mb-4 text-sm text-gray-600">
        监听 @loaded 事件，在数据加载成功后显示提示
      </p>
      <a-form-item label="选择用户">
        <ApiSelect
          v-model:value="userId"
          :api="fetchUsers"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="请选择用户"
          @loaded="handleLoaded"
          @change="handleChange"
        />
      </a-form-item>
      <div class="text-sm text-gray-500">
        选中的值: {{ userId }}
      </div>
    </a-card>

    <!-- 错误处理示例 -->
    <a-card title="错误处理示例">
      <p class="mb-4 text-sm text-gray-600">
        监听 @error 事件，在数据加载失败时显示错误提示
      </p>
      <a-form-item label="选择用户">
        <ApiSelect
          v-model:value="userId2"
          :api="fetchUsersWithError"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="这个请求会失败"
          @error="handleError"
        />
      </a-form-item>
    </a-card>

    <!-- 代码示例 -->
    <a-card title="代码示例">
      <pre class="overflow-x-auto rounded bg-gray-50 p-4 text-xs"><code v-pre>&lt;script setup&gt;
import { message } from 'ant-design-vue'

// 数据加载成功
function handleLoaded(data: any[]) {
  console.log('加载成功:', data)
  message.success(`成功加载 ${data.length} 条数据`)
}

// 数据加载失败
function handleError(error: Error) {
  console.error('加载失败:', error)
  message.error(`加载失败: ${error.message}`)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ApiSelect
    :api="fetchUsers"
    @loaded="handleLoaded"
    @error="handleError"
    @change="handleChange"
  /&gt;
&lt;/template&gt;</code></pre>
    </a-card>

    <!-- 使用场景 -->
    <a-card title="常见使用场景">
      <div class="text-sm space-y-4">
        <div>
          <h4 class="mb-2 font-semibold">
            @loaded 事件
          </h4>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>显示加载成功提示</li>
            <li>获取加载后的数据进行后续处理</li>
            <li>更新其他相关状态</li>
            <li>记录日志或埋点</li>
          </ul>
        </div>

        <div>
          <h4 class="mb-2 font-semibold">
            @error 事件
          </h4>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>显示错误提示</li>
            <li>错误日志记录</li>
            <li>错误上报</li>
            <li>降级处理</li>
          </ul>
        </div>

        <div>
          <h4 class="mb-2 font-semibold">
            @change 事件
          </h4>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>监听用户选择变化</li>
            <li>触发表单验证</li>
            <li>联动其他表单项</li>
            <li>保存用户选择</li>
          </ul>
        </div>
      </div>
    </a-card>

    <!-- 返回链接 -->
    <div class="text-center">
      <router-link
        to="/select"
        class="text-blue-500 hover:underline"
      >
        ← 返回主示例页面
      </router-link>
    </div>
  </div>
</template>
