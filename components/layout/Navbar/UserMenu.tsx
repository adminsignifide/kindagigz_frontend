'use client';

// ============================================
// USER MENU DROPDOWN COMPONENT
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { User } from '@/types/auth';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: '📊' },
    { label: 'My Profile', href: ROUTES.PROFESSIONAL(user.id.toString()), icon: '👤' },
    { label: 'Settings', href: ROUTES.DASHBOARD_SETTINGS, icon: '⚙️' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {user.profile_image ? (
          <img
            src={user.profile_image}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-8 h-8 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-white">
            <span className="text-secondary text-sm font-bold">{initials}</span>
          </div>
        )}
        <span className="text-sm font-semibold text-primary hidden lg:block">
          {user.first_name}
        </span>
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border-2 border-card-border py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-card-border">
            <div className="text-sm font-bold text-primary">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-xs text-gray-500">{user.email}</div>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary text-primary">
                { user.role === 'professional' ? 'Professional' : 'Client'}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-secondary/10 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-semibold text-primary group-hover:text-primary/80">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-card-border py-1">
            <button
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors group text-left"
              onClick={() => {
                // Add logout logic here
                setIsOpen(false);
              }}
            >
              <span className="text-xl">🚪</span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600">
                Log Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};