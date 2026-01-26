'use client';

// ============================================
// RESOURCES DROPDOWN COMPONENT
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

export const ResourcesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const resourceLinks = [
    { label: 'How It Works', href: ROUTES.HOW_IT_WORKS, icon: '📖' },
    { label: 'Minimum Wage Guide', href: ROUTES.MINIMUM_WAGE, icon: '💰' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={cn(
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-1',
          isOpen
            ? 'text-purple-600 bg-purple-50'
            : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        aria-expanded={isOpen}
      >
        <span>Resources</span>
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-purple-50 transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">{link.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                  {link.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};