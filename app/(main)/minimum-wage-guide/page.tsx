
import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { WageCategory } from '@/types';

// Mock data - replace with actual wage data
const wageCategories: WageCategory[] = [
  {
    category: 'Construction & Carpentry',
    icon: '🔨',
    services: [
      { name: 'General Carpenter', min_hourly: 500, max_hourly: 1200, currency: 'KES' },
      { name: 'Furniture Assembly', min_fixed: 1500, max_fixed: 5000, currency: 'KES' },
      { name: 'Cabinet Installation', min_hourly: 800, max_hourly: 1500, currency: 'KES' },
      { name: 'Door/Window Installation', min_fixed: 2000, max_fixed: 8000, currency: 'KES' },
    ],
  },
  {
    category: 'Electrical Services',
    icon: '⚡',
    services: [
      { name: 'Licensed Electrician', min_hourly: 800, max_hourly: 2000, currency: 'KES' },
      { name: 'Wiring/Rewiring', min_fixed: 5000, max_fixed: 50000, currency: 'KES' },
      { name: 'Appliance Installation', min_fixed: 1000, max_fixed: 3000, currency: 'KES' },
      { name: 'Electrical Repairs', min_hourly: 600, max_hourly: 1500, currency: 'KES' },
    ],
  },
  {
    category: 'Plumbing',
    icon: '🔧',
    services: [
      { name: 'Licensed Plumber', min_hourly: 600, max_hourly: 1500, currency: 'KES' },
      { name: 'Pipe Repair/Replacement', min_fixed: 2000, max_fixed: 15000, currency: 'KES' },
      { name: 'Drain Cleaning', min_fixed: 1500, max_fixed: 5000, currency: 'KES' },
      { name: 'Water Heater Installation', min_fixed: 3000, max_fixed: 10000, currency: 'KES' },
    ],
  },
  {
    category: 'Cleaning Services',
    icon: '🧹',
    services: [
      { name: 'House Cleaning (hourly)', min_hourly: 300, max_hourly: 800, currency: 'KES' },
      { name: 'Deep Cleaning', min_fixed: 5000, max_fixed: 20000, currency: 'KES' },
      { name: 'Office Cleaning', min_hourly: 400, max_hourly: 1000, currency: 'KES' },
      { name: 'Move-in/out Cleaning', min_fixed: 8000, max_fixed: 30000, currency: 'KES' },
    ],
  },
  {
    category: 'Moving & Delivery',
    icon: '📦',
    services: [
      { name: 'Local Moving (per hour)', min_hourly: 1500, max_hourly: 3000, currency: 'KES' },
      { name: 'Long Distance Moving', min_fixed: 15000, max_fixed: 100000, currency: 'KES' },
      { name: 'Furniture Delivery', min_fixed: 1000, max_fixed: 10000, currency: 'KES' },
      { name: 'Packing Services', min_hourly: 400, max_hourly: 1000, currency: 'KES' },
    ],
  },
  {
    category: 'Painting & Decoration',
    icon: '🎨',
    services: [
      { name: 'Interior Painting (per sqm)', min_fixed: 150, max_fixed: 400, currency: 'KES' },
      { name: 'Exterior Painting (per sqm)', min_fixed: 200, max_fixed: 500, currency: 'KES' },
      { name: 'Wallpaper Installation', min_hourly: 500, max_hourly: 1200, currency: 'KES' },
      { name: 'Decorative Finishes', min_hourly: 800, max_hourly: 2000, currency: 'KES' },
    ],
  },
];

export default function MinimumWageGuidePage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Content Container */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Fair Pricing Guide
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent pricing guidelines for services in Kenya. These are average market rates
              to help both clients and professionals set fair expectations.
            </p>
          </div>

          {/* Important Notice */}
          <Card variant="outlined" className="mb-8 bg-secondary/5 border-secondary">
            <div className="flex gap-4">
              <div className="text-3xl shrink-0">ℹ️</div>
              <div>
                <CardTitle className="text-lg mb-2">About This Guide</CardTitle>
                <CardDescription className="text-sm">
                  These rates are guidelines based on market research in Nairobi and surrounding areas.
                  Actual prices may vary based on experience, complexity, location, and materials needed.
                  Always discuss pricing details before starting any project.
                </CardDescription>
              </div>
            </div>
          </Card>

          {/* Wage Categories */}
          <div className="space-y-8">
            {wageCategories.map((category) => (
              <Card key={category.category} variant="elevated">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-primary">{category.category}</h2>
                </div>

                {/* Services Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-primary">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary">Rate Type</th>
                        <th className="text-right py-3 px-4 font-semibold text-primary">Min Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-primary">Max Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.services.map((service, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{service.name}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {'min_hourly' in service ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Hourly
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Fixed
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">
                            {service.currency}{' '}
                            {'min_hourly' in service
                              ? service.min_hourly.toLocaleString()
                              : service.min_fixed.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 text-right font-semibold text-gray-900">
                            {service.currency}{' '}
                            {'max_hourly' in service
                              ? service.max_hourly.toLocaleString()
                              : service.max_fixed.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Card variant="gray" className="text-center">
              <p className="text-gray-700 mb-4">
                <strong>Pricing Tip:</strong> When hiring, consider experience level, materials,
                complexity, and timeline. Get multiple quotes and check reviews before making a decision.
              </p>
              <p className="text-sm text-gray-600">
                Last updated: February 2026 • Rates shown in Kenyan Shillings (KES)
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}