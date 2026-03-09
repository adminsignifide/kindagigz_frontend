'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { Navbar } from '../layout/Navbar/Navbar';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-primary text-white overflow-hidden min-h-screen max-h-[110vh] flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* 2. Mobile Hero Image - Fixed Z-index and subtly animated */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Darker gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary z-10" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-float opacity-80"> {/* Animation added back to mobile bg */}
            <Image
            src="/images/hero-section-image-without-bg.png"
            alt="KindaGigz professionals"
            fill
            className="object-contain"
            priority
            />
        </div>
      </div>

      {/* Integrated Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center h-full min-h-[450px] md:min-h-[550px] gap-y-6 lg:gap-y-[clamp(1.5rem,6vh,4rem)]">
            {/* Badge */}
            <div className="w-fit inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-secondary/30">
              <span className="text-secondary mr-2">✨</span>
              <span className="text-sm font-semibold">Connecting Africa's Workforce</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Find Top Tier Service Pros & Real Jobs.
              <span className="block mt-6 text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary to-white">
                Get the job done—locally, reliably
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
              Connect with verified professionals in your area for any job, big or small. 
              From carpenters to cleaners, find skilled workers ready to help—instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row justify-between items-center gap-3 pt-10 w-full sm:justify-start sm:w-auto">
              <Link href={ROUTES.SERVICES} className="flex-1 min-w-[160px] sm:flex-none">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full sm:w-auto text-xs sm:text-base px-3 sm:px-6 py-3"
                  rightIcon={
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                >
                  Find a Service Pro
                </Button>
              </Link>

              <Link href={ROUTES.SIGNUP} className="flex-1 min-w-[160px] sm:flex-none">
                <Button 
                  variant="tertiary" 
                  size="lg"
                  className="w-full sm:w-auto text-xs sm:text-base px-3 sm:px-6 py-3"
                  rightIcon={
                    <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                >
                  Join as Service Pro
                </Button>
              </Link>
            </div>
          </div> 

          {/* Right Content - Hero Image with Floating Animation */}
          <div className="hidden lg:block relative">
            {/* Main Hero Image Container with Float Animation */}
            <div className="relative animate-float">
              <Image
                src="/images/hero-section-image-without-bg.png"
                alt="KindaGigz hero section"
                width={500}
                height={500}
                className="h-auto rounded-2xl"
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed-1 {
          0%, 100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-18px) rotate(-3deg);
          }
        }

        @keyframes float-delayed-3 {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.05);
          }
        }

        :global(.animate-float) {
          animation: float 6s ease-in-out infinite;
        }

        :global(.animate-float-delayed-1) {
          animation: float-delayed-1 5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        :global(.animate-float-delayed-2) {
          animation: float-delayed-2 5.5s ease-in-out infinite;
          animation-delay: 1s;
        }

        :global(.animate-float-delayed-3) {
          animation: float-delayed-3 4.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
};