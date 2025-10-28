/**
 * ErrorTracker 测试
 */

import { describe, expect, it, vi } from 'vitest'
import { ErrorTracker } from '~/lib/error'

describe('errorTracker', () => {
  it('should capture error correctly', () => {
    const handler = vi.fn()
    ErrorTracker.registerHandler(handler)

    const error = new Error('Test error')
    ErrorTracker.capture(error, { location: 'test' })

    expect(handler).toHaveBeenCalled()
    const report = handler.mock.calls[0][0]
    expect(report.message).toBe('Test error')
    expect(report.level).toBe('error')
    expect(report.context?.location).toBe('test')

    ErrorTracker.removeHandler(handler)
  })

  it('should capture message correctly', () => {
    const handler = vi.fn()
    ErrorTracker.registerHandler(handler)

    ErrorTracker.captureMessage('Test message', 'warning')

    expect(handler).toHaveBeenCalled()
    const report = handler.mock.calls[0][0]
    expect(report.message).toBe('Test message')
    expect(report.level).toBe('warning')

    ErrorTracker.removeHandler(handler)
  })

  it('should not capture when disabled', () => {
    const handler = vi.fn()
    ErrorTracker.registerHandler(handler)

    ErrorTracker.disable()
    ErrorTracker.capture(new Error('Test'))

    expect(handler).not.toHaveBeenCalled()

    ErrorTracker.enable()
    ErrorTracker.removeHandler(handler)
  })
})
