<script setup lang="ts">
const packages = [
  {
    name: 'Morning Refresh',
    description: 'Start your day with a signature massage and herbal tea. Perfect for early risers seeking gentle awakening.',
    duration: '2 hours',
    includes: ['Signature Massage', 'Herbal Tea', 'Light Snack'],
    price: 'From 400K',
    featured: true,
  },
  {
    name: 'Ultimate Sanctuary',
    description: 'Our most comprehensive experience: full-body massage, facial, and body scrub in a private suite.',
    duration: '4 hours',
    includes: ['Body Scrub', 'Signature Massage', 'Facial Treatment', 'Lunch', 'Private Suite'],
    price: 'From 1.2M',
    featured: true,
  },
  {
    name: 'Couples Escape',
    description: 'Share the journey with your loved one. Side-by-side treatments in our intimate couples room.',
    duration: '3 hours',
    includes: ['Dual Massage', 'Aromatherapy', 'Champagne', 'Shared Suite'],
    price: 'From 900K',
    featured: false,
  },
]
</script>

<template>
  <section id="packages" class="section-padding bg-white overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Curated</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-green mb-6">
          Wellness Packages
        </h2>
        <p class="font-body text-lg lg:text-xl text-kae-green/70 max-w-2xl mx-auto leading-relaxed">
          Complete experiences designed for lasting tranquility and deep renewal
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="pkg in packages"
          :key="pkg.name"
          class="group relative bg-kae-beige/50 rounded-3xl p-8 lg:p-10 border border-kae-green/5 transition-all duration-500 hover:shadow-card-hover hover:border-kae-gold/20 hover:-translate-y-1"
        >
          <div v-if="pkg.featured" class="absolute top-6 right-6">
            <span class="px-3 py-1 bg-kae-gold/20 text-kae-gold text-xs font-body font-medium tracking-wider rounded-full">Popular</span>
          </div>
          <h3 class="font-heading text-2xl text-kae-green mb-3 group-hover:text-kae-gold transition-colors">
            {{ pkg.name }}
          </h3>
          <p class="font-body text-kae-green/70 text-sm mb-6 leading-relaxed">
            {{ pkg.description }}
          </p>
          <ul class="space-y-2 mb-8">
            <li v-for="item in pkg.includes" :key="item" class="flex items-center gap-2 text-kae-green/80 text-sm">
              <svg class="w-4 h-4 text-kae-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ item }}
            </li>
          </ul>
          <div class="flex items-end justify-between">
            <span class="font-heading text-xl text-kae-gold">{{ pkg.price }}</span>
            <a
              href="https://wa.me/6282147215031"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-2.5 bg-kae-green text-kae-gold rounded-full text-sm font-body font-medium transition-all duration-300 hover:bg-kae-green-dark hover:-translate-y-0.5"
            >
              Book
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
