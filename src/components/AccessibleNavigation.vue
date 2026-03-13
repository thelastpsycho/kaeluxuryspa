<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { keyboardKeys, focusManagement } from '../utils/accessibility'

interface NavItem {
  label: string
  link: string
  children?: NavItem[]
}

const items: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/about' },
  { label: 'Services', link: '/services' },
  {
    label: 'Products',
    link: '/products',
    children: [
      { label: 'Product 1', link: '/products/1' },
      { label: 'Product 2', link: '/products/2' }
    ]
  }
]

const isMenuOpen = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
let cleanupFocusTrap: (() => void) | null = null

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value && menuRef.value) {
    const cleanup = focusManagement.trapFocus(menuRef.value)
    cleanupFocusTrap = () => cleanup()
  } else if (cleanupFocusTrap) {
    cleanupFocusTrap()
    cleanupFocusTrap = null
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === keyboardKeys.escape && isMenuOpen.value) {
    toggleMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  if (cleanupFocusTrap) {
    cleanupFocusTrap()
  }
})
</script>

<template>
  <nav class="bg-white shadow">
    <!-- Skip to main content link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-indigo-600"
    >
      Skip to main content
    </a>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Mobile menu button -->
          <button
            ref="menuButtonRef"
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            :aria-expanded="isMenuOpen"
            :aria-controls="isMenuOpen ? 'mobile-menu' : undefined"
            aria-label="Toggle menu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Desktop navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <template v-for="item in items" :key="item.link">
              <div class="relative group">
                <a
                  :href="item.link"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  :aria-current="item.link === '/' ? 'page' : undefined"
                >
                  {{ item.label }}
                  <svg
                    v-if="item.children"
                    class="ml-2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <!-- Dropdown menu -->
                <div
                  v-if="item.children"
                  class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block"
                  role="menu"
                  aria-orientation="vertical"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <a
                      v-for="child in item.children"
                      :key="child.link"
                      :href="child.link"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabindex="-1"
                    >
                      {{ child.label }}
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="isMenuOpen"
      ref="menuRef"
      class="sm:hidden"
      id="mobile-menu"
      role="menu"
      aria-orientation="vertical"
    >
      <div class="pt-2 pb-3 space-y-1">
        <template v-for="item in items" :key="item.link">
          <div class="relative">
            <a
              :href="item.link"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="[
                item.link === '/'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              ]"
              :aria-current="item.link === '/' ? 'page' : undefined"
              role="menuitem"
              tabindex="-1"
            >
              {{ item.label }}
            </a>
            <!-- Mobile dropdown menu -->
            <div
              v-if="item.children"
              class="pl-4"
              role="menu"
              aria-orientation="vertical"
            >
              <a
                v-for="child in item.children"
                :key="child.link"
                :href="child.link"
                class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                role="menuitem"
                tabindex="-1"
              >
                {{ child.label }}
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  border: 2px solid #4f46e5;
  border-radius: 0.25rem;
}
</style> 