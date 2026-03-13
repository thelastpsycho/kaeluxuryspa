<script setup lang="ts">
interface Props {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div
      class="animate-spin rounded-full border-t-2 border-b-2 border-indigo-500"
      :class="{
        'h-4 w-4': size === 'sm',
        'h-8 w-8': size === 'md',
        'h-12 w-12': size === 'lg'
      }"
    ></div>
    <p
      class="mt-2 text-sm text-gray-600"
      :class="{
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-base': size === 'lg'
      }"
    >
      {{ text }}
    </p>
  </div>
</template> 