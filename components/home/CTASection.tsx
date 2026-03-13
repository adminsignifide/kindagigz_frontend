'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - CTA Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full border border-secondary/30">
              <span className="text-secondary mr-2">🚀</span>
              <span className="text-sm font-semibold text-primary">Join thousands of Service Providers</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl lg:text-5xl font-bold text-primary">
              Ready to Get Started?
            </h2>

            <p className="text-sm lg:text-lg text-gray-700">
              Whether you're looking to hire a professional or list your services,
              KindaGigz makes it easy to connect and get the job done.
            </p>

            {/* CTA Cards - Stacked */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              {/* For Clients Card */}
              <Card variant="faded-primary" padding="md" className="group hover:shadow-lg transition-all flex-1 h-full">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex flex-row items-center">
                    <div className="text-xl md:text-2xl shrink-0">👨‍💼</div>
                    <h3 className="text-sm md:text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
                      For Clients
                    </h3>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs md:text-md text-gray-700 mb-4">
                      Find verified professionals for any job, big or small. Get it done right the first time.
                    </p>
                    <Link href={ROUTES.SERVICES}>
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto text-xs md:text-md"
                        rightIcon={
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        }
                      >
                        Find a Pro
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* For Professionals Card */}
              <Card variant="faded-secondary" padding="md" className="group hover:shadow-lg transition-all flex-1 h-full">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex flex-row items-center">
                    <div className="text-xl md:text-2xl shrink-0">⚡</div>
                    <h3 className="text-sm md:text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
                      For Service Providers
                    </h3>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs md:text-md text-gray-700 mb-4">
                      List your services, build your reputation, and earn on your terms. It's free to join!
                    </p>
                    <Link href={ROUTES.SIGNUP}>
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full sm:w-auto text-xs md:text-md"
                        rightIcon={
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        }
                      >
                        Become a Pro
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 lg:gap-6 pt-2 md:pt-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Image */}
          <div className="relative">
            {/* Image Container */}
            <div className="relative aspect-square lg:aspect-auto lg:h-150 rounded-2xl overflow-hidden">
              <Image
                src="/images/cta-image.png"
                alt="Join KindaGigz community"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute animate-float -bottom-6 -left-4 md:-left-6 bg-white rounded-xl shadow-xl p-4 md:p-6 border-2 border-secondary max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <div className="text-xs md:text-sm text-primary">Verified pros you can hire with confidence</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
};