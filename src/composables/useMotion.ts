/**
 * 动画管理 Composable
 * 简化版 - 使用原生 Web Animations API
 */

import type { MotionConfig, MotionDirection } from '~/components/theme/types'

/**
 * 动画持续时间预设（毫秒）
 */
export const MOTION_DURATIONS = {
  fast: 150,
  base: 250,
  slow: 350,
  slower: 500,
} as const

/**
 * 动画缓动函数
 */
export const MOTION_EASINGS = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const

/**
 * 检测用户是否偏好减少动画
 */
export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false)

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }

    mediaQuery.addEventListener('change', handleChange)

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  }

  return prefersReducedMotion
}

/**
 * 动画管理 Hook
 */
export function useMotion() {
  const prefersReducedMotion = usePrefersReducedMotion()

  /**
   * 获取动画持续时间（考虑减少动画偏好）
   */
  function getDuration(duration: number = MOTION_DURATIONS.base) {
    return prefersReducedMotion.value ? 50 : duration
  }

  /**
   * 淡入动画
   */
  function fadeIn(element: HTMLElement, options: Partial<MotionConfig> = {}) {
    return element.animate(
      [
        { opacity: 0 },
        { opacity: 1 },
      ],
      {
        duration: getDuration(options.duration || MOTION_DURATIONS.base),
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
  }

  /**
   * 滑动进入动画
   */
  function slideIn(element: HTMLElement, direction: MotionDirection = 'up', options: Partial<MotionConfig> = {}) {
    const transforms = {
      up: [{ transform: 'translateY(20px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
      down: [{ transform: 'translateY(-20px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
      left: [{ transform: 'translateX(20px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
      right: [{ transform: 'translateX(-20px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
    }

    return element.animate(transforms[direction], {
      duration: getDuration(options.duration || MOTION_DURATIONS.base),
      easing: 'ease-out',
      fill: 'forwards',
    })
  }

  /**
   * 缩放进入动画
   */
  function scaleIn(element: HTMLElement, options: Partial<MotionConfig> = {}) {
    return element.animate(
      [
        { transform: 'scale(0.9)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration: getDuration(options.duration || MOTION_DURATIONS.base),
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
  }

  /**
   * 视口进入动画
   */
  function inView(element: HTMLElement, callback: () => void, options = { amount: 0.3 }) {
    if (typeof window === 'undefined')
      return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
            observer.disconnect()
          }
        })
      },
      { threshold: options.amount },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }

  /**
   * 滚动视差效果
   */
  function scrollParallax(element: HTMLElement, speed: number = 0.5) {
    if (typeof window === 'undefined')
      return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const offset = scrollY * speed
      element.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }

  return {
    // 常量
    MOTION_EASINGS,
    MOTION_DURATIONS,

    // 方法
    fadeIn,
    slideIn,
    scaleIn,
    inView,
    scrollParallax,
    getDuration,
    prefersReducedMotion,
  }
}

/**
 * Vue 指令：进入视口时触发动画
 */
export const vMotionFade = {
  mounted(el: HTMLElement) {
    const { inView, fadeIn } = useMotion()
    inView(el, () => fadeIn(el))
  },
}

export const vMotionSlide = {
  mounted(el: HTMLElement, binding: { value?: MotionDirection }) {
    const { inView, slideIn } = useMotion()
    const direction = binding.value || 'up'
    inView(el, () => slideIn(el, direction))
  },
}
