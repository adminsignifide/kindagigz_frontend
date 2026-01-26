// ============================================
// WHY KINDAGIGZ SECTION
// ============================================

import React from 'react';

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
    icon: '💰',
    title: 'Fair Pricing',
    description: 'Transparent pricing with no hidden fees. Know what you\'re paying before you book.',
  },
  {
    icon: '⭐',
    title: 'Rated & Reviewed',
    description: 'Read real reviews from verified clients to make informed hiring decisions.',
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-purple-600">KindaGigz</span>?
          </h2>
          <p className="text-lg text-gray-600">
            We're building the future of work in Africa by connecting skilled professionals 
            with people who need their services—fast, fair, and hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-purple-100">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-purple-100">Active Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-100">Successful Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-purple-100">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};