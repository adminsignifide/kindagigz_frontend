import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Professional } from '@/types';
import { DayOfWeek } from '@/types';

export const ProfessionalOpsTimeandLocation: React.FC<{ professional: Professional }> = ({ professional }) => {
  // Simple check for today's hours
  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase() as DayOfWeek;// e.g., 'monday'
  const hoursToday = professional.workingHours[today as keyof typeof professional.workingHours];

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
           <span className={`w-3 h-3 rounded-full ${professional.isAvailableNow ? 'bg-green-500' : 'bg-gray-400'}`}></span>
           <span className="font-bold text-gray-900">{professional.isAvailableNow ? 'Open' : 'Closed'}</span>
        </div>
        <span className="text-xs text-gray-500">
          {hoursToday ? `Hours today: ${hoursToday.open} - ${hoursToday.close}` : 'Closed today'}
        </span>
      </div>

      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Location</p>
        <div className="relative h-48 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
          {/* Map would be integrated here using lat/lng */}
          <div className="text-center p-4">
            <span className="text-2xl mb-2 block">📍</span>
            <p className="text-xs text-gray-500 font-medium">{professional.location.address}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-900">{professional.location.city}, {professional.location.country}</p>
          <div className="mt-3">
            <Button variant="tertiary" className="w-full text-xs py-2">Get Directions</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};