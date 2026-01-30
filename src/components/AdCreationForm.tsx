import React, { useState, useCallback } from 'react';
import { AdFormData, ValidationErrors } from '../types';
import { formValidator } from '../utils/validation';
import { tikTokAdsService } from '../services/tikTokAdsService';
import { useAuth } from '../contexts/AuthContext';
import CampaignDetails from './CampaignDetails';
import MusicSelector from './MusicSelector';
import ErrorBanner from './ErrorBanner';

const initialFormData: AdFormData = {
  campaignName: '',
  objective: 'Traffic',
  adText: '',
  cta: '',
  musicOption: 'existing',
  musicId: ''
};

const AdCreationForm: React.FC = () => {
  const { isAuthenticated, token } = useAuth();
  const [formData, setFormData] = useState<AdFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleFieldChange = useCallback((field: keyof AdFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear global error when user makes changes
    if (globalError) {
      setGlobalError(null);
    }

    // Clear success message when user makes changes
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  }, [errors, globalError, submitSuccess]);

  const handleFieldBlur = useCallback((field: keyof AdFormData) => {
    const value = formData[field];
    const error = formValidator.validateField(field, value, formData);
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [formData]);

  const handleValidationChange = useCallback((field: keyof ValidationErrors, error: string | null) => {
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const validationErrors = formValidator.validateForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !token) {
      setGlobalError('Please connect your TikTok account first.');
      return;
    }

    // Validate form
    if (!validateForm()) {
      setGlobalError('Please fix the errors above before submitting.');
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const adData = {
        campaignName: formData.campaignName.trim(),
        objective: formData.objective,
        adText: formData.adText.trim(),
        cta: formData.cta,
        musicId: formData.musicOption !== 'none' ? formData.musicId : undefined
      };

      const result = await tikTokAdsService.createAd(adData);

      if (result.success) {
        setSubmitSuccess(true);
        setFormData(initialFormData); // Reset form
        setErrors({});
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorMessage = result.error?.message || 'Failed to create ad. Please try again.';
        setGlobalError(errorMessage);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setGlobalError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setGlobalError(null);
    setSubmitSuccess(false);
  };

  const handleRetry = () => {
    setGlobalError(null);
    handleSubmit(new Event('submit') as any);
  };

  const isFormValid = formValidator.isFormValid(formData);
  const hasErrors = Object.keys(errors).some(key => errors[key as keyof ValidationErrors]);

  if (!isAuthenticated) {
    return (
      <div className="form-container">
        <div className="auth-required">
          <h2>Connect Your TikTok Account</h2>
          <p>Please connect your TikTok Ads account to create ads.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      {submitSuccess && (
        <div className="success-banner">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <div>
              <h3>Ad created successfully!</h3>
              <p>Your ad has been submitted and is being processed.</p>
            </div>
          </div>
        </div>
      )}

      {globalError && (
        <ErrorBanner
          message={globalError}
          onRetry={globalError.includes('try again') ? handleRetry : undefined}
          onDismiss={() => setGlobalError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="ad-creation-form" noValidate>
        <div className="form-header">
          <h2>Create TikTok Ad</h2>
          <p>Fill in the details below to create your TikTok advertising campaign.</p>
        </div>

        <CampaignDetails
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />

        <MusicSelector
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onValidationChange={handleValidationChange}
        />

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="button-secondary"
            disabled={isSubmitting}
          >
            Reset Form
          </button>
          
          <button
            type="submit"
            className="button-primary"
            disabled={!isFormValid || hasErrors || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Creating Ad...
              </>
            ) : (
              'Create Ad'
            )}
          </button>
        </div>

        {(!isFormValid || hasErrors) && (
          <div className="form-validation-summary">
            <p>Please complete all required fields to submit your ad.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdCreationForm;