<script setup lang="ts">
import { ShoppingOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons-vue'
import ApiSelect from '~/components/base/ApiSelect/ApiSelect.vue'

// 用户数据
async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 800))
  return {
    data: [
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        department: '技术部',
        level: 'P7',
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        department: '产品部',
        level: 'P6',
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        department: '设计部',
        level: 'P5',
      },
    ],
  }
}

const selectedUser = ref()
</script>

<template>
  <div class="mx-auto max-w-4xl p-6 space-y-8">
    <div>
      <h1 class="mb-2 text-2xl font-bold">
        ApiSelect 自定义渲染
      </h1>
      <p class="text-gray-600">
        展示如何自定义选项和标签的渲染方式
      </p>
    </div>

    <!-- 示例1: 使用 option 插槽 -->
    <a-card>
      <template #title>
        <div class="flex items-center gap-2">
          <UserOutlined />
          <span>方式1: 使用 option 插槽</span>
        </div>
      </template>
      <p class="mb-4 text-sm text-gray-600">
        通过 <code class="rounded bg-gray-100 px-1 py-0.5">#option</code> 插槽可以完全自定义选项的渲染内容
      </p>

      <a-form-item label="选择团队成员">
        <ApiSelect
          v-model:value="selectedUser"
          :api="fetchUsers"
          :option-config="{
            valueField: 'id',
            labelField: 'name',
          }"
          placeholder="请选择成员"
          style="width: 100%"
        >
          <template #option="{ label, avatar, email, department, level }: any">
            <div class="flex items-center gap-3 py-2">
              <img
                :src="avatar"
                :alt="label"
                class="h-10 w-10 rounded-full"
              >
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ label }}</span>
                  <a-tag
                    size="small"
                    color="blue"
                  >
                    {{ level }}
                  </a-tag>
                </div>
                <div class="text-xs text-gray-500">
                  {{ email }} · {{ department }}
                </div>
              </div>
            </div>
          </template>
        </ApiSelect>
      </a-form-item>

      <div class="mt-4 rounded bg-gray-50 p-3">
        <div class="text-sm text-gray-600">
          选中的用户 ID: <strong>{{ selectedUser || '未选择' }}</strong>
        </div>
      </div>

      <div class="mt-4 rounded bg-blue-50 p-4">
        <h4 class="mb-2 text-sm font-semibold">
          代码示例:
        </h4>
        <pre class="overflow-x-auto text-xs"><code v-pre>&lt;ApiSelect
  v-model:value="selectedUser"
  :api="fetchUsers"
  :option-config="{ valueField: 'id', labelField: 'name' }"
&gt;
  &lt;template #option="{ label, avatar, email, department, level }"&gt;
    &lt;div class="flex items-center gap-3"&gt;
      &lt;img :src="avatar" class="w-10 h-10 rounded-full"&gt;
      &lt;div&gt;
        &lt;div&gt;{{ label }} &lt;a-tag&gt;{{ level }}&lt;/a-tag&gt;&lt;/div&gt;
        &lt;div class="text-xs"&gt;{{ email }} · {{ department }}&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/ApiSelect&gt;</code></pre>
      </div>
    </a-card>

    <!-- 示例2: 使用 tagRender -->
    <a-card>
      <template #title>
        <div class="flex items-center gap-2">
          <TagsOutlined />
          <span>方式2: 使用 tagRender (多选)</span>
        </div>
      </template>
      <TagRenderExample />
    </a-card>

    <!-- 示例3: 使用 maxTagPlaceholder -->
    <a-card>
      <template #title>
        <div class="flex items-center gap-2">
          <ShoppingOutlined />
          <span>方式3: 自定义标签折叠</span>
        </div>
      </template>
      <MaxTagExample />
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
