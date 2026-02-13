'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import type { RegisterData, UserRole, ApiError } from '@/types/auth';

export function SignupForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegisterData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    role: 'client',
    phone: '',
    city: '',
    country: 'Kenya',
    preferred_language: 'en',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (step === 1) {
      // Validate step 1
      if (formData.password !== formData.password_confirm) {
        setErrors({ password_confirm: ['Passwords do not match'] });
        toast.error('Passwords do not match');
        return;
      }
      setStep(2);
      return;
    }

    // Step 2: Submit registration
    setIsLoading(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      const response = await authService.register(formData);
      
      // Store tokens and user data
      authService.setTokens(response.tokens);
      authService.setUser(response.user);

       // Update auth context
      setUser(response.user);

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`Welcome to KindaGigz, ${response.user.first_name}! 🎉`, {
        duration: 4000,
      });

      // Small delay for user to see the success message
      setTimeout(() => {
        // Redirect based on role
        if (formData.role === 'professional') {
          router.push('/onboarding');
        } else {
          router.push(ROUTES.HOME);
        }
      }, 500);

    } catch (err: any) {
      toast.dismiss(loadingToast);
      const apiError = err as ApiError;
      if (apiError.errors) {
        setErrors(apiError.errors);
        
        // Show first error as toast
        const firstErrorField = Object.keys(apiError.errors)[0];
        const firstError = apiError.errors[firstErrorField][0];
        toast.error(firstError || 'Registration failed');
      } else {
        const errorMessage = apiError.message || 'Registration failed. Please try again.';
        setErrors({ general: [errorMessage] });
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const selectRole = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const getErrorMessage = (field: string): string | undefined => {
    return errors[field]?.[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.general[0]}</p>
        </div>
      )}

      {step === 1 ? (
        <>
          {/* Step 1: Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-semibold text-primary mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                placeholder="John"
              />
              {getErrorMessage('first_name') && (
                <p className="mt-1 text-sm text-red-600">{getErrorMessage('first_name')}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-semibold text-primary mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
                placeholder="Doe"
              />
              {getErrorMessage('last_name') && (
                <p className="mt-1 text-sm text-red-600">{getErrorMessage('last_name')}</p>
              )}
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
            {getErrorMessage('email') && (
              <p className="mt-1 text-sm text-red-600">{getErrorMessage('email')}</p>
            )}
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
            {getErrorMessage('phone') && (
              <p className="mt-1 text-sm text-red-600">{getErrorMessage('phone')}</p>
            )}
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
              placeholder="Enter password"
            />
            {getErrorMessage('password') && (
              <p className="mt-1 text-sm text-red-600">{getErrorMessage('password')}</p>
            )}
          </div>

          <div>
            <label htmlFor="password_confirm" className="block text-sm font-semibold text-primary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none"
              placeholder="Confirm password"
            />
            {getErrorMessage('password_confirm') && (
              <p className="mt-1 text-sm text-red-600">{getErrorMessage('password_confirm')}</p>
            )}
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
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreeToTerms"
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
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}