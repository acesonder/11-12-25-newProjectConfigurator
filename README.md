# Hope Connect - Project Configurator & Support Platform

A comprehensive platform for supporting individuals facing life challenges, including homelessness, job loss, grief, substance use issues, and mental health challenges. This project includes both an Admin Portal for system configuration and a main site for clients, staff, volunteers, service providers, managers, and administrators.

## 🚀 Features

### Admin Portal
- **Passcode Protected Access** (Use: 079777)
- **Database Configuration Tool** - Easy setup of MySQL/phpMyAdmin credentials
- **System Diagnostics** - Test connections, verify setup, troubleshoot issues
- **Account Management** - Create, edit, lock/unlock, delete accounts
- **Role Management** - Manage CLIENT, STAFF, VOLUNTEER, SERVICE PROVIDER, ADMIN, MANAGER roles
- **Component Manager** - Install, configure, verify system components
- **Activity Logs** - Comprehensive logging for all tools
- **Database Tools** - Import/export, test connection, verify database

### Main Site
- **Responsive Design** - Works on all devices
- **Smart Navigation** - Dynamic navigation based on authentication state
- **User Authentication** - Create account, login, forgot password recovery
- **Real-time Messaging** - AJAX-powered instant messaging with push notifications
- **Notification System** - Real-time notifications with badge counters
- **Theme Customization** - Multiple themes (light, dark, high-contrast)
- **Role-Based Features** - Customized experience for each user role
- **Resource Directory** - Comprehensive community resources
- **Accessibility** - Built with accessibility in mind

## 📁 Project Structure

```
├── admin/                  # Admin Portal
│   ├── index.html         # Login page (passcode: 079777)
│   ├── dashboard.html     # Main admin dashboard
│   ├── css/               # Admin styles
│   │   └── admin-style.css
│   └── js/                # Admin scripts
│       ├── admin-login.js
│       └── admin-dashboard.js
├── public/                # Main Site
│   ├── index.html         # Landing page
│   ├── css/               # Main site styles
│   │   └── main-style.css
│   └── js/                # Main site scripts
│       └── main-app.js
├── config/                # Configuration files
│   └── config.example.php # Example PHP configuration
├── FUTURE_ADDONS.md       # Extensive future features roadmap
└── README.md              # This file
```

## 🎯 Getting Started

### For Admin Portal

1. Open `admin/index.html` in your browser
2. Enter passcode: **079777**
3. Access the dashboard and configure your system

### For Main Site

1. Open `public/index.html` in your browser
2. Click "Get Started" or "Login"
3. Create an account or login with existing credentials

### Database Setup

1. Access the Admin Portal
2. Navigate to "New Setup" tool
3. Enter your database credentials:
   - Database Name
   - Database Host (default: localhost)
   - Database Username
   - Database Password
   - Database Port (default: 3306)
4. Test connection
5. Download generated `config.php`
6. Place `config.php` in your project root

## 👥 User Roles

1. **CLIENT** - Individuals seeking assistance and services
2. **STAFF** - Staff members providing direct services
3. **VOLUNTEER** - Volunteers helping with activities
4. **SERVICE PROVIDER** - External service providers and partners
5. **MANAGER** - Managers overseeing operations
6. **ADMIN** - System administrators with full access

## 🔧 Admin Portal Tools

### Setup & Configuration
- **New Setup** - Configure database and initialize project
- **Edit Setup** - Modify existing configuration
- **Diagnose Setup** - Test and troubleshoot issues
- **Verify Setup** - Validate all components

### Database Management
- **Test Connection** - Verify database connectivity
- **Verify Database** - Check database integrity
- **Import Database** - Import SQL files
- **Export Database** - Export database to SQL

### Account Management
- **Create Account** - Add new users
- **Manage Accounts** - Edit, lock, unlock, delete users
- **Test Account** - Login as any user for testing
- **Role Management** - Manage user roles

### System Tools
- **Component Manager** - Manage system components
- **Module Configuration** - Configure site modules
- **Repair Scripts** - Run verification and repair scripts
- **Activity Logs** - View comprehensive logs

## 📱 Main Site Features

### Authentication
- First Name, Last Name
- Username (unique)
- Email
- Date of Birth
- Security Question & Answer
- Password (min 8 characters)
- Confirm Password

### Real-time Features
- Instant messaging with AJAX
- Push notifications
- Live notification counter
- Real-time updates every 30 seconds

### User Dashboard
When logged in, users can:
- View and edit profile
- Access recent notifications
- Change settings
- Switch themes
- Send/receive messages
- Logout

## 🎨 Themes

- **Light Theme** (Default)
- **Dark Theme** - Easy on the eyes
- **High Contrast** - Enhanced accessibility

## 🔐 Security Features

- Passcode-protected admin portal
- Secure session management
- Password confirmation
- Security questions for password recovery
- Account locking capabilities
- Activity logging
- Role-based access control

## 🌟 Future Features

See `FUTURE_ADDONS.md` for an extensive list of planned features including:

### For Clients
- Progress tracking dashboard
- Resource directory
- Case management portal
- Crisis support tools
- Financial management
- Employment assistance
- Health & wellness center
- Education platform
- Community connection

### For Staff
- Advanced case management
- Care coordination
- Documentation suite
- Professional development
- Analytics & reporting

### For All Roles
- AI-powered assistance
- Mobile application
- Gamification
- Integration ecosystem
- Much more...

## 📊 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP (for database configuration)
- **Database**: MySQL/MariaDB
- **Storage**: LocalStorage (for demo), SessionStorage (for sessions)
- **Real-time**: AJAX polling (production would use WebSockets)

## 🤝 Support & Resources

### Crisis Hotlines
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- National Domestic Violence Hotline: 1-800-799-7233

### For Help
Access the Admin Portal for system configuration and troubleshooting tools.

## 📝 License

This project is designed to help people in need. Use it to make a positive impact in your community.

## 🙏 Acknowledgments

Built to serve individuals experiencing:
- Homelessness
- Job loss
- Grief and loss
- Substance use issues
- Mental health challenges

And to support the helpers:
- Social workers and case managers
- Volunteers
- Service providers
- Administrators

---

**Building bridges to brighter futures. 🤝**
