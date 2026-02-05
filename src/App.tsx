import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ConnectButton from './components/ConnectButton';
import AdCreationForm from './components/AdCreationForm';
import OAuthCallback from './components/OAuthCallback';
import TikTokVerification from './components/TikTokVerification';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <header className="app-header">
              <div className="header-content">
                <h1>TikTok Ads Creative Flow</h1>
                <ConnectButton />
              </div>
            </header>

            <main className="app-main">
              <Routes>
                <Route path="/" element={<AdCreationForm />} />
                <Route path="/auth/callback" element={<OAuthCallback />} />
                <Route path="/tiktokhlp5h1wrlMz6FSavDE3ExkPlBvwP3iC3.txt" element={<TikTokVerification />} />
              </Routes>
            </main>

            <footer className="app-footer">
              <div className="footer-content">
                <p>&copy; 2024 TikTok Ads Creative Flow. Demo Application.</p>
                <p>
                  This is a demonstration application showcasing TikTok Ads API integration.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;