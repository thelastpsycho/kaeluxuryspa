<script setup lang="ts">
import { ref } from 'vue'
import LazyImage from '../LazyImage.vue'

const rituals = ref([
  {
    title: 'Balinese Boreh',
    description: 'A warming herbal body wrap using traditional spices to stimulate circulation and release deep tension. An ancient ritual for muscle recovery.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    duration: '90 min',
    tag: 'Body',
  },
  {
    title: 'Lulur Royal',
    description: 'The classic Javanese treatment combining turmeric scrub, yogurt application, and floral bath. Leaves skin silken and deeply nourished.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop',
    duration: '120 min',
    tag: 'Signature',
  },
  {
    title: 'Hot Stone Flow',
    description: 'Smooth basalt stones heated to therapeutic temperatures glide along energy lines, melting away stress and restoring balance.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    duration: '75 min',
    tag: 'Massage',
  },
])
</script>

<template>
  <section id="rituals" class="section-padding bg-kae-cream overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Experience</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-teal mb-6">
          Signature Rituals
        </h2>
        <p class="font-body text-lg lg:text-xl text-kae-teal/70 max-w-2xl mx-auto leading-relaxed">
          Curated journeys blending tradition with luxury, designed to transport you to complete serenity
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <article
          v-for="(ritual, i) in rituals"
          :key="ritual.title"
          class="group relative bg-white rounded-3xl overflow-hidden shadow-card card-hover-luxury"
          :style="{ animationDelay: `${i * 100}ms` }"
        >
          <figure class="relative aspect-[4/5] overflow-hidden">
            <LazyImage
              :src="ritual.image"
              :alt="ritual.title"
              customClass="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-kae-teal/80 via-kae-teal/20 to-transparent" />
            <span class="absolute top-5 left-5 px-4 py-1.5 bg-kae-gold/90 text-kae-teal text-xs font-body font-medium tracking-wider uppercase rounded-full">
              {{ ritual.tag }}
            </span>
            <span class="absolute top-5 right-5 text-kae-white/90 font-body text-sm">{{ ritual.duration }}</span>
          </figure>
          <div class="p-8 lg:p-10">
            <h3 class="font-heading text-2xl lg:text-3xl text-kae-teal mb-4 group-hover:text-kae-gold transition-colors duration-300">
              {{ ritual.title }}
            </h3>
            <p class="font-body text-kae-teal/70 leading-relaxed mb-6">
              {{ ritual.description }}
            </p>
            <a
              href="https://wa.me/6282147215031"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-kae-gold font-body text-sm font-medium transition-all duration-300 hover:gap-3"
            >
              <span>Inquire & Book</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
