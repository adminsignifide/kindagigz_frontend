// ============================================
// WHY KINDAGIGZ SECTION - UPDATED
// ============================================

import React from 'react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: '🎯',
    title: 'Verified Professionals',
    description: 'Every professional is ID-verified and background-checked for your safety and peace of mind.',
  },
  {
    icon: '📍',
    title: 'Local & Reliable',
    description: 'Find skilled workers in your neighborhood. Get jobs done quickly with professionals nearby.',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Safe and secure payment processing. Your money is protected until the job is complete.',
  },
  {
    icon: '📱',
    title: 'Easy Booking',
    description: 'Book services in minutes from your phone or computer. It\'s that simple.',
  },
];

export const WhyKindaGigz: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-primary">KindaGigz</span>?
          </h2>
          <p className="text-sm lg:text-lg text-gray-600">
            We're building the future of work in Africa by connecting skilled professionals 
            with people who need their services—fast, fair, and hassle-free.
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              variant="gray"
              hoverable
              className="group flex flex-row items-center"
            >
              <div className="text-2xl lg:text-4xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xs md:text-md lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              {/*  <p className="text-sm text-gray-700">
                {feature.description}
              </p> */}
            </Card>
          ))}
        </div>

        {/* Stats Bar */}
        {/* <div className="mt-12 lg:mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center text-white">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">150+</div>
              <div className="text-sm lg:text-base text-white/80">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">10K+</div>
              <div className="text-sm lg:text-base text-white/80">Active Professionals</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">50K+</div>
              <div className="text-sm lg:text-base text-white/80">Successful Jobs</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">98%</div>
              <div className="text-sm lg:text-base text-white/80">Client Satisfaction</div>
            </div>
          </div>
        </div>  */}
      </div>
    </section>
  );
};

/*
RESPONSIVE DESIGN:
==================

MOBILE (< 768px):
- 2 columns grid (grid-cols-2)
- Smaller gaps (gap-4)
- Smaller text sizes
- Stats in 2 rows (2x2 grid)

TABLET (768px - 1024px):
- Still 2 columns
- Stats in 1 row (4 columns)

DESKTOP (1024px+):
- 3 columns (lg:grid-cols-3)
- Larger gaps (lg:gap-6)
- Larger text sizes
- Stats in 1 row with more spacing

CHANGES MADE:
=============
1. ✅ Cards now use variant="gray" (#D9D9D9 background)
2. ✅ Mobile: 2 cards per row instead of 1
3. ✅ Updated brand colors (purple → primary)
4. ✅ Stats bar uses primary gradient
5. ✅ Stats numbers now in secondary color (yellow)
6. ✅ Responsive padding and spacing
*/