# Mock 数据模块

完整的企业级中后台 Mock 数据系统，包含登录鉴权、菜单管理、用户管理、角色管理、部门管理、字典管理、订单管理、商品管理、客户管理等模块。

## 目录结构

```
mock/
├── api/              # API 接口定义
│   ├── auth.ts       # 登录鉴权接口
│   ├── user.ts       # 用户管理接口
│   ├── role.ts       # 角色管理接口
│   ├── menu.ts       # 菜单管理接口
│   ├── dept.ts       # 部门管理接口（树形）
│   ├── dict.ts       # 字典管理接口
│   ├── order.ts      # 订单管理接口
│   ├── product.ts    # 商品管理接口
│   ├── customer.ts   # 客户管理接口
│   └── enum.ts       # 枚举接口
├── data/             # 数据定义
│   ├── user.ts       # 用户数据
│   ├── role.ts       # 角色数据
│   ├── menu.ts       # 菜单数据
│   ├── dept.ts       # 部门数据（树形）
│   ├── dict.ts       # 字典数据
│   ├── order.ts      # 订单数据
│   ├── product.ts    # 商品数据
│   ├── customer.ts   # 客户数据
│   └── enum.ts       # 枚举数据
├── _util.ts          # 工具函数
├── index.ts          # 入口文件
└── README.md         # 说明文档
```

## 功能模块

### 1. 登录鉴权模块 (auth.ts)

- `POST /api/auth/login` - 用户登录
- `GET /api/auth/userinfo` - 获取用户信息
- `GET /api/auth/menu` - 获取用户菜单
- `GET /api/auth/permissions` - 获取用户权限
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/refresh` - 刷新 Token

**测试账号：**
- 管理员：`admin` / `admin123`
- 普通用户：`user` / `user123`
- 测试用户：`test` / `test123`

### 2. 用户管理模块 (user.ts)

- `GET /api/user/list` - 获取用户列表（分页）
- `GET /api/user/:id` - 获取用户详情
- `POST /api/user` - 创建用户
- `PUT /api/user/:id` - 更新用户
- `DELETE /api/user/:id` - 删除用户

### 3. 角色管理模块 (role.ts)

- `GET /api/role/list` - 获取角色列表（分页）
- `GET /api/role/all` - 获取所有角色（不分页）
- `GET /api/role/:id` - 获取角色详情
- `POST /api/role` - 创建角色
- `PUT /api/role/:id` - 更新角色
- `DELETE /api/role/:id` - 删除角色

### 4. 菜单管理模块 (menu.ts)

- `GET /api/menu/tree` - 获取菜单树
- `GET /api/menu/list` - 获取菜单列表
- `GET /api/menu/:id` - 获取菜单详情
- `POST /api/menu` - 创建菜单
- `PUT /api/menu/:id` - 更新菜单
- `DELETE /api/menu/:id` - 删除菜单

### 5. 部门管理模块 (dept.ts) - 树形结构

- `GET /api/dept/tree` - 获取部门树
- `GET /api/dept/list` - 获取部门列表（扁平化）
- `GET /api/dept/:id` - 获取部门详情
- `POST /api/dept` - 创建部门
- `PUT /api/dept/:id` - 更新部门
- `DELETE /api/dept/:id` - 删除部门

### 6. 字典管理模块 (dict.ts)

- `GET /api/dict/type/list` - 获取字典类型列表（分页）
- `GET /api/dict/data/list` - 获取字典数据列表（分页）
- `GET /api/dict/data/type/:dictType` - 根据类型获取字典数据
- `POST /api/dict/type` - 创建字典类型
- `POST /api/dict/data` - 创建字典数据
- `PUT /api/dict/type/:id` - 更新字典类型
- `PUT /api/dict/data/:id` - 更新字典数据
- `DELETE /api/dict/type/:id` - 删除字典类型
- `DELETE /api/dict/data/:id` - 删除字典数据

### 7. 订单管理模块 (order.ts)

- `GET /api/order/list` - 获取订单列表（分页）
- `GET /api/order/:id` - 获取订单详情
- `POST /api/order` - 创建订单
- `PUT /api/order/:id` - 更新订单
- `DELETE /api/order/:id` - 删除订单
- `POST /api/order/:id/cancel` - 取消订单

### 8. 商品管理模块 (product.ts)

- `GET /api/product/list` - 获取商品列表（分页）
- `GET /api/product/:id` - 获取商品详情
- `POST /api/product` - 创建商品
- `PUT /api/product/:id` - 更新商品
- `DELETE /api/product/:id` - 删除商品

### 9. 客户管理模块 (customer.ts)

- `GET /api/customer/list` - 获取客户列表（分页）
- `GET /api/customer/:id` - 获取客户详情
- `POST /api/customer` - 创建客户
- `PUT /api/customer/:id` - 更新客户
- `DELETE /api/customer/:id` - 删除客户

### 10. 枚举接口模块 (enum.ts)

- `GET /api/enum/all` - 获取所有枚举
- `GET /api/enum/user-status` - 获取用户状态枚举
- `GET /api/enum/gender` - 获取性别枚举
- `GET /api/enum/order-status` - 获取订单状态枚举
- `GET /api/enum/payment-method` - 获取支付方式枚举
- `GET /api/enum/product-category` - 获取商品分类枚举
- `GET /api/enum/customer-level` - 获取客户等级枚举
- `GET /api/enum/data-scope` - 获取数据权限范围枚举
- `GET /api/enum/menu-type` - 获取菜单类型枚举

## 统一响应格式

所有接口返回统一的响应格式：

```typescript
{
  code: number        // 状态码，200 表示成功
  message: string     // 提示信息
  data: any          // 响应数据
  timestamp: number   // 时间戳
}
```

分页接口的 data 格式：

```typescript
{
  list: any[]        // 数据列表
  total: number      // 总数
  pageNum: number    // 当前页码
  pageSize: number   // 每页大小
}
```

## 使用示例

### 登录示例

```typescript
// 登录
const response = await axios.post('/api/auth/login', {
  username: 'admin',
  password: 'admin123'
})

