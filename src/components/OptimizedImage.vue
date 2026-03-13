<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  class: ''
})

const imageLoaded = ref(false)
const imageError = ref(false)

const handleLoad = () => {
  imageLoaded.value = true
}

const handleError = () => {
  imageError.value = true
}

onMounted(() => {
  if (props.loading === 'eager') {
    const img = new Image()
    img.src = props.src
    img.onload = handleLoad
    img.onerror = handleError
  }
})
</script>

<template>
  <div
    class="relative overflow-hidden"
    :class="[props.class, { 'animate-pulse bg-gray-200': !imageLoaded }]"
  >
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :class="[
        'transition-opacity duration-300',
        { 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }
      ]"
      @load="handleLoad"
      @error="handleError"
    />
    <div
      v-if="imageError"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
    >
      Failed to load image
    </div>
  </div>
</template> 