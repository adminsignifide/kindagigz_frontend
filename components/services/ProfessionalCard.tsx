import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Professional } from '@/types';

interface ProfessionalCardProps {
  professional: Professional;
  onClick?: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onClick,
}) => {
  const {
    firstName,
    lastName,
    title,
    rating,
    reviewCount,
    completedJobs,
    isVerified,
    isAvailableNow,
    location,
    startingPrice,
    currency,
    responseTime,
  } = professional;

  return (
    <Card
      variant="elevated"
      hoverable
      onClick={onClick}
      className="flex flex-col gap-4"
    >
      {/* Header */}
      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Avatar placeholder */}
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            {firstName[0]}
            {lastName[0]}
          </div>

          <div className="flex-1">
            <CardTitle>
              {firstName} {lastName}
              {isVerified && (
                <span className="ml-2 text-xs bg-secondary text-primary px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </CardTitle>

            <CardDescription>{title}</CardDescription>

            <div className="mt-1 text-xs text-gray-500">
              {location.city} • {location.distance} km away
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Meta */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>⭐ {rating} ({reviewCount})</span>
        <span>{completedJobs} jobs</span>
        <span>{responseTime}</span>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isAvailableNow
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isAvailableNow ? 'Available now' : 'Unavailable'}
        </span>

        {startingPrice && (
          <span className="font-semibold text-primary">
            From {currency} {startingPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Footer */}
      <CardFooter>
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
          View Profile
        </button>
      </CardFooter>
    </Card>
  );
};
