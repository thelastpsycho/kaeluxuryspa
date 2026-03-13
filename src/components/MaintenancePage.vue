<script setup lang="ts">
import kaeLogo from '../assets/kae_logo_gold.svg'

interface Props {
  message?: string
  estimatedTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'We are currently performing scheduled maintenance to improve our services. We will be back shortly. Thank you for your patience.',
  estimatedTime: '2 hours'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-spa-accent-1">
    <div class="container-custom text-center">
      <div class="max-w-2xl mx-auto">
        <!-- Logo -->
        <div class="mb-8">
          <img :src="kaeLogo" alt="Kae Spa" class="h-24 md:h-32 inline-block">
        </div>

        <!-- Maintenance Message -->
        <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8">
          <h1 class="text-3xl md:text-4xl font-heading text-spa-accent-3 mb-6">
            Under Maintenance
          </h1>
          <p class="text-lg text-gray-600 font-body mb-4">
            {{ props.message }}
          </p>
          <p class="text-sm text-gray-500 font-body">
            Estimated time: {{ props.estimatedTime }}
          </p>
        </div>

        <!-- Contact Information -->
        <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          <h2 class="text-xl font-heading text-spa-accent-3 mb-4">
            Need Immediate Assistance?
          </h2>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+1234567890" 
              class="btn-primary bg-spa-accent-3 hover:bg-spa-accent-2 hover:text-gray-800"
            >
              Call Us
            </a>
            <a 
              href="mailto:info@kaespa.com" 
              class="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply px-6 py-3 rounded-lg font-body font-medium transition-all duration-300;
}

.btn-secondary {
  @apply px-6 py-3 rounded-lg font-body font-medium transition-all duration-300;
}
</style> 