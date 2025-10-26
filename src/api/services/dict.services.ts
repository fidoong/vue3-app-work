/**
 * 数据字典服务
 * 展示如何使用缓存管理数据字典
 */
import { apiClient } from '../../lib/http/clients'

/**
 * 数据字典类型
 */
export enum DictType {
  STATUS = 'status',
  CATEGORY = 'category',
  ROLE = 'role',
  PRIORITY = 'priority',
  GENDER = 'gender',
  DEPARTMENT = 'department',
}

/**
 * 字典项接口
 */
export interface DictItem {
  label: string
  value: string | number
  color?: string
  icon?: string
  disabled?: boolean
  children?: DictItem[]
}

/**
 * 数据字典服务类
 */
class DictionaryService {
  /**
   * 缓存时间：30分钟
   */
  private readonly CACHE_TTL = 30 * 60 * 1000

  /**
   * 获取字典数据
   */
  async getDict(type: DictType | string): Promise<DictItem[]> {
    // 先尝试从缓存获取
    const cached = apiClient.getCache('/dict', { type })
    if (cached?.data) {
      return cached.data
    }

    // 缓存不存在，发起请求
    const response = await apiClient.get<DictItem[]>('/dict', { type }, {
      useCache: true,
      cacheTTL: this.CACHE_TTL,
      showLoading: false,
    })

    return response.data
  }

  /**
   * 获取字典项的标签
   */
  async getDictLabel(type: DictType | string, value: string | number): Promise<string> {
    const items = await this.getDict(type)
    const item = items.find(item => item.value === value)
    return item?.label || String(value)
  }

  /**
   * 批量获取字典项的标签
   */
  async getDictLabels(type: DictType | string, values: Array<string | number>): Promise<string[]> {
    const items = await this.getDict(type)
    return values.map((value) => {
      const item = items.find(item => item.value === value)
      return item?.label || String(value)
    })
  }

  /**
   * 获取字典项的颜色
   */
  async getDictColor(type: DictType | string, value: string | number): Promise<string | undefined> {
    const items = await this.getDict(type)
    const item = items.find(item => item.value === value)
    return item?.color
  }

  /**
   * 预加载所有字典
   */
  async preloadAll(): Promise<void> {
    const types = Object.values(DictType)
    const promises = types.map(type => this.getDict(type))
    await Promise.all(promises)
  }

  /**
   * 刷新指定字典
   */
  async refresh(type: DictType | string): Promise<DictItem[]> {
    // 删除缓存
    apiClient.deleteCache('/dict', { type })

    // 重新获取
    return this.getDict(type)
  }

  /**
   * 刷新所有字典
   */
  async refreshAll(): Promise<void> {
    // 删除所有字典缓存
    apiClient.deleteCacheByUrl('/dict')

    // 重新加载
    await this.preloadAll()
  }

  /**
   * 检查字典是否已缓存
   */
  isCached(type: DictType | string): boolean {
    const cached = apiClient.getCache('/dict', { type })
    return !!cached
  }

  /**
   * 获取所有已缓存的字典类型
   */
  getCachedTypes(): string[] {
    const allCache = apiClient.findCache('/dict')
    return allCache.map((cache) => {
      const match = cache.key.match(/type":"([^"]+)"/)
      return match ? match[1] : ''
    }).filter(Boolean)
  }

  /**
   * 手动设置字典缓存（用于离线数据）
   */
  setCache(type: DictType | string, data: DictItem[]): void {
    apiClient.setCache('/dict', { data }, { type }, this.CACHE_TTL)
  }

  /**
   * 清除所有字典缓存
   */
  clearCache(): void {
    apiClient.deleteCacheByUrl('/dict')
  }
}

/**
 * 导出单例
 */
export const dictionaryService = new DictionaryService()

/**
 * ========== 便捷方法 ==========
 */

/**
 * 获取状态字典
 */
export const getStatusDict = () => dictionaryService.getDict(DictType.STATUS)

/**
 * 获取分类字典
 */
export const getCategoryDict = () => dictionaryService.getDict(DictType.CATEGORY)

/**
 * 获取角色字典
 */
export const getRoleDict = () => dictionaryService.getDict(DictType.ROLE)

/**
 * 获取优先级字典
 */
export const getPriorityDict = () => dictionaryService.getDict(DictType.PRIORITY)

/**
 * 获取性别字典
 */
export const getGenderDict = () => dictionaryService.getDict(DictType.GENDER)

/**
 * 获取部门字典
 */
export const getDepartmentDict = () => dictionaryService.getDict(DictType.DEPARTMENT)

/**
 * ========== 使用示例 ==========
 */

/**
 * 示例1: 在组件中使用
 */
export async function exampleUsage() {
  // 获取状态字典
  const statusList = await getStatusDict()

  // 获取状态标签
  const label = await dictionaryService.getDictLabel(DictType.STATUS, 1)

  // 批量获取标签
  const labels = await dictionaryService.getDictLabels(DictType.STATUS, [1, 2, 3])

  return { statusList, label, labels }
}

/**
 * 示例2: 应用启动时预加载
 */
export async function initDictionaries() {
  try {
    await dictionaryService.preloadAll()
  }
  catch (error) {
    console.error('字典预加载失败:', error)
  }
}

/**
 * 示例3: 管理后台更新字典后刷新
 */
export async function onDictUpdated(type: DictType) {
  await dictionaryService.refresh(type)
}
