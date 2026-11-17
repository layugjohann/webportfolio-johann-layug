import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

// The chips in the list named by one Stack group heading.
const chipsUnder = (wrapper, heading) => {
  const h = wrapper.findAll('#about h3').find((el) => el.text() === heading)
  if (!h) throw new Error(`no Stack group headed ${heading}`)
  const list = wrapper.element.querySelector(`ul[aria-labelledby="${h.attributes('id')}"]`)
  if (!list) throw new Error(`no chip list named by ${heading}`)
  return [...list.querySelectorAll('li')].map((li) => li.textContent.trim())
}

describe('About + Stack', () => {
  it('shows an About paragraph on how Johann works with clients and agents', () => {
    const about = mount(App).find('#about').text()

    expect(about).toMatch(/evals/i)
    expect(about).toMatch(/approve/i)
  })

  it('groups the stack into Agents, Product and Ship chips', () => {
    const wrapper = mount(App)

    expect(chipsUnder(wrapper, 'Agents')).toEqual([
      'Claude Code',
      'tool use',
      'evals',
      'traces',
      'Groq / Claude / OpenAI APIs',
    ])
    expect(chipsUnder(wrapper, 'Product')).toEqual([
      'TypeScript',
      'Next.js',
      'Vue',
      'Python',
      'Django',
      'Postgres',
    ])
    expect(chipsUnder(wrapper, 'Ship')).toEqual(['Vercel', 'GitHub Actions', 'Docker'])
  })

  it('is where the nav’s About link scrolls to', () => {
    const wrapper = mount(App)

    const aboutLink = wrapper.findAll('nav a').find((a) => a.text() === 'About')
    expect(aboutLink.attributes('href')).toBe('#about')
    expect(wrapper.find('#about').exists()).toBe(true)
  })

  it('replaces the old Tools section', () => {
    expect(mount(App).text()).not.toContain('Tools I Use')
  })
})
