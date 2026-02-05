const TermsOfService = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Terms of Service</h1>
      <p><strong>Last Updated:</strong> February 6, 2026</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using TikTok Ads Creative Flow ("the Service"), you agree to be bound by these Terms of Service.
        This is a demonstration application for educational and development purposes.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        TikTok Ads Creative Flow is a web application that integrates with TikTok Ads API to demonstrate
        campaign creation, ad management, and creative workflows. The Service is provided as a demonstration
        and development tool.
      </p>

      <h2>3. User Accounts and Authentication</h2>
      <p>
        Users authenticate through TikTok's OAuth 2.0 system. We do not store passwords. Access tokens are
        stored securely in your browser's local storage and are used solely to interact with TikTok Ads API
        on your behalf.
      </p>

      <h2>4. Data Usage</h2>
      <p>
        The Service accesses your TikTok Ads account data only with your explicit authorization. We do not
        sell, share, or distribute your data to third parties. All data interactions are between you and
        TikTok's servers.
      </p>

      <h2>5. Limitations of Liability</h2>
      <p>
        This Service is provided "as is" without warranties of any kind. We are not responsible for any
        campaigns created, ad spend, or account issues resulting from use of this Service.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the Service constitutes
        acceptance of modified terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about these Terms of Service, please contact us through the GitHub repository.
      </p>
    </div>
  );
};

export default TermsOfService;
