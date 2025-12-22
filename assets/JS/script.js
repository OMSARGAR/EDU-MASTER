// Store credentials in localStorage for persistence
let storedCredentials = {
    admin: JSON.parse(localStorage.getItem('eduMasterAdminCredentials')) || {
        username: 'admin',
        password: 'admin123',
        name: 'System Administrator',
        email: 'admin@edumaster.edu',
        mobile: '+91 9876543210',
        role: 'admin',
        avatar: 'A',
        accessLevel: 'full',
        roleName: 'System Administrator'
    },
    principal: JSON.parse(localStorage.getItem('eduMasterPrincipalCredentials')) || {
        username: 'principal',
        password: 'principal123',
        name: 'Dr. Ranjit Deshmukh',
        email: 'principal@edumaster.edu',
        mobile: '+91 9876543210',
        role: 'principal',
        avatar: 'P',
        accessLevel: 'view-only',
        roleName: 'Principal'
    }
};

// Save credentials to localStorage
function saveCredentialsToStorage() {
    localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
    localStorage.setItem('eduMasterPrincipalCredentials', JSON.stringify(storedCredentials.principal));
}

// Data storage arrays - EMPTY AS PER REQUIREMENT
let institutes = [];
let academicYears = [];
let programmes = [];
let classes = [];

// Class Code options mapping - UPDATED FOR ALL PROGRAMS
const classCodeOptions = {
    'Computer Engineering': ['FY-CO', 'SY-CO', 'TY-CO'],
    'Civil Engineering': ['FY-CIVIL', 'SY-CIVIL', 'TY-CIVIL'],
    'Mechanical Engineering': ['FY-MECH', 'SY-MECH', 'TY-MECH'],
    'Electrical Engineering': ['FY-EJ', 'SY-EJ', 'TY-EJ'],
    'Electronic and Telecommunication Engineering': ['FY-ENTC', 'SY-ENTC', 'TY-ENTC']
};

// Term mapping based on class code - UPDATED FOR ALL PROGRAMS
const termMapping = {
    // Computer Engineering
    'FY-CO': ['TERM 1', 'TERM 2'],
    'SY-CO': ['TERM 3', 'TERM 4'],
    'TY-CO': ['TERM 5', 'TERM 6'],
    
    // Civil Engineering
    'FY-CIVIL': ['TERM 1', 'TERM 2'],
    'SY-CIVIL': ['TERM 3', 'TERM 4'],
    'TY-CIVIL': ['TERM 5', 'TERM 6'],
    
    // Mechanical Engineering
    'FY-MECH': ['TERM 1', 'TERM 2'],
    'SY-MECH': ['TERM 3', 'TERM 4'],
    'TY-MECH': ['TERM 5', 'TERM 6'],
    
    // Electrical Engineering
    'FY-EJ': ['TERM 1', 'TERM 2'],
    'SY-EJ': ['TERM 3', 'TERM 4'],
    'TY-EJ': ['TERM 5', 'TERM 6'],
    
    // Electronic and Telecommunication Engineering
    'FY-ENTC': ['TERM 1', 'TERM 2'],
    'SY-ENTC': ['TERM 3', 'TERM 4'],
    'TY-ENTC': ['TERM 5', 'TERM 6']
};

// Helper function to check if all classes for a program are completed
function areAllClassesCompletedForProgram(programmeId) {
    // Get all classes for this program
    const programClasses = classes.filter(cls => cls.programme_id === programmeId);
    
    // If no classes exist, return true (can be marked as completed)
    if (programClasses.length === 0) return true;
    
    // Check if all classes have status "Completed"
    return programClasses.every(cls => cls.status === 'Completed');
}

// Helper function to check if all classes for an academic year are completed
function areAllClassesCompletedForAcademicYear(academicYearId) {
    // Get all classes for this academic year
    const yearClasses = classes.filter(cls => cls.academic_year === academicYearId);
    
    // If no classes exist, return true
    if (yearClasses.length === 0) return true;
    
    // Check if all classes have status "Completed"
    return yearClasses.every(cls => cls.status === 'Completed');
}

// Helper function to check if program name already exists
function getProgramIdByName(programmeName) {
    const program = programmes.find(prog => prog.name === programmeName);
    return program ? program.id : null;
}

// Helper function to generate unique Program ID for duplicate names
function generateUniqueProgramId(programmeName) {
    // Get all programs with the same name
    const sameNamePrograms = programmes.filter(prog => 
        prog.name.toLowerCase() === programmeName.toLowerCase()
    );
    
    if (sameNamePrograms.length === 0) {
        // No existing program with this name, generate normal ID
        return `PID${String(programmes.length + 1).padStart(3, '0')}`;
    }
    
    // Find the highest number suffix
    let maxSuffix = 0;
    sameNamePrograms.forEach(prog => {
        // Extract number from ID (e.g., "PID001" -> 1)
        const match = prog.id.match(/PID(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxSuffix) maxSuffix = num;
        }
    });
    
    // Generate new ID with next available number
    return `PID${String(maxSuffix + 1).padStart(3, '0')}`;
}

// Helper function to check if a program has any related classes
function hasRelatedClasses(programmeId) {
    return classes.some(cls => cls.programme_id === programmeId);
}

// Helper function to check if an academic year has any related classes
function hasRelatedAcademicYearClasses(academicYearId) {
    return classes.some(cls => cls.academic_year === academicYearId);
}

// Date format function - NEW: Convert date to DD-MM-YYYY format
function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    
    // Check if date is in YYYY-MM-DD format (from date input)
    if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    }
    
    // Check if date is already in DD-MM-YYYY format
    if (dateStr.includes('-') && dateStr.split('-')[0].length === 2) {
        return dateStr;
    }
    
    // Try to parse the date
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return dateStr; // Return original if can't parse
    }
    
    // Format as DD-MM-YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

// Convert DD-MM-YYYY to YYYY-MM-DD for date inputs
function formatDateToYYYYMMDD(dateStr) {
    if (!dateStr) return '';
    
    // Check if already in YYYY-MM-DD format
    if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        return dateStr;
    }
    
    // Parse DD-MM-YYYY format
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 2) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    return dateStr;
}

// Format date for display in tables - NEW
function formatDateForDisplay(dateStr) {
    return formatDateToDDMMYYYY(dateStr);
}

// Helper function to get academic year name by ID
function getAcademicYearNameById(id) {
    const year = academicYears.find(year => year.id === id);
    return year ? year.name : id; // fallback to ID if not found
}

// User profile photos storage
let userProfilePhotos = {
    admin: null,
    principal: null
};

// Principal credentials management
let principalCredentials = JSON.parse(localStorage.getItem('eduMasterPrincipalCredentials')) || {
    username: 'principal',
    password: 'principal123',
    displayName: 'Dr. Ranjit Deshmukh',
    email: 'principal@edumaster.edu',
    mobile: '+91 9876543210',
    lastChanged: new Date().toISOString().split('T')[0]
};

// Principal settings storage
let principalSettings = {
    displayName: 'Dr. Ranjit Deshmukh',
    username: 'principal',
    email: 'principal@edumaster.edu',
    mobile: '+91 9876543210',
    profilePhoto: null,
    lastUpdated: new Date().toISOString()
};

// Editing states
let editingInstituteId = null;
let editingAcademicId = null;
let editingProgrammeId = null;
let editingClassId = null;

// Custom Alert System
let customAlertResolve = null;
let customAlertPromise = null;

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const roleButtons = document.querySelectorAll('.role-btn');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('loginButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const logoutBtn = document.getElementById('logoutBtn');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');
const closeToast = document.getElementById('closeToast');

// Custom Alert Elements
const customAlertOverlay = document.getElementById('customAlertOverlay');
const customAlertIcon = document.getElementById('customAlertIcon');
const customAlertTitle = document.getElementById('customAlertTitle');
const customAlertMessage = document.getElementById('customAlertMessage');
const customAlertCancel = document.getElementById('customAlertCancel');
const customAlertConfirm = document.getElementById('customAlertConfirm');

// Dashboard elements
const userAvatar = document.getElementById('userAvatar');
const avatarText = document.getElementById('avatarText');
const dashboardUserName = document.getElementById('dashboardUserName');
const dashboardUserRole = document.getElementById('dashboardUserRole');
const welcomeBanner = document.getElementById('welcomeBanner');
const successBanner = document.getElementById('successBanner');
const welcomeTitle = document.getElementById('welcomeTitle');
const welcomeSubtitle = document.getElementById('welcomeSubtitle');
const successSubtitle = document.getElementById('successSubtitle');
const mainDashboard = document.getElementById('mainDashboard');

// Stats elements
const statInstitutes = document.getElementById('statInstitutes');
const statYears = document.getElementById('statYears');
const statProgrammes = document.getElementById('statProgrammes');
const statClasses = document.getElementById('statClasses');
const instituteChange = document.getElementById('instituteChange');
const activeYearCount = document.getElementById('activeYearCount');
const programmeChange = document.getElementById('programmeChange');
const classChange = document.getElementById('classChange');

// Quick action buttons
const addInstituteBtn = document.getElementById('addInstituteBtn');
const addAcademicYearBtn = document.getElementById('addAcademicYearBtn');
const addProgrammeBtn = document.getElementById('addProgrammeBtn');
const addClassBtn = document.getElementById('addClassBtn');
const viewReportsBtn = document.getElementById('viewReportsBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Module sections
const instituteModule = document.getElementById('instituteModule');
const academicModule = document.getElementById('academicModule');
const programmeModule = document.getElementById('programmeModule');
const classModule = document.getElementById('classModule');
const reportsModule = document.getElementById('reportsModule');
const settingsModule = document.getElementById('settingsModule');
const principalSettingsModule = document.getElementById('principalSettingsModule');
const databaseTablesSection = document.getElementById('databaseTablesSection');

// Back buttons
const backFromInstitute = document.getElementById('backFromInstitute');
const backFromAcademic = document.getElementById('backFromAcademic');
const backFromProgramme = document.getElementById('backFromProgramme');
const backFromClass = document.getElementById('backFromClass');
const backFromReports = document.getElementById('backFromReports');
const backFromSettings = document.getElementById('backFromSettings');
const backFromPrincipalSettings = document.getElementById('backFromPrincipalSettings');

// Module cards
const moduleCards = document.querySelectorAll('.module-card');

// Database table elements
const tableTabs = document.querySelectorAll('.table-tab');
const tableContainers = document.querySelectorAll('.table-container');

// Reports elements
const exportPdfBtn = document.getElementById('exportPdfBtn');
const exportExcelBtn = document.getElementById('exportExcelBtn');
const reportTotalInstitutes = document.getElementById('reportTotalInstitutes');
const reportTotalProgrammes = document.getElementById('reportTotalProgrammes');
const reportTotalClasses = document.getElementById('reportTotalClasses');
const reportActiveYears = document.getElementById('reportActiveYears');

// Settings elements
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileRole = document.getElementById('profileRole');
const profileMobile = document.getElementById('profileMobile');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const currentUsername = document.getElementById('currentUsername');
const newUsername = document.getElementById('newUsername');
const confirmUsername = document.getElementById('confirmUsername');
const changeUsernameBtn = document.getElementById('changeUsernameBtn');

// Principal Management elements (Admin only)
const principalProfileTab = document.getElementById('principalProfileTab');
const principalSecurityTab = document.getElementById('principalSecurityTab');
const principalProfilePanel = document.getElementById('principalProfilePanel');
const principalSecurityPanel = document.getElementById('principalSecurityPanel');
const principalDisplayName = document.getElementById('principalDisplayName');
const principalRole = document.getElementById('principalRole');
const principalEmail = document.getElementById('principalEmail');
const principalMobile = document.getElementById('principalMobile');
const savePrincipalBtn = document.getElementById('savePrincipalBtn');

// Principal Security elements (Admin only)
const principalCurrentUsername = document.getElementById('principalCurrentUsername');
const principalNewUsername = document.getElementById('principalNewUsername');
const principalConfirmUsername = document.getElementById('principalConfirmUsername');
const changePrincipalUsernameBtn = document.getElementById('changePrincipalUsernameBtn');
const principalCurrentPassword = document.getElementById('principalCurrentPassword');
const principalNewPassword = document.getElementById('principalNewPassword');
const principalConfirmPassword = document.getElementById('principalConfirmPassword');
const changePrincipalPasswordBtn = document.getElementById('changePrincipalPasswordBtn');

// Principal settings elements
const principalSettingsTabs = document.querySelectorAll('.principal-settings-tab');
const principalSettingsPanels = document.querySelectorAll('.principal-settings-panel');
const principalSettingsName = document.getElementById('principalSettingsName');
const principalSettingsEmail = document.getElementById('principalSettingsEmail');
const principalSettingsRole = document.getElementById('principalSettingsRole');
const principalSettingsMobile = document.getElementById('principalSettingsMobile');
const savePrincipalSettingsBtn = document.getElementById('savePrincipalSettingsBtn');
const principalCurrentUsernameField = document.getElementById('principalCurrentUsernameField');
const principalNewUsernameField = document.getElementById('principalNewUsernameField');
const principalConfirmUsernameField = document.getElementById('principalConfirmUsernameField');
const changePrincipalUsernameBtnField = document.getElementById('changePrincipalUsernameBtnField');
const principalCurrentPasswordField = document.getElementById('principalCurrentPasswordField');
const principalNewPasswordField = document.getElementById('principalNewPasswordField');
const principalConfirmPasswordField = document.getElementById('principalConfirmPasswordField');
const changePrincipalPasswordBtnField = document.getElementById('changePrincipalPasswordBtnField');

// Application state
let currentUser = null;
let toastTimeout = null;
let currentRole = 'admin';
let successBannerTimeout = null;
let hasSubmitted = false;
let charts = {};
let profilePhotoUrl = null;
let loginAnimationPlayed = false;

// Scroll position tracking
let dashboardScrollPosition = 0;

// NEW: Store previous academic year dropdown values for validation
let previousIsCurrentYearValue = '';
let previousAcademicStatusValue = '';

// NEW: Store previous programme status dropdown value for validation
let previousProgrammeStatusValue = '';

// Custom Alert System Functions
function showCustomAlert(message, title = 'Alert', type = 'info') {
    return new Promise((resolve) => {
        // Set alert content
        customAlertTitle.textContent = title;
        customAlertMessage.textContent = message;
        
        // Set icon based on type
        customAlertIcon.className = 'custom-alert-icon';
        let iconClass = 'fas fa-info-circle';
        
        switch(type) {
            case 'success':
                customAlertIcon.classList.add('success');
                iconClass = 'fas fa-check-circle';
                break;
            case 'warning':
                customAlertIcon.classList.add('warning');
                iconClass = 'fas fa-exclamation-triangle';
                break;
            case 'error':
                customAlertIcon.classList.add('error');
                iconClass = 'fas fa-times-circle';
                break;
            case 'info':
            default:
                customAlertIcon.classList.add('info');
                iconClass = 'fas fa-info-circle';
                break;
        }
        
        customAlertIcon.innerHTML = `<i class="${iconClass}"></i>`;
        
        // Show only OK button for alerts
        customAlertCancel.style.display = 'none';
        customAlertConfirm.textContent = 'OK';
        
        // Show the alert
        customAlertOverlay.classList.add('show');
        
        // Set up event listeners
        const handleConfirm = () => {
            hideCustomAlert();
            resolve(true);
        };
        
        const handleCancel = () => {
            hideCustomAlert();
            resolve(false);
        };
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleConfirm();
            } else if (e.key === 'Enter') {
                handleConfirm();
            }
        };
        
        // Add event listeners
        customAlertConfirm.onclick = handleConfirm;
        customAlertCancel.onclick = handleCancel;
        
        // Close on overlay click
        const handleOverlayClick = (e) => {
            if (e.target === customAlertOverlay) {
                handleConfirm();
            }
        };
        
        customAlertOverlay.addEventListener('click', handleOverlayClick);
        document.addEventListener('keydown', handleKeyDown);
        
        // Store cleanup function
        customAlertResolve = () => {
            customAlertOverlay.removeEventListener('click', handleOverlayClick);
            document.removeEventListener('keydown', handleKeyDown);
            customAlertConfirm.onclick = null;
            customAlertCancel.onclick = null;
        };
    });
}

