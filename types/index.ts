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

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface TimeRange {
    open: string;  // Use 24h format for easier logic, e.g., "08:00"
    close: string; // e.g., "17:00"
}

// Record allows us to map each day to a TimeRange or null if they are closed
export type working_hours = Record<DayOfWeek, TimeRange | null>;

// Professional Types
export interface Professional {
    id: string;
    userId: string;
    first_name: string;
    last_name: string;
    title: string;
    bio: string;
    profile_image?: string;
    banner_image?: string;
    rating: number;
    review_count: number;
    completed_jobs: number;
    response_time: string; // e.g., "2 hours"
    is_verified: boolean;
    is_available_now: boolean;
    location: Location;
    services: Service[];
    hourly_rate?: number;
    currency: string;
    starting_price?: number;
    working_hours: working_hours; 
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
  category_id: string;
  category_name: string;
  price?: number;
  priceType: 'fixed' | 'hourly' | 'negotiable';
  location: Location;
  open_hours: working_hours;
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_available_now: boolean;
  currency: string;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  is_active: boolean;
  services_count: number;
  color?: string;
}

// Service Types
export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: number;
  category_name: string;
  category_slug: string;
  suggested_price_min: string;
  suggested_price_max: string;
  is_active: boolean;
  order: number;
  price_type?: 'fixed' | 'hourly' | 'negotiable';
  icon?: string;
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
    id: string;
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