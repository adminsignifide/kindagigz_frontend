'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InteractiveMap } from '../map/InteractiveMap';
import type { Professional } from '@/types/auth';

const CATEGORY_COLORS: Record<string, string> = {
  'Plumbing': '#ef4444', // Red
  'Electrical': '#eab308', // Yellow
  'Cleaning': '#3b82f6', // Blue
  'Gardening': '#22c55e', // Green
  'Default': '#6366f1'    // Indigo
};

interface ServicesMapViewProps {
  professionals: Professional[];
  onClose: () => void;
}

export const ServicesMapView: React.FC<ServicesMapViewProps> = ({ 
  professionals,
  onClose 
}) => {
  const router = useRouter();
  const [selectedProfId, setSelectedProfId] = useState<number | null>(null);

  // Transform Professional data into Map Markers
  const mapMarkers = professionals
    .filter(p => p.latitude && p.longitude)
    .map(p => ({
      id: p.id,
      lat: parseFloat(p.latitude!),
      lng: parseFloat(p.longitude!),
      icon: p.logo || p.user.profile_image || '/default-avatar.png', 
      color: CATEGORY_COLORS[p.category.name] || CATEGORY_COLORS['Default'],
      data: p
    }));

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

      <div className="flex-1">
        <InteractiveMap
          height="520px"
          markers={mapMarkers}
          selectedId={selectedProfId}
          onMarkerClick={(marker) => setSelectedProfId(marker.id as number)}
          onCloseInfoWindow={() => setSelectedProfId(null)}
          renderInfoWindow={(marker) => {
            const prof = marker.data as Professional;
            return (
              <div 
                onClick={() => router.push(`/professionals/${prof.id}`)}
                className="w-[220px] bg-white cursor-pointer group p-1"
              >
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                   <img 
                    src={prof.banner_image || '/api/placeholder/400/200'} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    alt=""
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-primary">
                    {prof.category.name}
                  </div>
                </div>
                
                <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1 group-hover:text-primary">
                  {prof.business_name}
                </h4>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-yellow-500 text-xs">
                    <span>★</span>
                    <span className="font-bold text-gray-700">{parseFloat(prof.average_rating).toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">({prof.total_reviews} reviews)</span>
                </div>

                <button className="w-full py-2 bg-gray-900 text-white text-[10px] rounded font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                  View Profile
                </button>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};