function showCustomConfirm(message, title = 'Confirm', type = 'warning') {
    return new Promise((resolve) => {
        // Set alert content
        customAlertTitle.textContent = title;
        customAlertMessage.textContent = message;
        
        // Set icon based on type
        customAlertIcon.className = 'custom-alert-icon';
        let iconClass = 'fas fa-question-circle';
        
        switch(type) {
            case 'success':
                customAlertIcon.classList.add('success');
                iconClass = 'fas fa-check-circle';
                break;
            case 'warning':
                customAlertIcon.classList.add('warning');
                iconClass = 'fas fa-exclamation-triangle';
                break;
            case 'error':
                customAlertIcon.classList.add('error');
                iconClass = 'fas fa-times-circle';
                break;
            case 'info':
            default:
                customAlertIcon.classList.add('info');
                iconClass = 'fas fa-question-circle';
                break;
        }
        
        customAlertIcon.innerHTML = `<i class="${iconClass}"></i>`;
        
        // Show both buttons for confirm
        customAlertCancel.style.display = 'inline-flex';
        customAlertConfirm.textContent = 'Confirm';
        customAlertCancel.textContent = 'Cancel';
        
        // Show the alert
        customAlertOverlay.classList.add('show');
        
        // Set up event listeners
        const handleConfirm = () => {
            hideCustomAlert();
            resolve(true);
        };
        
        const handleCancel = () => {
            hideCustomAlert();
            resolve(false);
        };
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            } else if (e.key === 'Enter') {
                handleConfirm();
            }
        };
        
        // Add event listeners
        customAlertConfirm.onclick = handleConfirm;
        customAlertCancel.onclick = handleCancel;
        
        // Close on overlay click
        const handleOverlayClick = (e) => {
            if (e.target === customAlertOverlay) {
                handleCancel();
            }
        };
        
        customAlertOverlay.addEventListener('click', handleOverlayClick);
        document.addEventListener('keydown', handleKeyDown);
        
        // Store cleanup function
        customAlertResolve = () => {
            customAlertOverlay.removeEventListener('click', handleOverlayClick);
            document.removeEventListener('keydown', handleKeyDown);
            customAlertConfirm.onclick = null;
            customAlertCancel.onclick = null;
        };
    });
}

function hideCustomAlert() {
    customAlertOverlay.classList.remove('show');
    if (customAlertResolve) {
        customAlertResolve();
        customAlertResolve = null;
    }
}

// Replace default alert and confirm
window.alert = function(message) {
    return showCustomAlert(message, 'Alert', 'info');
};

window.confirm = function(message) {
    return showCustomConfirm(message, 'Confirm', 'warning');
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('EDU MASTER App Loaded');
    
    // Initialize particles.js
    initParticles();
    
    // Initialize animations
    if (!loginAnimationPlayed) {
        loginAnimationPlayed = true;
        setTimeout(() => {
            document.querySelector('.login-wrapper').style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, 100);
    }
    
    // Set up all event listeners
    setupEventListeners();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Render database tables
    renderDatabaseTables();
    
    // Load profile photos from localStorage
    loadProfilePhotos();
    
    // Load principal credentials from localStorage
    loadPrincipalCredentialsFromStorage();
    
    // Load principal settings from localStorage
    loadPrincipalSettingsFromStorage();
    
    // Initialize Principal Settings
    initializePrincipalSettings();
    
    // Focus on username field
    setTimeout(() => {
        usernameInput.focus();
    }, 300);
    
    // Add animation reset for logout
    const originalHandleLogout = handleLogout;
    handleLogout = function() {
        loginAnimationPlayed = false;
        originalHandleLogout.call(this);
    };
});

// Initialize Principal Settings
function initializePrincipalSettings() {
    // Load saved principal settings
    const savedSettings = localStorage.getItem('eduMasterPrincipalSettings');
    if (savedSettings) {
        try {
            const parsed = JSON.parse(savedSettings);
            if (parsed.displayName) principalSettingsName.value = parsed.displayName;
            if (parsed.email) principalSettingsEmail.value = parsed.email;
            if (parsed.mobile) principalSettingsMobile.value = parsed.mobile;
        } catch (e) {
            console.error('Error loading principal settings:', e);
        }
    }
    
    // Ensure Principal Settings forms are visible
    setTimeout(ensurePrincipalSettingsVisibility, 100);
}

// Particles.js initialization
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            retina_detect: true
        },
        retina_detect: true
    });
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Role selection buttons
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedRole = this.dataset.role;
            
            // Update active role
            roleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentRole = selectedRole;
            
            // Clear any previous errors
            clearErrors();
        });
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        
        // Refocus password input
        passwordInput.focus();
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Login form submitted');
        hasSubmitted = true;
        handleLogin();
    });
    
    // Login button click
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Login button clicked');
        hasSubmitted = true;
        handleLogin();
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Logout clicked');
        handleLogout();
    });
    
    // Close toast
    closeToast.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        hideToast();
    });
    
    // Module card clicks - DISABLED as per requirement
    moduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Do nothing - click functionality disabled as per requirement
            console.log('Module card click disabled:', this.dataset.module);
        });
    });
    
    // Back buttons
    backFromInstitute.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromAcademic.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromProgramme.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromClass.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromReports.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromSettings.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    backFromPrincipalSettings.addEventListener('click', function() {
        showMainDashboard();
        setTimeout(() => {
            document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });
    
    // Quick action buttons
    addInstituteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveDashboardScrollPosition();
        showInstituteModule();
        showAddInstituteForm();
        // Scroll to top of module
        setTimeout(() => {
            dashboard.scrollTop = 0;
        }, 10);
    });
    
    addAcademicYearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveDashboardScrollPosition();
        showAcademicModule();
        showAddAcademicForm();
        setTimeout(() => {
            dashboard.scrollTop = 0;
        }, 10);
    });
    
    addProgrammeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveDashboardScrollPosition();
        showProgrammeModule();
        showAddProgrammeForm();
        setTimeout(() => {
            dashboard.scrollTop = 0;
        }, 10);
    });
    
    addClassBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveDashboardScrollPosition();
        showClassModule();
        showAddClassForm();
        setTimeout(() => {
            dashboard.scrollTop = 0;
        }, 10);
    });
    
    viewReportsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveDashboardScrollPosition();
        showReportsModule();
        setTimeout(() => {
            dashboard.scrollTop = 0;
        }, 10);
    });
    
    // FIX: Remove Settings option completely for Principal
    settingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Only show settings for Admin, not for Principal
        if (currentUser && currentUser.role === 'admin') {
            saveDashboardScrollPosition();
            showSettingsModule();
            setTimeout(() => {
                dashboard.scrollTop = 0;
            }, 10);
        }
    });
    
    // Table tabs
    tableTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table');
            switchTableTab(tableId);
        });
    });
    
    // Settings tabs
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            switchSettingsTab(panelId);
        });
    });
    
    // Principal Settings tabs
    principalSettingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            switchPrincipalSettingsTab(panelId);
            // Ensure visibility after switching tabs
            setTimeout(ensurePrincipalSettingsVisibility, 10);
        });
    });
    
    // Save profile
    saveProfileBtn.addEventListener('click', saveProfile);
    
    // Change password
    changePasswordBtn.addEventListener('click', changePassword);
    
    // Change username
    changeUsernameBtn.addEventListener('click', changeUsername);
    
    // Principal management buttons
    savePrincipalBtn.addEventListener('click', savePrincipalCredentials);
    
    // Principal Security buttons
    changePrincipalUsernameBtn.addEventListener('click', changePrincipalUsernameAdmin);
    changePrincipalPasswordBtn.addEventListener('click', changePrincipalPasswordAdmin);
    
    // Principal settings buttons
    savePrincipalSettingsBtn.addEventListener('click', savePrincipalSettings);
    changePrincipalUsernameBtnField.addEventListener('click', changePrincipalUsername);
    changePrincipalPasswordBtnField.addEventListener('click', changePrincipalPassword);
    
    // Export buttons
    exportPdfBtn.addEventListener('click', exportToPDF);
    exportExcelBtn.addEventListener('click', exportToExcel);
    
    // Institute form actions
    document.getElementById('saveInstituteBtn').addEventListener('click', saveInstitute);
    document.getElementById('cancelInstituteBtn').addEventListener('click', cancelInstituteForm);
    document.getElementById('searchInstitute').addEventListener('input', filterInstitutes);
    document.getElementById('clearInstituteSearch').addEventListener('click', clearInstituteSearch);
    
    // Academic form actions
    document.getElementById('saveAcademicBtn').addEventListener('click', saveAcademicYear);
    document.getElementById('cancelAcademicBtn').addEventListener('click', cancelAcademicForm);
    document.getElementById('searchAcademic').addEventListener('input', filterAcademicYears);
    document.getElementById('clearAcademicSearch').addEventListener('click', clearAcademicSearch);
    
    // Programme form actions
    document.getElementById('saveProgrammeBtn').addEventListener('click', saveProgramme);
    document.getElementById('cancelProgrammeBtn').addEventListener('click', cancelProgrammeForm);
    document.getElementById('searchProgramme').addEventListener('input', filterProgrammes);
    document.getElementById('clearProgrammeSearch').addEventListener('click', clearProgrammeSearch);
    
    // Class form actions
    document.getElementById('saveClassBtn').addEventListener('click', saveClass);
    document.getElementById('cancelClassBtn').addEventListener('click', cancelClassForm);
    document.getElementById('searchClass').addEventListener('input', filterClasses);
    document.getElementById('clearClassSearch').addEventListener('click', clearClassSearch);
    
    // UPDATED: Class Programme dropdown change event with new logic
    document.getElementById('classProgramme').addEventListener('change', function() {
        const classCodeSelect = document.getElementById('classCode');
        const academicYearSelect = document.getElementById('classAcademicYear');
        const termSelect = document.getElementById('classTerm');
        
        if (this.value) {
            // Get the selected program
            const selectedProgram = programmes.find(prog => prog.id === this.value);
            
            if (selectedProgram) {
                // Enable Class Code dropdown and populate with program-specific options
                classCodeSelect.disabled = false;
                updateClassCodeDropdown();
                
                // NEW: Enable Academic Year dropdown and populate with active academic years
                academicYearSelect.disabled = false;
                updateAcademicYearDropdown();
                
                // Disable and reset Term dropdown (waiting for Class Code selection)
                termSelect.disabled = true;
                termSelect.innerHTML = '<option value="">Select Class Code first</option>';
                termSelect.value = '';
                
                // Make fields visible by enabling them
                classCodeSelect.style.opacity = '1';
                academicYearSelect.style.opacity = '1';
                termSelect.style.opacity = '0.5'; // Still disabled
            }
        } else {
            // Disable all dependent dropdowns and reset them
            classCodeSelect.disabled = true;
            classCodeSelect.innerHTML = '<option value="">Select Program first</option>';
            classCodeSelect.value = '';
            classCodeSelect.style.opacity = '0.5';
            
            academicYearSelect.disabled = true;
            academicYearSelect.innerHTML = '<option value="">Select Program first</option>';
            academicYearSelect.value = '';
            academicYearSelect.style.opacity = '0.5';
            
            termSelect.disabled = true;
            termSelect.innerHTML = '<option value="">Select Program first</option>';
            termSelect.value = '';
            termSelect.style.opacity = '0.5';
        }
    });
    
    // UPDATED: Class Code dropdown change event with new term mapping logic
    document.getElementById('classCode').addEventListener('change', function() {
        const termSelect = document.getElementById('classTerm');
        
        if (this.value) {
            // Enable Term dropdown and populate with term options based on selected Class Code
            termSelect.disabled = false;
            updateTermDropdown(this.value);
            termSelect.style.opacity = '1';
        } else {
            // Disable Term dropdown
            termSelect.disabled = true;
            termSelect.innerHTML = '<option value="">Select Class Code first</option>';
            termSelect.value = '';
            termSelect.style.opacity = '0.5';
        }
    });
    
    // NEW: Academic Year "Is Current Year" dropdown validation
    document.getElementById('isCurrentYear').addEventListener('change', function() {
        const selectedValue = this.value;
        const statusValue = document.getElementById('academicStatus').value;
        
        // Store previous value for revert if validation fails
        previousIsCurrentYearValue = this.getAttribute('data-previous-value') || '';
        
        // Check if user is trying to select "No"
        if (selectedValue === 'No') {
            // Check if status is "Inactive" or "Completed" (or trying to set it)
            if (statusValue === 'Inactive' || statusValue === 'Completed') {
                // Check if editing an existing academic year
                if (editingAcademicId) {
                    // Check if all related classes are completed
                    if (!areAllClassesCompletedForAcademicYear(editingAcademicId)) {
                        showCustomAlert(
                            'Cannot set "Is Current Year" to "No" with Status "Inactive" or "Completed" because there are classes in this academic year that are not completed. All related classes in Class Master must have Status "Completed".',
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousIsCurrentYearValue;
                        return;
                    }
                } else {
                    // For new academic year (not editing), check if there are any classes in ANY academic year
                    // that are not completed (general validation)
                    const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
                    if (hasIncompleteClasses) {
                        showCustomAlert(
                            'Cannot set "Is Current Year" to "No" with Status "Inactive" or "Completed" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".',
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousIsCurrentYearValue;
                        return;
                    }
                }
            }
        }
        
        // Store the new value as previous value
        this.setAttribute('data-previous-value', selectedValue);
    });
    
    // NEW: Academic Year "Status" dropdown validation - UPDATED WITH REQUIREMENTS
    document.getElementById('academicStatus').addEventListener('change', function() {
        const selectedValue = this.value;
        const isCurrentYearValue = document.getElementById('isCurrentYear').value;
        
        // Store previous value for revert if validation fails
        previousAcademicStatusValue = this.getAttribute('data-previous-value') || '';
        
        // Check if user is trying to select "Inactive" or "Completed"
        if (selectedValue === 'Inactive' || selectedValue === 'Completed') {
            // Case 1: When Is Current Year is "No"
            if (isCurrentYearValue === 'No') {
                // Check if editing an existing academic year
                if (editingAcademicId) {
                    // Check if all related classes are completed
                    if (!areAllClassesCompletedForAcademicYear(editingAcademicId)) {
                        showCustomAlert(
                            `Cannot set Status to "${selectedValue}" when "Is Current Year" is "No" because there are classes in this academic year that are not completed. All related classes in Class Master must have Status "Completed".`,
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousAcademicStatusValue;
                        return;
                    }
                } else {
                    // For new academic year (not editing), check if there are any classes in ANY academic year
                    // that are not completed (general validation)
                    const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
                    if (hasIncompleteClasses) {
                        showCustomAlert(
                            `Cannot set Status to "${selectedValue}" when "Is Current Year" is "No" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".`,
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousAcademicStatusValue;
                        return;
                    }
                }
            }
            // Case 2: When Is Current Year is "Yes" - Allow "Inactive" or "Completed" with validation
            else if (isCurrentYearValue === 'Yes') {
                // Check if editing an existing academic year
                if (editingAcademicId) {
                    // Check if all related classes are completed
                    if (!areAllClassesCompletedForAcademicYear(editingAcademicId)) {
                        showCustomAlert(
                            `Cannot set Status to "${selectedValue}" because there are classes in this academic year that are not completed. All related classes in Class Master must have Status "Completed".`,
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousAcademicStatusValue;
                        return;
                    }
                } else {
                    // For new academic year (not editing), check if there are any classes in ANY academic year
                    // that are not completed (general validation)
                    const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
                    if (hasIncompleteClasses) {
                        showCustomAlert(
                            `Cannot set Status to "${selectedValue}" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".`,
                            'Validation Error',
                            'error'
                        );
                        // Revert to previous value
                        this.value = previousAcademicStatusValue;
                        return;
                    }
                }
            }
            // Case 3: When Is Current Year is not selected yet (empty)
            else {
                showCustomAlert(
                    'Please select "Is Current Year" option first before setting Status to "Inactive" or "Completed".',
                    'Validation Error',
                    'error'
                );
                // Revert to previous value
                this.value = previousAcademicStatusValue;
                return;
            }
        }
        
        // Store the new value as previous value
        this.setAttribute('data-previous-value', selectedValue);
    });
    
    // NEW: Programme "Status" dropdown validation - UPDATED WITH REQUIREMENTS
    document.getElementById('programmeStatus').addEventListener('change', function() {
        const selectedValue = this.value;
        
        // Store previous value for revert if validation fails
        previousProgrammeStatusValue = this.getAttribute('data-previous-value') || '';
        
        // Check if user is trying to select "Inactive" or "Completed"
        if (selectedValue === 'Inactive' || selectedValue === 'Completed') {
            // Check if editing an existing program
            if (editingProgrammeId) {
                // Check if all related classes are completed
                if (!areAllClassesCompletedForProgram(editingProgrammeId)) {
                    showCustomAlert(
                        `Cannot set Status to "${selectedValue}" because there are classes in this program that are not completed. All related classes in Class Master must have Status "Completed".`,
                        'Validation Error',
                        'error'
                    );
                    // Revert to previous value
                    this.value = previousProgrammeStatusValue;
                    return;
                }
            } else {
                // For new program (not editing), check if there are any classes in ANY program
                // that are not completed (general validation for new programs)
                const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
                if (hasIncompleteClasses) {
                    showCustomAlert(
                        `Cannot set Status to "${selectedValue}" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".`,
                        'Validation Error',
                        'error'
                    );
                    // Revert to previous value
                    this.value = previousProgrammeStatusValue;
                    return;
                }
            }
        }
        
        // Store the new value as previous value
        this.setAttribute('data-previous-value', selectedValue);
    });
    
    // Input validation on blur
    usernameInput.addEventListener('blur', function() {
        if (hasSubmitted) {
            validateUsername();
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (hasSubmitted) {
            validatePassword();
        }
    });
    
    // Clear errors on input
    usernameInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearError('username');
            this.classList.remove('error');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearError('password');
            this.classList.remove('error');
        }
    });
    
    // Enter key to submit
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement === usernameInput || activeElement === passwordInput) {
                e.preventDefault();
                hasSubmitted = true;
                handleLogin();
            }
        }
        
        if (e.key === 'Escape') {
            hideToast();
            hideCustomAlert();
        }
    });
}

