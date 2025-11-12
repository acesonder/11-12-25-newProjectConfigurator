// Main Application Logic

// Check authentication
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
let notifications = [];
let messages = [];
let messageCheckInterval = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    if (currentUser) {
        showAuthenticatedNav();
        initializeMessaging();
        loadNotifications();
        startRealtimeUpdates();
    }
});

// Navigation Functions
function showAuthenticatedNav() {
    document.getElementById('navAuth').style.display = 'none';
    document.getElementById('navProfile').style.display = 'flex';
    document.getElementById('profileName').textContent = currentUser.firstName + ' ' + currentUser.lastName;
    document.getElementById('messagingWidget').style.display = 'flex';
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('active');
}

function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.toggle('active');
}

function closeNotifications() {
    document.getElementById('notificationsPanel').classList.remove('active');
}

// Profile Functions
function viewProfile() {
    alert(`Viewing profile for ${currentUser.username}`);
}

function editProfile() {
    alert('Edit profile feature would open here');
}

function viewNotifications() {
    toggleNotifications();
}

function openSettings() {
    alert('Settings panel would open here');
}

function changeTheme() {
    const themes = ['theme-light', 'theme-dark', 'theme-high-contrast'];
    const currentTheme = document.body.className || 'theme-light';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    document.body.className = themes[nextIndex];
    localStorage.setItem('theme', themes[nextIndex]);
    
    alert(`Theme changed to: ${themes[nextIndex].replace('theme-', '')}`);
}

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('currentUser');
        currentUser = null;
        stopRealtimeUpdates();
        location.reload();
    }
}

