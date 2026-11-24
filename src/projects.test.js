import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { projects } from './data/projects'

const strings = (value) =>
  typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(strings) : []

describe('the real Project data', () => {
  it('has the Projects in display order, Featured Projects first', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'retail-ops-agent',
      'fixline',
      'availability-runs',
      'sandcastle-pro',
    ])
    expect(projects.filter((p) => p.featured).map((p) => p.id)).toEqual(['retail-ops-agent', 'fixline'])
    const firstUnfeatured = projects.findIndex((p) => !p.featured)
    expect(projects.slice(firstUnfeatured).every((p) => !p.featured)).toBe(true)
  })

  it('has unique ids', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every Project at least one public link', () => {
    for (const p of projects) {
      const links = [p.live, p.repo].filter(Boolean)
      expect(links.length, p.id).toBeGreaterThan(0)
      for (const link of links) expect(link, p.id).toMatch(/^https:\/\//)
    }
  })

  it('only gives a Demo video to a Project with a screenshot to play it from', () => {
    for (const p of projects.filter((p) => p.video)) expect(p.img, p.id).toBeTruthy()
  })

  it('contains no [?] placeholder text', () => {
    for (const p of projects) {
      for (const text of Object.values(p).flatMap(strings)) expect(text, p.id).not.toContain('[?]')
    }
  })

  it('is what the page shows by default, in order', () => {
    const headings = mount(App).find('#work').findAll('h3').map((h) => h.text())

    expect(headings).toHaveLength(projects.length)
    projects.forEach((p, i) => expect(headings[i]).toContain(p.title))
  })
})
