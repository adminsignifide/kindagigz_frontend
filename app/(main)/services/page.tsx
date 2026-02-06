'use client';

// ============================================
// SERVICES PAGE (EXPLORE) - COMPLETE
// ============================================

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { FiltersPanel } from '@/components/services/FilterPanel';
import { ServicesList } from '@/components/services/ServicesList';
import { ServicesMapView } from '@/components/services/ServicesMapView';
import { ProfessionalCard } from '@/components/services/ProfessionalCard';
import { Professional, ServiceProvider } from '@/types';

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
  const [showMapView, setShowMapView] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});

  // Adapter: Transforming Professional data to ServiceProvider format
  const serviceProviders = useMemo(() => {
    return MOCK_PROFESSIONALS.map((pro): ServiceProvider => ({
      id: pro.id,
      professionalName: `${pro.firstName} ${pro.lastName}`,
      serviceName: pro.services[0]?.name || 'Professional Service',
      banner: pro.bannerImage || '',
      logo: pro.profileImage || '',
      description: pro.bio,
      catchphrase: pro.title,
      categoryId: pro.services[0]?.categoryId || '',
      categoryName: pro.services[0]?.categoryName || 'Expert',
      price: pro.startingPrice,
      priceType: pro.services[0]?.priceType || 'negotiable',
      location: pro.location,
      openHours: pro.workingHours,
      rating: pro.rating,
      reviewCount: pro.reviewCount,
      isVerified: pro.isVerified,
      isAvailableNow: pro.isAvailableNow,
      currency: pro.currency,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar variant='transparent'/>
      
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8  pt-24">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Services</h1>
          <p className="text-white/70">Connecting you with {serviceProviders.length} verified experts.</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <FiltersPanel 
              onFilterChange={setActiveFilters} 
              onShowMap={() => setShowMapView(!showMapView)} 
              showMapView={showMapView} 
            />
          </aside>

          {/* Results */}
          <section className={showMapView ? 'lg:col-span-5' : 'lg:col-span-9'}>
            <div className="bg-white rounded-3xl p-6 shadow-xl min-h-[700px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-primary">Results</h2>
                <select className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-secondary">
                  <option>Most Relevant</option>
                  <option>Highest Rated</option>
                </select>
              </div>

              <ServicesList 
                providers={serviceProviders} 
                showMapView={showMapView} 
                onClearFilters={() => setActiveFilters({})} 
              />
            </div>
          </section>

          {/* Map View */}
          {showMapView && (
            <aside className="lg:col-span-4">
              <ServicesMapView onClose={() => setShowMapView(false)} />
            </aside>
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