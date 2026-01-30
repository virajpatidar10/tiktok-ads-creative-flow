import { ValidationResult } from '../types';
import { tikTokAdsService } from './tikTokAdsService';

export interface MusicService {
  validateMusicId(musicId: string): Promise<ValidationResult>;
  simulateUpload(file: File): Promise<string>;
  generateMockMusicId(): string;
}

class MusicServiceImpl implements MusicService {
  async validateMusicId(musicId: string): Promise<ValidationResult> {
    if (!musicId || musicId.trim().length === 0) {
      return {
        isValid: false,
        error: 'Music ID is required'
      };
    }

    // Basic format validation
    if (musicId.length < 3) {
      return {
        isValid: false,
        error: 'Music ID must be at least 3 characters long'
      };
    }

    if (musicId.length > 50) {
      return {
        isValid: false,
        error: 'Music ID is too long'
      };
    }

    // Use TikTok Ads service for actual validation
    try {
      return await tikTokAdsService.validateMusicId(musicId);
    } catch (error) {
      console.error('Music validation service error:', error);
      return {
        isValid: false,
        error: 'Unable to validate music ID. Please try again.'
      };
    }
  }

  async simulateUpload(file: File): Promise<string> {
    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload an MP3, WAV, or M4A file.');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size too large. Please upload a file smaller than 10MB.');
    }

    // This would normally upload to TikTok's media upload endpoint
    // For now, we'll throw an error indicating real upload is needed
    throw new Error('Music upload requires TikTok Business API integration. Please use an existing Music ID instead.');
  }

  generateMockMusicId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `music_${timestamp}_${random}`;
  }

  // Helper method to validate music requirements based on campaign objective
  validateMusicRequirement(objective: string, musicOption: string): ValidationResult {
    if (objective === 'Conversions' && musicOption === 'none') {
      return {
        isValid: false,
        error: 'Music is required for Conversion campaigns'
      };
    }

    return { isValid: true };
  }

  // Helper method to get user-friendly error messages
  getValidationErrorMessage(error: string): string {
    const errorMap: Record<string, string> = {
      'MUSIC_NOT_FOUND': 'The selected music is not available. Please choose a different track.',
      'MUSIC_RESTRICTED': 'This music track has usage restrictions and cannot be used.',
      'MUSIC_EXPIRED': 'This music track is no longer available.',
      'INVALID_FORMAT': 'Invalid music ID format.',
      'PERMISSION_DENIED': 'You do not have permission to use this music track.'
    };

    return errorMap[error] || 'The selected music is not available. Please choose a different track.';
  }
}

export const musicService = new MusicServiceImpl();