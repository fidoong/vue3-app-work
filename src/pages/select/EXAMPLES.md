# ApiSelect 示例页面说明

本目录包含了 ApiSelect 组件的完整使用示例。

## 页面列表

### 1. `/select` - 完整示例页面
主示例页面，包含所有功能演示：
- 基础用法
- 简单数组数据
- 自定义字段映射
- 动态参数
- 手动加载
- 错误处理
- 所有 Select 属性支持

### 2. `/select/simple` - 简单示例
最简单的使用示例，适合快速上手。

## 组件列表

### components/AllFeatures.vue
演示 ApiSelect 支持的所有 Ant Design Vue Select 特性：
- 多选模式
- 可搜索
- 可清除
- 自定义选项渲染

### components/ErrorHandling.vue
演示错误处理机制，展示 API 请求失败时的处理方式。

### components/ManualLoad.vue
演示手动加载数据的方式，适用于需要用户触发加载的场景。

## 快速开始

1. 启动开发服务器
2. 访问 `/select` 查看完整示例
3. 访问 `/select/simple` 查看简单示例
4. 查看 `README.md` 了解详细 API 文档

## 代码示例

最简单的使用方式：

```vue
<script setup lang="ts">
import ApiSelect from '@/components/base/ApiSelect/ApiSelect.vue'

const fetchData = async () => {
  const res = await fetch('/api/users')
  return res.json()
}

const value = ref()
</script>

<template>
  <ApiSelect
    v-model:value="value"
    :api="fetchData"
    :option-config="{ valueField: 'id', labelField: 'name' }"
  />
</template>
```
