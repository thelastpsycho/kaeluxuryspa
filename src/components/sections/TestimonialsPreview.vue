<script setup lang="ts">
import { ref, onMounted } from 'vue'

const testimonials = ref([
  { id: '1', name: 'Sarah J.', comment: 'The massage was absolutely amazing! The therapist was very professional and the ambiance was perfect. I left feeling completely rejuvenated.', rating: 5 },
  { id: '2', name: 'Michael C.', comment: 'Best spa experience I\'ve ever had. The facial left my skin glowing. The staff was incredibly attentive.', rating: 5 },
  { id: '3', name: 'Emily R.', comment: 'The warm oil massage was divine! The facilities were immaculate. Will definitely be coming back.', rating: 5 },
  { id: '4', name: 'David W.', comment: 'Hot stone massage found all my tension points. Highly recommend for anyone seeking deep relaxation!', rating: 5 },
])

const currentIndex = ref(0)
const isTransitioning = ref(false)

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  setTimeout(() => { isTransitioning.value = false }, 500)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  setTimeout(() => { isTransitioning.value = false }, 500)
}

onMounted(() => {
  setInterval(() => { if (!isTransitioning.value) nextSlide() }, 7000)
})
</script>

<template>
  <section id="testimonials" class="section-padding bg-kae-green overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-20">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Reviews</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-white mb-6">
          What Our Guests Say
        </h2>
      </header>

      <div class="relative max-w-3xl mx-auto">
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-kae-gold/30 flex items-center justify-center text-kae-gold hover:bg-kae-gold/20 transition-all duration-300"
          :disabled="isTransitioning"
          aria-label="Previous testimonial"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-kae-gold/30 flex items-center justify-center text-kae-gold hover:bg-kae-gold/20 transition-all duration-300"
          :disabled="isTransitioning"
          aria-label="Next testimonial"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <div :key="currentIndex" class="bg-white/95 backdrop-blur rounded-3xl p-8 lg:p-12 shadow-luxury-lg">
            <div class="flex gap-1 mb-6">
              <svg v-for="i in testimonials[currentIndex].rating" :key="i" class="w-5 h-5 text-kae-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="font-body text-lg text-kae-green/80 italic mb-8 leading-relaxed">
              "{{ testimonials[currentIndex].comment }}"
            </p>
            <p class="font-heading text-xl text-kae-green">{{ testimonials[currentIndex].name }}</p>
          </div>
        </Transition>

        <div class="flex justify-center mt-8 gap-2">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            @click="currentIndex = i"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="currentIndex === i ? 'w-8 bg-kae-gold' : 'w-4 bg-white/30 hover:bg-white/50'"
            :aria-label="`Go to testimonial ${i + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