// UPDATED: Update Term dropdown based on selected Class Code
function updateTermDropdown(classCode) {
    const termSelect = document.getElementById('classTerm');
    const currentValue = termSelect.value;
    
    // Clear existing options
    termSelect.innerHTML = '<option value="">Select Term</option>';
    
    if (!classCode) {
        termSelect.disabled = true;
        return;
    }
    
    // Get terms from mapping based on Class Code
    const terms = termMapping[classCode] || [];
    
    // Add terms to dropdown based on the mapping
    terms.forEach(term => {
        const option = document.createElement('option');
        option.value = term;
        option.textContent = term;
        termSelect.appendChild(option);
    });
    
    // Restore previous selection if it still exists
    if (currentValue && terms.includes(currentValue)) {
        termSelect.value = currentValue;
    }
    
    // Enable the dropdown
    termSelect.disabled = false;
}

// UPDATED: Update Class Code dropdown based on selected Programme
function updateClassCodeDropdown() {
    const programmeSelect = document.getElementById('classProgramme');
    const classCodeSelect = document.getElementById('classCode');
    const selectedProgrammeId = programmeSelect.value;
    
    // Clear existing options
    classCodeSelect.innerHTML = '';
    
    if (!selectedProgrammeId) {
        classCodeSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Select Program first';
        classCodeSelect.appendChild(option);
        return;
    }
    
    // Get the selected program object
    const selectedProgramme = programmes.find(prog => prog.id === selectedProgrammeId);
    
    if (!selectedProgramme) {
        classCodeSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Program not found';
        classCodeSelect.appendChild(option);
        return;
    }
    
    // Enable dropdown
    classCodeSelect.disabled = false;
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Class Code';
    classCodeSelect.appendChild(defaultOption);
    
    // Add program-specific options from classCodeOptions mapping
    const programName = selectedProgramme.name;
    if (classCodeOptions[programName]) {
        classCodeOptions[programName].forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = code;
            classCodeSelect.appendChild(option);
        });
    } else {
        // If program not in mapping, show generic options
        const genericOptions = ['FY', 'SY', 'TY'];
        genericOptions.forEach(code => {
            const option = document.createElement('option');
            option.value = `${code}-${selectedProgramme.code}`;
            option.textContent = `${code}-${selectedProgramme.code}`;
            classCodeSelect.appendChild(option);
        });
    }
}

// Update Program dropdown in Class Master form - Show only ACTIVE program IDs (not Completed)
function updateProgrammeDropdown() {
    const programmeSelect = document.getElementById('classProgramme');
    const currentValue = programmeSelect.value;
    
    // Clear existing options except the first one
    programmeSelect.innerHTML = '<option value="">Select Program</option>';
    
    // Get unique ACTIVE program IDs from programmes array (filter out Completed programs)
    const activePrograms = programmes.filter(programme => 
        programme.status !== 'Completed' && programme.status !== 'Inactive'
    );
    
    // Add only ACTIVE programs to dropdown
    activePrograms.forEach(programme => {
        const option = document.createElement('option');
        option.value = programme.id; // Use program ID as value
        option.textContent = `${programme.name} (${programme.id})`; // Show name and ID
        programmeSelect.appendChild(option);
    });
    
    // Restore the previously selected value if it still exists
    if (currentValue && activePrograms.some(programme => programme.id === currentValue)) {
        programmeSelect.value = currentValue;
    }
}

// UPDATED: Update Academic Year dropdown - Show only Active AND Current academic years
function updateAcademicYearDropdown() {
    const dropdown = document.getElementById('classAcademicYear');
    const currentValue = dropdown.value;
    
    // Clear existing options except the first one
    dropdown.innerHTML = '<option value="">Select Academic Year</option>';
    
    // NEW: Filter academic years - only Active AND Is Current = "Yes"
    const availableAcademicYears = academicYears.filter(year => 
        year.status === 'Active' && year.is_current === 'Yes'
    );
    
    availableAcademicYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year.id;
        option.textContent = year.name; // Show name, not ID
        dropdown.appendChild(option);
    });
    
    // Restore previous selection if it still exists
    if (currentValue && availableAcademicYears.some(year => year.id === currentValue)) {
        dropdown.value = currentValue;
    }
}

// Save dashboard scroll position
function saveDashboardScrollPosition() {
    dashboardScrollPosition = dashboard.scrollTop;
}

// Restore dashboard scroll position
function restoreDashboardScrollPosition() {
    setTimeout(() => {
        dashboard.scrollTop = dashboardScrollPosition;
    }, 50);
}

function handleLogin() {
    console.log('Handling login for role:', currentRole);
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    console.log('Login attempt with username:', username);
    
    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    if (!username) {
        showError('username', 'Username is required');
        isValid = false;
    }
    
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    }
    
    if (!isValid) {
        console.log('Validation failed');
        return;
    }
    
    // Show loading state
    loginButton.disabled = true;
    loadingSpinner.style.display = 'block';
    loginButton.querySelector('span').textContent = 'AUTHENTICATING...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Check credentials against stored credentials
        let authenticated = false;
        let userData = null;
        
        if (currentRole === 'admin') {
            // Check against stored admin credentials
            if (username === storedCredentials.admin.username && password === storedCredentials.admin.password) {
                authenticated = true;
                userData = storedCredentials.admin;
            }
        } else if (currentRole === 'principal') {
            // Check against stored principal credentials
            if (username === storedCredentials.principal.username && password === storedCredentials.principal.password) {
                authenticated = true;
                userData = storedCredentials.principal;
            }
        }
        
        if (authenticated && userData) {
            console.log('Login successful for user:', userData.name);
            currentUser = userData;
            
            // Update UI for success
            usernameInput.classList.add('success');
            passwordInput.classList.add('success');
            
            // Show success toast
            showToast('Login Successful', `Welcome back, ${userData.name}!`, 'success');
            
            // Transition to dashboard after delay
            setTimeout(() => {
                transitionToDashboard();
                resetLoginForm();
            }, 500);
        } else {
            console.log('Login failed - invalid credentials');
            
            // Failed login - show error
            usernameInput.classList.add('error');
            passwordInput.classList.add('error');
            
            showError('username', 'Invalid username or password');
            showError('password', 'Please check your credentials');
            
            // Shake animation
            usernameInput.style.animation = 'shake 0.5s';
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                usernameInput.style.animation = '';
                passwordInput.style.animation = '';
            }, 500);
            
            showToast('Login Failed', 'Invalid username or password', 'error');
            resetLoginButton();
        }
    }, 500);
}

function transitionToDashboard() {
    console.log('Transitioning to dashboard for user:', currentUser.name);
    
    // Update dashboard with user data
    updateDashboard();
    
    // Show success message
    showSuccessMessage();
    
    // Fade out login page
    loginPage.style.opacity = '0';
    loginPage.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        loginPage.style.display = 'none';
        dashboard.style.display = 'block';
        
        // Fade in dashboard
        dashboard.style.opacity = '0';
        dashboard.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            dashboard.style.opacity = '1';
            // Scroll to top initially
            dashboard.scrollTop = 0;
        }, 50);
    }, 300);
}

function showSuccessMessage() {
    // Show success banner
    successBanner.style.display = 'block';
    welcomeBanner.style.display = 'none';
    successSubtitle.textContent = `Welcome ${currentUser.name} to EDU MASTER Dashboard`;
    
    // Add pulse animation
    successBanner.style.animation = 'successPulse 2s ease-in-out';
    
    // Hide success banner after 3 seconds and show welcome banner
    if (successBannerTimeout) clearTimeout(successBannerTimeout);
    successBannerTimeout = setTimeout(() => {
        successBanner.style.display = 'none';
        welcomeBanner.style.display = 'block';
    }, 3000);
}

