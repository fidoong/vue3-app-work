/**
 * 数组类型工具
 * 提供数组相关的类型操作
 */

/**
 * 提取数组的元素类型
 * @example
 * type Item = ArrayElement<string[]> // string
 * type User = ArrayElement<User[]> // User
 * type ReadonlyItem = ArrayElement<readonly number[]> // number
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : T extends readonly (infer U)[] ? U : never

/**
 * 元组转联合类型
 * @example
 * type Tuple = ['a', 'b', 'c']
 * type Union = TupleToUnion<Tuple> // 'a' | 'b' | 'c'
 */
export type TupleToUnion<T extends readonly any[]> = T[number]

/**
 * 联合类型转元组
 *
 * ⚠️ 警告：此类型由于递归复杂度问题暂时禁用
 * 在 TypeScript 5.8+ 中可能导致栈溢出
 *
 * 如需使用，请考虑：
 * 1. 手动定义元组类型
 * 2. 使用更简单的类型转换
 * 3. 限制联合类型的成员数量
 *
 * @deprecated 由于性能问题暂时禁用
 * @example
 * // type Union = 'a' | 'b' | 'c'
 * // type Tuple = UnionToTuple<Union> // ['a', 'b', 'c']
 */
export type UnionToTuple<T> = T extends any ? [T] : never

/**
 * 递归深度辅助类型（用于其他需要深度限制的类型）
 */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

/**
 * 联合类型转交叉类型
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

/**
 * 数组转只读数组
 * @example
 * type Arr = [1, 2, 3]
 * type ReadonlyArr = ToReadonlyArray<Arr> // readonly [1, 2, 3]
 */
export type ToReadonlyArray<T extends any[]> = readonly [...T]

/**
 * 只读数组转可写数组
 * @example
 * type ReadonlyArr = readonly [1, 2, 3]
 * type WritableArr = ToWritableArray<ReadonlyArr> // [1, 2, 3]
 */
export type ToWritableArray<T extends readonly any[]> = [...T]

/**
 * 获取数组第一个元素类型
 */
export type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never

/**
 * 获取数组最后一个元素类型
 */
export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never

/**
 * 获取数组除第一个元素外的类型
 */
export type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never

/**
 * 获取数组除最后一个元素外的类型
 */
export type Init<T extends any[]> = T extends [...infer I, any] ? I : never

/**
 * 数组长度
 */
export type Length<T extends any[]> = T['length']

/**
 * 数组是否为空
 */
export type IsEmpty<T extends any[]> = T extends [] ? true : false

/**
 * 数组连接
 */
export type Concat<T extends any[], U extends any[]> = [...T, ...U]

/**
 * 数组反转
 */
export type Reverse<T extends any[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : []

/**
 * 数组去重
 */
export type Unique<T extends any[], U extends any[] = []> = T extends [infer F, ...infer R]
  ? F extends U[number]
    ? Unique<R, U>
    : Unique<R, [...U, F]>
  : U

/**
 * 数组包含
 */
export type Includes<T extends any[], U> = U extends T[number] ? true : false

/**
 * 数组查找索引
 */
export type IndexOf<T extends any[], U, Index extends any[] = []> = T extends [
  infer F,
  ...infer R,
]
  ? F extends U
    ? Index['length']
    : IndexOf<R, U, [...Index, any]>
  : -1

/**
 * 数组切片
 */
export type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = T['length'],
> = T extends [...infer L, ...infer R]
  ? L['length'] extends Start
    ? R['length'] extends End
      ? R
      : Slice<R, Start, End>
    : Slice<L, Start, End>
  : T

/**
 * 数组填充
 */
export type Fill<
  T extends any[],
  V,
  Start extends number = 0,
  End extends number = T['length'],
> = T extends [infer F, ...infer R]
  ? Start extends 0
    ? End extends 0
      ? [F, ...Fill<R, V, 0, End>]
      : [V, ...Fill<R, V, 0, Prev[End]>]
    : [F, ...Fill<R, V, Prev[Start], Prev[End]>]
  : T

/**
 * 数组扁平化
 */
export type Flatten<T extends any[], Depth extends number = 1> = Depth extends 0
  ? T
  : T extends [infer F, ...infer R]
    ? F extends any[]
      ? [...Flatten<F, Prev[Depth]>, ...Flatten<R, Depth>]
      : [F, ...Flatten<R, Depth>]
    : T

/**
 * 深度扁平化
 */
export type DeepFlatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...DeepFlatten<F>, ...DeepFlatten<R>]
    : [F, ...DeepFlatten<R>]
  : T

/**
 * 数组映射
 */
export type Map<T extends any[], F extends (item: any) => any> = T extends [infer _H, ...infer R]
  ? [ReturnType<F>, ...Map<R, F>]
  : []

/**
 * 数组过滤
 */
export type ArrayFilter<T extends any[], F> = T extends [infer H, ...infer R]
  ? H extends F
    ? [H, ...ArrayFilter<R, F>]
    : ArrayFilter<R, F>
  : []

/**
 * 数组分区
 */
export type Partition<T extends any[], N extends number, R extends any[] = []> = R['length'] extends N
  ? [R, T]
  : T extends [infer F, ...infer Rest]
    ? Partition<Rest, N, [...R, F]>
    : [R, T]

/**
 * 数组分块
 */
export type Chunk<T extends any[], N extends number> = T extends []
  ? []
  : Partition<T, N> extends [infer C, infer Rest]
    ? Rest extends any[]
      ? [C, ...Chunk<Rest, N>]
      : [C]
    : []

/**
 * 数组压缩（将多个数组合并为元组数组）
 */
export type Zip<T extends any[][], R extends any[] = []> = T extends [
  [infer F, ...infer FR],
  ...infer Rest,
]
  ? Rest extends any[][]
    ? Zip<[FR, ...{ [K in keyof Rest]: Rest[K] extends [any, ...infer R] ? R : [] }], [...R, [F, ...{ [K in keyof Rest]: Rest[K] extends [infer _H, ...any] ? _H : never }]]>
    : R
  : R
