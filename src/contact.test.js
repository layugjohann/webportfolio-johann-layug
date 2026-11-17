import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from './App.vue'
import { stubRecaptcha } from './test/setup'

const field = (wrapper, name) => wrapper.find(`#contact [name="${name}"]`)

const fillAndSubmit = async (wrapper, { name, email, message }) => {
  await field(wrapper, 'name').setValue(name)
  await field(wrapper, 'email').setValue(email)
  await field(wrapper, 'message').setValue(message)
  await wrapper.find('#contact form').trigger('submit')
  await flushPromises()
}

const typed = { name: 'Ada Recruiter', email: 'ada@example.com', message: 'Are you open to an FDE role?' }

// Toasts render outside the app, on document.body. Clearing it between tests
// stops one test's toast satisfying the next.
const toastText = () => document.body.textContent
beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Contact form', () => {
  it('sends nothing and asks for the robot check when reCAPTCHA is unsolved', async () => {
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)

    expect(fetch).not.toHaveBeenCalled()
    expect(toastText()).toMatch(/not a robot/i)
  })

  it('posts exactly what the Recruiter typed to Web3Forms', async () => {
    stubRecaptcha({ token: 'solved' })
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)

    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual({
      access_key: expect.any(String),
      subject: expect.any(String),
      ...typed,
    })
  })

  it('confirms the send, clears the fields and resets the robot check', async () => {
    stubRecaptcha({ token: 'solved' })
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)

    expect(toastText()).toMatch(/message sent/i)
    expect(field(wrapper, 'name').element.value).toBe('')
    expect(field(wrapper, 'email').element.value).toBe('')
    expect(field(wrapper, 'message').element.value).toBe('')
    expect(grecaptcha.reset).toHaveBeenCalled()
  })

  it('shows an error when Web3Forms rejects the message', async () => {
    stubRecaptcha({ token: 'solved' })
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false }), { status: 400 }),
    )
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)

    expect(toastText()).toMatch(/failed to send/i)
    expect(field(wrapper, 'message').element.value).toBe(typed.message)
  })

  it('shows an error when the network fails', async () => {
    stubRecaptcha({ token: 'solved' })
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)

    expect(toastText()).toMatch(/failed to send/i)
  })

  it('disables Send while the message is on its way', async () => {
    stubRecaptcha({ token: 'solved' })
    let respond
    fetch.mockReturnValueOnce(new Promise((resolve) => (respond = resolve)))
    const wrapper = mount(App, { attachTo: document.body })

    await fillAndSubmit(wrapper, typed)
    expect(wrapper.find('#contact button[type="submit"]').attributes('disabled')).toBeDefined()

    respond(new Response(JSON.stringify({ success: true }), { status: 200 }))
    await flushPromises()
    expect(wrapper.find('#contact button[type="submit"]').attributes('disabled')).toBeUndefined()
  })
})

describe('Contact links', () => {
  it('offers one-click Email, LinkedIn and GitHub beside the form', () => {
    const links = mount(App)
      .findAll('#contact a')
      .map((a) => [a.text(), a.attributes('href')])

    expect(links).toEqual(
      expect.arrayContaining([
        ['Email', 'mailto:layugjohann@gmail.com'],
        ['LinkedIn', 'https://www.linkedin.com/in/johannlayug/'],
        ['GitHub', 'https://github.com/layugjohann'],
      ]),
    )
  })

  it('says where Johann is and that he is open to remote', () => {
    expect(mount(App).find('#contact').text()).toContain('Philippines (UTC+8) · Open to remote')
  })
})
