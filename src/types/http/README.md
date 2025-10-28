# HTTP 类型系统

## QueryParams 泛型使用

### 基础用法

```typescript
import type { QueryParams } from '~/types/http'

// 不带额外条件（使用基础查询参数）
type BasicQuery = QueryParams

// 带额外条件
type UserQuery = QueryParams<{
  username?: string
  email?: string
  roleId?: number
}>
```

### 实际示例

```typescript
// 1. 定义查询参数类型
type UserQuery = QueryParams<{
  username?: string
  email?: string
  roleId?: number
  departmentId?: number
}>

// 2. 在 API 中使用
export const userApi = {
  getUserList: (params: UserQuery) =>
    apiClient.post('/user/list', params),
}

// 3. 调用时有完整的类型提示
userApi.getUserList({
  // 基础查询参数
  pageNum: 1,
  pageSize: 10,
  keyword: 'admin',
  status: 1,
  sortField: 'createTime',
  sortOrder: 'desc',

  // 用户特有的查询条件
  username: 'admin', // ✅ 类型安全
  email: 'admin@example.com', // ✅ 类型安全
  roleId: 1, // ✅ 类型安全
})
```

### 基础查询参数包含

`QueryParams` 自动包含以下基础参数：

```typescript
{
  // 分页参数
  pageNum?: number
  pageSize?: number

  // 排序参数
  sortField?: string
  sortOrder?: 'asc' | 'desc' | 'ascend' | 'descend'

  // 时间范围
  startTime?: string
  endTime?: string

  // 通用参数
  keyword?: string
  status?: number | string
}
```

### 更多示例

查看 [QueryParams.example.ts](./QueryParams.example.ts) 获取完整示例。

## 其他类型

### ExportParams

导出参数也支持泛型：

```typescript
import type { ExportParams } from '~/types/http'

type UserExportParams = ExportParams<{
  username?: string
  roleId?: number
}>

const params: UserExportParams = {
  pageNum: 1,
  pageSize: 10,
  username: 'admin',
  format: 'xlsx',
  filename: 'users.xlsx',
}
```

### PageParams, SortParams, TimeRangeParams

可以单独使用这些基础参数类型：

```typescript
import type { PageParams, SortParams, TimeRangeParams } from '~/types/http'

// 只需要分页
function getList(params: PageParams) {
  // ...
}

// 只需要排序
function getSortedList(params: SortParams) {
  // ...
}

// 只需要时间范围
function getByTimeRange(params: TimeRangeParams) {
  // ...
}
```
