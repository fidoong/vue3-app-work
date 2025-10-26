<script setup lang="ts">
import type { DropdownMenuItem } from '~/components/base/DropdownButton'
import { message } from 'ant-design-vue'
import { DropdownButton } from '~/components/base/DropdownButton'

const basicItems: DropdownMenuItem[] = [
  {
    key: 'edit',
    label: '编辑',
    icon: 'i-carbon-edit',
    onClick: () => message.info('点击了编辑'),
  },
  {
    key: 'copy',
    label: '复制',
    icon: 'i-carbon-copy',
    onClick: () => message.info('点击了复制'),
  },
  {
    key: 'divider1',
    label: '',
    divider: true,
  },
  {
    key: 'delete',
    label: '删除',
    icon: 'i-carbon-trash-can',
    danger: true,
    onClick: () => message.error('点击了删除'),
  },
]

const advancedItems: DropdownMenuItem[] = [
  {
    key: 'import',
    label: '导入数据',
    icon: 'i-carbon-document-import',
    onClick: () => message.info('导入数据'),
  },
  {
    key: 'export',
    label: '导出数据',
    icon: 'i-carbon-document-export',
    children: [
      {
        key: 'export-excel',
        label: '导出为 Excel',
        icon: 'i-carbon-document',
        onClick: () => message.success('导出为 Excel'),
      },
      {
        key: 'export-csv',
        label: '导出为 CSV',
        icon: 'i-carbon-document',
        onClick: () => message.success('导出为 CSV'),
      },
      {
        key: 'export-pdf',
        label: '导出为 PDF',
        icon: 'i-carbon-document-pdf',
        onClick: () => message.success('导出为 PDF'),
      },
    ],
  },
  {
    key: 'divider1',
    label: '',
    divider: true,
  },
  {
    key: 'template',
    label: '下载模板',
    icon: 'i-carbon-download',
    onClick: () => message.info('下载模板'),
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'i-carbon-settings',
    onClick: () => message.info('打开设置'),
  },
]

function handleSelect(key: string, _item: DropdownMenuItem) {
  message.info(`选中菜单项: ${key}`)
}
</script>

<template>
  <div class="demo-container">
    <a-card
      title="基础用法"
      class="demo-card"
    >
      <template #extra>
        <a-tag color="blue">
          基础
        </a-tag>
      </template>

      <a-alert
        message="DropdownButton 是一个通用的下拉按钮组件，可以在任何地方使用"
        type="info"
        show-icon
        class="mb-4"
      />

      <a-space :size="16">
        <DropdownButton
          text="更多操作"
          :items="basicItems"
          @select="handleSelect"
        />

        <DropdownButton
          text="主要按钮"
          type="primary"
          :items="basicItems"
        />

        <DropdownButton
          text="危险按钮"
          danger
          :items="basicItems"
        />

        <DropdownButton
          text="禁用状态"
          disabled
          :items="basicItems"
        />
      </a-space>
    </a-card>

    <a-card
      title="不同尺寸"
      class="demo-card mt-4"
    >
      <a-space :size="16">
        <DropdownButton
          text="小尺寸"
          size="small"
          :items="basicItems"
        />

        <DropdownButton
          text="默认尺寸"
          size="middle"
          :items="basicItems"
        />

        <DropdownButton
          text="大尺寸"
          size="large"
          :items="basicItems"
        />
      </a-space>
    </a-card>

    <a-card
      title="子菜单"
      class="demo-card mt-4"
    >
      <a-alert
        message="支持多级子菜单"
        type="info"
        show-icon
        class="mb-4"
      />

      <DropdownButton
        text="高级操作"
        type="primary"
        :items="advancedItems"
        @select="handleSelect"
      />
    </a-card>

    <a-card
      title="代码示例"
      class="demo-card mt-4"
    >
      <a-typography-paragraph>
        <pre><code>&lt;script setup lang="ts"&gt;
import { DropdownButton } from '~/components/base/DropdownButton'
import type { DropdownMenuItem } from '~/components/base/DropdownButton'

const items: DropdownMenuItem[] = [
  {
    key: 'edit',
    label: '编辑',
    icon: 'i-carbon-edit',
    onClick: () => console.log('编辑'),
  },
  {
    key: 'delete',
    label: '删除',
    icon: 'i-carbon-trash-can',
    danger: true,
    onClick: () => console.log('删除'),
  },
  {
    key: 'divider1',
    label: '',
    divider: true,
  },
  {
    key: 'export',
    label: '导出',
    icon: 'i-carbon-document-export',
    children: [
      {
        key: 'export-excel',
        label: '导出为 Excel',
        onClick: () => console.log('导出 Excel'),
      },
      {
        key: 'export-csv',
        label: '导出为 CSV',
        onClick: () => console.log('导出 CSV'),
      },
    ],
  },
]

function handleSelect(key: string, item: DropdownMenuItem) {
  console.log('选中:', key, item)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;DropdownButton
    text="更多操作"
    type="primary"
    :items="items"
    @select="handleSelect"
  /&gt;
&lt;/template&gt;</code></pre>
      </a-typography-paragraph>
    </a-card>

    <a-card
      title="配置说明"
      class="demo-card mt-4"
    >
      <a-descriptions
        bordered
        :column="1"
      >
        <a-descriptions-item label="text">
          按钮文本
        </a-descriptions-item>
        <a-descriptions-item label="type">
          按钮类型：primary/default/dashed/link/text
        </a-descriptions-item>
        <a-descriptions-item label="size">
          按钮大小：small/middle/large
        </a-descriptions-item>
        <a-descriptions-item label="items">
          菜单项数组
        </a-descriptions-item>
        <a-descriptions-item label="disabled">
          是否禁用
        </a-descriptions-item>
        <a-descriptions-item label="danger">
          是否危险按钮
        </a-descriptions-item>
        <a-descriptions-item label="placement">
          下拉菜单位置
        </a-descriptions-item>
        <a-descriptions-item label="trigger">
          触发方式：click/hover/contextmenu
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card
      title="菜单项配置"
      class="demo-card mt-4"
    >
      <a-table
        :columns="[
          { title: '属性', dataIndex: 'prop', key: 'prop', width: 150 },
          { title: '类型', dataIndex: 'type', key: 'type', width: 200 },
          { title: '说明', dataIndex: 'desc', key: 'desc' },
        ]"
        :data-source="[
          { prop: 'key', type: 'string', desc: '菜单项唯一标识' },
          { prop: 'label', type: 'string', desc: '菜单项文本' },
          { prop: 'icon', type: 'string | Component', desc: '菜单项图标' },
          { prop: 'disabled', type: 'boolean', desc: '是否禁用' },
          { prop: 'visible', type: 'boolean', desc: '是否显示' },
          { prop: 'danger', type: 'boolean', desc: '是否危险项' },
          { prop: 'divider', type: 'boolean', desc: '是否为分割线' },
          { prop: 'onClick', type: '() => void', desc: '点击事件' },
          { prop: 'children', type: 'DropdownMenuItem[]', desc: '子菜单' },
        ]"
        :pagination="false"
        size="small"
      />
    </a-card>
  </div>
</template>

<style scoped lang="scss">
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
