// ============================================
// HOW IT WORKS PAGE
// ============================================

import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

const steps = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up for free in minutes. Choose whether you\'re a client looking for services or a professional offering your skills.',
    icon: '👤',
    forClients: 'Browse and hire professionals',
    forPros: 'Create your professional profile',
  },
  {
    number: 2,
    title: 'Find or Get Found',
    description: 'Clients can search for professionals by service, location, and ratings. Professionals get notified when clients are looking for their skills.',
    icon: '🔍',
    forClients: 'Search by category, location, and rating',
    forPros: 'Get matched with relevant job requests',
  },
  {
    number: 3,
    title: 'Connect & Communicate',
    description: 'Chat directly with professionals or clients. Discuss project details, timeline, and pricing before committing.',
    icon: '💬',
    forClients: 'Message multiple pros to compare',
    forPros: 'Respond to inquiries and send quotes',
  },
  {
    number: 4,
    title: 'Book & Pay Securely',
    description: 'Book services with confidence. Payments are held securely until the job is completed to your satisfaction.',
    icon: '💳',
    forClients: 'Secure payment protection',
    forPros: 'Guaranteed payment upon completion',
  },
  {
    number: 5,
    title: 'Get the Job Done',
    description: 'Professionals complete the work according to agreed terms. Clients can track progress and request updates.',
    icon: '✅',
    forClients: 'Track job progress in real-time',
    forPros: 'Complete work on your schedule',
  },
  {
    number: 6,
    title: 'Rate & Review',
    description: 'Both parties leave reviews to build reputation and trust within the KindaGigz community.',
    icon: '⭐',
    forClients: 'Help others make informed decisions',
    forPros: 'Build your reputation and credibility',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Content Container */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              How KindaGigz Works
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connecting skilled professionals with clients in 6 simple steps. 
              Whether you're hiring or offering services, we make it easy.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <Card key={step.number} variant="default" className="group hover:shadow-lg transition-all">
                <div className="flex gap-6">
                  {/* Step Number */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-secondary mb-1">
                          STEP {step.number}
                        </div>
                        <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                      </div>
                    </div>
                    
                    <CardDescription className="text-base mb-4">
                      {step.description}
                    </CardDescription>

                    {/* Two Column Benefits */}
                    <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <div>
                          <div className="font-semibold text-sm text-primary">For Clients</div>
                          <div className="text-sm text-gray-600">{step.forClients}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <div>
                          <div className="font-semibold text-sm text-primary">For Professionals</div>
                          <div className="text-sm text-gray-600">{step.forPros}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of professionals and clients making work happen on KindaGigz
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.SERVICES}>
                  <Button variant="primary" size="lg">
                    Find a Professional
                  </Button>
                </Link>
                <Link href={ROUTES.SIGNUP}>
                  <Button variant="secondary" size="lg">
                    Become a Professional
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}