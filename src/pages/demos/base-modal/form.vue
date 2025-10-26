<script setup lang="ts">
import { message } from 'ant-design-vue'
import { globalModal } from '~/components/base/BaseModal'
import FormModal from './modals/FormModal.vue'

const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138000' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138001' },
  { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138002' },
])

async function handleCreate() {
  try {
    const result = await globalModal.openModal(FormModal, {
      title: '创建用户',
      width: 700,
      props: {
        mode: 'create',
      },
    })

    if (result.data?.success) {
      const newData = {
        id: tableData.value.length + 1,
        ...result.data.data,
      }
      tableData.value.push(newData)
      message.success('创建成功')
    }
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消创建')
    }
  }
}

async function handleEdit(record: any) {
  try {
    const result = await globalModal.openModal(FormModal, {
      title: '编辑用户',
      width: 700,
      props: {
        mode: 'edit',
        data: { ...record },
      },
    })

    if (result.data?.success) {
      const index = tableData.value.findIndex(item => item.id === record.id)
      if (index !== -1) {
        tableData.value[index] = {
          ...tableData.value[index],
          ...result.data.data,
        }
      }
      message.success('更新成功')
    }
  }
  catch (error: any) {
    if (error.type === 'cancel') {
      message.info('已取消编辑')
    }
  }
}

function handleDelete(record: any) {
  const index = tableData.value.findIndex(item => item.id === record.id)
  if (index !== -1) {
    tableData.value.splice(index, 1)
    message.success('删除成功')
  }
}

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  { title: '操作', key: 'action', width: 200 },
]
</script>

<template>
  <div class="demo-container">
    <a-card
      title="表单弹窗"
      class="demo-card"
    >
      <template #extra>
        <a-button
          type="primary"
          @click="handleCreate"
        >
          <span class="i-carbon-add mr-1" />
          创建用户
        </a-button>
      </template>

      <a-alert
        message="在弹窗中使用表单，支持创建和编辑功能"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button
                size="small"
                @click="handleEdit(record)"
              >
                编辑
              </a-button>
              <a-popconfirm
                title="确定要删除吗？"
                @confirm="handleDelete(record)"
              >
                <a-button
                  size="small"
                  danger
                >
                  删除
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { globalModal } from '~/components/base/BaseModal'
import FormModal from './FormModal.vue'

// 创建
async function handleCreate() {
  try {
    const result = await globalModal.openModal(FormModal, {
      title: '创建用户',
      width: 700,
      props: {
        mode: 'create',
      },
    })

    if (result.data?.success) {
      // 处理创建成功
      console.log('新数据:', result.data.data)
    }
  } catch (error) {
    if (error.type === 'cancel') {
      console.log('已取消')
    }
  }
}

// 编辑
async function handleEdit(record) {
  const result = await globalModal.openModal(FormModal, {
    title: '编辑用户',
    width: 700,
    props: {
      mode: 'edit',
      data: record,
    },
  })
}
&lt;/script&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="最佳实践"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="表单验证">
          在确认前进行表单验证，验证失败不关闭弹窗
        </a-descriptions-item>
        <a-descriptions-item label="加载状态">
          提交时显示加载状态，防止重复提交
        </a-descriptions-item>
        <a-descriptions-item label="错误处理">
          捕获并显示 API 错误，不自动关闭弹窗
        </a-descriptions-item>
        <a-descriptions-item label="数据回显">
          编辑模式下正确回显数据
        </a-descriptions-item>
        <a-descriptions-item label="返回数据">
          通过 confirm() 返回表单数据
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 24px;
}

.demo-card {
  margin-bottom: 16px;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}
</style>
