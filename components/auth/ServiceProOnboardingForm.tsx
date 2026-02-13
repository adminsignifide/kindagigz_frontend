'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { RegisterData } from '@/types/auth';

interface ServiceProviderData {
    business_name: string;
    bio: string;
    categories: string[];
    services: string[];
    logo?: File;
    banner?: File;
    agreeToTerms: boolean;
}

interface ServiceProOnboardingFormProps {
    basicData: RegisterData;
    onBack: () => void;
    onComplete: (data: ServiceProviderData) => void;
}

export function ServiceProOnboardingForm({
    basicData,
    onBack,
    onComplete,
}: ServiceProOnboardingFormProps) {
    const [formData, setFormData] = useState<ServiceProviderData>({
        business_name: '',
        bio: '',
        categories: [],
        services: [],
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const newErrors: Record<string, string> = {};

        if (!formData.business_name.trim()) {
            newErrors.business_name = 'Business name is required';
        }

        if (!formData.bio.trim()) {
            newErrors.bio = 'Bio is required';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onComplete(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-lg font-bold text-primary">ServicePro Details</h3>
                <p className="text-sm text-gray-600 mt-1">
                    Tell us about your business
                </p>
            </div>

            {/* Business Name */}
            <div>
                <label htmlFor="business_name" className="block text-sm font-semibold text-primary mb-2">
                    Business Name
                </label>
                <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., John's Plumbing Services"
                />
                {errors.business_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.business_name}</p>
                )}
            </div>

            {/* Bio */}
            <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-primary mb-2">
                    Bio / Description
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-card-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell potential clients about your experience and services..."
                />
                <p className="mt-1 text-xs text-gray-500">
                    {formData.bio.length}/500 characters
                </p>
                {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                )}
            </div>

            {/* Logo Upload (Optional) */}
            <div>
                <label htmlFor="logo" className="block text-sm font-semibold text-primary mb-2">
                    Business Logo (Optional)
                </label>
                <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-card-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <div className="text-center">
                            <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm text-gray-600 mt-2 block">Upload Logo</span>
                            <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                        </div>
                        <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
                                }
                            }}
                        />
                    </label>
                </div>
            </div>

            {/* Note about additional setup */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    💡 <strong>Note:</strong> You'll be able to add categories, services, photos, and more details after completing registration.
                </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
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
            {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={onBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                >
                    Create Account
                </Button>
            </div>
        </form>
    );
}