// ============================================
// SIGNUP PAGE
// ============================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';

type UserRole = 'client' | 'professional' | 'both';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client' as UserRole,
    phone: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Move to step 2 for role selection
      setStep(2);
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement actual registration
    console.log('Signup attempt:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // router.push(formData.role === 'professional' ? '/onboarding' : ROUTES.DASHBOARD);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const selectRole = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {step === 1 ? 'Create Account' : 'Choose Your Role'}
            </h1>
            <p className="text-gray-600">
              {step === 1 
                ? 'Join thousands of professionals and clients on KindaGigz'
                : 'How would you like to use KindaGigz?'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-primary mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-primary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                    placeholder="+254 712 345 678"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Continue
                </Button>
              </>
            ) : (
              <>
                {/* Step 2: Role Selection */}
                <div className="space-y-4">
                  {/* Client Option */}
                  <button
                    type="button"
                    onClick={() => selectRole('client')}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      formData.role === 'client'
                        ? 'border-primary bg-primary/5'
                        : 'border-card-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">👨‍💼</div>
                      <div className="flex-1">
                        <div className="font-bold text-primary text-lg mb-1">I'm a Client</div>
                        <div className="text-sm text-gray-600">
                          I'm looking to hire professionals for various services
                        </div>
                      </div>
                      {formData.role === 'client' && (
                        <div className="text-primary">✓</div>
                      )}
                    </div>
                  </button>

                  {/* Professional Option */}
                  <button
                    type="button"
                    onClick={() => selectRole('professional')}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      formData.role === 'professional'
                        ? 'border-primary bg-primary/5'
                        : 'border-card-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">⚡</div>
                      <div className="flex-1">
                        <div className="font-bold text-primary text-lg mb-1">I'm a Professional</div>
                        <div className="text-sm text-gray-600">
                          I want to offer my services and find clients
                        </div>
                      </div>
                      {formData.role === 'professional' && (
                        <div className="text-primary">✓</div>
                      )}
                    </div>
                  </button>

                  {/* Both Option */}
                  <button
                    type="button"
                    onClick={() => selectRole('both')}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      formData.role === 'both'
                        ? 'border-primary bg-primary/5'
                        : 'border-card-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🤝</div>
                      <div className="flex-1">
                        <div className="font-bold text-primary text-lg mb-1">Both</div>
                        <div className="text-sm text-gray-600">
                          I want to hire professionals and offer my own services
                        </div>
                      </div>
                      {formData.role === 'both' && (
                        <div className="text-primary">✓</div>
                      )}
                    </div>
                  </button>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          {step === 1 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href={ROUTES.LOGIN} className="font-semibold text-primary hover:text-primary/80">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}