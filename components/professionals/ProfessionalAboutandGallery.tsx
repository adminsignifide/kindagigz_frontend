'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Professional } from '@/types/auth';

export const ProfessionalAboutandGallery: React.FC<{ professional: Professional }> = ({ 
  professional 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* About Section */}
      <Card padding="lg">
        <h2 className="text-xl font-bold mb-4 text-primary">About</h2>

        {/* About Text */}
        <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line mb-6">
          {professional.about}
        </div>
        
        {/* Category & Services */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          {/* Category */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Category
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <span className="text-xl">{professional.category.icon}</span>
              <span className="font-semibold">{professional.category.name}</span>
            </div>
          </div>

          {/* Services */}
          {professional.services.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Services Offered
              </p>
              <div className="flex flex-wrap gap-2">
                {professional.services.map((service) => (
                  <div
                    key={service.id}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    <p className="font-semibold">{service.name}</p>
                    {service.suggested_price_min && service.suggested_price_max && (
                      <p className="text-xs text-gray-500 mt-1">
                        KES {service.suggested_price_min} - {service.suggested_price_max}
                        {service.price_type && ` (${service.price_type})`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {professional.languages.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {professional.languages.map((lang, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {professional.completed_jobs}
                </div>
                <div className="text-xs text-gray-500 mt-1">Completed Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {parseFloat(professional.average_rating).toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {professional.total_reviews}
                </div>
                <div className="text-xs text-gray-500 mt-1">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Gallery Section */}
      {professional.gallery && professional.gallery.length > 0 && (
        <Card padding="lg">
          <h2 className="text-xl font-bold mb-4 text-primary">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {professional.gallery.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
              >
                <Image 
                  src={item.image} // ✅ Changed from url
                  alt={item.caption || 'Gallery image'} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {professional.gallery?.find(item => item.id === selectedImage) && (
                  <img
                    src={professional.gallery.find(item => item.id === selectedImage)!.image}
                    alt="Full size"
                    className="max-w-full max-h-[80vh] rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};