// Authentication Modal Functions
function openAuthModal(mode) {
    const modal = document.getElementById('authModal');
    const content = document.getElementById('authModalContent');
    
    if (mode === 'login') {
        content.innerHTML = getLoginForm();
    } else if (mode === 'register') {
        content.innerHTML = getRegisterForm();
    } else if (mode === 'forgot') {
        content.innerHTML = getForgotPasswordForm();
    }
    
    modal.classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthMode(mode) {
    openAuthModal(mode);
}

// Login Form
function getLoginForm() {
    return `
        <div class="auth-tabs">
            <button class="auth-tab active">Login</button>
            <button class="auth-tab" onclick="switchAuthMode('register')">Register</button>
        </div>
        <form class="auth-form" onsubmit="handleLogin(event)">
            <div class="form-group">
                <label for="loginUsername">Username or Email</label>
                <input type="text" id="loginUsername" required>
            </div>
            <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" required>
            </div>
            <button type="submit" class="btn-primary">Login</button>
            <div class="forgot-password">
                <a href="#" onclick="switchAuthMode('forgot'); return false;">Forgot Password?</a>
            </div>
        </form>
    `;
}

// Register Form
function getRegisterForm() {
    return `
        <div class="auth-tabs">
            <button class="auth-tab" onclick="switchAuthMode('login')">Login</button>
            <button class="auth-tab active">Register</button>
        </div>
        <form class="auth-form" onsubmit="handleRegister(event)">
            <div class="form-grid">
                <div class="form-group">
                    <label for="regFirstName">First Name *</label>
                    <input type="text" id="regFirstName" required>
                </div>
                <div class="form-group">
                    <label for="regLastName">Last Name *</label>
                    <input type="text" id="regLastName" required>
                </div>
            </div>
            <div class="form-group form-grid-full">
                <label for="regUsername">Username *</label>
                <input type="text" id="regUsername" required>
            </div>
            <div class="form-group form-grid-full">
                <label for="regEmail">Email *</label>
                <input type="email" id="regEmail" required>
            </div>
            <div class="form-group form-grid-full">
                <label for="regDob">Date of Birth *</label>
                <input type="date" id="regDob" required>
            </div>
            <div class="form-group form-grid-full">
                <label for="regSecurityQuestion">Security Question *</label>
                <select id="regSecurityQuestion" required>
                    <option value="">Select a security question</option>
                    <option value="pet">What was the name of your first pet?</option>
                    <option value="city">In what city were you born?</option>
                    <option value="school">What was the name of your elementary school?</option>
                    <option value="mother">What is your mother's maiden name?</option>
                    <option value="car">What was the make of your first car?</option>
                </select>
            </div>
            <div class="form-group form-grid-full">
                <label for="regSecurityAnswer">Security Answer *</label>
                <input type="text" id="regSecurityAnswer" required>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label for="regPassword">Password *</label>
                    <input type="password" id="regPassword" required minlength="8">
                </div>
                <div class="form-group">
                    <label for="regConfirmPassword">Confirm Password *</label>
                    <input type="password" id="regConfirmPassword" required minlength="8">
                </div>
            </div>
            <button type="submit" class="btn-primary">Create Account</button>
        </form>
    `;
}

// Forgot Password Form
function getForgotPasswordForm() {
    return `
        <h2>Reset Password</h2>
        <form class="auth-form" onsubmit="handleForgotPassword(event)">
            <div class="form-group">
                <label for="forgotUsername">Username</label>
                <input type="text" id="forgotUsername" required>
            </div>
            <div class="form-group">
                <label for="forgotDob">Date of Birth</label>
                <input type="date" id="forgotDob" required>
            </div>
            <div class="form-group">
                <label for="forgotSecurityQuestion">Security Question</label>
                <select id="forgotSecurityQuestion" required>
                    <option value="">Select your security question</option>
                    <option value="pet">What was the name of your first pet?</option>
                    <option value="city">In what city were you born?</option>
                    <option value="school">What was the name of your elementary school?</option>
                    <option value="mother">What is your mother's maiden name?</option>
                    <option value="car">What was the make of your first car?</option>
                </select>
            </div>
            <div class="form-group">
                <label for="forgotSecurityAnswer">Security Answer</label>
                <input type="text" id="forgotSecurityAnswer" required>
            </div>
            <button type="submit" class="btn-primary">Verify Identity</button>
            <div class="forgot-password">
                <a href="#" onclick="switchAuthMode('login'); return false;">Back to Login</a>
            </div>
        </form>
    `;
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // In production, this would authenticate with backend
    // For demo, retrieve from localStorage (where admin creates accounts)
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const user = userAccounts.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password
    );
    
    if (user) {
        if (user.status === 'locked') {
            alert('This account is locked. Please contact support.');
            return;
        }
        
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        closeAuthModal();
        showAuthenticatedNav();
        initializeMessaging();
        loadNotifications();
        startRealtimeUpdates();
        
        // Add welcome notification
        addNotification('Welcome back!', `Welcome ${user.firstName}! You're logged in as ${user.role}.`, 'info');
    } else {
        alert('Invalid username or password');
    }
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        firstName: document.getElementById('regFirstName').value,
        lastName: document.getElementById('regLastName').value,
        username: document.getElementById('regUsername').value,
        email: document.getElementById('regEmail').value,
        dob: document.getElementById('regDob').value,
        securityQuestion: document.getElementById('regSecurityQuestion').value,
        securityAnswer: document.getElementById('regSecurityAnswer').value,
        password: password, // In production, hash this
        role: 'CLIENT', // Default role
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage (in production, this would be backend)
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    
    // Check if username/email exists
    if (userAccounts.some(u => u.username === newUser.username)) {
        alert('Username already exists!');
        return;
    }
    if (userAccounts.some(u => u.email === newUser.email)) {
        alert('Email already registered!');
        return;
    }
    
    userAccounts.push(newUser);
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
    
    alert('Account created successfully! Please login.');
    switchAuthMode('login');
}

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const username = document.getElementById('forgotUsername').value;
    const dob = document.getElementById('forgotDob').value;
    const securityQuestion = document.getElementById('forgotSecurityQuestion').value;
    const securityAnswer = document.getElementById('forgotSecurityAnswer').value;
    
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const user = userAccounts.find(u => 
        u.username === username &&
        u.dob === dob &&
        u.securityQuestion === securityQuestion &&
        u.securityAnswer.toLowerCase() === securityAnswer.toLowerCase()
    );
    
    if (user) {
        alert(`Password reset successful! Your password is: ${user.password}\n\nIn production, this would email a reset link.`);
        switchAuthMode('login');
    } else {
        alert('Could not verify identity. Please check your information.');
    }
}

