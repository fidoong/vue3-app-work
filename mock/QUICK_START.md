# Mock 数据快速开始

## 1. 启动开发服务器

```bash
pnpm dev
```

Mock 服务会自动启动，所有 `/api/*` 的请求都会被拦截并返回 mock 数据。

## 2. 测试登录

在浏览器控制台或代码中测试登录：

```javascript
// 使用 fetch
fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('登录成功:', data)
  // 保存 token
  localStorage.setItem('token', data.data.token)
})

// 或使用 axios
import axios from 'axios'

const { data } = await axios.post('/api/auth/login', {
  username: 'admin',
  password: 'admin123'
})

console.log('登录成功:', data)
localStorage.setItem('token', data.data.token)
```

## 3. 测试其他接口

### 获取用户信息
```javascript
const token = localStorage.getItem('token')

fetch('/api/auth/userinfo', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('用户信息:', data))
```

### 获取用户列表
```javascript
fetch('/api/user/list?pageNum=1&pageSize=10')
  .then(res => res.json())
  .then(data => console.log('用户列表:', data))
```

### 获取部门树
```javascript
fetch('/api/dept/tree')
  .then(res => res.json())
  .then(data => console.log('部门树:', data))
```

### 获取菜单树
```javascript
const token = localStorage.getItem('token')

fetch('/api/auth/menu', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('菜单树:', data))
```

### 获取字典数据
```javascript
// 获取用户性别字典
fetch('/api/dict/data/type/sys_user_sex')
  .then(res => res.json())
  .then(data => console.log('性别字典:', data))

// 获取订单状态字典
fetch('/api/dict/data/type/order_status')
  .then(res => res.json())
  .then(data => console.log('订单状态字典:', data))
```

### 获取枚举数据
```javascript
// 获取所有枚举
fetch('/api/enum/all')
  .then(res => res.json())
  .then(data => console.log('所有枚举:', data))

// 获取订单状态枚举
fetch('/api/enum/order-status')
  .then(res => res.json())
  .then(data => console.log('订单状态枚举:', data))
```

### 获取订单列表
```javascript
fetch('/api/order/list?pageNum=1&pageSize=10&status=2')
  .then(res => res.json())
  .then(data => console.log('订单列表:', data))
```

### 获取商品列表
```javascript
fetch('/api/product/list?pageNum=1&pageSize=10&category=electronics')
  .then(res => res.json())
  .then(data => console.log('商品列表:', data))
```

### 获取客户列表
```javascript
fetch('/api/customer/list?pageNum=1&pageSize=10&level=4')
  .then(res => res.json())
  .then(data => console.log('客户列表:', data))
```

## 4. 测试账号

| 用户名 | 密码 | 角色 | 说明 |
|--------|------|------|------|
| admin | admin123 | 超级管理员 | 拥有所有权限 |
| user | user123 | 普通用户 | 部分权限 |
| test | test123 | 测试用户 | 最少权限 |

## 5. 响应格式

所有接口统一返回格式：

```typescript
{
  code: 200,           // 状态码
  message: "success",  // 提示信息
  data: {},           // 响应数据
  timestamp: 1234567890 // 时间戳
}
```

分页接口的 data 格式：

```typescript
{
  list: [],      // 数据列表
  total: 100,    // 总数
  pageNum: 1,    // 当前页
  pageSize: 10   // 每页大小
}
```

## 6. 常见问题

### Q: Mock 数据不生效？
A: 确保：
1. 开发服务器已启动 (`pnpm dev`)
2. 请求路径以 `/api/` 开头
3. vite.config.ts 中 `viteMockServe` 配置正确

### Q: 如何添加新的 Mock 接口？
A:
1. 在 `mock/data/` 下创建数据文件
2. 在 `mock/api/` 下创建接口文件
3. 在 `mock/index.ts` 中导入并导出

### Q: 如何修改 Mock 数据？
A: 直接修改 `mock/data/` 下的数据文件，保存后会自动热更新

### Q: 生产环境会使用 Mock 数据吗？
A: 不会，Mock 只在开发环境生效（`command === 'serve'`）

## 7. 下一步

- 查看 [README.md](./README.md) 了解完整的 API 文档
- 查看 [EXAMPLES.md](./EXAMPLES.md) 了解更多使用示例
- 查看 [types.ts](./types.ts) 了解完整的类型定义
