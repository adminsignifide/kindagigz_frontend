'use client';

// ============================================
// PROFESSIONAL PAGE HEADER SECTION
// ============================================

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface ProfessionalHeaderProps {
  professional: any;
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
      <div className="relative h-50 md:h-80 w-full bg-gray-200 pt-20">
        <Image 
          src={professional.banner_image || '/banner.jpg'} 
          fill 
          className="object-cover" 
          alt="Banner" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Info Row */}
        <div className="relative flex flex-col md:flex-row lg:items-end -mt-16 pb-6 gap-6">
          <div className="relative w-25 h-25 md:w-40 md:h-40 rounded-3xl border lg:border-2 border-secondary bg-gray-400 overflow-hidden shadow-lg">
            <Image 
              src={professional.logo || '/avatar.jpg'} 
              fill 
              className="object-cover" 
              alt="Logo" 
            />
          </div>
          <div className="flex-1 md:pb-2 md:pt-20">
            <h1 className="text-lg lg:text-2xl font-bold text-primary">
              {professional.business_name}
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-gray-600 italic">{professional.tagline}</p>
          </div>
          <div className="flex gap-3 pb-2 md:pt-20 md:pb-10">
            <Button variant="outline" size="sm">Bookmark</Button>
            <Button variant="outline" size="sm">Share</Button>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="flex gap-4 md:gap-8 text-sm font-medium text-gray-500">
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