function updateDashboard() {
    console.log('Updating dashboard for user:', currentUser);
    
    if (!currentUser) return;
    
    // Update user info
    updateUserAvatar();
    dashboardUserName.textContent = currentUser.name;
    dashboardUserRole.textContent = currentUser.roleName;
    
    // Update welcome message based on role
    if (currentUser.role === 'admin') {
        welcomeTitle.textContent = `Welcome back, ${currentUser.name}!`;
        welcomeSubtitle.textContent = 'You have full access to manage institutes, programs, classes, and academic years.';
    } else {
        welcomeTitle.textContent = `Welcome, ${currentUser.name}!`;
        welcomeSubtitle.textContent = 'You have view-only access to institutes, programs, classes, and academic years.';
    }
    
    // Update stats
    updateDashboardStats();
    
    // Render database tables
    renderDatabaseTables();
    
    // Apply role-based UI restrictions
    resetUIBeforeApplyingRestrictions();
    applyRoleRestrictions();
    
    // Update profile settings
    updateProfileSettings();
    
    // Update principal settings
    updatePrincipalSettings();
    
    // Update principal management panel if admin
    updatePrincipalManagementPanel();
    
    // Pre-fill current username in security panel (set to empty as per requirement)
    if (currentUsername) {
        currentUsername.value = '';
    }
    
    // Pre-fill principal current username in admin settings - EMPTY as per requirement
    if (principalCurrentUsername) {
        principalCurrentUsername.value = '';
    }
    
    // Update programme dropdown in class master
    updateProgrammeDropdown();
    
    // UPDATED: Initialize Class Master form fields visibility
    initializeClassFormVisibility();
}

// UPDATED: Initialize Class Master form fields visibility
function initializeClassFormVisibility() {
    const classCodeSelect = document.getElementById('classCode');
    const academicYearSelect = document.getElementById('classAcademicYear');
    const termSelect = document.getElementById('classTerm');
    
    // Initially, all dependent fields should be disabled and less visible
    classCodeSelect.disabled = true;
    academicYearSelect.disabled = true;
    termSelect.disabled = true;
    
    // Set initial opacity to indicate disabled state
    classCodeSelect.style.opacity = '0.5';
    academicYearSelect.style.opacity = '0.5';
    termSelect.style.opacity = '0.5';
    
    // Reset dropdowns
    classCodeSelect.innerHTML = '<option value="">Select Program first</option>';
    academicYearSelect.innerHTML = '<option value="">Select Program first</option>';
    termSelect.innerHTML = '<option value="">Select Program first</option>';
}

function updateUserAvatar() {
    if (currentUser.role === 'principal' && principalSettings.profilePhoto) {
        userAvatar.innerHTML = `<img src="${principalSettings.profilePhoto}" alt="Profile Photo">`;
        avatarText.style.display = 'none';
    } else {
        const photoUrl = userProfilePhotos[currentUser.role];
        if (photoUrl) {
            userAvatar.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
            avatarText.style.display = 'none';
        } else {
            avatarText.textContent = currentUser.avatar || currentUser.name.charAt(0).toUpperCase();
            avatarText.style.display = 'flex';
        }
    }
}

function updateDashboardStats() {
    // Update counters - FIXED: Ensure correct counting
    statInstitutes.textContent = institutes.length;
    statYears.textContent = academicYears.length;
    statProgrammes.textContent = programmes.length;
    statClasses.textContent = classes.length;
    
    // Update change indicators
    instituteChange.textContent = institutes.length;
    programmeChange.textContent = programmes.length;
    classChange.textContent = classes.length;
    
    // Count active academic years
    const activeYears = academicYears.filter(year => year.is_current === 'Yes').length;
    activeYearCount.textContent = activeYears;
    
    // Update reports summary cards
    reportTotalInstitutes.textContent = institutes.length;
    reportTotalProgrammes.textContent = programmes.length;
    reportTotalClasses.textContent = classes.length;
    reportActiveYears.textContent = activeYears;
    
    // Render tables
    renderInstituteTable();
    renderAcademicTable();
    renderProgrammeTable();
    renderClassTable();
    
    // Update dropdowns
    updateAcademicYearDropdown();
    
    // Update programme dropdown in class master
    updateProgrammeDropdown();
}

function resetUIBeforeApplyingRestrictions() {
    console.log('Resetting UI before applying restrictions for:', currentUser.role);
    
    // Reset all form cards to visible (will be hidden if needed in applyRoleRestrictions)
    const formCards = document.querySelectorAll('.form-card');
    formCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Reset all action columns to visible
    const actionHeaders = document.querySelectorAll('.actions-header');
    const actionCells = document.querySelectorAll('.data-table .actions');
    
    actionHeaders.forEach(header => header.style.display = 'table-cell');
    actionCells.forEach(cell => cell.style.display = 'flex');
    
    // Reset quick action buttons
    const addButtons = document.querySelectorAll('.quick-action-btn');
    addButtons.forEach(btn => {
        btn.style.display = 'flex';
    });
    
    // Reset settings button
    settingsBtn.style.display = 'flex';
    
    // Reset principal profile and security tabs
    if (currentUser && currentUser.role === 'admin') {
        principalProfileTab.style.display = 'block';
        principalSecurityTab.style.display = 'block';
    }
}

function applyRoleRestrictions() {
    if (!currentUser) return;
    
    const isPrincipal = currentUser.role === 'principal';
    
    // Hide/show Add buttons in Quick Actions
    const addButtons = document.querySelectorAll('.quick-action-btn');
    addButtons.forEach(btn => {
        if (isPrincipal && btn.id.includes('add')) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'flex';
        }
    });
    
    // FIX: Remove Settings button completely for Principal
    if (isPrincipal) {
        settingsBtn.style.display = 'none';
    } else {
        settingsBtn.style.display = 'flex';
    }
    
    // Hide/show form cards in modules
    const formCards = document.querySelectorAll('.form-card');
    formCards.forEach(card => {
        if (isPrincipal) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
    
    // Hide/show action columns in tables
    const actionHeaders = document.querySelectorAll('.actions-header');
    const actionCells = document.querySelectorAll('.data-table .actions');
    
    if (isPrincipal) {
        actionHeaders.forEach(header => header.style.display = 'none');
        actionCells.forEach(cell => cell.style.display = 'none');
    } else {
        actionHeaders.forEach(header => header.style.display = 'table-cell');
        actionCells.forEach(cell => cell.style.display = 'flex');
    }
    
    // DATABASE TABLES SECTION - NOW VISIBLE FOR PRINCIPAL WITH READ-ONLY ACCESS
    // Show database tables for both admin and principal
    databaseTablesSection.style.display = 'block';
    
    // Add principal-view class for styling differences
    if (isPrincipal) {
        databaseTablesSection.classList.add('principal-view');
        // Hide action buttons in database tables for principal
        document.querySelectorAll('.database-tables-section .btn').forEach(btn => {
            btn.style.display = 'none';
        });
    } else {
        databaseTablesSection.classList.remove('principal-view');
        // Show action buttons for admin
        document.querySelectorAll('.database-tables-section .btn').forEach(btn => {
            btn.style.display = 'inline-flex';
        });
    }
    
    // Show/hide Principal Profile and Security tabs for Admin
    if (currentUser.role === 'admin') {
        principalProfileTab.style.display = 'block';
        principalSecurityTab.style.display = 'block';
    } else {
        principalProfileTab.style.display = 'none';
        principalSecurityTab.style.display = 'none';
        // Ensure we're not on principal panel if principal logs in
        if (document.querySelector('.settings-tab[data-panel="principalProfile"]').classList.contains('active') ||
            document.querySelector('.settings-tab[data-panel="principalSecurity"]').classList.contains('active')) {
            switchSettingsTab('adminProfile');
        }
    }
}

function showModule(moduleName) {
    // Hide main dashboard
    mainDashboard.style.display = 'none';
    
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected module
    switch(moduleName) {
        case 'institute':
            instituteModule.style.display = 'block';
            renderInstituteTable();
            break;
        case 'academic':
            academicModule.style.display = 'block';
            renderAcademicTable();
            break;
        case 'programme':
            programmeModule.style.display = 'block';
            renderProgrammeTable();
            break;
        case 'class':
            classModule.style.display = 'block';
            renderClassTable();
            // UPDATED: Initialize form visibility when showing class module
            initializeClassFormVisibility();
            break;
    }
    
    // Scroll to top of module
    setTimeout(() => {
        dashboard.scrollTop = 0;
    }, 10);
}

function showReportsModule() {
    // Hide main dashboard
    mainDashboard.style.display = 'none';
    
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show reports module
    reportsModule.style.display = 'block';
    
    // Initialize reports
    initializeReports();
    
    // Scroll to top
    setTimeout(() => {
        dashboard.scrollTop = 0;
    }, 10);
}

function showSettingsModule() {
    // Hide main dashboard
    mainDashboard.style.display = 'none';
    
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show settings module
    settingsModule.style.display = 'block';
    
    // Update profile settings
    updateProfileSettings();
    
    // Apply role restrictions to ensure correct UI state
    applyRoleRestrictions();
    
    // Scroll to top
    setTimeout(() => {
        dashboard.scrollTop = 0;
    }, 10);
}

function showPrincipalSettingsModule() {
    // Hide main dashboard
    mainDashboard.style.display = 'none';
    
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show principal settings module
    principalSettingsModule.style.display = 'block';
    
    // Ensure all fields are visible
    ensurePrincipalSettingsVisibility();
    
    // Update principal settings
    updatePrincipalSettings();
    
    // Scroll to top
    setTimeout(() => {
        dashboard.scrollTop = 0;
    }, 10);
}

function ensurePrincipalSettingsVisibility() {
    console.log('Ensuring Principal Settings visibility...');
    
    // Force display of all form elements in principal settings
    const principalFormGroups = document.querySelectorAll('#principalProfilePanel .form-group, #principalSecurityPanel .form-group');
    principalFormGroups.forEach(group => {
        group.style.display = 'block';
        group.style.visibility = 'visible';
        group.style.opacity = '1';
    });
    
    // Force display of all input fields
    const principalInputs = document.querySelectorAll('#principalProfilePanel .search-input, #principalSecurityPanel .search-input');
    principalInputs.forEach(input => {
        input.style.display = 'block';
        input.style.visibility = 'visible';
        input.style.opacity = '1';
    });
    
    // Force display of all buttons
    const principalButtons = document.querySelectorAll('#principalProfilePanel .btn, #principalSecurityPanel .btn');
    principalButtons.forEach(button => {
        button.style.display = 'inline-flex';
        button.style.visibility = 'visible';
        button.style.opacity = '1';
    });
    
    // Ensure form rows are displayed properly
    const principalFormRows = document.querySelectorAll('#principalProfilePanel .form-row, #principalSecurityPanel .form-row');
    principalFormRows.forEach(row => {
        row.style.display = 'grid';
        row.style.visibility = 'visible';
        row.style.opacity = '1';
    });
}

function showMainDashboard() {
    // Show main dashboard
    mainDashboard.style.display = 'block';
    
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Reset all forms
    resetAllForms();
    
    // Update stats
    updateDashboardStats();
    
    // Render database tables
    renderDatabaseTables();
    
    // Ensure database tables section remains in the same position
    databaseTablesSection.style.display = 'block';
    databaseTablesSection.style.position = 'relative';
    databaseTablesSection.style.marginTop = '30px';
}

function showInstituteModule() {
    showModule('institute');
}

function showAcademicModule() {
    showModule('academic');
}

function showProgrammeModule() {
    showModule('programme');
}

function showClassModule() {
    showModule('class');
}

// Database Tables Functions
function renderDatabaseTables() {
    renderDatabaseInstituteTable();
    renderDatabaseAcademicTable();
    renderDatabaseProgrammeTable();
    renderDatabaseClassTable();
}

function renderDatabaseInstituteTable() {
    const tbody = document.getElementById('databaseInstituteTableBody');
    tbody.innerHTML = '';
    
    institutes.forEach(institute => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${institute.id}</td>
            <td>${institute.name}</td>
            <td>${institute.code}</td>
            <td>${institute.address}</td>
            <td><span class="${institute.status === 'Active' ? 'status-active' : 'status-inactive'}">${institute.status}</span></td>
            <td>${formatDateForDisplay(institute.created_at)}</td>
            <td>${formatDateForDisplay(institute.updated_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-institute-db" data-id="${institute.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-institute-db" data-id="${institute.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    if (currentUser && currentUser.role === 'admin') {
        // Remove existing event listeners first
        const editButtons = document.querySelectorAll('.edit-institute-db');
        const deleteButtons = document.querySelectorAll('.delete-institute-db');
        
        // Add new event listeners
        editButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const instituteId = this.getAttribute('data-id');
                const institute = institutes.find(inst => inst.id === instituteId);
                if (institute) {
                    saveDashboardScrollPosition();
                    showModule('institute');
                    showEditInstituteForm(institute);
                    setTimeout(() => {
                        dashboard.scrollTop = 0;
                    }, 10);
                }
            });
        });
        
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const instituteId = this.getAttribute('data-id');
                showCustomConfirm('Are you sure you want to delete this institute?', 'Confirm Delete', 'warning').then(confirmed => {
                    if (confirmed) {
                        deleteInstitute(instituteId);
                        // Refresh the database table
                        renderDatabaseInstituteTable();
                    }
                });
            });
        });
    }
}

