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
 * 字典类型列表
 */
export const dictTypes: DictType[] = [
  {
    id: '1',
    dictName: '用户性别',
    dictType: 'sys_user_sex',
    status: 1,
    remark: '用户性别列表',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '2',
    dictName: '系统状态',
    dictType: 'sys_normal_disable',
    status: 1,
    remark: '系统状态列表',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '3',
    dictName: '订单状态',
    dictType: 'order_status',
    status: 1,
    remark: '订单状态列表',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '4',
    dictName: '支付方式',
    dictType: 'payment_method',
    status: 1,
    remark: '支付方式列表',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '5',
    dictName: '商品分类',
    dictType: 'product_category',
    status: 1,
    remark: '商品分类列表',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
]

/**
 * 字典数据列表
 */
export const dictDataList: DictData[] = [
  // 用户性别
  {
    id: '1',
    dictType: 'sys_user_sex',
    dictLabel: '男',
    dictValue: '1',
    dictSort: 1,
    listClass: 'primary',
    isDefault: true,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '2',
    dictType: 'sys_user_sex',
    dictLabel: '女',
    dictValue: '2',
    dictSort: 2,
    listClass: 'danger',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '3',
    dictType: 'sys_user_sex',
    dictLabel: '未知',
    dictValue: '0',
    dictSort: 3,
    listClass: 'info',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  // 系统状态
  {
    id: '4',
    dictType: 'sys_normal_disable',
    dictLabel: '正常',
    dictValue: '1',
    dictSort: 1,
    listClass: 'success',
    isDefault: true,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '5',
    dictType: 'sys_normal_disable',
    dictLabel: '停用',
    dictValue: '0',
    dictSort: 2,
    listClass: 'danger',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  // 订单状态
  {
    id: '6',
    dictType: 'order_status',
    dictLabel: '待支付',
    dictValue: '1',
    dictSort: 1,
    listClass: 'warning',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '7',
    dictType: 'order_status',
    dictLabel: '已支付',
    dictValue: '2',
    dictSort: 2,
    listClass: 'primary',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '8',
    dictType: 'order_status',
    dictLabel: '配送中',
    dictValue: '3',
    dictSort: 3,
    listClass: 'info',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '9',
    dictType: 'order_status',
    dictLabel: '已完成',
    dictValue: '4',
    dictSort: 4,
    listClass: 'success',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '10',
    dictType: 'order_status',
    dictLabel: '已取消',
    dictValue: '5',
    dictSort: 5,
    listClass: 'danger',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  // 支付方式
  {
    id: '11',
    dictType: 'payment_method',
    dictLabel: '微信支付',
    dictValue: 'wechat',
    dictSort: 1,
    listClass: 'success',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '12',
    dictType: 'payment_method',
    dictLabel: '支付宝',
    dictValue: 'alipay',
    dictSort: 2,
    listClass: 'primary',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '13',
    dictType: 'payment_method',
    dictLabel: '银行卡',
    dictValue: 'bank',
    dictSort: 3,
    listClass: 'warning',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '14',
    dictType: 'payment_method',
    dictLabel: '现金',
    dictValue: 'cash',
    dictSort: 4,
    listClass: 'info',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  // 商品分类
  {
    id: '15',
    dictType: 'product_category',
    dictLabel: '电子产品',
    dictValue: 'electronics',
    dictSort: 1,
    listClass: 'primary',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '16',
    dictType: 'product_category',
    dictLabel: '服装鞋包',
    dictValue: 'clothing',
    dictSort: 2,
    listClass: 'success',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '17',
    dictType: 'product_category',
    dictLabel: '食品饮料',
    dictValue: 'food',
    dictSort: 3,
    listClass: 'warning',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: '18',
    dictType: 'product_category',
    dictLabel: '家居用品',
    dictValue: 'home',
    dictSort: 4,
    listClass: 'info',
    isDefault: false,
    status: 1,
    createTime: '2024-01-01 00:00:00',
  },
]

/**
 * 根据字典类型获取字典数据
 */
export function getDictDataByType(dictType: string): DictData[] {
  return dictDataList.filter(item => item.dictType === dictType && item.status === 1)
}
