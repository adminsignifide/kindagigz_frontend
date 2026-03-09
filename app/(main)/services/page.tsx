'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { FiltersPanel } from '@/components/services/FilterPanel';
import { ServicesList } from '@/components/services/ServicesList';
import { ServicesMapView } from '@/components/services/ServicesMapView';
import { Professional } from '@/types/auth';
import { professionalService } from '@/lib/services/professionalService';
import { getDistanceKm } from '@/lib/utils/location';

export default function ServicesPage() {
  const [showMapView, setShowMapView] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilters, setActiveFilters] = useState<{
    keywords?: string;
    category?: string;
    lat?: number | null,
    lng?: number | null,
    proximity?: number;
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

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...professionals];

    // 1. Keyword Search (Name or Service)
    if (activeFilters.keywords) {
      const query = activeFilters.keywords.toLowerCase().trim();
      
      filtered = filtered.filter(prof => {
        // Human Name checks (nested in user object)
        const firstName = prof.user?.first_name?.toLowerCase() || '';
        const lastName = prof.user?.last_name?.toLowerCase() || '';
        const fullName = `${firstName} ${lastName}`;

        // Business Info checks
        const bizName = prof.business_name?.toLowerCase() || '';
        const tagline = prof.tagline?.toLowerCase() || '';
        const aboutText = prof.about?.toLowerCase() || '';

        // Services check (matching the name of any service they offer)
        const serviceMatch = prof.services?.some(s => 
          s.name.toLowerCase().includes(query) || 
          s.category_name?.toLowerCase().includes(query)
        );

        return (
          bizName.includes(query) ||
          fullName.includes(query) ||
          tagline.includes(query) ||
          aboutText.includes(query) ||
          serviceMatch
        );
      });
    }

    // 2. Category Filter
    if (activeFilters.category) {
      filtered = filtered.filter(prof => 
        prof.category.slug === activeFilters.category
      );
    }

    // 3. Proximity & Location Logic
    if (activeFilters.lat && activeFilters.lng) {
      filtered = filtered.filter(prof => {
        if (!prof.latitude || !prof.longitude) return false;
        
        const distance = getDistanceKm(
          activeFilters.lat!, 
          activeFilters.lng!, 
          parseFloat(prof.latitude), 
          parseFloat(prof.longitude)
        );

        // Attach distance to the object for sorting or display
        prof.distance_km = distance; 

        return distance <= (activeFilters.proximity || 25);
      });

      // Sort by nearest
      filtered.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
    }

    setFilteredProfessionals(filtered);
    setVisibleCount(6);
  }, [activeFilters, professionals]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8  pt-24">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Services</h1>
          <p className="text-white/70">
            {isLoading 
              ? 'Loading professionals...' 
              : `Connecting you with ${filteredProfessionals.length} verified experts.`
            }
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <FiltersPanel 
              onFilterChange={setActiveFilters} 
              onShowMap={() => setShowMapView(!showMapView)} 
              showMapView={showMapView} 
              professionals={professionals}
            />
          </aside>

          {/* Results */}
          <section className={showMapView ? 'lg:col-span-5' : 'lg:col-span-9'}>
            <div className="bg-white rounded-3xl p-6 shadow-xl min-h-[700px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-primary">
                  Results {!isLoading && `(${filteredProfessionals.length})`}
                </h2>
              </div>

              <ServicesList 
                professionals={filteredProfessionals}
                visibleCount={visibleCount}
                onLoadMore={handleLoadMore}
                isLoading={isLoading} 
                showMapView={showMapView} 
                onClearFilters={() => setActiveFilters({})} 
              />
            </div>
          </section>

          {/* Map View */}
          {showMapView && (
            <aside className="lg:col-span-4">
              <ServicesMapView 
                professionals={filteredProfessionals}
                onClose={() => setShowMapView(false)} 
              />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}