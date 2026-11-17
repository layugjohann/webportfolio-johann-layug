<!-- PROTOTYPE — throwaway. Variant B: "Bento" — hero and projects are both tile grids, pixel tiles with hard shadows. -->
<template>
  <div class="proto-root vb">
    <div class="wrap">
      <nav class="nav">
        <span class="logo px-silk">JL</span>
        <div class="nav-links"><a href="#vb-work">Work</a><a href="#">About</a><a href="#">Contact</a></div>
      </nav>

      <header class="bento">
        <div class="tile t-intro">
          <span class="kicker px-mono">hi, I'm {{ person.short }} —</span>
          <h1 class="px-font">{{ person.headline }}</h1>
          <p>{{ person.sub }}</p>
          <div class="row">
            <a href="#vb-work" class="btn">View projects</a>
            <a href="#" class="btn alt">Résumé</a>
          </div>
        </div>

        <div class="tile t-portrait">
          <img :src="person.portrait" class="pixel" alt="Johann pixel portrait" />
        </div>

        <div class="tile t-status">
          <span class="blip"></span>
          <strong>{{ person.status }}</strong>
          <span class="muted">{{ person.location }}</span>
        </div>

        <div class="tile t-links">
          <a v-for="l in person.links" :key="l.label" :href="l.href">
            <img :src="l.icon" class="pixel" width="20" :alt="l.label" /> {{ l.label }} <span>↗</span>
          </a>
        </div>

        <div class="tile t-stack">
          <span class="label px-silk">stack</span>
          <div class="chips"><span v-for="s in person.stack" :key="s">{{ s }}</span></div>
        </div>

        <div class="tile t-now">
          <span class="label px-silk">now building</span>
          <p>{{ projects[3].pitch }}</p>
        </div>
      </header>

      <section id="vb-work">
        <h2 class="px-font">Projects <span class="count">{{ projects.length }}</span></h2>
        <div class="proj-grid">
          <a v-for="p in projects" :key="p.id" :href="p.live" :class="['tile', 'proj', { big: p.featured }]">
            <div class="shot">
              <img v-if="p.img" :src="p.img" :alt="p.title" />
              <div v-else class="px-placeholder">screenshot</div>
            </div>
            <div class="proj-body">
              <div class="proj-top">
                <h3 class="px-font">{{ p.title }}</h3>
                <span class="arrow">↗</span>
              </div>
              <p>{{ p.pitch }}</p>
              <div class="chips"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { person, projects } from './protoData'
</script>

<style scoped>
.vb {
  --bg: #0f0f10; --tile: #19191c; --line: #2a2a2f; --text: #f3f3ee; --muted: #9a9aa3;
  --acc: #c8ff3d; --acc-ink: #121400; --pink: #ff6bb5;
  background: var(--bg); color: var(--text); padding-bottom: 120px;
}
.wrap { max-width: 1160px; margin: 0 auto; padding: 0 20px; }
.muted { color: var(--muted); font-size: 13px; }

.nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 0; }
.logo { background: var(--acc); color: var(--acc-ink); padding: 6px 10px; font-size: 18px; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: var(--muted); font-size: 14px; }
.nav-links a:hover { color: var(--text); }

.tile {
  background: var(--tile); border: 2px solid var(--line); padding: 22px;
  box-shadow: 6px 6px 0 #000; transition: transform .12s steps(2), box-shadow .12s steps(2);
}
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(120px, auto); gap: 14px; margin-top: 12px; }
.t-intro { grid-column: span 3; grid-row: span 2; display: flex; flex-direction: column; justify-content: flex-end; }
.kicker { color: var(--acc); font-size: 14px; }
h1 { font-size: clamp(32px, 4.4vw, 54px); line-height: 1.05; margin: 10px 0 14px; font-weight: 600; }
.t-intro p { color: var(--muted); font-size: 17px; line-height: 1.6; max-width: 620px; }
.row { display: flex; gap: 10px; margin-top: 22px; }
.btn { background: var(--acc); color: var(--acc-ink); font-weight: 700; padding: 12px 18px; border: 2px solid #000; box-shadow: 4px 4px 0 #000; }
.btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }
.btn.alt { background: var(--text); }

.t-portrait { grid-row: span 2; padding: 0; background: var(--pink); display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
.t-portrait img { width: 100%; height: 100%; object-fit: cover; }

.t-status { display: flex; flex-direction: column; gap: 6px; justify-content: center; }
.t-status strong { font-size: 15px; }
.blip { width: 10px; height: 10px; background: var(--acc); box-shadow: 0 0 0 4px #2b3a0b; }

.t-links { display: flex; flex-direction: column; gap: 4px; justify-content: center; padding: 14px 18px; }
.t-links a { color: var(--text); display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 14px; }
.t-links a span { margin-left: auto; color: var(--muted); }
.t-links a:hover span { color: var(--acc); }

.t-stack { grid-column: span 1; }
.t-now { grid-column: span 1; background: #1c1630; border-color: #3a2e63; }
.t-now p { margin-top: 8px; font-size: 14px; color: #cfc6ee; line-height: 1.5; }
.label { font-size: 11px; color: var(--muted); }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.chips span { font-size: 12px; padding: 4px 8px; background: #000; border: 1px solid var(--line); color: #d7d7d0; }

h2 { font-size: 30px; margin: 72px 0 18px; display: flex; align-items: center; gap: 12px; }
.count { font-family: 'Silkscreen', monospace; font-size: 14px; background: var(--acc); color: var(--acc-ink); padding: 2px 8px; }
.proj-grid { display: grid; grid-template-columns: 1.4fr 1fr; grid-auto-rows: auto; gap: 14px; }
.proj { padding: 0; color: var(--text); display: flex; flex-direction: column; overflow: hidden; }
.proj.big { grid-row: span 2; }
.proj:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--acc); border-color: var(--acc); }
.shot { aspect-ratio: 16/9; border-bottom: 2px solid var(--line); overflow: hidden; }
.proj.big .shot { aspect-ratio: 4/3; }
.shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.shot .px-placeholder { height: 100%; }
.proj-body { padding: 18px 20px 22px; }
.proj-top { display: flex; justify-content: space-between; align-items: center; }
h3 { font-size: 24px; }
.proj.big h3 { font-size: 32px; }
.arrow { font-size: 20px; color: var(--muted); }
.proj:hover .arrow { color: var(--acc); }
.proj-body p { color: var(--muted); font-size: 15px; line-height: 1.5; margin: 6px 0 4px; }

@media (max-width: 860px) {
  .bento { grid-template-columns: 1fr 1fr; }
  .t-intro { grid-column: span 2; }
  .t-portrait { grid-row: span 1; min-height: 220px; }
  .proj-grid { grid-template-columns: 1fr; }
  .proj.big { grid-row: auto; }
}
</style>
