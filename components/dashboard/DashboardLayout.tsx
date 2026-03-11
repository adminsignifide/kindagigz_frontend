'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardGreeting } from './DashboardGreetings';
import { Overview } from './sections/Overview';
import { Bookings } from './sections/Bookings';
import { Schedule } from './sections/Schedule';
import { Messages } from './sections/Messages';
import { Clients } from './sections/Clients';
import { Reviews } from './sections/Reviews';
import { Payments } from './sections/Payments';
import { Analytics } from './sections/Analytics';
import { Settings } from './sections/Settings';
import type { Professional } from '@/types/auth';
import { Navbar } from '../layout/Navbar/Navbar';
import { cn } from '@/lib/utils/cn';


interface DashboardLayoutProps {
  professional: Professional;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ professional }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sectionNames: Record<string, string> = {
    overview: 'Overview',
    bookings: 'Bookings',
    schedule: 'Schedule',
    messages: 'Messages',
    clients: 'Clients',
    reviews: 'Reviews',
    payments: 'Payments',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview professional={professional} />;
      case 'bookings':
        return <Bookings />;
      case 'schedule':
        return <Schedule professional={professional} />;
      case 'messages':
        return <Messages />;
      case 'clients':
        return <Clients />;
      case 'reviews':
        return <Reviews professional={professional} />;
      case 'payments':
        return <Payments />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings professional={professional} />;
      default:
        return <Overview professional={professional} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Mobile Sidebar Overlay (Backdrop) */}
      <div 
        className={cn(
          "fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* 2. Sidebar (Desktop Sidebar + Mobile Drawer) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <DashboardSidebar
          professional={professional}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsSidebarOpen(false); // Close drawer on selection
          }}
          onClose={() => setIsSidebarOpen(false)}
        />
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        {/* Mobile-Only Sticky Sub-Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="font-bold text-gray-900">{sectionNames[activeSection]}</h2>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-primary transition-colors"
          >
            <span>Switch</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Greeting - Smaller padding on mobile */}
          <div className="p-4 md:p-6">
            <DashboardGreeting professional={professional} />
          </div>

          {/* Section Content */}
          <div className="px-4 md:px-6 pb-12">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};