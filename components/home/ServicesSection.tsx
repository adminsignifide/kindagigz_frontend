'use client';

// ============================================
// SERVICES SECTION (HOMEPAGE)
// ============================================

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { MOCK_SERVICE_PROVIDERS } from '@/lib/constants/categories';
import { ServiceProviderCard } from '../services/ServiceProviderCard';

export const ServicesSection: React.FC = () => {
  // Show only first 8 categories on homepage
  const displayedServices = MOCK_SERVICE_PROVIDERS.slice(0, 8);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Services
          </h2>
          <p className="text-lg text-gray-600">
            Browse through our wide range of service categories and find the perfect professional for your needs.
          </p>
        </div>

        {/* Service Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedServices.map((provider) => (
            <ServiceProviderCard 
              key={provider.id} 
              provider={provider} 
            />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center">
          <Link href={ROUTES.SERVICES}>
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