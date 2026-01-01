// Example Backend Server for Aura FX VSL
// This is a Node.js/Express example - you can adapt it to your preferred backend

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File to store leads (in production, use a database)
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Helper function to read leads
async function readLeads() {
    try {
        const data = await fs.readFile(LEADS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to save leads
async function saveLeads(leads) {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Endpoint to receive form submissions
app.post('/api/leads', async (req, res) => {
    try {
        const lead = {
            ...req.body,
            id: Date.now().toString(),
            receivedAt: new Date().toISOString()
        };

        // Validate required fields
        if (!lead.fullName || !lead.email || !lead.phone || !lead.country) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        // Read existing leads
        const leads = await readLeads();
        
        // Add new lead
        leads.push(lead);
        
        // Save to file
        await saveLeads(leads);

        // TODO: Send email notification
        // TODO: Add to CRM (e.g., HubSpot, Salesforce)
        // TODO: Send to email marketing tool (e.g., Mailchimp, ConvertKit)

        console.log('New lead received:', lead);

        res.json({ 
            success: true, 
            message: 'Lead saved successfully',
            leadId: lead.id
        });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving lead' 
        });
    }
});

// Endpoint to get all leads (protect this in production!)
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await readLeads();
        res.json({ success: true, leads });
    } catch (error) {
        console.error('Error reading leads:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error reading leads' 
        });
    }
});

// Calendly webhook endpoint
app.post('/api/calendly-webhook', async (req, res) => {
    try {
        const event = req.body;
        
        // Calendly sends different event types
        if (event.event === 'invitee.created') {
            const invitee = event.payload.invitee;
            const eventDetails = event.payload.event_type;
            
            console.log('New Calendly booking:', {
                name: invitee.name,
                email: invitee.email,
                event: eventDetails.name,
                scheduledAt: invitee.scheduled_event.start_time
            });

            // TODO: Match with lead from form submission
            // TODO: Send confirmation email
            // TODO: Add to calendar
            // TODO: Send notification to you
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error processing Calendly webhook:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error processing webhook' 
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Aura FX backend server running on port ${PORT}`);
    console.log(`Leads endpoint: http://localhost:${PORT}/api/leads`);
    console.log(`Calendly webhook: http://localhost:${PORT}/api/calendly-webhook`);
});

// To run this server:
// 1. Install dependencies: npm install express cors
// 2. Run: node backend-example.js
// 3. Update script.js with: const backendEndpoint = 'http://localhost:3000/api/leads';

