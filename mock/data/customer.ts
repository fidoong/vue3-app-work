import Mock from 'mockjs'

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
 * 客户等级映射
 */
const levelMap: Record<number, string> = {
  1: '普通客户',
  2: '银牌客户',
  3: '金牌客户',
  4: 'VIP客户',
  5: 'SVIP客户',
}

/**
 * 生成客户列表
 */
export const customers: Customer[] = Mock.mock({
  'list|80': [
    {
      'id|+1': 1,
      'customerName': '@cname',
      'customerCode': () => `CUS${Mock.Random.integer(10000, 99999)}`,
      'contactPerson': '@cname',
      'phone': /^1[3-9]\d{9}/,
      'email': '@email',
      'address': '@county(true)',
      'level|1-5': 1,
      'totalAmount': '@float(1000, 100000, 2, 2)',
      'orderCount|1-100': 10,
      'status|1': [0, 1],
      'remark': '@csentence',
      'createTime': '@datetime',
      'updateTime': '@datetime',
    },
  ],
}).list.map((item: any) => ({
  ...item,
  id: String(item.id),
  levelText: levelMap[item.level] || '普通客户',
}))
