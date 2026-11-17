import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { fixtureProject as project } from './test/fixtures'

// The case-study row for one Project, found by its title heading.
const rowFor = (wrapper, title) => {
  const heading = wrapper.findAll('h3').find((h) => h.text().startsWith(title))
  if (!heading) throw new Error(`no row for ${title}`)
  return heading.element.closest('article')
}

const mountWith = (projects) => mount(App, { props: { projects } })

describe('Selected Work', () => {
  it('shows an "In progress" badge for in-progress Projects only', () => {
    const wrapper = mountWith([
      project({ id: 'building', title: 'Building', status: 'in-progress' }),
      project({ id: 'finished', title: 'Finished', status: 'shipped' }),
    ])

    expect(rowFor(wrapper, 'Building').textContent).toMatch(/in progress/i)
    expect(rowFor(wrapper, 'Finished').textContent).not.toMatch(/in progress/i)
  })

  it('renders only the links a Project has, each opening in a new tab', () => {
    const wrapper = mountWith([
      project({ id: 'both', title: 'Both', live: 'https://both.dev', repo: 'https://github.com/x/both' }),
      project({ id: 'live-only', title: 'LiveOnly', live: 'https://live.dev', repo: '' }),
      project({ id: 'code-only', title: 'CodeOnly', live: '', repo: 'https://github.com/x/code' }),
      project({ id: 'none', title: 'NoLinks', live: '', repo: '' }),
    ])
    const links = (title) =>
      [...rowFor(wrapper, title).querySelectorAll('a')].map((a) => ({
        text: a.textContent.trim(),
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
      }))

    expect(links('Both')).toEqual([
      { text: 'Live ↗', href: 'https://both.dev', target: '_blank' },
      { text: 'Code ↗', href: 'https://github.com/x/both', target: '_blank' },
    ])
    expect(links('LiveOnly')).toEqual([{ text: 'Live ↗', href: 'https://live.dev', target: '_blank' }])
    expect(links('CodeOnly')).toEqual([{ text: 'Code ↗', href: 'https://github.com/x/code', target: '_blank' }])
    expect(links('NoLinks')).toEqual([])
  })

  it('shows the screenshot when a Project has one, and a terminal card when it does not', () => {
    const run = ['$ fixture go', '✓ all green']
    const wrapper = mountWith([
      project({ id: 'shot', title: 'Shot', img: '/images/shot.png', run }),
      project({ id: 'term', title: 'Term', img: '', run }),
    ])

    const shot = rowFor(wrapper, 'Shot')
    expect(shot.querySelector('img')?.getAttribute('src')).toBe('/images/shot.png')
    expect(shot.querySelector('img')?.getAttribute('alt')).toMatch(/Shot/)
    expect(shot.textContent).not.toContain('$ fixture go')

    const term = rowFor(wrapper, 'Term')
    expect(term.querySelector('img')).toBeNull()
    expect(term.textContent).toContain('$ fixture go')
    expect(term.textContent).toContain('✓ all green')
  })

  it('shows just the Project’s prompt on a terminal card with no run', () => {
    const wrapper = mountWith([project({ id: 'bare', title: 'Bare', img: '' })])

    const row = rowFor(wrapper, 'Bare')
    expect(row.querySelector('img')).toBeNull()
    expect(row.textContent).toContain('$ bare')
  })
})
