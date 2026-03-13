<script setup lang="ts">
import kaeLogo from '../../assets/kae_logo_black.svg'
import LazyImage from '../LazyImage.vue'
</script>

<template>
  <section class="relative h-screen">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <LazyImage 
        src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Spa Interior"
        customClass="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
    </div>

    <!-- Content -->
    <div class="relative container-custom h-full flex items-center">
      <div class="max-w-2xl text-white">
          <div class="mb-8">
            <LazyImage 
              :src="kaeLogo" 
              alt="Kae Spa" 
              customClass="h-24 md:h-32 inline-block filter brightness-0 invert"
            />
          </div>
        <p class="text-xl md:text-2xl font-body mb-8 text-gray-100">
          Discover the perfect balance of relaxation and rejuvenation in our serene sanctuary.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://wa.me/6282147215031?text=Hi,%20I%20would%20like%20to%20book%20a%20treatment%20at%20Kae%20Spa" 
            target="_blank"
            class="btn-primary bg-spa-accent-3 hover:bg-spa-accent-2 hover:text-gray-800"
          >
            Book Your Treatment
          </a>
          <a href="/#services" class="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20">
            Explore Services
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <a href="/#about" class="flex flex-col items-center text-white/80 hover:text-white transition-colors">
        <span class="text-sm font-body mb-2">Scroll to Explore</span>
        <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Ensure the section takes up full viewport height */
section {
  min-height: 100vh;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  z-index: 1;
}
</style> 