import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Professional } from '@/types/auth';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

interface ServiceProviderCardProps {
  professional: Professional;
  className?: string;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  professional,
  className,
}) => {
  const professionalName = `${professional.user.first_name} ${professional.user.last_name}`;
  const banner = professional.banner_image;
  const logo = professional.logo || professional.user.profile_image;
  const description = professional.tagline || professional.about;
  const categoryName = professional.category.name;
  const categoryIcon = professional.category.icon;

  return (
    <Link href={ROUTES.PROFESSIONAL(professional.id.toString())} className="block">
      <Card
        variant="default"
        padding="none"
        hoverable
        className={cn('overflow-hidden flex flex-col h-full border-gray-200', className)}
      >
        {/* 1. Banner Image */}
        <div className="relative h-32 bg-slate-500 overflow-hidden">
          <Image
            src={banner || '/placeholder-banner.jpg'}
            alt="banner"
            fill
            className="object-cover"
          />
        </div>

        {/* 2. Overlapping Logo */}
        <div className="relative px-4">
          <div className="absolute -top-10 left-4 w-20 h-20 rounded-full border-2 border-black bg-slate-500 overflow-hidden shadow-sm">
            <Image
              src={logo || '/placeholder-logo.jpg'}
              alt="logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 3. Content Section */}
        <div className="pt-12 p-4 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-black mb-1">
            {professionalName}
          </h3>
          <p className="text-sm text-gray-600 mb-6 line-clamp-2">
            {description}
          </p>

          {/* 4. Footer (Category & Bookmark) */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Category Icon Placeholder */}
              <div className="w-8 h-8 rounded-lg bg-[#3F3F66] flex items-center justify-center">
                <div className="w-4 h-4 bg-white/20 rounded-sm" />
                {categoryIcon}
              </div>
              <span className="text-sm font-medium text-black">
                {categoryName}
              </span>
            </div>

            {/* Services - Show first 2 */}
            {professional.services.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {professional.services.slice(0, 2).map((service) => (
                  <span
                    key={service.id}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    {service.name}
                  </span>
                ))}
                {professional.services.length > 2 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                    +{professional.services.length - 2} more
                  </span>
                )}
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Bookmarked:', professional.id);
              }}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};