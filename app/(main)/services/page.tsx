'use client';

// ============================================
// SERVICES PAGE (EXPLORE) - COMPLETE
// ============================================

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { FiltersPanel } from '@/components/services/FilterPanel';
import { ProfessionalCard } from '@/components/services/ProfessionalCard';
import { Professional } from '@/types';

// Mock professionals data
const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-1',
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Kamau',
    title: 'Expert Carpenter & Furniture Maker',
    bio: 'Professional carpenter with 10+ years experience',
    rating: 4.8,
    reviewCount: 127,
    completedJobs: 156,
    responseTime: '2 hours',
    isVerified: true,
    isAvailableNow: true,
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: 'Westlands, Nairobi',
      city: 'Nairobi',
      country: 'Kenya',
      distance: 3.2,
    },
    services: [
      { id: 's1', name: 'Furniture Assembly', categoryId: 'cat-1', categoryName: 'Carpentry', description: '', priceType: 'fixed' },
      { id: 's2', name: 'Custom Cabinets', categoryId: 'cat-1', categoryName: 'Carpentry', description: '', priceType: 'fixed' },
    ],
    startingPrice: 2500,
    currency: 'KES',
    workingHours: {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: null,
        sunday: null,
    },
    timezone: 'Africa/Nairobi',
    languages: ['English', 'Swahili'],
    status: 'online',
  },
  {
    id: 'pro-2',
    userId: 'user-2',
    firstName: 'Mary',
    lastName: 'Wanjiku',
    title: 'Licensed Electrician',
    bio: 'Certified electrician specializing in home wiring',
    rating: 4.9,
    reviewCount: 203,
    completedJobs: 245,
    responseTime: '1 hour',
    isVerified: true,
    isAvailableNow: false,
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: 'Kilimani, Nairobi',
      city: 'Nairobi',
      country: 'Kenya',
      distance: 5.1,
    },
    services: [
      { id: 's3', name: 'Home Wiring', categoryId: 'cat-2', categoryName: 'Electrical', description: '', priceType: 'hourly' },
    ],
    startingPrice: 3000,
    currency: 'KES',
    workingHours: {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: null,
        sunday: null,
    },
    timezone: 'Africa/Nairobi',
    languages: ['English', 'Swahili'],
    status: 'online',
  },
  // Add more mock data as needed
];

export default function ServicesPage() {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [showMapView, setShowMapView] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    // TODO: Filter professionals based on filters
    console.log('Filters changed:', filters);
  };

  const toggleMapView = () => {
    setShowMapView(!showMapView);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Explore Services
          </h1>
          <p className="text-white/80">
            Find verified professionals for any job. {professionals.length} professionals available.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <FiltersPanel
              onFilterChange={handleFilterChange}
              onShowMap={toggleMapView}
              showMapView={showMapView}
            />
          </div>

          {/* Results Section */}
          <div className={showMapView ? 'lg:col-span-5' : 'lg:col-span-9'}>
            <div className="bg-white rounded-2xl p-6 min-h-[600px]">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    {professionals.length} Professionals Found
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing results {activeFilters.location ? `near ${activeFilters.location}` : 'in Nairobi'}
                  </p>
                </div>

                {/* Sort Dropdown */}
                <select className="px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none text-sm">
                  <option>Most Relevant</option>
                  <option>Highest Rated</option>
                  <option>Nearest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* Professionals Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {professionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>

              {/* Load More */}
              {professionals.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
                    Load More Professionals
                  </button>
                </div>
              )}

              {/* Empty State */}
              {professionals.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={() => handleFilterChange({})}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Map View */}
          {showMapView && (
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 sticky top-24 h-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Map View</h3>
                  <button
                    onClick={toggleMapView}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Map Placeholder */}
                <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🗺️</div>
                    <p className="text-gray-600 mb-4">Interactive map coming soon</p>
                    <p className="text-sm text-gray-500">
                      This will show professionals' locations on a map
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/*
SERVICES PAGE STRUCTURE:
========================

1. LAYOUT:
   - Primary background (#3B3B6B)
   - White content containers with rounded corners
   - Small vertical margin (py-6)

2. GRID SYSTEM:
   - 3 columns on desktop: Filters (3) | Results (5/9) | Map (4/hidden)
   - Filters: Sticky sidebar, always visible
   - Results: Main content area, scrollable
   - Map: Toggleable, sticky when shown

3. FILTERS:
   - Two tabs: "Filters" (default) and "Categories"
   - Comprehensive search options
   - "Show on Map" button toggles map view
   
4. RESULTS:
   - Grid of professional cards (2-3 columns based on map visibility)
   - Sort dropdown
   - Load more functionality
   - Empty state with clear filters button

5. MAP VIEW:
   - Toggle on/off with button in filters
   - Sticky position
   - Shows professionals' locations
   - Can be closed with X button

RESPONSIVE BEHAVIOR:
====================
- Mobile: Stack vertically (Filters → Results)
- Tablet: 2 columns (Filters | Results)
- Desktop: 3 columns when map shown, 2 when hidden
*/