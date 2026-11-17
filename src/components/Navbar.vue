<script setup>
import { person } from '@/data/person'

const sections = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <nav class="nav">
    <a href="#top" class="wordmark">johann<span class="dot">.</span>layug</a>
    <div class="links">
      <a v-for="section in sections" :key="section.href" :href="section.href">{{ section.label }}</a>
      <a
        v-if="person.resumeUrl"
        :href="person.resumeUrl"
        class="resume"
        target="_blank"
        rel="noopener"
      >Résumé ↓</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 22px var(--page-gutter);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}
a {
  text-decoration: none;
}
.wordmark {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--text);
}
.dot {
  color: var(--accent);
}
.links {
  display: flex;
  gap: 22px;
  align-items: center;
}
.links a {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--muted);
}
.links a:hover,
.links a:focus-visible {
  color: var(--text);
}
.links .resume {
  background: var(--panel);
  color: var(--text);
  padding: 8px 14px;
  clip-path: var(--notch);
}
@media (max-width: 480px) {
  .links {
    gap: 14px;
  }
}
</style>
