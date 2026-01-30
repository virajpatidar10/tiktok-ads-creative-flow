import React from 'react';

interface ErrorBannerProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  type = 'error',
  onRetry,
  onDismiss,
  retryLabel = 'Try Again',
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'error':
      default:
        return '❌';
    }
  };

  return (
    <div className={`error-banner ${type} ${className}`} role="alert">
      <div className="error-content">
        <span className="error-icon">{getIcon()}</span>
        <div className="error-message">
          {message}
        </div>
      </div>
      
      <div className="error-actions">
        {onRetry && (
          <button
            onClick={onRetry}
            className="retry-button"
            type="button"
          >
            {retryLabel}
          </button>
        )}
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="dismiss-button"
            type="button"
            aria-label="Dismiss error"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBanner;