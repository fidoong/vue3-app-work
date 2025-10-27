/**
 * 树形数据处理工具函数
 */

export interface TreeNode<T = any> {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode<T>[]
  [key: string]: any
}

export interface TreeOptions {
  idKey?: string
  parentIdKey?: string
  childrenKey?: string
  rootValue?: any
}

/**
 * 扁平数组转树形结构
 * @param list - 扁平数组
 * @param options - 配置选项
 * @returns 树形结构数组
 * @example
 * const list = [
 *   { id: 1, name: '父节点', parentId: null },
 *   { id: 2, name: '子节点1', parentId: 1 },
 *   { id: 3, name: '子节点2', parentId: 1 }
 * ]
 * listToTree(list)
 * // [{ id: 1, name: '父节点', children: [{ id: 2, ... }, { id: 3, ... }] }]
 */
export function listToTree<T extends Record<string, any>>(
  list: T[],
  options: TreeOptions = {},
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootValue = null,
  } = options

  const map = new Map<any, T & { children?: T[] }>()
  const result: (T & { children?: T[] })[] = []

  // 创建映射
  list.forEach((item) => {
    map.set(item[idKey], { ...item })
  })

  // 构建树
  list.forEach((item) => {
    const node = map.get(item[idKey])!
    const parentId = item[parentIdKey]

    if (parentId === rootValue || parentId === undefined || parentId === null) {
      result.push(node)
    }
    else {
      const parent = map.get(parentId)
      if (parent) {
        if (!(parent as any)[childrenKey])
          (parent as any)[childrenKey] = [];
        (parent as any)[childrenKey].push(node)
      }
    }
  })

  return result as T[]
}

/**
 * 树形结构转扁平数组
 * @param tree - 树形结构数组
 * @param options - 配置选项
 * @returns 扁平数组（包含 level 层级信息）
 * @example
 * const tree = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }]
 * treeToList(tree)
 * // [{ id: 1, level: 0 }, { id: 2, level: 1 }, { id: 3, level: 1 }]
 */
export function treeToList<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {},
): T[] {
  const { childrenKey = 'children' } = options
  const result: T[] = []

  function traverse(nodes: T[], level = 0) {
    nodes.forEach((node) => {
      const children = (node as any)[childrenKey]
      const nodeWithLevel = { ...node, level }
      delete (nodeWithLevel as any)[childrenKey]
      result.push(nodeWithLevel)

      if (children && Array.isArray(children))
        traverse(children, level + 1)
    })
  }

  traverse(tree)
  return result
}

/**
 * 查找树节点
 * @param tree - 树形结构数组
 * @param predicate - 查找条件函数
 * @param options - 配置选项
 * @returns 找到的节点或 null
 * @example
 * const tree = [{ id: 1, children: [{ id: 2, name: 'target' }] }]
 * findTreeNode(tree, node => node.name === 'target')
 * // { id: 2, name: 'target' }
 */
export function findTreeNode<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {},
): T | null {
  const { childrenKey = 'children' } = options

  for (const node of tree) {
    if (predicate(node))
      return node

    const children = node[childrenKey]
    if (children && Array.isArray(children)) {
      const found = findTreeNode(children, predicate, options)
      if (found)
        return found
    }
  }

  return null
}

/**
 * 查找树节点路径
 */
export function findTreePath<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {},
): T[] | null {
  const { childrenKey = 'children' } = options

  function traverse(nodes: T[], path: T[]): T[] | null {
    for (const node of nodes) {
      const currentPath = [...path, node]

      if (predicate(node))
        return currentPath

      const children = node[childrenKey]
      if (children && Array.isArray(children)) {
        const found = traverse(children, currentPath)
        if (found)
          return found
      }
    }

    return null
  }

  return traverse(tree, [])
}

/**
 * 过滤树节点（保留符合条件的节点及其父节点）
 * @param tree - 树形结构数组
 * @param predicate - 过滤条件函数
 * @param options - 配置选项
 * @returns 过滤后的树形结构
 * @example
 * const tree = [{ id: 1, status: 'active', children: [{ id: 2, status: 'inactive' }] }]
 * filterTree(tree, node => node.status === 'active')
 * // [{ id: 1, status: 'active', children: [] }]
 */
export function filterTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {},
): T[] {
  const { childrenKey = 'children' } = options

  return tree.reduce<T[]>((acc, node) => {
    const children = node[childrenKey]
    const filteredChildren = children && Array.isArray(children)
      ? filterTree(children, predicate, options)
      : []

    if (predicate(node) || filteredChildren.length > 0) {
      acc.push({
        ...node,
        [childrenKey]: filteredChildren.length > 0 ? filteredChildren : undefined,
      })
    }

    return acc
  }, [])
}

/**
 * 遍历树节点
 */
export function traverseTree<T extends Record<string, any>>(
  tree: T[],
  callback: (node: T, level: number, parent?: T) => void,
  options: TreeOptions = {},
): void {
  const { childrenKey = 'children' } = options

  function traverse(nodes: T[], level = 0, parent?: T) {
    nodes.forEach((node) => {
      callback(node, level, parent)

      const children = node[childrenKey]
      if (children && Array.isArray(children))
        traverse(children, level + 1, node)
    })
  }

  traverse(tree)
}

/**
 * 映射树节点
 */
export function mapTree<T extends Record<string, any>, R extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => R,
  options: TreeOptions = {},
): R[] {
  const { childrenKey = 'children' } = options

  return tree.map((node) => {
    const children = node[childrenKey]
    const mappedNode = mapper(node)

    if (children && Array.isArray(children)) {
      return {
        ...mappedNode,
        [childrenKey]: mapTree(children, mapper, options),
      }
    }

    return mappedNode
  })
}

/**
 * 获取树的所有叶子节点
 */
export function getTreeLeaves<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {},
): T[] {
  const { childrenKey = 'children' } = options
  const leaves: T[] = []

  traverseTree(tree, (node) => {
    const children = node[childrenKey]
    if (!children || !Array.isArray(children) || children.length === 0)
      leaves.push(node)
  }, options)

  return leaves
}

/**
 * 获取树的最大深度
 */
export function getTreeDepth<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {},
): number {
  const { childrenKey = 'children' } = options
  let maxDepth = 0

  function traverse(nodes: T[], depth: number) {
    if (depth > maxDepth)
      maxDepth = depth

    nodes.forEach((node) => {
      const children = node[childrenKey]
      if (children && Array.isArray(children))
        traverse(children, depth + 1)
    })
  }

  traverse(tree, 1)
  return maxDepth
}