function renderDatabaseAcademicTable() {
    const tbody = document.getElementById('databaseAcademicTableBody');
    tbody.innerHTML = '';
    
    academicYears.forEach(year => {
        const row = document.createElement('tr');
        const statusClass = year.status === 'Active' ? 'status-active' : 
                           year.status === 'Completed' ? 'status-completed' : 'status-inactive';
        row.innerHTML = `
            <td>${year.id}</td>
            <td>${year.name}</td>
            <td>${formatDateForDisplay(year.start_date)}</td>
            <td>${formatDateForDisplay(year.end_date)}</td>
            <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
            <td><span class="${statusClass}">${year.status}</span></td>
            <td>${formatDateForDisplay(year.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-academic-db" data-id="${year.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-academic-db" data-id="${year.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    if (currentUser && currentUser.role === 'admin') {
        document.querySelectorAll('.edit-academic-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const yearId = this.getAttribute('data-id');
                const year = academicYears.find(y => y.id === yearId);
                if (year) {
                    saveDashboardScrollPosition();
                    showModule('academic');
                    showEditAcademicForm(year);
                    setTimeout(() => {
                        dashboard.scrollTop = 0;
                    }, 10);
                }
            });
        });
        
        document.querySelectorAll('.delete-academic-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const yearId = this.getAttribute('data-id');
                showCustomConfirm('Are you sure you want to delete this academic year?', 'Confirm Delete', 'warning').then(confirmed => {
                    if (confirmed) {
                        deleteAcademicYear(yearId);
                        // Refresh the database table
                        renderDatabaseAcademicTable();
                    }
                });
            });
        });
    }
}

function renderDatabaseProgrammeTable() {
    const tbody = document.getElementById('databaseProgrammeTableBody');
    tbody.innerHTML = '';
    
    programmes.forEach(programme => {
        const statusClass = programme.status === 'Active' ? 'status-active' : 
                          programme.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${programme.id}</td>
            <td>${programme.code}</td>
            <td>${programme.name}</td>
            <td>${programme.duration}</td>
            <td>${programme.description}</td>
            <td><span class="${statusClass}">${programme.status}</span></td>
            <td>${formatDateForDisplay(programme.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-programme-db" data-id="${programme.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-programme-db" data-id="${programme.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    if (currentUser && currentUser.role === 'admin') {
        document.querySelectorAll('.edit-programme-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const programmeId = this.getAttribute('data-id');
                const programme = programmes.find(prog => prog.id === programmeId);
                if (programme) {
                    saveDashboardScrollPosition();
                    showModule('programme');
                    showEditProgrammeForm(programme);
                    setTimeout(() => {
                        dashboard.scrollTop = 0;
                    }, 10);
                }
            });
        });
        
        document.querySelectorAll('.delete-programme-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const programmeId = this.getAttribute('data-id');
                showCustomConfirm('Are you sure you want to delete this program?', 'Confirm Delete', 'warning').then(confirmed => {
                    if (confirmed) {
                        deleteProgramme(programmeId);
                        // Refresh the database table
                        renderDatabaseProgrammeTable();
                    }
                });
            });
        });
    }
}

// UPDATED: Render Database Class Table to show Academic Year Name instead of ID
function renderDatabaseClassTable() {
    const tbody = document.getElementById('databaseClassTableBody');
    tbody.innerHTML = '';
    
    classes.forEach(cls => {
        const statusClass = cls.status === 'Active' ? 'status-active' : 
                          cls.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cls.id}</td>
            <td>${cls.programme_id}</td>
            <td>${cls.programme_name}</td>
            <td>${cls.class_code}</td>
            <!-- UPDATED: Show Academic Year Name instead of ID -->
            <td>${getAcademicYearNameById(cls.academic_year)}</td>
            <td>${cls.term}</td>
            <td><span class="${statusClass}">${cls.status}</span></td>
            <td>${formatDateForDisplay(cls.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-class-db" data-id="${cls.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-class-db" data-id="${cls.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    if (currentUser && currentUser.role === 'admin') {
        document.querySelectorAll('.edit-class-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.getAttribute('data-id');
                const cls = classes.find(c => c.id === classId);
                if (cls) {
                    saveDashboardScrollPosition();
                    showModule('class');
                    showEditClassForm(cls);
                    setTimeout(() => {
                        dashboard.scrollTop = 0;
                    }, 10);
                }
            });
        });
        
        document.querySelectorAll('.delete-class-db').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.getAttribute('data-id');
                showCustomConfirm('Are you sure you want to delete this class?', 'Confirm Delete', 'warning').then(confirmed => {
                    if (confirmed) {
                        deleteClass(classId);
                        // Refresh the database table
                        renderDatabaseClassTable();
                    }
                });
            });
        });
    }
}

function switchTableTab(tableId) {
    // Update active tab
    tableTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-table') === tableId) {
            tab.classList.add('active');
        }
    });
    
    // Show selected table
    tableContainers.forEach(container => {
        container.classList.remove('active');
        if (container.id === `${tableId}TableContainer`) {
            container.classList.add('active');
        }
    });
}

function switchSettingsTab(panelId) {
    // Update active tab
    settingsTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-panel') === panelId) {
            tab.classList.add('active');
        }
    });
    
    // Show selected panel
    settingsPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${panelId}Panel`) {
            panel.classList.add('active');
        }
    });
}

