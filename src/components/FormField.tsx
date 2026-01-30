import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required = false, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`form-field ${className} ${error ? 'has-error' : ''}`}>
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="form-input-wrapper">
        {children}
      </div>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;