<script setup lang="ts">
import type { DropdownMenuItem } from '~/components/base/DropdownButton'
import type { TableColumnSchema } from '~/components/business/SchemaTable/types'
import { message } from 'ant-design-vue'
import { DropdownButton } from '~/components/base/DropdownButton'
import { SchemaTable } from '~/components/business/SchemaTable'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'available' | 'soldout'
}

const dataSource = ref<Product[]>([
  { id: 1, name: '商品A', category: '电子产品', price: 999, stock: 100, status: 'available' },
  { id: 2, name: '商品B', category: '服装', price: 299, stock: 50, status: 'available' },
  { id: 3, name: '商品C', category: '食品', price: 99, stock: 0, status: 'soldout' },
  { id: 4, name: '商品D', category: '电子产品', price: 1999, stock: 30, status: 'available' },
  { id: 5, name: '商品E', category: '图书', price: 59, stock: 200, status: 'available' },
])

const selectedRows = ref<Product[]>([])

const columns: TableColumnSchema<Product>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    key: 'name',
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    key: 'category',
    title: '分类',
    dataIndex: 'category',
    width: 120,
  },
  {
    key: 'price',
    title: '价格',
    dataIndex: 'price',
    width: 120,
    render: ({ value }) => h('span', `¥${value}`),
  },
  {
    key: 'stock',
    title: '库存',
    dataIndex: 'stock',
    width: 100,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    slot: 'status',
  },
]

// 工具栏配置
const toolbar = {
  left: [
    {
      text: '新增商品',
      type: 'primary' as const,
      onClick: () => {
        message.success('打开新增商品弹窗')
      },
    },
    {
      text: '批量删除',
      type: 'default' as const,
      danger: true,
      disabled: () => selectedRows.value.length === 0,
      confirm: {
        title: '确认删除',
        content: `确定要删除选中的 ${selectedRows.value.length} 个商品吗？`,
        onConfirm: () => {
          const ids = selectedRows.value.map(r => r.id)
          dataSource.value = dataSource.value.filter(item => !ids.includes(item.id))
          selectedRows.value = []
          message.success('删除成功')
        },
      },
    },
    {
      text: '批量上架',
      type: 'default' as const,
      disabled: () => selectedRows.value.length === 0,
      onClick: () => {
        selectedRows.value.forEach((row) => {
          const item = dataSource.value.find(d => d.id === row.id)
          if (item) {
            item.status = 'available'
          }
        })
        message.success('上架成功')
      },
    },
    {
      text: '批量下架',
      type: 'default' as const,
      disabled: () => selectedRows.value.length === 0,
      onClick: () => {
        selectedRows.value.forEach((row) => {
          const item = dataSource.value.find(d => d.id === row.id)
          if (item) {
            item.status = 'soldout'
          }
        })
        message.success('下架成功')
      },
    },
  ],
  right: [
    {
      text: '导出Excel',
      type: 'default' as const,
      onClick: () => {
        message.success('导出Excel成功')
      },
    },
    {
      text: '导入',
      type: 'default' as const,
      onClick: () => {
        message.info('打开导入弹窗')
      },
    },
  ],
  showRefresh: true,
  showReset: true,
}

const rowSelection = {
  selectedRowKeys: computed(() => selectedRows.value.map(r => r.id)),
  onChange: (_keys: number[], rows: Product[]) => {
    selectedRows.value = rows
  },
}

// 使用插槽的表格
const tableRef = ref()

function handleAdd() {
  const newId = Math.max(...dataSource.value.map(d => d.id)) + 1
  dataSource.value.push({
    id: newId,
    name: `新商品${newId}`,
    category: '其他',
    price: 0,
    stock: 0,
    status: 'available',
  })
  message.success('添加成功')
}

function handleBatchDelete() {
  const ids = selectedRows.value.map(r => r.id)
  dataSource.value = dataSource.value.filter(item => !ids.includes(item.id))
  selectedRows.value = []
  message.success('删除成功')
}

function handleExport() {
  message.success('导出成功')
}

// 更多操作菜单
const moreActions: DropdownMenuItem[] = [
  {
    key: 'import',
    label: '导入数据',
    icon: 'i-carbon-document-import',
    onClick: () => message.info('导入数据'),
  },
  {
    key: 'template',
    label: '下载模板',
    icon: 'i-carbon-download',
    onClick: () => message.info('下载模板'),
  },
  {
    key: 'divider1',
    label: '',
    divider: true,
  },
  {
    key: 'settings',
    label: '表格设置',
    icon: 'i-carbon-settings',
    onClick: () => message.info('表格设置'),
  },
]
</script>

