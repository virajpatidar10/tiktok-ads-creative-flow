# TikTok App Setup Guide

## 1. TikTok for Business Developer Portal Configuration

### Redirect URIs to Add:
⚠️ **Important**: TikTok Login Kit does NOT accept localhost URLs, even with HTTPS.

**Development Options:**

**Option 1: Using ngrok (Recommended)**
```
https://your-ngrok-id.ngrok.io/auth/callback
```

**Option 2: Using local domain**
```
https://dev.yourapp.local:3000/auth/callback
```

**Option 3: Staging deployment**
```
https://your-app-staging.vercel.app/auth/callback
```

**Production:**
```
https://yourdomain.com/auth/callback
```

### Required Permissions:
Make sure your TikTok app has these scopes enabled:
- `user.info.basic` - Basic user information
- `video.list` - List user videos
- `video.upload` - Upload videos
- `ad_management.read` - Read advertising data
- `ad_management.write` - Create and manage ads

## 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Update `.env` with your actual TikTok app credentials:
   ```
   VITE_TIKTOK_CLIENT_ID=your_actual_client_id
   VITE_TIKTOK_CLIENT_SECRET=your_actual_client_secret
   VITE_REDIRECT_URI=https://localhost:3000/auth/callback
   ```

## 3. Development Setup Options

Since TikTok doesn't accept localhost URLs, choose one of these options:

### Option 1: ngrok (Recommended)

1. Install ngrok:
   ```bash
   npm install -g ngrok
   ```

2. Start your dev server:
   ```bash
   npm run dev
   ```

3. In another terminal, create a tunnel:
   ```bash
   ngrok http 3000
   ```

4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and:
   - Add `https://abc123.ngrok.io/auth/callback` to your TikTok app redirect URIs
   - Update your `.env` file:
     ```
     VITE_REDIRECT_URI=https://abc123.ngrok.io/auth/callback
     ```

### Option 2: Local Domain

1. Edit your hosts file (`C:\Windows\System32\drivers\etc\hosts`):
   ```
   127.0.0.1 dev.yourapp.local
   ```

2. Update your `.env` file:
   ```
   VITE_REDIRECT_URI=https://dev.yourapp.local:3000/auth/callback
   ```

3. Add this URI to your TikTok app settings

### Option 3: Staging Deployment

Deploy to Vercel, Netlify, or similar service and use that URL for development testing.

## 4. SSL Certificate for Development

Since TikTok requires HTTPS redirect URIs, you need SSL for local development:

1. Run the SSL certificate generator:
   ```bash
   node generate-ssl.js
   ```

2. Start your development server with HTTPS enabled

## 5. Testing OAuth Flow

1. Start your development server
2. Click "Connect TikTok Account" 
3. You should be redirected to TikTok for authorization
4. After approval, you'll be redirected back to `/auth/callback`
5. The app will process the authorization code and redirect to the main app

## Troubleshooting

- **"Invalid redirect URI"**: TikTok doesn't accept localhost URLs. Use ngrok, local domain, or staging deployment
- **"Invalid client"**: Check your client ID and secret are correct
- **"Missing permissions"**: Ensure all required scopes are enabled in your TikTok app
- **ngrok session expired**: Free ngrok URLs change on restart. Update your TikTok app settings with the new URL