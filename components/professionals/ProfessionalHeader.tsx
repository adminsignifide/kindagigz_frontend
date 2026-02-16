'use client';

// ============================================
// PROFESSIONAL PAGE HEADER SECTION
// ============================================

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface ProfessionalHeaderProps {
  professional: any; // Ideally use the Professional type from your types file
  activeTab: 'profile' | 'reviews';
  onTabChange: (tab: 'profile' | 'reviews') => void;
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ 
  professional, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Banner */}
      <div className="relative h-80 w-full bg-gray-200 pt-20">
        <Image 
          src={professional.banner_image || '/banner.jpg'} 
          fill 
          className="object-cover" 
          alt="Banner" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Info Row */}
        <div className="relative flex flex-col md:flex-row items-end -mt-16 pb-6 gap-6">
          <div className="relative w-40 h-40 rounded-3xl border-4 border-white bg-gray-400 overflow-hidden shadow-lg">
            <Image 
              src={professional.profile_image || '/avatar.jpg'} 
              fill 
              className="object-cover" 
              alt="Logo" 
            />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-[#4F4F7C]">
              {professional.first_name} {professional.last_name}
            </h1>
            <p className="text-gray-600 italic">{professional.title}</p>
          </div>
          <div className="flex gap-3 pb-2">
            <Button variant="outline" size="sm">Bookmark</Button>
            <Button variant="outline" size="sm">Share</Button>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <button
            onClick={() => onTabChange('profile')}
            className={cn(
              "pb-4 transition-all",
              activeTab === 'profile' 
                ? "text-secondary border-b-2 border-secondary" 
                : "hover:text-primary"
            )}
          >
            About
          </button>
          
          {/* Note: Portfolio and Services are placeholders in this current logic */}
          <span className="pb-4 text-gray-300 cursor-not-allowed">Portfolio</span>
          <span className="pb-4 text-gray-300 cursor-not-allowed">Services & Pricing</span>

          <button
            onClick={() => onTabChange('reviews')}
            className={cn(
              "pb-4 transition-all",
              activeTab === 'reviews' 
                ? "text-secondary border-b-2 border-secondary" 
                : "hover:text-primary"
            )}
          >
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
};