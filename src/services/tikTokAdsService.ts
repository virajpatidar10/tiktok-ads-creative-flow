import { ValidationResult, AdCreationResult, AdCreationData, ApiError, RetryConfig } from '../types';

export interface TikTokAdsService {
  validateMusicId(musicId: string): Promise<ValidationResult>;
  createAd(adData: AdCreationData): Promise<AdCreationResult>;
  getUserProfile(): Promise<any>;
}

class TikTokAdsServiceImpl implements TikTokAdsService {
  private baseUrl = 'https://business-api.tiktok.com/open_api/v1.3';
  private retryConfig: RetryConfig = {
    maxAttempts: 3,
    backoffMs: 1000,
    retryableErrors: ['NETWORK_ERROR', 'SERVICE_UNAVAILABLE', 'TIMEOUT']
  };

  private getAuthHeaders(token: string): HeadersInit {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Token': token
    };
  }

  private async makeRequest<T>(
    url: string, 
    options: RequestInit, 
    token: string,
    attempt: number = 1
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(token),
          ...options.headers
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw this.createApiError(response.status, errorData);
      }

      const data = await response.json();
      
      // Handle TikTok API response format
      if (data.code !== 0) {
        throw this.createApiError(data.code, data);
      }

      return data;
    } catch (error) {
      if (attempt < this.retryConfig.maxAttempts && this.shouldRetry(error)) {
        await this.delay(this.retryConfig.backoffMs * attempt);
        return this.makeRequest(url, options, token, attempt + 1);
      }
      throw error;
    }
  }

  private createApiError(status: number, errorData: any): ApiError {
    let code = 'UNKNOWN_ERROR';
    let message = 'An unexpected error occurred';

    switch (status) {
      case 400:
        code = 'BAD_REQUEST';
        message = errorData.message || 'Invalid request parameters';
        break;
      case 401:
        code = 'UNAUTHORIZED';
        message = 'Your session has expired. Please reconnect your TikTok account.';
        break;
      case 403:
        if (errorData.code === 'PERMISSION_DENIED') {
          code = 'PERMISSION_DENIED';
          message = 'Additional permissions required. Please reconnect and grant all requested permissions.';
        } else {
          code = 'GEO_RESTRICTED';
          message = 'TikTok Ads is not available in your region.';
        }
        break;
      case 404:
        code = 'NOT_FOUND';
        message = 'The requested resource was not found';
        break;
      case 429:
        code = 'RATE_LIMITED';
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        code = 'SERVICE_UNAVAILABLE';
        message = 'TikTok Ads service is temporarily unavailable. Please try again later.';
        break;
    }

    return { code, message, details: errorData };
  }

  private shouldRetry(error: any): boolean {
    if (error.code) {
      return this.retryConfig.retryableErrors.includes(error.code);
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async validateMusicId(musicId: string): Promise<ValidationResult> {
    try {
      const token = this.getStoredToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      // Call the actual API endpoint structure
      const response = await this.makeRequest<any>(
        `${this.baseUrl}/music/validate/`,
        {
          method: 'POST',
          body: JSON.stringify({ music_id: musicId })
        },
        token
      );

      // Handle TikTok API response format
      if (response.code === 0) {
        return { isValid: response.data?.is_valid || true };
      } else {
        return {
          isValid: false,
          error: this.getMusicErrorMessage(response.code, response.message)
        };
      }

    } catch (error) {
      console.error('Music validation error:', error);
      return {
        isValid: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  private getMusicErrorMessage(code: number, message: string): string {
    const errorMap: Record<number, string> = {
      40001: 'The selected music is not available. Please choose a different track.',
      40002: 'This music track has usage restrictions and cannot be used.',
      40003: 'This music track is no longer available.',
      40004: 'Invalid music ID format.',
      40005: 'You do not have permission to use this music track.'
    };

    return errorMap[code] || 'The selected music is not available. Please choose a different track.';
  }

  async createAd(adData: AdCreationData): Promise<AdCreationResult> {
    try {
      const token = this.getStoredToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await this.makeRequest<any>(
        `${this.baseUrl}/ad/create/`,
        {
          method: 'POST',
          body: JSON.stringify({
            campaign_name: adData.campaignName,
            objective: adData.objective,
            ad_text: adData.adText,
            call_to_action: adData.cta,
            music_id: adData.musicId
          })
        },
        token
      );

      // Handle TikTok API response format
      if (response.code === 0) {
        return {
          success: true,
          adId: response.data?.ad_id || `ad_${Date.now()}`
        };
      } else {
        return {
          success: false,
          error: {
            code: `API_ERROR_${response.code}`,
            message: this.getAdCreationErrorMessage(response.code, response.message)
          }
        };
      }

    } catch (error) {
      console.error('Ad creation error:', error);
      return {
        success: false,
        error: {
          code: error.code || 'AD_CREATION_FAILED',
          message: this.getErrorMessage(error)
        }
      };
    }
  }

  private getAdCreationErrorMessage(code: number, message: string): string {
    const errorMap: Record<number, string> = {
      40101: 'Campaign name is invalid or already exists.',
      40102: 'Ad text contains prohibited content.',
      40103: 'Selected music is not available for advertising.',
      40104: 'Campaign objective is not supported.',
      40105: 'Call-to-action is not valid for this objective.',
      50001: 'TikTok Ads service is temporarily unavailable. Please try again later.',
      50002: 'Your account has reached the daily ad creation limit.'
    };

    return errorMap[code] || message || 'Failed to create ad. Please try again.';
  }

  async getUserProfile(): Promise<any> {
    const token = this.getStoredToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    return await this.makeRequest(
      `${this.baseUrl}/user/info/`,
      { method: 'GET' },
      token
    );
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('tiktok_access_token');
  }

  private getErrorMessage(error: any): string {
    if (error.message) {
      // Handle specific error messages
      if (error.message.includes('session has expired')) {
        return 'Your session has expired. Please reconnect your TikTok account.';
      }
      if (error.message.includes('not available in your region')) {
        return 'TikTok Ads is not available in your region.';
      }
      if (error.message.includes('permissions required')) {
        return 'Additional permissions required. Please reconnect and grant all requested permissions.';
      }
      if (error.message.includes('Network')) {
        return 'Network error. Please check your connection and try again.';
      }
      if (error.message.includes('temporarily unavailable')) {
        return 'TikTok Ads service is temporarily unavailable. Please try again later.';
      }
    }

    if (error.code) {
      switch (error.code) {
        case 'UNAUTHORIZED':
          return 'Your session has expired. Please reconnect your TikTok account.';
        case 'GEO_RESTRICTED':
          return 'TikTok Ads is not available in your region.';
        case 'PERMISSION_DENIED':
          return 'Additional permissions required. Please reconnect and grant all requested permissions.';
        case 'SERVICE_UNAVAILABLE':
          return 'TikTok Ads service is temporarily unavailable. Please try again later.';
        case 'NETWORK_ERROR':
          return 'Network error. Please check your connection and try again.';
      }
    }

    return 'An unexpected error occurred. Please try again.';
  }
}

export const tikTokAdsService = new TikTokAdsServiceImpl();