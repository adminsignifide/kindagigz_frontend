'use client';

// ============================================
// MAIN NAVBAR COMPONENT
// ============================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES, NAV_LINKS } from '@/lib/constants/routes';
import { Button } from '@/components/ui/Button';
import { ResourcesDropdown } from './ResourcesDropdown';
import { UserMenu } from './UserMenu';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

export const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock authentication state - replace with actual auth hook
    const isAuthenticated = false;
    const user = null;

    return (
        <nav className="sticky top-0 z-50 bg-secondary border-b border-black/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={ROUTES.HOME} className="flex items-center space-x-2">
                        <Image 
                            src={"/kinda-gigz-logo-zoomed.png"} 
                            alt={"KindaGigz logo"}
                            width={32}
                            height={32}
                            className='rounded-lg'
                        />
                    
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link) => {
                            if (link.hasDropdown) {
                            return <ResourcesDropdown key={link.label} />;
                            }

                            const isActive = pathname === link.href;

                            return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'text-primary bg-white/20'
                                        : 'text-primary/80 hover:text-primary hover:bg-white/10'
                                )}
                            >
                                {link.label}
                            </Link>
                            );
                        })}
                    </div>

                    {/* Right Side - Auth Buttons or User Menu */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated && user ? (
                            <UserMenu user={user} />
                        ) : (
                            <>
                            <Link href={ROUTES.LOGIN}>
                                <Button variant="ghost" size="sm">
                                Log In
                                </Button>
                            </Link>
                            <Link href={ROUTES.SIGNUP}>
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="bg-primary text-secondary hover:bg-primary/90 font-bold border-none">
                                    Sign Up
                                </Button>
                            </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                            ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            )}
                        </svg>
                    </button>
                </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                    {NAV_LINKS.map((link) => {
                    if (link.hasDropdown && link.dropdownItems) {
                        return (
                        <div key={link.label} className="space-y-1">
                            <div className="px-4 py-2 text-sm font-semibold text-gray-500">
                            {link.label}
                            </div>
                            {link.dropdownItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                            ))}
                        </div>
                        );
                    }

                    return (
                        <Link
                        key={link.label}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    );
                    })}

                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 border-t border-gray-200 space-y-2 px-4">
                    {isAuthenticated ? (
                        <Link href={ROUTES.DASHBOARD}>
                        <Button variant="outline" size="md" className="w-full">
                            Dashboard
                        </Button>
                        </Link>
                    ) : (
                        <>
                        <Link href={ROUTES.LOGIN}>
                            <Button variant="outline" size="md" className="w-full">
                            Log In
                            </Button>
                        </Link>
                        <Link href={ROUTES.SIGNUP}>
                            <Button variant="primary" size="md" className="w-full">
                            Sign Up
                            </Button>
                        </Link>
                        </>
                    )}
                    </div>
                </div>
                </div>
            )}
            </div>
        </nav>
    );
};