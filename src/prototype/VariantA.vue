<!-- PROTOTYPE — throwaway. Variant A: "Agent Console" — split hero w/ live agent trace, projects as case-study rows. -->
<template>
  <div class="proto-root va">
    <nav class="nav">
      <span class="logo px-font">johann<span class="acc">.</span>layug</span>
      <div class="nav-links">
        <a href="#va-work">Work</a><a href="#">About</a><a href="#">Contact</a>
        <a href="#" class="btn-ghost px-notch">Résumé ↓</a>
      </div>
    </nav>

    <div class="hero-wrap">
    <PixelBackground v-if="bg !== 'none'" :mode="bg" />
    <header :class="['hero', 'layout-' + portrait]">
      <div class="hero-text">
        <span class="status"><i></i>{{ person.status }}</span>
        <h1 class="px-font">{{ person.headline }}</h1>
        <p class="sub">{{ person.sub }}</p>
        <div class="ctas">
          <a href="#va-work" class="btn px-notch">See the work →</a>
          <a v-for="l in person.links" :key="l.label" :href="l.href" class="icon-btn" :title="l.label">
            <img :src="l.icon" class="pixel" width="18" :alt="l.label" />
          </a>
        </div>
      </div>

      <div class="visual">
      <div v-if="portrait === 'side'" class="portrait-card">
        <img :src="person.portrait" class="pixel" alt="Johann pixel portrait" />
        <span class="tag px-silk">{{ person.name }}</span>
      </div>
      <div class="console">
        <div v-if="portrait === 'identity'" class="identity">
          <img :src="person.portrait" class="pixel" alt="Johann pixel portrait" />
          <div>
            <strong class="px-font">{{ person.name }}</strong>
            <span class="px-mono">{{ person.role }}</span>
          </div>
          <span class="dot ok"></span>
        </div>
        <div class="console-head">
          <img v-if="portrait === 'small'" :src="person.portrait" class="pixel avatar" alt="Johann pixel portrait" />
          <span class="px-mono">availability-runs · run #128</span>
          <span v-if="portrait !== 'identity'" class="dot ok"></span>
        </div>
        <div class="console-body px-mono">
          <div v-for="(line, i) in shown" :key="i" :class="['ln', line.k]">
            <span class="k">{{ line.k }}</span> {{ line.t }}
          </div>
          <span class="cursor">█</span>
        </div>
      </div>
      </div>
    </header>
    </div>

    <section id="va-work" class="work">
      <div class="section-head">
        <h2 class="px-font">Selected work</h2>
        <span class="px-mono muted">{{ projects.length }} projects · more shipping</span>
      </div>

      <article v-for="(p, i) in projects" :key="p.id" class="case">
        <div class="case-text">
          <span class="idx px-silk">0{{ i + 1 }}</span>
          <h3 class="px-font">{{ p.title }} <span v-if="p.status === 'in-progress'" class="wip px-silk">in progress</span></h3>
          <p class="pitch">{{ p.pitch }}</p>
          <dl class="pao">
            <div><dt class="px-mono">Problem</dt><dd>{{ p.problem }}</dd></div>
            <div><dt class="px-mono">Approach</dt><dd>{{ p.approach }}</dd></div>
            <div><dt class="px-mono">Outcome</dt><dd>{{ p.outcome }}</dd></div>
          </dl>
          <div class="tags"><span v-for="t in p.tags" :key="t" class="px-mono">{{ t }}</span></div>
          <div class="case-links">
            <a v-if="p.live" :href="p.live">Live ↗</a><a v-if="p.repo" :href="p.repo">Code ↗</a>
          </div>
        </div>
        <div class="shot">
          <img v-if="p.img" :src="p.img" :alt="p.title" />
          <div v-else class="px-placeholder">screenshot</div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { person, projects } from './protoData'
import PixelBackground from './PixelBackground.vue'

defineProps({
  portrait: { type: String, default: 'small' }, // small | side | identity
  bg: { type: String, default: 'none' },        // none | drift | grid
})

