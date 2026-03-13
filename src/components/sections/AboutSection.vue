<script setup lang="ts">
import { onMounted } from 'vue'
import LazyImage from '../LazyImage.vue'
import headMassageImg from '../../assets/image/head_massage.png'
import bodyMessageImg from '../../assets/image/body_message.png'

const philosophy = {
  title: 'Our Philosophy',
  description: 'At KAE Spa, we believe in the transformative power of self-care. Our approach combines ancient Balinese wellness traditions with modern techniques to create a truly unique experience.',
  points: [
    { title: 'Holistic Wellness', desc: 'Balancing mind, body, and spirit through integrated treatments' },
    { title: 'Natural Products', desc: 'Premium organic oils and locally-sourced ingredients' },
    { title: 'Personalized Care', desc: 'Each treatment tailored to your unique needs' },
    { title: 'Sustainable Practice', desc: 'Eco-conscious approach respecting nature and tradition' },
  ],
}

const ambiance = {
  title: 'Our Sanctuary',
  description: 'Step into a world of tranquility where every detail has been carefully considered for your relaxation and rejuvenation.',
  features: [
    { title: 'Private Treatment Rooms', desc: 'Intimate spaces designed for deep relaxation' },
    { title: 'Aromatherapy', desc: 'Curated essential oils for sensory experience' },
    { title: 'Soothing Soundscapes', desc: 'Gentle traditional Balinese melodies' },
    { title: 'Luxury Amenities', desc: 'Premium linens, herbal teas, and more' },
  ],
}

onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About KAE Spa Bali',
    mainEntity: {
      '@type': 'Organization',
      name: 'KAE Spa Bali',
      description: 'A luxury spa in Bali offering transformative wellness experiences',
    },
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
})
</script>

<template>
  <section id="about" class="section-padding bg-kae-beige overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Our Story</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-green mb-6">
          About KAE Spa
        </h2>
        <p class="font-body text-lg lg:text-xl text-kae-green/70 max-w-2xl mx-auto leading-relaxed">
          Discover our commitment to wellness and the sanctuary we've created for you
        </p>
      </header>

      <!-- Philosophy -->
      <article class="mb-24 lg:mb-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div class="relative order-2 lg:order-1">
            <figure class="relative rounded-3xl overflow-hidden shadow-luxury-soft">
              <LazyImage
                :src="headMassageImg"
                alt="KAE Spa wellness"
                customClass="w-full h-[360px] lg:h-[480px] object-cover"
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-kae-green/80 to-transparent p-6">
                <p class="font-script text-xl text-white">Ancient Wisdom, Modern Luxury</p>
              </div>
            </figure>
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="font-heading text-3xl lg:text-4xl text-kae-green mb-6">
              {{ philosophy.title }}
            </h3>
            <p class="font-body text-kae-green/70 mb-10 leading-relaxed">
              {{ philosophy.description }}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="point in philosophy.points"
                :key="point.title"
                class="p-5 rounded-2xl bg-white/80 border border-kae-green/5 transition-all duration-300 hover:shadow-card hover:border-kae-gold/20"
              >
                <h4 class="font-heading text-lg text-kae-green mb-1">{{ point.title }}</h4>
                <p class="font-body text-sm text-kae-green/60">{{ point.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Ambiance -->
      <article>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h3 class="font-heading text-3xl lg:text-4xl text-kae-green mb-6">
              {{ ambiance.title }}
            </h3>
            <p class="font-body text-kae-green/70 mb-10 leading-relaxed">
              {{ ambiance.description }}
            </p>
            <div class="space-y-4">
              <div
                v-for="feature in ambiance.features"
                :key="feature.title"
                class="flex items-start gap-4 p-5 rounded-2xl bg-white/80 border border-kae-green/5 transition-all duration-300 hover:shadow-card hover:border-kae-gold/20"
              >
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-kae-gold/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-heading text-lg text-kae-green mb-0.5">{{ feature.title }}</h4>
                  <p class="font-body text-sm text-kae-green/60">{{ feature.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <figure class="relative rounded-3xl overflow-hidden shadow-luxury-soft">
            <LazyImage
              :src="bodyMessageImg"
              alt="KAE Spa sanctuary"
              customClass="w-full h-[360px] lg:h-[480px] object-cover"
            />
            <div class="absolute top-0 right-0 bg-kae-gold text-kae-green px-5 py-2.5 rounded-bl-2xl">
              <p class="font-body text-sm font-medium">Est. 2024</p>
            </div>
          </figure>
        </div>
      </article>
    </div>
  </section>
</template>
