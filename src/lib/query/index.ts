import type { App } from 'vue'
/**
 * TanStack Query 配置
 */
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

/**
 * 创建 Query Client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据过期时间（5分钟）
      staleTime: 5 * 60 * 1000,
      // 缓存时间（10分钟）
      gcTime: 10 * 60 * 1000,
      // 失败后重试次数
      retry: 1,
      // 重试延迟
      retryDelay: 1000,
      // 窗口聚焦时重新获取
      refetchOnWindowFocus: false,
      // 网络重连时重新获取
      refetchOnReconnect: true,
      // 挂载时重新获取
      refetchOnMount: true,
    },
    mutations: {
      // 失败后重试次数
      retry: 0,
    },
  },
})

/**
 * 安装 Vue Query 插件
 */
export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, {
    queryClient,
  })
}

// 导出 Vue Query 的核心功能
export {
  useInfiniteQuery,
  useIsFetching,
  useIsMutating,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query'

// 导出类型
export type {
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/vue-query'
