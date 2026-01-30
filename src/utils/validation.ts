import { AdFormData, ValidationErrors } from '../types';

export interface ValidationRule {
  field: keyof AdFormData;
  validate: (value: any, formData: AdFormData) => string | null;
}

export class FormValidator {
  private rules: ValidationRule[] = [
    {
      field: 'campaignName',
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Campaign name is required';
        }
        if (value.trim().length < 3) {
          return 'Campaign name must be at least 3 characters';
        }
        if (value.length > 100) {
          return 'Campaign name cannot exceed 100 characters';
        }
        return null;
      }
    },
    {
      field: 'objective',
      validate: (value: string) => {
        if (!value) {
          return 'Campaign objective is required';
        }
        if (!['Traffic', 'Conversions'].includes(value)) {
          return 'Please select a valid campaign objective';
        }
        return null;
      }
    },
    {
      field: 'adText',
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Ad text is required';
        }
        if (value.length > 100) {
          return 'Ad text cannot exceed 100 characters';
        }
        return null;
      }
    },
    {
      field: 'cta',
      validate: (value: string) => {
        if (!value) {
          return 'Call-to-action is required';
        }
        const validCTAs = [
          'Learn More',
          'Shop Now',
          'Sign Up',
          'Download',
          'Watch More',
          'Contact Us'
        ];
        if (!validCTAs.includes(value)) {
          return 'Please select a valid call-to-action';
        }
        return null;
      }
    },
    {
      field: 'musicOption',
      validate: (value: string, formData: AdFormData) => {
        if (!value) {
          return 'Music selection is required';
        }
        
        const validOptions = ['existing', 'upload', 'none'];
        if (!validOptions.includes(value)) {
          return 'Please select a valid music option';
        }

        // Conditional validation based on campaign objective
        if (formData.objective === 'Conversions' && value === 'none') {
          return 'Music is required for Conversion campaigns';
        }

        return null;
      }
    },
    {
      field: 'musicId',
      validate: (value: string, formData: AdFormData) => {
        // Only validate musicId if music option requires it
        if (formData.musicOption === 'existing' || formData.musicOption === 'upload') {
          if (!value || value.trim().length === 0) {
            return formData.musicOption === 'existing' 
              ? 'Music ID is required' 
              : 'Please upload a music file';
          }
          
          if (formData.musicOption === 'existing') {
            if (value.length < 3) {
              return 'Music ID must be at least 3 characters';
            }
            if (value.length > 50) {
              return 'Music ID is too long';
            }
          }
        }
        return null;
      }
    }
  ];

  validateField(field: keyof AdFormData, value: any, formData: AdFormData): string | null {
    const rule = this.rules.find(r => r.field === field);
    if (!rule) return null;
    
    return rule.validate(value, formData);
  }

  validateForm(formData: AdFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    this.rules.forEach(rule => {
      const value = formData[rule.field];
      const error = rule.validate(value, formData);
      if (error) {
        errors[rule.field] = error;
      }
    });

    return errors;
  }

  isFormValid(formData: AdFormData): boolean {
    const errors = this.validateForm(formData);
    return Object.keys(errors).length === 0;
  }

  // Helper method to validate individual fields with debouncing
  createDebouncedValidator(field: keyof AdFormData, delay: number = 300) {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return (value: any, formData: AdFormData, callback: (error: string | null) => void) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const error = this.validateField(field, value, formData);
        callback(error);
      }, delay);
    };
  }

  // Get user-friendly error messages
  getFieldLabel(field: keyof AdFormData): string {
    const labels: Record<keyof AdFormData, string> = {
      campaignName: 'Campaign Name',
      objective: 'Campaign Objective',
      adText: 'Ad Text',
      cta: 'Call-to-Action',
      musicOption: 'Music Selection',
      musicId: 'Music'
    };
    return labels[field] || field;
  }

  // Validate specific business rules
  validateMusicRequirement(objective: string, musicOption: string): string | null {
    if (objective === 'Conversions' && musicOption === 'none') {
      return 'Music is required for Conversion campaigns';
    }
    return null;
  }

  // Check if field should be displayed based on other field values
  shouldShowField(field: keyof AdFormData, formData: AdFormData): boolean {
    switch (field) {
      case 'musicId':
        return formData.musicOption === 'existing' || formData.musicOption === 'upload';
      default:
        return true;
    }
  }

  // Get available options for select fields
  getFieldOptions(field: keyof AdFormData): Array<{ value: string; label: string }> {
    switch (field) {
      case 'objective':
        return [
          { value: '', label: 'Select objective...' },
          { value: 'Traffic', label: 'Traffic' },
          { value: 'Conversions', label: 'Conversions' }
        ];
      case 'cta':
        return [
          { value: '', label: 'Select call-to-action...' },
          { value: 'Learn More', label: 'Learn More' },
          { value: 'Shop Now', label: 'Shop Now' },
          { value: 'Sign Up', label: 'Sign Up' },
          { value: 'Download', label: 'Download' },
          { value: 'Watch More', label: 'Watch More' },
          { value: 'Contact Us', label: 'Contact Us' }
        ];
      case 'musicOption':
        return [
          { value: 'existing', label: 'Use Existing Music ID' },
          { value: 'upload', label: 'Upload Custom Music' },
          { value: 'none', label: 'No Music' }
        ];
      default:
        return [];
    }
  }
}

export const formValidator = new FormValidator();