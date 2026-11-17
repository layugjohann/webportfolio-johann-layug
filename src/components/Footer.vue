<script setup>
import { person } from '@/data/person'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <span>© {{ year }} {{ person.name }}</span>
    <span class="tag">built with pixels &amp; Vue</span>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg);
  color: var(--muted);
  border-top: 2px dashed var(--line);
  font-family: var(--font-body);
  font-size: 13px;
  padding: 24px max(16px, calc((100% - var(--page-width)) / 2 + var(--page-gutter)));
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
}
.tag {
  font-family: var(--font-label);
  font-size: 11px;
}
</style>
