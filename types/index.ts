// ============================================
// GLOBAL TYPE DEFINITIONS
// ============================================

// Standardized Navbar type
export interface NavLink {
    label: string;
    href: string;
    public: boolean;
    requiresAuth?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: Array<{
        label: string;
        href: string;
    }>;
}

// User & Authentication Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'client' | 'professional';
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
    gallery?: GalleryItem[];
    about?: string;
}

// Service Provider (what's shown in cards and lists)
export interface ServiceProvider {
  id: string;
  professionalName: string;
  serviceName: string;
  banner: string;
  logo: string;
  description: string;
  catchphrase: string;
  categoryId: string;
  categoryName: string;
  price?: number;
  priceType: 'fixed' | 'hourly' | 'negotiable';
  location: Location;
  openHours: WorkingHours;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isAvailableNow: boolean;
  currency: string;
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

//Gallery Types
export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  type: 'image' | 'video';
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

// Course Types (for Skills Boost)
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: string;
  category: string;
  instructor?: string;
  enrolled?: number;
}

// Wage Guide Types
// export interface WageService {
//   name: string;
//   minHourly?: number;
//   maxHourly?: number;
//   minFixed?: number;
//   maxFixed?: number;
//   currency: string;
// }

type HourlyService = {
  name: string;
  minHourly: number;
  maxHourly: number;
  currency: string;
};

type FixedService = {
  name: string;
  minFixed: number;
  maxFixed: number;
  currency: string;
};

type WageService = HourlyService | FixedService;

export interface WageCategory {
  category: string;
  icon: string;
  services: WageService[];
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'professional';
  agreeToTerms: boolean;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}