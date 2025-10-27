import type { MockMethod } from 'vite-plugin-mock'
import authApi from './api/auth'
import customerApi from './api/customer'
import deptApi from './api/dept'
import dictApi from './api/dict'
import enumApi from './api/enum'
import menuApi from './api/menu'
import orderApi from './api/order'
import productApi from './api/product'
import roleApi from './api/role'
import userApi from './api/user'

/**
 * 合并所有 Mock API
 */
export default [
  ...authApi,
  ...userApi,
  ...roleApi,
  ...menuApi,
  ...deptApi,
  ...dictApi,
  ...orderApi,
  ...productApi,
  ...customerApi,
  ...enumApi,
] as MockMethod[]
