import { AuthResult, UserProfile } from '../types';

export interface OAuthService {
  initiateLogin(): void;
  handleCallback(code: string): Promise<AuthResult>;
  refreshToken(): Promise<string>;
  logout(): void;
}

class TikTokOAuthService implements OAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private baseUrl = 'https://business-api.tiktok.com/open_api/v1.3';

  constructor() {
    this.clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '';
    this.redirectUri = import.meta.env.VITE_REDIRECT_URI || '';
  }

  // Generate PKCE code verifier and challenge
  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  initiateLogin(): void {
    if (!this.clientId || !this.redirectUri) {
      throw new Error('TikTok OAuth configuration is missing. Please set VITE_TIKTOK_CLIENT_ID and VITE_REDIRECT_URI in your environment variables.');
    }

    const codeVerifier = this.generateCodeVerifier();
    const state = this.generateCodeVerifier(); // Use same function for state
    
    // Store PKCE verifier and state for later verification
    localStorage.setItem('oauth_code_verifier', codeVerifier);
    localStorage.setItem('oauth_state', state);

    this.generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const params = new URLSearchParams({
        client_key: this.clientId,
        response_type: 'code',
        scope: 'user.info.basic,video.list,video.upload,ad_management.read,ad_management.write',
        redirect_uri: this.redirectUri,
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      });

      const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
      window.location.href = authUrl;
    });
  }

  async handleCallback(code: string, state?: string): Promise<AuthResult> {
    try {
      // Verify state parameter
      const storedState = localStorage.getItem('oauth_state');
      if (state && storedState !== state) {
        throw new Error('Invalid state parameter');
      }

      const codeVerifier = localStorage.getItem('oauth_code_verifier');
      if (!codeVerifier) {
        throw new Error('Missing code verifier');
      }

      // Exchange authorization code for access token
      const tokenResponse = await this.exchangeCodeForToken(code, codeVerifier);
      
      if (!tokenResponse.success) {
        return {
          success: false,
          error: tokenResponse.error || {
            code: 'TOKEN_EXCHANGE_FAILED',
            message: 'Failed to exchange authorization code for token'
          }
        };
      }

      // Store token with expiration
      const expiresAt = Date.now() + (tokenResponse.expires_in || 3600) * 1000;
      localStorage.setItem('tiktok_access_token', tokenResponse.access_token!);
      localStorage.setItem('tiktok_token_expires_at', expiresAt.toString());
      
      if (tokenResponse.refresh_token) {
        localStorage.setItem('tiktok_refresh_token', tokenResponse.refresh_token);
      }

      // Clean up OAuth flow data
      localStorage.removeItem('oauth_code_verifier');
      localStorage.removeItem('oauth_state');

      // Get user profile
      const userProfile = await this.getUserProfile(tokenResponse.access_token!);

      return {
        success: true,
        token: tokenResponse.access_token,
        user: userProfile
      };

    } catch (error) {
      console.error('OAuth callback error:', error);
      
      // Clean up OAuth flow data
      localStorage.removeItem('oauth_code_verifier');
      localStorage.removeItem('oauth_state');

      return {
        success: false,
        error: {
          code: 'OAUTH_CALLBACK_ERROR',
          message: this.getErrorMessage(error)
        }
      };
    }
  }

  private async exchangeCodeForToken(code: string, codeVerifier: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/oauth2/access_token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_key: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.code !== 0) {
        throw new Error(data.message || 'Token exchange failed');
      }

      return {
        success: true,
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
        expires_in: data.data.expires_in,
        token_type: data.data.token_type
      };
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  private async getUserProfile(token: string): Promise<UserProfile> {
    try {
      const response = await fetch(`${this.baseUrl}/user/info/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.code !== 0) {
        throw new Error(data.message || 'Failed to get user profile');
      }

      return {
        id: data.data.user.open_id,
        name: data.data.user.display_name,
        email: data.data.user.email || `${data.data.user.open_id}@tiktok.com`
      };
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('tiktok_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/oauth2/refresh_token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_key: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const newToken = data.access_token;
      const expiresAt = Date.now() + (data.expires_in || 3600) * 1000;

      localStorage.setItem('tiktok_access_token', newToken);
      localStorage.setItem('tiktok_token_expires_at', expiresAt.toString());

      if (data.refresh_token) {
        localStorage.setItem('tiktok_refresh_token', data.refresh_token);
      }

      return newToken;
    } catch (error) {
      // Clear invalid tokens
      this.logout();
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('tiktok_access_token');
    localStorage.removeItem('tiktok_refresh_token');
    localStorage.removeItem('tiktok_token_expires_at');
    localStorage.removeItem('oauth_code_verifier');
    localStorage.removeItem('oauth_state');
  }

  getStoredToken(): string | null {
    const token = localStorage.getItem('tiktok_access_token');
    const expiresAt = localStorage.getItem('tiktok_token_expires_at');

    if (!token || !expiresAt) {
      return null;
    }

    // Check if token is expired
    if (Date.now() >= parseInt(expiresAt)) {
      this.logout();
      return null;
    }

    return token;
  }

  private getErrorMessage(error: any): string {
    if (error.message?.includes('Invalid app configuration')) {
      return 'Invalid app configuration. Please contact support.';
    }
    if (error.message?.includes('Missing required advertising permissions')) {
      return 'Missing required advertising permissions. Please grant all requested permissions.';
    }
    return 'Authentication failed. Please try again.';
  }
}

export const oauthService = new TikTokOAuthService();