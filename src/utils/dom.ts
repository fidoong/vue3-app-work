/**
 * DOM 操作工具函数
 */

/**
 * 判断元素是否包含某个 class
 * @param el - DOM 元素
 * @param className - 类名
 * @returns 是否包含该类名
 * @example
 * hasClass(element, 'active') // true
 */
export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className)
}

/**
 * 添加 class
 * @param el - DOM 元素
 * @param className - 类名（支持多个，空格分隔）
 * @example
 * addClass(element, 'active')
 * addClass(element, 'active visible')
 */
export function addClass(el: Element, className: string): void {
  const classes = className.split(' ').filter(c => c.trim())
  el.classList.add(...classes)
}

/**
 * 移除 class
 * @param el - DOM 元素
 * @param className - 类名（支持多个，空格分隔）
 * @example
 * removeClass(element, 'active')
 * removeClass(element, 'active visible')
 */
export function removeClass(el: Element, className: string): void {
  const classes = className.split(' ').filter(c => c.trim())
  el.classList.remove(...classes)
}

/**
 * 切换 class
 * @param el - DOM 元素
 * @param className - 类名
 * @example
 * toggleClass(element, 'active')
 */
export function toggleClass(el: Element, className: string): void {
  el.classList.toggle(className)
}
