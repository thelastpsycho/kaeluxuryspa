import { ref } from 'vue'
import { useHead } from '@vueuse/head'

interface MetaTags {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonical: string
}

const defaultMetaTags: MetaTags = {
  title: 'KAE Spa Bali | Luxury Spa & Wellness Sanctuary in Kuta',
  description: 'KAE Spa Bali - Luxury spa treatments in Bali including signature massages, facials, and body scrubs. Experience ultimate relaxation and rejuvenation in our serene sanctuary in Kuta.',
  keywords: 'KAE Spa Bali, luxury spa Bali, massage Bali, facial treatment Bali, body scrub Bali, relaxation Bali, rejuvenation Bali, wellness Bali, spa treatments Bali, beauty treatments Bali, massage therapy Bali, facial care Bali, body care Bali, Kuta spa, Bali spa',
  ogTitle: 'KAE Spa Bali - Luxury Spa & Wellness Sanctuary in Kuta',
  ogDescription: 'Experience ultimate relaxation with our signature spa treatments in Bali. Book your luxury massage, facial, or body scrub today at KAE Spa Bali.',
  ogImage: 'https://kaespabali.com/src/assets/og-image.jpg',
  twitterTitle: 'KAE Spa Bali - Luxury Spa & Wellness Sanctuary in Kuta',
  twitterDescription: 'Experience ultimate relaxation with our signature spa treatments in Bali. Book your luxury massage, facial, or body scrub today at KAE Spa Bali.',
  twitterImage: 'https://kaespabali.com/src/assets/og-image.jpg',
  canonical: 'https://kaespabali.com'
}

const currentMetaTags = ref<MetaTags>(defaultMetaTags)

export function updateMetaTags(tags: Partial<MetaTags>) {
  currentMetaTags.value = { ...currentMetaTags.value, ...tags }
  
  // Update meta tags in the document
  document.title = currentMetaTags.value.title
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', currentMetaTags.value.description)
  
  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', currentMetaTags.value.keywords)
  
  // Update Open Graph tags
  updateMetaTag('og:title', currentMetaTags.value.ogTitle)
  updateMetaTag('og:description', currentMetaTags.value.ogDescription)
  updateMetaTag('og:image', currentMetaTags.value.ogImage)
  
  // Update Twitter tags
  updateMetaTag('twitter:title', currentMetaTags.value.twitterTitle)
  updateMetaTag('twitter:description', currentMetaTags.value.twitterDescription)
  updateMetaTag('twitter:image', currentMetaTags.value.twitterImage)
  
  // Update canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', currentMetaTags.value.canonical)
}

function updateMetaTag(property: string, content: string) {
  let metaTag = document.querySelector(`meta[property="${property}"]`)
  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute('property', property)
    document.head.appendChild(metaTag)
  }
  metaTag.setAttribute('content', content)
}

export function resetMetaTags() {
  updateMetaTags(defaultMetaTags)
}

export { currentMetaTags }

interface MetaOptions {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

export const useSEO = (options: MetaOptions) => {
  const {
    title,
    description,
    image = '/images/default-og.jpg', // Default OG image
    url = window.location.href,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'KAE Spa Bali'
  } = options

  // Basic meta tags
  const meta = [
    { name: 'description', content: description },
    { name: 'keywords', content: 'spa, wellness, massage, bali, relaxation' },
    
    // Open Graph tags
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    
    // Additional meta tags
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: author }
  ]

  // Add article-specific meta tags if type is article
  if (type === 'article' && publishedTime && modifiedTime) {
    meta.push(
      { property: 'article:published_time', content: publishedTime },
      { property: 'article:modified_time', content: modifiedTime },
      { property: 'article:author', content: author }
    )
  }

  // Generate structured data
  const generateStructuredData = (): StructuredData => {
    const baseData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      name: title,
      description: description,
      url: url,
      image: image
    }

    if (type === 'article' && publishedTime && modifiedTime) {
      return {
        ...baseData,
        datePublished: publishedTime,
        dateModified: modifiedTime,
        author: {
          '@type': 'Organization',
          name: author
        }
      }
    }

    return baseData
  }

  // Apply meta tags and structured data
  useHead({
    title,
    meta,
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(generateStructuredData())
      }
    ]
  })
}

// Predefined meta descriptions for different sections
export const metaDescriptions = {
  home: 'Experience luxury spa treatments in the heart of Bali. KAE Spa offers a wide range of massage and wellness services for ultimate relaxation.',
  services: 'Discover our premium spa services including traditional Balinese massage, body treatments, facials, and more at KAE Spa Bali.',
  about: 'Learn about KAE Spa Bali\'s commitment to wellness and our team of professional therapists dedicated to your relaxation and rejuvenation.',
  contact: 'Get in touch with KAE Spa Bali. Book your appointment, inquire about our services, or visit our location in Bali.',
  privacy: 'Privacy Policy of KAE Spa Bali. Learn how we collect, use, and protect your personal information.'
}

// Predefined titles for different sections
export const metaTitles = {
  home: 'KAE Spa Bali - Luxury Spa & Wellness Center',
  services: 'Spa Services - KAE Spa Bali',
  about: 'About Us - KAE Spa Bali',
  contact: 'Contact Us - KAE Spa Bali',
  privacy: 'Privacy Policy - KAE Spa Bali'
} 