<script setup lang="ts">
import { ref, onMounted } from 'vue'
import backMessageImg from '@/assets/image/back_message.png'
import bodyMessageImg from '@/assets/image/body_message.png'
import headMassageImg from '@/assets/image/head_massage.png'
import LazyImage from '../LazyImage.vue'

const featuredServices = ref([
  {
    title: 'Back Massage',
    description: 'Relieve tension and soothe sore muscles with our specialized back massage, designed to target stress points and promote relaxation.',
    image: backMessageImg,
    price: 'From 150K',
    duration: '30 minutes'
  },
  {
    title: 'Body Massage',
    description: 'Experience a full-body massage that rejuvenates your entire being, improves circulation, and leaves you feeling refreshed and balanced.',
    image: bodyMessageImg,
    price: 'From 250K',
    duration: '60 minutes'
  },
  {
    title: 'Facial Massage',
    description: 'Rejuvenate your skin and relax facial muscles with our gentle facial massage, promoting a natural glow and reducing signs of stress.',
    image: headMassageImg,
    price: 'From 150K', 
    duration: '30 minutes'
  }
])

// Add structured data for services
onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'KAE Spa',
    description: 'Luxury spa treatments including signature massages, facials, and body scrubs.',
    url: 'https://kaespabali.com',
    image: 'https://kaespabali.com/src/assets/og-image.jpg',
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Your City',
      addressRegion: 'Your Region',
      postalCode: 'Your Postal Code',
      addressCountry: 'Your Country'
    },
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
          provider: {
            '@type': 'Organization',
            name: 'KAE Spa Bali'
          }
        }
      }))
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
  <section class="relative bg-gradient-to-b from-white via-spa-accent-1/30 to-white py-12 md:py-16">
    <div class="container-custom">
      <header class="text-center mb-8 md:mb-10">
        <h2 id="services-heading" class="text-2xl md:text-4xl font-heading text-spa-accent-3 mb-2 font-bold tracking-tight">
          Our Signature Treatments
        </h2>
        <p class="text-sm md:text-base text-gray-600 font-body max-w-2xl mx-auto">
          Experience our premium spa services designed for your ultimate relaxation and wellness
        </p>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <article
          v-for="service in featuredServices"
          :key="service.title"
          class="bg-white/90 shadow-lg rounded-xl flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <figure class="h-48 md:h-52 w-full overflow-hidden">
            <LazyImage
              :src="service.image"
              :alt="`${service.title} at KAE Spa`"
              customClass="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </figure>
          <div class="flex-1 flex flex-col p-5">
            <h3 class="text-xl font-heading text-spa-accent-3 mb-2 font-semibold tracking-tight">
              {{ service.title }}
            </h3>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-spa-accent-3 font-medium text-sm bg-spa-accent-1/60 rounded-lg px-3 py-1">
                {{ service.price }}
              </span>
              <span class="text-gray-400 text-sm">·</span>
              <span class="text-gray-600 text-sm">{{ service.duration }}</span>
            </div>
            <p class="font-body text-gray-600 mb-4 text-sm leading-relaxed flex-1">
              {{ service.description }}
            </p>
            <a
              href="https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block mt-auto bg-white text-spa-accent-3 rounded-2xl px-4 py-2 flex items-center justify-center hover:bg-spa-accent-3 hover:text-white transition-all duration-300 border border-spa-accent-3 cursor-pointer group text-sm"
              :aria-label="`Book ${service.title} at KAE Spa`"
            >
              Learn More
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient-to-b {
  background: linear-gradient(180deg, #fff 0%, #f6f8f3 50%, #fff 100%);
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.75rem;
}
</style> 