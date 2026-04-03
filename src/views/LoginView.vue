<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = null
    await authService.login(email.value, password.value)
    router.push('/admin')
  } catch (err: any) {
    error.value = err.message || 'Failed to login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-kae-teal via-kae-teal to-kae-teal-dark flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,167,125,0.15)_0%,transparent_50%)]" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(196,167,125,0.1)_0%,transparent_50%)]" />

    <div class="relative w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <h1 class="font-heading text-4xl lg:text-5xl text-white mb-2">Kae Luxury Spa</h1>
        <p class="font-body text-kae-gold text-sm tracking-widest uppercase">Admin Portal</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10">
        <div class="text-center mb-8">
          <h2 class="font-heading text-2xl text-kae-teal mb-2">Welcome Back</h2>
          <p class="font-body text-kae-teal/70 text-sm">Sign in to manage your spa</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Error message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-body">
            {{ error }}
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-body font-medium text-kae-teal mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                placeholder="admin@kaespabali.com"
                class="block w-full pl-10 pr-3 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-body font-medium text-kae-teal mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="block w-full pl-10 pr-3 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-body font-medium text-white bg-kae-gold hover:bg-kae-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kae-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
            >
              <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="mt-8 text-center">
          <p class="font-body text-xs text-kae-teal/60">
            Secure admin access for Kae Luxury Spa
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <a
          href="/"
          class="inline-flex items-center gap-2 font-body text-sm text-kae-gold-light hover:text-kae-gold transition-colors duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white\/95 {
  animation: fadeIn 0.5s ease-out;
}
</style>
