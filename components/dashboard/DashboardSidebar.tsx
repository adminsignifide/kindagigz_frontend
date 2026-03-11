'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ROUTES } from '@/lib/constants/routes';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { Professional } from '@/types/auth';
import { LogoutModal } from '../auth/LogoutModal';

interface DashboardSidebarProps {
  professional: Professional;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  professional,
  activeSection,
  onSectionChange,
  onClose
}) => {
  const { logout: contextLogout } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // Handle logout
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    const loadingToast = toast.loading('Logging out...');

    try {
      await authService.logout();
      await contextLogout();
      toast.dismiss(loadingToast);
      toast.success('Logged out successfully', {
        duration: 2000,
      });

      setShowLogoutModal(false);

      setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 300);

    } catch (error) {
      console.error('Logout error:', error);
      toast.dismiss(loadingToast);
      toast.error('Logout failed, but clearing session anyway');

      contextLogout();
      setShowLogoutModal(false);
      router.push(ROUTES.HOME);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="w-full bg-primary h-full flex flex-col shadow-2xl lg:shadow-none">
        {/* Logo/Brand + Mobile Close */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
            <p className="text-white/60 text-xs mt-1 truncate max-w-[180px]">
              {professional.business_name}
            </p>
          </div>
          
          {/* Mobile Close Button */}
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all active:scale-[0.98] ${
                activeSection === section.id
                ? 'bg-secondary text-primary font-bold shadow-lg shadow-black/10'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xl grayscale-[0.5] group-hover:grayscale-0">{section.icon}</span>
              <span className="text-sm tracking-wide">{section.name}</span>
            </button>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="p-4 bg-black/10 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="relative">
              <img
                src={professional.logo || professional.user.profile_image || '/default-avatar.png'}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">
                {professional.user.first_name}
              </p>
              <p className="text-white/50 text-[10px] truncate uppercase tracking-widest font-black">
                Professional
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-red-500/20 hover:text-red-200 text-white/70 rounded-xl transition-all text-sm font-medium border border-white/10"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
};