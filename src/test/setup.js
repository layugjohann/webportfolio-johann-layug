// Fakes for the page's outside services: fetch (Web3Forms), window.hcaptcha,
// matchMedia and canvas getContext. Tests override a fake per case by calling
// the helpers below again, e.g. stubMatchMedia({ reducedMotion: true }).
import { afterEach, beforeEach, vi } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

enableAutoUnmount(afterEach)

export function stubMatchMedia({ reducedMotion = false } = {}) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query) => ({
      matches: reducedMotion && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

// With a token, the widget reports it as solved as soon as it renders.
export function stubHcaptcha({ token = '' } = {}) {
  vi.stubGlobal('hcaptcha', {
    render: vi.fn((_el, opts) => {
      if (token) opts.callback(token)
      return 0
    }),
    reset: vi.fn(),
    getResponse: vi.fn(() => token),
  })
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 })),
  )
  stubMatchMedia()
  stubHcaptcha()
  // jsdom has no canvas; the page must cope with a missing 2D context.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
