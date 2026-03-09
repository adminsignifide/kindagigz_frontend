// ============================================
// REUSABLE CARD COMPONENT
// ============================================

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat' | 'gray' | 'purple-border' | 'faded-primary' | 'faded-secondary';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'sm',
  hoverable = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-600';
  
  const variants = {
    default: 'bg-card border-2 border-card-border',
    elevated: 'bg-card shadow-lg border border-card-border/50',
    outlined: 'bg-card border-2 border-primary/20',
    flat: 'bg-card border-none',
    gray: 'bg-[#D9D9D9] border-2 border-transparent',
    'purple-border': 'bg-[#4F4F7C] border-2 border-secondary',
    'faded-primary': 'bg-primary/7 border border-primary/15',
    'faded-secondary': 'bg-secondary/5 border border-primary/15',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable 
    ? variant === 'purple-border'
      ? 'hover:shadow-xl hover:border-secondary/80 hover:-translate-y-1 cursor-pointer'
      : 'hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Sub-components for better composition
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement> & { 
  variant?: 'default' | 'light';
}> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <h3 
      className={cn(
        'text-xl font-bold',
        variant === 'light' ? 'text-white' : 'text-primary',
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: 'default' | 'light';
}> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <p 
      className={cn(
        'text-sm',
        variant === 'light' ? 'text-white/80' : 'text-gray-600',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('mt-4 pt-4 border-t border-card-border', className)} {...props}>
      {children}
    </div>
  );
};