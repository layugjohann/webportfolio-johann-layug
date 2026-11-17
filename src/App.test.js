import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import projectData from './data/projects.json'

const fixtureProjects = [
  {
    id: 'fixture-one',
    title: 'Fixture One',
    description: 'First fixture project.',
    link: 'https://example.com/one',
    img: '',
  },
  {
    id: 'fixture-two',
    title: 'Fixture Two',
    description: 'Second fixture project.',
    link: 'https://example.com/two',
    img: '',
  },
]

describe('the page', () => {
  it('mounts the whole page with the real Project data, without errors', () => {
    vi.useFakeTimers()
    const error = vi.spyOn(console, 'error')
    const warn = vi.spyOn(console, 'warn')

    const wrapper = mount(App, { attachTo: document.body })
    // Let deferred mount work (e.g. waiting for outside scripts) run too.
    vi.advanceTimersByTime(1000)

    const text = wrapper.text()
    expect(text).toContain('Contact')
    for (const project of projectData) expect(text).toContain(project.title)
    expect(error).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('shows only the Projects it is given, in order', () => {
    const wrapper = mount(App, { props: { projects: fixtureProjects } })

    const text = wrapper.text()
    expect(text).toContain('Fixture One')
    expect(text).toContain('Fixture Two')
    expect(text.indexOf('Fixture One')).toBeLessThan(text.indexOf('Fixture Two'))
    for (const project of projectData) expect(text).not.toContain(project.title)
  })
})
