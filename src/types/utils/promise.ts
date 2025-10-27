/**
 * Promise 类型工具
 * 提供 Promise 相关的类型操作
 */

/**
 * 提取 Promise 的返回类型
 * @example
 * type Result = UnwrapPromise<Promise<string>> // string
 * type Value = UnwrapPromise<number> // number
 */
// 从 core 模块导入和重新导出 Awaitable 类型
import type { Awaitable as AwaitableType } from '../core/primitives'

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * 深度提取 Promise 的返回类型
 * @example
 * type Result = DeepUnwrapPromise<Promise<Promise<string>>> // string
 */
export type DeepUnwrapPromise<T> = T extends Promise<infer U>
  ? DeepUnwrapPromise<U>
  : T

/**
 * 包装为 Promise 类型
 * @example
 * type Result1 = WrapPromise<string> // Promise<string>
 * type Result2 = WrapPromise<Promise<string>> // Promise<string>
 */
export type WrapPromise<T> = T extends Promise<any> ? T : Promise<T>
export type { Awaitable } from '../core/primitives'

/**
 * 深度可等待类型
 * @example
 * interface User { name: string; profile: { age: number } }
 * type AwaitableUser = DeepAwaitable<User>
 * // { name: string | Promise<string>; profile: { age: number | Promise<number> } | Promise<...> }
 */
export type DeepAwaitable<T> = T extends object
  ? { [K in keyof T]: DeepAwaitable<T[K]> }
  : AwaitableType<T>

/**
 * Promise 或值类型
 * @example
 * const value: MaybePromise<string> = "hello"
 * const promise: MaybePromise<string> = Promise.resolve("hello")
 */
export type MaybePromise<T> = T | Promise<T>

/**
 * Promise 元组类型
 * @example
 * type Promises = PromiseTuple<[string, number, boolean]>
 * // [Promise<string>, Promise<number>, Promise<boolean>]
 */
export type PromiseTuple<T extends any[]> = {
  [K in keyof T]: Promise<T[K]>
}

/**
 * Promise 对象类型
 * @example
 * type Promises = PromiseObject<{ name: string; age: number }>
 * // { name: Promise<string>; age: Promise<number> }
 */
export type PromiseObject<T extends Record<string, any>> = {
  [K in keyof T]: Promise<T[K]>
}

/**
 * 提取 Promise.all 的返回类型
 */
export type PromiseAllResult<T extends readonly any[]> = {
  [K in keyof T]: UnwrapPromise<T[K]>
}

/**
 * 提取 Promise.allSettled 的返回类型
 */
export type PromiseAllSettledResult<T extends readonly any[]> = {
  [K in keyof T]: PromiseSettledResult<UnwrapPromise<T[K]>>
}

/**
 * Promise 状态类型
 */
export type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

/**
 * Promise 结果类型
 */
export type PromiseResult<T> =
  | { status: 'fulfilled', value: T }
  | { status: 'rejected', reason: any }

/**
 * Promise 执行器类型
 */
export type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void

/**
 * Promise 解析函数类型
 */
export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void

/**
 * Promise 拒绝函数类型
 */
export type PromiseRejecter = (reason?: any) => void

/**
 * Promise then 回调类型
 */
export type PromiseThenCallback<T, R = T> = (value: T) => R | PromiseLike<R>

/**
 * Promise catch 回调类型
 */
export type PromiseCatchCallback<R = never> = (reason: any) => R | PromiseLike<R>

/**
 * Promise finally 回调类型
 */
export type PromiseFinallyCallback = () => void

/**
 * 可取消的 Promise 类型
 */
export interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void
  isCancelled: () => boolean
}

/**
 * 可重试的 Promise 类型
 */
export interface RetryablePromise<T> extends Promise<T> {
  retry: (times?: number) => Promise<T>
  getAttempts: () => number
}

/**
 * 带超时的 Promise 类型
 */
export interface TimeoutPromise<T> extends Promise<T> {
  timeout: number
  clearTimeout: () => void
}

/**
 * Promise 包装器类型
 */
export interface PromiseWrapper<T> {
  promise: Promise<T>
  resolve: PromiseResolver<T>
  reject: PromiseRejecter
  status: PromiseStatus
}

/**
 * Promise 队列项类型
 */
export interface PromiseQueueItem<T = any> {
  id: string | number
  promise: () => Promise<T>
  priority?: number
  timeout?: number
  retries?: number
}

/**
 * Promise 池配置类型
 */
export interface PromisePoolConfig {
  concurrency: number
  timeout?: number
  retries?: number
  onProgress?: (completed: number, total: number) => void
  onError?: (error: Error, item: any) => void
}

/**
 * Promise 缓存类型
 */
export interface PromiseCache<T = any> {
  get: (key: string) => Promise<T> | undefined
  set: (key: string, promise: Promise<T>) => void
  has: (key: string) => boolean
  delete: (key: string) => boolean
  clear: () => void
}

/**
 * Deferred Promise 类型
 */
export interface Deferred<T> {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  status: PromiseStatus
}
