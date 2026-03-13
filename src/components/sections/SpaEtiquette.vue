<script setup lang="ts">
const guidelines = [
  { title: 'Arrival Time', description: 'Arrive 15 minutes before your appointment to register and enjoy a welcome drink.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', important: false },
  { title: 'Health Matters', description: 'Inform us of any health concerns or injuries. For pregnancy, we advise only our Bali Traditional Massage.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', important: false },
  { title: 'Valuables & Jewelry', description: 'Please remove jewelry. We provide secure storage for your belongings.', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z', important: true },
  { title: 'Spa Attire', description: 'Disposable underwear is provided. Your privacy is always respected.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', important: false },
  { title: 'Gratuities', description: 'Service charge is not included. Gratuities are appreciated for exceptional service.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', important: false },
]
</script>

<template>
  <section id="spa-etiquette" class="section-padding bg-kae-beige overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Before Your Visit</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-green mb-6">
          Spa Etiquette
        </h2>
        <p class="font-body text-lg text-kae-green/70 max-w-xl mx-auto">
          Guidelines for a perfect spa experience
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <article
          v-for="(g, i) in guidelines"
          :key="g.title"
          class="group relative bg-white rounded-3xl p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 border border-kae-green/5"
          :class="i === guidelines.length - 1 ? 'md:col-span-2' : ''"
        >
          <div v-if="g.important" class="absolute -top-2 -right-2 px-3 py-1 bg-kae-gold text-kae-green rounded-full text-xs font-body font-medium">
            Important
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-kae-gold/10 flex items-center justify-center group-hover:bg-kae-gold/20 transition-colors">
              <svg class="w-7 h-7 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="g.icon"/>
              </svg>
            </div>
            <div>
              <h3 class="font-heading text-xl text-kae-green mb-2 group-hover:text-kae-gold transition-colors">{{ g.title }}</h3>
              <p class="font-body text-kae-green/70 text-sm leading-relaxed">{{ g.description }}</p>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-3 px-8 py-4 bg-white/80 rounded-full border border-kae-green/10">
          <svg class="w-5 h-5 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="font-body text-kae-green text-sm">
            <span class="font-medium">Questions?</span> Feel free to contact us before your visit
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
