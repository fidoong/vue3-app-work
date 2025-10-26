<script setup lang="ts">
import { Table } from 'ant-design-vue'
import TextEllipsis from '~/components/base/TextEllipsis/TextEllipsis.vue'

interface DataItem {
  key: string
  name: string
  description: string
  address: string
  tags: string
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 250,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 180,
  },
]

const dataSource: DataItem[] = [
  {
    key: '1',
    name: '张三',
    description: '这是一段很长的描述文本，用于演示文本省略功能。当文本超出容器宽度时，会自动显示省略号，并且鼠标悬停时会显示完整内容。',
    address: '北京市朝阳区某某街道某某小区某某号楼某某单元某某室',
    tags: 'Vue, React, Angular, TypeScript, JavaScript',
  },
  {
    key: '2',
    name: '李四',
    description: '前端开发工程师，精通各种前端技术栈，有丰富的项目经验。',
    address: '上海市浦东新区陆家嘴金融贸易区世纪大道',
    tags: 'Node.js, Express, Koa, NestJS',
  },
  {
    key: '3',
    name: '王五',
    description: '全栈工程师',
    address: '广州市天河区珠江新城',
    tags: 'Python, Django, Flask, FastAPI, Machine Learning',
  },
  {
    key: '4',
    name: '赵六',
    description: '资深后端开发工程师，专注于高并发、高可用系统架构设计与实现，有多年大型互联网公司工作经验。',
    address: '深圳市南山区科技园高新技术产业园区某某大厦',
    tags: 'Java, Spring Boot, Spring Cloud, Microservices, Kubernetes, Docker',
  },
  {
    key: '5',
    name: '孙七',
    description: 'UI/UX 设计师，擅长用户体验设计和界面设计。',
    address: '杭州市西湖区文一西路',
    tags: 'Figma, Sketch, Adobe XD, Photoshop',
  },
]
</script>

<template>
  <div class="demo-container">
    <h3>表格中使用文本省略</h3>
    <p class="demo-description">
      在表格单元格中使用 TextEllipsis 组件，可以优雅地处理长文本显示问题。
    </p>

    <Table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'name'">
          <TextEllipsis :content="text" />
        </template>
        <template v-else-if="column.key === 'description'">
          <TextEllipsis
            :content="text"
            :lines="2"
          />
        </template>
        <template v-else-if="column.key === 'address'">
          <TextEllipsis :content="text" />
        </template>
        <template v-else-if="column.key === 'tags'">
          <TextEllipsis
            :content="text"
            :tooltip-max-width="300"
          />
        </template>
      </template>
    </Table>

    <div class="demo-tips">
      <h4>使用说明：</h4>
      <ul>
        <li>姓名列：单行省略</li>
        <li>描述列：最多显示 2 行，超出显示省略号</li>
        <li>地址列：单行省略</li>
        <li>标签列：单行省略，自定义 tooltip 最大宽度为 300px</li>
        <li>鼠标悬停在省略的文本上会显示完整内容</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 24px;

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }

  .demo-description {
    margin-bottom: 24px;
    color: rgba(0, 0, 0, 0.65);
  }

  .demo-tips {
    margin-top: 24px;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;

    h4 {
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 600;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 1.6;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
