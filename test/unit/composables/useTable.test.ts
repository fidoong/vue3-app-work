/**
 * useTable Composable 测试
 */

import { describe, expect, it, vi } from 'vitest'
import { useTable } from '~/composables/useTable'

describe('useTable', () => {
  it('should initialize with default values', () => {
    const mockApi = vi.fn().mockResolvedValue({
      data: { list: [], total: 0 },
    })

    const { dataSource, loading, total, pagination } = useTable({
      api: mockApi,
      immediate: false,
    })

    expect(dataSource.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(total.value).toBe(0)
    expect(pagination.current).toBe(1)
    expect(pagination.pageSize).toBe(10)
  })

  it('should load data on initialization when immediate is true', async () => {
    const mockData = {
      data: {
        list: [{ id: 1, name: 'Test' }],
        total: 1,
      },
    }
    const mockApi = vi.fn().mockResolvedValue(mockData)

    const { dataSource, total } = useTable({
      api: mockApi,
      immediate: true,
    })

    // 等待异步操作完成
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(mockApi).toHaveBeenCalled()
    expect(dataSource.value).toEqual(mockData.data.list)
    expect(total.value).toBe(1)
  })

  it('should handle search correctly', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      data: { list: [], total: 0 },
    })

    const { search, pagination } = useTable({
      api: mockApi,
      immediate: false,
    })

    await search({ keyword: 'test' })

    expect(pagination.current).toBe(1)
    expect(mockApi).toHaveBeenCalledWith(
      expect.objectContaining({ keyword: 'test' }),
    )
  })
})
