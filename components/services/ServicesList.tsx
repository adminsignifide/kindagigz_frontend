import React from 'react';
import { ServiceProviderCard } from './ServiceProviderCard';
import { ServiceProvider } from '@/types';
import { cn } from '@/lib/utils/cn';

interface ServicesListProps {
  providers: ServiceProvider[];
  showMapView: boolean;
  onClearFilters: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ providers, showMapView, onClearFilters }) => {
  if (providers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
        <button onClick={onClearFilters} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold">
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
        {providers.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
      
      <div className="text-center pt-8">
        <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-semibold">
          Load More Professionals
        </button>
      </div>
    </div>
  );
};