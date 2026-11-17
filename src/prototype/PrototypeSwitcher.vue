<!-- PROTOTYPE — throwaway. Floating variant switcher (dev only). -->
<template>
  <div class="proto-switcher">
    <button @click="go(-1)" aria-label="Previous variant">←</button>
    <span>{{ current }} · {{ names[current] }}</span>
    <button @click="go(1)" aria-label="Next variant">→</button>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ variants: Array, names: Object, current: String })
const emit = defineEmits(['change'])

function go(step) {
  const i = props.variants.indexOf(props.current)
  const next = props.variants[(i + step + props.variants.length) % props.variants.length]
  const url = new URL(window.location.href)
  url.searchParams.set('variant', next)
  window.history.replaceState(null, '', url)
  emit('change', next)
}

function onKey(e) {
  const t = e.target
  if (t.closest && t.closest('input, textarea, [contenteditable]')) return
  if (e.key === 'ArrowLeft') go(-1)
  if (e.key === 'ArrowRight') go(1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.proto-switcher {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  z-index: 9999; display: flex; align-items: center; gap: 12px;
  background: #fff; color: #000; padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 6px 24px rgba(0,0,0,.45); font: 600 13px/1 system-ui, sans-serif;
  border: 2px solid #ff3d7f;
}
.proto-switcher button {
  border: 0; background: #000; color: #fff; width: 28px; height: 28px;
  border-radius: 999px; cursor: pointer; font-size: 14px;
}
</style>
