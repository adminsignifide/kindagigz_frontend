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

interface NavbarProps {
  variant?: 'default' | 'transparent';
}

export const Navbar: React.FC<NavbarProps> = ({ variant = 'default' }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock authentication state - replace with actual auth hook
  const isAuthenticated = false;
  const user = null;

  const isTransparent = variant === 'transparent';

  return (
    // Navbar with margin from edges and rounded corners
    <div className={cn(
      "z-50",
      isTransparent ? "absolute top-0 left-0 right-0 px-4 pt-4" : "sticky top-0 px-4 pt-4"
    )}>
      <nav className={cn(
        "border-2 shadow-md rounded-full max-w-7xl mx-auto",
        isTransparent 
          ? "bg-secondary/80 backdrop-blur-lg border-secondary/30" 
          : "bg-secondary border-black/10"
      )}>
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 shrink-0">
              <Image 
                src="/kinda-gigz-logo-zoomed.png" 
                alt="KindaGigz logo"
                width={40}
                height={40}
                className="rounded-sm"
                priority
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
                      'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'text-primary bg-white/30 shadow-sm'
                        : 'text-primary/80 hover:text-primary hover:bg-white/20'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Auth Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-3 shrink-0">
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
                    <Button variant="secondary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-primary"
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10 bg-white/10 backdrop-blur-sm rounded-b-3xl">
            <div className="flex flex-col space-y-1 px-4">
              {NAV_LINKS.map((link) => {
                if (link.hasDropdown && link.dropdownItems) {
                  return (
                    <div key={link.label} className="space-y-1">
                      <div className="px-4 py-2 text-sm font-bold text-primary/70">
                        {link.label}
                      </div>
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-6 py-2 text-sm text-primary hover:bg-white/20 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'block px-4 py-2 text-sm font-semibold rounded-lg transition-colors',
                      isActive 
                        ? 'text-primary bg-white/30' 
                        : 'text-primary/80 hover:bg-white/20 hover:text-primary'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-primary/10 space-y-2">
                {isAuthenticated ? (
                  <Link href={ROUTES.DASHBOARD}>
                    <Button variant="outline" size="md" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href={ROUTES.LOGIN}>
                      <Button variant="ghost" size="md" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link href={ROUTES.SIGNUP}>
                      <Button variant="secondary" size="md" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
