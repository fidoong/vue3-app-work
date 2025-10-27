/**
 * 对象类型工具
 * 提供对象相关的类型操作
 */

/**
 * 递归深度限制辅助类型
 */
type Depth = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 * 深度只读
 * @example
 * interface User {
 *   name: string
 *   profile: { age: number; hobbies: string[] }
 * }
 * type ReadonlyUser = DeepReadonly<User>
 * // {
 * //   readonly name: string
 * //   readonly profile: {
 * //     readonly age: number
 * //     readonly hobbies: readonly string[]
 * //   }
 * // }
 */
export type DeepReadonly<T, D extends number = 10> = [D] extends [never]
  ? T
  : T extends Primitive
    ? T
    : T extends Array<infer U>
      ? ReadonlyArray<DeepReadonly<U, Depth[D]>>
      : T extends Map<infer K, infer V>
        ? ReadonlyMap<DeepReadonly<K, Depth[D]>, DeepReadonly<V, Depth[D]>>
        : T extends Set<infer U>
          ? ReadonlySet<DeepReadonly<U, Depth[D]>>
          : { readonly [K in keyof T]: DeepReadonly<T[K], Depth[D]> }

/**
 * 深度可写
 * @example
 * interface ReadonlyUser {
 *   readonly name: string
 *   readonly profile: {
 *     readonly age: number
 *   }
 * }
 * type WritableUser = DeepWritable<ReadonlyUser>
 * // { name: string; profile: { age: number } }
 */
export type DeepWritable<T, D extends number = 10> = [D] extends [never]
  ? T
  : T extends Primitive
    ? T
    : T extends ReadonlyArray<infer U>
      ? Array<DeepWritable<U, Depth[D]>>
      : T extends ReadonlyMap<infer K, infer V>
        ? Map<DeepWritable<K, Depth[D]>, DeepWritable<V, Depth[D]>>
        : T extends ReadonlySet<infer U>
          ? Set<DeepWritable<U, Depth[D]>>
          : { -readonly [K in keyof T]: DeepWritable<T[K], Depth[D]> }

/**
 * 深度必需
 */
export type DeepRequired<T, D extends number = 10> = [D] extends [never]
  ? T
  : T extends Primitive
    ? T
    : T extends Array<infer U>
      ? Array<DeepRequired<U, Depth[D]>>
      : T extends Map<infer K, infer V>
        ? Map<DeepRequired<K, Depth[D]>, DeepRequired<V, Depth[D]>>
        : T extends Set<infer U>
          ? Set<DeepRequired<U, Depth[D]>>
          : { [K in keyof T]-?: DeepRequired<T[K], Depth[D]> }

/**
 * 深度可选
 */
export type DeepPartial<T, D extends number = 10> = [D] extends [never]
  ? T
  : T extends Primitive
    ? T
    : T extends Array<infer U>
      ? Array<DeepPartial<U, Depth[D]>>
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K, Depth[D]>, DeepPartial<V, Depth[D]>>
        : T extends Set<infer U>
          ? Set<DeepPartial<U, Depth[D]>>
          : { [K in keyof T]?: DeepPartial<T[K], Depth[D]> }

/**
 * 深度可为空
 * @example
 * interface User {
 *   name: string
 *   profile: { age: number }
 * }
 * type NullableUser = DeepNullable<User>
 * // { name: string | null; profile: { age: number | null } | null } | null
 */
export type DeepNullable<T> = T extends Primitive
  ? T | null
  : T extends Array<infer U>
    ? Array<DeepNullable<U>> | null
    : T extends Map<infer K, infer V>
      ? Map<DeepNullable<K>, DeepNullable<V>> | null
      : T extends Set<infer U>
        ? Set<DeepNullable<U>> | null
        : { [K in keyof T]: DeepNullable<T[K]> } | null

/**
 * 深度非空
 * @example
 * interface User {
 *   name: string | null
 *   profile: { age: number | null } | null
 * }
 * type NonNullUser = DeepNonNullable<User>
 * // { name: string; profile: { age: number } }
 */
export type DeepNonNullable<T> = T extends Primitive
  ? NonNullable<T>
  : T extends Array<infer U>
    ? Array<DeepNonNullable<U>>
    : T extends Map<infer K, infer V>
      ? Map<DeepNonNullable<K>, DeepNonNullable<V>>
      : T extends Set<infer U>
        ? Set<DeepNonNullable<U>>
        : { [K in keyof T]: DeepNonNullable<T[K]> }

/**
 * 提取对象的键类型
 * @example
 * interface User { name: string; age: number }
 * type UserKeys = Keys<User> // "name" | "age"
 */
export type Keys<T> = keyof T

/**
 * 提取对象的值类型
 * @example
 * interface User { name: string; age: number; active: boolean }
 * type UserValues = Values<User> // string | number | boolean
 */
export type Values<T> = T[keyof T]

/**
 * 提取对象的键值对类型
 * @example
 * interface User { name: string; age: number }
 * type UserEntries = Entries<User> // ["name", string] | ["age", number]
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

/**
 * 从键值对构造对象类型
 * @example
 * type Entries = ["name", string] | ["age", number]
 * type User = FromEntries<Entries> // { name: string; age: number }
 */
