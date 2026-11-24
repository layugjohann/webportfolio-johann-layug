<script setup>
import { nextTick, ref } from 'vue'

defineProps({
  projects: { type: Array, required: true },
})

const rowNumber = (i) => String(i + 1).padStart(2, '0')

// The terminal card's lines; a Project without a run shows just its prompt.
const runLines = (p) => (p.run?.length ? p.run : [`$ ${p.id}`])

// A Demo video stays out of the page (nothing downloads) until Play is clicked;
// then it takes the screenshot's place and focus moves to it.
const playing = ref(new Set())
const play = async (p) => {
  playing.value = new Set(playing.value).add(p.id)
  await nextTick()
  document.getElementById(`video-${p.id}`)?.focus()
}
</script>

<template>
  <section class="work" aria-labelledby="work-title">
    <div class="section-head">
      <h2 id="work-title">Selected work</h2>
      <span class="count">{{ projects.length }} projects</span>
    </div>

    <article v-for="(p, i) in projects" :key="p.id" class="case">
      <div class="case-text">
        <span class="idx">{{ rowNumber(i) }}</span>
        <h3>
          {{ p.title }}
          <span v-if="p.status === 'in-progress'" class="badge">In progress</span>
        </h3>
        <p class="pitch">{{ p.pitch }}</p>
        <dl class="pao">
          <div><dt>Problem</dt><dd>{{ p.problem }}</dd></div>
          <div><dt>Approach</dt><dd>{{ p.approach }}</dd></div>
          <div><dt>Outcome</dt><dd>{{ p.outcome }}</dd></div>
        </dl>
        <ul class="tags" aria-label="Tech">
          <li v-for="t in p.tags" :key="t">{{ t }}</li>
        </ul>
        <div v-if="p.live || p.repo" class="links">
          <a v-if="p.live" :href="p.live" target="_blank" rel="noopener">Live ↗</a>
          <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener">Code ↗</a>
        </div>
      </div>

      <div class="shot">
        <video
          v-if="p.video && playing.has(p.id)"
          :id="`video-${p.id}`"
          :src="p.video"
          :poster="p.img"
          :aria-label="`${p.title} demo video`"
          controls
          autoplay
          playsinline
        ></video>
        <template v-else-if="p.img">
          <img :src="p.img" :alt="`${p.title} screenshot`" loading="lazy" />
          <button
            v-if="p.video"
            type="button"
            class="play"
            :aria-label="`Play ${p.title} demo video`"
            @click="play(p)"
          >
            <span aria-hidden="true">▶</span> Play demo
          </button>
        </template>
        <figure v-else class="terminal" :aria-label="`${p.title}, illustrative terminal run`">
          <div class="term-head">
            <i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i>
            <span>~/{{ p.id }}</span>
            <span class="term-note">illustrative</span>
          </div>
          <pre class="term-body"><span
            v-for="(line, n) in runLines(p)"
            :key="n"
            :class="{ cmd: line.startsWith('$') }"
          >{{ line }}
</span><span class="cursor" aria-hidden="true">█</span></pre>
        </figure>
      </div>
    </article>
  </section>
</template>

<style scoped>
.work {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  padding: 32px max(16px, calc((100% - var(--page-width)) / 2 + var(--page-gutter))) 96px;
}
.section-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  border-bottom: 2px dashed var(--line);
  padding-bottom: 16px;
}
h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 32px;
  margin: 0;
}
.count {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}
.case {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  align-items: center;
  padding: 56px 0;
  border-bottom: 2px dashed var(--line);
}
/* The screenshot side alternates: left on odd rows, right on even ones. */
.case:nth-of-type(odd) .shot {
  order: -1;
}
.case-text {
  min-width: 0;
}
.idx {
  font-family: var(--font-label);
  font-size: 14px;
  color: var(--accent);
}
h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 34px;
  margin: 6px 0 10px;
  overflow-wrap: anywhere;
}
.badge {
  display: inline-block;
  vertical-align: middle;
  font-family: var(--font-label);
  font-size: 11px;
  font-weight: 400;
  background: var(--accent-2);
  color: var(--bg);
  padding: 3px 8px;
  clip-path: var(--notch);
}
.pitch {
  font-size: 17px;
  line-height: 1.5;
  margin: 0;
}
.pao {
  display: grid;
  gap: 12px;
  margin: 22px 0;
}
dt {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}
dd {
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: color-mix(in srgb, var(--text) 80%, var(--muted));
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.tags li {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  border: 1px solid var(--line);
  padding: 4px 8px;
}
.links {
  display: flex;
  gap: 18px;
  margin-top: 18px;
}
.links a {
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}
.links a:hover,
.links a:focus-visible {
  text-decoration: underline;
}
.shot {
  position: relative;
  aspect-ratio: 16 / 10;
  min-width: 0;
  overflow: hidden;
  background: var(--panel);
  border: 2px solid var(--line);
  box-shadow: var(--shadow-hard);
}
.shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}
/* The whole recording shows, letterboxed on the panel colour, never cropped. */
.shot video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--panel);
}
.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border: 0;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-label);
  font-size: 13px;
  cursor: pointer;
  clip-path: var(--notch);
  box-shadow: 4px 4px 0 var(--bg);
}
.play:hover,
.play:focus-visible {
  background: var(--accent-2);
}
.play:focus-visible {
  outline: 3px solid var(--text);
  outline-offset: 3px;
}
.terminal {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--font-mono);
}
.term-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 2px solid var(--line);
  font-size: 12px;
  color: var(--muted);
}
.term-head i {
  width: 8px;
  height: 8px;
  background: var(--line);
}
.term-head i:first-child {
  background: var(--accent);
}
.term-head span {
  margin-left: 6px;
}
.term-head .term-note {
  margin-left: auto;
  font-family: var(--font-label);
  font-size: 10px;
}
.term-body {
  flex: 1;
  margin: 0;
  padding: 18px;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.9;
  color: var(--muted);
  white-space: pre-wrap;
  overflow: hidden;
  /* Pixel grid behind the run, on the 8px step. */
  background-image: linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 8px 8px;
  background-color: var(--panel);
  background-blend-mode: soft-light;
}
.term-body .cmd {
  color: var(--accent);
}
.cursor {
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
@media (max-width: 860px) {
  .case {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 40px 0;
  }
  .case:nth-of-type(odd) .shot {
    order: 0;
  }
  .shot {
    width: calc(100% - 10px);
    aspect-ratio: auto;
    min-height: 220px;
  }
  h3 {
    font-size: 28px;
  }
}
</style>
