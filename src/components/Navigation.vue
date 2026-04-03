<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import kaeLogo from '../assets/kae_logo_gold.svg'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')

const navItems = [
  { name: 'Home', hash: '' },
  { name: 'Services', hash: 'services' },
  { name: 'Menu', hash: 'menu' },
  { name: 'Rituals', hash: 'rituals' },
  { name: 'Packages', hash: 'packages' },
  { name: 'About', hash: 'about' },
  { name: 'Etiquette', hash: 'spa-etiquette' },
  { name: 'Reviews', hash: 'testimonials' },
  { name: 'Contact', hash: 'contact' },
]

const scrollToSection = (hash: string) => {
  if (hash === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeSection.value = ''
    history.pushState(null, '', '#')
    isMenuOpen.value = false
    return
  }
  const el = document.getElementById(hash)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    activeSection.value = hash
    history.pushState(null, '', `#${hash}`)
  }
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
  const offset = window.scrollY + 120
  for (let i = navItems.length - 1; i >= 0; i--) {
    const el = document.getElementById(navItems[i].hash)
    if (el) {
      const top = el.offsetTop
      const bottom = top + el.offsetHeight
      if (offset >= top && offset < bottom) {
        activeSection.value = navItems[i].hash
        return
      }
    }
  }
  if (window.scrollY < 100) activeSection.value = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (route.hash) {
    activeSection.value = route.hash.slice(1)
    setTimeout(() => scrollToSection(route.hash.slice(1)), 100)
  } else handleScroll()
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

watch(() => route.hash, (h) => { if (h) activeSection.value = h.slice(1) })
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
      isScrolled ? 'bg-kae-teal/95 backdrop-blur-md shadow-luxury-soft' : 'bg-transparent'
    ]"
  >
    <div class="container-editorial">
      <div class="flex items-center justify-between h-20 lg:h-24">
        <a href="#" class="flex items-center gap-2" @click.prevent="scrollToSection('')">
          <img :src="kaeLogo" alt="KAE Spa" class="h-14 lg:h-16" :class="isScrolled ? '' : 'filter brightness-0 invert'" />
          <!-- <span v-if="!isScrolled" class="font-script text-2xl text-kae-gold">KAE</span> -->
        </a>

        <div class="hidden xl:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            href="#"
            :class="[
              'font-body text-sm px-4 py-2 rounded-full transition-all duration-300',
              isScrolled ? 'text-kae-white/80 hover:text-kae-gold' : 'text-white/80 hover:text-kae-gold',
              activeSection === item.hash ? 'text-kae-gold font-medium' : ''
            ]"
            @click.prevent="scrollToSection(item.hash)"
          >
            {{ item.name }}
          </a>
        </div>

        <a
          href="https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-400',
            isScrolled ? 'bg-kae-gold text-kae-teal-dark hover:bg-kae-gold-light' : 'bg-kae-gold/90 text-kae-teal-dark hover:bg-kae-gold'
          ]"
        >
          Book Now
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>

        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 rounded-full transition-colors"
          :class="isScrolled ? 'text-kae-gold' : 'text-white'"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden fixed inset-0 top-20 bg-kae-teal/98 backdrop-blur-xl z-40 overflow-y-auto"
      >
        <div class="container-editorial py-8 flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            href="#"
            :class="[
              'font-body text-lg py-4 px-5 rounded-2xl transition-all',
              'text-kae-white/90 hover:text-kae-gold',
              activeSection === item.hash ? 'bg-white/10 text-kae-gold font-medium' : ''
            ]"
            @click.prevent="scrollToSection(item.hash)"
          >
            {{ item.name }}
          </a>
          <a
            href="https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 bg-kae-gold text-kae-teal-dark py-4 rounded-2xl font-body font-medium text-center"
            @click="isMenuOpen = false"
          >
            Book Your Experience
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
