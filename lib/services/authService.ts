/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { API_ENDPOINTS } from '@/lib/config/api';
import {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
    AuthTokens,
    ApiError,
} from '@/types/auth';

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            console.log('Sending registration data:', data);
            const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Registration response:', responseData); // Debug log
            console.log('Response status:', response.status);

            if (!response.ok) {
                console.error('Registration failed:', responseData);
                throw this.handleError({ response: { data: responseData, status: response.status } });
            }

            return responseData;
        } catch (error) {
            // ✅ If it's already an ApiError, just re-throw it
            if ((error as ApiError).message) {
                console.error('Registration error:', error);
                throw error;
            }
            // ✅ Otherwise, handle it
            console.error('Unexpected registration error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const responseData = await response.json();
            console.log('Login response status:', response.status);

            if (!response.ok) {
                throw this.handleError({ response: { data: responseData, status: response.status } });
            }

            return responseData;
        } catch (error) {
            // ✅ If it's already an ApiError, just re-throw it
            if ((error as ApiError).message) {
                console.error('Login error:', error);
                throw error;
            }
            // ✅ Otherwise, handle it
            console.error('Unexpected login error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Logout user
     */
    async logout(refreshToken: string): Promise<void> {
        try {
            console.log('Attempting logout with refresh token');

            const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAccessToken()}`,
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            // Parse response
            const responseData = await response.json();
            console.log('Logout response:', responseData);

            // if (!response.ok) {
            //     throw new Error('Logout failed');
            // }

            if (!response.ok) {
                // Log the error but don't throw - we still want to clear local session
                console.warn('Backend logout error:', responseData.error || 'Unknown error');
            } else {
                console.log('Logout successful:', responseData.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Still clear local tokens even if API call fails
            this.clearTokens();
        }
    }

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<User> {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.CURRENT_USER, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            return await response.json();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Refresh access token
     */
    async refreshAccessToken(): Promise<AuthTokens> {
        try {
            const refreshToken = this.getRefreshToken();

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
            this.setTokens(data);
            return data;
        } catch (error) {
            this.clearTokens();
            throw this.handleError(error);
        }
    }

    /**
     * Token Management
     */
    setTokens(tokens: { access: string; refresh: string }): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
        }
    }

    getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    }

    getRefreshToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('refresh_token');
        }
        return null;
    }

    clearTokens(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    }

    /**
     * User Storage
     */
    setUser(user: User): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    getUser(): User | null {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    }

    clearUser(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    /**
     * Error handling
     */
    private handleError(error: any): ApiError {
        console.log('handleError received:', error); // Debug log

        // Check if this is a fetch response error
        if (error.response) {
        const { data, status } = error.response;
        
        // Django REST Framework typically returns errors in this format:
        // { "field_name": ["error message"], "non_field_errors": ["error"] }
        // OR { "detail": "error message" }
        
        let message = 'An error occurred';
        let errors: Record<string, string[]> | undefined;

        // Check for detail field (common in DRF)
        if (data.detail) {
            message = typeof data.detail === 'string' ? data.detail : 'An error occurred';
        }
        // Check for non_field_errors
        else if (data.non_field_errors) {
            message = Array.isArray(data.non_field_errors) 
            ? data.non_field_errors[0] 
            : data.non_field_errors;
        }
        // Check if data is the errors object itself
        else if (typeof data === 'object') {
            // Get first error message from any field
            const firstErrorField = Object.keys(data)[0];
            if (firstErrorField && data[firstErrorField]) {
            const fieldErrors = data[firstErrorField];
            message = Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;
            }
            errors = data;
        }

        return {
            message,
            errors,
        };
        }
    
        // Network error or other error
        if (error instanceof Error) {
        return {
            message: error.message || 'An unexpected error occurred',
        };
        }

        // Default fallback
        return {
        message: 'An unexpected error occurred',
        };
    }
}

export const authService = new AuthService();