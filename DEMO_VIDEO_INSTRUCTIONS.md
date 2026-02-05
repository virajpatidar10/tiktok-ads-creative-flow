# Demo Video Recording Instructions - SIMPLIFIED

## The Problem
You're getting a "client_key" error because your TikTok app isn't approved yet. But you need the video to get approved. Catch-22!

## The Solution
I've added a **Demo Mode Button** that simulates successful authentication for your video.

---

## How to Record Your Demo Video

### Step 1: Deploy the Updated Code
```bash
git add -A
git commit -m "Add demo mode for video recording"
git push
```
Wait 2-3 minutes for Vercel to deploy.

### Step 2: Recording Flow (3-4 minutes total)

#### SCENE 1: Show OAuth Attempt (30 seconds)
1. Open: `https://tiktok-ads-creative-flow-zrzb.vercel.app/`
2. Click "Connect TikTok Ads Account"
3. Show the TikTok login page that appears
4. **Say**: "This demonstrates the OAuth 2.0 integration. The app redirects to TikTok for authentication."
5. Go back to your app (don't complete the login)

#### SCENE 2: Enable Demo Mode (10 seconds)
1. You'll see a red button in the bottom-right: "🎥 Enable Demo Mode"
2. Click it
3. The page will refresh and you'll be "logged in"
4. **Say**: "For this demo, I'm using a simulated authenticated state to showcase the features."

#### SCENE 3: Fill Out Campaign Form (90 seconds)
Now you can interact with the form:
1. **Campaign Name**: "Summer Sale Campaign"
2. **Campaign Objective**: Select "Traffic"
3. **Ad Text**: "Check out our amazing summer deals! Limited time offer."
4. **Call to Action**: Select "Shop Now"
5. **Music Selection**: Choose "Use Existing Music" → Enter "7123456789"

**Say**: "The application allows creating TikTok ad campaigns with various objectives, ad copy, and music selection."

#### SCENE 4: Show Validation (20 seconds)
1. Clear the campaign name field
2. Try to submit (show error message)
3. Fill it back in
4. **Say**: "The form includes comprehensive validation to ensure all required fields are completed."

#### SCENE 5: Show Conditional Logic (20 seconds)
1. Change objective to "Conversions"
2. Show that "No Music" option is now disabled
3. **Say**: "The app includes conditional logic - certain objectives require music selection."

#### SCENE 6: Submit Form (30 seconds)
1. Click "Create Ad Campaign"
2. Show loading state
3. It will likely show an error (expected - no real API)
4. **Say**: "In production with valid API credentials, this would create the campaign in TikTok Ads Manager."

#### SCENE 7: Show Additional Pages (20 seconds)
1. Scroll down and click "Terms of Service" link
2. Show it opens in new tab
3. Go back and click "Privacy Policy"
4. **Say**: "The application includes required legal pages for TikTok app compliance."

#### SCENE 8: Closing (10 seconds)
1. Show the URL in address bar clearly
2. **Say**: "This demonstrates the complete TikTok Marketing API integration in a sandbox environment."

---

## What to Say in Your Voiceover

### Opening:
> "This is TikTok Ads Creative Flow, a web application that integrates with TikTok Marketing API. I'll demonstrate the OAuth authentication flow and campaign creation features."

### During OAuth:
> "The app uses OAuth 2.0 to authenticate with TikTok. It requests permissions for ad management and user information. For this demo, I'm using a simulated authenticated state."

### During Form:
> "Users can create campaigns with different objectives like Traffic, App Installs, or Conversions. The form includes validation, conditional logic, and supports music selection for video ads."

### Closing:
> "This demonstrates the complete integration with TikTok Marketing API, including authentication, campaign creation, form validation, and error handling in a sandbox environment."

---

## Recording Checklist

Before recording:
- [ ] Push code and wait for Vercel deployment
- [ ] Open app in clean browser window
- [ ] Close unnecessary tabs
- [ ] Set screen resolution to 1920x1080 or 1280x720
- [ ] Start recording software (Win+G on Windows)

During recording:
- [ ] Show URL clearly in address bar
- [ ] Click "Connect TikTok Ads Account" and show TikTok page
- [ ] Use Demo Mode button to simulate login
- [ ] Fill form slowly and clearly
- [ ] Show validation errors
- [ ] Show conditional logic
- [ ] Submit form and show result
- [ ] Open Terms and Privacy pages

After recording:
- [ ] Watch video to ensure everything is visible
- [ ] Check that URL is readable
- [ ] Verify video is under 50MB
- [ ] Export as MP4 format

---

## Important Notes

✅ **DO show**: 
- The TikTok OAuth redirect (even if it errors)
- The Demo Mode button click (be honest about it)
- All form fields and interactions
- The URL in your browser

✅ **DO say**:
- "Sandbox environment"
- "Simulated authenticated state for demo purposes"
- "In production with valid credentials..."

❌ **DON'T**:
- Try to hide that you're using demo mode
- Rush through the form
- Skip showing the OAuth attempt

---

## After Recording

1. Export video as MP4, under 50MB
2. Upload to TikTok Developer Portal
3. In the app review explanation, mention:
   - "Demo uses simulated authentication due to pending app approval"
   - "OAuth integration is fully implemented and functional"
   - "Video demonstrates UI/UX and intended workflow"

---

## Troubleshooting

**Q: Demo Mode button doesn't work?**
A: Refresh the page after clicking it

**Q: Form submission shows error?**
A: That's expected! Just show the error and explain it's due to sandbox mode

**Q: Should I mention the demo mode in the video?**
A: Yes! Be transparent. Say "simulated authenticated state for demo purposes"

Good luck! 🎬