function switchPrincipalSettingsTab(panelId) {
    // Update active tab
    principalSettingsTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-panel') === panelId) {
            tab.classList.add('active');
        }
    });
    
    // Show selected panel
    principalSettingsPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${panelId}Panel`) {
            panel.classList.add('active');
        }
    });
}

// Reports Functions
function initializeReports() {
    // Update summary cards
    reportTotalInstitutes.textContent = institutes.length;
    reportTotalProgrammes.textContent = programmes.length;
    reportTotalClasses.textContent = classes.length;
    reportActiveYears.textContent = academicYears.filter(year => year.is_current === 'Yes').length;
    
    // Initialize charts
    initializeCharts();
}

function initializeCharts() {
    // Destroy existing charts
    if (charts.instituteChart) charts.instituteChart.destroy();
    if (charts.programmeChart) charts.programmeChart.destroy();
    if (charts.academicYearChart) charts.academicYearChart.destroy();
    if (charts.classDistributionChart) charts.classDistributionChart.destroy();
    
    // Institute Status Chart (Pie Chart)
    const instituteCtx = document.getElementById('instituteChart').getContext('2d');
    const instituteStatusCounts = {
        'Active': institutes.filter(i => i.status === 'Active').length,
        'Inactive': institutes.filter(i => i.status === 'Inactive').length
    };
    
    charts.instituteChart = new Chart(instituteCtx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                data: [instituteStatusCounts.Active, instituteStatusCounts.Inactive],
                backgroundColor: ['#10b981', '#ef4444'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Institute Status Distribution'
                }
            }
        }
    });
    
    // Program Statistics Chart (Bar Chart) - UPDATED: Ensure zero values when no data
    const programmeCtx = document.getElementById('programmeChart').getContext('2d');
    
    // Count programs by status - always show all three categories
    const programmeCounts = {
        'Active': programmes.filter(p => p.status === 'Active').length,
        'Completed': programmes.filter(p => p.status === 'Completed').length,
        'Inactive': programmes.filter(p => p.status === 'Inactive').length
    };
    
    charts.programmeChart = new Chart(programmeCtx, {
        type: 'bar',
        data: {
            labels: ['Active', 'Completed', 'Inactive'],
            datasets: [{
                label: 'Number of Programs',
                data: [
                    programmeCounts.Active,
                    programmeCounts.Completed,
                    programmeCounts.Inactive
                ],
                backgroundColor: ['#4f46e5', '#f59e0b', '#ef4444'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            if (value % 1 === 0) {
                                return value;
                            }
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Program Statistics'
                }
            }
        }
    });
    
    // Academic Year Status Chart (Doughnut Chart)
    const academicYearCtx = document.getElementById('academicYearChart').getContext('2d');
    const academicYearCounts = {
        'Active': academicYears.filter(y => y.status === 'Active').length,
        'Completed': academicYears.filter(y => y.status === 'Completed').length,
        'Inactive': academicYears.filter(y => y.status === 'Inactive').length
    };
    
    charts.academicYearChart = new Chart(academicYearCtx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Completed', 'Inactive'],
            datasets: [{
                data: [academicYearCounts.Active, academicYearCounts.Completed, academicYearCounts.Inactive],
                backgroundColor: ['#8b5cf6', '#f59e0b', '#ef4444'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Academic Year Status'
                }
            }
        }
    });
    
    // Class Distribution Chart (Line Chart)
    const classDistributionCtx = document.getElementById('classDistributionChart').getContext('2d');
    const programmeClassCounts = {};
    programmes.forEach(programme => {
        const count = classes.filter(c => c.programme_name === programme.name).length;
        programmeClassCounts[programme.name] = count;
    });
    
    charts.classDistributionChart = new Chart(classDistributionCtx, {
        type: 'line',
        data: {
            labels: Object.keys(programmeClassCounts),
            datasets: [{
                label: 'Number of Classes',
                data: Object.values(programmeClassCounts),
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Classes per Program'
                }
            }
        }
    });
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('EDU MASTER - Reports Summary', 20, 20);
    
    // Add summary
    doc.setFontSize(12);
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Total Institutes: ${institutes.length}`, 20, 45);
    doc.text(`Total Programs: ${programmes.length}`, 20, 55);
    doc.text(`Total Classes: ${classes.length}`, 20, 65);
    doc.text(`Active Academic Years: ${academicYears.filter(y => y.is_current === 'Yes').length}`, 20, 75);
    
    // Add institute data
    doc.setFontSize(14);
    doc.text('Institute Master Data:', 20, 95);
    doc.setFontSize(10);
    let yPos = 105;
    institutes.forEach((institute, index) => {
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`${index + 1}. ${institute.name} (${institute.code}) - ${institute.status}`, 25, yPos);
        yPos += 7;
    });
    
    // Save the PDF
    doc.save(`EDU-MASTER-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
    showToast('Success', 'Report exported as PDF successfully', 'success');
}

function exportToExcel() {
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Institute data
    const instituteData = institutes.map(inst => ({
        'Institute ID': inst.id,
        'Institute Name': inst.name,
        'Institute Code': inst.code,
        'Address': inst.address,
        'Status': inst.status,
        'Created At': formatDateForDisplay(inst.created_at),
        'Updated At': formatDateForDisplay(inst.updated_at)
    }));
    const instituteWs = XLSX.utils.json_to_sheet(instituteData);
    XLSX.utils.book_append_sheet(wb, instituteWs, 'Institutes');
    
    // Academic Year data
    const academicData = academicYears.map(year => ({
        'Year ID': year.id,
        'Year Name': year.name,
        'Start Date': formatDateForDisplay(year.start_date),
        'End Date': formatDateForDisplay(year.end_date),
        'Is Current': year.is_current,
        'Status': year.status,
        'Created At': formatDateForDisplay(year.created_at)
    }));
    const academicWs = XLSX.utils.json_to_sheet(academicData);
    XLSX.utils.book_append_sheet(wb, academicWs, 'Academic Years');
    
    // Program data
    const programmeData = programmes.map(prog => ({
        'Program ID': prog.id,
        'Program Code': prog.code,
        'Program Name': prog.name,
        'Duration (Years)': prog.duration,
        'Description': prog.description,
        'Status': prog.status,
        'Created At': formatDateForDisplay(prog.created_at)
    }));
    const programmeWs = XLSX.utils.json_to_sheet(programmeData);
    XLSX.utils.book_append_sheet(wb, programmeWs, 'Programs');
    
    // Class data - UPDATED: Show Academic Year Name instead of ID
    const classData = classes.map(cls => ({
        'Class ID': cls.id,
        'Program ID': cls.programme_id,
        'Program Name': cls.programme_name,
        'Class Code': cls.class_code,
        'Academic Year': getAcademicYearNameById(cls.academic_year), // UPDATED: Show name instead of ID
        'TERM': cls.term,
        'Status': cls.status,
        'Created At': formatDateForDisplay(cls.created_at)
    }));
    const classWs = XLSX.utils.json_to_sheet(classData);
    XLSX.utils.book_append_sheet(wb, classWs, 'Classes');
    
    // Summary sheet
    const summaryData = [{
        'Total Institutes': institutes.length,
        'Total Programs': programmes.length,
        'Total Classes': classes.length,
        'Active Academic Years': academicYears.filter(y => y.is_current === 'Yes').length,
        'Report Date': new Date().toLocaleDateString()
    }];
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    
    // Save the workbook
    XLSX.writeFile(wb, `EDU-MASTER-Data-${new Date().toISOString().slice(0, 10)}.xlsx`);
    showToast('Success', 'Data exported to Excel successfully', 'success');
}

// Settings Functions
function updateProfileSettings() {
    if (!currentUser) return;
    
    profileName.value = currentUser.name;
    profileEmail.value = currentUser.email;
    profileRole.value = currentUser.roleName;
    profileMobile.value = currentUser.mobile || '';
    
    // Pre-fill current username in security panel (set to empty as per requirement)
    if (currentUsername) {
        currentUsername.value = '';
    }
}

function updatePrincipalSettings() {
    if (!currentUser || currentUser.role !== 'principal') return;
    
    console.log('Updating principal settings UI...');
    
    // Load principal settings
    loadPrincipalSettingsFromStorage();
    
    // Update form fields - ensure they have values
    principalSettingsName.value = principalSettings.displayName || 'Dr. Ranjit Deshmukh';
    principalSettingsEmail.value = principalSettings.email || 'principal@edumaster.edu';
    principalSettingsRole.value = 'Principal';
    principalSettingsMobile.value = principalSettings.mobile || '+91 9876543210';
    
    // Update current username in security panel - EMPTY as per requirement
    if (principalCurrentUsernameField) {
        principalCurrentUsernameField.value = '';
    }
    
    // Make sure all form fields are visible
    ensurePrincipalSettingsVisibility();
}

function updatePrincipalManagementPanel() {
    if (currentUser.role === 'admin') {
        // Pre-fill form fields
        principalDisplayName.value = principalCredentials.displayName || 'Dr. Ranjit Deshmukh';
        principalEmail.value = principalCredentials.email || 'principal@edumaster.edu';
        principalMobile.value = principalCredentials.mobile || '+91 9876543210';
        
        // Pre-fill principal current username - EMPTY as per requirement
        principalCurrentUsername.value = '';
    }
}

function saveProfile() {
    const name = profileName.value.trim();
    const email = profileEmail.value.trim();
    const mobile = profileMobile.value.trim();
    
    if (!name || !email || !mobile) {
        showToast('Error', 'Name, email, and mobile number are required', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials[currentUser.role].name = name;
    storedCredentials[currentUser.role].email = email;
    storedCredentials[currentUser.role].mobile = mobile;
    
    // Save to localStorage
    saveCredentialsToStorage();
    
    // Update current user
    currentUser.name = name;
    currentUser.email = email;
    currentUser.mobile = mobile;
    
    // Update dashboard
    dashboardUserName.textContent = name;
    avatarText.textContent = name.charAt(0).toUpperCase();
    
    showToast('Success', 'Profile updated successfully', 'success');
}

function savePrincipalSettings() {
    const name = principalSettingsName.value.trim();
    const email = principalSettingsEmail.value.trim();
    const mobile = principalSettingsMobile.value.trim();
    
    if (!name || !email || !mobile) {
        showToast('Error', 'Name, email, and mobile number are required', 'error');
        return;
    }
    
    // Update principal settings
    principalSettings.displayName = name;
    principalSettings.email = email;
    principalSettings.mobile = mobile;
    principalSettings.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    savePrincipalSettingsToStorage();
    
    // Update current user if principal is logged in
    if (currentUser && currentUser.role === 'principal') {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.mobile = mobile;
        
        // Update dashboard
        dashboardUserName.textContent = name;
        avatarText.textContent = name.charAt(0).toUpperCase();
    }
    
    showToast('Success', 'Profile updated successfully', 'success');
}

function changeUsername() {
    const currentUserInput = currentUsername.value.trim();
    const newUser = newUsername.value.trim();
    const confirm = confirmUsername.value.trim();
    
    if (!currentUserInput || !newUser || !confirm) {
        showToast('Error', 'All username fields are required', 'error');
        return;
    }
    
    if (newUser !== confirm) {
        showToast('Error', 'New usernames do not match', 'error');
        return;
    }
    
    // Verify current username
    if (currentUserInput !== currentUser.username) {
        showToast('Error', 'Current username is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials[currentUser.role].username = newUser;
    saveCredentialsToStorage();
    
    // Update username
    currentUser.username = newUser;
    
    // Clear fields - UPDATED: Also clear current username field
    currentUsername.value = '';
    newUsername.value = '';
    confirmUsername.value = '';
    
    showToast('Success', 'Username changed successfully', 'success');
}

function changePrincipalUsernameAdmin() {
    const currentUserInput = principalCurrentUsername.value.trim();
    const newUser = principalNewUsername.value.trim();
    const confirm = principalConfirmUsername.value.trim();
    
    if (!currentUserInput || !newUser || !confirm) {
        showToast('Error', 'All username fields are required', 'error');
        return;
    }
    
    if (newUser !== confirm) {
        showToast('Error', 'New usernames do not match', 'error');
        return;
    }
    
    // Check if current username matches stored principal username
    if (currentUserInput !== storedCredentials.principal.username) {
        showToast('Error', 'Current username is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials.principal.username = newUser;
    saveCredentialsToStorage();
    
    // Update principal settings
    principalSettings.username = newUser;
    principalSettings.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    savePrincipalSettingsToStorage();
    
    // Update current user if principal is logged in
    if (currentUser && currentUser.role === 'principal') {
        currentUser.username = newUser;
    }
    
    // Clear fields - DON'T update current username field as per requirement
    principalCurrentUsername.value = '';
    principalNewUsername.value = '';
    principalConfirmUsername.value = '';
    
    showToast('Success', 'Principal username changed successfully', 'success');
}

function changePrincipalUsername() {
    const currentUserInput = principalCurrentUsernameField.value.trim();
    const newUser = principalNewUsernameField.value.trim();
    const confirm = principalConfirmUsernameField.value.trim();
    
    if (!currentUserInput || !newUser || !confirm) {
        showToast('Error', 'All username fields are required', 'error');
        return;
    }
    
    if (newUser !== confirm) {
        showToast('Error', 'New usernames do not match', 'error');
        return;
    }
    
    // Check if current username matches stored username
    const storedUsername = storedCredentials.principal.username || 'principal';
    if (currentUserInput !== storedUsername) {
        showToast('Error', 'Current username is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials.principal.username = newUser;
    saveCredentialsToStorage();
    
    // Update principal settings
    principalSettings.username = newUser;
    principalSettings.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    savePrincipalSettingsToStorage();
    
    // Update current user if principal is logged in
    if (currentUser && currentUser.role === 'principal') {
        currentUser.username = newUser;
    }
    
    // Update form fields - clear current username field as per requirement
    principalCurrentUsernameField.value = '';
    
    // Clear fields
    principalNewUsernameField.value = '';
    principalConfirmUsernameField.value = '';
    
    showToast('Success', 'Username changed successfully', 'success');
}

function changePassword() {
    const currentPass = currentPassword.value;
    const newPass = newPassword.value;
    const confirm = confirmPassword.value;
    
    if (!currentPass || !newPass || !confirm) {
        showToast('Error', 'All password fields are required', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showToast('Error', 'New passwords do not match', 'error');
        return;
    }
    
    // Check against stored credentials
    if (currentPass !== storedCredentials[currentUser.role].password) {
        showToast('Error', 'Current password is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials[currentUser.role].password = newPass;
    saveCredentialsToStorage();
    
    // Update password
    currentUser.password = newPass;
    
    // Clear fields
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    
    showToast('Success', 'Password changed successfully', 'success');
}

function changePrincipalPasswordAdmin() {
    const currentPass = principalCurrentPassword.value;
    const newPass = principalNewPassword.value;
    const confirm = principalConfirmPassword.value;
    
    if (!currentPass || !newPass || !confirm) {
        showToast('Error', 'All password fields are required', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showToast('Error', 'New passwords do not match', 'error');
        return;
    }
    
    // Check current password against stored principal credentials
    if (currentPass !== storedCredentials.principal.password) {
        showToast('Error', 'Current password is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials.principal.password = newPass;
    saveCredentialsToStorage();
    
    // Update principal credentials
    principalCredentials.password = newPass;
    principalCredentials.lastChanged = new Date().toISOString().split('T')[0];
    
    // Save to localStorage
    savePrincipalCredentialsToStorage();
    
    // Update current user if principal is logged in
    if (currentUser && currentUser.role === 'principal') {
        currentUser.password = newPass;
    }
    
    // Clear fields
    principalCurrentPassword.value = '';
    principalNewPassword.value = '';
    principalConfirmPassword.value = '';
    
    showToast('Success', 'Principal password changed successfully', 'success');
}

function changePrincipalPassword() {
    const currentPass = principalCurrentPasswordField.value;
    const newPass = principalNewPasswordField.value;
    const confirm = principalConfirmPasswordField.value;
    
    if (!currentPass || !newPass || !confirm) {
        showToast('Error', 'All password fields are required', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showToast('Error', 'New passwords do not match', 'error');
        return;
    }
    
    // Check current password against stored credentials
    const storedPassword = storedCredentials.principal.password || 'principal123';
    if (currentPass !== storedPassword) {
        showToast('Error', 'Current password is incorrect', 'error');
        return;
    }
    
    // Update stored credentials
    storedCredentials.principal.password = newPass;
    saveCredentialsToStorage();
    
    // Update principal credentials
    principalCredentials.password = newPass;
    principalCredentials.lastChanged = new Date().toISOString().split('T')[0];
    
    // Save to localStorage
    savePrincipalCredentialsToStorage();
    
    // Update current user if principal is logged in
    if (currentUser && currentUser.role === 'principal') {
        currentUser.password = newPass;
    }
    
    // Clear fields
    principalCurrentPasswordField.value = '';
    principalNewPasswordField.value = '';
    principalConfirmPasswordField.value = '';
    
    showToast('Success', 'Password changed successfully', 'success');
}

function savePrincipalCredentials() {
    const displayName = principalDisplayName.value.trim();
    const email = principalEmail.value.trim();
    const mobile = principalMobile.value.trim();
    
    if (!displayName || !email || !mobile) {
        showToast('Error', 'All fields are required', 'error');
        return;
    }
    
    // Update stored principal credentials
    storedCredentials.principal.name = displayName;
    storedCredentials.principal.displayName = displayName;
    storedCredentials.principal.email = email;
    storedCredentials.principal.mobile = mobile;
    
    // Save to localStorage
    saveCredentialsToStorage();
    
    // Update principal credentials
    principalCredentials.displayName = displayName;
    principalCredentials.email = email;
    principalCredentials.mobile = mobile;
    
    // Update principal settings as well
    principalSettings.displayName = displayName;
    principalSettings.email = email;
    principalSettings.mobile = mobile;
    principalSettings.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    savePrincipalCredentialsToStorage();
    savePrincipalSettingsToStorage();
    
    // Update display
    updatePrincipalManagementPanel();
    
    showToast('Success', 'Principal credentials updated successfully', 'success');
}

function savePrincipalCredentialsToStorage() {
    try {
        localStorage.setItem('eduMasterPrincipalCredentials', JSON.stringify(principalCredentials));
    } catch (e) {
        console.error('Error saving principal credentials:', e);
    }
}

function loadPrincipalCredentialsFromStorage() {
    try {
        const saved = localStorage.getItem('eduMasterPrincipalCredentials');
        if (saved) {
            principalCredentials = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading principal credentials:', e);
    }
}

function savePrincipalSettingsToStorage() {
    try {
        localStorage.setItem('eduMasterPrincipalSettings', JSON.stringify(principalSettings));
    } catch (e) {
        console.error('Error saving principal settings:', e);
    }
}

function loadPrincipalSettingsFromStorage() {
    try {
        const saved = localStorage.getItem('eduMasterPrincipalSettings');
        if (saved) {
            principalSettings = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading principal settings:', e);
    }
}

function saveProfilePhotos() {
    try {
        localStorage.setItem('eduMasterProfilePhotos', JSON.stringify(userProfilePhotos));
    } catch (e) {
        console.error('Error saving profile photos:', e);
    }
}

function loadProfilePhotos() {
    try {
        const saved = localStorage.getItem('eduMasterProfilePhotos');
        if (saved) {
            userProfilePhotos = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading profile photos:', e);
    }
}

// Institute Master Functions - UPDATED: ID format changed to IID001, IID002, etc.
function showAddInstituteForm() {
    document.getElementById('instituteFormTitle').textContent = 'Add New Institute';
    document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Save Institute';
    editingInstituteId = null;
    resetInstituteForm();
}

function showEditInstituteForm(institute) {
    document.getElementById('instituteFormTitle').textContent = 'Edit Institute';
    document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Update Institute';
    editingInstituteId = institute.id;
    
    document.getElementById('instituteName').value = institute.name;
    document.getElementById('instituteCode').value = institute.code;
    document.getElementById('instituteAddress').value = institute.address;
    document.getElementById('instituteStatus').value = institute.status;
}

function saveInstitute() {
    const name = document.getElementById('instituteName').value.trim();
    const code = document.getElementById('instituteCode').value.trim();
    const address = document.getElementById('instituteAddress').value.trim();
    const status = document.getElementById('instituteStatus').value;
    
    // Validation
    if (!name || !code || !address || !status) {
        showToast('Validation Error', 'Please fill in all required fields', 'error');
        return;
    }
    
    const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
    
    if (editingInstituteId) {
        // Update existing institute
        const index = institutes.findIndex(inst => inst.id === editingInstituteId);
        if (index !== -1) {
            institutes[index] = {
                ...institutes[index],
                name,
                code,
                address,
                status,
                updated_at: today
            };
            showToast('Success', 'Institute updated successfully', 'success');
        }
    } else {
        // Add new institute - UPDATED: ID format changed to IID001, IID002, etc.
        const newInstitute = {
            id: `IID${String(institutes.length + 1).padStart(3, '0')}`,
            name,
            code,
            address,
            status,
            created_at: today,
            updated_at: today
        };
        institutes.push(newInstitute);
        showToast('Success', 'Institute added successfully', 'success');
    }
    
    // FIXED: Update dashboard stats after adding/updating
    updateDashboardStats();
    renderInstituteTable();
    renderDatabaseInstituteTable();
    resetInstituteForm();
}

function resetInstituteForm() {
    document.getElementById('instituteName').value = '';
    document.getElementById('instituteCode').value = '';
    document.getElementById('instituteAddress').value = '';
    document.getElementById('instituteStatus').value = '';
    editingInstituteId = null;
}

function cancelInstituteForm() {
    resetInstituteForm();
    document.getElementById('instituteFormTitle').textContent = 'Add New Institute';
    document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Save Institute';
}

function renderInstituteTable() {
    const tbody = document.getElementById('instituteTableBody');
    tbody.innerHTML = '';
    
    institutes.forEach(institute => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${institute.id}</td>
            <td>${institute.name}</td>
            <td>${institute.code}</td>
            <td>${institute.address}</td>
            <td><span class="${institute.status === 'Active' ? 'status-active' : 'status-inactive'}">${institute.status}</span></td>
            <td>${formatDateForDisplay(institute.created_at)}</td>
            <td>${formatDateForDisplay(institute.updated_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-institute" data-id="${institute.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-institute" data-id="${institute.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-institute').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const instituteId = this.getAttribute('data-id');
            const institute = institutes.find(inst => inst.id === instituteId);
            if (institute) {
                showEditInstituteForm(institute);
                // Scroll to form
                document.getElementById('instituteFormCard').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    document.querySelectorAll('.delete-institute').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const instituteId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this institute?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteInstitute(instituteId);
                }
            });
        });
    });
}

function deleteInstitute(id) {
    const index = institutes.findIndex(inst => inst.id === id);
    if (index !== -1) {
        institutes.splice(index, 1);
        // FIXED: Update dashboard stats after deletion
        updateDashboardStats();
        renderInstituteTable();
        renderDatabaseInstituteTable();
        showToast('Success', 'Institute deleted successfully', 'success');
    }
}

function filterInstitutes() {
    const searchTerm = document.getElementById('searchInstitute').value.toLowerCase();
    const filtered = institutes.filter(institute => 
        institute.name.toLowerCase().includes(searchTerm) ||
        institute.code.toLowerCase().includes(searchTerm) ||
        institute.address.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('instituteTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(institute => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${institute.id}</td>
            <td>${institute.name}</td>
            <td>${institute.code}</td>
            <td>${institute.address}</td>
            <td><span class="${institute.status === 'Active' ? 'status-active' : 'status-inactive'}">${institute.status}</span></td>
            <td>${formatDateForDisplay(institute.created_at)}</td>
            <td>${formatDateForDisplay(institute.updated_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-institute" data-id="${institute.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-institute" data-id="${institute.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.edit-institute').forEach(btn => {
        btn.addEventListener('click', function() {
            const instituteId = this.getAttribute('data-id');
            const institute = institutes.find(inst => inst.id === instituteId);
            if (institute) showEditInstituteForm(institute);
        });
    });
    
    document.querySelectorAll('.delete-institute').forEach(btn => {
        btn.addEventListener('click', function() {
            const instituteId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this institute?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteInstitute(instituteId);
                }
            });
        });
    });
}

function clearInstituteSearch() {
    document.getElementById('searchInstitute').value = '';
    renderInstituteTable();
}

// Academic Year Functions - UPDATED: Removed calendar icon and rearranged fields
function showAddAcademicForm() {
    document.getElementById('academicFormTitle').textContent = 'Add New Academic Year';
    document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Save Academic Year';
    editingAcademicId = null;
    resetAcademicForm();
    
    // Reset previous value storage for dropdowns
    previousIsCurrentYearValue = '';
    previousAcademicStatusValue = '';
    document.getElementById('isCurrentYear').setAttribute('data-previous-value', '');
    document.getElementById('academicStatus').setAttribute('data-previous-value', '');
}

function showEditAcademicForm(academic) {
    document.getElementById('academicFormTitle').textContent = 'Edit Academic Year';
    document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Update Academic Year';
    editingAcademicId = academic.id;
    
    document.getElementById('yearName').value = academic.name;
    document.getElementById('startDate').value = formatDateToYYYYMMDD(academic.start_date);
    document.getElementById('endDate').value = formatDateToYYYYMMDD(academic.end_date);
    document.getElementById('isCurrentYear').value = academic.is_current || '';
    document.getElementById('academicStatus').value = academic.status;
    
    // Store previous values for validation
    previousIsCurrentYearValue = academic.is_current || '';
    previousAcademicStatusValue = academic.status || '';
    document.getElementById('isCurrentYear').setAttribute('data-previous-value', previousIsCurrentYearValue);
    document.getElementById('academicStatus').setAttribute('data-previous-value', previousAcademicStatusValue);
}

// UPDATED: Save Academic Year function with all required validations
function saveAcademicYear() {
    const name = document.getElementById('yearName').value.trim();
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    const isCurrent = document.getElementById('isCurrentYear').value;
    const status = document.getElementById('academicStatus').value;
    
    // Validation
    if (!name || !startDateInput || !endDateInput || !isCurrent || !status) {
        showToast('Validation Error', 'Please fill in all required fields', 'error');
        return;
    }
    
    // Convert to DD-MM-YYYY format for storage
    const startDate = formatDateToDDMMYYYY(startDateInput);
    const endDate = formatDateToDDMMYYYY(endDateInput);
    
    // Get the original academic year record if editing
    let originalAcademicYear = null;
    if (editingAcademicId) {
        originalAcademicYear = academicYears.find(year => year.id === editingAcademicId);
    }
    
    // VALIDATION 1: Check if changing status to Inactive or Completed
    if (status === 'Inactive' || status === 'Completed') {
        // Check if academic year has related classes in Class Master
        if (editingAcademicId && hasRelatedAcademicYearClasses(editingAcademicId)) {
            // Check if all related classes are completed
            if (!areAllClassesCompletedForAcademicYear(editingAcademicId)) {
                showCustomAlert(
                    `Cannot set status to "${status}" because there are classes in this academic year that are not completed. All related classes in Class Master must have Status "Completed".`,
                    'Validation Error',
                    'error'
                );
                return;
            }
        } else if (!editingAcademicId) {
            // For new academic year (not editing), check if there are any classes in ANY academic year
            // that are not completed (general validation)
            const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
            if (hasIncompleteClasses) {
                showCustomAlert(
                    `Cannot set status to "${status}" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".`,
                    'Validation Error',
                    'error'
                );
                return;
            }
        }
    }
    
    // VALIDATION 2: Check if setting Is Current Year = Yes while another academic year is already marked as Current
    if (isCurrent === 'Yes') {
        // Check if there is another academic year already marked as current
        const otherCurrentYear = academicYears.find(year => 
            year.is_current === 'Yes' && 
            (!editingAcademicId || year.id !== editingAcademicId)
        );
        
        if (otherCurrentYear) {
            showCustomAlert(
                `Cannot set "${name}" as current year. "${otherCurrentYear.name}" is already marked as the current academic year.`,
                'Validation Error',
                'error'
            );
            return;
        }
    }
    
    // VALIDATION 3: For new academic years, maintain existing behavior
    // When adding new academic year with Is Current Year = Yes, set all others to No
    if (!editingAcademicId && isCurrent === 'Yes') {
        academicYears.forEach(year => {
            year.is_current = 'No';
        });
    }
    
    // VALIDATION 4: For editing academic years, do NOT automatically change other years
    // (This is already handled by validation 2 above)
    
    const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
    
    if (editingAcademicId) {
        // Update existing academic year
        const index = academicYears.findIndex(year => year.id === editingAcademicId);
        if (index !== -1) {
            academicYears[index] = {
                ...academicYears[index],
                name,
                start_date: startDate,
                end_date: endDate,
                is_current: isCurrent,
                status,
                updated_at: today
            };
            showToast('Success', 'Academic year updated successfully', 'success');
        }
    } else {
        // Add new academic year - UPDATED: ID format changed to YID001, YID002, etc.
        const newAcademicYear = {
            id: `YID${String(academicYears.length + 1).padStart(3, '0')}`,
            name,
            start_date: startDate,
            end_date: endDate,
            is_current: isCurrent,
            status,
            created_at: today,
            updated_at: today
        };
        academicYears.push(newAcademicYear);
        showToast('Success', 'Academic year added successfully', 'success');
    }
    
    // FIXED: Update dashboard stats after adding/updating
    updateDashboardStats();
    renderAcademicTable();
    renderDatabaseAcademicTable();
    updateAcademicYearDropdown();
    resetAcademicForm();
}

