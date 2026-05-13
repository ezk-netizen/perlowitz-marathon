# 🏃 Perlowitz Marathon Registration Website

A complete marathon registration website with a professional participant registration form, built with HTML5, CSS3, and Node.js/Express backend.

## 📋 Features

### Frontend
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Professional marathon website layout
- ✅ Comprehensive registration form with:
  - Personal information fields
  - Address collection
  - Race category selection (Marathon, Half Marathon, 10K, 5K)
  - Experience level assessment
  - T-shirt size selection
  - Emergency contact information
  - Race waiver acceptance
  - Newsletter signup
- ✅ Client-side form validation
- ✅ Auto-save form data to browser storage
- ✅ Smooth animations and transitions
- ✅ Success confirmation message
- ✅ Mobile-optimized form inputs

### Backend
- ✅ Express.js REST API
- ✅ Registration submission endpoint (`POST /api/register`)
- ✅ Server-side validation
- ✅ JSON file storage for registrations
- ✅ Admin API to view all registrations (`GET /api/registrations`)
- ✅ Statistics endpoint (`GET /api/statistics`)
- ✅ Individual registration lookup (`GET /api/registrations/:id`)
- ✅ CORS enabled for cross-origin requests
- ✅ Comprehensive error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ezk-netizen/perlowitz-marathon.git
cd perlowitz-marathon

# Install dependencies
npm install
```

### Running the Application

```bash
npm start
```

The website will be available at: **http://localhost:3000**

## 📊 API Endpoints

### Register a Participant
```bash
POST /api/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "dateOfBirth": "1990-05-15",
  "gender": "male",
  "address": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zipcode": "12345",
  "country": "USA",
  "category": "marathon",
  "experience": "intermediate",
  "tshirtSize": "lg",
  "emergencyContact": "Jane Doe",
  "emergencyPhone": "(555) 987-6543",
  "waiver": true,
  "newsletter": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "registrationId": 1234567890
}
```

### Get All Registrations
```bash
GET /api/registrations
```

**Response:**
```json
{
  "success": true,
  "total": 42,
  "registrations": [...]
}
```

### Get Registration Statistics
```bash
GET /api/statistics
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "total": 42,
    "byCategory": {
      "marathon": 15,
      "half-marathon": 18,
      "10k": 6,
      "5k": 3
    },
    "byExperience": {...},
    "byTShirtSize": {...}
  }
}
```

### Get Single Registration
```bash
GET /api/registrations/:id
```

### Health Check
```bash
GET /api/health
```

## 🎨 Customization

### Color Scheme
Edit `styles.css` to modify the colors:
```css
:root {
    --primary-color: #FF8C42;      /* Orange */
    --secondary-color: #1A3A52;    /* Navy Blue */
    --accent-color: #2E5266;       /* Lighter Blue */
    --success-color: #27AE60;      /* Green */
    --error-color: #E74C3C;        /* Red */
}
```

### Form Fields
Edit `index.html` to add/modify form fields and categories.

### Race Information
Update the following sections in `index.html`:
- Hero section stats
- Race categories and prices
- Location and date information
- Contact details

## 📁 File Structure

```
perlowitz-marathon/
├── index.html              # Main HTML page
├── styles.css              # Responsive styling
├── script.js               # Client-side validation & functionality
├── server.js               # Express.js backend
├── package.json            # Project dependencies
├── registrations.json      # Registration data storage
└── README.md              # Documentation
```

## 🔐 Form Validation

The website includes comprehensive validation:

**Client-side:**
- Email format validation
- Phone number validation (10+ digits)
- Age verification (18+ years required)
- Required field checking
- Waiver acceptance verification

**Server-side:**
- Email format validation
- Phone number validation
- Age verification
- Data type checking
- Error handling

## 💾 Data Storage

Registrations are stored in `registrations.json` with the following structure:
```json
{
  "id": 1234567890,
  "timestamp": "2026-05-13T14:33:41Z",
  "firstName": "John",
  "lastName": "Doe",
  ...
}
```

## 🌐 Deployment

### Local Development
```bash
npm start
```

### Production (Example with Node)
```bash
npm install --production
NODE_ENV=production npm start
```

### Environment Variables
You can set the PORT:
```bash
PORT=8080 npm start
```

## 🎯 Race Categories

- **Marathon** (42.2km) - $89
- **Half Marathon** (21.1km) - $59
- **10K Fun Run** - $39
- **5K Walk** - $29

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

The website is fully optimized for all screen sizes with touch-friendly form inputs.

## 🐛 Troubleshooting

### Port already in use
```bash
# Change the port
PORT=3001 npm start
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Registrations not saving
- Check that `registrations.json` has write permissions
- Verify the `server.js` is running without errors

## 📝 License

MIT License - Feel free to use this project for your marathon event!

## 👤 Author

Perlowitz Marathon Team

## 🤝 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Running! 🏃‍♂️🏃‍♀️**
