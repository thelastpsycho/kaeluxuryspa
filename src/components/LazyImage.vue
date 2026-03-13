<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :class="[
      'transition-opacity duration-300',
      { 'opacity-0': !isLoaded },
      customClass
    ]"
    loading="lazy"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  customClass: ''
})

const isLoaded = ref(false)
const emit = defineEmits(['load', 'error'])

const onImageLoad = () => {
  isLoaded.value = true
  emit('load')
}

const onImageError = (error: Event) => {
  emit('error', error)
}
</script> 