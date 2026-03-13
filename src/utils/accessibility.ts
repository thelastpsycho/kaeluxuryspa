// Common ARIA labels for reusable components
export const ariaLabels = {
  navigation: {
    main: 'Main navigation',
    menu: 'Menu',
    close: 'Close menu',
    open: 'Open menu',
    skip: 'Skip to main content'
  },
  buttons: {
    submit: 'Submit form',
    cancel: 'Cancel',
    back: 'Go back',
    next: 'Go to next page',
    previous: 'Go to previous page',
    close: 'Close',
    menu: 'Toggle menu'
  },
  forms: {
    required: 'Required field',
    optional: 'Optional field',
    error: 'Error in field',
    success: 'Success'
  }
}

// Keyboard navigation helpers
export const keyboardKeys = {
  enter: 'Enter',
  space: ' ',
  escape: 'Escape',
  tab: 'Tab',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End'
}

// Focus management
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement): () => void => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusableElement = focusableElements[0] as HTMLElement
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === keyboardKeys.tab) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault()
            lastFocusableElement.focus()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault()
            firstFocusableElement.focus()
          }
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)

    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  },

  // Return focus to previous element
  returnFocus: (element: HTMLElement) => {
    element.focus()
  }
}

// Color contrast checker
export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  },

  // Calculate contrast ratio
  getContrastRatio: (l1: number, l2: number): number => {
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  },

  // Check if contrast meets WCAG 2.1 guidelines
  meetsWCAG: (contrastRatio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const thresholds = {
      AA: { large: 3, normal: 4.5 },
      AAA: { large: 4.5, normal: 7 }
    }
    return contrastRatio >= thresholds[level].normal
  }
}

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  // Remove the announcement after it's been read
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Common ARIA roles
export const ariaRoles = {
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  form: 'form',
  search: 'search',
  banner: 'banner',
  article: 'article',
  region: 'region',
  dialog: 'dialog',
  alert: 'alert',
  status: 'status'
}

// Common ARIA states
export const ariaStates = {
  expanded: 'aria-expanded',
  hidden: 'aria-hidden',
  selected: 'aria-selected',
  checked: 'aria-checked',
  disabled: 'aria-disabled',
  invalid: 'aria-invalid',
  pressed: 'aria-pressed',
  current: 'aria-current'
} 