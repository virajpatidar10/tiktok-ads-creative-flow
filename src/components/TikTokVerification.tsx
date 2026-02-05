import { useEffect } from 'react';

const TikTokVerification = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: 'monospace' }}>
      tiktok-developers-site-verification=hlp5h1wrlMz6FSavDE3ExkPlBvwP3iC3
    </div>
  );
};

export default TikTokVerification;
