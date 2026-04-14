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
  category: '',
  options: [{ duration: '', price: '' }]
})

const editingTreatment = ref<Treatment | null>(null)
const showAddForm = ref(false)

const router = useRouter()

// Load treatments
const loadTreatments = async () => {
  try {
    loading.value = true

    // Check if user is authenticated
    const user = authService.getCurrentUser()
    if (!user) {
      error.value = 'You must be logged in to access this page'
      router.push('/login')
      return
    }

    treatments.value = await menuService.getAllTreatments()
  } catch (err) {
    error.value = 'Failed to load treatments. Please check your permissions.'
    console.error('Firebase error:', err)

    // If it's a permissions error, redirect to login
    if (err instanceof Error && err.message.includes('Missing or insufficient permissions')) {
      error.value = 'Insufficient permissions. Please log in with an authorized account.'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
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
      category: '',
      options: [{ duration: '', price: '' }]
    }
    showAddForm.value = false
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
  if (treatment.options.length > 1) {
    treatment.options.splice(index, 1)
  }
}

// Add option to new treatment form
const addOptionToNew = () => {
  newTreatment.value.options.push({ duration: '', price: '' })
}

// Remove option from new treatment form
const removeOptionFromNew = (index: number) => {
  if (newTreatment.value.options.length > 1) {
    newTreatment.value.options.splice(index, 1)
  }
}

// Sign out
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
  <div class="min-h-screen bg-gradient-to-br from-kae-teal via-kae-teal to-kae-teal-dark">
    <!-- Header -->
    <div class="bg-white/95 backdrop-blur-sm border-b border-kae-gold/20 sticky top-0 z-10">
      <div class="container-editorial py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-heading text-2xl text-kae-teal">Kae Luxury Spa</h1>
            <p class="font-body text-sm text-kae-gold">Admin Dashboard</p>
          </div>
          <button
            @click="handleSignOut"
            class="flex items-center gap-2 px-4 py-2 bg-kae-teal/5 hover:bg-kae-teal/10 text-kae-teal rounded-xl font-body text-sm font-medium transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>

    <div class="container-editorial py-8">
      <!-- Error message -->
      <div v-if="error" class="mb-6 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl font-body text-sm">
        {{ error }}
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-flex items-center gap-3 text-kae-gold">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="font-body">Loading treatments...</span>
        </div>
      </div>

      <div v-else>
        <!-- Add New Treatment Button -->
        <div class="mb-8">
          <button
            v-if="!showAddForm"
            @click="showAddForm = true"
            class="inline-flex items-center gap-2 px-6 py-3 bg-kae-gold text-kae-teal-dark rounded-xl font-body text-sm font-medium hover:bg-kae-gold-light transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Treatment
          </button>
        </div>

        <!-- Add New Treatment Form -->
        <div v-if="showAddForm" class="mb-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-heading text-xl text-kae-teal">Add New Treatment</h2>
            <button
              @click="showAddForm = false"
              class="text-kae-teal/60 hover:text-kae-teal transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="addTreatment" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                  Treatment Name *
                </label>
                <input
                  v-model="newTreatment.name"
                  type="text"
                  required
                  placeholder="e.g., Balinese Massage"
                  class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300"
                />
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                  Category
                </label>
                <select
                  v-model="newTreatment.category"
                  class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300"
                >
                  <option value="">Select category</option>
                  <option value="Massage">Massage</option>
                  <option value="Facial">Facial</option>
                  <option value="Body Treatment">Body Treatment</option>
                  <option value="Head Spa">Head Spa</option>
                </select>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                Description *
              </label>
              <textarea
                v-model="newTreatment.description"
                required
                rows="3"
                placeholder="Describe the treatment..."
                class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <!-- Options -->
            <div>
              <label class="block text-sm font-body font-medium text-kae-teal mb-3">
                Pricing Options *
              </label>
              <div class="space-y-3">
                <div
                  v-for="(option, index) in newTreatment.options"
                  :key="index"
                  class="flex gap-3 items-center"
                >
                  <input
                    v-model="option.duration"
                    type="text"
                    placeholder="Duration (e.g., 60 mins)"
                    required
                    class="flex-1 px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300"
                  />
                  <input
                    v-model="option.price"
                    type="text"
                    placeholder="Price (e.g., 250k)"
                    required
                    class="flex-1 px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal placeholder-kae-teal/40 transition-all duration-300"
                  />
                  <button
                    v-if="newTreatment.options.length > 1"
                    type="button"
                    @click="removeOptionFromNew(index)"
                    class="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="button"
                @click="addOptionToNew"
                class="mt-3 text-sm font-body text-kae-gold hover:text-kae-gold-light transition-colors duration-300 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add another option
              </button>
            </div>

            <!-- Submit buttons -->
            <div class="flex gap-3">
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-kae-gold text-kae-teal-dark rounded-xl font-body text-sm font-medium hover:bg-kae-gold-light transition-all duration-300 hover:shadow-gold"
              >
                Add Treatment
              </button>
              <button
                type="button"
                @click="showAddForm = false"
                class="px-6 py-3 bg-kae-teal/5 text-kae-teal rounded-xl font-body text-sm font-medium hover:bg-kae-teal/10 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Existing Treatments -->
        <div class="space-y-6">
          <h2 class="font-heading text-2xl text-white mb-6">
            Manage Treatments ({{ treatments.length }})
          </h2>

          <div
            v-for="treatment in treatments"
            :key="treatment.id"
            class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <!-- View Mode -->
            <div v-if="editingTreatment?.id !== treatment.id" class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-heading text-xl text-kae-teal">{{ treatment.name }}</h3>
                    <span
                      v-if="treatment.category"
                      class="px-3 py-1 bg-kae-gold/20 text-kae-gold text-xs font-body font-medium rounded-full"
                    >
                      {{ treatment.category }}
                    </span>
                  </div>
                  <p class="font-body text-sm text-kae-teal/70 leading-relaxed">{{ treatment.description }}</p>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="editingTreatment = treatment"
                    class="p-2 text-kae-teal/60 hover:text-kae-gold hover:bg-kae-gold/10 rounded-xl transition-all duration-300"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteTreatment(treatment.id!)"
                    class="p-2 text-kae-teal/60 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Pricing Options -->
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="option in treatment.options"
                  :key="option.duration"
                  class="px-4 py-2 bg-kae-cream rounded-xl border border-kae-teal/10"
                >
                  <span class="font-body text-sm font-medium text-kae-teal">{{ option.duration }}</span>
                  <span class="text-kae-gold mx-2">•</span>
                  <span class="font-body text-sm text-kae-teal">{{ option.price }}</span>
                </div>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="p-6">
              <form @submit.prevent="updateTreatment(treatment)" class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- Name -->
                  <div>
                    <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                      Treatment Name *
                    </label>
                    <input
                      v-model="treatment.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300"
                    />
                  </div>

                  <!-- Category -->
                  <div>
                    <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                      Category
                    </label>
                    <select
                      v-model="treatment.category"
                      class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300"
                    >
                      <option value="">Select category</option>
                      <option value="Massage">Massage</option>
                      <option value="Facial">Facial</option>
                      <option value="Body Treatment">Body Treatment</option>
                      <option value="Head Spa">Head Spa</option>
                    </select>
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-body font-medium text-kae-teal mb-2">
                    Description *
                  </label>
                  <textarea
                    v-model="treatment.description"
                    required
                    rows="3"
                    class="w-full px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <!-- Options -->
                <div>
                  <label class="block text-sm font-body font-medium text-kae-teal mb-3">
                    Pricing Options *
                  </label>
                  <div class="space-y-3">
                    <div
                      v-for="(option, index) in treatment.options"
                      :key="index"
                      class="flex gap-3 items-center"
                    >
                      <input
                        v-model="option.duration"
                        type="text"
                        required
                        class="flex-1 px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300"
                      />
                      <input
                        v-model="option.price"
                        type="text"
                        required
                        class="flex-1 px-4 py-3 border border-kae-teal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kae-gold/50 focus:border-kae-gold font-body text-sm text-kae-teal transition-all duration-300"
                      />
                      <button
                        v-if="treatment.options.length > 1"
                        type="button"
                        @click="removeOption(treatment, index)"
                        class="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="addOption(treatment)"
                    class="mt-3 text-sm font-body text-kae-gold hover:text-kae-gold-light transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add another option
                  </button>
                </div>

                <!-- Action buttons -->
                <div class="flex gap-3">
                  <button
                    type="submit"
                    class="flex-1 px-6 py-3 bg-kae-gold text-kae-teal-dark rounded-xl font-body text-sm font-medium hover:bg-kae-gold-light transition-all duration-300 hover:shadow-gold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    @click="editingTreatment = null"
                    class="px-6 py-3 bg-kae-teal/5 text-kae-teal rounded-xl font-body text-sm font-medium hover:bg-kae-teal/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
