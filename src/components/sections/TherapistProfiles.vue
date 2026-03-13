<script setup lang="ts">
import LazyImage from '../LazyImage.vue'

const therapists = [
  {
    name: 'Putu',
    role: 'Senior Therapist',
    specialty: 'Traditional Balinese Massage',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop&crop=face',
  },
  {
    name: 'Ketut',
    role: 'Body Specialist',
    specialty: 'Deep Tissue & Hot Stone',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop&crop=face',
  },
  {
    name: 'Wayan',
    role: 'Facial Specialist',
    specialty: 'Holistic Skin Care',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop&crop=face',
  },
]
</script>

<template>
  <section id="therapists" class="section-padding bg-kae-green overflow-hidden">
    <div class="absolute inset-0 opacity-5 therapist-pattern" />

    <div class="container-editorial relative z-10">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Our Team</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-white mb-6">
          Meet Our Therapists
        </h2>
        <p class="font-body text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Certified practitioners trained in ancient and modern techniques for your complete wellbeing
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
        <article
          v-for="therapist in therapists"
          :key="therapist.name"
          class="group text-center"
        >
          <div class="relative mb-6 overflow-hidden rounded-2xl aspect-square max-w-xs mx-auto">
            <LazyImage
              :src="therapist.image"
              :alt="therapist.name"
              customClass="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-kae-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <h3 class="font-heading text-2xl text-white mb-1">{{ therapist.name }}</h3>
          <p class="font-body text-kae-gold text-sm font-medium mb-2">{{ therapist.role }}</p>
          <p class="font-body text-white/70 text-sm">{{ therapist.specialty }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.therapist-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' fill='%23FFB000'/%3E%3C/svg%3E");
  background-size: 60px 60px;
}
</style>
