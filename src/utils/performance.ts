/**
 * 性能优化工具函数
 */

/**
 * 防抖函数（在事件停止触发 n 毫秒后执行）
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 * @example
 * const handleSearch = debounce((keyword) => {
 *   console.log('搜索:', keyword)
 * }, 500)
 * // 用户输入时，只有停止输入 500ms 后才会执行搜索
 * handleSearch('vue')
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 300,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * 节流函数（在 n 毫秒内最多执行一次）
 * @param func - 要节流的函数
 * @param wait - 间隔时间（毫秒）
 * @returns 节流后的函数
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('滚动位置:', window.scrollY)
 * }, 200)
 * // 滚动时，每 200ms 最多执行一次
 * window.addEventListener('scroll', handleScroll)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 300,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    }
    else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 延迟执行
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    times?: number
    delay?: number
    onRetry?: (error: Error, attempt: number) => void
  } = {},
): Promise<T> {
  const { times = 3, delay: delayMs = 1000, onRetry } = options

  let lastError: Error

  for (let i = 0; i < times; i++) {
    try {
      return await fn()
    }
    catch (error) {
      lastError = error as Error
      if (onRetry)
        onRetry(lastError, i + 1)

      if (i < times - 1)
        await delay(delayMs)
    }
  }

  throw new Error(lastError!.message)
}

/**
 * 请求动画帧节流
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => void {
  let rafId: number | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (rafId !== null)
      return

    rafId = requestAnimationFrame(() => {
      func.apply(this, args)
      rafId = null
    })
  }
}

/**
 * 空闲时执行
 */
export function runWhenIdle(callback: () => void, timeout = 1000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  }
  else {
    setTimeout(callback, timeout)
  }
}

/**
 * 批量执行
 */
export async function batchExecute<T, R>(
  items: T[],
  handler: (item: T) => Promise<R>,
  batchSize = 10,
): Promise<R[]> {
  const results: R[] = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(handler))
    results.push(...batchResults)
  }

  return results
}

/**
 * 缓存函数结果
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>()

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args)

    if (cache.has(key))
      return cache.get(key)!

    const result = func.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}
