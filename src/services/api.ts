// API Service for ZeeFit Backend Integration
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import { config } from '../utils/config';

const API_BASE_URL = config.API_BASE_URL;

export interface ApiResponse<T = any> {
  message: string;
  status_code: number;
  data?: T;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  status_code: number;
}

export interface User {
  _id: string;
  phone: string;
  countryCode: string;
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  profilePic?: string;
  heightInCm?: number;
  weightInKg?: number;
  q1?: number;
  q2?: number;
  q3?: number;
  fcmToken?: string;
  device?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Challenge {
  _id: string;
  slug: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  startsAt: string;
  endsAt: string;
  goalType: 'weight_loss' | 'calories' | 'consistency' | 'steps' | 'marathon';
  rules: {
    minSteps?: number;
    requiredLogs?: string[];
    proofRequired: boolean;
  };
  visibility: 'public' | 'invite';
  cities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeParticipant {
  _id: string;
  challengeId: string;
  userId: string;
  joinedAt: string;
  progressMetrics?: Record<string, any>;
  spiritScore?: number;
  consistencyPct?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SendOtpRequest {
  phone: string;
  countryCode: string;
}

export interface VerifyOtpRequest {
  phone: string;
  countryCode: string;
  otp: string;
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  fcmToken?: string;
  device?: string;
  heightInCm: number;
  weightInKg: number;
  q1: number;
  q2: number;
  q3: number;
}

class ApiService {
  private getAuthToken(): string | null {
    return getCookie('accessToken');
  }



  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();


    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401) {
          try {
            const refreshToken = getCookie('refreshToken');
            if (refreshToken) {
              await this.refreshToken(refreshToken);
            }
            // Retry the request with new token
            const newToken = this.getAuthToken();
            if (newToken) {
              const retryConfig = {
                ...config,
                headers: {
                  ...config.headers,
                  'Authorization': `Bearer ${newToken}`,
                },
              };
              const retryResponse = await fetch(url, retryConfig);
              const retryData = await retryResponse.json();
              
              if (!retryResponse.ok) {
                throw new Error(retryData.message || 'Request failed after token refresh');
              }
              return retryData;
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Clear invalid tokens instead of redirecting
            document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            throw new Error('Authentication failed. Please login again.');
          }
        }
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication Methods
  async sendOtp(request: SendOtpRequest): Promise<ApiResponse> {
    return this.makeRequest('/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<AuthResponse> {
    const response = await this.makeRequest('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    
      // The response structure is { accessToken, refreshToken, user, status_code }
      // Extract the auth data from the response
      const authData: AuthResponse = {
        accessToken: (response as any).accessToken,
        refreshToken: (response as any).refreshToken,
        user: (response as any).user,
        status_code: (response as any).status_code
      };
    
    return authData;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Make refresh request without authentication to avoid circular dependency
    const url = `${API_BASE_URL}/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    const data = await response.json();
    return data;
  }

  async logout(refreshToken: string): Promise<ApiResponse> {
    return this.makeRequest('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // User Methods
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.makeRequest('/users/me');
  }

  async updateUserProfile(profileData: Partial<User>): Promise<User> {
    const response = await this.makeRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response as unknown as User;
  }

  async updateDeviceInfo(deviceData: { device: { deviceId: string; os: string; model: string } }): Promise<User> {
    const response = await this.makeRequest('/users/device', {
      method: 'PUT',
      body: JSON.stringify(deviceData),
    });
    return response as unknown as User;
  }

  async deleteUser(): Promise<ApiResponse> {
    return this.makeRequest('/users/me', {
      method: 'DELETE',
    });
  }

  // Challenge Methods
  async getAllChallenges(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ challenges: Challenge[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/challenges/get-all?${queryString}` : '/challenges/get-all';
    
    return this.makeRequest(endpoint);
  }

  async getChallengeById(id: string): Promise<ApiResponse<Challenge>> {
    return this.makeRequest(`/challenges/${id}`);
  }

  async getChallengeBySlug(slug: string): Promise<ApiResponse<Challenge>> {
    return this.makeRequest(`/challenges/slug/${slug}`);
  }

  async joinChallenge(id: string): Promise<ApiResponse<{
    participant: ChallengeParticipant;
    challenge: Challenge;
  }>> {
    return this.makeRequest(`/challenges/${id}/join`, {
      method: 'POST',
    });
  }

  async joinMultipleChallenges(challengeIds: string[]): Promise<ApiResponse<any>> {
    const promises = challengeIds.map(id => this.joinChallenge(id));
    const results = await Promise.allSettled(promises);
    
    const successful = results
      .filter((result): result is PromiseFulfilledResult<ApiResponse<any>> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
    
    const failed = results
      .filter((result): result is PromiseRejectedResult => 
        result.status === 'rejected'
      )
      .map(result => result.reason);

    return {
      message: "Challenges joined successfully",
      data: {
        successful,
        failed,
        totalRequested: challengeIds.length,
        totalSuccessful: successful.length,
        totalFailed: failed.length
      },
      status_code: 200
    };
  }

  async getChallengeProgress(id: string): Promise<ApiResponse<{
    challenge: Challenge;
    participation: ChallengeParticipant;
    progress: {
      totalDays: number;
      daysElapsed: number;
      daysRemaining: number;
      progressPercentage: number;
    };
  }>> {
    return this.makeRequest(`/challenges/${id}/progress`);
  }

  async getMyChallenges(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ challenges: any[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/challenges/my-challenges?${queryString}` : '/challenges/my-challenges';
    
    return this.makeRequest(endpoint);
  }

  async updateChallengeProgress(
    id: string,
    progressData: {
      progressMetrics?: Record<string, any>;
      spiritScore?: number;
      consistencyPct?: number;
    }
  ): Promise<ApiResponse<ChallengeParticipant>> {
    return this.makeRequest(`/challenges/${id}/update-progress`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  }

  // Home Methods
  async getHomeData(): Promise<ApiResponse<{
    user: User;
    challenges: Challenge[];
    stats: any;
  }>> {
    return this.makeRequest('/home');
  }

}

export const apiService = new ApiService();
