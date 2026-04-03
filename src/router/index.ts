import { createRouter, createWebHistory } from 'vue-router'
import { trackPageView } from '../utils/analytics'
import { authService } from '../services/authService'
import { useSEO, metaTitles, metaDescriptions } from '../utils/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: metaTitles.home,
        description: metaDescriptions.home
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicy.vue'),
      meta: {
        title: metaTitles.privacy,
        description: metaDescriptions.privacy
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Admin Login - Kae Luxury Spa',
        description: 'Secure admin login portal for Kae Luxury Spa management.'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        title: 'Admin Dashboard - Kae Luxury Spa',
        description: 'Admin dashboard for managing Kae Luxury Spa services and treatments.',
        requiresAuth: true
      }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// Navigation guard
router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = authService.getCurrentUser()

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Track page views and update SEO
router.afterEach((to) => {
  trackPageView(to.fullPath)
  
  // Update SEO meta tags
  useSEO({
    title: to.meta.title as string,
    description: to.meta.description as string,
    url: window.location.href,
    type: 'website'
  })
})

export default router 