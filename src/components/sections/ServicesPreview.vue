<script setup lang="ts">
import { ref, onMounted } from 'vue'
import backMessageImg from '@/assets/image/back_message.png'
import bodyMessageImg from '@/assets/image/body_message.png'
import headMassageImg from '@/assets/image/head_massage.png'
import LazyImage from '../LazyImage.vue'

const featuredServices = ref([
  {
    title: 'Back Massage',
    description: 'Relieve tension and soothe sore muscles with our specialized back massage.',
    image: backMessageImg,
    price: 'From 150K',
    duration: '30 min',
  },
  {
    title: 'Body Massage',
    description: 'A full-body journey that rejuvenates, improves circulation, and restores balance.',
    image: bodyMessageImg,
    price: 'From 250K',
    duration: '60 min',
  },
  {
    title: 'Facial Massage',
    description: 'Gentle facial massage promoting a natural glow and reducing signs of stress.',
    image: headMassageImg,
    price: 'From 150K',
    duration: '30 min',
  },
])

onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'KAE Spa',
    description: 'Luxury spa treatments including signature massages, facials, and body scrubs.',
    url: 'https://kaespabali.com',
    image: 'https://kaespabali.com/src/assets/og-image.jpg',
    priceRange: '$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Spa Services',
      itemListElement: featuredServices.value.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          price: service.price,
          duration: service.duration,
        },
      })),
    },
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
})
</script>

<template>
  <section id="services" class="section-padding bg-kae-cream overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Treatments</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-teal mb-6">
          Services
        </h2>
        <p class="font-body text-lg lg:text-xl text-kae-teal/70 max-w-2xl mx-auto leading-relaxed">
          Premium experiences crafted for your ultimate relaxation and wellness
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        <article
          v-for="service in featuredServices"
          :key="service.title"
          class="group bg-white rounded-3xl overflow-hidden shadow-card card-hover-luxury"
        >
          <figure class="relative aspect-[4/3] overflow-hidden">
            <LazyImage
              :src="service.image"
              :alt="`${service.title} at KAE Spa`"
              customClass="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-kae-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </figure>
          <div class="p-8">
            <h3 class="font-heading text-2xl text-kae-teal mb-3 group-hover:text-kae-gold transition-colors duration-300">
              {{ service.title }}
            </h3>
            <p class="font-body text-kae-teal/70 text-sm mb-5 leading-relaxed">
              {{ service.description }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-kae-gold font-body text-sm font-medium">{{ service.price }} · {{ service.duration }}</span>
              <a
                href="https://www.fresha.com/id/a/kae-spa-luxury-bali-jalan-padang-linjong-kabupaten-badung-bali-indonesia-xndowqpp?pId=2564564"
                target="_blank"
                rel="noopener noreferrer"
                class="text-kae-teal font-body text-sm font-medium hover:text-kae-gold transition-colors inline-flex items-center gap-1"
              >
                Book
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
