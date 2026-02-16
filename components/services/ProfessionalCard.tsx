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
    first_name,
    last_name,
    title,
    rating,
    review_count,
    completed_jobs,
    is_verified,
    is_available_now,
    location,
    starting_price,
    currency,
    response_time,
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
            {first_name[0]}
            {last_name[0]}
          </div>

          <div className="flex-1">
            <CardTitle>
              {first_name} {last_name}
              {is_verified && (
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
        <span>⭐ {rating} ({review_count})</span>
        <span>{completed_jobs} jobs</span>
        <span>{response_time}</span>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            is_available_now
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {is_available_now ? 'Available now' : 'Unavailable'}
        </span>

        {starting_price && (
          <span className="font-semibold text-primary">
            From {currency} {starting_price.toLocaleString()}
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
