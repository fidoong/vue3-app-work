/**
 * Mock API 类型定义
 */

// ==================== 通用类型 ====================

/**
 * 统一响应结构
 */
export interface ResponseResult<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

/**
 * 分页响应结构
 */
export interface PageResult<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/**
 * 分页查询参数
 */
export interface PageParams {
  pageNum?: number
  pageSize?: number
}

// ==================== 用户相关 ====================

/**
 * 用户信息
 */
export interface UserInfo {
  id: string
  username: string
  realName: string
  avatar: string
  email: string
  phone: string
  roles: string[]
  permissions: string[]
  dept: {
    id: string
    name: string
  }
  status: number
  createTime: string
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResult {
  token: string
  userInfo: UserInfo
}

/**
 * 用户查询参数
 */
export interface UserQueryParams extends PageParams {
  username?: string
  realName?: string
  status?: number
}

// ==================== 角色相关 ====================

/**
 * 角色信息
 */
export interface Role {
  id: string
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  status: number
  remark?: string
  menuIds: string[]
  deptIds: string[]
  createTime: string
  updateTime: string
}

/**
 * 角色查询参数
 */
export interface RoleQueryParams extends PageParams {
  roleName?: string
  roleKey?: string
  status?: number
}

// ==================== 菜单相关 ====================

/**
 * 菜单信息
 */
export interface MenuItem {
  id: string
  parentId: string | null
  name: string
  path: string
  component?: string
  redirect?: string
  icon?: string
  type: 'menu' | 'button' | 'catalog'
  orderNum: number
  visible: boolean
  status: number
  perms?: string
  meta?: {
    title: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    alwaysShow?: boolean
  }
  children?: MenuItem[]
}

/**
 * 菜单查询参数
 */
export interface MenuQueryParams {
  name?: string
  status?: number
}

// ==================== 部门相关 ====================

/**
 * 部门信息
 */
export interface Dept {
  id: string
  parentId: string | null
  deptName: string
  orderNum: number
  leader?: string
  phone?: string
  email?: string
  status: number
  createTime: string
  updateTime: string
  children?: Dept[]
}

/**
 * 部门查询参数
 */
export interface DeptQueryParams {
  deptName?: string
  status?: number
}

// ==================== 字典相关 ====================

/**
 * 字典类型
 */
export interface DictType {
  id: string
  dictName: string
  dictType: string
  status: number
  remark?: string
  createTime: string
  updateTime: string
}

/**
 * 字典数据
 */
export interface DictData {
  id: string
  dictType: string
  dictLabel: string
  dictValue: string
  dictSort: number
  cssClass?: string
  listClass?: string
  isDefault: boolean
  status: number
  remark?: string
  createTime: string
}

/**
 * 字典类型查询参数
 */
export interface DictTypeQueryParams extends PageParams {
  dictName?: string
  dictType?: string
  status?: number
}

/**
 * 字典数据查询参数
 */
export interface DictDataQueryParams extends PageParams {
  dictType?: string
  dictLabel?: string
  status?: number
}

// ==================== 订单相关 ====================

/**
 * 订单信息
 */
export interface Order {
  id: string
  orderNo: string
  customerId: string
  customerName: string
  totalAmount: number
  payAmount: number
  payMethod: string
  status: number
  statusText: string
  remark?: string
  createTime: string
  updateTime: string
  items: OrderItem[]
}

/**
 * 订单明细
 */
export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  amount: number
}

/**
 * 订单查询参数
 */
export interface OrderQueryParams extends PageParams {
  orderNo?: string
  customerName?: string
  status?: number
}

// ==================== 商品相关 ====================

/**
 * 商品信息
 */
export interface Product {
  id: string
  productName: string
  productCode: string
  category: string
  categoryText: string
  price: number
  stock: number
  unit: string
  image: string
  description: string
  status: number
  createTime: string
  updateTime: string
}

/**
 * 商品查询参数
 */
export interface ProductQueryParams extends PageParams {
  productName?: string
  category?: string
  status?: number
}

// ==================== 客户相关 ====================

/**
 * 客户信息
 */
export interface Customer {
  id: string
  customerName: string
  customerCode: string
  contactPerson: string
  phone: string
  email: string
  address: string
  level: number
  levelText: string
  totalAmount: number
  orderCount: number
  status: number
  remark?: string
  createTime: string
  updateTime: string
}

/**
 * 客户查询参数
 */
export interface CustomerQueryParams extends PageParams {
  customerName?: string
  phone?: string
  level?: number
  status?: number
}

// ==================== 枚举相关 ====================

/**
 * 枚举项
 */
export interface EnumItem {
  label: string
  value: string | number
  color?: string
  disabled?: boolean
}

/**
 * 所有枚举
 */
export interface AllEnums {
  userStatus: EnumItem[]
  gender: EnumItem[]
  orderStatus: EnumItem[]
  paymentMethod: EnumItem[]
  productCategory: EnumItem[]
  customerLevel: EnumItem[]
  dataScope: EnumItem[]
  menuType: EnumItem[]
}