// Notifications System
function loadNotifications() {
    notifications = JSON.parse(localStorage.getItem('notifications_' + currentUser.id)) || [];
    updateNotificationBadge();
    renderNotifications();
}

function addNotification(title, message, type = 'info') {
    const notification = {
        id: Date.now(),
        title: title,
        message: message,
        type: type,
        read: false,
        timestamp: new Date().toISOString()
    };
    
    notifications.unshift(notification);
    if (notifications.length > 50) notifications.pop();
    
    localStorage.setItem('notifications_' + currentUser.id, JSON.stringify(notifications));
    updateNotificationBadge();
    renderNotifications();
}

function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    document.getElementById('notificationBadge').textContent = unreadCount;
}

function renderNotifications() {
    const list = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        list.innerHTML = '<div class="notification-item">No notifications yet</div>';
        return;
    }
    
    list.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="markNotificationRead(${notif.id})">
            <strong>${escapeHtml(notif.title)}</strong>
            <p>${escapeHtml(notif.message)}</p>
            <small>${new Date(notif.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

function markNotificationRead(notifId) {
    const notif = notifications.find(n => n.id === notifId);
    if (notif) {
        notif.read = true;
        localStorage.setItem('notifications_' + currentUser.id, JSON.stringify(notifications));
        updateNotificationBadge();
        renderNotifications();
    }
}

// Messaging System
function initializeMessaging() {
    messages = JSON.parse(localStorage.getItem('messages_' + currentUser.id)) || [];
    renderMessages();
}

function toggleMessaging() {
    const widget = document.getElementById('messagingWidget');
    widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const message = {
        id: Date.now(),
        text: text,
        sender: currentUser.id,
        timestamp: new Date().toISOString(),
        type: 'sent'
    };
    
    messages.push(message);
    localStorage.setItem('messages_' + currentUser.id, JSON.stringify(messages));
    
    input.value = '';
    renderMessages();
    
    // Simulate response after 2 seconds
    setTimeout(() => {
        const response = {
            id: Date.now(),
            text: 'Thank you for your message. A support staff member will respond shortly.',
            sender: 'system',
            timestamp: new Date().toISOString(),
            type: 'received'
        };
        messages.push(response);
        localStorage.setItem('messages_' + currentUser.id, JSON.stringify(messages));
        renderMessages();
        addNotification('New Message', 'You have a new message', 'info');
    }, 2000);
}

function renderMessages() {
    const content = document.getElementById('messagingContent');
    
    if (messages.length === 0) {
        content.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 2rem;">Start a conversation</div>';
        return;
    }
    
    content.innerHTML = messages.map(msg => `
        <div class="message-item ${msg.type}">
            <div>${escapeHtml(msg.text)}</div>
            <small style="opacity: 0.7; font-size: 0.75rem;">${new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');
    
    // Scroll to bottom
    content.scrollTop = content.scrollHeight;
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Real-time Updates (simulated with polling)
function startRealtimeUpdates() {
    // Check for new messages and notifications every 30 seconds
    messageCheckInterval = setInterval(() => {
        // Simulate receiving notifications
        if (Math.random() > 0.7) {
            const notificationTypes = [
                { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2 PM', type: 'info' },
                { title: 'New Resource Available', message: 'Check out the new housing resources', type: 'success' },
                { title: 'System Update', message: 'System maintenance scheduled for tonight', type: 'warning' }
            ];
            
            const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
            addNotification(randomNotif.title, randomNotif.message, randomNotif.type);
        }
    }, 30000);
}

function stopRealtimeUpdates() {
    if (messageCheckInterval) {
        clearInterval(messageCheckInterval);
        messageCheckInterval = null;
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function submitContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
});

// Apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.className = savedTheme;
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
