import React, { useState, useRef } from 'react';
import { AdFormData, ValidationErrors } from '../types';
import { musicService } from '../services/musicService';
import FormField from './FormField';

interface MusicSelectorProps {
  formData: AdFormData;
  errors: ValidationErrors;
  onChange: (field: keyof AdFormData, value: string) => void;
  onValidationChange?: (field: keyof ValidationErrors, error: string | null) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  formData,
  errors,
  onChange,
  onValidationChange
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMusicOptionChange = (option: string) => {
    onChange('musicOption', option);
    
    // Clear music ID when changing options
    if (option === 'none') {
      onChange('musicId', '');
    }

    // Validate music requirement based on campaign objective
    const validationError = musicService.validateMusicRequirement(formData.objective, option);
    if (onValidationChange) {
      onValidationChange('music', validationError?.error || null);
    }
  };

  const handleMusicIdChange = async (value: string) => {
    onChange('musicId', value);
    
    if (formData.musicOption === 'existing' && value.trim()) {
      setIsValidating(true);
      try {
        const result = await musicService.validateMusicId(value);
        if (onValidationChange) {
          onValidationChange('musicId', result.isValid ? null : result.error || null);
        }
      } catch (error) {
        if (onValidationChange) {
          onValidationChange('musicId', 'Unable to validate music ID');
        }
      } finally {
        setIsValidating(false);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const musicId = await musicService.simulateUpload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      onChange('musicId', musicId);
      if (onValidationChange) {
        onValidationChange('musicId', null);
      }

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      if (onValidationChange) {
        onValidationChange('musicId', errorMessage);
      }
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isNoMusicDisabled = formData.objective === 'Conversions';

  return (
    <div className="music-selector">
      <h3>Music Selection</h3>
      
      <FormField
        label="Music Options"
        error={errors.music}
        required
      >
        <div className="music-options">
          <label className="music-option">
            <input
              type="radio"
              name="musicOption"
              value="existing"
              checked={formData.musicOption === 'existing'}
              onChange={() => handleMusicOptionChange('existing')}
            />
            <span className="option-label">Use Existing Music ID</span>
          </label>

          <label className="music-option">
            <input
              type="radio"
              name="musicOption"
              value="upload"
              checked={formData.musicOption === 'upload'}
              onChange={() => handleMusicOptionChange('upload')}
            />
            <span className="option-label">Upload Custom Music</span>
          </label>

          <label className={`music-option ${isNoMusicDisabled ? 'disabled' : ''}`}>
            <input
              type="radio"
              name="musicOption"
              value="none"
              checked={formData.musicOption === 'none'}
              onChange={() => handleMusicOptionChange('none')}
              disabled={isNoMusicDisabled}
            />
            <span className="option-label">
              No Music
              {isNoMusicDisabled && (
                <span className="disabled-reason">
                  (Required for Conversion campaigns)
                </span>
              )}
            </span>
          </label>
        </div>
      </FormField>

      {formData.musicOption === 'existing' && (
        <FormField
          label="Music ID"
          error={errors.music}
          required
        >
          <div className="music-id-input">
            <input
              type="text"
              value={formData.musicId || ''}
              onChange={(e) => handleMusicIdChange(e.target.value)}
              placeholder="Enter TikTok music ID"
              className="form-input"
              maxLength={50}
            />
            {isValidating && (
              <div className="validation-spinner">
                <span className="spinner"></span>
                Validating...
              </div>
            )}
          </div>
        </FormField>
      )}

      {formData.musicOption === 'upload' && (
        <FormField
          label="Upload Music File"
          error={errors.music}
          required
        >
          <div className="file-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="file-input"
            />
            
            {isUploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  Uploading... {uploadProgress}%
                </span>
              </div>
            )}

            {formData.musicId && !isUploading && (
              <div className="upload-success">
                <span className="success-icon">✓</span>
                Music uploaded successfully
                <span className="music-id">ID: {formData.musicId}</span>
              </div>
            )}

            <div className="upload-help">
              Supported formats: MP3, WAV, M4A (max 10MB)
            </div>
          </div>
        </FormField>
      )}

      {formData.musicOption === 'none' && !isNoMusicDisabled && (
        <div className="no-music-info">
          <p>No music will be added to your ad.</p>
        </div>
      )}
    </div>
  );
};

export default MusicSelector;