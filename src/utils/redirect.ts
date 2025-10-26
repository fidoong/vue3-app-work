/**
 * 页面重定向工具
 */

import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

/**
 * 重定向配置
 */
export interface RedirectOptions {
  /** 目标路径 */
  path: string
  /** 查询参数 */
  query?: Record<string, any>
  /** 是否替换历史记录 */
  replace?: boolean
}

/**
 * 执行页面重定向
 * @param router - Vue Router 实例
 * @param options - 重定向配置
 */
export async function redirectTo(
  router: Router,
  options: RedirectOptions,
): Promise<void> {
  const { path, query, replace = true } = options

  const redirectQuery = {
    redirect: path,
    ...query,
  }

  if (replace) {
    await router.replace({
      path: '/redirect',
      query: redirectQuery,
    })
  }
  else {
    await router.push({
      path: '/redirect',
      query: redirectQuery,
    })
  }
}

/**
 * 从路由中解析重定向信息
 * @param route - 当前路由
 * @returns 重定向路径和查询参数
 */
export function parseRedirect(route: RouteLocationNormalizedLoaded): {
  path: string
  query?: Record<string, any>
} {
  const { redirect, ...query } = route.query
  const path = (redirect as string) || '/'

  return {
    path,
    query: Object.keys(query).length > 0 ? query : undefined,
  }
}

/**
 * 刷新当前页面（通过重定向）
 * @param router - Vue Router 实例
 */
export async function refreshCurrentPage(router: Router): Promise<void> {
  const route = router.currentRoute.value

  await redirectTo(router, {
    path: route.path,
    query: route.query as Record<string, any>,
  })
}
