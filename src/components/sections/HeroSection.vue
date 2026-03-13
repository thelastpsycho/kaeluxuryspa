<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LazyImage from '../LazyImage.vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 150)
})
</script>

<template>
  <section class="relative min-h-screen overflow-hidden flex items-center justify-center">
    <!-- Calming Background Image with Deep Emerald Overlay -->
    <div class="absolute inset-0">
      <LazyImage
        src="https://images.unsplash.com/photo-1540555700478-4be289fbec6f?q=80&w=2070&auto=format&fit=crop"
        alt="Kae Luxury Spa interior"
        customClass="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
      />
      <div class="absolute inset-0 bg-kae-green/90" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,201,120,0.18)_0%,transparent_55%)]" />
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 w-full">
      <div class="container-editorial">
        <div class="max-w-3xl mx-auto text-center">
          <div
            class="transition-all duration-1000 ease-out"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >

            <h1
              class="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-4"
              :style="isLoaded ? { animation: 'fadeInUp 0.7s ease-out 0.35s forwards' } : { opacity: 0 }"
            >
              Kae Luxury Spa
            </h1>

            <p
              class="font-body text-base sm:text-lg lg:text-xl text-kae-beige/90 mb-10 lg:mb-12 max-w-xl mx-auto leading-relaxed"
              :style="isLoaded ? { animation: 'fadeInUp 0.7s ease-out 0.5s forwards' } : { opacity: 0 }"
            >
              A serene sanctuary where Balinese healing traditions meet contemporary luxury. Breathe in, slow down,
              and let every detail guide you into deep relaxation.
            </p>

            <!-- CTAs -->
            <div
              class="flex flex-col sm:inline-flex sm:flex-row gap-4 justify-center"
              :style="isLoaded ? { animation: 'fadeInUp 0.7s ease-out 0.65s forwards' } : { opacity: 0 }"
            >
              <a
                href="https://wa.me/6282147215031?text=Hi,%20I%20would%20like%20to%20book%20a%20treatment%20at%20Kae%20Luxury%20Spa"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center justify-center gap-3 bg-kae-gold text-kae-green px-10 py-4 rounded-full font-body text-base font-medium transition-all duration-400 hover:bg-kae-gold-light hover:shadow-gold hover:-translate-y-0.5"
              >
                <span>Book Your Experience</span>
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a
                href="#services"
                class="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-kae-gold/40 text-kae-gold px-10 py-4 rounded-full font-body text-base font-medium transition-all duration-400 hover:bg-kae-gold/10 hover:border-kae-gold hover:text-kae-gold-light"
              >
                <span>Explore Services</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </a>
            </div>

            <!-- Trust Badges -->
            <div
              class="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
              :style="isLoaded ? { animation: 'fadeInUp 0.7s ease-out 0.8s forwards' } : { opacity: 0 }"
            >
              <!-- 5-Star Rating -->
              <div class="flex items-center gap-2">
                <div class="flex">
                  <svg class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="font-body text-sm text-kae-beige/80">5-Star Rated</span>
              </div>

              <!-- Divider -->
              <div class="hidden sm:block w-px h-6 bg-kae-gold/30"></div>

              <!-- Expert Therapists -->
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="font-body text-sm text-kae-beige/80">Expert Therapists</span>
              </div>

              <!-- Divider -->
              <div class="hidden sm:block w-px h-6 bg-kae-gold/30"></div>

              <!-- Operating Hours -->
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="font-body text-sm text-kae-beige/80">9AM - 9PM Daily</span>
              </div>
            </div>

            <!-- (Trust indicators intentionally removed for a cleaner hero) -->
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-10 flex justify-center">
          <a
            href="#services"
            class="flex flex-col items-center gap-3 text-kae-beige/70 hover:text-kae-gold transition-colors duration-400"
          >
            <span class="font-body text-xs tracking-[0.25em] uppercase">Scroll</span>
            <div class="w-6 h-10 border-2 border-kae-gold/40 rounded-full flex justify-center pt-2">
              <div class="w-1 h-2 bg-kae-gold/80 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-slow-zoom {
  animation: slowZoom 25s ease-in-out infinite alternate;
}
@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
