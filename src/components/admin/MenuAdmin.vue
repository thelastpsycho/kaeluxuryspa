<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { menuService, type Treatment } from '../../services/menuService'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const treatments = ref<Treatment[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newTreatment = ref<Omit<Treatment, 'id'>>({
  name: '',
  description: '',
  options: [{ duration: '', price: '' }]
})

const editingTreatment = ref<Treatment | null>(null)

const router = useRouter()

// Load treatments
const loadTreatments = async () => {
  try {
    loading.value = true
    treatments.value = await menuService.getAllTreatments()
  } catch (err) {
    error.value = 'Failed to load treatments'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Add new treatment
const addTreatment = async () => {
  try {
    await menuService.addTreatment(newTreatment.value)
    newTreatment.value = {
      name: '',
      description: '',
      options: [{ duration: '', price: '' }]
    }
    await loadTreatments()
  } catch (err) {
    error.value = 'Failed to add treatment'
    console.error(err)
  }
}

// Update treatment
const updateTreatment = async (treatment: Treatment) => {
  try {
    if (treatment.id) {
      await menuService.updateTreatment(treatment.id, treatment)
      editingTreatment.value = null
      await loadTreatments()
    }
  } catch (err) {
    error.value = 'Failed to update treatment'
    console.error(err)
  }
}

// Delete treatment
const deleteTreatment = async (id: string) => {
  if (confirm('Are you sure you want to delete this treatment?')) {
    try {
      await menuService.deleteTreatment(id)
      await loadTreatments()
    } catch (err) {
      error.value = 'Failed to delete treatment'
      console.error(err)
    }
  }
}

// Add new option to treatment
const addOption = (treatment: Treatment) => {
  treatment.options.push({ duration: '', price: '' })
}

// Remove option from treatment
const removeOption = (treatment: Treatment, index: number) => {
  treatment.options.splice(index, 1)
}

// Add sign out function
const handleSignOut = async () => {
  try {
    await authService.signOut()
    router.push('/login')
  } catch (err) {
    error.value = 'Failed to sign out'
    console.error(err)
  }
}

onMounted(loadTreatments)
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manage Treatments</h1>
      <button
        @click="handleSignOut"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-4">
      Loading...
    </div>

    <!-- Add new treatment form -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">Add New Treatment</h2>
      <form @submit.prevent="addTreatment" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="newTreatment.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="newTreatment.description"
            required
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Options</label>
          <div v-for="(option, index) in newTreatment.options" :key="index" class="flex gap-4 mb-2">
            <input
              v-model="option.duration"
              type="text"
              placeholder="Duration"
              required
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
            />
            <input
              v-model="option.price"
              type="text"
              placeholder="Price"
              required
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
            />
            <button
              v-if="newTreatment.options.length > 1"
              type="button"
              @click="removeOption(newTreatment, index)"
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            @click="addOption(newTreatment)"
            class="text-spa-accent-3 hover:text-spa-accent-2"
          >
            + Add Option
          </button>
        </div>
        <button
          type="submit"
          class="bg-spa-accent-3 text-white px-4 py-2 rounded hover:bg-spa-accent-2"
        >
          Add Treatment
        </button>
      </form>
    </div>

    <!-- Existing treatments -->
    <div class="space-y-6">
      <div
        v-for="treatment in treatments"
        :key="treatment.id"
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <div v-if="editingTreatment?.id === treatment.id">
          <form @submit.prevent="updateTreatment(treatment)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="treatment.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="treatment.description"
                required
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Options</label>
              <div v-for="(option, index) in treatment.options" :key="index" class="flex gap-4 mb-2">
                <input
                  v-model="option.duration"
                  type="text"
                  placeholder="Duration"
                  required
                  class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
                />
                <input
                  v-model="option.price"
                  type="text"
                  placeholder="Price"
                  required
                  class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-spa-accent-3 focus:ring-spa-accent-3"
                />
                <button
                  v-if="treatment.options.length > 1"
                  type="button"
                  @click="removeOption(treatment, index)"
                  class="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <button
                type="button"
                @click="addOption(treatment)"
                class="text-spa-accent-3 hover:text-spa-accent-2"
              >
                + Add Option
              </button>
            </div>
            <div class="flex gap-2">
              <button
                type="submit"
                class="bg-spa-accent-3 text-white px-4 py-2 rounded hover:bg-spa-accent-2"
              >
                Save
              </button>
              <button
                type="button"
                @click="editingTreatment = null"
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold">{{ treatment.name }}</h3>
            <div class="flex gap-2">
              <button
                @click="editingTreatment = treatment"
                class="text-spa-accent-3 hover:text-spa-accent-2"
              >
                Edit
              </button>
              <button
                @click="deleteTreatment(treatment.id!)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
          <p class="text-gray-600 mb-4">{{ treatment.description }}</p>
          <div class="space-y-2">
            <div
              v-for="option in treatment.options"
              :key="option.duration"
              class="flex gap-4 text-sm"
            >
              <span class="font-medium">{{ option.duration }}</span>
              <span>{{ option.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 