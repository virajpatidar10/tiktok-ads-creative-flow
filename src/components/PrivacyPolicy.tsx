const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> February 6, 2026</p>
      
      <h2>1. Information We Collect</h2>
      <p>
        TikTok Ads Creative Flow collects and processes the following information:
      </p>
      <ul>
        <li><strong>Authentication Data:</strong> OAuth tokens provided by TikTok for API access</li>
        <li><strong>TikTok Account Data:</strong> Advertiser account information, campaign data as authorized by you</li>
        <li><strong>Usage Data:</strong> Information about how you interact with the Service</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information solely to:
      </p>
      <ul>
        <li>Authenticate you with TikTok Ads API</li>
        <li>Create and manage ad campaigns on your behalf</li>
        <li>Display your campaign and account information</li>
        <li>Provide the core functionality of the Service</li>
      </ul>

      <h2>3. Data Storage</h2>
      <p>
        All authentication tokens are stored locally in your browser's local storage. We do not store your
        TikTok credentials or tokens on any server. Campaign data is retrieved directly from TikTok's API
        and is not permanently stored by our Service.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        We do not sell, trade, or share your personal information with third parties. All data interactions
        are directly between your browser and TikTok's servers.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        This Service integrates with TikTok Ads API. Your use of TikTok services is governed by TikTok's
        Privacy Policy and Terms of Service.
      </p>

      <h2>6. Security</h2>
      <p>
        We implement industry-standard security measures including HTTPS encryption, OAuth 2.0 with PKCE,
        and secure token storage. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        You can revoke access to your TikTok account at any time through TikTok's app settings. You can
        also clear your local browser data to remove stored tokens.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        This Service is not intended for users under 18 years of age. We do not knowingly collect
        information from children.
      </p>

      <h2>9. Changes to Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify users of significant changes
        by updating the "Last Updated" date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us through the GitHub repository.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
