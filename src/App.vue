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
  <Navbar />
  <Hero />
  <Projects :projects="projects" />
  <Tools />
  <Contact />
  <Footer />
  
</template>

<style scoped>

</style>
