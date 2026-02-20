'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { Professional } from '@/types/auth';
import { LogoutModal } from '../auth/LogoutModal';

interface DashboardSidebarProps {
  professional: Professional;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  professional,
  activeSection,
  onSectionChange,
}) => {
  const { setUser } = useAuth();
  const router = useRouter();

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'schedule', name: 'Schedule', icon: '🗓️' },
    { id: 'messages', name: 'Messages', icon: '💬' },
    { id: 'clients', name: 'Clients', icon: '👥' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'payments', name: 'Payments', icon: '💰' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    const confirmed = confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    setUser(null);
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-primary min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-white/70 text-sm mt-1">{professional.business_name}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-secondary text-primary font-semibold shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span>{section.name}</span>
          </button>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          {professional.logo || professional.user.profile_image ? (
            <img
              src={professional.logo || professional.user.profile_image || ''}
              alt={professional.user.first_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-primary font-bold">
                {professional.user.first_name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              {professional.user.first_name} {professional.user.last_name}
            </p>
            <p className="text-white/70 text-xs">{professional.user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          <span>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};