import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Professional } from '@/types';

export const ProfessionalAboutandGallery: React.FC<{ professional: Professional }> = ({ professional }) => {
  // Extract unique category names from services
  const categories = Array.from(new Set(professional.services.map(s => s.categoryName)));

  return (
    <div className="space-y-8">
      {/* About Section */}
      <Card padding="lg">
        <h2 className="text-xl font-bold mb-4 text-primary">About</h2>
        <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line mb-6">
          {professional.about}
        </div>
        
        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Gallery Section */}
      <Card padding="lg">
        <h2 className="text-xl font-bold mb-4 text-primary">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {professional.gallery?.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image 
                src={item.url} 
                alt={item.caption || 'Gallery image'} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};