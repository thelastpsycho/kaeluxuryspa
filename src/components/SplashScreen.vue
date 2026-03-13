<script setup lang="ts">
import { onMounted, ref } from 'vue'
import kaeLogo from '../assets/kae_logo_black.svg'

const emit = defineEmits(['done'])
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += 2 // Increase increment for faster progress
    if (progress.value >= 100) {
      clearInterval(interval)
      emit('done')
    }
  }, 15) // 15ms * 50 = 1500ms (1.5 seconds)
})
</script>

<template>
  <div class="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center animate-fade-in">
    <img :src="kaeLogo" alt="KAE Spa" class="h-32 md:h-40 mb-8 animate-pulse-slow" />
    <div class="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div 
        class="h-full bg-spa-accent-3 transition-all duration-150 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-pulse-slow {
  animation: pulse 1.5s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: glow 1.5s ease-in-out infinite;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 146, 69, 0.4);
  }
  50% {
    box-shadow: 0 0 15px 5px rgba(0, 146, 69, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 146, 69, 0.4);
  }
}
</style> 