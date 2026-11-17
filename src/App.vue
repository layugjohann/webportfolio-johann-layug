<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Projects from './components/Projects.vue'
import Tools from './components/Tools.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import projectData from './data/projects.json'

defineProps({
  projects: {
    type: Array,
    default: () => projectData,
  },
})
</script>

<template>
  <div id="top" class="top">
    <Navbar />
    <Hero />
  </div>
  <!-- Old sections, wrapped so the nav anchors land until tickets 04–07 replace them. -->
  <div id="work"><Projects :projects="projects" /></div>
  <div id="about"><Tools /></div>
  <Contact />
  <Footer />
</template>

<style scoped>
.top {
  background: var(--bg);
}
</style>
