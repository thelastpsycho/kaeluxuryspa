<script setup lang="ts">
import { ref, onMounted } from 'vue'

const contactForm = ref({ name: '', email: '', subject: '', message: '' })
const success = ref(false)
const error = ref('')

const handleContactSubmit = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.subject || !contactForm.value.message) {
    error.value = 'Please fill in all required fields'
    return
  }
  const msg = `*Contact*\nName: ${contactForm.value.name}\nEmail: ${contactForm.value.email}\nSubject: ${contactForm.value.subject}\n\n${contactForm.value.message}`
  window.open(`https://wa.me/6282147215031?text=${encodeURIComponent(msg)}`, '_blank')
  success.value = true
  contactForm.value = { name: '', email: '', subject: '', message: '' }
  error.value = ''
}

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact KAE Spa Bali',
    mainEntity: {
      '@type': 'Organization',
      name: 'KAE Spa Bali',
      address: { '@type': 'PostalAddress', addressLocality: 'Kuta', addressRegion: 'Bali', addressCountry: 'ID' },
      telephone: '+62 821 4721 5031',
      email: 'info@kaespabali.com',
    },
  })
  document.head.appendChild(script)
})
</script>

<template>
  <section id="contact" class="section-padding bg-white overflow-hidden">
    <div class="container-editorial">
      <header class="text-center mb-16 lg:mb-24">
        <span class="inline-block font-script text-2xl lg:text-3xl text-kae-gold mb-4 tracking-wide">Get in Touch</span>
        <h2 class="font-heading text-4xl lg:text-5xl xl:text-6xl text-kae-teal mb-6">
          Contact Us
        </h2>
        <p class="font-body text-lg text-kae-teal/70 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out for bookings or inquiries.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div class="space-y-6">
          <div class="bg-kae-cream/50 rounded-3xl p-8 border border-kae-teal/5">
            <h3 class="font-heading text-2xl text-kae-teal mb-8">Contact Information</h3>
            <div class="space-y-5">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-kae-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-heading text-lg text-kae-teal mb-0.5">Address</h4>
                  <p class="font-body text-sm text-kae-teal/70">Jalan Raya Seminyak, Kuta, Badung, Bali, Indonesia</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-kae-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <a href="tel:+6282147215031" class="font-body text-sm text-kae-teal/70 hover:text-kae-gold transition-colors">+62 821 4721 5031</a>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-kae-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-kae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a href="mailto:info@kaespabali.com" class="font-body text-sm text-kae-teal/70 hover:text-kae-gold transition-colors">info@kaespabali.com</a>
              </div>
            </div>
            <div class="mt-8 p-5 rounded-2xl bg-white border border-kae-teal/5">
              <h4 class="font-heading text-lg text-kae-teal mb-2">Opening Hours</h4>
              <p class="font-body text-sm text-kae-teal/70">Everyday: 9:00 AM – 9:00 PM</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <a
              href="https://wa.me/6282147215031"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-3 bg-kae-gold text-kae-teal py-4 px-5 rounded-2xl font-body font-medium transition-all duration-400 hover:bg-kae-gold-light hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-3 bg-kae-green text-kae-gold py-4 px-5 rounded-2xl font-body font-medium transition-all duration-400 hover:bg-kae-green-dark hover:-translate-y-0.5"
            >
              <span>Book Now</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="bg-kae-cream/50 rounded-3xl p-8 border border-kae-teal/5">
          <h3 class="font-heading text-2xl text-kae-teal mb-6">Send a Message</h3>
          <div v-if="success" class="mb-6 p-4 bg-kae-green/10 border border-kae-green/20 text-kae-teal rounded-2xl text-sm">
            Message sent! We'll respond via WhatsApp.
          </div>
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm">{{ error }}</div>
          <form @submit.prevent="handleContactSubmit" class="space-y-5">
            <div>
              <label class="block font-body text-sm text-kae-teal mb-1.5" for="name">Name *</label>
              <input
                id="name"
                v-model="contactForm.name"
                type="text"
                class="w-full px-5 py-3.5 rounded-2xl border border-kae-green/15 focus:border-kae-gold focus:ring-2 focus:ring-kae-gold/20 font-body bg-white transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label class="block font-body text-sm text-kae-teal mb-1.5" for="email">Email *</label>
              <input
                id="email"
                v-model="contactForm.email"
                type="email"
                class="w-full px-5 py-3.5 rounded-2xl border border-kae-green/15 focus:border-kae-gold focus:ring-2 focus:ring-kae-gold/20 font-body bg-white transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label class="block font-body text-sm text-kae-teal mb-1.5" for="subject">Subject *</label>
              <input
                id="subject"
                v-model="contactForm.subject"
                type="text"
                class="w-full px-5 py-3.5 rounded-2xl border border-kae-green/15 focus:border-kae-gold focus:ring-2 focus:ring-kae-gold/20 font-body bg-white transition-all"
                placeholder="How can we help?"
                required
              />
            </div>
            <div>
              <label class="block font-body text-sm text-kae-teal mb-1.5" for="message">Message *</label>
              <textarea
                id="message"
                v-model="contactForm.message"
                rows="4"
                class="w-full px-5 py-3.5 rounded-2xl border border-kae-green/15 focus:border-kae-gold focus:ring-2 focus:ring-kae-gold/20 font-body bg-white resize-none transition-all"
                placeholder="Tell us more..."
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-kae-green text-kae-gold py-4 rounded-2xl font-body font-medium transition-all duration-400 hover:bg-kae-green-dark flex items-center justify-center gap-2"
            >
              <span>Send via WhatsApp</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div class="mt-12 rounded-3xl overflow-hidden border border-kae-teal/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4093.446245731566!2d115.1423641!3d-8.643877499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239fffab5692d%3A0x4540548ca3b3185c!2sKae%20Spa%20Bali!5e1!3m2!1sen!2sid!4v1749203089148!5m2!1sen!2sid"
          width="100%"
          height="360"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="rounded-2xl"
        />
      </div>
    </div>
  </section>
</template>
