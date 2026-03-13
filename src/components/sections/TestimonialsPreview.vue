<script setup lang="ts">
import { ref, onMounted } from 'vue'

const testimonials = ref([
  {
    id: '1',
    name: 'Sarah Johnson',
    comment: 'The massage was absolutely amazing! The therapist was very professional and the ambiance was perfect for relaxation.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '2',
    name: 'Michael Chen',
    comment: 'Best spa experience I\'ve ever had. The facial treatment left my skin glowing and refreshed.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    comment: 'The staff was incredibly welcoming and the facilities were immaculate. Will definitely be coming back!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '4',
    name: 'David Wilson',
    comment: 'The hot stone massage was exactly what I needed after a long week. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
])

const currentIndex = ref(0)
const loading = ref(false)
const isTransitioning = ref(false)

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// Auto-advance carousel
onMounted(() => {
  setInterval(() => {
    if (!isTransitioning.value) {
      nextSlide()
    }
  }, 5000)
})
</script>

<template>
  <section class="section-padding bg-spa-bg relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
    <div class="container-custom relative">
      <h2 class="text-3xl md:text-4xl font-heading text-center text-spa-accent-3 mb-12">
        What Our Guests Say
      </h2>
      
      <div v-if="loading" class="text-center">
        <p class="font-body text-gray-600">Loading testimonials...</p>
      </div>
      
      <div v-else-if="testimonials.length === 0" class="text-center">
        <p class="font-body text-gray-600">No testimonials available yet.</p>
      </div>
      
      <div v-else class="relative">
        <!-- Navigation Arrows -->
        <button 
          @click="prevSlide" 
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 
                 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300
                 hover:scale-110"
          :disabled="isTransitioning"
        >
          <svg class="w-6 h-6 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button 
          @click="nextSlide" 
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10
                 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300
                 hover:scale-110"
          :disabled="isTransitioning"
        >
          <svg class="w-6 h-6 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Carousel -->
        <div class="relative h-[400px] overflow-hidden">
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-500 ease-in"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-full"
          >
            <div 
              :key="currentIndex"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                <div class="flex flex-col items-center mb-6">
                  <div class="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      :src="testimonials[currentIndex].image"
                      :alt="testimonials[currentIndex].name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex space-x-1">
                    <svg v-for="star in testimonials[currentIndex].rating" :key="star" 
                         class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <p class="font-body text-gray-600 text-lg md:text-xl mb-6 text-center italic">
                  "{{ testimonials[currentIndex].comment }}"
                </p>
                <div class="font-heading text-spa-accent-3 text-center text-xl">
                  {{ testimonials[currentIndex].name }}
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="(_, index) in testimonials" 
            :key="index"
            @click="currentIndex = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="[
              currentIndex === index 
                ? 'bg-spa-accent-3 scale-125' 
                : 'bg-gray-300 hover:bg-spa-accent-2'
            ]"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-padding {
  @apply py-16 md:py-24;
}
</style> 