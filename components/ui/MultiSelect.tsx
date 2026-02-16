'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface MultiSelectOption {
  id: number;
  name: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
  maxSelections?: number;
  disabled?: boolean;
  error?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  maxSelections = 5,
  disabled = false,
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionId: number) => {
    if (selected.includes(optionId)) {
      // Remove option
      onChange(selected.filter(id => id !== optionId));
    } else {
      // Add option (if under max)
      if (selected.length < maxSelections) {
        onChange([...selected, optionId]);
      }
    }
  };

  const removeOption = (optionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(id => id !== optionId));
  };

  const getSelectedOptions = () => {
    return options.filter(opt => selected.includes(opt.id));
  };

  const getAvailableOptions = () => {
    return options.filter(opt => !selected.includes(opt.id));
  };

  const selectedOptions = getSelectedOptions();
  const availableOptions = getAvailableOptions();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Items Display / Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-3 rounded-lg border-2 transition-colors text-left",
          error 
            ? "border-red-500 focus:border-red-600" 
            : "border-card-border focus:border-primary",
          disabled && "bg-gray-100 cursor-not-allowed opacity-60",
          "focus:outline-none"
        )}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            <>
              {selectedOptions.map(option => (
                <span
                  key={option.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                >
                  {option.name}
                  <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => removeOption(option.id, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          removeOption(option.id, e as any);
                        }
                      }}
                      className="hover:text-red-600 cursor-pointer transition-colors"
                      aria-label={`Remove ${option.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                </span>
              ))}
              {selected.length < maxSelections && (
                <span className="text-xs text-gray-500 self-center">
                  +{maxSelections - selected.length} more
                </span>
              )}
            </>
          )}
        </div>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-card-border rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {availableOptions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {selected.length >= maxSelections 
                ? `Maximum ${maxSelections} services selected`
                : 'No more services available'
              }
            </div>
          ) : (
            <div className="py-2">
              {availableOptions.map(option => {
                const canSelect = selected.length < maxSelections;
                
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => canSelect && toggleOption(option.id)}
                    disabled={!canSelect}
                    className={cn(
                      "w-full px-4 py-2 text-left transition-colors",
                      canSelect 
                        ? "hover:bg-primary/5 cursor-pointer" 
                        : "opacity-50 cursor-not-allowed",
                      "text-sm text-gray-700"
                    )}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-1 text-xs text-gray-500">
        {selected.length}/{maxSelections} services selected
      </p>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}