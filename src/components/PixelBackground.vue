<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '@/prefersReducedMotion'

const GRID = 8 // pixel size and snapping grid, in CSS px
const AREA_PER_PIXEL = 14000 // one drifting pixel per this many square px

const canvas = ref(null)
let ctx = null
let frameId = 0
let pixels = []
let width = 0
let height = 0
let color = ''

function resize() {
  const box = canvas.value.parentElement.getBoundingClientRect()
  width = canvas.value.width = box.width
  height = canvas.value.height = box.height
  pixels = Array.from({ length: Math.round((width * height) / AREA_PER_PIXEL) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.15 + Math.random() * 0.45,
    alpha: 0.15 + Math.random() * 0.5,
    size: GRID * (Math.random() < 0.15 ? 2 : 1),
  }))
}

function draw(now, moving) {
  ctx.clearRect(0, 0, width, height)
  for (const p of pixels) {
    if (moving) {
      p.y -= p.speed
      if (p.y < -p.size) {
        p.y = height + p.size
        p.x = Math.random() * width
      }
    }
    const twinkle = moving ? 0.6 + 0.4 * Math.sin(now / 600 + p.x) : 1
    ctx.globalAlpha = p.alpha * twinkle
    ctx.fillStyle = color
    ctx.fillRect(Math.round(p.x / GRID) * GRID, Math.round(p.y / GRID) * GRID, p.size, p.size)
  }
  ctx.globalAlpha = 1
}

function frame(now) {
  draw(now, true)
  frameId = requestAnimationFrame(frame)
}

function redrawStill() {
  resize()
  draw(0, false)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  if (!ctx) return
  color = getComputedStyle(canvas.value).getPropertyValue('--accent').trim()

  if (prefersReducedMotion()) {
    redrawStill()
    window.addEventListener('resize', redrawStill)
  } else {
    resize()
    window.addEventListener('resize', resize)
    frameId = requestAnimationFrame(frame)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('resize', redrawStill)
})
</script>

<template>
  <canvas ref="canvas" class="pixel-bg" aria-hidden="true"></canvas>
</template>

<style scoped>
.pixel-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
