'use client';

import React from 'react';
import type { Professional } from '@/types/auth';

interface ServicesMapViewProps {
  professionals: Professional[];
  onClose: () => void;
}

export const ServicesMapView: React.FC<ServicesMapViewProps> = ({ 
  professionals,
  onClose 
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sticky top-24 h-[600px] border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary">Map View</h3>
          <p className="text-xs text-gray-500">
            Showing {professionals.length} professional{professionals.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close map"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Map Container */}
      <div className="h-[520px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-700 font-semibold text-lg mb-2">
            Interactive Map Coming Soon
          </p>
          <p className="text-sm text-gray-600 mb-6">
            View professional locations on an interactive map
          </p>

          {/* Professionals List Preview */}
          {professionals.length > 0 && (
            <div className="mt-6 max-w-sm mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-700 mb-3">
                  Professionals in this area:
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {professionals.slice(0, 5).map((prof) => (
                    <div 
                      key={prof.id}
                      className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm"
                    >
                      {/* Avatar */}
                      {prof.logo || prof.user.profile_image ? (
                        <img
                          src={prof.logo || prof.user.profile_image || ''}
                          alt={prof.business_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {prof.business_name.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {prof.business_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {prof.user.city}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-gray-700">
                          {parseFloat(prof.average_rating).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {professionals.length > 5 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      +{professionals.length - 5} more
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Map Integration Info */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-xs text-gray-500">
              Map will show exact locations, distance calculations, and route planning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};