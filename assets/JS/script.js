  // Valid credentials for both Admin and Principal
        const validCredentials = {
            admin: {
                username: 'admin',
                password: 'admin123',
                name: 'System Administrator',
                email: 'admin@edumaster.edu',
                role: 'admin',
                avatar: 'A',
                accessLevel: 'full',
                roleName: 'System Administrator'
            },
            principal: {
                username: 'principal',
                password: 'principal123',
                name: 'Dr. Ranjit Deshmukh',
                email: 'principal@edumaster.edu',
                role: 'principal',
                avatar: 'P',
                accessLevel: 'view-only',
                roleName: 'Principal'
            }
        };

        // Data storage arrays - Initialize with data from the uploaded structure
        let institutes = [
            {
                id: 'NIST001',
                name: 'Main Campus',
                code: 'MCD01',
                address: 'U25 Education St',
                status: 'Active',
                created_at: '2023-01-18',
                updated_at: '2023-12-01'
            },
            {
                id: 'NIST002',
                name: 'West Campus',
                code: 'WCD02',
                address: '406 Learning Ave',
                status: 'Active',
                created_at: '2023-02-20',
                updated_at: '2023-11-13'
            }
        ];

        let academicYears = [
            {
                id: 'YE2024',
                name: '2024-2023',
                is_current: 'Yes',
                status: 'Active',
                created_at: '2024-01-01',
                startDate: '2024-01-01',
                endDate: '2025-01-01'
            },
            {
                id: 'YE2023',
                name: '2023-2024',
                is_current: 'No',
                status: 'Completed',
                created_at: '2023-01-01',
                startDate: '2023-01-01',
                endDate: '2024-01-01'
            }
        ];

        let programmes = [
            {
                id: 'P8001',
                name: 'Computer Science',
                code: 'CS101',
                duration: 4,
                description: 'Bachelor of Computer Science',
                status: 'Active',
                created_at: '2023-03-10'
            },
            {
                id: 'P8002',
                name: 'Business Administration',
                code: 'BA202',
                duration: 3,
                description: 'Bachelor of Business Administration',
                status: 'Active',
                created_at: '2023-03-15'
            }
        ];

        let classes = [
            {
                id: 'CL3001',
                programme_id: 'P8001',
                programme_name: 'Computer Science',
                name: 'Computer Science Year 1',
                code: 'CSY1',
                semester_name: 'Semester 1',
                academicYearId: 'YE2024',
                academicYearName: '2024-2023',
                maxStudents: 60,
                status: 'Active',
                created_at: '2023-06-01'
            },
            {
                id: 'CL3002',
                programme_id: 'P8001',
                programme_name: 'Computer Science',
                name: 'Computer Science Year 2',
                code: 'CSY2',
                semester_name: 'Semester 2',
                academicYearId: 'YE2024',
                academicYearName: '2024-2023',
                maxStudents: 60,
                status: 'Active',
                created_at: '2023-06-01'
            }
        ];
        
        // User profile photos storage
        let userProfilePhotos = {
            admin: null,
            principal: null
        };
        
        // Principal credentials management
        let principalCredentials = {
            username: 'principal',
            password: 'principal123',
            displayName: 'Dr. Ranjit Deshmukh',
            email: 'principal@edumaster.edu',
            lastChanged: new Date().toISOString().split('T')[0]
        };

        // Principal settings storage
        let principalSettings = {
            displayName: 'Dr. Ranjit Deshmukh',
            username: 'principal',
            email: 'principal@edumaster.edu',
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
        const profilePhoto = document.getElementById('profilePhoto');
        const profilePhotoInput = document.getElementById('profilePhotoInput');
        const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
        const profileName = document.getElementById('profileName');
        const profileUsername = document.getElementById('profileUsername');
        const profileEmail = document.getElementById('profileEmail');
        const profileRole = document.getElementById('profileRole');
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
        const principalManagementTab = document.getElementById('principalManagementTab');
        const principalPanel = document.getElementById('principalPanel');
        const principalDisplayName = document.getElementById('principalDisplayName');
        const principalUsername = document.getElementById('principalUsername');
        const principalPassword = document.getElementById('principalPassword');
        const principalConfirmPassword = document.getElementById('principalConfirmPassword');
        const savePrincipalBtn = document.getElementById('savePrincipalBtn');
        const resetPrincipalBtn = document.getElementById('resetPrincipalBtn');
        const currentPrincipalName = document.getElementById('currentPrincipalName');
        const currentPrincipalUsername = document.getElementById('currentPrincipalUsername');
        const passwordLastChanged = document.getElementById('passwordLastChanged');

        // Principal Settings elements
        const principalSettingsTabs = document.querySelectorAll('.principal-settings-tab');
        const principalSettingsPanels = document.querySelectorAll('.principal-settings-panel');
        const principalProfilePhoto = document.getElementById('principalProfilePhoto');
        const principalProfilePhotoInput = document.getElementById('principalProfilePhotoInput');
        const principalUploadPhotoBtn = document.getElementById('principalUploadPhotoBtn');
        const principalSettingsName = document.getElementById('principalSettingsName');
        const principalSettingsUsername = document.getElementById('principalSettingsUsername');
        const principalSettingsEmail = document.getElementById('principalSettingsEmail');
        const principalSettingsRole = document.getElementById('principalSettingsRole');
        const savePrincipalSettingsBtn = document.getElementById('savePrincipalSettingsBtn');
        const principalCurrentUsername = document.getElementById('principalCurrentUsername');
        const principalNewUsername = document.getElementById('principalNewUsername');
        const principalConfirmUsername = document.getElementById('principalConfirmUsername');
        const changePrincipalUsernameBtn = document.getElementById('changePrincipalUsernameBtn');
        const principalCurrentPassword = document.getElementById('principalCurrentPassword');
        const principalNewPassword = document.getElementById('principalNewPassword');
        const principalConfirmPasswordInput = document.getElementById('principalConfirmPassword');
        const changePrincipalPasswordBtn = document.getElementById('changePrincipalPasswordBtn');

        // Application state
        let currentUser = null;
        let toastTimeout = null;
        let currentRole = 'admin';
        let successBannerTimeout = null;
        let hasSubmitted = false;
        let charts = {};
        let profilePhotoUrl = null;
        let loginAnimationPlayed = false;

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
            
            // Focus on username field
            setTimeout(() => {
                usernameInput.focus();
            }, 300);
            
            // Initialize Principal Settings
            initializePrincipalSettings();
            
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
                    if (parsed.username) {
                        principalSettingsUsername.value = parsed.username;
                        principalCurrentUsername.value = parsed.username;
                    }
                    if (parsed.email) principalSettingsEmail.value = parsed.email;
                    if (parsed.profilePhoto) {
                        principalProfilePhoto.innerHTML = `<img src="${parsed.profilePhoto}" alt="Profile Photo">`;
                    }
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
                    }
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
            });
            
            backFromAcademic.addEventListener('click', function() {
                showMainDashboard();
            });
            
            backFromProgramme.addEventListener('click', function() {
                showMainDashboard();
            });
            
            backFromClass.addEventListener('click', function() {
                showMainDashboard();
            });
            
            backFromReports.addEventListener('click', function() {
                showMainDashboard();
            });
            
            backFromSettings.addEventListener('click', function() {
                showMainDashboard();
            });
            
            backFromPrincipalSettings.addEventListener('click', function() {
                showMainDashboard();
            });
            
            // Quick action buttons
            addInstituteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showInstituteModule();
                showAddInstituteForm();
            });
            
            addAcademicYearBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showAcademicModule();
                showAddAcademicForm();
            });
            
            addProgrammeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showProgrammeModule();
                showAddProgrammeForm();
            });
            
            addClassBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showClassModule();
                showAddClassForm();
            });
            
            viewReportsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showReportsModule();
            });
            
            settingsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (currentUser && currentUser.role === 'principal') {
                    showPrincipalSettingsModule();
                } else {
                    showSettingsModule();
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
            
            // Profile photo upload
            uploadPhotoBtn.addEventListener('click', function() {
                profilePhotoInput.click();
            });
            
            profilePhotoInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const photoUrl = event.target.result;
                        userProfilePhotos[currentUser.role] = photoUrl;
                        saveProfilePhotos();
                        
                        // Update profile photo
                        profilePhoto.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
                        
                        // Update avatar in navbar
                        userAvatar.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
                        
                        showToast('Success', 'Profile photo updated successfully', 'success');
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            // Principal profile photo upload
            principalUploadPhotoBtn.addEventListener('click', function() {
                principalProfilePhotoInput.click();
            });
            
            principalProfilePhotoInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const photoUrl = event.target.result;
                        principalSettings.profilePhoto = photoUrl;
                        savePrincipalSettingsToStorage();
                        
                        // Update profile photo
                        principalProfilePhoto.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
                        
                        // Update avatar in navbar if principal is logged in
                        if (currentUser && currentUser.role === 'principal') {
                            userAvatar.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
                        }
                        
                        showToast('Success', 'Profile photo updated successfully', 'success');
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            // Save profile
            saveProfileBtn.addEventListener('click', saveProfile);
            
            // Change password
            changePasswordBtn.addEventListener('click', changePassword);
            
            // Change username
            changeUsernameBtn.addEventListener('click', changeUsername);
            
            // Principal management buttons
            savePrincipalBtn.addEventListener('click', savePrincipalCredentials);
            resetPrincipalBtn.addEventListener('click', resetPrincipalCredentials);
            
            // Principal settings buttons
            savePrincipalSettingsBtn.addEventListener('click', savePrincipalSettings);
            changePrincipalUsernameBtn.addEventListener('click', changePrincipalUsername);
            changePrincipalPasswordBtn.addEventListener('click', changePrincipalPassword);
            
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
                // Check credentials
                let authenticated = false;
                let userData = null;
                
                if (currentRole === 'admin' && username === 'admin' && password === 'admin123') {
                    authenticated = true;
                    userData = validCredentials.admin;
                } else if (currentRole === 'principal' && username === principalCredentials.username && password === principalCredentials.password) {
                    authenticated = true;
                    userData = {
                        ...validCredentials.principal,
                        name: principalCredentials.displayName,
                        username: principalCredentials.username,
                        password: principalCredentials.password,
                        email: principalCredentials.email
                    };
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
                welcomeSubtitle.textContent = 'You have full access to manage institutes, programmes, classes, and academic years.';
            } else {
                welcomeTitle.textContent = `Welcome, ${currentUser.name}!`;
                welcomeSubtitle.textContent = 'You have view-only access to institutes, programmes, classes, and academic years.';
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
            
            // Pre-fill current username in security panel
            if (currentUsername) {
                currentUsername.value = currentUser.username;
            }
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
            // Update counters
            statInstitutes.textContent = institutes.length;
            statYears.textContent = academicYears.length;
            statProgrammes.textContent = programmes.length;
            statClasses.textContent = classes.length;
            
            // Update change indicators
            instituteChange.textContent = institutes.length > 2 ? institutes.length - 2 : 0;
            programmeChange.textContent = programmes.length > 2 ? programmes.length - 2 : 0;
            classChange.textContent = classes.length > 2 ? classes.length - 2 : 0;
            
            // Count active academic years
            const activeYears = academicYears.filter(year => year.is_current === 'Yes').length;
            activeYearCount.textContent = activeYears;
            
            // Render tables
            renderInstituteTable();
            renderAcademicTable();
            renderProgrammeTable();
            renderClassTable();
            
            // Update dropdowns
            updateProgrammeDropdown();
            updateAcademicYearDropdown();
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
            
            // Reset principal management tab
            if (currentUser && currentUser.role === 'admin') {
                principalManagementTab.style.display = 'block';
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
            
            // Settings button should always be visible for both roles
            settingsBtn.style.display = 'flex';
            
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
            
            // Show/hide Principal Management tab for Admin
            if (currentUser.role === 'admin') {
                principalManagementTab.style.display = 'block';
            } else {
                principalManagementTab.style.display = 'none';
                // Ensure we're not on principal panel if principal logs in
                if (document.querySelector('.settings-tab[data-panel="principal"]').classList.contains('active')) {
                    switchSettingsTab('profile');
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
                    break;
            }
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
                    <td>${institute.created_at}</td>
                    <td>${institute.updated_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
            document.querySelectorAll('.edit-institute-db').forEach(btn => {
                btn.addEventListener('click', function() {
                    const instituteId = this.getAttribute('data-id');
                    const institute = institutes.find(inst => inst.id === instituteId);
                    if (institute) {
                        showModule('institute');
                        showEditInstituteForm(institute);
                    }
                });
            });
            
            document.querySelectorAll('.delete-institute-db').forEach(btn => {
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
        
        function renderDatabaseAcademicTable() {
            const tbody = document.getElementById('databaseAcademicTableBody');
            tbody.innerHTML = '';
            
            academicYears.forEach(year => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${year.id}</td>
                    <td>${year.name}</td>
                    <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
                    <td><span class="${year.status === 'Active' ? 'status-active' : 'status-inactive'}">${year.status}</span></td>
                    <td>${year.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
            document.querySelectorAll('.edit-academic-db').forEach(btn => {
                btn.addEventListener('click', function() {
                    const yearId = this.getAttribute('data-id');
                    const year = academicYears.find(y => y.id === yearId);
                    if (year) {
                        showModule('academic');
                        showEditAcademicForm(year);
                    }
                });
            });
            
            document.querySelectorAll('.delete-academic-db').forEach(btn => {
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
        
        function renderDatabaseProgrammeTable() {
            const tbody = document.getElementById('databaseProgrammeTableBody');
            tbody.innerHTML = '';
            
            programmes.forEach(programme => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${programme.id}</td>
                    <td>${programme.name}</td>
                    <td><span class="${programme.status === 'Active' ? 'status-active' : 'status-inactive'}">${programme.status}</span></td>
                    <td>${programme.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
            document.querySelectorAll('.edit-programme-db').forEach(btn => {
                btn.addEventListener('click', function() {
                    const programmeId = this.getAttribute('data-id');
                    const programme = programmes.find(prog => prog.id === programmeId);
                    if (programme) {
                        showModule('programme');
                        showEditProgrammeForm(programme);
                    }
                });
            });
            
            document.querySelectorAll('.delete-programme-db').forEach(btn => {
                btn.addEventListener('click', function() {
                    const programmeId = this.getAttribute('data-id');
                    showCustomConfirm('Are you sure you want to delete this programme?', 'Confirm Delete', 'warning').then(confirmed => {
                        if (confirmed) {
                            deleteProgramme(programmeId);
                        }
                    });
                });
            });
        }
        
        function renderDatabaseClassTable() {
            const tbody = document.getElementById('databaseClassTableBody');
            tbody.innerHTML = '';
            
            classes.forEach(cls => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cls.id}</td>
                    <td>${cls.programme_id}</td>
                    <td>${cls.programme_name}</td>
                    <td>${cls.semester_name}</td>
                    <td><span class="${cls.status === 'Active' ? 'status-active' : 'status-inactive'}">${cls.status}</span></td>
                    <td>${cls.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
            document.querySelectorAll('.edit-class-db').forEach(btn => {
                btn.addEventListener('click', function() {
                    const classId = this.getAttribute('data-id');
                    const cls = classes.find(c => c.id === classId);
                    if (cls) {
                        showModule('class');
                        showEditClassForm(cls);
                    }
                });
            });
            
            document.querySelectorAll('.delete-class-db').forEach(btn => {
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
            
            // Programme Statistics Chart (Bar Chart)
            const programmeCtx = document.getElementById('programmeChart').getContext('2d');
            const programmeNames = programmes.map(p => p.name);
            const programmeStatusCounts = programmes.map(p => p.status === 'Active' ? 1 : 0);
            
            charts.programmeChart = new Chart(programmeCtx, {
                type: 'bar',
                data: {
                    labels: programmeNames,
                    datasets: [{
                        label: 'Active Status',
                        data: programmeStatusCounts,
                        backgroundColor: '#4f46e5',
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
                            text: 'Programme Active Status'
                        }
                    }
                }
            });
            
            // Academic Year Status Chart (Doughnut Chart)
            const academicYearCtx = document.getElementById('academicYearChart').getContext('2d');
            const academicYearCounts = {
                'Active': academicYears.filter(y => y.status === 'Active').length,
                'Completed': academicYears.filter(y => y.status === 'Completed').length
            };
            
            charts.academicYearChart = new Chart(academicYearCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'Completed'],
                    datasets: [{
                        data: [academicYearCounts.Active, academicYearCounts.Completed],
                        backgroundColor: ['#8b5cf6', '#f59e0b'],
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
                const count = classes.filter(c => c.programme_id === programme.id).length;
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
                            text: 'Classes per Programme'
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
            doc.text(`Total Programmes: ${programmes.length}`, 20, 55);
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
                'Created At': inst.created_at,
                'Updated At': inst.updated_at
            }));
            const instituteWs = XLSX.utils.json_to_sheet(instituteData);
            XLSX.utils.book_append_sheet(wb, instituteWs, 'Institutes');
            
            // Academic Year data
            const academicData = academicYears.map(year => ({
                'Year ID': year.id,
                'Year Name': year.name,
                'Is Current': year.is_current,
                'Status': year.status,
                'Created At': year.created_at
            }));
            const academicWs = XLSX.utils.json_to_sheet(academicData);
            XLSX.utils.book_append_sheet(wb, academicWs, 'Academic Years');
            
            // Programme data
            const programmeData = programmes.map(prog => ({
                'Programme ID': prog.id,
                'Programme Name': prog.name,
                'Status': prog.status,
                'Created At': prog.created_at
            }));
            const programmeWs = XLSX.utils.json_to_sheet(programmeData);
            XLSX.utils.book_append_sheet(wb, programmeWs, 'Programmes');
            
            // Class data
            const classData = classes.map(cls => ({
                'Class ID': cls.id,
                'Programme ID': cls.programme_id,
                'Programme Name': cls.programme_name,
                'Semester Name': cls.semester_name,
                'Status': cls.status,
                'Created At': cls.created_at
            }));
            const classWs = XLSX.utils.json_to_sheet(classData);
            XLSX.utils.book_append_sheet(wb, classWs, 'Classes');
            
            // Summary sheet
            const summaryData = [{
                'Total Institutes': institutes.length,
                'Total Programmes': programmes.length,
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
            profileUsername.value = currentUser.username;
            profileEmail.value = currentUser.email;
            profileRole.value = currentUser.roleName;
            document.getElementById('profileInitials').textContent = currentUser.avatar || currentUser.name.charAt(0).toUpperCase();
            
            // Update profile photo if exists
            const photoUrl = userProfilePhotos[currentUser.role];
            if (photoUrl) {
                profilePhoto.innerHTML = `<img src="${photoUrl}" alt="Profile Photo">`;
            } else {
                profilePhoto.innerHTML = `<span id="profileInitials">${currentUser.avatar || currentUser.name.charAt(0).toUpperCase()}</span>`;
            }
            
            // Update current username in security panel
            if (currentUsername) {
                currentUsername.value = currentUser.username;
            }
        }
        
        function updatePrincipalSettings() {
            if (!currentUser || currentUser.role !== 'principal') return;
            
            console.log('Updating principal settings UI...');
            
            // Load principal settings
            loadPrincipalSettingsFromStorage();
            
            // Update form fields - ensure they have values
            principalSettingsName.value = principalSettings.displayName || 'Dr. Ranjit Deshmukh';
            principalSettingsUsername.value = principalSettings.username || 'principal';
            principalSettingsEmail.value = principalSettings.email || 'principal@edumaster.edu';
            principalSettingsRole.value = 'Principal';
            
            // Update current username in security panel
            if (principalCurrentUsername) {
                principalCurrentUsername.value = principalSettings.username || 'principal';
            }
            
            // Update profile photo
            if (principalSettings.profilePhoto) {
                principalProfilePhoto.innerHTML = `<img src="${principalSettings.profilePhoto}" alt="Profile Photo">`;
                if (document.getElementById('principalProfileInitials')) {
                    document.getElementById('principalProfileInitials').style.display = 'none';
                }
            } else {
                const initials = principalSettings.displayName ? principalSettings.displayName.charAt(0).toUpperCase() : 'P';
                principalProfilePhoto.innerHTML = `<span id="principalProfileInitials">${initials}</span>`;
                if (document.getElementById('principalProfileInitials')) {
                    document.getElementById('principalProfileInitials').style.display = 'flex';
                }
            }
            
            // Make sure all form fields are visible
            ensurePrincipalSettingsVisibility();
        }
        
        function updatePrincipalManagementPanel() {
            if (currentUser.role === 'admin') {
                currentPrincipalName.value = principalCredentials.displayName;
                currentPrincipalUsername.value = principalCredentials.username;
                passwordLastChanged.value = principalCredentials.lastChanged;
                
                // Pre-fill form fields
                principalDisplayName.value = principalCredentials.displayName;
                principalUsername.value = principalCredentials.username;
            }
        }
        
        function saveProfile() {
            const name = profileName.value.trim();
            const username = profileUsername.value.trim();
            const email = profileEmail.value.trim();
            
            if (!name || !username || !email) {
                showToast('Error', 'Name, username, and email are required', 'error');
                return;
            }
            
            // Update current user
            currentUser.name = name;
            currentUser.username = username;
            currentUser.email = email;
            
            // Update dashboard
            dashboardUserName.textContent = name;
            avatarText.textContent = name.charAt(0).toUpperCase();
            document.getElementById('profileInitials').textContent = name.charAt(0).toUpperCase();
            
            // Update current username in security panel
            if (currentUsername) {
                currentUsername.value = username;
            }
            
            showToast('Success', 'Profile updated successfully', 'success');
        }
        
        function savePrincipalSettings() {
            const name = principalSettingsName.value.trim();
            const username = principalSettingsUsername.value.trim();
            const email = principalSettingsEmail.value.trim();
            
            if (!name || !username || !email) {
                showToast('Error', 'Name, username, and email are required', 'error');
                return;
            }
            
            // Update principal settings
            principalSettings.displayName = name;
            principalSettings.username = username;
            principalSettings.email = email;
            principalSettings.lastUpdated = new Date().toISOString();
            
            // Save to localStorage
            savePrincipalSettingsToStorage();
            
            // Update current user if principal is logged in
            if (currentUser && currentUser.role === 'principal') {
                currentUser.name = name;
                currentUser.username = username;
                currentUser.email = email;
                
                // Update dashboard
                dashboardUserName.textContent = name;
                avatarText.textContent = name.charAt(0).toUpperCase();
            }
            
            // Update current username in security panel
            if (principalCurrentUsername) {
                principalCurrentUsername.value = username;
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
            
            if (currentUserInput !== currentUser.username) {
                showToast('Error', 'Current username is incorrect', 'error');
                return;
            }
            
            // Update username
            currentUser.username = newUser;
            
            // Update profile display
            profileUsername.value = newUser;
            currentUsername.value = newUser;
            
            // Clear fields
            newUsername.value = '';
            confirmUsername.value = '';
            
            showToast('Success', 'Username changed successfully', 'success');
        }
        
        function changePrincipalUsername() {
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
            
            // Check if current username matches stored username
            const storedUsername = principalSettings.username || 'principal';
            if (currentUserInput !== storedUsername) {
                showToast('Error', 'Current username is incorrect', 'error');
                return;
            }
            
            // Update principal settings
            principalSettings.username = newUser;
            principalSettings.lastUpdated = new Date().toISOString();
            
            // Save to localStorage
            savePrincipalSettingsToStorage();
            
            // Update current user if principal is logged in
            if (currentUser && currentUser.role === 'principal') {
                currentUser.username = newUser;
            }
            
            // Update form fields
            principalSettingsUsername.value = newUser;
            principalCurrentUsername.value = newUser;
            
            // Clear fields
            principalNewUsername.value = '';
            principalConfirmUsername.value = '';
            
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
            
            if (currentPass !== currentUser.password) {
                showToast('Error', 'Current password is incorrect', 'error');
                return;
            }
            
            // Update password
            currentUser.password = newPass;
            
            // Clear fields
            currentPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';
            
            showToast('Success', 'Password changed successfully', 'success');
        }
        
        function changePrincipalPassword() {
            const currentPass = principalCurrentPassword.value;
            const newPass = principalNewPassword.value;
            const confirm = principalConfirmPasswordInput.value;
            
            if (!currentPass || !newPass || !confirm) {
                showToast('Error', 'All password fields are required', 'error');
                return;
            }
            
            if (newPass !== confirm) {
                showToast('Error', 'New passwords do not match', 'error');
                return;
            }
            
            // Check current password against stored credentials
            const storedPassword = principalCredentials.password || 'principal123';
            if (currentPass !== storedPassword) {
                showToast('Error', 'Current password is incorrect', 'error');
                return;
            }
            
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
            principalConfirmPasswordInput.value = '';
            
            showToast('Success', 'Password changed successfully', 'success');
        }
        
        function savePrincipalCredentials() {
            const displayName = principalDisplayName.value.trim();
            const username = principalUsername.value.trim();
            const password = principalPassword.value;
            const confirmPassword = principalConfirmPassword.value;
            
            if (!displayName || !username || !password || !confirmPassword) {
                showToast('Error', 'All fields are required', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Error', 'Passwords do not match', 'error');
                return;
            }
            
            // Update principal credentials
            principalCredentials.displayName = displayName;
            principalCredentials.username = username;
            principalCredentials.password = password;
            principalCredentials.lastChanged = new Date().toISOString().split('T')[0];
            
            // Update principal settings as well
            principalSettings.displayName = displayName;
            principalSettings.username = username;
            principalSettings.lastUpdated = new Date().toISOString();
            
            // Save to localStorage
            savePrincipalCredentialsToStorage();
            savePrincipalSettingsToStorage();
            
            // Update display
            updatePrincipalManagementPanel();
            
            // Clear password fields
            principalPassword.value = '';
            principalConfirmPassword.value = '';
            
            showToast('Success', 'Principal credentials updated successfully', 'success');
        }
        
        async function resetPrincipalCredentials() {
            const confirmed = await showCustomConfirm('Are you sure you want to reset Principal credentials to default?', 'Reset Credentials', 'warning');
            if (confirmed) {
                principalCredentials = {
                    username: 'principal',
                    password: 'principal123',
                    displayName: 'Dr. Ranjit Deshmukh',
                    email: 'principal@edumaster.edu',
                    lastChanged: new Date().toISOString().split('T')[0]
                };
                
                // Also reset principal settings
                principalSettings = {
                    displayName: 'Dr. Ranjit Deshmukh',
                    username: 'principal',
                    email: 'principal@edumaster.edu',
                    profilePhoto: null,
                    lastUpdated: new Date().toISOString()
                };
                
                // Save to localStorage
                savePrincipalCredentialsToStorage();
                savePrincipalSettingsToStorage();
                
                // Update display
                updatePrincipalManagementPanel();
                updatePrincipalSettings();
                
                // Clear form fields
                principalDisplayName.value = principalCredentials.displayName;
                principalUsername.value = principalCredentials.username;
                principalPassword.value = '';
                principalConfirmPassword.value = '';
                
                showToast('Success', 'Principal credentials reset to default', 'success');
            }
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
        
        // Institute Master Functions
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
            if (!name || !code || !address) {
                showToast('Validation Error', 'Please fill in all required fields', 'error');
                return;
            }
            
            const today = new Date().toISOString().split('T')[0];
            
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
                // Add new institute
                const newInstitute = {
                    id: `NIST${String(institutes.length + 1).padStart(3, '0')}`,
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
            
            updateDashboardStats();
            renderInstituteTable();
            renderDatabaseInstituteTable();
            resetInstituteForm();
        }
        
        function resetInstituteForm() {
            document.getElementById('instituteName').value = '';
            document.getElementById('instituteCode').value = '';
            document.getElementById('instituteAddress').value = '';
            document.getElementById('instituteStatus').value = 'Active';
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
                    <td>${institute.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
        
        function deleteInstitute(id) {
            const index = institutes.findIndex(inst => inst.id === id);
            if (index !== -1) {
                institutes.splice(index, 1);
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
                    <td>${institute.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
        
        // Academic Year Functions
        function showAddAcademicForm() {
            document.getElementById('academicFormTitle').textContent = 'Add New Academic Year';
            document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Save Academic Year';
            editingAcademicId = null;
            resetAcademicForm();
        }
        
        function showEditAcademicForm(academic) {
            document.getElementById('academicFormTitle').textContent = 'Edit Academic Year';
            document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Update Academic Year';
            editingAcademicId = academic.id;
            
            document.getElementById('yearName').value = academic.name;
            document.getElementById('startDate').value = academic.startDate || '';
            document.getElementById('endDate').value = academic.endDate || '';
            document.getElementById('isCurrentYear').value = academic.is_current || 'No';
            document.getElementById('academicStatus').value = academic.status;
        }
        
        function saveAcademicYear() {
            const name = document.getElementById('yearName').value.trim();
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const isCurrent = document.getElementById('isCurrentYear').value;
            const status = document.getElementById('academicStatus').value;
            
            // Validation
            if (!name) {
                showToast('Validation Error', 'Year name is required', 'error');
                return;
            }
            
            // If setting as current year, unset other current years
            if (isCurrent === 'Yes') {
                academicYears.forEach(year => {
                    if (year.id !== editingAcademicId) {
                        year.is_current = 'No';
                    }
                });
            }
            
            const today = new Date().toISOString().split('T')[0];
            
            if (editingAcademicId) {
                // Update existing academic year
                const index = academicYears.findIndex(year => year.id === editingAcademicId);
                if (index !== -1) {
                    academicYears[index] = {
                        ...academicYears[index],
                        name,
                        startDate,
                        endDate,
                        is_current: isCurrent,
                        status,
                        updated_at: today
                    };
                    showToast('Success', 'Academic year updated successfully', 'success');
                }
            } else {
                // Add new academic year
                const newAcademicYear = {
                    id: `YE${new Date().getFullYear()}`,
                    name,
                    startDate,
                    endDate,
                    is_current: isCurrent,
                    status,
                    created_at: today,
                    updated_at: today
                };
                academicYears.push(newAcademicYear);
                showToast('Success', 'Academic year added successfully', 'success');
            }
            
            updateDashboardStats();
            renderAcademicTable();
            renderDatabaseAcademicTable();
            updateAcademicYearDropdown();
            resetAcademicForm();
        }
        
        function resetAcademicForm() {
            const today = new Date().toISOString().split('T')[0];
            const nextYear = new Date();
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            const nextYearStr = nextYear.toISOString().split('T')[0];
            
            document.getElementById('yearName').value = '';
            document.getElementById('startDate').value = today;
            document.getElementById('endDate').value = nextYearStr;
            document.getElementById('isCurrentYear').value = 'No';
            document.getElementById('academicStatus').value = 'Active';
            editingAcademicId = null;
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
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${year.id}</td>
                    <td>${year.name}</td>
                    <td>${year.startDate || '-'}</td>
                    <td>${year.endDate || '-'}</td>
                    <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
                    <td><span class="${year.status === 'Active' ? 'status-active' : 'status-inactive'}">${year.status}</span></td>
                    <td>${year.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
                const usedInClasses = classes.some(cls => cls.academicYearId === id);
                if (usedInClasses) {
                    showToast('Error', 'Cannot delete academic year that is used in classes', 'error');
                    return;
                }
                
                academicYears.splice(index, 1);
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
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${year.id}</td>
                    <td>${year.name}</td>
                    <td>${year.startDate || '-'}</td>
                    <td>${year.endDate || '-'}</td>
                    <td><span class="${year.is_current === 'Yes' ? 'status-active' : 'status-inactive'}">${year.is_current}</span></td>
                    <td><span class="${year.status === 'Active' ? 'status-active' : 'status-inactive'}">${year.status}</span></td>
                    <td>${year.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
        
        // Programme Functions
        function showAddProgrammeForm() {
            document.getElementById('programmeFormTitle').textContent = 'Add New Programme';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Programme';
            editingProgrammeId = null;
            resetProgrammeForm();
        }
        
        function showEditProgrammeForm(programme) {
            document.getElementById('programmeFormTitle').textContent = 'Edit Programme';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Update Programme';
            editingProgrammeId = programme.id;
            
            document.getElementById('programmeName').value = programme.name;
            document.getElementById('programmeCode').value = programme.code || '';
            document.getElementById('programmeDuration').value = programme.duration || '3';
            document.getElementById('programmeDescription').value = programme.description || '';
            document.getElementById('programmeStatus').value = programme.status;
        }
        
        function saveProgramme() {
            const name = document.getElementById('programmeName').value.trim();
            const code = document.getElementById('programmeCode').value.trim();
            const duration = parseInt(document.getElementById('programmeDuration').value);
            const description = document.getElementById('programmeDescription').value.trim();
            const status = document.getElementById('programmeStatus').value;
            
            // Validation
            if (!name) {
                showToast('Validation Error', 'Programme name is required', 'error');
                return;
            }
            
            const today = new Date().toISOString().split('T')[0];
            
            if (editingProgrammeId) {
                // Update existing programme
                const index = programmes.findIndex(prog => prog.id === editingProgrammeId);
                if (index !== -1) {
                    programmes[index] = {
                        ...programmes[index],
                        name,
                        code: code || programmes[index].code,
                        duration: duration || programmes[index].duration,
                        description: description || programmes[index].description,
                        status,
                        updated_at: today
                    };
                    showToast('Success', 'Programme updated successfully', 'success');
                }
            } else {
                // Add new programme
                const newProgramme = {
                    id: `P${String(programmes.length + 8001)}`,
                    name,
                    code: code || `P${String(programmes.length + 8001)}`,
                    duration: duration || 3,
                    description,
                    status,
                    created_at: today,
                    updated_at: today
                };
                programmes.push(newProgramme);
                showToast('Success', 'Programme added successfully', 'success');
            }
            
            updateDashboardStats();
            renderProgrammeTable();
            renderDatabaseProgrammeTable();
            updateProgrammeDropdown();
            resetProgrammeForm();
        }
        
        function resetProgrammeForm() {
            document.getElementById('programmeName').value = '';
            document.getElementById('programmeCode').value = '';
            document.getElementById('programmeDuration').value = '3';
            document.getElementById('programmeDescription').value = '';
            document.getElementById('programmeStatus').value = 'Active';
            editingProgrammeId = null;
        }
        
        function cancelProgrammeForm() {
            resetProgrammeForm();
            document.getElementById('programmeFormTitle').textContent = 'Add New Programme';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Programme';
        }
        
        function renderProgrammeTable() {
            const tbody = document.getElementById('programmeTableBody');
            tbody.innerHTML = '';
            
            programmes.forEach(programme => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${programme.id}</td>
                    <td>${programme.name}</td>
                    <td>${programme.code || programme.id}</td>
                    <td>${programme.duration || '3'} years</td>
                    <td>${programme.description || '-'}</td>
                    <td><span class="${programme.status === 'Active' ? 'status-active' : 'status-inactive'}">${programme.status}</span></td>
                    <td>${programme.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
                    showCustomConfirm('Are you sure you want to delete this programme?', 'Confirm Delete', 'warning').then(confirmed => {
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
                // Check if this programme is used in any classes
                const usedInClasses = classes.some(cls => cls.programme_id === id);
                if (usedInClasses) {
                    showToast('Error', 'Cannot delete programme that is used in classes', 'error');
                    return;
                }
                
                programmes.splice(index, 1);
                updateDashboardStats();
                renderProgrammeTable();
                renderDatabaseProgrammeTable();
                updateProgrammeDropdown();
                showToast('Success', 'Programme deleted successfully', 'success');
            }
        }
        
        function filterProgrammes() {
            const searchTerm = document.getElementById('searchProgramme').value.toLowerCase();
            const filtered = programmes.filter(programme => 
                programme.name.toLowerCase().includes(searchTerm) ||
                (programme.code && programme.code.toLowerCase().includes(searchTerm))
            );
            
            const tbody = document.getElementById('programmeTableBody');
            tbody.innerHTML = '';
            
            filtered.forEach(programme => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${programme.id}</td>
                    <td>${programme.name}</td>
                    <td>${programme.code || programme.id}</td>
                    <td>${programme.duration || '3'} years</td>
                    <td>${programme.description || '-'}</td>
                    <td><span class="${programme.status === 'Active' ? 'status-active' : 'status-inactive'}">${programme.status}</span></td>
                    <td>${programme.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
                    showCustomConfirm('Are you sure you want to delete this programme?', 'Confirm Delete', 'warning').then(confirmed => {
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
        
        // Class Functions
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
            
            document.getElementById('className').value = cls.name || '';
            document.getElementById('classCode').value = cls.code || '';
            document.getElementById('classProgramme').value = cls.programme_id;
            document.getElementById('classAcademicYear').value = cls.academicYearId || '';
            document.getElementById('classSemester').value = cls.semester || cls.semester_name;
            document.getElementById('classMaxStudents').value = cls.maxStudents || 60;
            document.getElementById('classStatus').value = cls.status;
        }
        
        function saveClass() {
            const name = document.getElementById('className').value.trim();
            const code = document.getElementById('classCode').value.trim();
            const programmeId = document.getElementById('classProgramme').value;
            const academicYearId = document.getElementById('classAcademicYear').value;
            const semester = document.getElementById('classSemester').value.trim();
            const maxStudents = parseInt(document.getElementById('classMaxStudents').value) || 60;
            const status = document.getElementById('classStatus').value;
            
            // Validation
            if (!name || !code || !programmeId || !semester) {
                showToast('Validation Error', 'Please fill in all required fields', 'error');
                return;
            }
            
            const programme = programmes.find(prog => prog.id === programmeId);
            const academicYear = academicYears.find(year => year.id === academicYearId);
            
            const today = new Date().toISOString().split('T')[0];
            
            if (editingClassId) {
                // Update existing class
                const index = classes.findIndex(cls => cls.id === editingClassId);
                if (index !== -1) {
                    classes[index] = {
                        ...classes[index],
                        name,
                        code,
                        programme_id: programmeId,
                        programme_name: programme ? programme.name : classes[index].programme_name,
                        academicYearId: academicYearId || classes[index].academicYearId,
                        academicYearName: academicYear ? academicYear.name : classes[index].academicYearName,
                        semester,
                        semester_name: semester,
                        maxStudents,
                        status,
                        updated_at: today
                    };
                    showToast('Success', 'Class updated successfully', 'success');
                }
            } else {
                // Add new class
                const newClass = {
                    id: `CL${String(classes.length + 3001)}`,
                    name,
                    code,
                    programme_id: programmeId,
                    programme_name: programme ? programme.name : 'Unknown Programme',
                    academicYearId: academicYearId,
                    academicYearName: academicYear ? academicYear.name : 'Unknown Year',
                    semester,
                    semester_name: semester,
                    maxStudents,
                    status,
                    created_at: today,
                    updated_at: today
                };
                classes.push(newClass);
                showToast('Success', 'Class added successfully', 'success');
            }
            
            updateDashboardStats();
            renderClassTable();
            renderDatabaseClassTable();
            resetClassForm();
        }
        
        function resetClassForm() {
            document.getElementById('className').value = '';
            document.getElementById('classCode').value = '';
            document.getElementById('classProgramme').value = programmes.length > 0 ? programmes[0].id : '';
            document.getElementById('classAcademicYear').value = academicYears.length > 0 ? academicYears[0].id : '';
            document.getElementById('classSemester').value = '';
            document.getElementById('classMaxStudents').value = '60';
            document.getElementById('classStatus').value = 'Active';
            editingClassId = null;
        }
        
        function cancelClassForm() {
            resetClassForm();
            document.getElementById('classFormTitle').textContent = 'Add New Class';
            document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
        }
        
        function renderClassTable() {
            const tbody = document.getElementById('classTableBody');
            tbody.innerHTML = '';
            
            classes.forEach(cls => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cls.id}</td>
                    <td>${cls.name || cls.id}</td>
                    <td>${cls.code || cls.id}</td>
                    <td>${cls.programme_name}</td>
                    <td>${cls.academicYearName || '-'}</td>
                    <td>${cls.semester || cls.semester_name}</td>
                    <td>${cls.maxStudents || 60}</td>
                    <td><span class="${cls.status === 'Active' ? 'status-active' : 'status-inactive'}">${cls.status}</span></td>
                    <td>${cls.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
                updateDashboardStats();
                renderClassTable();
                renderDatabaseClassTable();
                showToast('Success', 'Class deleted successfully', 'success');
            }
        }
        
        function filterClasses() {
            const searchTerm = document.getElementById('searchClass').value.toLowerCase();
            const filtered = classes.filter(cls => 
                (cls.name && cls.name.toLowerCase().includes(searchTerm)) ||
                (cls.code && cls.code.toLowerCase().includes(searchTerm)) ||
                (cls.semester && cls.semester.toLowerCase().includes(searchTerm)) ||
                cls.programme_name.toLowerCase().includes(searchTerm)
            );
            
            const tbody = document.getElementById('classTableBody');
            tbody.innerHTML = '';
            
            filtered.forEach(cls => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cls.id}</td>
                    <td>${cls.name || cls.id}</td>
                    <td>${cls.code || cls.id}</td>
                    <td>${cls.programme_name}</td>
                    <td>${cls.academicYearName || '-'}</td>
                    <td>${cls.semester || cls.semester_name}</td>
                    <td>${cls.maxStudents || 60}</td>
                    <td><span class="${cls.status === 'Active' ? 'status-active' : 'status-inactive'}">${cls.status}</span></td>
                    <td>${cls.created_at}</td>
                    <td class="actions">
                        ${currentUser.role === 'admin' ? `
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
        
        function updateProgrammeDropdown() {
            const dropdown = document.getElementById('classProgramme');
            dropdown.innerHTML = '';
            
            programmes.forEach(programme => {
                const option = document.createElement('option');
                option.value = programme.id;
                option.textContent = `${programme.name} (${programme.code || programme.id})`;
                dropdown.appendChild(option);
            });
        }
        
        function updateAcademicYearDropdown() {
            const dropdown = document.getElementById('classAcademicYear');
            dropdown.innerHTML = '';
            
            academicYears.forEach(year => {
                const option = document.createElement('option');
                option.value = year.id;
                option.textContent = `${year.name} ${year.is_current === 'Yes' ? '(Current)' : ''}`;
                dropdown.appendChild(option);
            });
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
            switchSettingsTab('profile');
            switchPrincipalSettingsTab('principalProfile');
            
            // Reset table tabs to default (institute tab active)
            switchTableTab('institute');
            
            // Reset all forms
            resetAllForms();
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
