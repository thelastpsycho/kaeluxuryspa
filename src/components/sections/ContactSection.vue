<script setup lang="ts">
import { ref, onMounted } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const success = ref(false)
const error = ref('')

const handleContactSubmit = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.subject || !contactForm.value.message) {
    error.value = 'Please fill in all required fields'
    return
  }

  try {
    // Format the message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${contactForm.value.name}\n*Email:* ${contactForm.value.email}\n*Subject:* ${contactForm.value.subject}\n*Message:* ${contactForm.value.message}`
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // WhatsApp business number (replace with your actual number)
    const phoneNumber = '6282147215031'
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank')
    
    success.value = true
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (err) {
    error.value = 'An error occurred while preparing your message. Please try again.'
    console.error('Error preparing message:', err)
  }
}

// Add structured data for Contact page
onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact KAE Spa Bali',
    description: 'Get in touch with KAE Spa Bali for bookings and inquiries',
    mainEntity: {
      '@type': 'Organization',
      name: 'KAE Spa Bali',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Teratai Promenade Shop P3, Jl Shortcut Teratai, Jl. Pantai Batu Bolong',
        addressLocality: 'Kuta',
        addressRegion: 'Badung',
        addressCountry: 'Bali',
        postalCode: '80361'
      },
      telephone: '+62 821 4721 5031',
      email: 'kaespabali@gmail.com',
      url: 'https://kaespabali.com',
       sameAs: [
        'https://www.facebook.com/kaespabali',
        'https://www.instagram.com/kaespabali'
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '20:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '10:00',
          closes: '18:00'
        }
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-8.643877499999999',
        longitude: '115.1423641'
      }
    }
  }

  // Add structured data to the page
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
})
</script>

<template>
  <section class="section-padding bg-spa-bg relative">
    <div class="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Spa Interior"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    <div class="container-custom relative">
      <h2 class="text-2xl md:text-4xl font-heading text-center text-white mb-8 tracking-tight">
        Contact Us
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Contact Information -->
        <div>
          <div class="bg-white rounded-xl p-5 shadow-lg">
            <h3 class="text-xl font-heading text-spa-accent-3 mb-4 tracking-tight">Get in Touch</h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-spa-accent-1 p-2 rounded-full mr-3">
                  <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-body font-medium text-sm mb-1">Address</h4>
                  <p class="font-body text-sm text-gray-600">Teratai Promenade Shop P3, Jl Shortcut Teratai, Jl. Pantai Batu Bolong, Kuta, Badung, Bali</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-spa-accent-1 p-2 rounded-full mr-3">
                  <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-body font-medium text-sm mb-1">Phone</h4>
                  <p class="font-body text-sm text-gray-600">+62 821 4721 5031</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-spa-accent-1 p-2 rounded-full mr-3">
                  <svg class="w-5 h-5 text-spa-accent-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-body font-medium text-sm mb-1">Email</h4>
                  <p class="font-body text-sm text-gray-600">kaespabali@gmail.com</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="font-body font-medium text-sm mb-3">Business Hours</h3>
              <div class="space-y-1 font-body text-sm text-gray-600">
                <!-- <p>Monday - Friday: 9:00 AM - 8:00 PM</p> -->
                <!-- <p>Saturday: 10:00 AM - 6:00 PM</p> -->
                <p>Everyday: 9:00 AM - 23:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <div class="bg-white rounded-xl p-5 shadow-lg">
            <h3 class="text-xl font-heading text-spa-accent-3 mb-4 tracking-tight">Send us a Message</h3>

            <div v-if="success" class="bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm">
              <p class="font-body">Your message has been sent successfully! We'll get back to you soon.</p>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
              <p class="font-body">{{ error }}</p>
            </div>

            <form @submit.prevent="handleContactSubmit" class="space-y-4">
              <div>
                <label class="block font-body text-sm text-gray-700 mb-1" for="name">Name *</label>
                <input
                  id="name"
                  v-model="contactForm.name"
                  type="text"
                  class="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-spa-accent-3 focus:ring-1 focus:ring-spa-accent-3 font-body text-sm"
                  required
                >
              </div>

              <div>
                <label class="block font-body text-sm text-gray-700 mb-1" for="email">Email *</label>
                <input
                  id="email"
                  v-model="contactForm.email"
                  type="email"
                  class="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-spa-accent-3 focus:ring-1 focus:ring-spa-accent-3 font-body text-sm"
                  required
                >
              </div>

              <div>
                <label class="block font-body text-sm text-gray-700 mb-1" for="subject">Subject *</label>
                <input
                  id="subject"
                  v-model="contactForm.subject"
                  type="text"
                  class="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-spa-accent-3 focus:ring-1 focus:ring-spa-accent-3 font-body text-sm"
                  required
                >
              </div>

              <div>
                <label class="block font-body text-sm text-gray-700 mb-1" for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="contactForm.message"
                  rows="4"
                  class="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-spa-accent-3 focus:ring-1 focus:ring-spa-accent-3 font-body text-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full bg-white text-spa-accent-3 rounded-2xl px-4 py-2 flex items-center justify-center hover:bg-spa-accent-3 hover:text-white transition-all duration-300 border border-spa-accent-3 cursor-pointer group text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-8">
        <div class="bg-white rounded-xl p-5 shadow-lg">
          <h3 class="text-xl font-heading text-spa-accent-3 mb-4 tracking-tight">Find Us</h3>
          <div class="h-64 bg-gray-200 rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4093.446245731566!2d115.1423641!3d-8.643877499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239fffab5692d%3A0x4540548ca3b3185c!2sKae%20Spa%20Bali!5e1!3m2!1sen!2sid!4v1749203089148!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style="border:0;"
              :allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-padding {
  padding: 1.5rem 1rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding: 2rem 1.5rem;
  }
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.75rem;
}
</style> 