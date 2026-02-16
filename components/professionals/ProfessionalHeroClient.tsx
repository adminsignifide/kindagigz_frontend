'use client';

import React, { useState } from 'react';
import { Professional } from '@/types';
import { ProfessionalHeader } from './ProfessionalHeader';
import { ProfessionalAboutandGallery } from './ProfessionalAboutandGallery';
import { ProfessionalOpsTimeandLocation } from './ProfessionalOpsTimeandLocation';
import { ProfessionalContactForm } from './ProfessionalContactForm';

export function ProfessionalHeroClient({ professional }: { professional: Professional }) {
    const [activeTab, setactiveTab] = useState<'profile' | 'reviews'>('profile');

    return (
        <>
            <ProfessionalHeader
                professional={professional}
                activeTab={activeTab}
                onTabChange={(tab) => setactiveTab(tab as 'profile' | 'reviews')}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'profile' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ProfessionalAboutandGallery professional={professional} />
                        </div>
                        <div className="space-y-8">
                            <ProfessionalOpsTimeandLocation professional={professional} />
                            <ProfessionalContactForm />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Reviews ({professional.review_count})</h2>
                        <p className="text-gray-500">Review list coming soon...</p>
                    </div>
                )}
            </main>
        </>
    );
}