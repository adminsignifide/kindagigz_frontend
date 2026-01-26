'use client';

// ============================================
// CATEGORIES SECTION (HOMEPAGE)
// ============================================

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { MOCK_CATEGORIES } from '@/lib/constants/categories';

export const CategoriesSection: React.FC = () => {
  // Show only first 8 categories on homepage
  const displayedCategories = MOCK_CATEGORIES.slice(0, 8);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-gray-600">
            Browse through our wide range of service categories and find the perfect professional for your needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`${ROUTES.SERVICES}?tab=categories&category=${category.slug}`}
              className="group"
            >
              <div
                className="relative p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 bg-white"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}15 0%, white 100%)` 
                }}
              >
                {/* Icon */}
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>

                {/* Service Count */}
                <p className="text-sm text-gray-500">
                  {category.serviceCount} professionals
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
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
              Browse All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};