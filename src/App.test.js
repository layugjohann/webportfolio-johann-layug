import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { fixtureProject } from './test/fixtures'
import { projects as projectData } from './data/projects'

const fixtureProjects = [
  fixtureProject({ id: 'fixture-one', title: 'Fixture One' }),
  fixtureProject({ id: 'fixture-two', title: 'Fixture Two' }),
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
    // Scoped to Selected Work: the hero's console is a fixline replay, so says "fixline".
    const work = wrapper.find('#work').text()
    for (const project of projectData) expect(work).not.toContain(project.title)
  })
})

describe('the nav', () => {
  it('links every section directly, with nothing to open first', () => {
    const wrapper = mount(App)
    const nav = wrapper.find('nav')

    const hrefs = nav.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(expect.arrayContaining(['#work', '#about', '#contact']))
  })
})
