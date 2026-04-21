<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { menuService, type Treatment } from '../../services/menuService'

const treatments = ref<Treatment[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

function getWhatsAppLink(treatment: Treatment, option: Treatment['options'][0]) {
  const phone = '6285119315618'
  const text = `Hello, I would like to book the ${treatment.name} (${option.duration}, ${option.price}).`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

onMounted(async () => {
  console.log('[MenuSection] Component mounted, starting to load treatments...')
  console.log('[MenuSection] Firebase DB initialized:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID)

  try {
    console.log('[MenuSection] Calling menuService.getAllTreatments()...')
    treatments.value = await menuService.getAllTreatments()
    console.log('[MenuSection] Successfully loaded treatments:', treatments.value.length)

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'KAE Spa Bali Services',
      provider: { '@type': 'Organization', name: 'KAE Spa Bali', url: 'https://kaespabali.com' },
      hasMenuSection: [{
        '@type': 'MenuSection',
        name: 'Treatments',
        hasMenuItem: treatments.value.map(t => ({
          '@type': 'MenuItem',
          name: t.name,
          description: t.description,
          offers: t.options.map(o => ({ '@type': 'Offer', price: o.price.replace('K', '000'), priceCurrency: 'IDR' })),
        })),
      }],
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
    console.log('[MenuSection] Structured data added')
  } catch (err: any) {
    console.error('[MenuSection] Error loading treatments:', err)
    console.error('[MenuSection] Error details:', JSON.stringify(err, null, 2))

    if (err.code === 'failed-precondition' || err.code === 'unimplemented') {
      error.value = 'Browser storage is disabled. Please enable cookies/local storage in your browser settings to view the menu.'
    } else if (err.code === 'unavailable') {
      error.value = 'Service temporarily unavailable. Please check your internet connection and try again.'
    } else if (err.code === 'permission-denied') {
      error.value = 'Access denied. Please check your browser settings and try again.'
    } else {
      error.value = `Failed to load treatments: ${err.message || 'Unknown error'}`
    }
  } finally {
    loading.value = false
    console.log('[MenuSection] Loading complete. Loading state:', loading.value, 'Error state:', error.value, 'Treatments count:', treatments.value.length)
  }
})
</script>

<template>
  <section id="menu" class="section-padding bg-white overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Full Menu</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-teal mb-6">
          Treatments & Pricing
        </h2>
        <p class="font-body text-lg lg:text-xl text-kae-teal/70 max-w-2xl mx-auto leading-relaxed">
          Discover our curated selection of premium spa experiences
        </p>
      </header>

      <div v-if="error" class="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 text-center font-body">
        {{ error }}
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-12 h-12 border-2 border-kae-gold/30 border-t-kae-gold rounded-full animate-spin" />
        <p class="ml-4 text-kae-teal/70 font-body">Loading treatments...</p>
      </div>

      <div v-else-if="treatments.length === 0" class="text-center py-20">
        <p class="text-kae-teal/70 font-body text-lg">No treatments available. Please check back later.</p>
        <p class="text-kae-teal/50 font-body text-sm mt-2">Debug: Treatments array is empty</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="treatment in treatments"
          :key="treatment.id"
          class="group bg-kae-cream/40 rounded-3xl p-8 border border-kae-teal/5 transition-all duration-500 hover:shadow-card-hover hover:border-kae-gold/20 hover:-translate-y-1"
        >
          <span
            v-if="treatment.category"
            class="inline-block px-3 py-1 mb-4 text-xs font-body font-medium tracking-wider uppercase rounded-full bg-kae-teal/5 text-kae-teal"
          >
            {{ treatment.category }}
          </span>
          <h3 class="font-heading text-xl lg:text-2xl text-kae-teal mb-3 group-hover:text-kae-gold transition-colors duration-300">
            {{ treatment.name }}
          </h3>
          <p class="font-body text-kae-teal/70 text-sm mb-6 leading-relaxed">
            {{ treatment.description }}
          </p>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="option in treatment.options"
              :key="option.duration"
              :href="getWhatsAppLink(treatment, option)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-kae-teal/10 text-kae-teal text-sm font-body font-medium transition-all duration-300 hover:bg-kae-gold hover:text-kae-teal hover:border-kae-gold"
              :aria-label="`Book ${treatment.name} - ${option.duration} at ${option.price}`"
            >
              {{ option.price }} · {{ option.duration }}
            </a>
          </div>
        </article>
      </div>

      <div class="mt-16 text-center">
        <a
          href="https://www.fresha.com/id/a/kae-spa-luxury-bali-jalan-padang-linjong-kabupaten-badung-bali-indonesia-xndowqpp?pId=2564564"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 bg-kae-green text-kae-gold px-10 py-4 rounded-full font-body font-medium transition-all duration-400 hover:bg-kae-green-dark hover:-translate-y-0.5"
        >
          <span>View Full Menu & Book</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
