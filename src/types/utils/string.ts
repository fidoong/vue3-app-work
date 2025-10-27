/**
 * 字符串类型工具
 * 提供字符串相关的类型操作
 */

// 注意：Uppercase 和 Lowercase 是 TypeScript 内置的工具类型
// 这里不需要重新定义，直接使用即可

/**
 * 首字母大写
 * @example
 * type Result = Capitalize<"hello"> // "Hello"
 * type Name = Capitalize<"john"> // "John"
 */
export type Capitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S

/**
 * 首字母小写
 * @example
 * type Result = Uncapitalize<"Hello"> // "hello"
 * type Name = Uncapitalize<"John"> // "john"
 */
export type Uncapitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : S

/**
 * 字符串分割
 * @example
 * type Parts = Split<"a-b-c", "-"> // ["a", "b", "c"]
 * type Words = Split<"hello world", " "> // ["hello", "world"]
 */
export type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]

/**
 * 字符串连接
 * @example
 * type Result = Join<["a", "b", "c"], "-"> // "a-b-c"
 * type Path = Join<["users", "123", "profile"], "/"> // "users/123/profile"
 */
export type Join<T extends string[], D extends string> = T extends [infer F, ...infer R]
  ? R extends string[]
    ? F extends string
      ? R['length'] extends 0
        ? F
        : `${F}${D}${Join<R, D>}`
      : ''
    : ''
  : ''

/**
 * 字符串替换（仅替换第一个匹配）
 * @example
 * type Result = Replace<"hello world", "o", "0"> // "hell0 world"
 */
export type Replace<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer L}${From}${infer R}` ? `${L}${To}${R}` : S

/**
 * 字符串全部替换
 * @example
 * type Result = ReplaceAll<"hello world", "o", "0"> // "hell0 w0rld"
 * type Path = ReplaceAll<"a/b/c", "/", "-"> // "a-b-c"
 */
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S

/**
 * 字符串去除前缀
 * @example
 * type Result = TrimStart<"  hello"> // "hello"
 * type Path = TrimStart<"///path", "/"> // "path"
 */
export type TrimStart<S extends string, C extends string = ' '> = S extends `${C}${infer R}`
  ? TrimStart<R, C>
  : S

/**
 * 字符串去除后缀
 * @example
 * type Result = TrimEnd<"hello  "> // "hello"
 * type Path = TrimEnd<"path///", "/"> // "path"
 */
export type TrimEnd<S extends string, C extends string = ' '> = S extends `${infer L}${C}`
  ? TrimEnd<L, C>
  : S

/**
 * 字符串去除前后缀
 * @example
 * type Result = Trim<"  hello  "> // "hello"
 * type Path = Trim<"///path///", "/"> // "path"
 */
export type Trim<S extends string, C extends string = ' '> = TrimStart<TrimEnd<S, C>, C>

/**
 * 字符串包含
 * @example
 * type Result1 = Includes<"hello world", "world"> // true
 * type Result2 = Includes<"hello world", "foo"> // false
 */
export type Includes<S extends string, T extends string> = S extends `${string}${T}${string}`
  ? true
  : false

/**
 * 字符串开始于
 * @example
 * type Result1 = StartsWith<"hello world", "hello"> // true
 * type Result2 = StartsWith<"hello world", "world"> // false
 */
export type StartsWith<S extends string, T extends string> = S extends `${T}${string}`
  ? true
  : false

/**
 * 字符串结束于
 * @example
 * type Result1 = EndsWith<"hello world", "world"> // true
 * type Result2 = EndsWith<"hello world", "hello"> // false
 */
export type EndsWith<S extends string, T extends string> = S extends `${string}${T}` ? true : false

/**
 * 字符串长度
 * @example
 * type Len1 = Length<"hello"> // 5
 * type Len2 = Length<""> // 0
 */
export type Length<S extends string> = Split<S, ''> extends infer A
  ? A extends string[]
    ? A['length']
    : never
  : never

/**
 * 字符串反转
 * @example
 * type Result = Reverse<"hello"> // "olleh"
 * type Reversed = Reverse<"abc"> // "cba"
 */
export type Reverse<S extends string> = S extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : S

/**
 * 字符串重复
 */
export type Repeat<
  S extends string,
  N extends number,
  R extends string = '',
  C extends any[] = [],
> = C['length'] extends N ? R : Repeat<S, N, `${R}${S}`, [...C, any]>

/**
 * 驼峰转蛇形
 */
export type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnake<U>}`
  : S

