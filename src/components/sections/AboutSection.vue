<script setup lang="ts">
import { onMounted } from 'vue'
import LazyImage from '../LazyImage.vue'
import headMassageImg from '../../assets/image/head_massage.png'
import bodyMessageImg from '../../assets/image/body_message.png'

const philosophy = {
  title: 'Our Philosophy',
  description: 'At Kae Spa, we believe in the transformative power of self-care. Our approach combines ancient wellness traditions with modern techniques to create a truly unique experience.',
  points: [
    'Holistic wellness approach',
    'Natural and organic products',
    'Personalized treatments',
    'Sustainable practices'
  ]
}

const ambiance = {
  title: 'Our Ambiance',
  description: 'Step into a world of tranquility where every detail has been carefully considered to create the perfect environment for relaxation and rejuvenation.',
  features: [
    'Serene treatment rooms',
    'Aromatic essential oils',
    'Soothing music',
    'Comfortable amenities'
  ]
}

// Add structured data for About page
onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About KAE Spa Bali',
    description: philosophy.description,
    mainEntity: {
      '@type': 'Organization',
      name: 'KAE Spa Bali',
      description: 'A luxury spa in Bali offering transformative wellness experiences',
      foundingDate: '2024',
      areaServed: {
        '@type': 'City',
        name: 'Bali'
      },
       contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-361-123456',
        contactType: 'customer service',
        availableLanguage: ['English', 'Indonesian']
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Spa Services',
        description: 'Luxury spa treatments and wellness services'
      },
      foundingPrinciples: philosophy.points,
      amenities: ambiance.features
    }
  }

  // Add structured data to the page
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
})
</script>

<template>
  <section class="section-padding bg-white" aria-labelledby="about-heading">
    <div class="container-custom">
      <header class="text-center mb-16">
        <h1 id="about-heading" class="text-4xl md:text-5xl font-heading text-spa-accent-3 mb-4">
          About KAE Spa Bali
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover our commitment to wellness and the serene environment we've created for your relaxation
        </p>
      </header>

      <!-- Philosophy Section -->
      <article class="mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-heading text-spa-accent-3 mb-6">{{ philosophy.title }}</h2>
            <p class="text-lg font-body text-gray-600 mb-8">{{ philosophy.description }}</p>
            <ul class="space-y-3" role="list">
              <li v-for="point in philosophy.points" :key="point" class="flex items-center">
                <span class="w-2 h-2 bg-spa-accent-3 rounded-full mr-3" aria-hidden="true"></span>
                <span class="font-body text-gray-600">{{ point }}</span>
              </li>
            </ul>
          </div>
          <figure class="h-96 bg-spa-accent-2 rounded-2xl">
            <LazyImage 
              :src="headMassageImg"
              alt="KAE Spa Bali's wellness philosophy in action"
              customClass="w-full h-full object-cover rounded-2xl"
            />
            <figcaption class="sr-only">Our spa philosophy in practice</figcaption>
          </figure>
        </div>
      </article>

      <!-- Ambiance Section -->
      <article>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <figure class="order-2 md:order-1">
            <div class="h-96 bg-spa-accent-1 rounded-2xl">
              <LazyImage 
                :src="bodyMessageImg"
                alt="The serene ambiance of KAE Spa Bali"
                customClass="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <figcaption class="sr-only">Our spa's tranquil environment</figcaption>
          </figure>
          <div class="order-1 md:order-2">
            <h2 class="text-3xl md:text-4xl font-heading text-spa-accent-3 mb-6">{{ ambiance.title }}</h2>
            <p class="text-lg font-body text-gray-600 mb-8">{{ ambiance.description }}</p>
            <ul class="space-y-3" role="list">
              <li v-for="feature in ambiance.features" :key="feature" class="flex items-center">
                <span class="w-2 h-2 bg-spa-accent-3 rounded-full mr-3" aria-hidden="true"></span>
                <span class="font-body text-gray-600">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
</template> 