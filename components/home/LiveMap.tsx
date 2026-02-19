'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { MOCK_SERVICE_PROVIDERS } from '@/lib/constants/categories';
import { Professional } from '@/types/auth';
import { professionalService } from '@/lib/services/professionalService';
  
export const LiveMapSection: React.FC = () => {
  // Show only first 8 categories on homepage
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<{
    category?: string;
    city?: string;
    minRating?: number;
    priceRange?: [number, number];
  }>({});

  // Fetch professionals on mount
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setIsLoading(true);
        const data = await professionalService.getProfessionals();
        setProfessionals(data);
        setFilteredProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Live Map - Who's Around
          </h2>
          <p className="text-lg text-white/80">
            Browse through nearby services to explore who you ight hire.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          
        </div>

        {/* Browse All Button */}
        <div className="text-center">
          <Link href={`${ROUTES.SERVICES}?tab=categories`}>
            <Button 
              variant="primary" 
              size="lg"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Explore More Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};