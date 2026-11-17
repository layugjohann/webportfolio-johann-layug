<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Projects from './components/Projects.vue'
import Tools from './components/Tools.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

// PROTOTYPE — throwaway UI-direction variants, switchable via ?variant= (dev only).
import './prototype/prototype.css'
import VariantA from './prototype/VariantA.vue'
import PrototypeSwitcher from './prototype/PrototypeSwitcher.vue'

const isDev = import.meta.env.DEV
const variants = ['current', 'A', 'A1', 'A2', 'A3']
const names = { current: 'Current site', A: 'Agent Console (original)', A1: 'Big portrait + drifting pixels', A2: 'Identity console + reactive grid', A3: 'Big portrait + reactive grid' }
const initial = new URLSearchParams(window.location.search).get('variant')
const variant = ref(isDev && variants.includes(initial) ? initial : 'current')
</script>

<template>
  <template v-if="variant === 'current'">
    <Navbar />
    <Hero />
    <Projects />
    <Tools />
    <Contact />
    <Footer />
  </template>
  <VariantA v-else-if="variant === 'A'" />
  <VariantA v-else-if="variant === 'A1'" key="A1" portrait="side" bg="drift" />
  <VariantA v-else-if="variant === 'A2'" key="A2" portrait="identity" bg="grid" />
  <VariantA v-else-if="variant === 'A3'" key="A3" portrait="side" bg="grid" />

  <PrototypeSwitcher v-if="isDev" :variants="variants" :names="names" :current="variant" @change="v => (variant = v)" />
</template>
