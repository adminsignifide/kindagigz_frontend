'use client';

// ============================================
// SERVICES FILTERS PANEL - COMPREHENSIVE
// ============================================

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_CATEGORIES } from '@/lib/constants/categories';

interface FiltersPanelProps {
  onFilterChange: (filters: any) => void;
  onShowMap: () => void;
  showMapView: boolean;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ 
  onFilterChange, 
  onShowMap,
  showMapView 
}) => {
  const [activeTab, setActiveTab] = useState<'filters' | 'categories'>('filters');
  const [filters, setFilters] = useState({
    keywords: '',
    category: '',
    location: '',
    proximity: 10, // km
    priceRange: [0, 100000] as [number, number],
    rating: 0,
    availability: 'all' as 'all' | 'available',
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      keywords: '',
      category: '',
      location: '',
      proximity: 10,
      priceRange: [0, 100000] as [number, number],
      rating: 0,
      availability: 'all' as 'all' | 'available',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card variant="default" padding="lg" className="sticky top-24">
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('filters')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'filters'
              ? 'bg-secondary text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Filters
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'categories'
              ? 'bg-secondary text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Categories
        </button>
      </div>

      {activeTab === 'filters' ? (
        <div className="space-y-6">
          {/* Keywords Search */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              What are you looking for?
            </label>
            <input
              type="text"
              value={filters.keywords}
              onChange={(e) => handleFilterChange('keywords', e.target.value)}
              placeholder="e.g., plumber, electrician..."
              className="w-full px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
            >
              <option value="">All Categories</option>
              {MOCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Where to look
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Enter location..."
                className="flex-1 px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Get user's current location
                  handleFilterChange('location', 'Nairobi, Kenya');
                }}
              >
                📍
              </Button>
            </div>
          </div>

          {/* Proximity */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Proximity: {filters.proximity} km
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.proximity}
              onChange={(e) => handleFilterChange('proximity', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Price Range (KES)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                placeholder="Min"
                className="px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                placeholder="Max"
                className="px-4 py-2 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                    filters.rating === rating
                      ? 'border-secondary bg-secondary/10 text-primary font-semibold'
                      : 'border-card-border hover:border-secondary/50'
                  }`}
                >
                  {rating}⭐
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Availability
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleFilterChange('availability', 'all')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                  filters.availability === 'all'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-card-border hover:border-primary/50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('availability', 'available')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                  filters.availability === 'available'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-card-border hover:border-primary/50'
                }`}
              >
                🟢 Available Now
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
            <Button
              variant="tertiary"
              size="md"
              className="w-full"
              onClick={onShowMap}
            >
              {showMapView ? '📋 Hide Map' : '🗺️ Show on Map'}
            </Button>
          </div>
        </div>
      ) : (
        // Categories Tab
        <div className="space-y-3">
          {MOCK_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                handleFilterChange('category', category.id);
                setActiveTab('filters');
              }}
              className="w-full p-4 rounded-lg border-2 border-card-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-primary">{category.name}</div>
                  <div className="text-sm text-gray-600">
                    {category.serviceCount} professionals
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};