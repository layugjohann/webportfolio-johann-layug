import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

const hrefs = (wrapper) => wrapper.findAll('a').map((a) => a.attributes('href') ?? '')

describe('social links', () => {
  it('point to Johann’s real GitHub, LinkedIn and email', () => {
    const links = hrefs(mount(App))

    expect(links).toContain('https://github.com/layugjohann')
    expect(links).toContain('https://www.linkedin.com/in/johannlayug/')
    expect(links).toContain('mailto:layugjohann@gmail.com')
  })

  it('include no Instagram link', () => {
    const links = hrefs(mount(App))

    expect(links.some((href) => href.includes('instagram'))).toBe(false)
  })

  it('include no Résumé link while no résumé is configured', () => {
    const wrapper = mount(App)

    const resumeLinks = wrapper.findAll('a').filter((a) => /^r[ée]sum[ée]/i.test(a.text().trim()))
    expect(resumeLinks).toHaveLength(0)
  })
})
