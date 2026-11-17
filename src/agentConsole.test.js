import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { fixlineReplay } from './data/fixlineReplay'
import { stubMatchMedia } from './test/setup'

const lines = fixlineReplay.lines.map((line) => line.text)

describe('the agent console', () => {
  it('is labelled as a fixline replay', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toMatch(/fixline · replay/i)
  })

  it("carries Johann's portrait, name and caption, with no separate portrait card to cover", () => {
    const hero = mount(App).find('.hero')
    const console = hero.find('[aria-label^="Agent console"]')

    expect(console.find('img[alt="Johann Layug, pixel portrait"]').exists()).toBe(true)
    expect(console.text()).toContain('Johann Layug')
    expect(console.text()).toContain('builds agents like this one ↓')
    expect(hero.findAll('img[alt$="pixel portrait"]')).toHaveLength(1)
  })

  it('shows every replay line at once when the visitor prefers reduced motion', () => {
    stubMatchMedia({ reducedMotion: true })

    const wrapper = mount(App)

    const text = wrapper.text()
    expect(text).toContain('lookUpSender')
    for (const line of lines) expect(text).toContain(line)
  })

  it('reveals lines one at a time, then restarts after the last line', async () => {
    vi.useFakeTimers()
    const wrapper = mount(App)
    const visible = () => lines.filter((line) => wrapper.text().includes(line)).length

    expect(visible()).toBe(0)
    await vi.advanceTimersByTimeAsync(900)
    expect(visible()).toBe(1)
    expect(wrapper.text()).toContain(lines[0])
    await vi.advanceTimersByTimeAsync(900)
    expect(visible()).toBe(2)

    await vi.advanceTimersByTimeAsync(900 * (lines.length - 2))
    expect(visible()).toBe(lines.length)
    await vi.advanceTimersByTimeAsync(900)
    expect(visible()).toBe(0)
    await vi.advanceTimersByTimeAsync(900)
    expect(visible()).toBe(1)
  })
})
