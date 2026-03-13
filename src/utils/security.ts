import DOMPurify from 'dompurify'
import { escape } from 'html-escaper'

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param content - The HTML content to sanitize
 * @returns Sanitized HTML content
 */
export const sanitizeHTML = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  })
}

/**
 * Escapes HTML special characters
 * @param content - The content to escape
 * @returns Escaped content
 */
export const escapeHTML = (content: string): string => {
  return escape(content)
}

/**
 * Sanitizes user input by removing potentially dangerous characters
 * @param input - The user input to sanitize
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove on* attributes
    .trim()
}

/**
 * Validates email format
 * @param email - The email to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Validates password strength
 * @param password - The password to validate
 * @returns object containing validation results
 */
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generates a CSRF token
 * @returns A random CSRF token
 */
export const generateCSRFToken = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Validates a CSRF token
 * @param token - The token to validate
 * @param storedToken - The stored token to compare against
 * @returns boolean indicating if token is valid
 */
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken
}

/**
 * Sanitizes a URL
 * @param url - The URL to sanitize
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeURL = (url: string): string | null => {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
} 