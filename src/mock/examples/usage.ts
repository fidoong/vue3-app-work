/**
 * Mock 使用示例
 */
import { apiClient } from '~/lib'
/**
 * 示例 1: 获取字典数据
 */
export async function getDictExample() {
  // 获取状态字典
  const statusDict = await apiClient.get('/api/dict', { type: 'status' })
  // eslint-disable-next-line no-console
  console.log('状态字典:', statusDict.data)

  // 获取所有字典
  const allDict = await apiClient.get('/api/dict/all')
  // eslint-disable-next-line no-console
  console.log('所有字典:', allDict.data)

  // 批量获取字典
  const batchDict = await apiClient.post('/api/dict/batch', {
    types: ['status', 'gender', 'priority'],
  })
  // eslint-disable-next-line no-console
  console.log('批量字典:', batchDict.data)
}

/**
 * 示例 2: 用户登录
 */
export async function loginExample() {
  try {
    const result = await apiClient.post('/api/user/login', {
      username: 'admin',
      password: '123456',
    })
    // eslint-disable-next-line no-console
    console.log('登录成功:', result.data)

    // 保存 token
    localStorage.setItem('token', result.data.token)

    // 获取用户信息
    const userInfo = await apiClient.get('/api/user/info')
    // eslint-disable-next-line no-console
    console.log('用户信息:', userInfo.data)
  }
  catch (error) {
    console.error('登录失败:', error)
  }
}

/**
 * 示例 3: 表格数据 CRUD
 */
export async function tableCrudExample() {
  // 查询列表（分页）
  const list = await apiClient.get('/api/table', {
    page: 1,
    pageSize: 10,
  })
  // eslint-disable-next-line no-console
  console.log('列表数据:', list.data)

  // 查询详情
  const detail = await apiClient.get('/api/table/1')
  // eslint-disable-next-line no-console
  console.log('详情数据:', detail.data)

  // 新增
  const created = await apiClient.post('/api/table', {
    title: '新标题',
    description: '新描述',
    status: 1,
  })
  // eslint-disable-next-line no-console
  console.log('新增成功:', created.data)

  // 更新
  const updated = await apiClient.put('/api/table/1', {
    title: '更新后的标题',
  })
  // eslint-disable-next-line no-console
  console.log('更新成功:', updated.data)

  // 删除
  await apiClient.delete('/api/table/1')
  // eslint-disable-next-line no-console
  console.log('删除成功')

  // 批量删除
  await apiClient.delete('/api/table/batch', {
    ids: [1, 2, 3],
  })
  // eslint-disable-next-line no-console
  console.log('批量删除成功')
}

/**
 * 示例 4: 级联选择器
 */
export async function cascaderExample() {
  // 获取省份列表
  const provinces = await apiClient.get('/api/option/provinces')
  // eslint-disable-next-line no-console
  console.log('省份列表:', provinces.data)

  // 根据省份获取城市列表
  const cities = await apiClient.get('/api/option/cities', {
    province: '广东省',
  })
  // eslint-disable-next-line no-console
  console.log('城市列表:', cities.data)
}

/**
 * 示例 5: 在 Vue 组件中使用
 */
export function useTableData() {
  const loading = ref(false)
  const dataSource = ref([])
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchData = async () => {
    loading.value = true
    try {
      const result = await apiClient.get('/api/table', {
        page: pagination.current,
        pageSize: pagination.pageSize,
      })

      dataSource.value = result.data.list
      pagination.total = result.data.total
    }
    catch (error) {
      console.error('获取数据失败:', error)
    }
    finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    loading,
    dataSource,
    pagination,
    fetchData,
  }
}
