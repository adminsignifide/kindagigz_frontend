import { Professional } from './auth';

export interface DashboardSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
}

export interface DashboardStats {
  totalBookings: number;
  completedJobs: number;
  activeClients: number;
  totalEarnings: string;
  averageRating: string;
  totalReviews: number;
  responseRate: string;
  completionRate: string;
}

export interface Booking {
  id: number;
  client: {
    id: number;
    name: string;
    avatar: string | null;
    phone: string;
  };
  service: {
    id: number;
    name: string;
  };
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: string;
  notes?: string;
}

export interface Message {
  id: number;
  client: {
    id: number;
    name: string;
    avatar: string | null;
  };
  message: string;
  timestamp: string;
  isRead: boolean;
  isFromClient: boolean;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  totalBookings: number;
  totalSpent: string;
  lastBooking: string;
  joinedDate: string;
}

export interface Review {
  id: number;
  client: {
    name: string;
    avatar: string | null;
  };
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

export interface Payment {
  id: number;
  booking: {
    id: number;
    service: string;
    client: string;
  };
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  method: 'cash' | 'mpesa' | 'card' | 'bank_transfer';
  date: string;
}

export interface AnalyticsData {
  revenue: {
    labels: string[];
    data: number[];
  };
  bookings: {
    labels: string[];
    data: number[];
  };
  topServices: {
    name: string;
    count: number;
  }[];
  clientGrowth: {
    labels: string[];
    data: number[];
  };
}