// [?] illustrative — should mirror what availability-runs really does
const trace = [
  { k: 'goal', t: 'Sync this week’s availability to Trello' },
  { k: 'tool', t: 'sheet.read("availability") → 18 rows' },
  { k: 'think', t: 'Match each person to their card' },
  { k: 'tool', t: 'trello.updateCard(×18) → ok' },
  { k: 'eval', t: 'All 18 cards verified' },
  { k: 'done', t: 'Synced in 41s · 0 manual edits' },
]
const shown = ref([])
let timer
onMounted(() => {
  let i = 0
  timer = setInterval(() => {
    if (i >= trace.length) { shown.value = []; i = 0; return }
    shown.value = [...shown.value, trace[i++]]
  }, 900)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.va {
  --bg: #0b0d12; --panel: #12161f; --line: #262c3b; --text: #e8ebf3; --muted: #8a93ab;
  --acc: #7cff6b; --acc2: #ffb84d;
  background: var(--bg); color: var(--text); padding-bottom: 120px;
}
.acc { color: var(--acc); }
.muted { color: var(--muted); font-size: 13px; }

.nav { display: flex; justify-content: space-between; align-items: center; max-width: 1160px; margin: 0 auto; padding: 22px 24px; }
.logo { font-size: 22px; color: var(--text); }
.nav-links { display: flex; gap: 22px; align-items: center; }
.nav-links a { color: var(--muted); font-size: 14px; }
.nav-links a:hover { color: var(--text); }
.btn-ghost { background: var(--panel); color: var(--text) !important; padding: 8px 14px; border: 0; }

.hero-wrap { position: relative; overflow: hidden; }
.hero-wrap > .hero, .hero-wrap > .nav { position: relative; z-index: 1; }
.hero { max-width: 1160px; margin: 0 auto; padding: 64px 24px 96px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
.status { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--acc); border: 1px solid #2c4a2a; padding: 6px 12px; background: #0f1a10; }
.status i { width: 8px; height: 8px; background: var(--acc); display: inline-block; animation: blink 1.4s steps(2) infinite; }
h1 { font-size: clamp(36px, 5vw, 60px); line-height: 1.05; margin: 22px 0 18px; font-weight: 600; }
.sub { color: var(--muted); font-size: 18px; line-height: 1.6; max-width: 520px; }
.ctas { display: flex; gap: 10px; margin-top: 32px; align-items: center; }
.btn { background: var(--acc); color: #071006; font-weight: 700; padding: 14px 22px; box-shadow: none; transition: transform .1s steps(2); }
.btn:hover { transform: translate(-2px, -2px); }
.icon-btn { width: 46px; height: 46px; display: grid; place-items: center; background: var(--panel); border: 1px solid var(--line); }
.icon-btn:hover { border-color: var(--acc); }

.visual { position: relative; }
.layout-side .visual { padding: 0 0 70px 40px; }
.portrait-card { position: relative; background: linear-gradient(180deg, #1c2a1a, #0f1a10); border: 2px solid var(--line); box-shadow: 10px 10px 0 var(--acc); aspect-ratio: 4/5; max-width: 380px; margin-left: auto; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; }
.portrait-card img { width: 100%; height: 100%; object-fit: cover; }
.portrait-card .tag { position: absolute; top: 12px; left: 12px; background: var(--acc); color: #071006; font-size: 11px; padding: 4px 8px; }
.layout-side .console { position: absolute; left: 0; bottom: 0; width: 78%; }
.layout-side .console-body { min-height: 0; font-size: 12px; line-height: 1.8; padding: 14px; }
.identity { display: flex; align-items: center; gap: 18px; padding: 18px; border-bottom: 2px solid var(--line); background: #0f1a10; }
.identity img { width: 132px; height: 132px; object-fit: cover; border: 2px solid var(--acc); background: #1d2433; }
.identity strong { display: block; font-size: 26px; }
.identity span { font-size: 12px; color: var(--muted); }
.identity .dot { align-self: flex-start; }
.wip { font-size: 11px; background: var(--acc2); color: #1a0f00; padding: 3px 8px; vertical-align: middle; }
.console { background: var(--panel); border: 2px solid var(--line); box-shadow: 8px 8px 0 #1d2433; }
.console-head { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 2px solid var(--line); font-size: 12px; color: var(--muted); }
.avatar { width: 28px; height: 28px; object-fit: cover; background: #1d2433; }
.dot { width: 8px; height: 8px; margin-left: auto; }
.dot.ok { background: var(--acc); }
.console-body { padding: 18px; min-height: 250px; font-size: 13px; line-height: 2; }
.ln .k { display: inline-block; min-width: 54px; color: var(--muted); }
.ln.tool .k { color: var(--acc2); }
.ln.eval .k, .ln.done .k { color: var(--acc); }
.ln.done { color: var(--acc); }
.cursor { color: var(--acc); animation: blink 1s steps(2) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.work { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
.section-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px dashed var(--line); padding-bottom: 16px; margin-bottom: 8px; }
h2 { font-size: 32px; }
.case { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; padding: 56px 0; border-bottom: 2px dashed var(--line); align-items: center; }
.case:nth-child(odd) .shot { order: -1; }
.idx { color: var(--acc); font-size: 14px; }
h3 { font-size: 34px; margin: 6px 0 10px; }
.pitch { color: var(--text); font-size: 17px; line-height: 1.5; }
.pao { margin: 22px 0; display: grid; gap: 12px; }
.pao dt { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); }
.pao dd { margin: 2px 0 0; color: #c3c9d9; font-size: 14px; line-height: 1.5; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tags span { font-size: 11px; padding: 4px 8px; border: 1px solid var(--line); color: var(--muted); }
.case-links { display: flex; gap: 18px; margin-top: 18px; }
.case-links a { color: var(--acc); font-weight: 600; font-size: 14px; }
.shot { border: 2px solid var(--line); box-shadow: 10px 10px 0 var(--acc); aspect-ratio: 16/10; overflow: hidden; background: var(--panel); }
.shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.shot .px-placeholder { height: 100%; }

@media (max-width: 860px) {
  .hero, .case { grid-template-columns: 1fr; }
  .case:nth-child(odd) .shot { order: 0; }
  .layout-side .visual { padding: 0; }
  .layout-side .console { position: relative; width: 100%; margin-top: 16px; }
  .nav-links a:not(.btn-ghost) { display: none; }
}
</style>
