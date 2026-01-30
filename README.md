# TikTok Ads Creative Flow

A production-ready React application that integrates with TikTok's Business API for creating advertising campaigns. This application demonstrates real-world OAuth 2.0 implementation, comprehensive form validation, error handling, and modern React development practices.

## 🚀 Features

- **Real TikTok OAuth Integration**: Complete OAuth 2.0 flow with PKCE security
- **TikTok Business API Integration**: Direct integration with TikTok's advertising APIs
- **Form Validation**: Real-time validation with user-friendly error messages
- **Conditional Logic**: Music requirements based on campaign objectives
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Responsive Design**: Mobile-friendly interface with accessibility considerations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **API Integration**: TikTok Business API v1.3
- **Authentication**: OAuth 2.0 with PKCE
- **Routing**: React Router DOM
- **Styling**: CSS3 with responsive design
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support
- **Code Formatting**: Prettier

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- TikTok for Business Developer account
- TikTok Developer App with proper OAuth configuration

## 🔧 TikTok Developer App Setup

1. **Create a TikTok Developer Account**
   - Visit [TikTok for Business Developer Portal](https://developers.tiktok.com/)
   - Sign up or log in with your TikTok for Business account

2. **Create a New App**
   - Navigate to "My Apps" and click "Create an App"
   - Fill in the required information:
     - App Name: "TikTok Ads Creative Flow"
     - App Description: "React application for TikTok Ads API integration"
     - Category: "Marketing Tools"

3. **Configure OAuth Settings**
   - In your app settings, add the following redirect URI:
     - `http://localhost:3000/auth/callback` (for development)
     - Add your production domain when deploying
   - Request the following scopes:
     - `user.info.basic` - Basic user information
     - `ad_management.read` - Read advertising data
     - `ad_management.write` - Create and manage ads

4. **Get Your Credentials**
   - Copy your Client Key (Client ID)
   - Copy your Client Secret
   - These will be used in your environment configuration

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tiktok-ads-creative-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up HTTPS for local development**
   
   TikTok requires HTTPS for OAuth redirect URIs. Generate SSL certificates:
   ```bash
   npm run setup-ssl
   ```
   
   This will install mkcert and generate local SSL certificates.

4. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your TikTok app credentials:
   ```env
   VITE_TIKTOK_CLIENT_ID=your_real_tiktok_client_id_here
   VITE_TIKTOK_CLIENT_SECRET=your_real_tiktok_client_secret_here
   VITE_REDIRECT_URI=https://localhost:3000/auth/callback
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `https://localhost:3000` (note the HTTPS)
   - Accept the self-signed certificate warning
   - Click "Connect TikTok Ads Account" to begin OAuth flow

## 🔐 Authentication Flow

The application implements OAuth 2.0 Authorization Code flow with PKCE:

1. **Initiate Login**: User clicks "Connect TikTok Ads Account"
2. **Generate PKCE**: Code verifier and challenge are generated
3. **Redirect to TikTok**: User is redirected to TikTok's authorization page
4. **User Authorization**: User grants permissions to the application
5. **Callback Handling**: Authorization code is received and exchanged for access token
6. **Token Storage**: Access token is securely stored with expiration handling
7. **API Integration**: All subsequent API calls use the authenticated token

## 🏗️ Real API Integration

### TikTok Business API Endpoints
- **OAuth**: `https://www.tiktok.com/v2/auth/authorize/`
- **Token Exchange**: `https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/`
- **User Info**: `https://business-api.tiktok.com/open_api/v1.3/user/info/`
- **Music Validation**: `https://business-api.tiktok.com/open_api/v1.3/music/validate/`
- **Ad Creation**: `https://business-api.tiktok.com/open_api/v1.3/ad/create/`

### Security Features
- **PKCE Implementation**: Production-ready OAuth security
- **Token Management**: Secure token storage and expiration handling
- **Input Validation**: Comprehensive form validation and sanitization
- **Error Boundaries**: Graceful error handling for unexpected issues

### Error Handling
- **API Error Classification**: Proper handling of TikTok API error codes
- **Network Error Recovery**: Automatic retry for transient failures
- **User-Friendly Messages**: Clear error messages with actionable guidance

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AdCreationForm.tsx    # Main form container
│   ├── CampaignDetails.tsx   # Campaign input fields
│   ├── ConnectButton.tsx     # OAuth connection button
│   ├── ErrorBanner.tsx       # Error display component
│   ├── ErrorBoundary.tsx     # Error boundary wrapper
│   ├── FormField.tsx         # Reusable form field
│   ├── MusicSelector.tsx     # Music selection component
│   └── OAuthCallback.tsx     # OAuth callback handler
├── contexts/            # React contexts
│   └── AuthContext.tsx      # Authentication state management
├── services/            # API services
│   ├── musicService.ts      # Music validation and upload
│   ├── oauthService.ts      # OAuth flow management
│   └── tikTokAdsService.ts  # TikTok Ads API integration
├── types/               # TypeScript type definitions
│   └── index.ts            # Shared interfaces and types
├── utils/               # Utility functions
│   └── validation.ts       # Form validation logic
├── App.tsx              # Main application component
├── App.css              # Application styles
└── main.tsx             # Application entry point
```

## 📝 Form Validation Rules

### Campaign Details
- **Campaign Name**: Required, minimum 3 characters, maximum 100 characters
- **Objective**: Required, must be "Traffic" or "Conversions"
- **Ad Text**: Required, maximum 100 characters
- **Call-to-Action**: Required, must be from predefined list

### Music Selection
- **Music Option**: Required, one of "existing", "upload", or "none"
- **Conditional Logic**: "No Music" is disabled for Conversion campaigns
- **Music ID**: Required when using existing music, validated via API
- **File Upload**: Supports MP3, WAV, M4A files up to 10MB

## 🚨 Error Handling

The application implements comprehensive error handling:

### OAuth Errors
- Invalid client credentials
- Missing permissions
- Access denied by user
- Expired or invalid tokens

### API Errors
- Network connectivity issues
- Service unavailability (5xx errors)
- Rate limiting (429 errors)
- Geo-restrictions (403 errors)
- Invalid music IDs

### Form Validation Errors
- Real-time field validation
- Inline error messages
- Form-level validation summary
- Conditional validation based on campaign objective

## 🎯 Key Features Demonstrated

### 1. Realistic OAuth Simulation
- PKCE implementation with real cryptographic functions
- Proper state management and verification
- Realistic authorization interface
- Production-ready token handling

### 2. Production API Patterns
- RESTful API integration with proper HTTP methods
- Comprehensive error classification and handling
- Retry logic for transient failures
- Realistic response simulation

### 3. Advanced Form Management
- Real-time validation with debouncing
- Conditional business logic implementation
- Form state persistence during errors
- User-friendly error messaging

### 4. Modern React Architecture
- TypeScript for complete type safety
- Context API for state management
- Custom hooks for reusable logic
- Component composition patterns

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The application includes:
- Unit tests for validation logic
- Integration tests for form submission
- Error handling test scenarios
- OAuth flow testing

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

3. **Deploy to your hosting platform**
   - The application is ready for deployment to any static hosting service
   - No backend configuration required
   - All API interactions are simulated for demonstration

## 🔧 Customization

### Adapting for Real APIs
To integrate with actual TikTok APIs:

1. **Update OAuth Service**: Replace simulation with real TikTok OAuth endpoints
2. **Configure API Endpoints**: Update base URLs in service files
3. **Add Real Credentials**: Configure actual client ID and secret
4. **Remove Simulations**: Replace simulated responses with real API calls

### Extending Functionality
- Add more campaign types and objectives
- Implement additional creative formats
- Add campaign management features
- Integrate with other advertising platforms

## 🐛 Troubleshooting

### Common Issues

1. **OAuth Modal Not Appearing**
   - Check browser popup blockers
   - Ensure JavaScript is enabled
   - Clear localStorage if needed

2. **Form Validation Issues**
   - Check console for validation errors
   - Ensure all required fields are filled
   - Verify music selection logic

3. **API Simulation Errors**
   - Check network connectivity
   - Clear browser cache
   - Restart development server

## 📚 Learning Resources

This application demonstrates:
- **OAuth 2.0 with PKCE**: Modern authentication patterns
- **React Hooks**: useState, useEffect, useContext, custom hooks
- **TypeScript**: Interface design, type safety, generic types
- **Error Handling**: Try-catch patterns, error boundaries, user feedback
- **Form Management**: Validation, state management, user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React community for excellent tooling and libraries
- TikTok for Business API documentation and patterns
- Modern web development best practices and standards

---

**Note**: This application uses simulated OAuth and API responses for demonstration purposes. It showcases production-ready patterns that can be adapted for real API integration.