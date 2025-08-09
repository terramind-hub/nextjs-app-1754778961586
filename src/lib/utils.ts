import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'USD'): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00'
  }
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price)
  } catch (error) {
    // Fallback for invalid currency codes
    return `$${price.toFixed(2)}`
  }
}

export function formatDate(date: string | Date): string {
  if (!date) return ''
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (isNaN(dateObj.getTime())) {
      return ''
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    return ''
  }
}

export function formatCurrency(amount: number, currency?: string): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00'
  }
  
  // Validate ISO-4217 currency code
  const validCurrency = currency && /^[A-Z]{3}$/.test(currency) ? currency : 'USD'
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: validCurrency,
    }).format(amount)
  } catch (error) {
    // Fallback for any formatting errors
    return `$${amount.toFixed(2)}`
  }
}

export function getCartTotal(items: Array<{ price: number; quantity: number }>): number {
  if (!Array.isArray(items)) return 0
  
  return items.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0
    return total + (price * quantity)
  }, 0)
}

export function getCartItemCount(items: Array<{ quantity: number }>): number {
  if (!Array.isArray(items)) return 0
  
  return items.reduce((count, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0
    return count + quantity
  }, 0)
}

export function slugify(text: string): string {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || typeof text !== 'string') return ''
  
  if (text.length <= maxLength) return text
  
  return text.slice(0, maxLength).trim() + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => resolve(true))
          .catch(() => {
            // Fallback to textarea selection
            fallbackCopyTextToClipboard(text)
            resolve(true)
          })
      } else {
        fallbackCopyTextToClipboard(text)
        resolve(true)
      }
    } catch (error) {
      resolve(false)
    }
  })
}

function fallbackCopyTextToClipboard(text: string): void {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    document.execCommand('copy')
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }
  
  document.body.removeChild(textArea)
}