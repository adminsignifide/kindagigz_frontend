// ============================================
// PROFESSIONAL DETAIL PAGE
// ============================================

import React from 'react';
import { Professional } from '@/types';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { ProfessionalHeader } from '@/components/professionals/ProfessionalHeader';
import { ProfessionalHeroClient } from '@/components/professionals/ProfessionalHeroClient';
import { ProfessionalAboutandGallery } from '@/components/professionals/ProfessionalAboutandGallery';
import { ProfessionalOpsTimeandLocation } from '@/components/professionals/ProfessionalOpsTimeandLocation';
import { ProfessionalSimilarServices } from '@/components/professionals/ProfessionalSimilarServices';
import { ProfessionalContactForm } from '@/components/professionals/ProfessionalContactForm';

// Mock data function provided by user
async function getProfessional(id: string): Promise<Professional> {
    return {
        id,
        userId: 'user-1',
        firstName: 'John',
        lastName: 'Kamau',
        title: 'Expert Carpenter & Furniture Maker',
        bio: 'Professional carpenter with 10+ years of experience...',
        about: `I specialize in creating custom furniture pieces...`,
        profileImage: '/professionals/john-kamau.jpg',
        bannerImage: '/professionals/john-kamau-banner.jpg',
        rating: 4.8,
        reviewCount: 127,
        completedJobs: 156,
        responseTime: '2 hours',
        isVerified: true,
        isAvailableNow: true,
        location: {
            lat: -1.2921,
            lng: 36.8219,
            address: '123 Woodwork Lane, Westlands',
            city: 'Nairobi',
            country: 'Kenya',
        },
        services: [
            { id: 's1', name: 'Custom Furniture Making', categoryId: 'cat-1', categoryName: 'Carpentry', description: '...', price: 15000, priceType: 'negotiable' },
            // ... rest of services
        ],
        hourlyRate: 1500,
        currency: 'KES',
        startingPrice: 2500,
        workingHours: {
            monday: { open: '08:00', close: '18:00' },
            tuesday: { open: '08:00', close: '18:00' },
            wednesday: { open: '08:00', close: '18:00' },
            thursday: { open: '08:00', close: '18:00' },
            friday: { open: '08:00', close: '18:00' },
            saturday: { open: '09:00', close: '14:00' },
            sunday: null,
        },
        timezone: 'Africa/Nairobi',
        languages: ['English', 'Swahili'],
        status: 'online',
        gallery: [
            { id: 'g1', url: '/gallery/furniture-1.jpg', type: 'image', caption: 'Custom bookshelf project' },
            { id: 'g2', url: '/gallery/furniture-2.jpg', type: 'image', caption: 'Kitchen cabinets installation' },
            { id: 'g3', url: '/gallery/furniture-3.jpg', type: 'image', caption: 'Dining table set' },
        ],
    };
}

export default async function ProfessionalPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params; // Unwrapping the promise
    const professional = await getProfessional(id);

    return (
        <div className="min-h-screen bg-primary pb-12">
            <Navbar variant="transparent" />
            {/* This is the boundary. We pass DATA (professional) 
         but NOT functions/event-handlers. 
      */}
            <ProfessionalHeroClient professional={professional} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <ProfessionalSimilarServices
                    categoryId={professional.services[0]?.categoryId || 'default'}
                    currentProfessionalId={id}
                />
            </div>
        </div>
    );
}



/*
PROFESSIONAL PAGE STRUCTURE:
============================

1. Hero Section
   - Banner image
   - Profile image (overlapping banner)
   - Name, title, verification badge
   - Stats (rating, jobs, response time)
   - Action buttons (Contact, Request Quote, Save)
   - Navigation tabs (Profile, Reviews)

2. Main Content Section (based on active tab)
   a. Profile Tab:
      - About section
      - Gallery (photos of work)
      - Operational hours
      - Location map
      - Contact form
   
   b. Reviews Tab:
      - Review statistics
      - Filter/sort options
      - List of reviews
      - Pagination

3. Similar Services Section
   - "You May Be Interested In"
   - 3-4 similar service providers
   - Same category or location

4. Footer (from layout)

NEXT STEPS:
===========
Create these component files:
- components/professional/ProfessionalProfile.tsx
- components/professional/ProfessionalReviews.tsx
- components/professional/SimilarServices.tsx
*/