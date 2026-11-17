<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { fixlineReplay } from '@/data/fixlineReplay'
import { prefersReducedMotion } from '@/prefersReducedMotion'

// Time between lines; after the last line the console holds one beat, then restarts.
const STEP_MS = 900

const replay = fixlineReplay
const lines = replay.lines
const shown = ref(prefersReducedMotion() ? lines.length : 0)
let timer

onMounted(() => {
  if (shown.value === lines.length) return
  timer = setInterval(() => {
    shown.value = shown.value >= lines.length ? 0 : shown.value + 1
  }, STEP_MS)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="console" aria-label="Agent console: a fixline replay">
    <!-- Optional strip above the replay, e.g. the hero's portrait. -->
    <slot name="top" />
    <div class="head">
      <span>fixline · replay · {{ replay.id }}</span>
      <i class="dot" aria-hidden="true"></i>
    </div>
    <ol class="body">
      <li v-for="(line, i) in lines.slice(0, shown)" :key="i" :class="line.kind">
        <span class="kind">{{ line.kind }}</span>
        <span class="text">{{ line.text }}</span>
      </li>
      <li class="cursor" aria-hidden="true">█</li>
    </ol>
  </section>
</template>

<style scoped>
.console {
  background: var(--panel);
  border: 2px solid var(--line);
  box-shadow: var(--shadow-panel);
  font-family: var(--font-mono);
  color: var(--text);
}
.head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 2px solid var(--line);
  font-size: 12px;
  color: var(--muted);
}
.dot {
  width: 8px;
  height: 8px;
  margin-left: auto;
  background: var(--accent);
}
.body {
  list-style: none;
  margin: 0;
  padding: 14px;
  min-height: 236px;
  font-size: 12px;
  line-height: 1.7;
}
li {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 8px;
}
.kind {
  color: var(--muted);
}
.tool .kind {
  color: var(--accent-2);
}
.proposal .kind,
.route .kind,
.route .text {
  color: var(--accent);
}
.cursor {
  display: block;
  color: var(--accent);
  animation: blink 1s steps(2) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
