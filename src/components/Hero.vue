<script setup>
import { person } from '@/data/person'
</script>

<template>
  <header class="hero">
    <div class="text">
      <span class="status"><i aria-hidden="true"></i>{{ person.status }}</span>
      <h1>{{ person.headline }}</h1>
      <p class="tagline">{{ person.tagline }}</p>
      <div class="ctas">
        <a href="#work" class="cta">See the work →</a>
        <a
          v-if="person.resumeUrl"
          :href="person.resumeUrl"
          class="cta cta-ghost"
          target="_blank"
          rel="noopener"
        >Résumé ↓</a>
        <a
          v-for="link in person.socialLinks"
          :key="link.label"
          :href="link.href"
          class="icon-btn"
          :title="link.label"
          :aria-label="link.label"
          v-bind="link.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}"
        >
          <img :src="link.icon" width="18" height="18" alt="" />
        </a>
      </div>
    </div>

    <div class="visual">
      <figure class="portrait">
        <img :src="person.portrait" :alt="`${person.name}, pixel portrait`" />
        <figcaption>{{ person.name }}</figcaption>
      </figure>
    </div>
  </header>
</template>

<style scoped>
.hero {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 64px var(--page-gutter) 96px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 1;
  color: var(--text);
  font-family: var(--font-body);
}
a {
  text-decoration: none;
}
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--bg));
  background: color-mix(in srgb, var(--accent) 6%, var(--bg));
  padding: 6px 12px;
  clip-path: var(--notch);
}
.status i {
  width: 8px;
  height: 8px;
  background: var(--accent);
  animation: blink 1.4s steps(2) infinite;
}
h1 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1.05;
  margin: 22px 0 18px;
}
.tagline {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.6;
  max-width: 520px;
  margin: 0;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
  align-items: center;
}
.cta {
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
  padding: 14px 22px;
  clip-path: var(--notch);
  transition: transform 0.1s steps(2);
}
.cta:hover,
.cta:focus-visible {
  transform: translate(-2px, -2px);
}
.cta-ghost {
  background: var(--panel);
  color: var(--text);
}
.icon-btn {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: var(--panel);
  border: 1px solid var(--line);
  clip-path: var(--notch);
}
.icon-btn:hover,
.icon-btn:focus-visible {
  border-color: var(--accent);
}
.icon-btn img,
.portrait img {
  image-rendering: pixelated;
}
.portrait {
  position: relative;
  margin: 0 0 0 auto;
  max-width: 380px;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, var(--panel)), var(--panel));
  border: 2px solid var(--line);
  box-shadow: var(--shadow-hard);
}
.portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
figcaption {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-label);
  font-size: 11px;
  padding: 4px 8px;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .status i {
    animation: none;
  }
  .cta {
    transition: none;
  }
}
@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 32px 16px 64px;
  }
  .portrait {
    margin: 0 auto;
    width: calc(100% - 10px);
  }
}
</style>
