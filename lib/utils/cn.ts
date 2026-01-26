// ============================================
// CLASSNAME MERGER UTILITY
// ============================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes intelligently
 * Combines clsx for conditional classes and tailwind-merge for conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Example usage:
// cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6') 
// Result: 'px-6 py-2 bg-blue-500' (px-6 overrides px-4)