function resetAcademicForm() {
    document.getElementById('yearName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('isCurrentYear').value = '';
    document.getElementById('academicStatus').value = '';
    editingAcademicId = null;
    
    // Reset previous value storage
    previousIsCurrentYearValue = '';
    previousAcademicStatusValue = '';
    document.getElementById('isCurrentYear').setAttribute('data-previous-value', '');
    document.getElementById('academicStatus').setAttribute('data-previous-value', '');
}

function cancelAcademicForm() {
    resetAcademicForm();
    document.getElementById('academicFormTitle').textContent = 'Add New Academic Year';
    document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Save Academic Year';
}

function renderAcademicTable() {
    const tbody = document.getElementById('academicTableBody');
    tbody.innerHTML = '';
    
    academicYears.forEach(year => {
        const statusClass = year.status === 'Active' ? 'status-active' : 
                           year.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year.id}</td>
            <td>${year.name}</td>
            <td>${formatDateForDisplay(year.start_date)}</td>
            <td>${formatDateForDisplay(year.end_date)}</td>
            <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
            <td><span class="${statusClass}">${year.status}</span></td>
            <td>${formatDateForDisplay(year.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-academic" data-id="${year.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-academic" data-id="${year.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.edit-academic').forEach(btn => {
        btn.addEventListener('click', function() {
            const yearId = this.getAttribute('data-id');
            const year = academicYears.find(y => y.id === yearId);
            if (year) showEditAcademicForm(year);
        });
    });
    
    document.querySelectorAll('.delete-academic').forEach(btn => {
        btn.addEventListener('click', function() {
            const yearId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this academic year?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteAcademicYear(yearId);
                }
            });
        });
    });
}

function deleteAcademicYear(id) {
    const index = academicYears.findIndex(year => year.id === id);
    if (index !== -1) {
        // Check if this year is used in any classes
        const usedInClasses = classes.some(cls => cls.academic_year === id);
        if (usedInClasses) {
            showToast('Error', 'Cannot delete academic year that is used in classes', 'error');
            return;
        }
        
        academicYears.splice(index, 1);
        // FIXED: Update dashboard stats after deletion
        updateDashboardStats();
        renderAcademicTable();
        renderDatabaseAcademicTable();
        updateAcademicYearDropdown();
        showToast('Success', 'Academic year deleted successfully', 'success');
    }
}

function filterAcademicYears() {
    const searchTerm = document.getElementById('searchAcademic').value.toLowerCase();
    const filtered = academicYears.filter(year => 
        year.name.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('academicTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(year => {
        const statusClass = year.status === 'Active' ? 'status-active' : 
                           year.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year.id}</td>
            <td>${year.name}</td>
            <td>${formatDateForDisplay(year.start_date)}</td>
            <td>${formatDateForDisplay(year.end_date)}</td>
            <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
            <td><span class="${statusClass}">${year.status}</span></td>
            <td>${formatDateForDisplay(year.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-academic" data-id="${year.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-academic" data-id="${year.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.edit-academic').forEach(btn => {
        btn.addEventListener('click', function() {
            const yearId = this.getAttribute('data-id');
            const year = academicYears.find(y => y.id === yearId);
            if (year) showEditAcademicForm(year);
        });
    });
    
    document.querySelectorAll('.delete-academic').forEach(btn => {
        btn.addEventListener('click', function() {
            const yearId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this academic year?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteAcademicYear(yearId);
                }
            });
        });
    });
}

function clearAcademicSearch() {
    document.getElementById('searchAcademic').value = '';
    renderAcademicTable();
}

// Program Functions - UPDATED: ID format changed to PID001, PID002, etc.
function showAddProgrammeForm() {
    document.getElementById('programmeFormTitle').textContent = 'Add New Program';
    document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
    editingProgrammeId = null;
    resetProgrammeForm();
    
    // Reset previous value storage for programme status
    previousProgrammeStatusValue = '';
    document.getElementById('programmeStatus').setAttribute('data-previous-value', '');
}

function showEditProgrammeForm(programme) {
    document.getElementById('programmeFormTitle').textContent = 'Edit Program';
    document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Update Program';
    editingProgrammeId = programme.id;
    
    document.getElementById('programmeName').value = programme.name;
    document.getElementById('programmeCode').value = programme.code;
    document.getElementById('programmeDuration').value = programme.duration;
    document.getElementById('programmeDescription').value = programme.description;
    document.getElementById('programmeStatus').value = programme.status;
    
    // Store previous value for validation
    previousProgrammeStatusValue = programme.status || '';
    document.getElementById('programmeStatus').setAttribute('data-previous-value', previousProgrammeStatusValue);
}

// Validate programme status change
function validateProgrammeStatus(programmeId, newStatus) {
    if (newStatus === 'Completed' || newStatus === 'Inactive') {
        if (!areAllClassesCompletedForProgram(programmeId)) {
            showCustomAlert(
                `Cannot mark program as "${newStatus}". All related classes must be Completed first.`,
                'Validation Error',
                'error'
            );
            return false;
        }
    }
    
    return true;
}

function saveProgramme() {
    const name = document.getElementById('programmeName').value.trim();
    const code = document.getElementById('programmeCode').value.trim();
    const duration = document.getElementById('programmeDuration').value;
    const description = document.getElementById('programmeDescription').value.trim();
    const status = document.getElementById('programmeStatus').value;
    
    // Validation
    if (!name || !code || !duration || !status) {
        showToast('Validation Error', 'Program name, code, duration and status are required', 'error');
        return;
    }
    
    // Get original program if editing
    let originalProgramme = null;
    if (editingProgrammeId) {
        originalProgramme = programmes.find(prog => prog.id === editingProgrammeId);
        
        // Check if status change is valid
        if (originalProgramme && originalProgramme.status !== status) {
            if (!validateProgrammeStatus(editingProgrammeId, status)) {
                return; // Validation failed
            }
        }
    } else {
        // For new programs, check if Inactive or Completed status is valid
        if (status === 'Inactive' || status === 'Completed') {
            // Check if there are any classes in ANY program that are not completed
            const hasIncompleteClasses = classes.some(cls => cls.status !== 'Completed');
            if (hasIncompleteClasses) {
                showCustomAlert(
                    `Cannot set status to "${status}" because there are classes in the system that are not completed. All related classes in Class Master must have Status "Completed".`,
                    'Validation Error',
                    'error'
                );
                return;
            }
        }
    }
    
    const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
    
    if (editingProgrammeId) {
        // Update existing program
        const index = programmes.findIndex(prog => prog.id === editingProgrammeId);
        if (index !== -1) {
            programmes[index] = {
                ...programmes[index],
                name,
                code,
                duration: parseInt(duration),
                description,
                status,
                updated_at: today
            };
            showToast('Success', 'Program updated successfully', 'success');
        }
    } else {
        // Check for duplicate program name and generate unique ID
        let programId;
        const existingProgramId = getProgramIdByName(name);
        
        if (existingProgramId) {
            // Duplicate program name found - generate new unique ID
            programId = generateUniqueProgramId(name);
            showToast('Info', `Duplicate program name detected. New Program ID generated: ${programId}`, 'info');
        } else {
            // Normal ID generation
            programId = `PID${String(programmes.length + 1).padStart(3, '0')}`;
        }
        
        // Add new program
        const newProgramme = {
            id: programId,
            name,
            code,
            duration: parseInt(duration),
            description,
            status,
            created_at: today,
            updated_at: today
        };
        programmes.push(newProgramme);
        showToast('Success', 'Program added successfully', 'success');
    }
    
    // FIXED: Update dashboard stats after adding/updating
    updateDashboardStats();
    renderProgrammeTable();
    renderDatabaseProgrammeTable();
    // Update programme dropdown in class master
    updateProgrammeDropdown();
    resetProgrammeForm();
}

function resetProgrammeForm() {
    document.getElementById('programmeName').value = '';
    document.getElementById('programmeCode').value = '';
    document.getElementById('programmeDuration').value = '3';
    document.getElementById('programmeDescription').value = '';
    document.getElementById('programmeStatus').value = '';
    editingProgrammeId = null;
    
    // Reset previous value storage
    previousProgrammeStatusValue = '';
    document.getElementById('programmeStatus').setAttribute('data-previous-value', '');
}

function cancelProgrammeForm() {
    resetProgrammeForm();
    document.getElementById('programmeFormTitle').textContent = 'Add New Program';
    document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
}

function renderProgrammeTable() {
    const tbody = document.getElementById('programmeTableBody');
    tbody.innerHTML = '';
    
    programmes.forEach(programme => {
        const statusClass = programme.status === 'Active' ? 'status-active' : 
                          programme.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${programme.id}</td>
            <td>${programme.code}</td>
            <td>${programme.name}</td>
            <td>${programme.duration}</td>
            <td>${programme.description}</td>
            <td><span class="${statusClass}">${programme.status}</span></td>
            <td>${formatDateForDisplay(programme.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-programme" data-id="${programme.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-programme" data-id="${programme.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.edit-programme').forEach(btn => {
        btn.addEventListener('click', function() {
            const programmeId = this.getAttribute('data-id');
            const programme = programmes.find(prog => prog.id === programmeId);
            if (programme) showEditProgrammeForm(programme);
        });
    });
    
    document.querySelectorAll('.delete-programme').forEach(btn => {
        btn.addEventListener('click', function() {
            const programmeId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this program?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteProgramme(programmeId);
                }
            });
        });
    });
}

function deleteProgramme(id) {
    const index = programmes.findIndex(programme => programme.id === id);
    if (index !== -1) {
        // Check if this program is used in any classes
        const usedInClasses = classes.some(cls => cls.programme_id === id);
        if (usedInClasses) {
            showToast('Error', 'Cannot delete program that is used in classes', 'error');
            return;
        }
        
        programmes.splice(index, 1);
        // FIXED: Update dashboard stats after deletion
        updateDashboardStats();
        renderProgrammeTable();
        renderDatabaseProgrammeTable();
        // Update programme dropdown in class master
        updateProgrammeDropdown();
        showToast('Success', 'Program deleted successfully', 'success');
    }
}

function filterProgrammes() {
    const searchTerm = document.getElementById('searchProgramme').value.toLowerCase();
    const filtered = programmes.filter(programme => 
        programme.name.toLowerCase().includes(searchTerm) ||
        programme.code.toLowerCase().includes(searchTerm) ||
        programme.description.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('programmeTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(programme => {
        const statusClass = programme.status === 'Active' ? 'status-active' : 
                          programme.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${programme.id}</td>
            <td>${programme.code}</td>
            <td>${programme.name}</td>
            <td>${programme.duration}</td>
            <td>${programme.description}</td>
            <td><span class="${statusClass}">${programme.status}</span></td>
            <td>${formatDateForDisplay(programme.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-programme" data-id="${programme.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-programme" data-id="${programme.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.edit-programme').forEach(btn => {
        btn.addEventListener('click', function() {
            const programmeId = this.getAttribute('data-id');
            const programme = programmes.find(prog => prog.id === programmeId);
            if (programme) showEditProgrammeForm(programme);
        });
    });
    
    document.querySelectorAll('.delete-programme').forEach(btn => {
        btn.addEventListener('click', function() {
            const programmeId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this program?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteProgramme(programmeId);
                }
            });
        });
    });
}

function clearProgrammeSearch() {
    document.getElementById('searchProgramme').value = '';
    renderProgrammeTable();
}

// Class Functions - UPDATED: ID format changed to CID001, CID002, etc.
function showAddClassForm() {
    document.getElementById('classFormTitle').textContent = 'Add New Class';
    document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
    editingClassId = null;
    resetClassForm();
}

function showEditClassForm(cls) {
    document.getElementById('classFormTitle').textContent = 'Edit Class';
    document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Update Class';
    editingClassId = cls.id;
    
    // Find the program for this class
    const programme = programmes.find(prog => prog.id === cls.programme_id);
    if (programme) {
        document.getElementById('classProgramme').value = programme.id;
        // Trigger update of class code dropdown
        const programmeEvent = new Event('change');
        document.getElementById('classProgramme').dispatchEvent(programmeEvent);
        
        // Set class code after a short delay to ensure dropdown is populated
        setTimeout(() => {
            document.getElementById('classCode').value = cls.class_code;
            // Trigger change event for class code
            const classCodeEvent = new Event('change');
            document.getElementById('classCode').dispatchEvent(classCodeEvent);
            
            // Set academic year
            document.getElementById('classAcademicYear').value = cls.academic_year;
            
            // Set term
            setTimeout(() => {
                document.getElementById('classTerm').value = cls.term;
            }, 100);
        }, 200);
    }
    
    document.getElementById('classStatus').value = cls.status;
}

function saveClass() {
    const programmeId = document.getElementById('classProgramme').value;
    const classCode = document.getElementById('classCode').value;
    const academicYear = document.getElementById('classAcademicYear').value;
    const term = document.getElementById('classTerm').value;
    const status = document.getElementById('classStatus').value;
    
    // Validation
    if (!programmeId || !classCode || !academicYear || !term || !status) {
        showToast('Validation Error', 'Please fill in all required fields', 'error');
        return;
    }
    
    const programme = programmes.find(prog => prog.id === programmeId);
    const academicYearObj = academicYears.find(year => year.id === academicYear);
    
    const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
    
    if (editingClassId) {
        // Update existing class
        const index = classes.findIndex(cls => cls.id === editingClassId);
        if (index !== -1) {
            classes[index] = {
                ...classes[index],
                class_code: classCode,
                programme_id: programmeId,
                programme_name: programme ? programme.name : classes[index].programme_name,
                academic_year: academicYear,
                term: term,
                status,
                updated_at: today
            };
            showToast('Success', 'Class updated successfully', 'success');
        }
    } else {
        // Add new class - UPDATED: ID format changed to CID001, CID002, etc.
        const newClass = {
            id: `CID${String(classes.length + 1).padStart(3, '0')}`,
            class_code: classCode,
            programme_id: programmeId,
            programme_name: programme ? programme.name : '',
            academic_year: academicYear,
            term: term,
            status,
            created_at: today,
            updated_at: today
        };
        classes.push(newClass);
        showToast('Success', 'Class added successfully', 'success');
    }
    
    // FIXED: Update dashboard stats after adding/updating
    updateDashboardStats();
    renderClassTable();
    renderDatabaseClassTable();
    resetClassForm();
}

function resetClassForm() {
    document.getElementById('classProgramme').value = '';
    document.getElementById('classCode').innerHTML = '<option value="">Select Program first</option>';
    document.getElementById('classCode').disabled = true;
    document.getElementById('classAcademicYear').value = '';
    document.getElementById('classAcademicYear').disabled = true;
    document.getElementById('classTerm').value = '';
    document.getElementById('classTerm').disabled = true;
    document.getElementById('classStatus').value = '';
    editingClassId = null;
    
    // UPDATED: Reset opacity for visual indication
    document.getElementById('classCode').style.opacity = '0.5';
    document.getElementById('classAcademicYear').style.opacity = '0.5';
    document.getElementById('classTerm').style.opacity = '0.5';
}

function cancelClassForm() {
    resetClassForm();
    document.getElementById('classFormTitle').textContent = 'Add New Class';
    document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
}

// UPDATED: Render Class Table to show Academic Year Name instead of ID
function renderClassTable() {
    const tbody = document.getElementById('classTableBody');
    tbody.innerHTML = '';
    
    classes.forEach(cls => {
        const statusClass = cls.status === 'Active' ? 'status-active' : 
                          cls.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cls.id}</td>
            <td>${cls.programme_id}</td>
            <td>${cls.programme_name}</td>
            <td>${cls.class_code}</td>
            <!-- UPDATED: Show Academic Year Name instead of ID -->
            <td>${getAcademicYearNameById(cls.academic_year)}</td>
            <td>${cls.term}</td>
            <td><span class="${statusClass}">${cls.status}</span></td>
            <td>${formatDateForDisplay(cls.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-class" data-id="${cls.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-class" data-id="${cls.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.edit-class').forEach(btn => {
        btn.addEventListener('click', function() {
            const classId = this.getAttribute('data-id');
            const cls = classes.find(c => c.id === classId);
            if (cls) showEditClassForm(cls);
        });
    });
    
    document.querySelectorAll('.delete-class').forEach(btn => {
        btn.addEventListener('click', function() {
            const classId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this class?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteClass(classId);
                }
            });
        });
    });
}

function deleteClass(id) {
    const index = classes.findIndex(cls => cls.id === id);
    if (index !== -1) {
        classes.splice(index, 1);
        // FIXED: Update dashboard stats after deletion
        updateDashboardStats();
        renderClassTable();
        renderDatabaseClassTable();
        showToast('Success', 'Class deleted successfully', 'success');
    }
}

// UPDATED: Filter Classes to show Academic Year Name instead of ID
function filterClasses() {
    const searchTerm = document.getElementById('searchClass').value.toLowerCase();
    const filtered = classes.filter(cls => 
        cls.class_code.toLowerCase().includes(searchTerm) ||
        cls.programme_name.toLowerCase().includes(searchTerm) ||
        cls.term.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('classTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(cls => {
        const statusClass = cls.status === 'Active' ? 'status-active' : 
                          cls.status === 'Completed' ? 'status-completed' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cls.id}</td>
            <td>${cls.programme_id}</td>
            <td>${cls.programme_name}</td>
            <td>${cls.class_code}</td>
            <!-- UPDATED: Show Academic Year Name instead of ID -->
            <td>${getAcademicYearNameById(cls.academic_year)}</td>
            <td>${cls.term}</td>
            <td><span class="${statusClass}">${cls.status}</span></td>
            <td>${formatDateForDisplay(cls.created_at)}</td>
            <td class="actions">
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-primary btn-sm edit-class" data-id="${cls.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-class" data-id="${cls.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.edit-class').forEach(btn => {
        btn.addEventListener('click', function() {
            const classId = this.getAttribute('data-id');
            const cls = classes.find(c => c.id === classId);
            if (cls) showEditClassForm(cls);
        });
    });
    
    document.querySelectorAll('.delete-class').forEach(btn => {
        btn.addEventListener('click', function() {
            const classId = this.getAttribute('data-id');
            showCustomConfirm('Are you sure you want to delete this class?', 'Confirm Delete', 'warning').then(confirmed => {
                if (confirmed) {
                    deleteClass(classId);
                }
            });
        });
    });
}

function clearClassSearch() {
    document.getElementById('searchClass').value = '';
    renderClassTable();
}

function resetAllForms() {
    resetInstituteForm();
    resetAcademicForm();
    resetProgrammeForm();
    resetClassForm();
}

function resetUIToDefaultState() {
    console.log('Resetting UI to default state');
    
    // Reset all module displays
    document.querySelectorAll('.module-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show main dashboard
    mainDashboard.style.display = 'block';
    
    // Reset all form cards to visible
    const formCards = document.querySelectorAll('.form-card');
    formCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Reset all action columns to visible
    const actionHeaders = document.querySelectorAll('.actions-header');
    const actionCells = document.querySelectorAll('.data-table .actions');
    
    actionHeaders.forEach(header => header.style.display = 'table-cell');
    actionCells.forEach(cell => cell.style.display = 'flex');
    
    // Reset quick action buttons
    const addButtons = document.querySelectorAll('.quick-action-btn');
    addButtons.forEach(btn => {
        btn.style.display = 'flex';
    });
    
    // Reset settings button
    settingsBtn.style.display = 'flex';
    
    // Reset settings tabs to default (profile tab active)
    switchSettingsTab('adminProfile');
    switchPrincipalSettingsTab('principalProfile');
    
    // Reset table tabs to default (institute tab active)
    switchTableTab('institute');
    
    // Reset all forms
    resetAllForms();
    
    // Reset scroll position
    dashboardScrollPosition = 0;
}

async function handleLogout() {
    console.log('Handling logout...');
    
    const confirmed = await showCustomConfirm('Are you sure you want to logout?', 'Confirm Logout', 'warning');
    
    if (confirmed) {
        showToast('Logged Out', 'You have been successfully logged out', 'success');
        
        // Hide success banner if shown
        successBanner.style.display = 'none';
        welcomeBanner.style.display = 'block';
        
        // Clear any timeout
        if (successBannerTimeout) {
            clearTimeout(successBannerTimeout);
            successBannerTimeout = null;
        }
        
        // Reset form submission state
        hasSubmitted = false;
        
        // Reset UI elements to default state
        resetUIToDefaultState();
        
        // Fade out dashboard
        dashboard.style.opacity = '0';
        dashboard.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            dashboard.style.display = 'none';
            loginPage.style.display = 'flex';
            
            // Reset form
            loginForm.reset();
            clearErrors();
            usernameInput.classList.remove('success', 'error');
            passwordInput.classList.remove('success', 'error');
            
            // Reset to admin role by default
            roleButtons.forEach((btn, index) => {
                btn.classList.remove('active');
                if (index === 0) {
                    btn.classList.add('active');
                    currentRole = 'admin';
                }
            });
            
            // Reset password visibility
            passwordInput.setAttribute('type', 'password');
            togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            
            // Show main dashboard
            showMainDashboard();
            
            // Reset login animation for next login
            loginAnimationPlayed = false;
            loginPage.style.opacity = '0';
            const loginWrapper = document.querySelector('.login-wrapper');
            loginWrapper.style.opacity = '0';
            loginWrapper.style.transform = 'translateY(20px) scale(0.98)';
            loginWrapper.style.animation = 'none';
            
            // Fade in login page with animation
            setTimeout(() => {
                loginPage.style.opacity = '1';
                if (!loginAnimationPlayed) {
                    loginAnimationPlayed = true;
                    loginWrapper.style.animation = 'cardAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                    loginWrapper.style.animationDelay = '0.3s';
                }
                usernameInput.focus();
            }, 50);
            
            // Clear current user
            currentUser = null;
        }, 300);
    }
}

function validateUsername() {
    const username = usernameInput.value.trim();
    if (!username) {
        showError('username', 'Username is required');
        return false;
    }
    clearError('username');
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    if (!password) {
        showError('password', 'Password is required');
        return false;
    }
    clearError('password');
    return true;
}

function showError(field, message) {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(`${field}Error`);
    
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorElement.classList.add('show');
    }
}

function clearError(field) {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(`${field}Error`);
    
    if (input && errorElement) {
        input.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.innerHTML = '';
    }
}

function clearErrors() {
    clearError('username');
    clearError('password');
    if (usernameInput) usernameInput.classList.remove('error', 'success');
    if (passwordInput) passwordInput.classList.remove('error', 'success');
}

function resetLoginButton() {
    loginButton.disabled = false;
    loadingSpinner.style.display = 'none';
    loginButton.querySelector('span').textContent = 'LOGIN TO DASHBOARD';
}

function resetLoginForm() {
    loginForm.reset();
    clearErrors();
    resetLoginButton();
    
    // Reset form submission state
    hasSubmitted = false;
    
    // Reset role to admin
    roleButtons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === 0) {
            btn.classList.add('active');
            currentRole = 'admin';
        }
    });
    
    // Reset password visibility
    passwordInput.setAttribute('type', 'password');
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
}

function showToast(title, message, type = 'success') {
    console.log('Showing toast:', title, message);
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.className = 'toast';
    toast.classList.add(`toast-${type}`);
    
    if (type === 'success') {
        toast.querySelector('.toast-icon').innerHTML = '<i class="fas fa-check"></i>';
    } else {
        toast.querySelector('.toast-icon').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    }
    
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 3000);
}
    
function hideToast() {
    toast.classList.remove('show');
    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
    }
}
