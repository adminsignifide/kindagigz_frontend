'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Professional } from '@/types/auth';
import type { DayOfWeek } from '@/types';

export const ProfessionalOpsTimeandLocation: React.FC<{ professional: Professional }> = ({ 
  professional 
}) => {
  // Get today's day of week
  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase() as DayOfWeek;

  const hoursToday = professional.working_hours[today];

  // Check if currently open (basic version)
  const isCurrentlyOpen = () => {
    if (!hoursToday || !professional.is_available) return false;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return currentTime >= hoursToday.open && currentTime <= hoursToday.close;
  };

  const currentlyOpen = isCurrentlyOpen();

  // All days for display
  const daysOfWeek: DayOfWeek[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  return (
    <div className="space-y-6">
      {/* Availability Status */}
      <Card padding="lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${currentlyOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <div>
              <span className="font-bold text-gray-900 block">
                {currentlyOpen ? 'Open Now' : 'Closed'}
              </span>
              {hoursToday && (
                <span className="text-xs text-gray-500">
                  Today: {hoursToday.open} - {hoursToday.close}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Working Hours
          </p>
          <div className="space-y-2">
            {daysOfWeek.map((day) => {
              const hours = professional.working_hours[day];
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                    isToday ? 'bg-primary/5 border border-primary/20' : ''
                  }`}
                >
                  <span className={`text-sm capitalize ${isToday ? 'font-semibold text-primary' : 'text-gray-700'}`}>
                    {day}
                  </span>
                  <span className={`text-sm ${isToday ? 'font-semibold text-primary' : 'text-gray-600'}`}>
                    {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">
              Responds within <span className="font-semibold text-primary">{professional.response_time}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Location */}
      <Card padding="lg">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Location
        </p>
        
        {/* Map Placeholder */}
        <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
          <div className="text-center p-4">
            <span className="text-4xl mb-2 block">📍</span>
            <p className="text-sm font-medium text-gray-700">
              {professional.address}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {professional.user.city}, {professional.user.country}
            </p>
          </div>
        </div>

        {/* Service Radius */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-blue-700">
              Services within <span className="font-semibold">{professional.service_radius_km} km</span> radius
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => {
              // Open in maps app
              const query = encodeURIComponent(professional.address);
              window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // Call phone number
              window.location.href = `tel:${professional.user.phone}`;
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {professional.user.first_name}
          </Button>
        </div>
      </Card>
    </div>
  );
};