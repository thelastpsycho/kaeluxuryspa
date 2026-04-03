<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import ServicesPreview from '../components/sections/ServicesPreview.vue'
import MenuSection from '../components/sections/MenuSection.vue'
import SignatureRituals from '../components/sections/SignatureRituals.vue'
import WellnessPackages from '../components/sections/WellnessPackages.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import SpaEtiquette from '../components/sections/SpaEtiquette.vue'
import TestimonialsPreview from '../components/sections/TestimonialsPreview.vue'
import BookingCTA from '../components/sections/BookingCTA.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <div class="bg-kae-beige">
    <HeroSection />
    <ServicesPreview id="services" />
    <MenuSection id="menu" />
    <SignatureRituals id="rituals" />
    <WellnessPackages id="packages" />
    <AboutSection id="about" />
    <SpaEtiquette id="spa-etiquette" />
    <TestimonialsPreview id="testimonials" />
    <BookingCTA />
    <ContactSection id="contact" />
  </div>
</template>
