'use client';

import React, { useState } from 'react';
import { Professional } from '@/types/auth';
import { ProfessionalHeader } from './ProfessionalHeader';
import { ProfessionalAboutandGallery } from './ProfessionalAboutandGallery';
import { ProfessionalOpsTimeandLocation } from './ProfessionalOpsTimeandLocation';
import { ProfessionalContactForm } from './ProfessionalContactForm';

export function ProfessionalHeroClient({ professional }: { professional: Professional }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'reviews'>('profile');

  return (
    <>
      <ProfessionalHeader
        professional={professional}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as 'profile' | 'reviews')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProfessionalAboutandGallery professional={professional} />
            </div>
            <div className="space-y-8">
              <ProfessionalOpsTimeandLocation professional={professional} />
              <ProfessionalContactForm professional={professional} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
              Reviews ({professional.total_reviews}) {/* ✅ Fixed field name */}
            </h2>
            <div className="space-y-4">
              {/* Rating Overview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {parseFloat(professional.average_rating).toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(parseFloat(professional.average_rating))
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {professional.total_reviews} reviews
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {professional.completed_jobs} completed jobs
                  </p>
                </div>
              </div>

              {/* Reviews List Placeholder */}
              <p className="text-gray-500 text-center py-8">
                Review list coming soon...
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}