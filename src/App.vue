<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import PixelBackground from './components/PixelBackground.vue'
import SelectedWork from './components/SelectedWork.vue'
import Tools from './components/Tools.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import { projects as projectData } from './data/projects'

defineProps({
  projects: {
    type: Array,
    default: () => projectData,
  },
})
</script>

<template>
  <div id="top" class="top">
    <PixelBackground />
    <Navbar />
    <Hero />
  </div>
  <SelectedWork id="work" :projects="projects" />
  <!-- Old sections, wrapped so the nav anchors land until tickets 05–07 replace them. -->
  <div id="about"><Tools /></div>
  <Contact />
  <Footer />
</template>

<style scoped>
.top {
  position: relative;
  overflow: hidden;
  background: var(--bg);
}
</style>
