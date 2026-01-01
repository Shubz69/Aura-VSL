# Aura FX VSL - Complete Setup Guide

## 🎯 What You Need to Provide

To make this VSL page fully functional, you need to provide the following:

### 1. **Your VSL Video** 
- Video URL or embed code
- Format: YouTube, Vimeo, or direct video file
- Location: Replace the video placeholder in `index.html` (line ~20)

### 2. **Calendly Username**
- Your Calendly username (e.g., if your link is `calendly.com/john-doe`, your username is `john-doe`)
- Location: Update in `script.js` line ~15

### 3. **Backend Endpoint** (Optional but Recommended)
- URL where form submissions should be sent
- Options:
  - Use the provided `backend-example.js` (Node.js)
  - Use a service like Formspree, Google Sheets, Airtable
  - Your own custom backend
- Location: Update in `script.js` line ~50

### 4. **Calendly Webhook URL** (Optional)
- To receive notifications when someone books a call
- Set up in Calendly Settings → Integrations → Webhooks
- Point to: `https://your-backend.com/api/calendly-webhook`

---

## 🚀 Quick Start (3 Steps)

### Step 1: Add Your Video

Open `index.html` and find the video placeholder (around line 20). Replace it with your video:

**Option A: YouTube Embed**
```html
<div class="video-container">
    <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>
```

**Option B: Vimeo Embed**
```html
<div class="video-container">
    <iframe 
        src="https://player.vimeo.com/video/YOUR_VIDEO_ID" 
        width="100%" 
        height="100%" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>
```

**Option C: Direct Video File**
```html
<div class="video-container">
    <video 
        width="100%" 
        height="100%" 
        controls 
        autoplay 
        muted
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
        <source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
    </video>
</div>
```

### Step 2: Configure Calendly

Open `script.js` and find line ~15:
```javascript
const calendlyUsername = 'YOUR_CALENDLY_USERNAME';
```

Replace `YOUR_CALENDLY_USERNAME` with your actual Calendly username.

**How to find your Calendly username:**
1. Log into Calendly
2. Go to your scheduling link (e.g., `calendly.com/john-doe/30min`)
3. Your username is the part after `calendly.com/` (e.g., `john-doe`)

### Step 3: Set Up Data Collection

**Option A: Use Backend Example (Recommended for Full Control)**

1. Install Node.js if you haven't already
2. Open terminal in this folder
3. Run:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Update `script.js` line ~50:
   ```javascript
   const backendEndpoint = 'http://localhost:3000/api/leads';
   ```
6. For production, deploy to a service like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean
   - AWS

**Option B: Use Formspree (Easiest - No Coding)**

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy the form endpoint URL
4. Update `script.js` line ~50:
   ```javascript
   const backendEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

**Option C: Use Google Sheets (Free)**

1. Create a Google Sheet
2. Use a service like [Google Apps Script](https://script.google.com) or [Zapier](https://zapier.com)
3. Set up webhook to receive form data
4. Update backend endpoint in `script.js`

**Option D: Use Airtable (Database + API)**

1. Create an Airtable base
2. Get your API endpoint
3. Update `script.js` with the endpoint

---

## 📧 Email Notifications Setup

To receive email notifications when someone submits the form:

### Using the Backend Example:

Add this to `backend-example.js` (install `nodemailer` first):
```bash
npm install nodemailer
```

Then add email sending code in the `/api/leads` endpoint.

### Using a Service:

- **Zapier**: Connect form submission to email
- **Make (formerly Integromat)**: Similar to Zapier
- **Formspree**: Built-in email notifications

---

## 🔔 Calendly Webhook Setup

To get notified when someone books a call:

1. Go to Calendly → Settings → Integrations → Webhooks
2. Click "Add Webhook"
3. Enter your webhook URL: `https://your-backend.com/api/calendly-webhook`
4. Select events:
   - ✅ `invitee.created` (when someone books)
   - ✅ `invitee.canceled` (when someone cancels)
5. Save

The backend example already handles this webhook endpoint.

---

