import type { MockMethod } from 'vite-plugin-mock'
import { successResult } from '../_util'
import {
  customerLevelEnum,
  dataScopeEnum,
  genderEnum,
  menuTypeEnum,
  orderStatusEnum,
  paymentMethodEnum,
  productCategoryEnum,
  userStatusEnum,
} from '../data/enum'

export default [
  // 获取所有枚举
  {
    url: '/api/enum/all',
    method: 'get',
    response: () => {
      return successResult({
        userStatus: userStatusEnum,
        gender: genderEnum,
        orderStatus: orderStatusEnum,
        paymentMethod: paymentMethodEnum,
        productCategory: productCategoryEnum,
        customerLevel: customerLevelEnum,
        dataScope: dataScopeEnum,
        menuType: menuTypeEnum,
      })
    },
  },

  // 获取用户状态枚举
  {
    url: '/api/enum/user-status',
    method: 'get',
    response: () => {
      return successResult(userStatusEnum)
    },
  },

  // 获取性别枚举
  {
    url: '/api/enum/gender',
    method: 'get',
    response: () => {
      return successResult(genderEnum)
    },
  },

  // 获取订单状态枚举
  {
    url: '/api/enum/order-status',
    method: 'get',
    response: () => {
      return successResult(orderStatusEnum)
    },
  },

  // 获取支付方式枚举
  {
    url: '/api/enum/payment-method',
    method: 'get',
    response: () => {
      return successResult(paymentMethodEnum)
    },
  },

  // 获取商品分类枚举
  {
    url: '/api/enum/product-category',
    method: 'get',
    response: () => {
      return successResult(productCategoryEnum)
    },
  },

  // 获取客户等级枚举
  {
    url: '/api/enum/customer-level',
    method: 'get',
    response: () => {
      return successResult(customerLevelEnum)
    },
  },

  // 获取数据权限范围枚举
  {
    url: '/api/enum/data-scope',
    method: 'get',
    response: () => {
      return successResult(dataScopeEnum)
    },
  },

  // 获取菜单类型枚举
  {
    url: '/api/enum/menu-type',
    method: 'get',
    response: () => {
      return successResult(menuTypeEnum)
    },
  },
] as MockMethod[]
