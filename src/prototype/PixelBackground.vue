<!-- PROTOTYPE — throwaway. Animated pixel background. mode: 'drift' (floating pixels) | 'grid' (cursor-reactive grid). -->
<template>
  <canvas ref="cv" class="pxbg" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ mode: { type: String, default: 'drift' }, color: { type: String, default: '124,255,107' } })
const cv = ref(null)
let raf, ctx, w, h, parts = [], cells = new Map(), mouse = { x: -999, y: -999 }
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const S = 8 // pixel size

function resize() {
  const r = cv.value.parentElement.getBoundingClientRect()
  w = cv.value.width = r.width
  h = cv.value.height = r.height
  if (props.mode === 'drift') {
    parts = Array.from({ length: Math.round((w * h) / 14000) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vy: -(0.15 + Math.random() * 0.45), a: 0.15 + Math.random() * 0.5,
      s: S * (Math.random() < 0.15 ? 2 : 1),
    }))
  }
}

function onMove(e) {
  const r = cv.value.getBoundingClientRect()
  mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
}

function frame() {
  ctx.clearRect(0, 0, w, h)
  if (props.mode === 'drift') {
    for (const p of parts) {
      p.y += p.vy
      if (p.y < -p.s) { p.y = h + p.s; p.x = Math.random() * w }
      const twinkle = 0.6 + 0.4 * Math.sin((performance.now() / 600) + p.x)
      ctx.fillStyle = `rgba(${props.color},${p.a * twinkle})`
      ctx.fillRect(Math.round(p.x / S) * S, Math.round(p.y / S) * S, p.s, p.s)
    }
  } else {
    const G = 24
    // faint grid dots
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    for (let x = 0; x < w; x += G) for (let y = 0; y < h; y += G) ctx.fillRect(x, y, 2, 2)
    // light cells near cursor
    const cx = Math.floor(mouse.x / G), cy = Math.floor(mouse.y / G)
    for (let dx = -3; dx <= 3; dx++) for (let dy = -3; dy <= 3; dy++) {
      const d = Math.hypot(dx, dy)
      if (d <= 3) {
        const k = `${cx + dx},${cy + dy}`
        cells.set(k, Math.max(cells.get(k) || 0, 1 - d / 3.5))
      }
    }
    // random ambient blips
    if (Math.random() < 0.08) cells.set(`${Math.floor(Math.random() * w / G)},${Math.floor(Math.random() * h / G)}`, 0.6)
    for (const [k, a] of cells) {
      const [x, y] = k.split(',').map(Number)
      ctx.fillStyle = `rgba(${props.color},${a * 0.35})`
      ctx.fillRect(x * G + 2, y * G + 2, G - 4, G - 4)
      const na = a - 0.02
      na <= 0 ? cells.delete(k) : cells.set(k, na)
    }
  }
  if (!reduce) raf = requestAnimationFrame(frame)
}

onMounted(() => {
  ctx = cv.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove)
  frame()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
})
</script>

<style scoped>
.pxbg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
</style>
