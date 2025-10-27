/**
 * 原始类型定义
 * 定义最基础的类型别名和常量类型
 */

/**
 * 通用 ID 类型
 * @example
 * const userId: ID = 123
 * const orderId: ID = "order_abc123"
 */
export type ID = string | number

/**
 * 时间戳类型（毫秒）
 * @example
 * const now: Timestamp = Date.now() // 1698765432000
 * const created: Timestamp = 1698765432000
 */
export type Timestamp = number

/**
 * 日期字符串类型（ISO 8601 格式）
 * @example "2024-01-01T00:00:00.000Z"
 */
export type DateString = string

/**
 * 日期时间字符串类型
 * @example
 * const datetime: DateTimeString = "2024-01-01 12:00:00"
 * const created: DateTimeString = "2024-10-27 15:30:45"
 */
export type DateTimeString = string

/**
 * 时间字符串类型
 * @example
 * const time: TimeString = "12:00:00"
 * const startTime: TimeString = "09:30:00"
 */
export type TimeString = string

/**
 * URL 字符串类型
 * @example
 * const url: UrlString = "https://example.com/api/users"
 * const avatar: UrlString = "https://cdn.example.com/avatar.jpg"
 */
export type UrlString = string

/**
 * 邮箱字符串类型
 * @example
 * const email: EmailString = "user@example.com"
 * const contact: EmailString = "support@company.com"
 */
export type EmailString = string

/**
 * 手机号字符串类型
 * @example
 * const phone: PhoneString = "13800138000"
 * const mobile: PhoneString = "+86 138-0013-8000"
 */
export type PhoneString = string

/**
 * 颜色字符串类型（支持 hex、rgb、rgba 等）
 * @example "#ffffff" | "rgb(255, 255, 255)" | "rgba(255, 255, 255, 1)"
 */
export type ColorString = string

/**
 * JSON 字符串类型
 * @example
 * const json: JsonString = '{"name":"John","age":30}'
 * const config: JsonString = '{"theme":"dark","lang":"zh-CN"}'
 */
export type JsonString = string

/**
 * 原始值类型
 * @example
 * const str: Primitive = "hello"
 * const num: Primitive = 42
 * const bool: Primitive = true
 * const nil: Primitive = null
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined

/**
 * 可为空类型
 * @example
 * const name: Nullable<string> = "John"
 * const age: Nullable<number> = null
 * function findUser(id: ID): Nullable<User> { ... }
 */
export type Nullable<T> = T | null

/**
 * 可为 undefined 类型
 * @example
 * const value: Maybe<string> = "hello"
 * const empty: Maybe<number> = undefined
 * function getConfig(key: string): Maybe<string> { ... }
 */
export type Maybe<T> = T | undefined

/**
 * 可为 null 或 undefined 类型
 * @example
 * const data: Optional<User> = null
 * const result: Optional<string> = undefined
 * function parse(input: string): Optional<number> { ... }
 */
export type Optional<T> = T | null | undefined

/**
 * 非空类型（排除 null 和 undefined）
 * @example
 * const value: NonNullable<string | null> = "hello" // string
 * const num: NonNullable<number | undefined> = 42 // number
 */
export type NonNullable<T> = Exclude<T, null | undefined>

/**
 * 可等待类型（支持 Promise 和普通值）
 * @example
 * const sync: Awaitable<string> = "hello"
 * const async: Awaitable<string> = Promise.resolve("hello")
 * function getData(): Awaitable<User> { ... }
 */
export type Awaitable<T> = T | Promise<T>

/**
 * 可数组化类型（支持单个值和数组）
 * @example
 * const single: Arrayable<string> = "hello"
 * const multiple: Arrayable<string> = ["hello", "world"]
 * function process(input: Arrayable<number>) { ... }
 */
export type Arrayable<T> = T | T[]

/**
 * 键值对类型
 * @example
 * const pair: KeyValue = { key: "name", value: "John" }
 * const config: KeyValue<string, number> = { key: "timeout", value: 3000 }
 */
export interface KeyValue<K = string, V = any> {
  key: K
  value: V
}

/**
 * 记录类型（对象）
 * @example
 * const userMap: RecordType<string, User> = { "1": user1, "2": user2 }
 * const config: RecordType = { theme: "dark", lang: "zh-CN" }
 */
export type RecordType<K extends string | number | symbol = string, V = any> = Record<K, V>

/**
 * 任意对象类型
 * @example
 * const obj: AnyObject = { name: "John", age: 30 }
 * function merge(a: AnyObject, b: AnyObject): AnyObject { ... }
 */
export type AnyObject = Record<string, any>

/**
 * 任意函数类型
 * @example
 * const fn: AnyFunction = (x, y) => x + y
 * const callback: AnyFunction = () => console.log("done")
 */
export type AnyFunction = (...args: any[]) => any

/**
 * 任意构造函数类型
 * @example
 * const UserClass: AnyConstructor = class User { ... }
 * function createInstance(Ctor: AnyConstructor) { return new Ctor() }
 */
export type AnyConstructor = new (...args: any[]) => any

/**
 * 空对象类型
 * @example
 * const empty: EmptyObject = {}
 * // const invalid: EmptyObject = { name: "John" } // Error
 */
export type EmptyObject = Record<string, never>

/**
 * 只读记录类型
 * @example
 * const config: ReadonlyRecord<string, string> = { theme: "dark" }
 * // config.theme = "light" // Error: Cannot assign to 'theme'
 */
export type ReadonlyRecord<K extends string | number | symbol = string, V = any> = Readonly<
  Record<K, V>
>
