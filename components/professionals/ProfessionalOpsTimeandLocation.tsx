'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InteractiveMap, MapMarker } from '../map/InteractiveMap';
import { Professional } from '@/types/auth';
import type { DayOfWeek } from '@/types';
import { cn } from '@/lib/utils/cn';

export const ProfessionalOpsTimeandLocation: React.FC<{ professional: Professional }> = ({ 
  professional 
}) => {
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  // Get current day of week
  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase() as DayOfWeek;

  const hoursToday = professional.working_hours[today];

  const isCurrentlyOpen = () => {
    if (!hoursToday || !professional.is_available) return false;
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return currentTime >= hoursToday.open && currentTime <= hoursToday.close;
  };

  const currentlyOpen = isCurrentlyOpen();
  const daysOfWeek: DayOfWeek[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const lat = parseFloat(professional.latitude);
  const lng = parseFloat(professional.longitude);

  const professionalMarker: MapMarker[] = useMemo(() => {
    if (isNaN(lat) || isNaN(lng)) return [];

    return [{
      id: professional.id,
      lat: lat,
      lng: lng,
      title: professional.business_name || professional.user.first_name,
      icon: professional.logo || professional.user.profile_image || null,
      data: professional
    }];
  }, [professional, lat, lng]);

  return (
    <div className="space-y-6">
      {/* Availability Status */}
      <Card padding="lg" className="overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full animate-pulse ${currentlyOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-bold text-gray-900 block">
                {currentlyOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="text-xs text-gray-500">
                Today: {hoursToday ? `${hoursToday.open} - ${hoursToday.close}` : 'Closed'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsHoursExpanded(!isHoursExpanded)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg 
              className={cn("w-5 h-5 text-gray-500 transition-transform duration-300", isHoursExpanded ? "rotate-180" : "")} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Working Hours */}
        <div className={cn(
          "grid transition-all duration-300 ease-in-out",
          isHoursExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}>
          <div className="overflow-hidden space-y-1 border-t border-gray-100 pt-4">
            {daysOfWeek.map((day) => {
              const hours = professional.working_hours[day];
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={cn(
                    "flex justify-between items-center py-2 px-3 rounded-lg transition-colors",
                    isToday ? "bg-primary/5 border border-primary/10" : "hover:bg-gray-50"
                  )}
                >
                  <span className={cn("text-xs capitalize", isToday ? "font-bold text-primary" : "text-gray-600")}>
                    {day}
                  </span>
                  <span className={cn("text-xs", isToday ? "font-bold text-primary" : "text-gray-500")}>
                    {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Time Indicator */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">
              Responds within <span className="font-semibold text-primary">{professional.response_time}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Interactive Location Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Service Location
          </p>
          <h4 className="text-sm font-semibold text-gray-900 mt-1">{professional.address}</h4>
        </div>
        
        {/* Interactive Map Integration */}
        <div className="h-64 w-full bg-gray-100">
          {(!isNaN(lat) && !isNaN(lng)) ? (
            <InteractiveMap 
              markers={professionalMarker}
              center={{ lat, lng }}
              zoom={14}
              height="100%"
              onMarkerClick={() => {}}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-3xl mb-2">📍</span>
              <p className="text-xs">Location coordinates not available</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-white space-y-4">
          {/* Service Radius */}
          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <span className="text-xs text-blue-900 block font-semibold">Service Radius</span>
                <span className="text-[10px] text-blue-700">{professional.service_radius_km} km around {professional.user.city}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="primary" 
              className="text-xs py-2"
              onClick={() => {
                const query = encodeURIComponent(professional.address);
                window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
              }}
            >
              Directions
            </Button>
            
            <Button 
              variant="outline" 
              className="text-xs py-2"
              onClick={() => window.location.href = `tel:${professional.user.phone}`}
            >
              Call Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};