<template>
  <div class="demo-container">
    <a-card
      title="方式一：配置式工具栏"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="cyan">
          配置式
        </a-tag>
      </template>

      <a-alert
        message="通过 toolbar 配置对象快速创建工具栏"
        type="info"
        show-icon
        class="mb-4"
      />

      <div
        v-if="selectedRows.length > 0"
        class="mb-4"
      >
        <a-alert
          :message="`已选择 ${selectedRows.length} 个商品`"
          type="success"
          show-icon
        >
          <template #description>
            <div>
              选中的商品: {{ selectedRows.map(r => r.name).join(', ') }}
            </div>
          </template>
        </a-alert>
      </div>

      <SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :toolbar="toolbar"
        :row-selection="rowSelection"
        :pagination="false"
      >
        <template #status="{ value }">
          <a-tag :color="value === 'available' ? 'green' : 'red'">
            {{ value === 'available' ? '在售' : '售罄' }}
          </a-tag>
        </template>
      </SchemaTable>
    </a-card>

    <a-card
      title="方式二：自定义工具栏插槽"
      class="demo-card mt-4"
    >
      <template #extra>
        <a-tag color="purple">
          插槽式
        </a-tag>
      </template>

      <a-alert
        message="使用 toolbar 插槽完全自定义工具栏内容和样式"
        type="info"
        show-icon
        class="mb-4"
      />

      <SchemaTable
        ref="tableRef"
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :pagination="false"
      >
        <template #toolbar="{ refresh, selectedRows: selected, clearSelection }">
          <div class="custom-toolbar">
            <div class="toolbar-left">
              <a-space :size="8">
                <a-button
                  type="primary"
                  @click="handleAdd"
                >
                  <span class="i-carbon-add mr-1" />
                  新增商品
                </a-button>

                <a-popconfirm
                  title="确认删除"
                  :disabled="selected.length === 0"
                  @confirm="handleBatchDelete"
                >
                  <a-button
                    danger
                    :disabled="selected.length === 0"
                  >
                    <span class="i-carbon-trash-can mr-1" />
                    批量删除 {{ selected.length > 0 ? `(${selected.length})` : '' }}
                  </a-button>
                </a-popconfirm>

                <a-button
                  :disabled="selected.length === 0"
                  @click="clearSelection"
                >
                  <span class="i-carbon-close mr-1" />
                  清空选择
                </a-button>
              </a-space>
            </div>

            <div class="toolbar-right">
              <a-space :size="8">
                <a-button @click="handleExport">
                  <span class="i-carbon-document-export mr-1" />
                  导出
                </a-button>

                <a-button @click="refresh">
                  <span class="i-carbon-renew mr-1" />
                  刷新
                </a-button>

                <DropdownButton
                  text="更多"
                  :items="moreActions"
                  icon="i-carbon-overflow-menu-vertical"
                />
              </a-space>
            </div>
          </div>
        </template>

        <template #status="{ value }">
          <a-tag :color="value === 'available' ? 'green' : 'red'">
            {{ value === 'available' ? '在售' : '售罄' }}
          </a-tag>
        </template>
      </SchemaTable>
    </a-card>

    <a-card
      title="两种方式对比"
      class="demo-card mt-4"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card
            size="small"
            title="配置式"
          >
            <p><strong>优点：</strong></p>
            <ul>
              <li>配置简单，代码量少</li>
              <li>自动处理权限和状态</li>
              <li>内置确认弹窗</li>
              <li>统一的样式和交互</li>
            </ul>
            <p class="mt-2">
              <strong>适用场景：</strong>
            </p>
            <ul>
              <li>标准的 CRUD 操作</li>
              <li>简单的批量操作</li>
              <li>快速开发</li>
            </ul>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            size="small"
            title="插槽式"
          >
            <p><strong>优点：</strong></p>
            <ul>
              <li>完全自定义布局</li>
              <li>可以添加任意组件</li>
              <li>灵活的样式控制</li>
              <li>复杂交互支持</li>
            </ul>
            <p class="mt-2">
              <strong>适用场景：</strong>
            </p>
            <ul>
              <li>复杂的业务逻辑</li>
              <li>特殊的 UI 需求</li>
              <li>需要下拉菜单等组件</li>
            </ul>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      title="工具栏配置说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="toolbar 配置">
          通过对象配置快速创建工具栏
        </a-descriptions-item>
        <a-descriptions-item label="toolbar 插槽">
          使用插槽完全自定义工具栏内容
        </a-descriptions-item>
        <a-descriptions-item label="插槽参数">
          refresh, reload, reset, loading, selectedRows, clearSelection
        </a-descriptions-item>
        <a-descriptions-item label="left">
          左侧按钮数组，通常放置主要操作（新增、批量删除等）
        </a-descriptions-item>
        <a-descriptions-item label="right">
          右侧按钮数组，通常放置辅助操作（导出、导入等）
        </a-descriptions-item>
        <a-descriptions-item label="showRefresh">
          是否显示刷新按钮（自动添加到右侧）
        </a-descriptions-item>
        <a-descriptions-item label="showReset">
          是否显示重置按钮（自动添加到右侧）
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="配置式代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
        const selectedRows = ref([])

        const toolbar = {
        left: [
        {
        text: '新增',
        type: 'primary',
        onClick: () => console.log('新增'),
        },
        {
        text: '批量删除',
        danger: true,
        // 动态禁用：未选中时禁用
        disabled: () => selectedRows.value.length === 0,
        // 确认弹窗
        confirm: {
        title: '确认删除',
        content: '确定要删除选中的数据吗？',
        onConfirm: () => {
        // 删除逻辑
        },
        },
        },
        ],
        right: [
        {
        text: '导出',
        onClick: () => console.log('导出'),
        },
        ],
        showRefresh: true, // 显示刷新按钮
        showReset: true, // 显示重置按钮
        }

        const rowSelection = {
        selectedRowKeys: computed(() => selectedRows.value.map(r => r.id)),
        onChange: (keys, rows) => {
        selectedRows.value = rows
        },
        }
        &lt;/script&gt;

        &lt;template&gt;
        &lt;SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :toolbar="toolbar"
        :row-selection="rowSelection"
        /&gt;
        &lt;/template&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="插槽式代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;template&gt;
        &lt;SchemaTable
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        &gt;
        &lt;!-- 自定义工具栏 --&gt;
        &lt;template #toolbar="{ refresh, selectedRows, clearSelection }"&gt;
        &lt;div class="custom-toolbar"&gt;
        &lt;div class="toolbar-left"&gt;
        &lt;a-space&gt;
        &lt;a-button type="primary" @click="handleAdd"&gt;
        新增
        &lt;/a-button&gt;

        &lt;a-popconfirm
        title="确认删除"
        :disabled="selectedRows.length === 0"
        @confirm="handleBatchDelete"
        &gt;
        &lt;a-button danger :disabled="selectedRows.length === 0"&gt;
        批量删除 ({{ selectedRows.length }})
        &lt;/a-button&gt;
        &lt;/a-popconfirm&gt;

        &lt;a-button @click="clearSelection"&gt;
        清空选择
        &lt;/a-button&gt;
        &lt;/a-space&gt;
        &lt;/div&gt;

        &lt;div class="toolbar-right"&gt;
        &lt;a-space&gt;
        &lt;a-button @click="handleExport"&gt;导出&lt;/a-button&gt;
        &lt;a-button @click="refresh"&gt;刷新&lt;/a-button&gt;

        &lt;a-dropdown&gt;
        &lt;a-button&gt;更多操作&lt;/a-button&gt;
        &lt;template #overlay&gt;
        &lt;a-menu&gt;
        &lt;a-menu-item&gt;导入数据&lt;/a-menu-item&gt;
        &lt;a-menu-item&gt;下载模板&lt;/a-menu-item&gt;
        &lt;/a-menu&gt;
        &lt;/template&gt;
        &lt;/a-dropdown&gt;
        &lt;/a-space&gt;
        &lt;/div&gt;
        &lt;/div&gt;
        &lt;/template&gt;
        &lt;/SchemaTable&gt;
        &lt;/template&gt;

        &lt;style scoped&gt;
        .custom-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 12px;
        background: #fafafa;
        border-radius: 4px;
        }

        .toolbar-left {
        flex: 1;
        }

        .toolbar-right {
        flex-shrink: 0;
        }
        &lt;/style&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="按钮配置项"
      class="demo-card mt-4"
    >
      <a-table
        :columns="[
          { title: '属性', dataIndex: 'prop', key: 'prop', width: 150 },
          { title: '类型', dataIndex: 'type', key: 'type', width: 200 },
          { title: '说明', dataIndex: 'desc', key: 'desc' },
        ]"
        :data-source="[
          { prop: 'text', type: 'string', desc: '按钮文字' },
          { prop: 'type', type: 'string', desc: '按钮类型：primary/default/dashed/link/text' },
          { prop: 'danger', type: 'boolean', desc: '是否危险按钮' },
          { prop: 'disabled', type: 'boolean | () => boolean', desc: '是否禁用，支持函数动态计算' },
          { prop: 'visible', type: 'boolean | () => boolean', desc: '是否显示，支持函数动态计算' },
          { prop: 'onClick', type: '(rows) => void', desc: '点击事件，参数为选中的行数据' },
          { prop: 'confirm', type: 'object', desc: '确认弹窗配置' },
          { prop: 'icon', type: 'Component', desc: '按钮图标' },
        ]"
        :pagination="false"
        size="small"
      />
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

.custom-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.toolbar-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 按钮图标对齐 */
:deep(.ant-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.ant-btn > span) {
  display: inline-flex;
  align-items: center;
}
</style>
