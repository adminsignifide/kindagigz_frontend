'use client';

// ============================================
// CATEGORIES SECTION - UPDATED
// ============================================

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';
import { MOCK_CATEGORIES } from '@/lib/constants/categories';

export const CategoriesSection: React.FC = () => {
  // Show only first 8 categories on homepage
  const displayedCategories = MOCK_CATEGORIES.slice(0, 8);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-white/80">
            Browse through our wide range of service categories and find the perfect professional for your needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`${ROUTES.SERVICES}?tab=categories&category=${category.slug}`}
            >
              <Card
                variant="purple-border"
                hoverable
                className="group h-full relative"
              >
                {/* Icon */}
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>

                {/* Category Name */}
                <CardTitle variant="light" className="mb-1 group-hover:text-secondary transition-colors">
                  {category.name}
                </CardTitle>

                {/* Service Count */}
                <CardDescription variant="light" className="text-white/70">
                  {category.serviceCount} professionals
                </CardDescription>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-secondary"
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
              </Card>
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

/*
CHANGES MADE:
=============

1. ✅ Background: bg-primary (#3B3B6B - Dark blue)
2. ✅ Cards: variant="purple-border" (#4F4F7C with #FBD430 border)
3. ✅ Text: White text for visibility on dark background
4. ✅ CardTitle/CardDescription: variant="light" for white text
5. ✅ Hover arrow: text-secondary (yellow) instead of purple
6. ✅ Removed gradient backgrounds from individual cards
7. ✅ Category name hovers to yellow (text-secondary)
8. ✅ Button: variant="primary" (yellow button)

STYLING NOTES:
==============

Purple Cards (#4F4F7C):
- Background is slightly lighter than primary (#3B3B6B)
- Creates nice depth on primary background
- Yellow border (#FBD430) provides strong contrast
- White text is easily readable

Hover Effects:
- Icon scales up
- Category name turns yellow
- Arrow appears
- Card elevates with shadow
- Border gets slightly more transparent

Responsive:
- 2 columns on mobile
- 3 columns on tablet
- 4 columns on desktop
*/