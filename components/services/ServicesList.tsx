import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { ServiceProviderCard } from './ServiceProviderCard';
import { Professional } from '@/types/auth';
import { cn } from '@/lib/utils/cn';

interface ServicesListProps {
  professionals: Professional[];
  isLoading: boolean;
  showMapView: boolean;
  onClearFilters: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ 
  professionals, 
  isLoading,
  showMapView, 
  onClearFilters
}) => {
  if (isLoading) {
    return (
      <div className={cn(
        "grid gap-6",
        showMapView ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      )}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (professionals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
        <button 
          onClick={onClearFilters} 
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className={cn(
        "grid gap-6",
        showMapView ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      )}>
        {professionals.map((professional) => (
          <ServiceProviderCard key={professional.id} professional={professional} />
        ))}
      </div>
      
      {professionals.length > 0 && (
        <div className="text-center pt-8">
          <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-semibold">
            Load More Professionals
          </button>
        </div>
      )}
    </div>
  );
};