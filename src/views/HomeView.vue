<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import ServicesPreview from '../components/sections/ServicesPreview.vue'
import MenuSection from '../components/sections/MenuSection.vue'
// import TestimonialsPreview from '../components/sections/TestimonialsPreview.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import SpaEtiquette from '../components/sections/SpaEtiquette.vue'
</script>

<template>
  <div>
    <HeroSection />
    <ServicesPreview id="services" />
    <MenuSection id="menu" />
    <!-- <TestimonialsPreview id="testimonials" /> -->
    <AboutSection id="about" />
    <SpaEtiquette />
    <ContactSection id="contact" />
  </div>
</template> 