## 🎨 Customization

### Change Colors

Edit `styles.css` and modify these variables (around line 10):
```css
:root {
    --accent-purple: #8B5CF6;  /* Main purple */
    --accent-cyan: #06B6D4;     /* Cyan accent */
    --accent-pink: #EC4899;     /* Pink accent */
    --accent-gold: #F59E0B;     /* Gold accent */
}
```

### Change Content

All text content is in `index.html`. Edit any section as needed.

### Change Fonts

The page uses Google Fonts (Inter). To change:
1. Update the font link in `index.html` (line ~9)
2. Update `font-family` in `styles.css` (line ~30)

---

## 📱 Testing

1. **Test the Form:**
   - Fill out all fields
   - Submit the form
   - Check browser console for any errors
   - Check localStorage: Open DevTools → Application → Local Storage

2. **Test Calendly:**
   - After form submission, Calendly widget should appear
   - Try booking a test call
   - Check if webhook receives the event

3. **Test on Mobile:**
   - Open on your phone
   - Test form submission
   - Check responsive design

---

## 📊 Viewing Collected Leads

### From LocalStorage (Browser):
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `exportLeads()`
4. CSV file will download

### From Backend (if using backend-example.js):
1. Visit: `http://localhost:3000/api/leads`
2. Or check `leads.json` file in the project folder

---

## 🚢 Deployment

### Option 1: Static Hosting (Form Only - No Backend)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push to GitHub
- **Cloudflare Pages**: Free static hosting

### Option 2: Full Stack (With Backend)
- **Heroku**: Easy Node.js deployment
- **Railway**: Simple deployment
- **Render**: Free tier available
- **DigitalOcean**: More control

### Deployment Checklist:
- [ ] Video added and working
- [ ] Calendly username configured
- [ ] Backend endpoint configured
- [ ] Form submission tested
- [ ] Calendly widget appears after submission
- [ ] Mobile responsive tested
- [ ] Email notifications working (if set up)
- [ ] Webhook configured (if using)

---

## 🔒 Security Notes

1. **Protect Lead Data:**
   - Don't expose `/api/leads` GET endpoint publicly
   - Add authentication to admin endpoints
   - Use HTTPS in production

2. **GDPR Compliance:**
   - Form includes consent checkbox ✅
   - Consider adding privacy policy link
   - Consider adding terms of service

3. **Spam Protection:**
   - Consider adding reCAPTCHA
   - Add rate limiting to backend
   - Validate all inputs server-side

---

## 🆘 Troubleshooting

### Calendly Widget Not Showing:
- Check if Calendly script is loaded (check Network tab)
- Verify username is correct
- Check browser console for errors

### Form Not Submitting:
- Check browser console for errors
- Verify backend endpoint is correct
- Check CORS settings if using custom backend
- Data still saves to localStorage as backup

### Backend Not Receiving Data:
- Check CORS configuration
- Verify endpoint URL is correct
- Check server logs
- Test with Postman/curl

---

## 📞 Next Steps After Setup

1. ✅ Add your video
2. ✅ Configure Calendly
3. ✅ Set up backend/data collection
4. ✅ Test everything
5. ✅ Deploy to production
6. ✅ Set up email notifications
7. ✅ Configure Calendly webhooks
8. ✅ Start driving traffic!

---

## 💡 Pro Tips

1. **A/B Testing**: Create variations of the page to test different messaging
2. **Analytics**: Add Google Analytics or Facebook Pixel to track visitors
3. **Retargeting**: Set up retargeting pixels for visitors who don't convert
4. **Email Sequences**: Set up automated email sequences for new leads
5. **CRM Integration**: Connect to HubSpot, Salesforce, or similar for lead management

---

## 📝 Summary

**Minimum Required:**
1. Add video to `index.html`
2. Add Calendly username to `script.js`

**Recommended:**
3. Set up backend endpoint (or use Formspree)
4. Configure email notifications
5. Set up Calendly webhooks

**Everything else is optional but recommended for best results!**

Good luck with your VSL launch! 🚀

