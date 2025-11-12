// Admin Portal Login
const ADMIN_PASSCODE = '079777';

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passcode = document.getElementById('passcode').value;
    const errorMessage = document.getElementById('error-message');
    
    if (passcode === ADMIN_PASSCODE) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid passcode. Access denied.';
        errorMessage.style.display = 'block';
        document.getElementById('passcode').value = '';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// Clear passcode field on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('passcode').value = '';
});
