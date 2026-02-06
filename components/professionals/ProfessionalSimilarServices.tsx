'use client';

import React from 'react';
import { ServiceProviderCard } from '@/components/services/ServiceProviderCard';

export const ProfessionalSimilarServices = ({ categoryId, currentProfessionalId }: { categoryId: string, currentProfessionalId: string }) => {
  // In reality, this would fetch from your API based on categoryId
  const mockSimilarProviders = [
    {
      id: 'p2',
      professionalName: 'Jane Wanjiku',
      categoryName: 'Carpentry',
      description: 'Custom kitchen cabinets and modern home wood finishes.',
      banner: '/placeholders/banner-2.jpg',
      logo: '/placeholders/logo-2.jpg',
      // ... other fields
    },
    // ... add 2 more
  ];

  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-10 text-primary">You May Be Interested In</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockSimilarProviders.map((p: any) => (
          <ServiceProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </section>
  );
};