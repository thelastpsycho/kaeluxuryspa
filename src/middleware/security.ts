import type { Request, Response, NextFunction } from 'express'
import type { Session } from 'express-session'
import { generateCSRFToken } from '../utils/security'

// Extend Express Request type to include session
declare module 'express' {
  interface Request {
    session: Session & {
      csrfToken?: string
    }
  }
}

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['X-CSRF-Token'],
  credentials: true,
  maxAge: 86400 // 24 hours
}

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'"
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()'
  ].join(', '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

/**
 * CORS middleware
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin

  if (origin && corsOptions.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(', '))
    res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '))
    res.setHeader('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(', '))
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Max-Age', corsOptions.maxAge.toString())
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  next()
}

/**
 * Security headers middleware
 */
export const securityHeadersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Set security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  // Generate and set CSRF token for non-GET requests
  if (req.method !== 'GET') {
    const csrfToken = generateCSRFToken()
    res.setHeader('X-CSRF-Token', csrfToken)
    // Store token in session
    if (!req.session) {
      req.session = {} as Session
    }
    req.session.csrfToken = csrfToken
  }

  next()
}

/**
 * Rate limiting middleware
 */
export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100 // Maximum 100 requests per windowMs

  // Initialize rate limit store if not exists
  if (!req.app.locals.rateLimitStore) {
    req.app.locals.rateLimitStore = new Map()
  }

  const store = req.app.locals.rateLimitStore
  const key = req.ip
  const now = Date.now()

  // Clean up old entries
  for (const [storedKey, data] of store.entries()) {
    if (now - data.timestamp > windowMs) {
      store.delete(storedKey)
    }
  }

  // Get or initialize rate limit data for this IP
  const data = store.get(key) || { count: 0, timestamp: now }
  
  // Check if rate limit is exceeded
  if (data.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests, please try again later.'
    })
  }

  // Update rate limit data
  data.count++
  store.set(key, data)

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', maxRequests)
  res.setHeader('X-RateLimit-Remaining', maxRequests - data.count)
  res.setHeader('X-RateLimit-Reset', Math.ceil((data.timestamp + windowMs) / 1000))

  next()
}

/**
 * Request validation middleware
 */
export const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Validate Content-Type for POST/PUT requests
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type']
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({
        error: 'Unsupported Media Type. Content-Type must be application/json'
      })
    }
  }

  // Validate request body size
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  const maxBodySize = 1024 * 1024 // 1MB
  if (contentLength > maxBodySize) {
    return res.status(413).json({
      error: 'Request entity too large'
    })
  }

  next()
} 