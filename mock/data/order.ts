import Mock from 'mockjs'

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
 * 订单状态映射
 */
const statusMap: Record<number, string> = {
  1: '待支付',
  2: '已支付',
  3: '配送中',
  4: '已完成',
  5: '已取消',
}

/**
 * 生成订单列表
 */
export const orders: Order[] = Mock.mock({
  'list|50': [
    {
      'id|+1': 1,
      'orderNo': () => `ORD${Date.now()}${Mock.Random.integer(1000, 9999)}`,
      'customerId|1': ['1', '2', '3', '4', '5'],
      'customerName': '@cname',
      'totalAmount': '@float(100, 10000, 2, 2)',
      'payAmount': '@float(100, 10000, 2, 2)',
      'payMethod|1': ['wechat', 'alipay', 'bank', 'cash'],
      'status|1': [1, 2, 3, 4, 5],
      'remark': '@csentence',
      'createTime': '@datetime',
      'updateTime': '@datetime',
      'items|1-5': [
        {
          'id|+1': 1,
          'productId|+1': 1,
          'productName': '@ctitle(5, 10)',
          'productImage': () => `https://picsum.photos/200/200?random=${Mock.Random.integer(1, 1000)}`,
          'price': '@float(10, 1000, 2, 2)',
          'quantity|1-10': 1,
        },
      ],
    },
  ],
}).list.map((item: any) => ({
  ...item,
  id: String(item.id),
  customerId: String(item.customerId),
  statusText: statusMap[item.status] || '未知',
  items: item.items.map((orderItem: any) => ({
    ...orderItem,
    id: String(orderItem.id),
    orderId: String(item.id),
    productId: String(orderItem.productId),
    price: Number(orderItem.price),
    amount: Number((orderItem.price * orderItem.quantity).toFixed(2)),
  })),
}))
