# TikTok Ads Creative Flow - Demo Video Script

## Video Requirements Checklist
- ✅ Format: MP4 or MOV
- ✅ Duration: 3-5 minutes (keep it concise)
- ✅ Show complete OAuth flow
- ✅ Display the actual website URL in browser
- ✅ Demonstrate all requested scopes/permissions
- ✅ Show user interface and interactions clearly
- ✅ Use sandbox environment (mention this verbally)

---

## Recording Setup

### Tools You Can Use:
- **Windows**: Xbox Game Bar (Win + G) - Built-in, free
- **Cross-platform**: OBS Studio (free), Loom (free tier), or ShareX
- **Quick option**: Zoom meeting with screen share + record

### Before Recording:
1. Close unnecessary browser tabs
2. Clear browser console errors (F12 > Console > Clear)
3. Have your app running at: `https://tiktok-ads-creative-flow-zrzb.vercel.app/`
4. Test the flow once before recording
5. Prepare a TikTok test account (or be ready to login)

---

## Video Script (3-4 minutes)

### SCENE 1: Introduction (15 seconds)
**What to show:**
- Open browser and navigate to: `https://tiktok-ads-creative-flow-zrzb.vercel.app/`
- Make sure the URL is clearly visible in the address bar

**What to say (optional voiceover):**
> "This is TikTok Ads Creative Flow, a web application that integrates with TikTok Marketing API for campaign management. I'll demonstrate the OAuth authentication flow and campaign creation features."

**Actions:**
- Show the landing page with the "Connect TikTok Ads Account" button
- Hover over the button briefly

---

### SCENE 2: OAuth Authentication Flow (45 seconds)
**What to show:**
1. Click "Connect TikTok Ads Account" button
2. Browser redirects to TikTok OAuth page (this is critical to show!)
3. TikTok login page appears (or if already logged in, permission screen)
4. Show the permission/scope request screen clearly
5. Click "Authorize" or "Allow"
6. Redirect back to your app at `/auth/callback`
7. Show successful authentication (user is now logged in)

**What to say:**
> "Clicking the connect button initiates OAuth 2.0 authentication with TikTok. The app requests permissions to access advertiser account information and manage ad campaigns. This is using TikTok's sandbox environment for testing."

**Critical Points:**
- ⚠️ **MUST SHOW**: The TikTok permission screen with the scopes you're requesting
- ⚠️ **MUST SHOW**: The redirect back to your domain
- If you're already logged in to TikTok, you might need to logout first to show the full flow

---

### SCENE 3: Demonstrate Campaign Creation Form (90 seconds)
**What to show:**
1. After authentication, show the ad creation form
2. Fill out each field slowly and clearly:
   - **Campaign Name**: "Test Campaign Demo"
   - **Campaign Objective**: Select "Traffic" from dropdown
   - **Ad Text**: "Check out our amazing products!"
   - **Call to Action**: Select "Learn More"
   - **Music Selection**: Choose "Use Existing Music" and enter a test ID like "12345"

3. Show form validation:
   - Try submitting with empty fields (show error messages)
   - Fill in required fields properly

4. Click "Create Ad Campaign" button
5. Show loading state
6. Show success or error message

**What to say:**
> "The application allows users to create TikTok ad campaigns with various objectives. I'm filling in the campaign details including name, objective, ad text, and call-to-action. The app also supports music selection for video ads. The form includes validation to ensure all required fields are completed correctly."

**Actions:**
- Type slowly so viewers can see what you're entering
- Pause briefly on each dropdown selection
- Show the music selection options clearly

---

### SCENE 4: Show Additional Features (30 seconds)
**What to show:**
1. Scroll through the form to show all sections
2. Change campaign objective to "Conversions" 
3. Show that "No Music" option becomes disabled (conditional logic)
4. Click on Terms of Service link (show it opens)
5. Click on Privacy Policy link (show it opens)

**What to say:**
> "The application includes conditional logic - for example, the Conversions objective requires music selection. The app also provides Terms of Service and Privacy Policy pages as required."

---

### SCENE 5: Error Handling Demo (20 seconds)
**What to show:**
1. Try to submit the form (it will likely fail without real API credentials)
2. Show the error message displayed to the user
3. Show that the form data is preserved after error

