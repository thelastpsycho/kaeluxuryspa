<script setup lang="ts">
import { useSEO } from '../utils/seo'
import { computed } from 'vue'

interface Props {
  title: string
  content: string
  author: string
  publishedDate: string
  modifiedDate: string
  image?: string
  excerpt?: string
}

const props = withDefaults(defineProps<Props>(), {
  image: '/images/blog-default.jpg',
  excerpt: ''
})

const description = computed(() => props.excerpt || props.content.slice(0, 160) + '...')

// Set up SEO for the blog post
useSEO({
  title: props.title,
  description: description.value,
  image: props.image,
  type: 'article',
  publishedTime: props.publishedDate,
  modifiedTime: props.modifiedDate,
  author: props.author
})
</script>

<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ title }}</h1>
      <div class="flex items-center text-gray-600 text-sm">
        <span>By {{ author }}</span>
        <span class="mx-2">•</span>
        <time :datetime="publishedDate">{{ new Date(publishedDate).toLocaleDateString() }}</time>
        <span v-if="modifiedDate !== publishedDate" class="mx-2">•</span>
        <time v-if="modifiedDate !== publishedDate" :datetime="modifiedDate">
          Updated {{ new Date(modifiedDate).toLocaleDateString() }}
        </time>
      </div>
    </header>

    <div class="prose prose-lg max-w-none">
      <img
        :src="image"
        :alt="title"
        class="w-full h-64 object-cover rounded-lg mb-8"
      />
      <div v-html="content"></div>
    </div>
  </article>
</template> 