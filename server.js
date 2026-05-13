const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REGISTRATIONS_FILE = path.join(__dirname, 'registrations.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Helper function to read registrations
function getRegistrations() {
    try {
        if (fs.existsSync(REGISTRATIONS_FILE)) {
            const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading registrations:', error);
        return [];
    }
}

// Helper function to save registrations
function saveRegistrations(registrations) {
    try {
        fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving registrations:', error);
        return false;
    }
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

function validateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 18;
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Register a participant
app.post('/api/register', (req, res) => {
    const data = req.body;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipcode', 'country', 'category', 'experience', 'tshirtSize', 'emergencyContact', 'emergencyPhone'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            return res.status(400).json({
                success: false,
                message: `Missing required field: ${field}`
            });
        }
    }
    
    // Validate email
    if (!validateEmail(data.email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address'
        });
    }
    
    // Validate phone
    if (!validatePhone(data.phone)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid phone number (must have at least 10 digits)'
        });
    }
    
    // Validate age
    if (!validateAge(data.dateOfBirth)) {
        return res.status(400).json({
            success: false,
            message: 'You must be at least 18 years old'
        });
    }
    
    // Validate waiver
    if (!data.waiver) {
        return res.status(400).json({
            success: false,
            message: 'You must accept the race waiver'
        });
    }
    
    // Create registration object
    const registration = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...data
    };
    
    // Get existing registrations
    let registrations = getRegistrations();
    
    // Add new registration
    registrations.push(registration);
    
    // Save registrations
    if (saveRegistrations(registrations)) {
        res.json({
            success: true,
            message: 'Registration successful!',
            registrationId: registration.id
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Error saving registration'
        });
    }
});

// Get all registrations
app.get('/api/registrations', (req, res) => {
    const registrations = getRegistrations();
    res.json({
        success: true,
        total: registrations.length,
        registrations: registrations
    });
});

// Get single registration
app.get('/api/registrations/:id', (req, res) => {
    const registrations = getRegistrations();
    const registration = registrations.find(r => r.id == req.params.id);
    
    if (registration) {
        res.json({
            success: true,
            registration: registration
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Registration not found'
        });
    }
});

// Get statistics
app.get('/api/statistics', (req, res) => {
    const registrations = getRegistrations();
    
    const statistics = {
        total: registrations.length,
        byCategory: {},
        byExperience: {},
        byTShirtSize: {},
        byGender: {}
    };
    
    registrations.forEach(reg => {
        // By category
        statistics.byCategory[reg.category] = (statistics.byCategory[reg.category] || 0) + 1;
        
        // By experience
        statistics.byExperience[reg.experience] = (statistics.byExperience[reg.experience] || 0) + 1;
        
        // By t-shirt size
        statistics.byTShirtSize[reg.tshirtSize] = (statistics.byTShirtSize[reg.tshirtSize] || 0) + 1;
        
        // By gender
        statistics.byGender[reg.gender || 'not-specified'] = (statistics.byGender[reg.gender || 'not-specified'] || 0) + 1;
    });
    
    res.json({
        success: true,
        statistics: statistics
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║   🏃 Perlowitz Marathon Registration Website                ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║   Server running on http://localhost:${PORT}               ║
║                                                            ║
║   Available Endpoints:                                     ║
║   • GET  /api/health              - Health check           ║
║   • POST /api/register            - Submit registration    ║
║   • GET  /api/registrations       - View all registrations ║
║   • GET  /api/registrations/:id   - Get specific reg.      ║
║   • GET  /api/statistics          - View statistics        ║
║                                                            ║
║   Open http://localhost:${PORT} in your browser            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
