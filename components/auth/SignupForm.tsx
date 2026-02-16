'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceProOnboardingForm } from './ServiceProOnboardingForm';
import type { RegisterData, UserRole, ApiError, ServiceProOnboardingData } from '@/types/auth';

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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate passwords match
    if (formData.password !== formData.password_confirm) {
      setErrors({ password_confirm: ['Passwords do not match'] });
      toast.error('Passwords do not match');
      return;
    }

    // If professional, move to step 2 for additional info
    if (formData.role === 'professional') {
      setStep(2);
      return;
    }

    // If client, check terms agreement
    if (!agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    // Register client immediately
    await registerUser();
  };

  const registerUser = async (professionalData?: ServiceProOnboardingData) => {
    setIsLoading(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      // Prepare registration data
      const registrationData = new FormData();
      
      // Add basic user data
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'password_confirm') {
          registrationData.append(key, value.toString());
        }
      });

      // Add professional data if provided
      if (professionalData && formData.role === 'professional') {
        registrationData.append('business_name', professionalData.business_name);
        registrationData.append('about', professionalData.about);
        registrationData.append('category_id', professionalData.category_id.toString());
        registrationData.append('service_ids', JSON.stringify(professionalData.service_ids));
        registrationData.append('address', professionalData.address);
        registrationData.append('service_radius_km', professionalData.service_radius_km?.toString() || '10');
        
        if (professionalData.tagline) {
          registrationData.append('tagline', professionalData.tagline);
        }
        
        if (professionalData.logo) {
          registrationData.append('logo', professionalData.logo);
        }
        
        if (professionalData.banner_image) {
          registrationData.append('banner_image', professionalData.banner_image);
        }
        
        if (professionalData.languages) {
          registrationData.append('languages', JSON.stringify(professionalData.languages));
        }
      }

      const response = await authService.register(formData);

      // Store tokens and user data
      authService.setTokens(response.tokens);
      authService.setUser(response.user);
      setUser(response.user);

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`Welcome to KindaGigz, ${response.user.first_name}! 🎉`, {
        duration: 4000,
      });

      // Redirect
      setTimeout(() => {
        if (formData.role === 'professional') {
          router.push(ROUTES.DASHBOARD);
        } else {
          router.push(ROUTES.HOME);
        }
      }, 500);

    } catch (err: any) {
      toast.dismiss(loadingToast);
      const apiError = err as ApiError;

      console.log('Caught error in SignupForm:', apiError); // Debug
      
      if (apiError.errors) {
        // ✅ Set field-specific errors for display
        setErrors(apiError.errors);
        
        // ✅ Show user-friendly toast with specific error
        toast.error(apiError.message, {
          duration: 5000,
        });
      } else if (apiError.message) {
        // ✅ Show the actual error message, not generic one
        toast.error(apiError.message, {
          duration: 5000,
        });
        setErrors({ general: [apiError.message] });
      } else {
        // ✅ Only use generic message as last resort
        const errorMessage = 'Registration failed. Please try again.';
        toast.error(errorMessage);
        setErrors({ general: [errorMessage] });
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

    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const getErrorMessage = (field: string): string | undefined => {
    return errors[field]?.[0];
  };

  // If on step 2 (professional onboarding), show that component
  if (step === 2 && formData.role === 'professional') {
    return (
      <ServiceProOnboardingForm
        basicData={formData}
        onBack={() => setStep(1)}
        onComplete={(ServiceProviderData) => {
          // Here you would merge professional data with basic data
          // and call registerUser with complete data
          console.log('Professional data:', ServiceProviderData);
          registerUser(ServiceProviderData);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.general[0]}</p>
        </div>
      )}

      {/* Basic Info Fields */}
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
            className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
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
            className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
          placeholder="Enter password"
        />
        <p className="mt-1 text-xs text-gray-500">
          At least 8 characters with uppercase, lowercase, special character and number
        </p>
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
          className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
          placeholder="Confirm password"
        />
        {getErrorMessage('password_confirm') && (
          <p className="mt-1 text-sm text-red-600">{getErrorMessage('password_confirm')}</p>
        )}
      </div>

      {/* Role Selection - Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-primary mb-3">
          I am signing up as a:
        </label>
        <div className="space-y-3">
          {/* Client Checkbox */}
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="role"
              value="client"
              checked={formData.role === 'client'}
              onChange={() => handleRoleChange('client')}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">👨‍💼</span>
                <span className="font-semibold text-primary">Client</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Looking to hire service providers
              </p>
            </div>
          </label>

          {/* Professional Checkbox */}
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="role"
              value="professional"
              checked={formData.role === 'professional'}
              onChange={() => handleRoleChange('professional')}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="font-semibold text-primary">Professional</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Offering services to clients
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Terms - Only show for clients */}
      {formData.role === 'client' && (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline font-semibold">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline font-semibold">
              Privacy Policy
            </Link>
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading
          ? 'Creating Account...'
          : formData.role === 'professional'
            ? 'Continue'
            : 'Create Account'
        }
      </Button>
    </form>
  );
}