**What to say:**
> "The application includes comprehensive error handling. When API calls fail, users receive clear error messages and can retry without losing their form data."

---

### SCENE 6: Closing (10 seconds)
**What to show:**
- Show the URL in the address bar one more time
- Show the "Connect TikTok Ads Account" button (logout first if needed)

**What to say:**
> "This demonstrates the complete integration with TikTok Marketing API, including OAuth authentication, campaign creation, and error handling in a sandbox environment."

---

## Key Points to Emphasize

### ✅ MUST SHOW in Video:
1. **Your exact domain**: `https://tiktok-ads-creative-flow-zrzb.vercel.app/` (visible in browser)
2. **TikTok OAuth screen**: The actual TikTok permission/authorization page
3. **Scopes requested**: The permissions your app asks for
4. **Redirect flow**: Going to TikTok and coming back to your app
5. **User interface**: All form fields and interactions
6. **Sandbox mention**: Say "sandbox environment" or "test environment"

### ❌ DON'T:
- Don't show actual TikTok account credentials
- Don't show real advertiser IDs or sensitive data
- Don't rush through the OAuth flow (it's the most important part)
- Don't edit out the TikTok authorization page

---

## Troubleshooting

### If OAuth doesn't work during recording:
**Option A**: Record the UI flow without actual OAuth
- Show clicking the button
- Pause recording
- Manually navigate to a mocked success state
- Resume recording
- In voiceover, explain: "In production, this redirects to TikTok OAuth"

**Option B**: Use screenshots/slides
- Take screenshots of each OAuth step
- Create a slide deck showing the flow
- Record the slide presentation

### If you don't have TikTok credentials yet:
- Focus on showing the UI and form functionality
- Explain verbally that OAuth integration is implemented
- Show the code structure (optional: briefly show `oauthService.ts`)

---

## After Recording

### Video Editing (Optional):
1. Add text overlays highlighting:
   - "OAuth 2.0 Authentication"
   - "Scope: ad_management, user.info.basic"
   - "Sandbox Environment"
2. Add arrows pointing to important UI elements
3. Speed up slow parts (but keep OAuth flow at normal speed)

### Export Settings:
- Format: MP4 (H.264 codec)
- Resolution: 1080p (1920x1080) or 720p minimum
- Frame rate: 30fps
- File size: Under 50MB

---

## Quick Recording Checklist

Before you hit record:
- [ ] App is deployed and accessible at your Vercel URL
- [ ] Browser is in a clean state (no extra tabs)
- [ ] You're logged out of TikTok (to show full OAuth flow)
- [ ] You have test data ready to enter in the form
- [ ] Recording software is set up and tested
- [ ] Microphone is working (if adding voiceover)
- [ ] Screen resolution is set to 1920x1080 or 1280x720

During recording:
- [ ] Show URL in address bar clearly
- [ ] Move mouse slowly and deliberately
- [ ] Pause briefly after each action
- [ ] Show the complete OAuth redirect flow
- [ ] Demonstrate all form fields and validation

After recording:
- [ ] Watch the video to ensure everything is visible
- [ ] Check that the URL is readable
- [ ] Verify OAuth flow is shown completely
- [ ] Confirm file is under 50MB and in MP4 format

---

## Alternative: Screen Recording with Narration Script

If you prefer to record without live narration, here's a text script you can add as captions or read separately:

```
[0:00-0:15] "Welcome to TikTok Ads Creative Flow demo"
[0:15-0:30] "Initiating OAuth 2.0 authentication with TikTok"
[0:30-1:00] "Authorizing app to access TikTok Marketing API"
[1:00-1:15] "Successfully authenticated and redirected back"
[1:15-2:30] "Creating a new ad campaign with form validation"
[2:30-2:45] "Demonstrating conditional logic and error handling"
[2:45-3:00] "Complete integration in sandbox environment"
```

---

## Need Help?

If you encounter issues:
1. Record what you can show
2. Add text explanations for parts that don't work
3. TikTok reviewers understand sandbox limitations
4. Focus on showing the UI and intended workflow

Good luck with your recording! 🎥
