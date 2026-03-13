<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { menuService, type Treatment } from '../../services/menuService'

const treatments = ref<Treatment[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

function getWhatsAppLink(treatment: Treatment, option: Treatment['options'][0]) {
  const phone = '6282147215031'
  const text = `Hello, I would like to book the ${treatment.name} (${option.duration}, ${option.price}).`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

// Add structured data for menu/services
onMounted(async () => {
  try {
    treatments.value = await menuService.getAllTreatments()
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'KAE Spa Bali Services',
      description: 'Luxury spa treatments and massage services in Bali',
      provider: {
        '@type': 'Organization',
        name: 'KAE Spa Bali',
        url: 'https://kaespabali.com'
      },
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: 'Massage Treatments',
          hasMenuItem: treatments.value.map(treatment => ({
            '@type': 'MenuItem',
            name: treatment.name,
            description: treatment.description,
            image: treatment.image, // Add image property
            offers: treatment.options.map(option => ({
              '@type': 'Offer',
              price: option.price.replace('K', '000'),
              priceCurrency: 'IDR',
              availability: 'https://schema.org/InStock',
              validFrom: new Date().toISOString(),
              itemOffered: {
                '@type': 'Service',
                name: `${treatment.name} (${option.duration})`,
                description: treatment.description,
                provider: {
                  '@type': 'Organization',
                  name: 'KAE Spa Bali'
                }
              }
            }))
          }))
        }
      ]
    }

    // Add structured data to the page
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
  } catch (err) {
    error.value = 'Failed to load treatments'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="section-padding bg-white pt-12 mt-8" aria-labelledby="menu-heading">
    <div class="container-custom">
      <header class="text-center mb-8 px-2 md:px-0">
        <h1 id="menu-heading" class="text-2xl md:text-4xl font-heading text-spa-accent-3 mb-2 md:mb-3 tracking-tight">
          Treatments
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-light">
          Discover our curated selection of premium spa experiences
        </p>
      </header>

      <!-- Error message -->
      <div v-if="error" class="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-center text-sm">
        {{ error }}
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-6">
        <div class="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-spa-accent-3 border-r-transparent"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        <article 
          v-for="treatment in treatments" 
          :key="treatment.id" 
          class="bg-white rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border border-gray-100"
        >
          <div>
            <h2 class="text-xl font-heading text-spa-accent-3 mb-2 tracking-tight">{{ treatment.name }}</h2>
            <p class="font-body text-gray-600 mb-4 text-sm leading-relaxed">{{ treatment.description }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="option in treatment.options"
              :key="option.duration"
              :href="getWhatsAppLink(treatment, option)"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white text-spa-accent-3 rounded-2xl px-4 py-2 flex items-center justify-center hover:bg-spa-accent-3 hover:text-white transition-all duration-300 border border-spa-accent-3 cursor-pointer group text-sm"
              :aria-label="`Book ${treatment.name} for ${option.duration} at ${option.price}`"
            >
              <span class="font-medium">{{ option.price }}</span>
              <span class="mx-2 text-spa-accent-3 group-hover:text-white" aria-hidden="true">·</span>
              <span class="text-xs">{{ option.duration }}</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-padding {
  padding: 1.5rem 1rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding: 2rem 1.5rem;
  }
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.75rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 