import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

// Step data refined for better scannability
const onboardingSteps = [
  {
    id: 1,
    title: 'Setup Your Account',
    description: 'Join the community as either a client or a professional. Verify your email to get started.',
    icon: '🚀',
    clientBenefit: 'Access thousands of verified pros.',
    proBenefit: 'Set your rates and work on your terms.',
    color: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'Discovery Phase',
    description: 'Use our smart search to find specific skills or let the jobs come to you based on your expertise.',
    icon: '🔍',
    clientBenefit: 'Filter by city, rating, and category.',
    proBenefit: 'Get instant alerts for relevant gigs.',
    color: 'bg-purple-50'
  },
  {
    id: 3,
    title: 'Direct Communication',
    description: 'Chat in real-time. Discuss the scope, share files, and finalize the price before any commitment.',
    icon: '💬',
    clientBenefit: 'Review previous work and portfolios.',
    proBenefit: 'Clarify requirements before you start.',
    color: 'bg-green-50'
  },
  {
    id: 4,
    title: 'Secure Milestones',
    description: 'Our escrow-style system ensures that funds are only released once the work is approved.',
    icon: '🛡️',
    clientBenefit: 'Pay only for quality work.',
    proBenefit: 'Know the funds are secured upfront.',
    color: 'bg-orange-50'
  }
];

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/10 rounded-full">
            How KindaGigz Works
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">
            From Idea to <span className="text-secondary">Done.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We’ve simplified the gig economy. Whether you’re a local pro or looking to hire, 
            here is your roadmap to success.
          </p>
        </header>

        {/* Steps Grid - Using a 2-column layout for better readability on desktop */}
        <div className="grid md:grid-cols-2 gap-8">
          {onboardingSteps.map((step) => (
            <Card 
              key={step.id} 
              className="relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group p-8"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-20 transition-transform group-hover:scale-110 ${step.color}`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white font-bold text-xl shadow-lg">
                    {step.id}
                  </div>
                  <span className="text-4xl">{step.icon}</span>
                </div>

                <CardTitle className="text-2xl font-bold mb-3 text-primary">
                  {step.title}
                </CardTitle>
                
                <CardDescription className="text-gray-600 text-base mb-8 leading-relaxed">
                  {step.description}
                </CardDescription>

                {/* Role Specifics */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">For Clients</h4>
                    <p className="text-sm text-gray-700 font-medium">{step.clientBenefit}</p>
                  </div>
                  <div className="border-l border-gray-100 pl-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">For Pros</h4>
                    <p className="text-sm text-gray-700 font-medium">{step.proBenefit}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Placeholder for "Remaining Steps" */}
        <div className="mt-12 p-8 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 text-center">
          <p className="text-primary font-semibold italic">
            Steps 5 & 6 (Delivery & Review) coming soon to the preview...
          </p>
        </div>

        {/* CTA Footer */}
        <section className="mt-24 text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to start your first gig?</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            Join the KindaGigz ecosystem today. Setup takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.SIGNUP}>
              <Button variant="primary" size="lg" className="px-12 py-6 text-lg">
                Create Account
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="px-12 py-6 text-lg border-2">
                Sign In
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}