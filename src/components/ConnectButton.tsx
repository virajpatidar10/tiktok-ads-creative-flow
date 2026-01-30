import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ConnectButton: React.FC = () => {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLogin = () => {
    setIsConnecting(true);
    // Reset connecting state after a delay in case of demo mode
    setTimeout(() => setIsConnecting(false), 3000);
    login();
  };

  if (isLoading || isConnecting) {
    return (
      <button disabled className="connect-button loading">
        {isConnecting ? 'Connecting...' : 'Loading...'}
      </button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="auth-status">
        <span className="user-info">
          Connected as {user.name}
        </span>
        <button onClick={logout} className="disconnect-button">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleLogin} className="connect-button">
      Connect TikTok Ads Account
    </button>
  );
};

export default ConnectButton;