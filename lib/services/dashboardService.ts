import { API_ENDPOINTS } from '@/lib/config/api';
import { authService } from './authService';
import type { DashboardStats, Booking, Message, Client, Review, Payment, AnalyticsData } from '@/types/dashboard';

class DashboardService {
  private getAuthHeaders() {
    const token = authService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Get dashboard overview stats
   */
  async getStats(): Promise<DashboardStats | null> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/stats/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  }

  /**
   * Get bookings
   */
  async getBookings(status?: string): Promise<Booking[]> {
    try {
      const url = status 
        ? `${API_ENDPOINTS.PROFESSIONALS.PROFILE}/bookings/?status=${status}`
        : `${API_ENDPOINTS.PROFESSIONALS.PROFILE}/bookings/`;

      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  }

  /**
   * Get messages
   */
  async getMessages(): Promise<Message[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/messages/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  /**
   * Get clients
   */
  async getClients(): Promise<Client[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/clients/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  /**
   * Get reviews
   */
  async getReviews(): Promise<Review[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/reviews/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  /**
   * Get payments
   */
  async getPayments(): Promise<Payment[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/payments/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(): Promise<AnalyticsData | null> {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROFESSIONALS.PROFILE}/analytics/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  }
}

export const dashboardService = new DashboardService();