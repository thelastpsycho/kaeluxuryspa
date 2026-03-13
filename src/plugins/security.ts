import type { App } from 'vue'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { generateCSRFToken, validateCSRFToken } from '../utils/security'

export const securityPlugin = {
  install: (app: App) => {
    // Add CSRF token to all non-GET requests
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (config.method !== 'get') {
        const token = localStorage.getItem('csrfToken') || generateCSRFToken()
        localStorage.setItem('csrfToken', token)
        config.headers['X-CSRF-Token'] = token
      }
      return config
    })

    // Handle CSRF token validation
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        const newToken = response.headers['x-csrf-token']
        if (newToken) {
          localStorage.setItem('csrfToken', newToken)
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status === 403) {
          // CSRF token validation failed
          localStorage.removeItem('csrfToken')
          // Redirect to login or show error
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )

    // Add security-related global properties
    app.config.globalProperties.$security = {
      // Sanitize user input
      sanitizeInput: (input: string) => {
        return input.replace(/[<>]/g, '').trim()
      },

      // Validate CSRF token
      validateCSRFToken: (token: string) => {
        const storedToken = localStorage.getItem('csrfToken')
        return storedToken ? validateCSRFToken(token, storedToken) : false
      },

      // Clear sensitive data
      clearSensitiveData: () => {
        localStorage.removeItem('csrfToken')
        // Add other sensitive data cleanup as needed
      }
    }
  }
}

// Export types for TypeScript support
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $security: {
      sanitizeInput: (input: string) => string
      validateCSRFToken: (token: string) => boolean
      clearSensitiveData: () => void
    }
  }
} 