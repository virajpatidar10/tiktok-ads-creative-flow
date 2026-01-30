import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { oauthService } from '../services/oauthService';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Handle OAuth errors
        if (error) {
          let errorMessage = 'Authentication failed';
          
          switch (error) {
            case 'access_denied':
              errorMessage = 'Access denied. Please grant the required permissions.';
              break;
            case 'invalid_client':
              errorMessage = 'Invalid app configuration. Please contact support.';
              break;
            case 'invalid_scope':
              errorMessage = 'Missing required advertising permissions. Please grant all requested permissions.';
              break;
            default:
              errorMessage = errorDescription || 'Authentication failed. Please try again.';
          }
          
          setError(errorMessage);
          setIsProcessing(false);
          return;
        }

        if (!code) {
          setError('No authorization code received. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Exchange code for token
        const result = await oauthService.handleCallback(code, state || undefined);
        
        if (result.success) {
          // Redirect to main app
          navigate('/', { replace: true });
          // Trigger a page reload to update auth state
          window.location.reload();
        } else {
          const errorMessage = result.error?.message || 'Authentication failed';
          setError(errorMessage);
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('An unexpected error occurred during authentication.');
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (isProcessing) {
    return (
      <div className="oauth-callback">
        <div className="callback-content">
          <div className="loading-spinner"></div>
          <h2>Connecting your TikTok account...</h2>
          <p>Please wait while we complete the authentication process.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="oauth-callback">
        <div className="callback-content error">
          <h2>Authentication Failed</h2>
          <p className="error-message">{error}</p>
          <div className="callback-actions">
            <button 
              onClick={() => navigate('/', { replace: true })}
              className="button-primary"
            >
              Return to App
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="button-secondary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="oauth-callback">
      <div className="callback-content success">
        <h2>Authentication Successful!</h2>
        <p>Redirecting you to the app...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;