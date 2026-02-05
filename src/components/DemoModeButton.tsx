import React from 'react';

interface DemoModeButtonProps {
  onEnableDemoMode: () => void;
}

const DemoModeButton: React.FC<DemoModeButtonProps> = ({ onEnableDemoMode }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      background: '#ff6b6b',
      padding: '10px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px'
    }}
    onClick={onEnableDemoMode}
    title="Click to simulate authenticated state for demo video"
    >
      🎥 Enable Demo Mode
    </div>
  );
};

export default DemoModeButton;
