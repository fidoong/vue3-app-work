import Mock from 'mockjs'

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
 * 商品分类映射
 */
const categoryMap: Record<string, string> = {
  electronics: '电子产品',
  clothing: '服装鞋包',
  food: '食品饮料',
  home: '家居用品',
}

/**
 * 生成商品列表
 */
export const products: Product[] = Mock.mock({
  'list|100': [
    {
      'id|+1': 1,
      'productName': '@ctitle(5, 15)',
      'productCode': () => `PRD${Mock.Random.integer(10000, 99999)}`,
      'category|1': ['electronics', 'clothing', 'food', 'home'],
      'price': '@float(10, 5000, 2, 2)',
      'stock|0-1000': 100,
      'unit|1': ['件', '个', '台', '套', '箱', '盒'],
      'image': () => `https://picsum.photos/400/400?random=${Mock.Random.integer(1, 1000)}`,
      'description': '@cparagraph(1, 3)',
      'status|1': [0, 1],
      'createTime': '@datetime',
      'updateTime': '@datetime',
    },
  ],
}).list.map((item: any) => ({
  ...item,
  id: String(item.id),
  categoryText: categoryMap[item.category] || '其他',
}))
