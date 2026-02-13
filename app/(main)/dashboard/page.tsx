// ============================================
// Dashboard PAGE
// ============================================

import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Content Container */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              User Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The content of this page are coming soon. 
            </p>
          </div>

          
        </div>
      </main>
    </div>
  );
}