<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const items = [
    {
      name: 'Home',
      path: '/'
    }
  ]

  let currentPath = ''
  paths.forEach(path => {
    currentPath += `/${path}`
    items.push({
      name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      path: currentPath
    })
  })

  return items
})

// Add structured data for breadcrumbs
const breadcrumbStructuredData = computed(() => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://kaespabali.com${item.path}`
    }))
  }
  return JSON.stringify(data)
})

// Export the computed property to make it available to the template
defineExpose({
  breadcrumbs,
  breadcrumbStructuredData
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex flex-wrap items-center space-x-2 text-sm">
      <li v-for="(item, index) in breadcrumbs" :key="item.path" class="flex items-center">
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
        </template>
        <a
          v-if="index < breadcrumbs.length - 1"
          :href="item.path"
          class="text-gray-600 hover:text-spa-accent-3 transition-colors"
        >
          {{ item.name }}
        </a>
        <span v-else class="text-spa-accent-3 font-medium">
          {{ item.name }}
        </span>
      </li>
    </ol>
    <script type="application/ld+json" v-html="breadcrumbStructuredData"></script>
  </nav>
</template> 