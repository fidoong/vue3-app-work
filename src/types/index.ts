/**
 * 类型系统统一导出
 *
 * 类型模块架构：
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │                    应用层 (App Layer)                    │
 * │                  使用所有类型定义                         │
 * └─────────────────────────────────────────────────────────┘
 *                            ↑
 *                            │
 * ┌──────────────────────────┴──────────────────────────────┐
 * │                                                          │
 * │  ┌─────────────────┐  ┌─────────────────┐              │
 * │  │  Business Types │  │   Utils Types   │              │
 * │  │   (业务类型)     │  │   (工具类型)     │              │
 * │  │                 │  │                 │              │
 * │  │  - common       │  │  - helpers      │              │
 * │  │  - auth         │  │  - api-helpers  │              │
 * │  │  - system       │  │                 │              │
 * │  │  - log          │  │                 │              │
 * │  └────────┬────────┘  └────────┬────────┘              │
 * │           │                    │                        │
 * │           └──────────┬─────────┘                        │
 * │                      ↓                                  │
 * │           ┌─────────────────────┐                       │
 * │           │     HTTP Types      │                       │
 * │           │    (HTTP 类型)       │                       │
 * │           │                     │                       │
 * │           │  - base (基础)       │                       │
 * │           │  - request (请求)    │                       │
 * │           │  - config (配置)     │                       │
 * │           └─────────────────────┘                       │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 *
 * 设计原则：
 * 1. 分层清晰：HTTP 层 → 业务层 → 应用层
 * 2. 单一职责：每个模块只负责一类类型定义
 * 3. 依赖方向：上层依赖下层，下层不依赖上层
 * 4. 可扩展性：新增业务类型在 business 目录下添加
 * 5. 类型复用：通用类型在 http/base 和 business/common 中定义
 */

// ==================== 业务类型 ====================
// 中间层，定义具体业务实体和参数类型
export * from './business'

// 认证类型
export type {
  LoginParams,
  LoginResult,
  UserInfo,
} from './business/auth'

// 业务通用类型
export type {
  BaseEntity,
  EnumItem,
  FileInfo,
  TreeNode,
} from './business/common'

// ==================== 类型别名（向后兼容） ====================
// 为了保持向后兼容，重新导出常用类型

// ==================== 核心类型 ====================
// 最基础的类型定义
export * from './core'

// ==================== 类型守卫 ====================
// 运行时类型检查函数
export * from './guards'

// ==================== HTTP 类型 ====================
// 最底层，定义 HTTP 通信相关的基础类型
export * from './http'

// HTTP 基础类型
export type {
  ApiResponse,
  BatchResult,
  CursorPageResult,
  DateString,
  ID,
  PageResult,
  StatusCode,
  Timestamp,
} from './http/base'

// 配置类型
export type {
  DownloadConfig,
  HttpClientConfig,
  RequestConfig,
  UploadConfig,
} from './http/config'

// 请求参数类型
export type {
  CursorPageParams,
  IdParam,
  IdsParam,
  PageParams,
  QueryParams,
} from './http/request'

// ==================== 工具类型 ====================
// 辅助层，提供类型工具函数和泛型定义
export * from './utils'

// 工具类型
export type {
  DeepPartial,
  DeepReadonly,
  Nullable,
  Optional,
} from './utils/helpers'
