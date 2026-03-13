<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import kaeLogo from '../assets/kae_logo_black.svg'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')

const navItems = [
  { name: 'Home', hash: '' },
  { name: 'Services', hash: 'services' },
  { name: 'Menu', hash: 'menu' },
  { name: 'Testimonials', hash: 'testimonials' },
  { name: 'About', hash: 'about' },
  { name: 'Spa Etiquette', hash: 'spa-etiquette' },
  { name: 'Contact', hash: 'contact' }
]

const isActive = (hash: string) => {
  return activeSection.value === hash
}

const scrollToSection = (hash: string) => {
  if (hash === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeSection.value = ''
    history.pushState(null, '', '#')
    return
  }

  const element = document.getElementById(hash)
  if (element) {
    const headerOffset = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    activeSection.value = hash
    history.pushState(null, '', `#${hash}`)
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
  
  // Update active section based on scroll position
  const headerOffset = 100
  const scrollPosition = window.scrollY + headerOffset

  // Find the section that's currently in view
  for (let i = navItems.length - 1; i >= 0; i--) {
    const element = document.getElementById(navItems[i].hash)
    if (element) {
      const elementTop = element.offsetTop
      const elementBottom = elementTop + element.offsetHeight
      
      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        activeSection.value = navItems[i].hash
        break
      }
    }
  }

  // If we're at the top of the page, set active section to empty
  if (window.scrollY === 0) {
    activeSection.value = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Set initial active section from URL hash or scroll position
  if (route.hash) {
    const hash = route.hash.slice(1)
    activeSection.value = hash
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      scrollToSection(hash)
    }, 100)
  } else {
    handleScroll() // Check initial position
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Watch for route changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    activeSection.value = newHash.slice(1)
  }
})
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md' 
        : 'bg-transparent'
    ]"
  >
    <div class="container-custom py-4">
      <div class="flex items-center justify-between">
        <a 
          href="#" 
          class="transition-all duration-300 hover:opacity-80"
          @click.prevent="scrollToSection('')"
        >
          <img 
            :src="kaeLogo" 
            alt="Kae Spa Logo" 
            class="h-12 w-auto"
            :class="[
              isScrolled 
                ? 'filter-none' 
                : 'filter brightness-0 invert'
            ]"
          />
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item.name" 
            href="#" 
            :class="[
              'font-body transition-all duration-300 relative py-2',
              isScrolled 
                ? 'text-gray-600 hover:text-spa-accent-3' 
                : 'text-white/90 hover:text-white',
              isActive(item.hash) 
                ? 'text-spa-accent-3 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-spa-accent-3 after:rounded-full' 
                : ''
            ]"
            @click.prevent="scrollToSection(item.hash)"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="md:hidden relative z-[101] p-2"
          :class="[
            'transition-colors duration-300',
            isScrolled ? 'text-gray-600' : 'text-white'
          ]"
        >
          <svg 
            class="w-6 h-6 transition-transform duration-300" 
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div 
        v-if="isMenuOpen" 
        :class="[
          'md:hidden fixed inset-0 h-screen pt-20 transition-all duration-500 z-[100]',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md' 
            : 'bg-black/20 backdrop-blur-md'
        ]"
      >
        <div class="container-custom flex flex-col space-y-6">
          <a 
            v-for="(item, index) in navItems" 
            :key="item.name" 
            href="#" 
            :class="[
              'font-body transition-all duration-300 transform',
              isScrolled 
                ? 'text-gray-600 hover:text-spa-accent-3' 
                : 'text-white/90 hover:text-white',
              'hover:translate-x-2',
              isActive(item.hash) 
                ? 'text-spa-accent-3 font-medium pl-2 border-l-2 border-spa-accent-3' 
                : ''
            ]"
            :style="{ transitionDelay: `${index * 50}ms` }"
            @click.prevent="() => { isMenuOpen = false; scrollToSection(item.hash) }"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style> 