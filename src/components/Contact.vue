<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { person } from '@/data/person'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '4e0dba34-036a-4c1a-847d-2a3245797145'
const SUBJECT = 'New message from Portfolio Contact form'
const SEND_FAILED = 'Failed to send message. Please try again or email me directly.'
const RECAPTCHA_SITE_KEY = '6LfvrX8sAAAAAFi4StqxyRqoWbwDWHUphUyvmSc7'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)

const recaptchaContainer = ref(null)
const recaptchaToken = ref('')
let recaptchaWidgetId = null
let recaptchaPoll = null

// Created on mount so the toast container only exists while the page does.
let notyf = null

function renderRecaptcha() {
  recaptchaWidgetId = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: RECAPTCHA_SITE_KEY,
    theme: 'dark',
    callback: (token) => {
      recaptchaToken.value = token
    },
    'expired-callback': () => {
      recaptchaToken.value = ''
    },
  })
}

function resetRecaptcha() {
  recaptchaToken.value = ''
  if (recaptchaWidgetId !== null) window.grecaptcha.reset(recaptchaWidgetId)
}

async function submitForm() {
  if (!recaptchaToken.value) {
    notyf.error('Please verify that you are not a robot')
    return
  }

  sending.value = true
  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: SUBJECT,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })
    const result = await response.json().catch(() => ({}))

    if (!response.ok || !result.success) {
      notyf.error(SEND_FAILED)
      return
    }

    notyf.success('Message sent! I’ll get back to you soon.')
    name.value = ''
    email.value = ''
    message.value = ''
    resetRecaptcha()
  } catch {
    notyf.error(SEND_FAILED)
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  notyf = new Notyf({
    duration: 5000,
    position: { x: 'right', y: 'bottom' },
    types: [
      { type: 'success', background: 'var(--accent)' },
      { type: 'error', background: 'var(--accent-2)' },
    ],
  })

  // The reCAPTCHA script loads async; render as soon as it is ready.
  const ready = () => window.grecaptcha && window.grecaptcha.render
  if (ready()) {
    renderRecaptcha()
    return
  }
  recaptchaPoll = setInterval(() => {
    if (!ready()) return
    clearInterval(recaptchaPoll)
    renderRecaptcha()
  }, 100)
})

onBeforeUnmount(() => {
  clearInterval(recaptchaPoll)
  notyf?.dismissAll()
})
</script>

<template>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div class="section-head">
      <h2 id="contact-title">Contact</h2>
    </div>

    <div class="body">
      <div class="reach">
        <p class="lede">Hiring for an FDE or Agentic Engineering role? Send a message, or reach me directly.</p>
        <div class="links">
          <a
            v-for="link in person.socialLinks"
            :key="link.label"
            :href="link.href"
            class="link-btn"
            v-bind="link.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}"
          >
            <img :src="link.icon" width="18" height="18" alt="" />
            {{ link.label }}
          </a>
        </div>
        <p class="location">{{ person.location }}</p>
      </div>

      <form class="form" @submit.prevent="submitForm">
        <label>
          <span>Your name</span>
          <input v-model="name" name="name" type="text" autocomplete="name" required />
        </label>
        <label>
          <span>Your email</span>
          <input v-model="email" name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          <span>Message</span>
          <textarea v-model="message" name="message" rows="5" required></textarea>
        </label>

        <div ref="recaptchaContainer" class="recaptcha"></div>

        <button type="submit" class="send" :disabled="sending">
          {{ sending ? 'Sending…' : 'Send message →' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  padding: 32px max(16px, calc((100% - var(--page-width)) / 2 + var(--page-gutter))) 96px;
}
.section-head {
  border-bottom: 2px dashed var(--line);
  padding-bottom: 16px;
}
h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 32px;
  margin: 0;
}
.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding-top: 40px;
  align-items: start;
}
.lede {
  font-size: 18px;
  line-height: 1.6;
  margin: 0;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}
.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  clip-path: var(--notch);
}
.link-btn:hover,
.link-btn:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}
.link-btn img {
  image-rendering: pixelated;
}
.location {
  margin: 24px 0 0;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}
.form {
  display: grid;
  gap: 16px;
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-panel);
  padding: 24px;
  min-width: 0;
}
label {
  display: grid;
  gap: 6px;
}
label span {
  font-family: var(--font-label);
  font-size: 12px;
  color: var(--accent);
}
input,
textarea {
  font: inherit;
  font-size: 15px;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 0;
  padding: 10px 12px;
  width: 100%;
}
textarea {
  resize: vertical;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
}
.recaptcha {
  min-height: 78px;
  max-width: 100%;
  overflow: hidden;
}
.send {
  font: inherit;
  font-weight: 700;
  background: var(--accent);
  color: var(--on-accent);
  border: 0;
  padding: 14px 22px;
  cursor: pointer;
  clip-path: var(--notch);
}
.send:disabled {
  opacity: 0.6;
  cursor: progress;
}
@media (max-width: 860px) {
  .body {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>

<style>
/* Notyf renders toasts on document.body, outside this component's scope. */
.notyf__toast {
  border-radius: 0;
  clip-path: var(--notch);
  font-family: var(--font-body);
}
.notyf__message {
  color: var(--on-accent);
  font-weight: 600;
}
</style>