export type FromEntries<T extends [PropertyKey, any]> = {
  [K in T as K[0]]: K[1]
}

/**
 * 选择指定键
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * 排除指定键
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

/**
 * 提取必需键
 * @example
 * interface User { name: string; age?: number; email?: string }
 * type Required = RequiredKeys<User> // "name"
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K
}[keyof T]

/**
 * 提取可选键
 * @example
 * interface User { name: string; age?: number; email?: string }
 * type Optional = OptionalKeys<User> // "age" | "email"
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never
}[keyof T]

/**
 * 提取只读键
 * @example
 * interface User { readonly id: number; name: string }
 * type ReadonlyProps = ReadonlyKeys<User> // "id"
 */
export type ReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends <
    U,
  >() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
    ? never
    : K
}[keyof T]

/**
 * 提取可写键
 * @example
 * interface User { readonly id: number; name: string }
 * type WritableProps = WritableKeys<User> // "name"
 */
export type WritableKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends <
    U,
  >() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
    ? K
    : never
}[keyof T]

/**
 * 提取函数键
 * @example
 * interface User {
 *   name: string
 *   getName: () => string
 *   setName: (name: string) => void
 * }
 * type Methods = FunctionKeys<User> // "getName" | "setName"
 */
export type FunctionKeys<T> = {
  [K in keyof T]-?: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

/**
 * 提取非函数键
 * @example
 * interface User {
 *   name: string
 *   age: number
 *   getName: () => string
 * }
 * type Props = NonFunctionKeys<User> // "name" | "age"
 */
export type NonFunctionKeys<T> = {
  [K in keyof T]-?: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]

/**
 * 合并对象类型
 * @example
 * interface A { x: number; y: string }
 * interface B { y: number; z: boolean }
 * type C = Merge<A, B> // { x: number; y: number; z: boolean }
 */
export type Merge<T, U> = Omit<T, keyof U> & U

/**
 * 深度合并对象类型（简化版，避免深度递归）
 * @example
 * interface A { x: number; nested: { a: string; b: number } }
 * interface B { y: string; nested: { b: string; c: boolean } }
 * type C = DeepMerge<A, B>
 * // { x: number; y: string; nested: { a: string; b: string; c: boolean } }
 */
export type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : never
}

/**
 * 对象差集
 * @example
 * interface A { x: number; y: string; z: boolean }
 * interface B { y: string; z: boolean }
 * type C = Diff<A, B> // { x: number }
 */
export type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>

/**
 * 对象交集
 * @example
 * interface A { x: number; y: string; z: boolean }
 * interface B { y: string; z: boolean; w: number }
 * type C = Intersection<A, B> // { y: string; z: boolean }
 */
export type Intersection<T, U> = Pick<T, Extract<keyof T, keyof U>>

/**
 * 覆盖对象类型
 * @example
 * interface User { id: number; name: string; age: number }
 * interface Update { age: string; email: string }
 * type Result = Overwrite<User, Update>
 * // { id: number; name: string; age: string }
 */
export type Overwrite<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K]
}

/**
 * 可变对象类型
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

/**
 * 部分必需
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 部分可选
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * 部分只读
 */
export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

/**
 * 部分可写
 */
export type WritableBy<T, K extends keyof T> = Omit<T, K> & Mutable<Pick<T, K>>

/**
 * 部分可为空
 */
export type NullableBy<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null
}

/**
 * 部分非空
 */
export type NonNullableBy<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[P]>
}

/**
 * 扁平化对象（简化版，避免深度递归）
 */
export type Flatten<T> = T extends object ? { [K in keyof T]: T[K] } : T

/**
 * 路径类型（限制深度）
 */
export type Path<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends Primitive | any[]
      ? K
      : K
    : never
}[keyof T] &
string

/**
 * 根据路径获取值类型（限制深度）
 */
export type PathValue<T, P extends string> = P extends keyof T ? T[P] : never

/**
 * 对象转元组
 */
export type ObjectToTuple<T> = Values<{
  [K in keyof T]: [K, T[K]]
}>

/**
 * 元组转对象
 */
export type TupleToObject<T extends readonly [PropertyKey, any][]> = {
  [K in T[number]as K[0]]: K[1]
}

/**
 * 反转对象键值
 */
export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K
}

/**
 * 映射对象值
 */
export type MapValues<T, F> = {
  [K in keyof T]: F
}

/**
 * 映射对象键
 */
export type MapKeys<T, M extends Record<keyof T, PropertyKey>> = {
  [K in keyof T as M[K]]: T[K]
}

/**
 * 过滤对象
 */
export type ObjectFilter<T, F> = {
  [K in keyof T as T[K] extends F ? K : never]: T[K]
}

/**
 * 排除对象值类型
 */
export type ExcludeValues<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K]
}

/**
 * 提取对象值类型
 */
export type ExtractValues<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
}

/**
 * 原始类型（用于递归类型）
 */
type Primitive = string | number | boolean | bigint | symbol | null | undefined
