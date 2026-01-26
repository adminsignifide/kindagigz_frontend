// ============================================
// GLOBAL TYPE DEFINITIONS
// ============================================

// User & Authentication Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'client' | 'professional' | 'both';
    profileImage?: string;
    createdAt: string; //type ISOString = string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface TimeRange {
    open: string;  // Use 24h format for easier logic, e.g., "08:00"
    close: string; // e.g., "17:00"
}

// Record allows us to map each day to a TimeRange or null if they are closed
export type WorkingHours = Record<DayOfWeek, TimeRange | null>;

// Professional Types
export interface Professional {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    title: string;
    bio: string;
    profileImage?: string;
    bannerImage?: string;
    rating: number;
    reviewCount: number;
    completedJobs: number;
    responseTime: string; // e.g., "2 hours"
    isVerified: boolean;
    isAvailableNow: boolean;
    location: Location;
    services: Service[];
    hourlyRate?: number;
    currency: string;
    startingPrice?: number;
    workingHours: WorkingHours; 
    timezone: string;
    badges?: Array<{ id: string; name: string; icon: string; level: number }>; // For Skills Boost
    languages: string[]; // Crucial for multi-lingual African markets
    status: 'online' | 'offline' | 'busy';
}

// Service Types
export interface Service {
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    description: string;
    price?: number;
    priceType: 'fixed' | 'hourly' | 'negotiable';
    icon?: string;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    serviceCount: number;
    color?: string;
}

// Location Types
export interface Location {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
    distance?: number; // Distance from user in km
}

// Filter Types
export interface FilterState {
    activeTab: 'services' | 'categories';
    selectedCategories: string[];
    selectedServices: string[];
    priceRange: [number, number];
    rating: number;
    distance: number;
    availability: 'all' | 'available' | 'unavailable';
    sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance';
}

// Review Types
export interface Review {
    id: string;
    professionalId: string;
    clientId: string;
    clientName: string;
    clientImage?: string;
    rating: number;
    comment: string;
    serviceType: string;
    createdAt: string;
}