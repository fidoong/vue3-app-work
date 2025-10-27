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
 * 用户状态枚举
 */
export const userStatusEnum: EnumItem[] = [
  { label: '正常', value: 1, color: 'success' },
  { label: '停用', value: 0, color: 'danger' },
]

/**
 * 性别枚举
 */
export const genderEnum: EnumItem[] = [
  { label: '男', value: 1, color: 'primary' },
  { label: '女', value: 2, color: 'danger' },
  { label: '未知', value: 0, color: 'info' },
]

/**
 * 订单状态枚举
 */
export const orderStatusEnum: EnumItem[] = [
  { label: '待支付', value: 1, color: 'warning' },
  { label: '已支付', value: 2, color: 'primary' },
  { label: '配送中', value: 3, color: 'info' },
  { label: '已完成', value: 4, color: 'success' },
  { label: '已取消', value: 5, color: 'danger' },
]

/**
 * 支付方式枚举
 */
export const paymentMethodEnum: EnumItem[] = [
  { label: '微信支付', value: 'wechat', color: 'success' },
  { label: '支付宝', value: 'alipay', color: 'primary' },
  { label: '银行卡', value: 'bank', color: 'warning' },
  { label: '现金', value: 'cash', color: 'info' },
]

/**
 * 商品分类枚举
 */
export const productCategoryEnum: EnumItem[] = [
  { label: '电子产品', value: 'electronics', color: 'primary' },
  { label: '服装鞋包', value: 'clothing', color: 'success' },
  { label: '食品饮料', value: 'food', color: 'warning' },
  { label: '家居用品', value: 'home', color: 'info' },
]

/**
 * 客户等级枚举
 */
export const customerLevelEnum: EnumItem[] = [
  { label: '普通客户', value: 1, color: 'info' },
  { label: '银牌客户', value: 2, color: 'default' },
  { label: '金牌客户', value: 3, color: 'warning' },
  { label: 'VIP客户', value: 4, color: 'primary' },
  { label: 'SVIP客户', value: 5, color: 'danger' },
]

/**
 * 数据权限范围枚举
 */
export const dataScopeEnum: EnumItem[] = [
  { label: '全部数据权限', value: '1' },
  { label: '自定义数据权限', value: '2' },
  { label: '本部门数据权限', value: '3' },
  { label: '本部门及以下数据权限', value: '4' },
  { label: '仅本人数据权限', value: '5' },
]

/**
 * 菜单类型枚举
 */
export const menuTypeEnum: EnumItem[] = [
  { label: '目录', value: 'catalog', color: 'primary' },
  { label: '菜单', value: 'menu', color: 'success' },
  { label: '按钮', value: 'button', color: 'warning' },
]
