<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import PixelBackground from './components/PixelBackground.vue'
import SelectedWork from './components/SelectedWork.vue'
import AboutStack from './components/AboutStack.vue'
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
  <AboutStack id="about" />
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
