import React from 'react';
import { AdFormData, ValidationErrors } from '../types';
import { formValidator } from '../utils/validation';
import FormField from './FormField';

interface CampaignDetailsProps {
  formData: AdFormData;
  errors: ValidationErrors;
  onChange: (field: keyof AdFormData, value: string) => void;
  onBlur?: (field: keyof AdFormData) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  formData,
  errors,
  onChange,
  onBlur
}) => {
  const handleInputChange = (field: keyof AdFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange(field, e.target.value);
  };

  const handleInputBlur = (field: keyof AdFormData) => () => {
    if (onBlur) {
      onBlur(field);
    }
  };

  const objectiveOptions = formValidator.getFieldOptions('objective');
  const ctaOptions = formValidator.getFieldOptions('cta');

  return (
    <div className="campaign-details">
      <h3>Campaign Details</h3>
      
      <FormField
        label="Campaign Name"
        error={errors.campaignName}
        required
      >
        <input
          type="text"
          value={formData.campaignName}
          onChange={handleInputChange('campaignName')}
          onBlur={handleInputBlur('campaignName')}
          placeholder="Enter campaign name"
          className="form-input"
          maxLength={100}
        />
        <div className="character-count">
          {formData.campaignName.length}/100
        </div>
      </FormField>

      <FormField
        label="Campaign Objective"
        error={errors.objective}
        required
      >
        <select
          value={formData.objective}
          onChange={handleInputChange('objective')}
          onBlur={handleInputBlur('objective')}
          className="form-select"
        >
          {objectiveOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Ad Text"
        error={errors.adText}
        required
      >
        <textarea
          value={formData.adText}
          onChange={handleInputChange('adText')}
          onBlur={handleInputBlur('adText')}
          placeholder="Enter your ad text"
          className="form-textarea"
          rows={3}
          maxLength={100}
        />
        <div className="character-count">
          {formData.adText.length}/100
        </div>
      </FormField>

      <FormField
        label="Call-to-Action"
        error={errors.cta}
        required
      >
        <select
          value={formData.cta}
          onChange={handleInputChange('cta')}
          onBlur={handleInputBlur('cta')}
          className="form-select"
        >
          {ctaOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
};

export default CampaignDetails;