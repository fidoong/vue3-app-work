/**
 * 泛型工具类型
 * 提供通用的类型转换和操作工具
 */

// 深度类型已移至 object.ts，这里重新导出
// 导入用于类型别名
import type { DeepReadonly } from './object'

export type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  DeepWritable,
} from './object'

/**
 * 深度不可变（与 DeepReadonly 相同）
 */
export type DeepImmutable<T> = DeepReadonly<T>

/**
 * 覆盖类型（用新类型覆盖旧类型的部分属性）
 * @example
 * interface User { id: number; name: string; age: number }
 * interface UserUpdate { age: string; email: string }
 * type Result = Override<User, UserUpdate>
 * // { id: number; name: string; age: string; email: string }
 */
export type Override<T, U> = Omit<T, keyof U> & U

/**
 * 合并类型（保留两个类型的所有属性）
 * @example
 * interface A { x: number; y: string }
 * interface B { y: number; z: boolean }
 * type C = Merge<A, B>
 * // { x: number; y: number; z: boolean }
 */
export type Merge<T, U> = Omit<T, keyof U> & U

/**
 * 交叉类型（取两个类型的交集）
 * @example
 * interface A { x: number; y: string; z: boolean }
 * interface B { y: string; z: boolean; w: number }
 * type C = Intersect<A, B>
 * // { y: string; z: boolean }
 */
export type Intersect<T, U> = Pick<T, Extract<keyof T, keyof U>>

/**
 * 差集类型（从 T 中排除 U 的属性）
 * @example
 * interface A { x: number; y: string; z: boolean }
 * interface B { y: string; z: boolean }
 * type C = Diff<A, B>
 * // { x: number }
 */
export type Diff<T, U> = Omit<T, keyof U>

/**
 * 必填指定字段
 * @example
 * interface User { name?: string; age?: number; email?: string }
 * type UserWithName = RequiredKeys<User, 'name'>
 * // { name: string; age?: number; email?: string }
 */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * 可选指定字段
 * @example
 * interface User { name: string; age: number; email: string }
 * type UserPartial = PartialKeys<User, 'age' | 'email'>
 * // { name: string; age?: number; email?: string }
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 只读指定字段
 * @example
 * interface User { name: string; age: number }
 * type UserReadonly = ReadonlyKeys<User, 'name'>
 * // { readonly name: string; age: number }
 */
export type ReadonlyKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

/**
 * 可写指定字段
 * @example
 * interface User { readonly name: string; readonly age: number }
 * type UserWritable = WritableKeys<User, 'age'>
 * // { readonly name: string; age: number }
 */
export type WritableKeys<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P]
}

/**
 * 严格的 Omit（确保 K 是 T 的键）
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

/**
 * 严格的 Pick（确保 K 是 T 的键）
 */
export type StrictPick<T, K extends keyof T> = Pick<T, K>

/**
 * 提取可选字段
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never
}[keyof T]

/**
 * 提取必填字段
 */
export type RequiredKeysOf<T> = Exclude<keyof T, OptionalKeys<T>>

/**
 * 提取只读字段
 */
export type ReadonlyKeysOf<T> = {
  [K in keyof T]-?: (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends <
    U,
  >() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
    ? never
    : K
}[keyof T]

/**
 * 提取可写字段
 */
export type WritableKeysOf<T> = {
  [K in keyof T]-?: (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends <
    U,
  >() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
    ? K
    : never
}[keyof T]

/**
 * 可空化（所有字段可为 null）
 * @example
 * interface User { name: string; age: number }
 * type NullableUser = Nullable<User>
 * // { name: string | null; age: number | null }
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

/**
 * 可选化（所有字段可为 undefined）
 * @example
 * interface User { name: string; age: number }
 * type MaybeUser = MaybeFields<User>
 * // { name: string | undefined; age: number | undefined }
 */
export type MaybeFields<T> = {
  [P in keyof T]: T[P] | undefined
}

/**
 * 非空化（移除所有 null 和 undefined）
 * @example
 * interface User { name: string | null; age: number | undefined }
 * type NonNullUser = NonNullableFields<User>
 * // { name: string; age: number }
 */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

/**
 * 条件类型辅助
 */
export type If<C extends boolean, T, F> = C extends true ? T : F

/**
 * 判断是否为 any 类型
 */
export type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * 判断是否为 never 类型
 */
export type IsNever<T> = [T] extends [never] ? true : false

/**
 * 判断是否为 unknown 类型
 */
export type IsUnknown<T> = IsAny<T> extends true
  ? false
  : unknown extends T
    ? true
    : false

/**
 * 判断是否为空对象
 */
export type IsEmptyObject<T> = keyof T extends never ? true : false

/**
 * 判断两个类型是否相等
 */
export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false

/**
 * 判断 T 是否继承自 U
 */
export type IsExtends<T, U> = T extends U ? true : false

/**
 * 排除 never 类型的字段
 */
export type ExcludeNever<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K
  }[keyof T]
>

/**
 * 扁平化对象类型（移除嵌套）
 */
export type Flatten<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T

/**
 * 递归扁平化（简化版，避免深度递归）
 */
export type DeepFlatten<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T
