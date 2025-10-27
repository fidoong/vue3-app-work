# Mock API 使用示例

## 1. 登录鉴权

### 登录
```typescript
import axios from 'axios'

// 登录
const login = async () => {
  const response = await axios.post('/api/auth/login', {
    username: 'admin',
    password: 'admin123'
  })

  const { token, userInfo } = response.data.data

  // 保存 token
  localStorage.setItem('token', token)

  // 设置请求头
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  return { token, userInfo }
}
```

### 获取用户信息
```typescript
const getUserInfo = async () => {
  const response = await axios.get('/api/auth/userinfo')
  return response.data.data
}
```

### 获取用户菜单
```typescript
const getUserMenu = async () => {
  const response = await axios.get('/api/auth/menu')
  return response.data.data
}
```

## 2. 用户管理

### 获取用户列表
```typescript
const getUserList = async (params: {
  pageNum?: number
  pageSize?: number
  username?: string
  realName?: string
  status?: number
}) => {
  const response = await axios.get('/api/user/list', { params })
  return response.data.data
}

// 使用示例
const result = await getUserList({
  pageNum: 1,
  pageSize: 10,
  username: 'admin',
  status: 1
})
```

### 创建用户
```typescript
const createUser = async (data: {
  username: string
  realName: string
  email: string
  phone: string
  roles: string[]
  dept: { id: string; name: string }
  status: number
}) => {
  const response = await axios.post('/api/user', data)
  return response.data.data
}
```

## 3. 部门管理（树形结构）

### 获取部门树
```typescript
const getDeptTree = async () => {
  const response = await axios.get('/api/dept/tree')
  return response.data.data
}

// 返回数据结构
interface Dept {
  id: string
  parentId: string | null
  deptName: string
  orderNum: number
  leader?: string
  phone?: string
  email?: string
  status: number
  children?: Dept[]
}
```

### 获取部门列表（扁平化）
```typescript
const getDeptList = async (params?: {
  deptName?: string
  status?: number
}) => {
  const response = await axios.get('/api/dept/list', { params })
  return response.data.data
}
```

## 4. 字典管理

### 根据字典类型获取字典数据
```typescript
const getDictDataByType = async (dictType: string) => {
  const response = await axios.get(`/api/dict/data/type/${dictType}`)
  return response.data.data
}

// 使用示例
const genderOptions = await getDictDataByType('sys_user_sex')
const statusOptions = await getDictDataByType('sys_normal_disable')
const orderStatusOptions = await getDictDataByType('order_status')
```

### 获取字典类型列表
```typescript
const getDictTypeList = async (params: {
  pageNum?: number
  pageSize?: number
  dictName?: string
  dictType?: string
  status?: number
}) => {
  const response = await axios.get('/api/dict/type/list', { params })
  return response.data.data
}
```

## 5. 枚举接口

### 获取所有枚举
```typescript
const getAllEnums = async () => {
  const response = await axios.get('/api/enum/all')
  return response.data.data
}

// 返回数据结构
interface EnumData {
  userStatus: EnumItem[]
  gender: EnumItem[]
  orderStatus: EnumItem[]
  paymentMethod: EnumItem[]
  productCategory: EnumItem[]
  customerLevel: EnumItem[]
  dataScope: EnumItem[]
  menuType: EnumItem[]
}
```

### 获取单个枚举
```typescript
// 订单状态枚举
const orderStatusEnum = await axios.get('/api/enum/order-status')

// 支付方式枚举
const paymentMethodEnum = await axios.get('/api/enum/payment-method')

// 商品分类枚举
const productCategoryEnum = await axios.get('/api/enum/product-category')
```

## 6. 订单管理

### 获取订单列表
```typescript
const getOrderList = async (params: {
  pageNum?: number
  pageSize?: number
  orderNo?: string
  customerName?: string
  status?: number
}) => {
  const response = await axios.get('/api/order/list', { params })
  return response.data.data
}
```

### 获取订单详情（含订单明细）
```typescript
const getOrderDetail = async (id: string) => {
  const response = await axios.get(`/api/order/${id}`)
  return response.data.data
}

// 返回数据包含订单明细
interface Order {
  id: string
  orderNo: string
  customerId: string
  customerName: string
  totalAmount: number
  payAmount: number
  payMethod: string
  status: number
  statusText: string
  items: OrderItem[]  // 订单明细
}
```

### 取消订单
```typescript
const cancelOrder = async (id: string) => {
  const response = await axios.post(`/api/order/${id}/cancel`)
  return response.data
}
```

## 7. 商品管理

### 获取商品列表
```typescript
const getProductList = async (params: {
  pageNum?: number
  pageSize?: number
  productName?: string
  category?: string
  status?: number
}) => {
  const response = await axios.get('/api/product/list', { params })
  return response.data.data
}
```

## 8. 客户管理

### 获取客户列表
```typescript
const getCustomerList = async (params: {
  pageNum?: number
  pageSize?: number
  customerName?: string
  phone?: string
  level?: number
  status?: number
}) => {
  const response = await axios.get('/api/customer/list', { params })
  return response.data.data
}
```

## 9. 角色管理

### 获取所有角色（不分页）
```typescript
const getAllRoles = async () => {
  const response = await axios.get('/api/role/all')
  return response.data.data
}
```

### 获取角色列表（分页）
```typescript
const getRoleList = async (params: {
  pageNum?: number
  pageSize?: number
  roleName?: string
  roleKey?: string
  status?: number
}) => {
  const response = await axios.get('/api/role/list', { params })
  return response.data.data
}
```

## 10. 菜单管理

### 获取菜单树
```typescript
const getMenuTree = async () => {
  const response = await axios.get('/api/menu/tree')
  return response.data.data
}
```

## 完整的 Axios 配置示例

```typescript
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  timeout: 15000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    if (code === 200) {
      return data
    } else if (code === 401) {
      // Token 过期，跳转登录
      localStorage.removeItem('token')
      window.location.href = '/login'
      return Promise.reject(new Error(message))
    } else {
      // 其他错误
      console.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.error('请求失败:', error.message)
    return Promise.reject(error)
  }
)

export default service
```

## Vue 3 Composition API 使用示例

```typescript
import { ref, onMounted } from 'vue'
import axios from './axios'

export function useUserList() {
  const loading = ref(false)
  const userList = ref([])
  const total = ref(0)
  const pageNum = ref(1)
  const pageSize = ref(10)

  const fetchUserList = async (params?: any) => {
    loading.value = true
    try {
      const response = await axios.get('/api/user/list', {
        params: {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          ...params,
        },
      })

      userList.value = response.list
      total.value = response.total
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchUserList()
  })

  return {
    loading,
    userList,
    total,
    pageNum,
    pageSize,
    fetchUserList,
  }
}
```

## React Hooks 使用示例

```typescript
import { useState, useEffect } from 'react'
import axios from './axios'

export function useUserList() {
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const fetchUserList = async (params?: any) => {
    setLoading(true)
    try {
      const response = await axios.get('/api/user/list', {
        params: {
          pageNum,
          pageSize,
          ...params,
        },
      })

      setUserList(response.list)
      setTotal(response.total)
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [pageNum, pageSize])

  return {
    loading,
    userList,
    total,
    pageNum,
    pageSize,
    setPageNum,
    setPageSize,
    fetchUserList,
  }
}
```
