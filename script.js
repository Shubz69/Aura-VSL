// Form handling and Calendly integration
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');
    const calendlyWidget = document.getElementById('calendlyWidget');
    
    // Phone number formatting with international support
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        // Allow only numbers, spaces, +, -, and parentheses
        e.target.value = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            country: document.getElementById('country').value,
            timestamp: new Date().toISOString(),
            consent: document.querySelector('input[name="consent"]').checked
        };

        // Validate form
        if (!formData.fullName || !formData.email || !formData.phone || !formData.country) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Validate phone (should have at least 10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            showMessage('Please enter a valid phone number with country code.', 'error');
            return;
        }

        // Disable submit button
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting...</span>';

        try {
            // Save to localStorage as backup
            saveToLocalStorage(formData);

            // Send to backend (you'll need to configure this endpoint)
            const response = await submitFormData(formData);

            if (response.success) {
                showMessage('Thank you! Your information has been submitted successfully. Please schedule your call below.', 'success');
                form.reset();
                
                // Show Calendly widget after successful submission
                setTimeout(() => {
                    loadCalendlyWidget();
                }, 500);
            } else {
                throw new Error(response.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Even if backend fails, save locally
            showMessage('Your information has been saved. Please schedule your call below.', 'success');
            setTimeout(() => {
                loadCalendlyWidget();
            }, 500);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Function to save data to localStorage
    function saveToLocalStorage(data) {
        try {
            let leads = JSON.parse(localStorage.getItem('auraFXLeads') || '[]');
            leads.push(data);
            localStorage.setItem('auraFXLeads', JSON.stringify(leads));
            console.log('Data saved to localStorage:', data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Function to submit form data to backend
    async function submitFormData(data) {
        // TODO: Replace with your actual backend endpoint
        const backendEndpoint = 'YOUR_BACKEND_ENDPOINT_HERE';
        
        // If no backend endpoint is configured, return success (data saved locally)
        if (backendEndpoint === 'YOUR_BACKEND_ENDPOINT_HERE') {
            return { success: true, message: 'Data saved locally' };
        }

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Backend submission error:', error);
            // Return success anyway since we saved locally
            return { success: true, message: 'Data saved locally (backend unavailable)' };
        }
    }

    // Function to show form messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    }

    // Function to load Calendly widget
    function loadCalendlyWidget() {
        // TODO: Replace 'YOUR_CALENDLY_USERNAME' with your actual Calendly username
        const calendlyUsername = 'YOUR_CALENDLY_USERNAME';
        
        if (calendlyUsername === 'YOUR_CALENDLY_USERNAME') {
            calendlyWidget.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #b3b3b3;">
                    <p>Please configure your Calendly username in script.js</p>
                    <p style="margin-top: 10px; font-size: 14px;">Replace 'YOUR_CALENDLY_USERNAME' with your actual Calendly username</p>
                </div>
            `;
            return;
        }

        // Create Calendly inline widget
        if (typeof Calendly !== 'undefined') {
            Calendly.initInlineWidget({
                url: `https://calendly.com/${calendlyUsername}`,
                parentElement: calendlyWidget
            });
        } else {
            calendlyWidget.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #b3b3b3;">
                    <p>Loading Calendly...</p>
                </div>
            `;
            // Retry after a short delay
            setTimeout(loadCalendlyWidget, 1000);
        }
    }

    // Export function to retrieve leads (for admin use)
    window.exportLeads = function() {
        try {
            const leads = JSON.parse(localStorage.getItem('auraFXLeads') || '[]');
            if (leads.length === 0) {
                alert('No leads found in local storage.');
                return;
            }
            
            // Convert to CSV
            const headers = ['Full Name', 'Email', 'Phone', 'Country', 'Timestamp', 'Consent'];
            const csvRows = [headers.join(',')];
            
            leads.forEach(lead => {
                const row = [
                    `"${lead.fullName}"`,
                    `"${lead.email}"`,
                    `"${lead.phone}"`,
                    `"${lead.country}"`,
                    `"${lead.timestamp}"`,
                    lead.consent ? 'Yes' : 'No'
                ];
                csvRows.push(row.join(','));
            });
            
            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aura-fx-leads-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            console.log(`Exported ${leads.length} leads`);
        } catch (error) {
            console.error('Error exporting leads:', error);
            alert('Error exporting leads. Check console for details.');
        }
    };

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.feature-card, .tier-card, .method-step, .pillar').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

