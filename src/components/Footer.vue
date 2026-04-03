<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', url: 'https://instagram.com/kaespabali' },
  { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', url: 'https://facebook.com/kaespabali' },
  { name: 'TikTok', icon: 'M12.5.5C13.5.5 14.5.5 15.5.5c.2 3.5 1.5 5 5 5v3.5c-1.7.1-3.3.7-4.5 1.7V17c0 4-2.6 7-6.5 7-3.5 0-6.5-2.8-6.5-6.5V6h3.5v8.5c0 1.7 1.3 3 3 3s3-1.5 3-3.5c0-2-1-4-3-5.5V.5h3z', url: 'https://tiktok.com/@kaespabali' },
]

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Menu', href: '#menu' },
  { name: 'Rituals', href: '#rituals' },
  { name: 'Contact', href: '#contact' },
]

const contact = {
  email: 'info@kaespabali.com',
  phone: '+62 821 4721 5031',
  whatsapp: '6282147215031',
  address: 'Jalan Raya Seminyak, Kuta, Badung, Bali',
  hours: '9:00 AM – 9:00 PM Daily',
}
</script>

<template>
  <footer class="relative bg-kae-teal-dark pt-20 pb-10 overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kae-gold/50 to-transparent" />

    <div class="container-editorial relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
        <div>
          <h3 class="font-heading text-2xl text-white mb-2">KAE Spa</h3>
          <p class="font-script text-xl text-kae-gold mb-5">Bali</p>
          <p class="font-body text-sm text-kae-white/70 leading-relaxed mb-6">
            Ancient Balinese healing meets modern luxury in our serene sanctuary.
          </p>
          <div class="flex gap-3">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full border border-kae-gold/30 flex items-center justify-center text-kae-white/60 hover:text-kae-gold hover:border-kae-gold transition-all duration-300"
              :aria-label="`Follow on ${s.name}`"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path :d="s.icon"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-heading text-lg text-white mb-6">Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="l in quickLinks" :key="l.name">
              <a :href="l.href" class="font-body text-sm text-kae-white/70 hover:text-kae-gold transition-colors">
                {{ l.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading text-lg text-white mb-6">Contact</h4>
          <ul class="space-y-4">
            <li class="font-body text-sm text-kae-white/70">{{ contact.address }}</li>
            <li><a :href="`tel:${contact.phone}`" class="text-kae-white/70 hover:text-kae-gold transition-colors">{{ contact.phone }}</a></li>
            <li><a :href="`mailto:${contact.email}`" class="text-kae-white/70 hover:text-kae-gold transition-colors">{{ contact.email }}</a></li>
            <li class="text-kae-white/70">{{ contact.hours }}</li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading text-lg text-white mb-6">Book Your Visit</h4>
          <p class="font-body text-sm text-kae-white/70 mb-6">Ready for ultimate relaxation?</p>
          <div class="space-y-3">
            <a
              :href="`https://wa.me/${contact.whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-kae-gold text-kae-green py-3.5 rounded-full font-body text-sm font-medium hover:bg-kae-gold-light transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full border border-kae-gold/40 text-kae-gold py-3.5 rounded-full font-body text-sm font-medium hover:bg-kae-gold/10 transition-all duration-300"
            >
              Book Online
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-kae-green/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-body text-sm text-kae-beige/50">&copy; {{ currentYear }} KAE Spa Bali. All rights reserved.</p>
        <router-link to="/privacy-policy" class="font-body text-sm text-kae-beige/50 hover:text-kae-gold transition-colors">
          Privacy Policy
        </router-link>
      </div>
    </div>
  </footer>
</template>
