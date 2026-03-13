<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import MaintenancePage from './components/MaintenancePage.vue'
import SplashScreen from './components/SplashScreen.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ToastManager from './components/ToastManager.vue'
import { ref, onMounted, provide } from 'vue'

const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true'
const maintenanceMessage = import.meta.env.VITE_MAINTENANCE_MESSAGE
const maintenanceEstimatedTime = import.meta.env.VITE_MAINTENANCE_ESTIMATED_TIME
const showSplash = ref(true)
const showContent = ref(false)
const toastManager = ref<InstanceType<typeof ToastManager> | null>(null)

const handleSplashDone = () => {
  showSplash.value = false
  document.body.style.overflow = 'auto' // Re-enable scrolling
  setTimeout(() => {
    showContent.value = true
  }, 500) // Small delay to ensure smooth transition
}

// Provide toast functionality to all components
provide('toast', {
  success: (message: string, duration?: number) => toastManager.value?.addToast(message, 'success', duration),
  error: (message: string, duration?: number) => toastManager.value?.addToast(message, 'error', duration),
  warning: (message: string, duration?: number) => toastManager.value?.addToast(message, 'warning', duration),
  info: (message: string, duration?: number) => toastManager.value?.addToast(message, 'info', duration)
})

onMounted(() => {
  // Prevent scrolling during splash screen
  if (showSplash.value) {
    document.body.style.overflow = 'hidden'
  }
})
</script>

<template>
  <ErrorBoundary>
    <div class="min-h-screen flex flex-col">
      <SplashScreen v-if="showSplash" @done="handleSplashDone" />
      <div v-if="showContent" class="animate-fade-in-content">
        <template v-if="isMaintenanceMode">
          <MaintenancePage 
            :message="maintenanceMessage"
            :estimated-time="maintenanceEstimatedTime"
          />
        </template>
        <template v-else>
          <Navigation />
          <main class="flex-grow">
            <router-view />
          </main>
          <Footer />
          <WhatsAppButton />
        </template>
      </div>
      <ToastManager ref="toastManager" />
    </div>
  </ErrorBoundary>
</template>

<style scoped>
.animate-fade-in-content {
  animation: fadeInContent 0.5s ease-out;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