// 保存 token
const { token, userInfo } = response.data.data
localStorage.setItem('token', token)

// 后续请求携带 token
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

### 获取列表示例

```typescript
// 获取用户列表
const response = await axios.get('/api/user/list', {
  params: {
    pageNum: 1,
    pageSize: 10,
    username: 'admin',
    status: 1
  }
})

const { list, total, pageNum, pageSize } = response.data.data
```

### 获取树形数据示例

```typescript
// 获取部门树
const response = await axios.get('/api/dept/tree')
const deptTree = response.data.data

// 获取菜单树
const response = await axios.get('/api/menu/tree')
const menuTree = response.data.data
```

### 获取字典数据示例

```typescript
// 根据字典类型获取字典数据
const response = await axios.get('/api/dict/data/type/sys_user_sex')
const genderOptions = response.data.data
```

### 获取枚举数据示例

```typescript
// 获取所有枚举
const response = await axios.get('/api/enum/all')
const enums = response.data.data

// 获取订单状态枚举
const response = await axios.get('/api/enum/order-status')
const orderStatusEnum = response.data.data
```

## 数据特点

1. **真实性**：使用 Mock.js 生成接近真实的数据
2. **完整性**：包含企业级中后台常用的所有模块
3. **树形结构**：部门和菜单支持树形结构
4. **分页支持**：列表接口支持分页查询
5. **条件筛选**：支持多条件组合查询
6. **权限控制**：基于角色的菜单和权限控制
7. **数据字典**：支持字典类型和字典数据管理
8. **枚举接口**：提供各类枚举数据接口

## 注意事项

1. Mock 数据仅在开发环境生效
2. 数据存储在内存中，刷新页面后会重置
3. Token 验证仅做简单模拟，实际项目需要完善
4. 可根据实际需求扩展更多接口和数据
