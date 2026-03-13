<script setup lang="ts">
import { ref } from 'vue'
import Toast from './Toast.vue'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const toasts = ref<ToastItem[]>([])
let nextId = 1

const addToast = (message: string, type: ToastItem['type'] = 'info', duration?: number) => {
  const id = nextId++
  toasts.value.push({ id, message, type, duration })
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose the addToast method to be used globally
defineExpose({
  addToast
})
</script>

<template>
  <div class="fixed bottom-0 right-0 p-4 space-y-4 z-50">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @close="removeToast(toast.id)"
      />
    </TransitionGroup>
  </div>
</template> 