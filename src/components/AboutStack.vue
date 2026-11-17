<script setup>
import { person } from '@/data/person'
</script>

<template>
  <section class="about" aria-labelledby="about-title">
    <div class="section-head">
      <h2 id="about-title">About</h2>
    </div>

    <div class="body">
      <p class="lede">{{ person.about }}</p>

      <div class="stack">
        <div v-for="group in person.stack" :key="group.label">
          <h3 :id="`stack-${group.label.toLowerCase()}`">{{ group.label }}</h3>
          <ul :aria-labelledby="`stack-${group.label.toLowerCase()}`">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
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
}
.lede {
  font-size: 18px;
  line-height: 1.6;
  margin: 0;
}
.stack {
  display: grid;
  gap: 24px;
  min-width: 0;
}
h3 {
  font-family: var(--font-label);
  font-weight: 400;
  font-size: 14px;
  color: var(--accent);
  margin: 0 0 10px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--panel);
  border: 1px solid var(--line);
  padding: 6px 10px;
  clip-path: var(--notch);
}
@media (max-width: 860px) {
  .body {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
