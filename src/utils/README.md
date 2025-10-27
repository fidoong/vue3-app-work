# Utils 工具函数模块

中后台管理系统开发必备的工具函数集合，提供完整的类型支持和详细的使用示例。

## 📦 模块列表

### 数组操作 (array.ts)
- `unique` - 数组去重（支持对象数组）
- `flatten` - 数组扁平化
- `groupBy` - 数组分组
- `chunk` - 数组分块
- `sortBy` - 数组排序（支持对象）
- `shuffle` - 数组随机排序
- `difference` - 数组差集
- `intersection` - 数组交集
- `union` - 数组并集

### 数据格式化 (format.ts)
- `formatDate` - 格式化日期
- `formatDateTime` - 格式化日期时间
- `formatCurrency` - 格式化货币
- `formatFileSize` - 格式化文件大小
- `formatPhone` - 格式化手机号（隐藏中间4位）
- `formatIdCard` - 格式化身份证号
- `formatBankCard` - 格式化银行卡号
- `formatThousands` - 格式化千分位

### 数据验证 (validate.ts)
- `isEmail` - 验证邮箱
- `isPhone` - 验证手机号
- `isIdCard` - 验证身份证号
- `isUrl` - 验证 URL
- `isIP` - 验证 IP 地址
- `isBankCard` - 验证银行卡号
- `getPasswordStrength` - 获取密码强度

### 数据转换 (transform.ts)
- `deepClone` - 深度克隆
- `deepMerge` - 深度合并
- `pick` - 提取指定字段
- `omit` - 排除指定字段
- `getValueByPath` - 根据路径获取值
- `setValueByPath` - 根据路径设置值
- `cleanObject` - 清理对象空值

### 树形数据 (tree.ts)
- `listToTree` - 扁平数组转树形结构
- `treeToList` - 树形结构转扁平数组
- `findTreeNode` - 查找树节点
- `findTreePath` - 查找树节点路径
- `filterTree` - 过滤树节点
- `traverseTree` - 遍历树节点
- `mapTree` - 映射树节点
- `getTreeLeaves` - 获取叶子节点
- `getTreeDepth` - 获取树深度

### 日期时间 (date.ts)
- `getTimestamp` - 获取当前时间戳
- `timestampToDate` - 时间戳转日期
- `getDateRange` - 获取日期范围
- `dateDiff` - 计算日期差
- `addDays/addMonths/addYears` - 日期加减
- `timeAgo` - 相对时间描述

### 存储操作 (storage.ts)
- `setLocal/getLocal` - localStorage 操作（支持过期）
- `setSession/getSession` - sessionStorage 操作
- `setCookie/getCookie` - Cookie 操作

### URL 处理 (url.ts)
- `parseQuery` - 解析 URL 参数
- `buildQuery` - 构建 URL 参数
- `addQuery` - 添加 URL 参数
- `isExternal` - 判断是否外部链接
- `joinPath` - 拼接路径

### 文件处理 (file.ts)
- `getFileExtension` - 获取文件扩展名
- `getFileType` - 判断文件类型
- `fileToBase64` - 文件转 Base64
- `base64ToBlob/base64ToFile` - Base64 转换
- `compressImage` - 图片压缩
- `validateFileSize/validateFileType` - 文件验证

### 下载导出 (download.ts)
- `downloadFile` - 下载文件
- `downloadBlob` - 下载 Blob
- `downloadText` - 下载文本文件
- `downloadJson` - 下载 JSON 文件
- `downloadCsv` - 下载 CSV 文件
- `downloadImage` - 下载图片

### 性能优化 (performance.ts)
- `debounce` - 防抖函数
- `throttle` - 节流函数
- `delay` - 延迟执行
- `retry` - 重试函数
- `memoize` - 缓存函数结果
- `batchExecute` - 批量执行

### 加密解密 (crypto.ts)
- `base64Encode/base64Decode` - Base64 编解码
- `simpleEncrypt/simpleDecrypt` - 简单加解密
- `randomString` - 生成随机字符串
- `uuid` - 生成 UUID
- `uniqueId` - 生成唯一 ID

### 数字操作 (number.ts)
- `clamp` - 数字范围限制
- `randomInt/randomFloat` - 生成随机数
- `round/ceil/floor` - 数字取整
- `toChineseNumber` - 数字转中文
- `toRoman` - 数字转罗马数字
- `formatNumberWithCommas` - 千分位格式化

### 字符串操作 (string.ts)
- `capitalize` - 首字母大写
- `kebabCase/camelCase` - 命名转换
- `truncate` - 截断字符串
- `stripHtml` - 移除 HTML 标签
- `escapeHtml` - 转义 HTML
- `template` - 字符串模板替换

### 对象操作 (object.ts)
- `isEmptyObject` - 判断空对象
- `isPlainObject` - 判断纯对象
- `invert` - 键值互换
- `keysToSnakeCase/keysToCamelCase` - 键名转换
- `isEqual` - 深度比较
- `mapValues/mapKeys` - 映射对象
- `get/set/has/unset` - 路径操作

### 权限判断 (permission.ts)
- `setPermissionConfig` - 设置权限配置
- `hasPermission` - 判断是否有权限
- `hasRole` - 判断是否有角色
- `isSuperAdmin` - 判断是否超管
- `checkPermission/checkRole` - 权限检查

## 🚀 使用示例

```typescript
import {
  formatDate,
  formatCurrency,
  listToTree,
  debounce,
  hasPermission,
  downloadCsv
} from '~/utils'

// 格式化日期
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 格式化货币
formatCurrency(1234.56) // '¥1,234.56'

// 扁平数组转树形结构
const list = [
  { id: 1, name: '父节点', parentId: null },
  { id: 2, name: '子节点', parentId: 1 }
]
const tree = listToTree(list)

// 防抖搜索
const handleSearch = debounce((keyword) => {
  console.log('搜索:', keyword)
}, 500)

// 权限判断
if (hasPermission('user:create')) {
  // 有权限执行操作
}

// 导出 CSV
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
]
downloadCsv(users, 'users.csv', ['name', 'age'])
```

## 📝 注意事项

1. 所有函数都提供完整的 TypeScript 类型支持
2. 每个函数都有详细的 JSDoc 注释和使用示例
3. 加密函数仅用于前端展示，不适合安全场景
4. 部分功能（如 MD5、SHA256、Excel 导出）需要额外的库支持

## 🔧 扩展建议

如需更强大的功能，可以考虑集成以下库：
- `crypto-js` - 加密解密
- `xlsx` - Excel 导入导出
- `dayjs` - 日期时间处理
- `lodash-es` - 更多工具函数
