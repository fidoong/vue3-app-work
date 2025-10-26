# 组件类型定义审计报告

## 审计日期
2024-01-XX

## 审计范围
- `src/components/base/` - 基础组件
- `src/components/business/` - 业务组件

## 审计标准

### 1. Props 定义
- ✅ 应该继承原生组件的 Props
- ✅ 应该排除被覆盖的 Props（如 loading, options）
- ✅ 应该包含自定义 Props
- ✅ 应该包含事件处理器 Props（onXxx）

### 2. Emits 定义
- ✅ 应该定义所有自定义事件
- ✅ 应该包含原生事件（如果需要）
- ✅ 应该有详细的 JSDoc 注释

### 3. 实例方法
- ✅ 应该通过 defineExpose 暴露
- ✅ 应该有类型定义

## 审计结果

### ✅ 基础组件（src/components/base/）

#### ApiSelect
- ✅ Props 定义完整
- ✅ 包含事件处理器 Props（onLoaded, onError）
- ✅ Emits 定义完整
- ✅ 继承原生事件
- ✅ 实例方法完整

#### ApiTreeSelect
- ✅ Props 定义完整
- ✅ 包含事件处理器 Props
- ✅ Emits 定义完整
- ✅ 继承原生事件
- ✅ 实例方法完整

#### ApiCascader
- ✅ Props 定义完整
- ✅ 包含事件处理器 Props
- ✅ Emits 定义完整
- ✅ 继承原生事件
- ✅ 实例方法完整

#### ApiRadioGroup
- ✅ Props 定义完整
- ✅ 包含事件处理器 Props
- ✅ Emits 定义完整
- ✅ 继承原生事件
- ✅ 实例方法完整

#### ApiCheckboxGroup
- ✅ Props 定义完整
- ✅ 包含事件处理器 Props
- ✅ Emits 定义完整
- ✅ 继承原生事件
- ✅ 实例方法完整

### ⚠️ 业务组件（src/components/business/）

#### SchemaForm
- ✅ Props 定义完整
- ❌ **缺少事件处理器 Props**
- ✅ Emits 定义完整
- ✅ 实例方法完整

**需要添加：**
```typescript
export interface SchemaFormEventProps {
  onSubmit?: (value: Record<string, any>) => void
  onReset?: () => void
  onChange?: (field: string, value: any) => void
  onValidate?: (field: string, valid: boolean, message?: string) => void
}

export interface SchemaFormProps extends FormConfig, SchemaFormEventProps {
  // ...
}
```

#### SchemaTable
- ✅ Props 定义完整
- ❌ **缺少事件处理器 Props**
- ✅ Emits 定义完整
- ✅ 实例方法完整

**需要添加：**
```typescript
export interface SchemaTableEventProps<T = any> {
  onChange?: (pagination: any, filters: any, sorter: any) => void
  onRefresh?: (data: T[]) => void
  onError?: (error: Error) => void
  onExpand?: (expanded: boolean, record: T) => void
  onExpandedRowsChange?: (expandedRows: (string | number)[]) => void
  onResizeColumn?: (width: number, column: TableColumnSchema<T>) => void
}

export interface SchemaTableProps<T = any> extends SchemaTableEventProps<T> {
  // ...
}
```

#### SearchForm
- ✅ Props 定义完整
- ❌ **缺少事件处理器 Props**
- ✅ Emits 定义完整
- ✅ 实例方法完整

**需要添加：**
```typescript
export interface SearchFormEventProps {
  onSearch?: (values: Record<string, any>) => void
  onReset?: () => void
}

export interface SearchFormProps extends SearchFormEventProps {
  // ...
}
```

#### SchemaLayout
- ⏭️ 需要检查

#### SchemaMenu
- ⏭️ 需要检查

## 问题总结

### 主要问题
所有 business 组件都**缺少事件处理器 Props**（onXxx），这会导致：
- ❌ IDE 无法提示事件
- ❌ 用户需要查看文档才知道有哪些事件
- ❌ 与 Ant Design Vue 的模式不一致

### 影响
- 用户体验：输入 `:on` 时看不到事件提示
- 类型安全：事件处理器没有类型检查
- 一致性：与基础组件的模式不一致

## 修复建议

### 优先级 P0（必须修复）
1. ✅ 为所有 business 组件添加事件处理器 Props
2. ✅ 确保 Props 接口继承事件处理器接口

### 优先级 P1（建议修复）
1. 为所有事件添加详细的 JSDoc 注释
2. 统一事件命名规范
3. 添加事件参数的类型定义

### 优先级 P2（可选）
1. 创建共享的事件类型
2. 添加事件使用示例
3. 更新文档

## 修复计划

### 第一步：修复 SchemaForm
```typescript
// types.ts
export interface SchemaFormEventProps {
  /** 表单提交事件 */
  onSubmit?: (value: Record<string, any>) => void
  /** 表单重置事件 */
  onReset?: () => void
  /** 字段值变化事件 */
  onChange?: (field: string, value: any) => void
  /** 字段验证事件 */
  onValidate?: (field: string, valid: boolean, message?: string) => void
}

export interface SchemaFormProps extends FormConfig, SchemaFormEventProps {
  // 现有 props...
}
```

### 第二步：修复 SchemaTable
```typescript
// types.ts
export interface SchemaTableEventProps<T = any> {
  /** 表格变化事件 */
  onChange?: (pagination: any, filters: any, sorter: any) => void
  /** 刷新完成事件 */
  onRefresh?: (data: T[]) => void
  /** 错误事件 */
  onError?: (error: Error) => void
  /** 行展开事件 */
  onExpand?: (expanded: boolean, record: T) => void
  /** 展开行变化事件 */
  onExpandedRowsChange?: (expandedRows: (string | number)[]) => void
  /** 列宽调整事件 */
  onResizeColumn?: (width: number, column: TableColumnSchema<T>) => void
}

export interface SchemaTableProps<T = any> extends SchemaTableEventProps<T> {
  // 现有 props...
}
```

### 第三步：修复 SearchForm
```typescript
// types.ts
export interface SearchFormEventProps {
  /** 搜索事件 */
  onSearch?: (values: Record<string, any>) => void
  /** 重置事件 */
  onReset?: () => void
}

export interface SearchFormProps extends SearchFormEventProps {
  // 现有 props...
}
```

## 验证方法

修复后，应该能够：
1. 在组件上输入 `:on` 看到所有事件提示
2. 事件处理器有正确的参数类型
3. IDE 能够自动完成事件名称

```vue
<template>
  <SchemaForm
    :on  <!-- 应该提示 onSubmit, onReset, onChange, onValidate -->
  />
</template>
```

## 结论

- ✅ 基础组件（ApiSelect 等）类型定义完整
- ⚠️ 业务组件需要添加事件处理器 Props
- 📝 建议统一所有组件的类型定义模式
