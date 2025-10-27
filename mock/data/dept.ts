/**
 * 部门信息（树形结构）
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
 * 部门树形数据
 */
export const deptTree: Dept[] = [
  {
    id: '1',
    parentId: null,
    deptName: '科技有限公司',
    orderNum: 1,
    leader: '张三',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    status: 1,
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
    children: [
      {
        id: '2',
        parentId: '1',
        deptName: '技术部',
        orderNum: 1,
        leader: '李四',
        phone: '13800138001',
        email: 'lisi@example.com',
        status: 1,
        createTime: '2024-01-01 00:00:00',
        updateTime: '2024-01-01 00:00:00',
        children: [
          {
            id: '3',
            parentId: '2',
            deptName: '前端组',
            orderNum: 1,
            leader: '王五',
            phone: '13800138002',
            email: 'wangwu@example.com',
            status: 1,
            createTime: '2024-01-01 00:00:00',
            updateTime: '2024-01-01 00:00:00',
          },
          {
            id: '4',
            parentId: '2',
            deptName: '后端组',
            orderNum: 2,
            leader: '赵六',
            phone: '13800138003',
            email: 'zhaoliu@example.com',
            status: 1,
            createTime: '2024-01-01 00:00:00',
            updateTime: '2024-01-01 00:00:00',
          },
          {
            id: '5',
            parentId: '2',
            deptName: '测试组',
            orderNum: 3,
            leader: '孙七',
            phone: '13800138004',
            email: 'sunqi@example.com',
            status: 1,
            createTime: '2024-01-01 00:00:00',
            updateTime: '2024-01-01 00:00:00',
          },
        ],
      },
      {
        id: '6',
        parentId: '1',
        deptName: '市场部',
        orderNum: 2,
        leader: '周八',
        phone: '13800138005',
        email: 'zhouba@example.com',
        status: 1,
        createTime: '2024-01-01 00:00:00',
        updateTime: '2024-01-01 00:00:00',
        children: [
          {
            id: '7',
            parentId: '6',
            deptName: '销售组',
            orderNum: 1,
            leader: '吴九',
            phone: '13800138006',
            email: 'wujiu@example.com',
            status: 1,
            createTime: '2024-01-01 00:00:00',
            updateTime: '2024-01-01 00:00:00',
          },
          {
            id: '8',
            parentId: '6',
            deptName: '运营组',
            orderNum: 2,
            leader: '郑十',
            phone: '13800138007',
            email: 'zhengshi@example.com',
            status: 1,
            createTime: '2024-01-01 00:00:00',
            updateTime: '2024-01-01 00:00:00',
          },
        ],
      },
      {
        id: '9',
        parentId: '1',
        deptName: '财务部',
        orderNum: 3,
        leader: '钱十一',
        phone: '13800138008',
        email: 'qianshiyi@example.com',
        status: 1,
        createTime: '2024-01-01 00:00:00',
        updateTime: '2024-01-01 00:00:00',
      },
      {
        id: '10',
        parentId: '1',
        deptName: '人事部',
        orderNum: 4,
        leader: '孙十二',
        phone: '13800138009',
        email: 'sunshier@example.com',
        status: 1,
        createTime: '2024-01-01 00:00:00',
        updateTime: '2024-01-01 00:00:00',
      },
    ],
  },
]

/**
 * 扁平化部门列表
 */
export function flattenDeptTree(tree: Dept[]): Dept[] {
  const result: Dept[] = []

  function traverse(nodes: Dept[]) {
    nodes.forEach((node) => {
      const { children, ...rest } = node
      result.push(rest)
      if (children && children.length > 0) {
        traverse(children)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 根据 ID 查找部门
 */
export function findDeptById(id: string, tree: Dept[] = deptTree): Dept | null {
  for (const dept of tree) {
    if (dept.id === id) {
      return dept
    }
    if (dept.children) {
      const found = findDeptById(id, dept.children)
      if (found)
        return found
    }
  }
  return null
}
