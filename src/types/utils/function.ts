/**
 * 函数类型工具
 * 提供函数相关的类型操作
 */

/**
 * 提取函数的参数类型
 * @example
 * type Params = FunctionParams<(a: string, b: number) => void> // [string, number]
 */
export type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

/**
 * 提取函数的返回类型
 * @example
 * type Return = FunctionReturn<() => string> // string
 * type Result = FunctionReturn<(x: number) => Promise<User>> // Promise<User>
 */
export type FunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never

/**
 * 提取函数的第一个参数类型
 * @example
 * type First = FirstParameter<(a: string, b: number) => void> // string
 */
export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0]

/**
 * 提取函数的最后一个参数类型
 * @example
 * type Last = LastParameter<(a: string, b: number, c: boolean) => void> // boolean
 */
export type LastParameter<T extends (...args: any) => any> = Parameters<T> extends [
  ...any[],
  infer L,
]
  ? L
  : never

/**
 * 构造函数类型
 * @example
 * const UserClass: Constructor<User> = class User { ... }
 * function createInstance<T>(Ctor: Constructor<T>): T { return new Ctor() }
 */
export type Constructor<T = any, Args extends any[] = any[]> = new (...args: Args) => T

/**
 * 抽象构造函数类型
 * @example
 * abstract class BaseClass { ... }
 * const Base: AbstractConstructor<BaseClass> = BaseClass
 */
export type AbstractConstructor<T = any, Args extends any[] = any[]> = abstract new (
  ...args: Args
) => T

/**
 * 类类型（包括普通类和抽象类）
 * @example
 * function mixin<T>(Base: Class<T>) { ... }
 */
export type Class<T = any, Args extends any[] = any[]> =
  | Constructor<T, Args>
  | AbstractConstructor<T, Args>

/**
 * 可调用类型
 * @example
 * const fn: Callable<[string, number], boolean> = (a, b) => a.length > b
 */
export type Callable<Args extends any[] = any[], R = any> = (...args: Args) => R

/**
 * 异步函数类型
 * @example
 * const fetchUser: AsyncFunction<[string], User> = async (id) => { ... }
 */
export type AsyncFunction<Args extends any[] = any[], R = any> = (
  ...args: Args
) => Promise<R>

/**
 * 同步函数类型
 */
export type SyncFunction<Args extends any[] = any[], R = any> = (...args: Args) => R

/**
 * 函数或值类型
 */
export type MaybeFunction<T, Args extends any[] = []> = T | ((...args: Args) => T)

/**
 * 提取实例类型
 */
export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never

/**
 * 提取构造函数参数类型
 */
export type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never

/**
 * 函数重载类型
 */
export type Overload<T> = T extends {
  (...args: infer A1): infer R1
  (...args: infer A2): infer R2
  (...args: infer A3): infer R3
  (...args: infer A4): infer R4
}
  ? [
      (...args: A1) => R1,
      (...args: A2) => R2,
      (...args: A3) => R3,
      (...args: A4) => R4,
    ]
  : T extends {
    (...args: infer A1): infer R1
    (...args: infer A2): infer R2
    (...args: infer A3): infer R3
  }
    ? [(...args: A1) => R1, (...args: A2) => R2, (...args: A3) => R3]
    : T extends {
      (...args: infer A1): infer R1
      (...args: infer A2): infer R2
    }
      ? [(...args: A1) => R1, (...args: A2) => R2]
      : T extends (...args: infer A) => infer R
        ? [(...args: A) => R]
        : never

/**
 * 柯里化函数类型
 */
export type Curry<P extends any[], R> = P extends [infer H, ...infer T]
  ? (arg: H) => Curry<T, R>
  : R

/**
 * 反柯里化函数类型
 */
export type Uncurry<F> = F extends (arg: infer A) => infer R
  ? R extends (...args: infer Args) => infer Ret
    ? (arg: A, ...args: Args) => Ret
    : (arg: A) => R
  : never

/**
 * 函数组合类型
 */
export type Compose<F extends any[], R = any> = F extends [
  (...args: any[]) => infer R1,
  ...infer Rest,
]
  ? Rest extends [(...args: any[]) => any, ...any[]]
    ? (arg: R1) => Compose<Rest, R>
    : R1
  : R

/**
 * 管道函数类型
 */
export type Pipe<F extends any[], R = any> = F extends [...infer Rest, (...args: any[]) => infer R1]
  ? Rest extends [...any[], (...args: any[]) => any]
    ? Pipe<Rest, R1>
    : R1
  : R

/**
 * 防抖函数类型
 */
export interface Debounced<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void
  cancel: () => void
  flush: () => void
}

/**
 * 节流函数类型
 */
export interface Throttled<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void
  cancel: () => void
}

/**
 * 记忆化函数类型
 */
export interface Memoized<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): ReturnType<F>
  cache: Map<string, ReturnType<F>>
  clear: () => void
}

/**
 * 事件处理器类型
 */
export type EventHandler<E = Event> = (event: E) => void

/**
 * 回调函数类型
 */
export type Callback<T = void> = (result: T) => void

/**
 * 错误回调函数类型
 */
export type ErrorCallback = (error: Error) => void

/**
 * 成功回调函数类型
 */
export type SuccessCallback<T = any> = (data: T) => void

/**
 * 完成回调函数类型
 */
export type CompleteCallback = () => void

/**
 * 进度回调函数类型
 */
export type ProgressCallback = (progress: number, loaded: number, total: number) => void

/**
 * 验证函数类型
 */
export type Validator<T = any> = (value: T) => boolean | string | Promise<boolean | string>

/**
 * 转换函数类型
 */
export type Transformer<T = any, R = any> = (value: T) => R

/**
 * 比较函数类型
 */
export type Comparator<T = any> = (a: T, b: T) => number

/**
 * 谓词函数类型
 */
export type Predicate<T = any> = (value: T, index?: number, array?: T[]) => boolean

/**
 * 映射函数类型
 */
export type Mapper<T = any, R = any> = (value: T, index?: number, array?: T[]) => R

/**
 * 归约函数类型
 */
export type Reducer<T = any, R = any> = (accumulator: R, value: T, index?: number, array?: T[]) => R

/**
 * 过滤函数类型
 */
export type FilterFn<T = any> = (value: T, index?: number, array?: T[]) => boolean

/**
 * 查找函数类型
 */
export type Finder<T = any> = (value: T, index?: number, array?: T[]) => boolean
