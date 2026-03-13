<script setup lang="ts">
import { trackWhatsAppClick } from '../utils/analytics'

const handleClick = () => {
  trackWhatsAppClick()
}
</script>

<template>
  <a
    href="https://wa.me/6282147215031"
    target="_blank"
    rel="noopener noreferrer"
    @click="handleClick"
    class="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 group"
    aria-label="Chat on WhatsApp"
  >
    <div class="relative">
      <div class="absolute inset-0 bg-kae-gold rounded-full animate-ping opacity-25" />
      <div class="relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-kae-gold text-kae-green rounded-full shadow-gold transition-all duration-400 hover:scale-110 hover:bg-kae-gold-light">
        <svg class="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
        </svg>
      </div>
      <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-kae-green text-kae-gold rounded-xl font-body text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-luxury-soft">
        Chat with us
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-kae-green rotate-45" />
      </div>
    </div>
  </a>
</template>
