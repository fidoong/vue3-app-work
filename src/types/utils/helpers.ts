/**
 * 类型工具函数
 * 提供常用的 TypeScript 类型工具
 *
 * 这个文件作为便捷导出，重新导出其他模块中的常用类型
 */

// 从 core 模块重新导出基础类型
export type { Awaitable, Maybe, NonNullable, Nullable, Optional, Primitive } from '../core/primitives'

// 从 array 模块重新导出数组类型
export type { ArrayElement } from './array'

// 从 array 模块重新导出数组类型
export type {
  TupleToUnion,
  UnionToIntersection,
  UnionToTuple,
} from './array'

// 从 function 模块重新导出函数类型
export type { FunctionParams, FunctionReturn } from './function'

// 从 function 模块重新导出函数类型
export type {
  AbstractConstructor,
  AsyncFunction,
  Callable,
  Class,
  Constructor,
} from './function'

/**
 * 提取对象的值类型
 * @example
 * interface User { name: string; age: number; active: boolean }
 * type UserValue = ValueOf<User> // string | number | boolean
 */
export type ValueOf<T> = T[keyof T]

/**
 * 提取对象的键类型
 * @example
 * interface User { name: string; age: number }
 * type UserKey = KeyOf<User> // "name" | "age"
 */
export type KeyOf<T> = keyof T

// UnionToIntersection 已从 array 模块导出

// 从 generic 模块重新导出深度类型
export type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
} from './generic'

// 从 generic 模块重新导出类型操作
export type {
  Merge,
  Override,
  PartialKeys,
  ReadonlyKeys,
  RequiredKeys,
  WritableKeys,
} from './generic'

/**
 * 字符串字面量类型
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { _?: never })

// 从 generic 模块重新导出高级类型
export type {
  If,
  IsAny,
  IsNever,
  IsUnknown,
  OptionalKeys,
  RequiredKeysOf,
  StrictOmit,
  StrictPick,
} from './generic'

/**
 * 对象类型（排除原始类型）
 */
export type ObjectType = Record<string, any>

/**
 * JSON 值类型
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * JSON 对象类型
 */
export interface JsonObject {
  [key: string]: JsonValue
}

/**
 * JSON 数组类型
 */
export interface JsonArray extends Array<JsonValue> { }

// 从 object 模块重新导出对象类型操作
export type {
  ExcludeValues as OmitByType,
  ExtractValues as PickByType,
} from './object'

// 从 object 模块重新导出对象路径类型
export type {
  Path as Paths,
  PathValue,
} from './object'

// 从 promise 模块重新导出 Promise 类型
export type { UnwrapPromise } from './promise'
