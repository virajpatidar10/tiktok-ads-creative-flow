export interface AdFormData {
  campaignName: string;
  objective: 'Traffic' | 'Conversions';
  adText: string;
  cta: string;
  musicOption: 'existing' | 'upload' | 'none';
  musicId?: string;
}

export interface ValidationErrors {
  campaignName?: string;
  adText?: string;
  cta?: string;
  music?: string;
  global?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  user?: UserProfile;
  error?: ApiError;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface AdCreationResult {
  success: boolean;
  adId?: string;
  error?: ApiError;
}

export interface AdCreationData {
  campaignName: string;
  objective: string;
  adText: string;
  cta: string;
  musicId?: string;
}

export interface RetryConfig {
  maxAttempts: number;
  backoffMs: number;
  retryableErrors: string[];
}