/**
 * 蛇形转驼峰
 */
export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S

/**
 * 驼峰转短横线
 */
export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebab<U>}`
  : S

/**
 * 短横线转驼峰
 */
export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<KebabToCamel<U>>}`
  : S

/**
 * 帕斯卡转驼峰
 */
export type PascalToCamel<S extends string> = Uncapitalize<S>

/**
 * 驼峰转帕斯卡
 */
export type CamelToPascal<S extends string> = Capitalize<S>

/**
 * 字符串模板类型
 */
export type Template<T extends string, V extends Record<string, string>> = T extends `${infer L}\${${infer K}}${infer R}`
  ? K extends keyof V
    ? `${L}${V[K]}${Template<R, V>}`
    : T
  : T

/**
 * 提取字符串中的数字
 */
export type ExtractNumbers<S extends string> = S extends `${infer _L}${infer N extends number}${infer R}`
  ? N | ExtractNumbers<R>
  : never

/**
 * 提取字符串中的字母
 */
export type ExtractLetters<S extends string> = S extends `${infer _L}${infer R}`
  ? _L extends `${number}`
    ? ExtractLetters<R>
    : _L | ExtractLetters<R>
  : never

/**
 * 字符串是否为空
 */
export type IsEmpty<S extends string> = S extends '' ? true : false

/**
 * 字符串是否为数字
 */
export type IsNumber<S extends string> = S extends `${number}` ? true : false

/**
 * 字符串是否为字母
 */
export type IsLetter<S extends string> = Lowercase<S> extends Uppercase<S> ? false : true

/**
 * 字符串是否为大写
 */
export type IsUppercase<S extends string> = S extends Uppercase<S> ? true : false

/**
 * 字符串是否为小写
 */
export type IsLowercase<S extends string> = S extends Lowercase<S> ? true : false

/**
 * 路径分割
 */
export type PathSplit<P extends string> = Split<P, '/'>

/**
 * 路径连接
 */
export type PathJoin<T extends string[]> = Join<T, '/'>

/**
 * 获取文件扩展名
 */
export type GetExtension<P extends string> = P extends `${string}.${infer E}` ? E : ''

/**
 * 获取文件名（不含扩展名）
 */
export type GetFilename<P extends string> = P extends `${infer F}.${string}` ? F : P

/**
 * URL 参数类型
 */
export type ParseUrlParams<U extends string> = U extends `${string}?${infer P}`
  ? ParseQueryString<P>
  : Record<string, never>

/**
 * 查询字符串解析
 */
export type ParseQueryString<Q extends string> = Q extends `${infer K}=${infer V}&${infer R}`
  ? { [P in K]: V } & ParseQueryString<R>
  : Q extends `${infer K}=${infer V}`
    ? { [P in K]: V }
    : Record<string, never>

/**
 * 字符串字面量联合类型
 */
export type StringLiteral<T extends string> = T extends string ? (string extends T ? never : T) : never

/**
 * 字符串前缀
 */
export type Prefix<S extends string, P extends string> = `${P}${S}`

/**
 * 字符串后缀
 */
export type Suffix<S extends string, S2 extends string> = `${S}${S2}`

/**
 * 字符串包裹
 */
export type Wrap<S extends string, W extends string> = `${W}${S}${W}`

/**
 * 字符串去除包裹
 */
export type Unwrap<S extends string, W extends string> = S extends `${W}${infer C}${W}` ? C : S
