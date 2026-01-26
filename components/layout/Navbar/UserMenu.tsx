'use client';

// ============================================
// USER MENU DROPDOWN COMPONENT
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { User } from '@/types';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: '📊' },
    { label: 'My Profile', href: ROUTES.PROFESSIONAL(user.id), icon: '👤' },
    { label: 'Settings', href: ROUTES.DASHBOARD_SETTINGS, icon: '⚙️' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">{initials}</span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 hidden lg:block">
          {user.firstName}
        </span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-500">{user.email}</div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                {user.role === 'both' ? 'Client & Pro' : user.role === 'professional' ? 'Professional' : 'Client'}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-2.5 hover:bg-purple-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 py-1">
            <button
              className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 transition-colors group text-left"
              onClick={() => {
                // Add logout logic here
                setIsOpen(false);
              }}
            >
              <span className="text-xl">🚪</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                Log Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};