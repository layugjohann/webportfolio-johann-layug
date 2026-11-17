<!-- PROTOTYPE — throwaway. Variant C: "Level Select" — centered character-sheet hero, projects as master/detail selector. -->
<template>
  <div class="proto-root vc">
    <nav class="nav">
      <span class="logo px-silk">&gt; johann_layug</span>
      <div class="nav-links"><a href="#vc-work">Projects</a><a href="#">About</a><a href="#">Contact</a></div>
    </nav>

    <header class="hero">
      <div class="sheet">
        <div class="frame">
          <img :src="person.portrait" class="pixel" alt="Johann pixel portrait" />
        </div>
        <div class="sheet-info">
          <span class="lvl px-silk">LV.99 · {{ person.role }}</span>
          <h1 class="px-font">{{ person.name }}</h1>
          <p class="sub">{{ person.headline }}</p>
          <div class="stats">
            <div v-for="s in stats" :key="s.name" class="stat">
              <span class="px-silk">{{ s.name }}</span>
              <div class="bar"><i v-for="n in 10" :key="n" :class="{ on: n <= s.val }"></i></div>
            </div>
          </div>
          <div class="ctas">
            <a href="#vc-work" class="btn px-notch">▶ View projects</a>
            <a href="#" class="btn ghost px-notch">Résumé</a>
            <a v-for="l in person.links" :key="l.label" :href="l.href" class="ic" :title="l.label">
              <img :src="l.icon" class="pixel" width="18" :alt="l.label" />
            </a>
          </div>
        </div>
      </div>
      <p class="quest px-mono">★ {{ person.status }}</p>
    </header>

    <section id="vc-work" class="levels">
      <h2 class="px-font">Select a project</h2>
      <div class="ms">
        <ul class="list">
          <li v-for="(p, i) in projects" :key="p.id"
              :class="{ active: i === sel }" @click="sel = i" @mouseenter="sel = i">
            <span class="cur px-silk">{{ i === sel ? '▶' : '' }}</span>
            <span class="num px-silk">0{{ i + 1 }}</span>
            <span class="nm px-font">{{ p.title }}</span>
          </li>
          <li class="locked"><span class="cur"></span><span class="num px-silk">04</span><span class="nm px-font">??? coming soon</span></li>
        </ul>

        <div class="detail px-notch">
          <div class="shot">
            <img v-if="cur.img" :src="cur.img" :alt="cur.title" />
            <div v-else class="px-placeholder">screenshot</div>
          </div>
          <div class="d-body">
            <h3 class="px-font">{{ cur.title }}</h3>
            <p class="pitch">{{ cur.pitch }}</p>
            <p class="outcome"><span class="px-silk">result</span> {{ cur.outcome }}</p>
            <div class="tags"><span v-for="t in cur.tags" :key="t" class="px-mono">{{ t }}</span></div>
            <div class="d-links"><a :href="cur.live" class="btn px-notch">Play live ↗</a><a :href="cur.repo" class="btn ghost px-notch">Source ↗</a></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { person, projects } from './protoData'

const stats = [
  { name: 'agents', val: 9 },
  { name: 'full-stack', val: 8 },
  { name: 'client-facing', val: 8 },
]
const sel = ref(0)
const cur = computed(() => projects[sel.value])
</script>

<style scoped>
.vc {
  --bg: #0c0a1f; --panel: #17143a; --line: #2f2a66; --text: #f1eeff; --muted: #9d97c9;
  --acc: #44e1ff; --acc2: #ff4fa3; --gold: #ffd84a;
  background-color: var(--bg);
  background-image: linear-gradient(#ffffff06 1px, transparent 1px), linear-gradient(90deg, #ffffff06 1px, transparent 1px);
  background-size: 24px 24px;
  color: var(--text); padding-bottom: 120px;
}
.nav { display: flex; justify-content: space-between; align-items: center; max-width: 1120px; margin: 0 auto; padding: 22px 24px; }
.logo { color: var(--acc); font-size: 15px; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: var(--muted); font-size: 14px; }
.nav-links a:hover { color: var(--text); }

.hero { max-width: 1120px; margin: 0 auto; padding: 56px 24px 80px; text-align: center; }
.sheet { display: inline-grid; grid-template-columns: auto 1fr; gap: 40px; align-items: center; text-align: left; background: var(--panel); border: 3px solid var(--line); padding: 32px; box-shadow: 10px 10px 0 #000, 10px 10px 0 3px var(--acc2); max-width: 920px; }
.frame { width: 240px; height: 280px; background: linear-gradient(var(--acc2), #7b2bff); border: 3px solid #000; box-shadow: inset 0 0 0 4px #ffffff30; overflow: hidden; display: flex; align-items: flex-end; }
.frame img { width: 100%; height: 100%; object-fit: cover; }
.lvl { color: var(--gold); font-size: 12px; }
h1 { font-size: clamp(36px, 5vw, 58px); margin: 8px 0 6px; font-weight: 700; }
.sub { color: var(--muted); font-size: 18px; line-height: 1.5; max-width: 460px; }
.stats { margin: 22px 0; display: grid; gap: 8px; }
.stat { display: grid; grid-template-columns: 120px 1fr; align-items: center; font-size: 11px; color: var(--muted); }
.bar { display: flex; gap: 3px; }
.bar i { width: 18px; height: 12px; background: #2a2658; }
.bar i.on { background: var(--acc); }
.ctas { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.btn { background: var(--acc); color: #04161b; font-weight: 700; padding: 12px 18px; font-size: 14px; }
.btn:hover { background: #fff; }
.btn.ghost { background: #2a2658; color: var(--text); }
.ic { width: 42px; height: 42px; display: grid; place-items: center; background: #2a2658; }
.quest { margin-top: 28px; color: var(--gold); font-size: 13px; }

.levels { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
h2 { font-size: 30px; margin-bottom: 22px; }
.ms { display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.list li { display: grid; grid-template-columns: 18px 32px 1fr; align-items: center; gap: 6px; padding: 14px 12px; background: var(--panel); border: 2px solid var(--line); cursor: pointer; }
.list li.active { border-color: var(--acc); background: #1d1a4a; }
.list .cur { color: var(--acc); font-size: 12px; }
.list .num { color: var(--muted); font-size: 12px; }
.list .nm { font-size: 20px; }
.list li.locked { opacity: .45; cursor: default; }
.detail { background: var(--panel); display: grid; grid-template-columns: 1.1fr 1fr; }
.shot { aspect-ratio: 4/3; overflow: hidden; }
.shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.shot .px-placeholder { height: 100%; }
.d-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
h3 { font-size: 30px; }
.pitch { color: var(--text); font-size: 16px; line-height: 1.5; }
.outcome { color: var(--muted); font-size: 14px; line-height: 1.5; }
.outcome span { color: var(--gold); font-size: 11px; margin-right: 6px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tags span { font-size: 11px; padding: 4px 8px; background: #2a2658; color: var(--muted); }
.d-links { display: flex; gap: 8px; margin-top: auto; }

@media (max-width: 860px) {
  .sheet { grid-template-columns: 1fr; }
  .frame { width: 100%; }
  .ms, .detail { grid-template-columns: 1fr; }
}
</style>
