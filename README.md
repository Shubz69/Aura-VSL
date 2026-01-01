# Aura FX VSL Page

A high-converting Video Sales Letter (VSL) page for Aura FX trading community with dark theme, engaging content, and lead capture functionality.

## Features

- **Dark Theme Design**: Modern black background with attractive purple, cyan, and pink accent colors
- **Video Placeholder**: Space at the top for your VSL video
- **Engaging Content**: Comprehensive sections explaining:
  - What makes Aura FX different
  - Two-tier system (Standard & A7FX Elite)
  - Teaching methodology
  - Community focus
- **Lead Capture Form**: Collects:
  - Full Name
  - Email Address
  - Phone Number (with international support)
  - Country
- **Data Storage**: Saves leads to localStorage and can send to backend
- **Calendly Integration**: Self-scheduling for discovery calls

## Setup Instructions

### 1. Configure Calendly

Open `script.js` and replace `YOUR_CALENDLY_USERNAME` with your actual Calendly username:

```javascript
const calendlyUsername = 'your-actual-calendly-username';
```

### 2. Configure Backend Endpoint (Optional)

If you have a backend server to receive form submissions, update the endpoint in `script.js`:

```javascript
const backendEndpoint = 'https://your-backend.com/api/leads';
```

If you don't have a backend yet, the form will still work and save data to localStorage.

### 3. Add Your Video

Replace the video placeholder in `index.html` (around line 20) with your actual video embed code:

```html
<div class="video-container">
    <!-- Replace this with your video embed -->
    <iframe src="YOUR_VIDEO_URL" ...></iframe>
</div>
```

### 4. View Leads (Local Storage)

To export leads saved in localStorage, open the browser console and run:

```javascript
exportLeads()
```

This will download a CSV file with all collected leads.

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # Dark theme styling
├── script.js       # Form handling and Calendly integration
└── README.md       # This file
```

## Backend Integration Options

### Option 1: Simple Backend Endpoint

Create a POST endpoint that receives JSON data:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "country": "US",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "consent": true
}
```

### Option 2: Use a Service

- **Formspree**: Easy form backend service
- **Google Sheets API**: Save directly to Google Sheets
- **Airtable**: Database with API
- **Zapier/Make**: Connect to various services

### Option 3: Node.js/Express Example

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/leads', async (req, res) => {
  const lead = req.body;
  // Save to database
  // Send email notification
  // Connect to Calendly webhook
  res.json({ success: true });
});
```

## Calendly Webhook Setup

To receive notifications when someone books a call:

1. Go to Calendly Settings → Integrations → Webhooks
2. Add webhook URL: `https://your-backend.com/api/calendly-webhook`
3. Select events: `invitee.created`, `invitee.canceled`

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --accent-purple: #8B5CF6;
    --accent-cyan: #06B6D4;
    --accent-pink: #EC4899;
    /* ... */
}
```

### Content

All content is in `index.html`. Edit sections as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All form data is saved to localStorage as backup
- Phone validation accepts international formats
- Form includes consent checkbox for GDPR compliance
- Responsive design works on mobile and desktop

## Next Steps

1. Add your video
2. Configure Calendly username
3. Set up backend endpoint (or use a service)
4. Test the form submission
5. Deploy to your hosting

## Support

For questions or issues, check the code comments in each file for detailed explanations.

