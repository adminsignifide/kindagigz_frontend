// ============================================
// REUSABLE BUTTON COMPONENT
// ============================================

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  // Unified border radius for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    // Button Variation 1: Yellow bg, Dark blue text
    primary: 'bg-secondary text-primary hover:bg-secondary/90 active:bg-secondary/80 border-2 border-transparent',
    
    // Button Variation 3: Dark blue bg, Yellow text
    secondary: 'bg-primary text-secondary hover:bg-primary/90 active:bg-primary/80 border-2 border-transparent',
    
    // Button Variation 2: Light gray bg, Black text, Yellow border
    tertiary: 'bg-[#D9D9D9] text-black hover:bg-[#C9C9C9] active:bg-[#B9B9B9] border-2 border-secondary',
    
    // Outline variant (for versatility)
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 active:bg-primary/10 bg-transparent',
    
    // Ghost variant (minimal)
    ghost: 'text-primary hover:bg-button-secondary active:bg-primary/10 border-2 border-transparent',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-2.5 text-base gap-2',
    lg: 'px-8 py-3 text-lg gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};