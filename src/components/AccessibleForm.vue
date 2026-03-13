<script setup lang="ts">
import { ref, computed } from 'vue'
import { announceToScreenReader } from '../utils/accessibility'

interface FormField {
  name: string
  label: string
  type: string
  required?: boolean
  validation?: (value: string) => string | null
  placeholder?: string
  options?: { label: string; value: string }[]
}

interface Props {
  fields: FormField[]
  submitLabel?: string
  onSubmit: (data: Record<string, string>) => void
}

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Submit'
})

const formData = ref<Record<string, string>>({})
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const validateField = (field: FormField, value: string) => {
  if (field.required && !value) {
    return `${field.label} is required`
  }
  if (field.validation) {
    return field.validation(value)
  }
  return null
}

const handleInput = (field: FormField, value: string) => {
  formData.value[field.name] = value
  const error = validateField(field, value)
  if (error) {
    errors.value[field.name] = error
    announceToScreenReader(error, 'assertive')
  } else {
    delete errors.value[field.name]
  }
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  // Validate all fields
  props.fields.forEach(field => {
    const error = validateField(field, formData.value[field.name] || '')
    if (error) {
      errors.value[field.name] = error
    }
  })

  if (hasErrors.value) {
    announceToScreenReader('Please fix the errors in the form', 'assertive')
    return
  }

  isSubmitting.value = true
  try {
    await props.onSubmit(formData.value)
    announceToScreenReader('Form submitted successfully', 'polite')
  } catch (error) {
    announceToScreenReader('Error submitting form. Please try again.', 'assertive')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form
    @submit="handleSubmit"
    class="space-y-6"
    :aria-busy="isSubmitting"
    novalidate
  >
    <div v-for="field in fields" :key="field.name" class="space-y-2">
      <label
        :for="field.name"
        class="block text-sm font-medium text-gray-700"
      >
        {{ field.label }}
        <span
          v-if="field.required"
          class="text-red-500"
          aria-label="required"
        >*</span>
      </label>

      <!-- Text input -->
      <input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
        :id="field.name"
        :type="field.type"
        :name="field.name"
        v-model="formData[field.name]"
        :placeholder="field.placeholder"
        :required="field.required"
        :aria-required="field.required"
        :aria-invalid="!!errors[field.name]"
        :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        @input="handleInput(field, ($event.target as HTMLInputElement).value)"
      />

      <!-- Select input -->
      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        :name="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        :aria-required="field.required"
        :aria-invalid="!!errors[field.name]"
        :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        @change="handleInput(field, ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled selected>Select an option</option>
        <option
          v-for="option in field.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Textarea input -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        :name="field.name"
        v-model="formData[field.name]"
        :placeholder="field.placeholder"
        :required="field.required"
        :aria-required="field.required"
        :aria-invalid="!!errors[field.name]"
        :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
        rows="4"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        @input="handleInput(field, ($event.target as HTMLTextAreaElement).value)"
      ></textarea>

      <!-- Error message -->
      <p
        v-if="errors[field.name]"
        :id="`${field.name}-error`"
        class="mt-2 text-sm text-red-600"
        role="alert"
      >
        {{ errors[field.name] }}
      </p>
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting || hasErrors"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :aria-label="submitLabel"
      >
        <span v-if="isSubmitting" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Focus styles */
:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Error state styles */
[aria-invalid="true"] {
  border-color: #dc2626;
}

[aria-invalid="true"]:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
}
</style> 