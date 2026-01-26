'use client';

// ============================================
// HOMEPAGE HERO SECTION
// ============================================

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-yellow-400 mr-2">✨</span>
              <span className="text-sm font-medium">Connecting Africa's Workforce</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Find Top Tier Pros & Real Jobs.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                Get the job done—locally, reliably
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-purple-100 max-w-xl">
              Connect with verified professionals in your area for any job, big or small. 
              From carpenters to cleaners, find skilled workers ready to help—instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={ROUTES.SERVICES}>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100 w-full sm:w-auto"
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                >
                  Find a Professional
                </Button>
              </Link>

              <Link href={ROUTES.SIGNUP}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                >
                  Become a Professional
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 text-sm">
              <div>
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-purple-200">Active Professionals</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-purple-200">Jobs Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-purple-200">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Placeholder for professional cards showcase */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/20 rounded-lg p-4 flex items-center space-x-4 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400" />
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-white/20 rounded w-1/2" />
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                ))}
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold shadow-lg">
                Verified ✓
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-purple-900 px-4 py-2 rounded-full font-semibold shadow-lg">
                Available Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};