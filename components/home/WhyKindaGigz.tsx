
import React from 'react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: '🎯',
    title: 'Verified Professionals',
    description: 'Every professional is ID-verified and background-checked for your safety and peace of mind.',
  },
  {
    icon: '📍',
    title: 'Local & Reliable',
    description: 'Find skilled workers in your neighborhood. Get jobs done quickly with professionals nearby.',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Safe and secure payment processing. Your money is protected until the job is complete.',
  },
  {
    icon: '📱',
    title: 'Easy Booking',
    description: 'Book services in minutes from your phone or computer. It\'s that simple.',
  },
];

export const WhyKindaGigz: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-primary">KindaGigz</span>?
          </h2>
          <p className="text-sm lg:text-lg text-gray-600">
            We're building the future of work in Africa by connecting skilled professionals 
            with people who need their services—fast, fair, and hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              variant="gray"
              hoverable
              className="group flex flex-row items-center"
            >
              <div className="text-2xl lg:text-4xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xs md:text-md lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              {/*  <p className="text-sm text-gray-700">
                {feature.description}
              </p> */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};