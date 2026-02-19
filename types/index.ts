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

// Service Types
export interface Service {
    id: number;
    name: string;
    category_id: string;
    category_name: string;
    description: string;
    price?: number;
    priceType: 'fixed' | 'hourly' | 'negotiable';
    icon?: string;
}

// Category Types
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon?: string;
    service_count: number;
    color?: string;
}

//Gallery Types
export interface GalleryItem {
  id: number;
  url: string;
  caption?: string;
  type: 'image' | 'video';
}

// Working Hours Type
export interface WorkingHours {
  monday: TimeSlot | null;
  tuesday: TimeSlot | null;
  wednesday: TimeSlot | null;
  thursday: TimeSlot | null;
  friday: TimeSlot | null;
  saturday: TimeSlot | null;
  sunday: TimeSlot | null;
}

export interface TimeSlot {
  open: string;  // "08:00"
  close: string; // "17:00"
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
    selected_categories: string[];
    selected_services: string[];
    price_range: [number, number];
    rating: number;
    distance: number;
    availability: 'all' | 'available' | 'unavailable';
    sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance';
}

// Review Types
export interface Review {
    id: number;
    professional_id: string;
    client_id: string;
    client_name: string;
    client_image?: string;
    rating: number;
    comment: string;
    service_type: string;
    created_at: string;
}

// Course Types (for Skills Boost)
export interface Course {
  id: number;
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
  min_hourly: number;
  max_hourly: number;
  currency: string;
};

type FixedService = {
  name: string;
  min_fixed: number;
  max_fixed: number;
  currency: string;
};

type WageService = HourlyService | FixedService;

export interface WageCategory {
  category: string;
  icon: string;
  services: WageService[];
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferred_contact: 'email' | 'phone' | 'whatsapp';
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
  page_size: number;
  has_more: boolean;
}