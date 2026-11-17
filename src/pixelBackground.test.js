import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { stubMatchMedia } from './test/setup'

// A fake 2D context that records how many pixels each frame paints.
function stubCanvasContext() {
  const ctx = { clearRect: vi.fn(), fillRect: vi.fn(), fillStyle: '' }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx)
  return ctx
}

const FRAME = 16
const fakeFrames = () =>
  vi.useFakeTimers({ toFake: ['setTimeout', 'setInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })

describe('the pixel background', () => {
  it('lets the page mount without errors when canvas has no 2D context', () => {
    const error = vi.spyOn(console, 'error')
    const warn = vi.spyOn(console, 'warn')

    const wrapper = mount(App, { attachTo: document.body })

    expect(wrapper.text()).toContain('fixline · replay')
    expect(error).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('is hidden from assistive tech', () => {
    const wrapper = mount(App)

    expect(wrapper.find('canvas').attributes('aria-hidden')).toBe('true')
  })

  it('keeps drawing frames while the visitor allows motion', async () => {
    fakeFrames()
    const ctx = stubCanvasContext()
    mount(App, { attachTo: document.body })

    await vi.advanceTimersByTimeAsync(FRAME * 10)

    expect(ctx.clearRect.mock.calls.length).toBeGreaterThan(5)
  })

  it('draws once and stays still when the visitor prefers reduced motion', async () => {
    stubMatchMedia({ reducedMotion: true })
    fakeFrames()
    const ctx = stubCanvasContext()
    mount(App, { attachTo: document.body })

    await vi.advanceTimersByTimeAsync(FRAME * 10)

    expect(ctx.clearRect).toHaveBeenCalledTimes(1)
  })

  it('stops drawing once the page is unmounted', async () => {
    fakeFrames()
    const ctx = stubCanvasContext()
    const wrapper = mount(App, { attachTo: document.body })
    await vi.advanceTimersByTimeAsync(FRAME * 3)

    wrapper.unmount()
    const drawsAtUnmount = ctx.clearRect.mock.calls.length
    await vi.advanceTimersByTimeAsync(FRAME * 10)

    expect(ctx.clearRect).toHaveBeenCalledTimes(drawsAtUnmount)
  })
})
