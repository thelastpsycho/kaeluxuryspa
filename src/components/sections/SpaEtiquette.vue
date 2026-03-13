<script setup lang="ts">
// No props or data needed for now
</script>

<template>
  <section id="spa-etiquette" class="py-16 bg-spa-accent-1">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading text-spa-accent-3 mb-4">Spa Etiquette</h2>
          <p class="text-lg text-gray-600 font-body">Guidelines for a perfect spa experience</p>
        </div>

        <!-- Content Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Service -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-spa-accent-3/10 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading text-spa-accent-3">Service</h3>
            </div>
            <p class="text-gray-600 text-sm">
              The massage fee does not include a service charge; if you feel that the therapy was exceptional, gratuities are appreciated.
            </p>
          </div>

          <!-- Valuables -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-spa-accent-3/10 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading text-spa-accent-3">Valuables</h3>
            </div>
            <p class="text-gray-600 text-sm">
              <strong>Please remove all jewelry to avoid the risk of damage.</strong> We provide a secure wardrobe to store your clothing and valuables.
            </p>
          </div>

          <!-- Arrival -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-spa-accent-3/10 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading text-spa-accent-3">Arrival</h3>
            </div>
            <p class="text-gray-600 text-sm">
              We recommend that you arrive approximately 15 minutes before your appointment time to register for the massage, and enjoy your welcome drink.
            </p>
          </div>

          <!-- Health Matters -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-spa-accent-3/10 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading text-spa-accent-3">Health Matters</h3>
            </div>
            <p class="text-gray-600 text-sm">
              Please let us know if you have any health concerns or injuries so that we can avoid these areas during the massage. For pregnancy, we advise only taking our Bali Traditional Massage.
            </p>
          </div>

          <!-- Spa Attire and Privacy -->
          <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-spa-accent-3/10 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading text-spa-accent-3">Spa Attire and Privacy</h3>
            </div>
            <p class="text-gray-600 text-sm">
              For the massage, you may use the provided disposable underwear, or if you prefer, you may wear your own undergarments. At all times, the therapist will do their best to maintain your personal privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any specific styles here */
</style> 