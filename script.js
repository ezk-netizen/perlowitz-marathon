// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Load saved form data if available
        loadFormData();
    }
});

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth'),
        gender: formData.get('gender'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipcode: formData.get('zipcode'),
        country: formData.get('country'),
        category: formData.get('category'),
        experience: formData.get('experience'),
        tshirtSize: formData.get('tshirtSize'),
        emergencyContact: formData.get('emergencyContact'),
        emergencyPhone: formData.get('emergencyPhone'),
        waiver: formData.get('waiver') === 'on',
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Validate form data
    if (!validateForm(data)) {
        return;
    }
    
    try {
        // Submit to server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Clear saved data
            localStorage.removeItem('marathonFormData');
            
            // Show success message
            showSuccessMessage(data.email);
            
            // Clear form
            e.target.reset();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form. Please try again.');
    }
}

// Validation functions
function validateForm(data) {
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipcode', 'country', 'category', 'experience', 'tshirtSize', 'emergencyContact', 'emergencyPhone'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            alert(`Please fill in all required fields. Missing: ${field}`);
            return false;
        }
    }
    
    // Validate email
    if (!validateEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    if (!validatePhone(data.phone)) {
        alert('Please enter a valid phone number (at least 10 digits)');
        return false;
    }
    
    // Validate age
    if (!validateAge(data.dateOfBirth)) {
        alert('You must be at least 18 years old to register');
        return false;
    }
    
    // Check waiver
    if (!data.waiver) {
        alert('You must accept the race waiver to register');
        return false;
    }
    
    return true;
}

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

// Show success message
function showSuccessMessage(email) {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const confirmEmail = document.getElementById('confirmEmail');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        confirmEmail.textContent = email;
    }
}

// Reset form
function resetForm() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Clear saved data
        localStorage.removeItem('marathonFormData');
    }
}

// Auto-save form data to localStorage
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        // Save form data on input change
        form.addEventListener('input', function() {
            saveFormData();
        });
        
        form.addEventListener('change', function() {
            saveFormData();
        });
    }
});

function saveFormData() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Add checkbox values
    data.waiver = document.getElementById('waiver')?.checked || false;
    data.newsletter = document.getElementById('newsletter')?.checked || false;
    
    localStorage.setItem('marathonFormData', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('marathonFormData');
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    const form = document.getElementById('registrationForm');
    
    if (!form) return;
    
    // Fill in form fields
    Object.keys(data).forEach(key => {
        const field = form.elements[key];
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = data[key] === 'on' || data[key] === true;
            } else {
                field.value = data[key];
            }
        }
    });
}

// Smooth scrolling for navigation links
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

// Phone number formatting (optional enhancement)
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
        } else {
            value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
    }
    
    input.value = value;
}

// Attach phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const emergencyPhoneInput = document.getElementById('emergencyPhone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    if (emergencyPhoneInput) {
        emergencyPhoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});
