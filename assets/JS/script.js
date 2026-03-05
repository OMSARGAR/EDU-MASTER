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
            }
        };

        // Data arrays
        let institutes = JSON.parse(localStorage.getItem('eduMasterInstitutes')) || [];
        let academicYears = JSON.parse(localStorage.getItem('eduMasterAcademicYears')) || [];
        let programmes = JSON.parse(localStorage.getItem('eduMasterProgrammes')) || [];
        let classes = JSON.parse(localStorage.getItem('eduMasterClasses')) || [];
        let hods = JSON.parse(localStorage.getItem('eduMasterHods')) || [];
        let students = JSON.parse(localStorage.getItem('eduMasterStudents')) || [];
        let faculties = JSON.parse(localStorage.getItem('eduMasterFaculties')) || [];
        let feedbacks = JSON.parse(localStorage.getItem('eduMasterFeedbacks')) || [];
        let feedbackResponses = JSON.parse(localStorage.getItem('eduMasterFeedbackResponses')) || [];
        let subjects = JSON.parse(localStorage.getItem('eduMasterSubjects')) || [];

        // Save to localStorage functions
        function saveInstitutes() { localStorage.setItem('eduMasterInstitutes', JSON.stringify(institutes)); }
        function saveAcademicYears() { localStorage.setItem('eduMasterAcademicYears', JSON.stringify(academicYears)); }
        function saveProgrammes() { localStorage.setItem('eduMasterProgrammes', JSON.stringify(programmes)); }
        function saveClasses() { localStorage.setItem('eduMasterClasses', JSON.stringify(classes)); }
        function saveHods() { localStorage.setItem('eduMasterHods', JSON.stringify(hods)); }
        function saveStudents() { localStorage.setItem('eduMasterStudents', JSON.stringify(students)); }
        function saveFaculties() { localStorage.setItem('eduMasterFaculties', JSON.stringify(faculties)); }
        function saveFeedbacks() { localStorage.setItem('eduMasterFeedbacks', JSON.stringify(feedbacks)); }
        function saveFeedbackResponses() { localStorage.setItem('eduMasterFeedbackResponses', JSON.stringify(feedbackResponses)); }
        function saveSubjects() { localStorage.setItem('eduMasterSubjects', JSON.stringify(subjects)); }

        // Helper functions
        function getAcademicYearNameById(id) {
            const year = academicYears.find(y => y.id === id);
            return year ? year.name : id;
        }

        function formatDateToDDMMYYYY(dateStr) {
            if (!dateStr) return '';
            if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
                const [year, month, day] = dateStr.split('-');
                return `${day}-${month}-${year}`;
            }
            if (dateStr.includes('-') && dateStr.split('-')[0].length === 2) return dateStr;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        function formatDateToYYYYMMDD(dateStr) {
            if (!dateStr) return '';
            if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) return dateStr;
            const parts = dateStr.split('-');
            if (parts.length === 3 && parts[0].length === 2) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            return dateStr;
        }

        function formatDateForDisplay(dateStr) {
            return formatDateToDDMMYYYY(dateStr);
        }

        // Custom Alert System
        let customAlertResolve = null;
        function showCustomAlert(message, title = 'Alert', type = 'info') {
            return new Promise((resolve) => {
                document.getElementById('customAlertTitle').textContent = title;
                document.getElementById('customAlertMessage').textContent = message;
                const icon = document.getElementById('customAlertIcon');
                icon.className = 'custom-alert-icon';
                let iconClass = 'fas fa-info-circle';
                switch(type) {
                    case 'success':
                        icon.classList.add('success');
                        iconClass = 'fas fa-check-circle';
                        break;
                    case 'warning':
                        icon.classList.add('warning');
                        iconClass = 'fas fa-exclamation-triangle';
                        break;
                    case 'error':
                        icon.classList.add('error');
                        iconClass = 'fas fa-times-circle';
                        break;
                    default:
                        icon.classList.add('info');
                        iconClass = 'fas fa-info-circle';
                }
                icon.innerHTML = `<i class="${iconClass}"></i>`;
                document.getElementById('customAlertCancel').style.display = 'none';
                document.getElementById('customAlertConfirm').textContent = 'OK';
                document.getElementById('customAlertOverlay').classList.add('show');
                const handleConfirm = () => {
                    hideCustomAlert();
                    resolve(true);
                };
                const handleCancel = () => {
                    hideCustomAlert();
                    resolve(false);
                };
                const handleKeyDown = (e) => {
                    if (e.key === 'Escape') handleConfirm();
                    else if (e.key === 'Enter') handleConfirm();
                };
                document.getElementById('customAlertConfirm').onclick = handleConfirm;
                document.getElementById('customAlertCancel').onclick = handleCancel;
                const handleOverlayClick = (e) => {
                    if (e.target === document.getElementById('customAlertOverlay')) handleConfirm();
                };
                document.getElementById('customAlertOverlay').addEventListener('click', handleOverlayClick);
                document.addEventListener('keydown', handleKeyDown);
                customAlertResolve = () => {
                    document.getElementById('customAlertOverlay').removeEventListener('click', handleOverlayClick);
                    document.removeEventListener('keydown', handleKeyDown);
                    document.getElementById('customAlertConfirm').onclick = null;
                    document.getElementById('customAlertCancel').onclick = null;
                };
            });
        }

        function showCustomConfirm(message, title = 'Confirm', type = 'warning') {
            return new Promise((resolve) => {
                document.getElementById('customAlertTitle').textContent = title;
                document.getElementById('customAlertMessage').textContent = message;
                const icon = document.getElementById('customAlertIcon');
                icon.className = 'custom-alert-icon';
                let iconClass = 'fas fa-question-circle';
                switch(type) {
                    case 'success':
                        icon.classList.add('success');
                        iconClass = 'fas fa-check-circle';
                        break;
                    case 'warning':
                        icon.classList.add('warning');
                        iconClass = 'fas fa-exclamation-triangle';
                        break;
                    case 'error':
                        icon.classList.add('error');
                        iconClass = 'fas fa-times-circle';
                        break;
                    default:
                        icon.classList.add('info');
                        iconClass = 'fas fa-question-circle';
                }
                icon.innerHTML = `<i class="${iconClass}"></i>`;
                document.getElementById('customAlertCancel').style.display = 'inline-flex';
                document.getElementById('customAlertConfirm').textContent = 'Confirm';
                document.getElementById('customAlertCancel').textContent = 'Cancel';
                document.getElementById('customAlertOverlay').classList.add('show');
                const handleConfirm = () => {
                    hideCustomAlert();
                    resolve(true);
                };
                const handleCancel = () => {
                    hideCustomAlert();
                    resolve(false);
                };
                const handleKeyDown = (e) => {
                    if (e.key === 'Escape') handleCancel();
                    else if (e.key === 'Enter') handleConfirm();
                };
                document.getElementById('customAlertConfirm').onclick = handleConfirm;
                document.getElementById('customAlertCancel').onclick = handleCancel;
                const handleOverlayClick = (e) => {
                    if (e.target === document.getElementById('customAlertOverlay')) handleCancel();
                };
                document.getElementById('customAlertOverlay').addEventListener('click', handleOverlayClick);
                document.addEventListener('keydown', handleKeyDown);
                customAlertResolve = () => {
                    document.getElementById('customAlertOverlay').removeEventListener('click', handleOverlayClick);
                    document.removeEventListener('keydown', handleKeyDown);
                    document.getElementById('customAlertConfirm').onclick = null;
                    document.getElementById('customAlertCancel').onclick = null;
                };
            });
        }

        function hideCustomAlert() {
            document.getElementById('customAlertOverlay').classList.remove('show');
            if (customAlertResolve) {
                customAlertResolve();
                customAlertResolve = null;
            }
        }

        window.alert = function(message) { return showCustomAlert(message, 'Alert', 'info'); };
        window.confirm = function(message) { return showCustomConfirm(message, 'Confirm', 'warning'); };

        // ==================== VALIDATION FUNCTIONS ====================
        function showFieldError(input, errEl, msg) {
            input.classList.add('error');
            errEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
            errEl.classList.add('show');
        }
        function clearFieldError(input, errEl) {
            input.classList.remove('error');
            errEl.classList.remove('show');
            errEl.innerHTML = '';
        }

        // Institute validations
        function validateInstituteName() {
            const input = document.getElementById('instituteName');
            const err = document.getElementById('instituteNameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Institute Name is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateInstituteCode() {
            const input = document.getElementById('instituteCode');
            const err = document.getElementById('instituteCodeError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Institute Code is required'); return false; }
            if (!/^\d+$/.test(val)) { showFieldError(input, err, 'Only numeric digits allowed'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateInstituteAddress() {
            const input = document.getElementById('instituteAddress');
            const err = document.getElementById('instituteAddressError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Address is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateInstituteStatus() {
            const select = document.getElementById('instituteStatus');
            const err = document.getElementById('instituteStatusError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Status is required'); return false; }
            clearFieldError(select, err); return true;
        }

        // Academic Year validations
        function validateYearName() {
            const input = document.getElementById('yearName');
            const err = document.getElementById('yearNameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Year Name is required'); return false; }
            if (!/^[0-9\-\/\s]+$/.test(val)) { showFieldError(input, err, 'Characters are not allowed.'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateStartDate() {
            const input = document.getElementById('startDate');
            const err = document.getElementById('startDateError');
            const val = input.value;
            if (!val) { showFieldError(input, err, 'Start Date is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateEndDate() {
            const input = document.getElementById('endDate');
            const err = document.getElementById('endDateError');
            const val = input.value;
            if (!val) { showFieldError(input, err, 'End Date is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateIsCurrentYear() {
            const select = document.getElementById('isCurrentYear');
            const err = document.getElementById('isCurrentYearError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Is Current Year is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateAcademicStatus() {
            const select = document.getElementById('academicStatus');
            const err = document.getElementById('academicStatusError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Status is required'); return false; }
            clearFieldError(select, err); return true;
        }

        // Program validations
        function validateProgrammeName() {
            const select = document.getElementById('programmeName');
            const err = document.getElementById('programmeNameError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Program Name is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateProgrammeCode() {
            const input = document.getElementById('programmeCode');
            const err = document.getElementById('programmeCodeError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Program Code is required'); return false; }
            if (!/^\d+$/.test(val)) { showFieldError(input, err, 'Only numeric digits allowed'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateProgrammeDuration() {
            const input = document.getElementById('programmeDuration');
            const err = document.getElementById('programmeDurationError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Duration is required'); return false; }
            if (val < 1 || val > 10) { showFieldError(input, err, 'Duration must be between 1 and 10'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateProgrammeStatus() {
            const select = document.getElementById('programmeStatus');
            const err = document.getElementById('programmeStatusError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Status is required'); return false; }
            clearFieldError(select, err); return true;
        }

        // HOD validations
        function validateHodDepartment() {
            const select = document.getElementById('hodDepartment');
            const err = document.getElementById('hodDepartmentError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Department is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateHodName() {
            const input = document.getElementById('hodName');
            const err = document.getElementById('hodNameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Full Name is required'); return false; }
            if (!/^[A-Za-z\s]+$/.test(val)) { showFieldError(input, err, 'Only alphabets allowed'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateHodMobile() {
            const input = document.getElementById('hodMobile');
            const err = document.getElementById('hodMobileError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Mobile number is required'); return false; }
            if (!/^\d{10}$/.test(val)) { showFieldError(input, err, 'Exactly 10 digits required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateHodEmail() {
            const input = document.getElementById('hodEmail');
            const err = document.getElementById('hodEmailError');
            const val = input.value.trim().toLowerCase();
            input.value = val; // store lowercase
            if (!val) { showFieldError(input, err, 'Email is required'); return false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) { showFieldError(input, err, 'Invalid email format'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateHodUsername() {
            const input = document.getElementById('hodUsername');
            const err = document.getElementById('hodUsernameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Username is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateHodPassword() {
            const input = document.getElementById('hodPassword');
            const err = document.getElementById('hodPasswordError');
            const val = input.value;
            if (!val) { showFieldError(input, err, 'Password is required'); return false; }
            clearFieldError(input, err); return true;
        }

        // Class validations
        function validateClassProgramme() {
            const select = document.getElementById('classProgramme');
            const err = document.getElementById('classProgrammeError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Program is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateClassCode() {
            const select = document.getElementById('classCode');
            const err = document.getElementById('classCodeError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Class Code is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateClassAcademicYear() {
            const select = document.getElementById('classAcademicYear');
            const err = document.getElementById('classAcademicYearError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Academic Year is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateClassTerm() {
            const select = document.getElementById('classTerm');
            const err = document.getElementById('classTermError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'TERM is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateClassStatus() {
            const select = document.getElementById('classStatus');
            const err = document.getElementById('classStatusError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Status is required'); return false; }
            clearFieldError(select, err); return true;
        }

        // Student validations (new)
        function validateStudentName() {
            const input = document.getElementById('studentName');
            const err = document.getElementById('studentNameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Full Name is required'); return false; }
            if (!/^[A-Za-z\s]+$/.test(val)) { showFieldError(input, err, 'Only alphabets allowed'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateStudentEnrollment() {
            const input = document.getElementById('studentEnrollment');
            const err = document.getElementById('studentEnrollmentError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Enrollment number is required'); return false; }
            if (!/^\d{1,15}$/.test(val)) { showFieldError(input, err, 'Only digits, max 15'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateStudentProgram() {
            const select = document.getElementById('studentProgram');
            const err = document.getElementById('studentProgramError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Program is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateStudentAcademicYear() {
            const select = document.getElementById('studentAcademicYear');
            const err = document.getElementById('studentAcademicYearError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Academic Year is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateStudentClassYear() {
            const select = document.getElementById('studentClassYear');
            const err = document.getElementById('studentClassYearError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Class Year is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateStudentTerm() {
            const select = document.getElementById('studentTerm');
            const err = document.getElementById('studentTermError');
            const val = select.value;
            if (!val) { showFieldError(select, err, 'Term is required'); return false; }
            clearFieldError(select, err); return true;
        }
        function validateStudentMobile() {
            const input = document.getElementById('studentMobile');
            const err = document.getElementById('studentMobileError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Mobile number is required'); return false; }
            if (!/^\d{10}$/.test(val)) { showFieldError(input, err, 'Exactly 10 digits required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateStudentEmail() {
            const input = document.getElementById('studentEmail');
            const err = document.getElementById('studentEmailError');
            const val = input.value.trim().toLowerCase();
            input.value = val;
            if (!val) { showFieldError(input, err, 'Email is required'); return false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) { showFieldError(input, err, 'Invalid email format'); return false; }
            clearFieldError(input, err); return true;
        }

        // Profile validations
        function validateProfileName() {
            const input = document.getElementById('profileName');
            const err = document.getElementById('profileNameError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Display Name is required'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateProfileEmail() {
            const input = document.getElementById('profileEmail');
            const err = document.getElementById('profileEmailError');
            const val = input.value.trim().toLowerCase();
            input.value = val;
            if (!val) { showFieldError(input, err, 'Email is required'); return false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) { showFieldError(input, err, 'Invalid email format'); return false; }
            clearFieldError(input, err); return true;
        }
        function validateProfileMobile() {
            const input = document.getElementById('profileMobile');
            const err = document.getElementById('profileMobileError');
            const val = input.value.trim();
            if (!val) { showFieldError(input, err, 'Mobile number is required'); return false; }
            if (!/^\d{10}$/.test(val)) { showFieldError(input, err, 'Exactly 10 digits required'); return false; }
            clearFieldError(input, err); return true;
        }

        // ==================== REAL-TIME INPUT RESTRICTIONS ====================
        function restrictNumericInput(event) {
            const key = event.key;
            // Allow digits, backspace, delete, arrows, tab, home, end
            if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab' && key !== 'Home' && key !== 'End' && key !== 'Enter') {
                event.preventDefault();
                const input = event.target;
                const errorId = input.id + 'Error';
                const errorDiv = document.getElementById(errorId);
                if (errorDiv) {
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Only numeric values allowed.';
                    errorDiv.classList.add('show');
                }
            } else {
                // Optionally hide error on valid key? We'll handle in input event.
            }
        }

        function restrictAlphaInput(event) {
            const key = event.key;
            // Allow letters, space, backspace, delete, arrows, tab, home, end
            if (!/^[a-zA-Z\s]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab' && key !== 'Home' && key !== 'End' && key !== 'Enter') {
                event.preventDefault();
                const input = event.target;
                const errorId = input.id + 'Error';
                const errorDiv = document.getElementById(errorId);
                if (errorDiv) {
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Only alphabet characters allowed.';
                    errorDiv.classList.add('show');
                }
            }
        }

        function restrictAlphaCommaInput(event) {
            const key = event.key;
            // Allow letters, space, comma, backspace, delete, arrows, tab, home, end
            if (!/^[a-zA-Z\s,]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab' && key !== 'Home' && key !== 'End' && key !== 'Enter') {
                event.preventDefault();
                const input = event.target;
                const errorId = input.id + 'Error';
                const errorDiv = document.getElementById(errorId);
                if (errorDiv) {
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Only alphabets and comma allowed.';
                    errorDiv.classList.add('show');
                }
            }
        }

        function restrictYearNameInput(event) {
            const key = event.key;
            // Allow digits, dash, slash, space, backspace, delete, arrows, tab, home, end
            if (!/^[0-9\-\/\s]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab' && key !== 'Home' && key !== 'End' && key !== 'Enter') {
                event.preventDefault();
                const input = event.target;
                const errorId = input.id + 'Error';
                const errorDiv = document.getElementById(errorId);
                if (errorDiv) {
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Characters are not allowed.';
                    errorDiv.classList.add('show');
                }
            }
        }

        function setupNumericValidation(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('keydown', restrictNumericInput);
            input.addEventListener('input', function(e) {
                let val = this.value;
                const original = val;
                val = val.replace(/[^\d]/g, '');
                // Determine max length based on inputId
                let maxLen = 10;
                if (inputId === 'studentEnrollment') maxLen = 15;
                if (val.length > maxLen) val = val.slice(0, maxLen);
                if (val !== original) {
                    this.value = val;
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> Only numeric values allowed (max ${maxLen} digits).`;
                        errorDiv.classList.add('show');
                    }
                } else {
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.classList.remove('show');
                        errorDiv.innerHTML = '';
                    }
                }
            });
        }

        function setupAlphaValidation(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('keydown', restrictAlphaInput);
            input.addEventListener('input', function(e) {
                let val = this.value;
                const original = val;
                val = val.replace(/[^a-zA-Z\s]/g, '');
                if (val !== original) {
                    this.value = val;
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Only alphabet characters allowed.';
                        errorDiv.classList.add('show');
                    }
                } else {
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.classList.remove('show');
                        errorDiv.innerHTML = '';
                    }
                }
            });
        }

        function setupAlphaCommaValidation(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('keydown', restrictAlphaCommaInput);
            input.addEventListener('input', function(e) {
                let val = this.value;
                const original = val;
                val = val.replace(/[^a-zA-Z\s,]/g, '');
                if (val !== original) {
                    this.value = val;
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Only alphabets and comma allowed.';
                        errorDiv.classList.add('show');
                    }
                } else {
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.classList.remove('show');
                        errorDiv.innerHTML = '';
                    }
                }
            });
        }

        function setupYearNameValidation(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('keydown', restrictYearNameInput);
            input.addEventListener('input', function(e) {
                let val = this.value;
                const original = val;
                val = val.replace(/[^0-9\-\/\s]/g, '');
                if (val !== original) {
                    this.value = val;
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Characters are not allowed.';
                        errorDiv.classList.add('show');
                    }
                } else {
                    const errorDiv = document.getElementById(this.id + 'Error');
                    if (errorDiv) {
                        errorDiv.classList.remove('show');
                        errorDiv.innerHTML = '';
                    }
                }
            });
        }

        // Email lowercase conversion
        function setupEmailLowercase(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('input', function(e) {
                this.value = this.value.toLowerCase();
            });
            input.addEventListener('blur', function(e) {
                this.value = this.value.toLowerCase();
            });
        }

        // ==================== PASSWORD TOGGLE HELPERS ====================
        function setupPasswordToggle(btnId, inputId) {
            const btn = document.getElementById(btnId);
            const input = document.getElementById(inputId);
            if (!btn || !input) return;
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                btn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
                input.focus();
            });
        }

        // Mapping for program code auto-fill
        const programCodeMap = {
            'Computer Engineering': '647124510',
            'Civil Engineering': '647119110',
            'Mechanical Engineering': '647161210',
            'Electrical Engineering': '6171',
            'Electronics and Telecommunication Engineering': '647137210'
        };

        // Check if any classes exist for academic year or program
        function hasAnyClassesForAcademicYear(yearId) {
            return classes.some(c => c.academic_year === yearId);
        }
        function hasAnyClassesForProgram(programId) {
            return classes.some(c => c.programme_id === programId);
        }
        function hasNonCompletedClassesForAcademicYear(yearId) {
            return classes.some(c => c.academic_year === yearId && c.status !== 'Completed');
        }
        function hasNonCompletedClassesForProgram(programId) {
            return classes.some(c => c.programme_id === programId && c.status !== 'Completed');
        }

        // Save attempts for double‑click validation
        let saveAttempts = {
            institute: 0,
            academic: 0,
            programme: 0,
            class: 0,
            hod: 0,
            student: 0
        };

        // ==================== NEW: COUNTERS FOR SECURITY FORMS ====================
        let usernameChangeAttempts = 0;
        let passwordChangeAttempts = 0;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            updateDashboardStats();
            renderDatabaseTables();
            updateProfileSettings();
            populateAcademicYearDropdown();
            populateStudentProgramDropdown();

            // Setup real-time validation
            setupNumericValidation('instituteCode');
            setupNumericValidation('hodMobile');
            setupNumericValidation('studentMobile');
            setupNumericValidation('studentEnrollment'); // now allows 15 digits
            setupNumericValidation('profileMobile');
            setupAlphaValidation('hodName');
            setupAlphaValidation('studentName');
            setupYearNameValidation('yearName');

            // Setup email lowercase
            setupEmailLowercase('hodEmail');
            setupEmailLowercase('studentEmail');
            setupEmailLowercase('profileEmail');

            // Default student role: show department selector
            currentRole = 'student';
            document.getElementById('departmentSelector').classList.remove('hidden');

            // Setup toggles for settings passwords (already inside wrapper)
            setupPasswordToggle('toggleCurrentPassword', 'currentPassword');
            setupPasswordToggle('toggleNewPassword', 'newPassword');
            setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
            // HOD toggle
            setupPasswordToggle('toggleHodPassword', 'hodPassword');

            // Attach validation listeners for new fields
            document.getElementById('instituteName')?.addEventListener('input', validateInstituteName);
            document.getElementById('instituteCode')?.addEventListener('input', validateInstituteCode);
            document.getElementById('instituteAddress')?.addEventListener('input', function() { clearFieldError(this, document.getElementById('instituteAddressError')); });
            document.getElementById('instituteStatus')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('instituteStatusError')); });

            document.getElementById('yearName')?.addEventListener('input', validateYearName);
            document.getElementById('startDate')?.addEventListener('input', function() { clearFieldError(this, document.getElementById('startDateError')); });
            document.getElementById('endDate')?.addEventListener('input', function() { clearFieldError(this, document.getElementById('endDateError')); });
            document.getElementById('isCurrentYear')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('isCurrentYearError')); });
            document.getElementById('academicStatus')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('academicStatusError')); });

            document.getElementById('programmeName')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('programmeNameError')); });
            document.getElementById('programmeCode')?.addEventListener('input', validateProgrammeCode);
            document.getElementById('programmeDuration')?.addEventListener('input', function() { clearFieldError(this, document.getElementById('programmeDurationError')); });
            document.getElementById('programmeStatus')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('programmeStatusError')); });

            document.getElementById('hodDepartment')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('hodDepartmentError')); });
            document.getElementById('hodName')?.addEventListener('input', validateHodName);
            document.getElementById('hodMobile')?.addEventListener('input', validateHodMobile);
            document.getElementById('hodEmail')?.addEventListener('input', validateHodEmail);
            document.getElementById('hodUsername')?.addEventListener('input', function() { clearFieldError(this, document.getElementById('hodUsernameError')); });
            document.getElementById('hodPassword')?.addEventListener('input', validateHodPassword);

            document.getElementById('classProgramme')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('classProgrammeError')); });
            document.getElementById('classCode')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('classCodeError')); });
            document.getElementById('classAcademicYear')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('classAcademicYearError')); });
            document.getElementById('classTerm')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('classTermError')); });
            document.getElementById('classStatus')?.addEventListener('change', function() { clearFieldError(this, document.getElementById('classStatusError')); });

            document.getElementById('studentName')?.addEventListener('input', validateStudentName);
            document.getElementById('studentEnrollment')?.addEventListener('input', validateStudentEnrollment);
            document.getElementById('studentProgram')?.addEventListener('change', validateStudentProgram);
            document.getElementById('studentAcademicYear')?.addEventListener('change', validateStudentAcademicYear);
            document.getElementById('studentClassYear')?.addEventListener('change', validateStudentClassYear);
            document.getElementById('studentTerm')?.addEventListener('change', validateStudentTerm);
            document.getElementById('studentMobile')?.addEventListener('input', validateStudentMobile);
            document.getElementById('studentEmail')?.addEventListener('input', validateStudentEmail);

            // Profile validations
            document.getElementById('profileName')?.addEventListener('input', validateProfileName);
            document.getElementById('profileEmail')?.addEventListener('input', validateProfileEmail);
            document.getElementById('profileMobile')?.addEventListener('input', validateProfileMobile);

            // Auto-fill program code
            document.getElementById('programmeName').addEventListener('change', function() {
                const selected = this.value;
                const codeInput = document.getElementById('programmeCode');
                if (selected && programCodeMap[selected]) {
                    codeInput.value = programCodeMap[selected];
                } else {
                    codeInput.value = '';
                }
            });

            // Dropdown change restrictions for Academic Year and Program
            setupDropdownRestrictions();
        });

        function setupDropdownRestrictions() {
            // Academic Year dropdowns
            const isCurrentYear = document.getElementById('isCurrentYear');
            const academicStatus = document.getElementById('academicStatus');
            if (isCurrentYear) {
                isCurrentYear.addEventListener('change', function(e) {
                    const newVal = this.value;
                    const oldVal = this.getAttribute('data-previous') || '';
                    if (editingAcademicId && hasNonCompletedClassesForAcademicYear(editingAcademicId)) {
                        if (newVal === 'No') {
                            showFieldError(this, document.getElementById('isCurrentYearError'), 'Class Master has values. Cannot select this option.');
                            this.value = oldVal;
                        } else {
                            clearFieldError(this, document.getElementById('isCurrentYearError'));
                        }
                    }
                    this.setAttribute('data-previous', this.value);
                });
                isCurrentYear.setAttribute('data-previous', isCurrentYear.value);
            }
            if (academicStatus) {
                academicStatus.addEventListener('change', function(e) {
                    const newVal = this.value;
                    const oldVal = this.getAttribute('data-previous') || '';
                    if (editingAcademicId && hasNonCompletedClassesForAcademicYear(editingAcademicId)) {
                        if (newVal === 'Inactive' || newVal === 'Completed') {
                            showFieldError(this, document.getElementById('academicStatusError'), 'Class Master has values. Cannot select this option.');
                            this.value = oldVal;
                        } else {
                            clearFieldError(this, document.getElementById('academicStatusError'));
                        }
                    }
                    this.setAttribute('data-previous', this.value);
                });
                academicStatus.setAttribute('data-previous', academicStatus.value);
            }

            // Program Status dropdown
            const progStatus = document.getElementById('programmeStatus');
            if (progStatus) {
                progStatus.addEventListener('change', function(e) {
                    const newVal = this.value;
                    const oldVal = this.getAttribute('data-previous') || '';
                    if (editingProgrammeId && hasNonCompletedClassesForProgram(editingProgrammeId)) {
                        if (newVal === 'Inactive' || newVal === 'Completed') {
                            showFieldError(this, document.getElementById('programmeStatusError'), 'Class Master has values. Cannot select this option.');
                            this.value = oldVal;
                        } else {
                            clearFieldError(this, document.getElementById('programmeStatusError'));
                        }
                    }
                    this.setAttribute('data-previous', this.value);
                });
                progStatus.setAttribute('data-previous', progStatus.value);
            }
        }

        // New function to populate student program dropdown with only Active programs
        function populateStudentProgramDropdown() {
            const select = document.getElementById('studentProgram');
            select.innerHTML = '<option value="">Select Program</option>';
            const activePrograms = programmes.filter(p => p.status === 'Active');
            activePrograms.forEach(p => {
                const option = document.createElement('option');
                option.value = p.name; // program name as value (to match existing structure)
                option.textContent = p.name;
                select.appendChild(option);
            });
        }

        function populateAcademicYearDropdown() {
            const select = document.getElementById('studentAcademicYear');
            select.innerHTML = '<option value="">Select Academic Year</option>';
            academicYears.forEach(year => {
                if (year.status === 'Active') {
                    const option = document.createElement('option');
                    option.value = year.id;
                    option.textContent = year.name;
                    select.appendChild(option);
                }
            });
        }

        // Setup event listeners (existing code, we'll append new validation checks in save handlers)
        function setupEventListeners() {
            // Role selection
            document.querySelectorAll('.role-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentRole = this.dataset.role;
                    // Show/hide department selector using hidden class (keeps height)
                    const deptSelector = document.getElementById('departmentSelector');
                    if (currentRole === 'student' || currentRole === 'hod') {
                        deptSelector.classList.remove('hidden');
                    } else {
                        deptSelector.classList.add('hidden');
                    }
                    // Clear all fields on role switch
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('loginDepartment').value = '';
                    clearErrors();
                    clearDepartmentError(); // clear department error on role switch
                });
            });

            // Toggle password
            document.getElementById('togglePassword').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
                passwordInput.focus();
            });

            // Login
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hasSubmitted = true;
                handleLogin();
            });
            document.getElementById('loginButton').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hasSubmitted = true;
                handleLogin();
            });

            // Logout buttons
            document.getElementById('logoutBtn').addEventListener('click', handleLogout);
            // student and hod logout will be attached dynamically

            // Back buttons
            document.getElementById('backFromInstitute').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromAcademic').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromProgramme').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromClass').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromReports').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromSettings').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromHod').addEventListener('click', () => showMainDashboard('quickActions'));
            document.getElementById('backFromStudent').addEventListener('click', () => showMainDashboard('quickActions'));

            // Quick actions
            document.getElementById('addInstituteBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                lastActionSource = 'quickActions';
                showInstituteModule();
                showAddInstituteForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addAcademicYearBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                lastActionSource = 'quickActions';
                showAcademicModule();
                showAddAcademicForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addProgrammeBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                lastActionSource = 'quickActions';
                showProgrammeModule();
                showAddProgrammeForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addClassBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                lastActionSource = 'quickActions';
                showClassModule();
                showAddClassForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addHodBtn').addEventListener('click', function() {
                if (currentUser && currentUser.role === 'admin') {
                    saveDashboardScrollPosition();
                    lastActionSource = 'quickActions';
                    showHodModule();
                    showAddHodForm();
                    setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                }
            });
            document.getElementById('viewReportsBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                lastActionSource = 'quickActions';
                showReportsModule();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('settingsBtn').addEventListener('click', function() {
                if (currentUser && currentUser.role === 'admin') {
                    saveDashboardScrollPosition();
                    lastActionSource = 'quickActions';
                    showSettingsModule();
                    setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                }
            });

            // Table tabs
            document.querySelectorAll('.table-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tableId = this.getAttribute('data-table');
                    switchTableTab(tableId);
                });
            });

            // Settings tabs
            document.querySelectorAll('.settings-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const panelId = this.getAttribute('data-panel');
                    switchSettingsTab(panelId);
                });
            });

            // Save profile, change password, change username
            document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
            document.getElementById('changePasswordBtn').addEventListener('click', changePassword);
            document.getElementById('changeUsernameBtn').addEventListener('click', changeUsername);

            // Export buttons
            document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
            document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);

            // Institute form
            document.getElementById('saveInstituteBtn').addEventListener('click', saveInstitute);
            document.getElementById('cancelInstituteBtn').addEventListener('click', cancelInstituteForm);
            document.getElementById('searchInstitute').addEventListener('input', filterInstitutes);
            document.getElementById('clearInstituteSearch').addEventListener('click', clearInstituteSearch);

            // Academic form
            document.getElementById('saveAcademicBtn').addEventListener('click', saveAcademicYear);
            document.getElementById('cancelAcademicBtn').addEventListener('click', cancelAcademicForm);
            document.getElementById('searchAcademic').addEventListener('input', filterAcademicYears);
            document.getElementById('clearAcademicSearch').addEventListener('click', clearAcademicSearch);

            // Programme form
            document.getElementById('saveProgrammeBtn').addEventListener('click', saveProgramme);
            document.getElementById('cancelProgrammeBtn').addEventListener('click', cancelProgrammeForm);
            document.getElementById('searchProgramme').addEventListener('input', filterProgrammes);
            document.getElementById('clearProgrammeSearch').addEventListener('click', clearProgrammeSearch);

            // Class form
            document.getElementById('saveClassBtn').addEventListener('click', saveClass);
            document.getElementById('cancelClassBtn').addEventListener('click', cancelClassForm);
            document.getElementById('searchClass').addEventListener('input', filterClasses);
            document.getElementById('clearClassSearch').addEventListener('click', clearClassSearch);
            document.getElementById('classProgramme').addEventListener('change', function() {
                const classCodeSelect = document.getElementById('classCode');
                const academicYearSelect = document.getElementById('classAcademicYear');
                const termSelect = document.getElementById('classTerm');
                if (this.value) {
                    const selectedProgram = programmes.find(prog => prog.id === this.value);
                    if (selectedProgram) {
                        classCodeSelect.disabled = false;
                        updateClassCodeDropdown();
                        academicYearSelect.disabled = false;
                        updateAcademicYearDropdownForClassMaster();
                        termSelect.disabled = true;
                        termSelect.innerHTML = '<option value="">Select Class Code first</option>';
                        termSelect.value = '';
                        classCodeSelect.style.opacity = '1';
                        academicYearSelect.style.opacity = '1';
                        termSelect.style.opacity = '0.5';
                    }
                } else {
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
            document.getElementById('classCode').addEventListener('change', function() {
                const termSelect = document.getElementById('classTerm');
                if (this.value) {
                    termSelect.disabled = false;
                    updateTermDropdown(this.value);
                    termSelect.style.opacity = '1';
                } else {
                    termSelect.disabled = true;
                    termSelect.innerHTML = '<option value="">Select Class Code first</option>';
                    termSelect.value = '';
                    termSelect.style.opacity = '0.5';
                }
            });

            // HOD form
            document.getElementById('saveHodBtn').addEventListener('click', saveHod);
            document.getElementById('cancelHodBtn').addEventListener('click', cancelHodForm);
            document.getElementById('searchHod').addEventListener('input', filterHods);
            document.getElementById('clearHodSearch').addEventListener('click', clearHodSearch);

            // Student form
            document.getElementById('saveStudentBtn').addEventListener('click', saveStudent);
            document.getElementById('cancelStudentBtn').addEventListener('click', cancelStudentForm);
            document.getElementById('searchStudent').addEventListener('input', filterStudents);
            document.getElementById('clearStudentSearch').addEventListener('click', clearStudentSearch);
            document.getElementById('studentClassYear').addEventListener('change', function() {
                const termSelect = document.getElementById('studentTerm');
                const year = this.value;
                termSelect.innerHTML = '<option value="">Select Term</option>';
                if (year === 'First Year') {
                    termSelect.innerHTML += '<option value="Term 1">Term 1</option><option value="Term 2">Term 2</option>';
                } else if (year === 'Second Year') {
                    termSelect.innerHTML += '<option value="Term 3">Term 3</option><option value="Term 4">Term 4</option>';
                } else if (year === 'Third Year') {
                    termSelect.innerHTML += '<option value="Term 5">Term 5</option><option value="Term 6">Term 6</option>';
                }
                termSelect.disabled = false;
            });

            // Validation for dropdowns (simplified)
            document.getElementById('isCurrentYear').addEventListener('change', function() {
                const selectedValue = this.value;
                if (selectedValue === 'Yes') {
                    const otherCurrentYear = academicYears.find(year => 
                        year.is_current === 'Yes' && 
                        (!editingAcademicId || year.id !== editingAcademicId)
                    );
                    if (otherCurrentYear) {
                        alert(`Cannot mark this year as current. "${otherCurrentYear.name}" is already marked as current year.`);
                        this.value = this.getAttribute('data-previous-value') || '';
                    }
                }
                this.setAttribute('data-previous-value', selectedValue);
            });

            // Input validation
            document.getElementById('username').addEventListener('blur', function() { if (hasSubmitted) validateUsername(); });
            document.getElementById('password').addEventListener('blur', function() { if (hasSubmitted) validatePassword(); });
            document.getElementById('username').addEventListener('input', function() { if (this.value.trim()) { clearError('username'); this.classList.remove('error'); } });
            document.getElementById('password').addEventListener('input', function() { if (this.value.trim()) { clearError('password'); this.classList.remove('error'); } });
            
            // Department validation on change
            document.getElementById('loginDepartment').addEventListener('change', function() {
                if (this.value) {
                    clearDepartmentError();
                }
            });
            document.getElementById('loginDepartment').addEventListener('input', function() {
                if (this.value) {
                    clearDepartmentError();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const activeElement = document.activeElement;
                    if (activeElement === document.getElementById('username') || activeElement === document.getElementById('password')) {
                        e.preventDefault();
                        hasSubmitted = true;
                        handleLogin();
                    }
                }
                if (e.key === 'Escape') { hideToast(); hideCustomAlert(); }
            });

            // HOD Sidebar Toggle - not needed as HOD dashboard is removed, but keep to avoid errors
            if (document.getElementById('hodSidebarToggle')) {
                document.getElementById('hodSidebarToggle').addEventListener('click', function() {});
            }
            if (document.getElementById('studentSidebarToggle')) {
                document.getElementById('studentSidebarToggle').addEventListener('click', function() {});
            }
        }

        // Variables for navigation
        let lastActionSource = 'quickActions'; // 'quickActions' or 'databaseTables'
        let dashboardScrollPosition = 0;

        // Department error handling
        function showDepartmentError(msg) {
            const select = document.getElementById('loginDepartment');
            const err = document.getElementById('departmentError');
            select.classList.add('error');
            err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
            err.classList.add('show');
        }
        function clearDepartmentError() {
            const select = document.getElementById('loginDepartment');
            const err = document.getElementById('departmentError');
            select.classList.remove('error');
            err.classList.remove('show');
            err.innerHTML = '';
        }

        // Password strength validation
        function isStrongPassword(password) {
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const minLength = password.length >= 8;
            return hasUpper && hasLower && hasNumber && hasSpecial && minLength;
        }

        // Mobile validation
        function isValidMobile(mobile) {
            return /^\d{10}$/.test(mobile);
        }

        // Login handling
        let currentUser = null;
        let toastTimeout = null;
        let currentRole = 'student'; // default to student
        let successBannerTimeout = null;
        let hasSubmitted = false;
        let loginAnimationPlayed = false;

        const loginPage = document.getElementById('loginPage');
        const studentDashboard = document.getElementById('studentDashboard');
        const hodDashboard = document.getElementById('hodDashboard');
        const dashboard = document.getElementById('dashboard');
        const passwordInput = document.getElementById('password');
        const usernameInput = document.getElementById('username');

        function handleLogin() {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            clearErrors();
            clearDepartmentError();
            let isValid = true;
            if (!username) { showError('username', 'Username is required'); isValid = false; }
            if (!password) { showError('password', 'Password is required'); isValid = false; }
            
            const role = currentRole;
            const department = document.getElementById('loginDepartment').value;
            if ((role === 'student' || role === 'hod')) {
                if (!department) {
                    showDepartmentError('Department is required');
                    isValid = false;
                }
            }
            if (!isValid) return;

            document.getElementById('loginButton').disabled = true;
            document.getElementById('loadingSpinner').style.display = 'block';
            document.getElementById('loginButton').querySelector('span').textContent = 'AUTHENTICATING...';

            setTimeout(() => {
                let authenticated = false;
                let userData = null;
                if (role === 'admin') {
                    if (username === storedCredentials.admin.username && password === storedCredentials.admin.password) {
                        authenticated = true;
                        userData = storedCredentials.admin;
                    }
                } else if (role === 'hod') {
                    const hod = hods.find(h => h.username === username && h.password === password && h.department === department);
                    if (hod) {
                        authenticated = true;
                        userData = {
                            name: hod.name,
                            role: 'hod',
                            roleName: 'HOD',
                            department: hod.department,
                            username: hod.username,
                            id: hod.id
                        };
                    }
                } else if (role === 'student') {
                    const student = students.find(s => s.enrollment === username && s.password === password && s.program === department);
                    if (student) {
                        authenticated = true;
                        userData = {
                            name: student.name,
                            role: 'student',
                            roleName: 'Student',
                            enrollment: student.enrollment,
                            program: student.program,
                            academicYear: student.academicYear,
                            classYear: student.classYear,
                            term: student.term,
                            mobile: student.mobile,
                            email: student.email,
                            firstLogin: student.firstLogin,
                            id: student.id
                        };
                    }
                }

                if (authenticated && userData) {
                    currentUser = userData;
                    usernameInput.classList.add('success');
                    passwordInput.classList.add('success');
                    showToast('Login Successful', `Welcome, ${userData.name}!`, 'success');

                    if (role === 'admin') {
                        setTimeout(() => transitionToAdminDashboard(), 500);
                    } else if (role === 'hod') {
                        setTimeout(() => showHODDashboard(), 500);
                    } else if (role === 'student') {
                        setTimeout(() => showStudentDashboard(), 500);
                    }
                    resetLoginForm();
                } else {
                    usernameInput.classList.add('error');
                    passwordInput.classList.add('error');
                    showError('username', 'Invalid username or password');
                    showError('password', 'Please check your credentials');
                    usernameInput.style.animation = 'shake 0.5s';
                    passwordInput.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        usernameInput.style.animation = '';
                        passwordInput.style.animation = '';
                    }, 500);
                    showToast('Login Failed', 'Invalid username or password', 'error');
                    document.getElementById('loginButton').disabled = false;
                    document.getElementById('loadingSpinner').style.display = 'none';
                    document.getElementById('loginButton').querySelector('span').textContent = 'LOGIN TO DASHBOARD';
                }
            }, 500);
        }

        // ==================== MODIFIED HOD DASHBOARD ====================
        // No left panel, admin style with top navbar
        let hodLastActionSource = 'quickActions'; // track for HOD dashboard scroll

        function showHODDashboard() {
            hodDashboard.innerHTML = `
                <!-- Top navbar like admin -->
                <nav class="dashboard-navbar">
                    <div class="dashboard-logo">EDU MASTER</div>
                    <div class="dashboard-user">
                        <div class="user-info">
                            <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                            <div class="user-details">
                                <div class="user-name">${currentUser.name}</div>
                                <div class="user-role">HOD (${currentUser.department})</div>
                            </div>
                        </div>
                        <button class="logout-btn" id="hodLogoutBtn">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </nav>
                
                <main class="dashboard-content" id="hodMainContent">
                    <!-- Welcome Banner -->
                    <div class="welcome-banner">
                        <h1 class="welcome-title-large">Welcome, HOD ${currentUser.name}!</h1>
                        <p class="welcome-subtitle-large">Manage your department: ${currentUser.department}</p>
                    </div>
                    
                    <!-- Stats Grid - 4 boxes -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-users"></i></div>
                                <div><div class="stat-title">Total Students</div><div class="stat-value">${students.filter(s => s.program === currentUser.department).length}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                                <div><div class="stat-title">Total Faculty</div><div class="stat-value">${faculties.filter(f => f.department === currentUser.department).length}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-book"></i></div>
                                <div><div class="stat-title">Subjects</div><div class="stat-value">${subjects.filter(s => s.department === currentUser.department).length}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-star"></i></div>
                                <div><div class="stat-title">Feedbacks</div><div class="stat-value">${feedbacks.filter(f => f.department === currentUser.department).length}</div></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions - 4 buttons (Department field now first in each form) -->
                    <div class="modules-section" id="hodQuickActionsSection">
                        <h2 class="section-title"><i class="fas fa-bolt"></i> Quick Actions</h2>
                        <div class="quick-actions-grid" style="grid-template-columns:repeat(4,1fr);">
                            <button class="quick-action-btn btn-green" id="hodAddStudentBtn"><i class="fas fa-user-plus"></i><span>Add Student</span></button>
                            <button class="quick-action-btn btn-purple" id="hodCreateSubjectBtn"><i class="fas fa-book"></i><span>Create Subject</span></button>
                            <button class="quick-action-btn btn-teal" id="hodCreateFacultyBtn"><i class="fas fa-chalkboard-teacher"></i><span>Create Faculty</span></button>
                            <button class="quick-action-btn btn-amber" id="hodCreateFeedbackBtn"><i class="fas fa-star"></i><span>Create Feedback</span></button>
                        </div>
                    </div>
                    
                    <!-- Database Tables Section (like admin) -->
                    <div class="database-tables-section" id="hodDatabaseTablesSection">
                        <h2 class="section-title"><i class="fas fa-database"></i> Database Tables</h2>
                        <div class="table-tabs">
                            <button class="table-tab active" data-table="student">Student Master</button>
                            <button class="table-tab" data-table="subject">Subject Master</button>
                            <button class="table-tab" data-table="faculty">Faculty Master</button>
                            <button class="table-tab" data-table="feedback">Feedback Master</button>
                        </div>
                        
                        <!-- Student Table Container -->
                        <div class="table-container active" id="hodStudentTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>ID</th><th>Name</th><th>Enrollment</th><th>Year</th><th>Term</th><th>Mobile</th><th>Email</th><th>Actions</th></tr></thead>
                                        <tbody id="hodStudentTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Subject Table Container -->
                        <div class="table-container" id="hodSubjectTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Year</th><th>Term</th><th>Actions</th></tr></thead>
                                        <tbody id="hodSubjectTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Faculty Table Container -->
                        <div class="table-container" id="hodFacultyTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>ID</th><th>Name</th><th>Mobile</th><th>Email</th><th>Subject</th><th>Actions</th></tr></thead>
                                        <tbody id="hodFacultyTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Feedback Table Container (UPDATED columns) -->
                        <div class="table-container" id="hodFeedbackTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead>
                                            <tr>
                                                <th>Feedback ID</th>
                                                <th>Academic Year</th>
                                                <th>Student Name</th>
                                                <th>Enrollment Number</th>
                                                <th>Year</th>
                                                <th>Term</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="hodFeedbackTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <footer class="footer"><div class="footer-copyright">© 2025 EDU MASTER | All Rights Reserved</div></footer>
                </main>
            `;

            // Attach logout
            document.getElementById('hodLogoutBtn').addEventListener('click', handleLogout);

            // Attach quick action buttons
            document.getElementById('hodAddStudentBtn').addEventListener('click', () => {
                hodLastActionSource = 'quickActions';
                showHODModule('addStudent');
            });
            document.getElementById('hodCreateSubjectBtn').addEventListener('click', () => {
                hodLastActionSource = 'quickActions';
                showHODModule('createSubject');
            });
            document.getElementById('hodCreateFacultyBtn').addEventListener('click', () => {
                hodLastActionSource = 'quickActions';
                showHODModule('createFaculty');
            });
            document.getElementById('hodCreateFeedbackBtn').addEventListener('click', () => {
                hodLastActionSource = 'quickActions';
                showHODModule('createFeedback');
            });

            // Table tabs
            document.querySelectorAll('#hodMainContent .table-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const table = this.dataset.table;
                    document.querySelectorAll('#hodMainContent .table-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    document.querySelectorAll('#hodMainContent .table-container').forEach(c => c.classList.remove('active'));
                    document.getElementById(`hod${table.charAt(0).toUpperCase()+table.slice(1)}TableContainer`).classList.add('active');
                });
            });

            // Render tables
            renderHODStudentTable();
            renderHODSubjectTable();
            renderHODFacultyTable();
            renderHODFeedbackTable();

            // Show dashboard
            loginPage.style.opacity = '0';
            setTimeout(() => {
                loginPage.style.display = 'none';
                hodDashboard.style.display = 'block';
                hodDashboard.style.opacity = '1';
            }, 300);
        }

        // Render functions for HOD tables (with edit buttons)
        function renderHODStudentTable() {
            const tbody = document.getElementById('hodStudentTableBody');
            if (!tbody) return;
            const deptStudents = students.filter(s => s.program === currentUser.department);
            tbody.innerHTML = deptStudents.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.enrollment}</td>
                    <td>${s.classYear}</td>
                    <td>${s.term}</td>
                    <td>${s.mobile}</td>
                    <td>${s.email}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-student-hod" data-id="${s.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-student-hod" data-id="${s.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
            // Attach edit/delete
            document.querySelectorAll('.edit-student-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const student = students.find(s => s.id === id);
                    if (student) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('addStudent', student);
                    }
                });
            });
            document.querySelectorAll('.delete-student-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this student?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            students = students.filter(s => s.id !== id);
                            saveStudents();
                            renderHODStudentTable();
                            showToast('Success', 'Student deleted', 'success');
                        }
                    });
                });
            });
        }
        function renderHODSubjectTable() {
            const tbody = document.getElementById('hodSubjectTableBody');
            if (!tbody) return;
            const deptSubjects = subjects.filter(s => s.department === currentUser.department);
            tbody.innerHTML = deptSubjects.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.code}</td>
                    <td>${s.year}</td>
                    <td>${s.term}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-subject-hod" data-id="${s.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-subject-hod" data-id="${s.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
            document.querySelectorAll('.edit-subject-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const subject = subjects.find(s => s.id === id);
                    if (subject) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('createSubject', subject);
                    }
                });
            });
            document.querySelectorAll('.delete-subject-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this subject?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            subjects = subjects.filter(s => s.id !== id);
                            saveSubjects();
                            renderHODSubjectTable();
                            showToast('Success', 'Subject deleted', 'success');
                        }
                    });
                });
            });
        }
        function renderHODFacultyTable() {
            const tbody = document.getElementById('hodFacultyTableBody');
            if (!tbody) return;
            const deptFaculties = faculties.filter(f => f.department === currentUser.department);
            tbody.innerHTML = deptFaculties.map(f => {
                const sub = subjects.find(s => s.id === f.subjectId);
                return `<tr>
                    <td>${f.id}</td>
                    <td>${f.name}</td>
                    <td>${f.mobile}</td>
                    <td>${f.email}</td>
                    <td>${sub ? sub.name : ''}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-faculty-hod" data-id="${f.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-faculty-hod" data-id="${f.id}">Delete</button>
                    </td>
                </tr>`;
            }).join('');
            document.querySelectorAll('.edit-faculty-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const faculty = faculties.find(f => f.id === id);
                    if (faculty) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('createFaculty', faculty);
                    }
                });
            });
            document.querySelectorAll('.delete-faculty-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this faculty?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            faculties = faculties.filter(f => f.id !== id);
                            saveFaculties();
                            renderHODFacultyTable();
                            showToast('Success', 'Faculty deleted', 'success');
                        }
                    });
                });
            });
        }
        function renderHODFeedbackTable() {
            const tbody = document.getElementById('hodFeedbackTableBody');
            if (!tbody) return;
            const rows = [];
            feedbackResponses.forEach(resp => {
                const student = students.find(s => s.id === resp.studentId);
                const feedback = feedbacks.find(f => f.id === resp.feedbackId);
                if (student && feedback) {
                    rows.push(`
                        <tr>
                            <td>${feedback.id}</td>
                            <td>${getAcademicYearNameById(feedback.academicYear)}</td>
                            <td>${student.name}</td>
                            <td>${student.enrollment}</td>
                            <td>${feedback.year}</td>
                            <td>${feedback.term}</td>
                            <td class="actions">
                                <button class="btn btn-primary btn-sm view-feedback" data-id="${resp.feedbackId}" data-student="${student.id}">View</button>
                            </td>
                        </tr>
                    `);
                }
            });
            tbody.innerHTML = rows.join('');
        }

        // HOD Module display (forms) – with full implementation per requirements, now matching admin style
        let editingHODStudentId = null, editingHODSubjectId = null, editingHODFacultyId = null, editingHODFeedbackId = null;

        function showHODModule(module, item = null) {
            const area = document.getElementById('hodMainContent');
            // Scroll to top after content is loaded
            const scrollToTop = () => { if (area) area.scrollTop = 0; };

            if (module === 'addStudent') {
                editingHODStudentId = item ? item.id : null;
                area.innerHTML = `
                    <div class="module-header">
                        <button class="back-to-dashboard" id="backFromHodModule"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
                        <h2 class="section-title"><i class="fas fa-user-plus"></i> ${editingHODStudentId ? 'Edit' : 'Add'} Student</h2>
                    </div>
                    <div class="form-card">
                        <h3 class="mb-4">Student Details</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Department *</label>
                                <input type="text" class="search-input" value="${currentUser.department}" readonly disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Academic Year *</label>
                                <select class="search-input" id="hodStudentAcademicYear">
                                    <option value="">Select Academic Year</option>
                                    ${academicYears.filter(y => y.status === 'Active').map(y => `<option value="${y.id}" ${item && item.academicYear === y.id ? 'selected' : ''}>${y.name}</option>`).join('')}
                                </select>
                                <div id="hodStudentAcademicYearError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Year *</label>
                                <select class="search-input" id="hodStudentYear">
                                    <option value="">Select Year</option>
                                    <option value="First Year" ${item && item.classYear === 'First Year' ? 'selected' : ''}>First Year</option>
                                    <option value="Second Year" ${item && item.classYear === 'Second Year' ? 'selected' : ''}>Second Year</option>
                                    <option value="Third Year" ${item && item.classYear === 'Third Year' ? 'selected' : ''}>Third Year</option>
                                </select>
                                <div id="hodStudentYearError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Term *</label>
                                <select class="search-input" id="hodStudentTerm" disabled>
                                    <option value="">Select Year first</option>
                                </select>
                                <div id="hodStudentTermError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Full Name *</label>
                                <input type="text" class="search-input" id="hodStudentName" placeholder="Enter full name" value="${item ? item.name : ''}">
                                <div id="hodStudentNameError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Enrollment Number *</label>
                                <input type="text" class="search-input" id="hodStudentEnrollment" placeholder="Enter enrollment number" maxlength="15" value="${item ? item.enrollment : ''}">
                                <div id="hodStudentEnrollmentError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Mobile Number *</label>
                                <input type="text" class="search-input" id="hodStudentMobile" placeholder="Enter mobile number" value="${item ? item.mobile : ''}">
                                <div id="hodStudentMobileError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" class="search-input" id="hodStudentEmail" placeholder="Enter email" value="${item ? item.email : ''}">
                                <div id="hodStudentEmailError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Username (auto = Enrollment)</label>
                                <input type="text" class="search-input" id="hodStudentUsername" readonly value="${item ? item.enrollment : ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password (auto = Mobile)</label>
                                <input type="text" class="search-input" id="hodStudentPassword" readonly value="${item ? item.mobile : ''}">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" id="hodSaveStudentBtn"><i class="fas fa-save"></i> ${editingHODStudentId ? 'Update' : 'Add'} Student</button>
                            <button class="btn btn-secondary" id="hodCancelStudentBtn"><i class="fas fa-times"></i> Cancel</button>
                        </div>
                    </div>
                    <div class="database-tables-section">
                        <h3 class="section-title">Student List</h3>
                        <div class="data-table-container">
                            <div class="data-table-wrapper">
                                <table class="data-table">
                                    <thead><tr><th>ID</th><th>Name</th><th>Enrollment</th><th>Year</th><th>Term</th><th>Mobile</th><th>Email</th><th>Actions</th></tr></thead>
                                    <tbody id="hodStudentListBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('hodStudentYear').addEventListener('change', function() {
                    const termSelect = document.getElementById('hodStudentTerm');
                    const year = this.value;
                    termSelect.innerHTML = '<option value="">Select Term</option>';
                    if (year === 'First Year') {
                        termSelect.innerHTML += '<option value="Term 1">Term 1</option><option value="Term 2">Term 2</option>';
                    } else if (year === 'Second Year') {
                        termSelect.innerHTML += '<option value="Term 3">Term 3</option><option value="Term 4">Term 4</option>';
                    } else if (year === 'Third Year') {
                        termSelect.innerHTML += '<option value="Term 5">Term 5</option><option value="Term 6">Term 6</option>';
                    }
                    termSelect.disabled = false;
                    if (item && item.term) {
                        setTimeout(() => { termSelect.value = item.term; }, 100);
                    }
                });
                if (item && item.classYear) {
                    setTimeout(() => {
                        const event = new Event('change');
                        document.getElementById('hodStudentYear').dispatchEvent(event);
                    }, 100);
                }
                document.getElementById('hodStudentEnrollment').addEventListener('input', function() {
                    document.getElementById('hodStudentUsername').value = this.value;
                });
                document.getElementById('hodStudentMobile').addEventListener('input', function() {
                    document.getElementById('hodStudentPassword').value = this.value;
                });
                document.getElementById('hodSaveStudentBtn').addEventListener('click', saveHODStudent);
                document.getElementById('hodCancelStudentBtn').addEventListener('click', () => showHODDashboardWithScroll());
                document.getElementById('backFromHodModule').addEventListener('click', () => showHODDashboardWithScroll());
                renderHODStudentList();

                // Setup real-time validation
                setupAlphaValidation('hodStudentName');
                setupNumericValidation('hodStudentEnrollment');
                setupNumericValidation('hodStudentMobile');
                setupEmailLowercase('hodStudentEmail');

                scrollToTop();
            } else if (module === 'createSubject') {
                editingHODSubjectId = item ? item.id : null;
                area.innerHTML = `
                    <div class="module-header">
                        <button class="back-to-dashboard" id="backFromHodModule"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
                        <h2 class="section-title"><i class="fas fa-book"></i> ${editingHODSubjectId ? 'Edit' : 'Create'} Subject</h2>
                    </div>
                    <div class="form-card">
                        <h3 class="mb-4">Subject Details</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Department *</label>
                                <input type="text" class="search-input" value="${currentUser.department}" readonly disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Year *</label>
                                <select class="search-input" id="hodSubjectYear">
                                    <option value="">Select Year</option>
                                    <option value="First Year" ${item && item.year === 'First Year' ? 'selected' : ''}>First Year</option>
                                    <option value="Second Year" ${item && item.year === 'Second Year' ? 'selected' : ''}>Second Year</option>
                                    <option value="Third Year" ${item && item.year === 'Third Year' ? 'selected' : ''}>Third Year</option>
                                </select>
                                <div id="hodSubjectYearError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Term *</label>
                                <select class="search-input" id="hodSubjectTerm" disabled>
                                    <option value="">Select Year first</option>
                                </select>
                                <div id="hodSubjectTermError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Subject Name *</label>
                                <input type="text" class="search-input" id="hodSubjectName" placeholder="Enter subject name" value="${item ? item.name : ''}">
                                <div id="hodSubjectNameError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Subject Mode *</label>
                                <select class="search-input" id="hodSubjectMode">
                                    <option value="">Select Mode</option>
                                    <option value="Theory" ${item && item.mode === 'Theory' ? 'selected' : ''}>Theory</option>
                                    <option value="Non Theory" ${item && item.mode === 'Non Theory' ? 'selected' : ''}>Non Theory</option>
                                </select>
                                <div id="hodSubjectModeError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Subject Code *</label>
                                <input type="text" class="search-input" id="hodSubjectCode" placeholder="Enter subject code" value="${item ? item.code : ''}">
                                <div id="hodSubjectCodeError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" id="hodSaveSubjectBtn"><i class="fas fa-save"></i> ${editingHODSubjectId ? 'Update' : 'Create'} Subject</button>
                            <button class="btn btn-secondary" id="hodCancelSubjectBtn"><i class="fas fa-times"></i> Cancel</button>
                        </div>
                    </div>
                    <div class="database-tables-section">
                        <h3 class="section-title">Subject List</h3>
                        <div class="data-table-container">
                            <div class="data-table-wrapper">
                                <table class="data-table">
                                    <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Year</th><th>Term</th><th>Mode</th><th>Actions</th></tr></thead>
                                    <tbody id="hodSubjectListBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('hodSubjectYear').addEventListener('change', function() {
                    const termSelect = document.getElementById('hodSubjectTerm');
                    const year = this.value;
                    termSelect.innerHTML = '<option value="">Select Term</option>';
                    if (year === 'First Year') {
                        termSelect.innerHTML += '<option value="Term 1">Term 1</option><option value="Term 2">Term 2</option>';
                    } else if (year === 'Second Year') {
                        termSelect.innerHTML += '<option value="Term 3">Term 3</option><option value="Term 4">Term 4</option>';
                    } else if (year === 'Third Year') {
                        termSelect.innerHTML += '<option value="Term 5">Term 5</option><option value="Term 6">Term 6</option>';
                    }
                    termSelect.disabled = false;
                    if (item && item.term) {
                        setTimeout(() => { termSelect.value = item.term; }, 100);
                    }
                });
                if (item && item.year) {
                    setTimeout(() => {
                        const event = new Event('change');
                        document.getElementById('hodSubjectYear').dispatchEvent(event);
                    }, 100);
                }
                document.getElementById('hodSaveSubjectBtn').addEventListener('click', saveHODSubject);
                document.getElementById('hodCancelSubjectBtn').addEventListener('click', () => showHODDashboardWithScroll());
                document.getElementById('backFromHodModule').addEventListener('click', () => showHODDashboardWithScroll());
                renderHODSubjectList();

                // Setup real-time validation
                setupAlphaValidation('hodSubjectName');
                setupNumericValidation('hodSubjectCode');

                scrollToTop();
            } else if (module === 'createFaculty') {
                editingHODFacultyId = item ? item.id : null;
                area.innerHTML = `
                    <div class="module-header">
                        <button class="back-to-dashboard" id="backFromHodModule"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
                        <h2 class="section-title"><i class="fas fa-chalkboard-teacher"></i> ${editingHODFacultyId ? 'Edit' : 'Create'} Faculty</h2>
                    </div>
                    <div class="form-card">
                        <h3 class="mb-4">Faculty Details</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Department *</label>
                                <input type="text" class="search-input" value="${currentUser.department}" readonly disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Academic Year *</label>
                                <select class="search-input" id="hodFacultyAcademicYear">
                                    <option value="">Select Academic Year</option>
                                    ${academicYears.filter(y => y.status === 'Active').map(y => `<option value="${y.id}" ${item && item.academicYear === y.id ? 'selected' : ''}>${y.name}</option>`).join('')}
                                </select>
                                <div id="hodFacultyAcademicYearError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Faculty Name *</label>
                                <input type="text" class="search-input" id="hodFacultyName" placeholder="Enter faculty name" value="${item ? item.name : ''}">
                                <div id="hodFacultyNameError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Subject *</label>
                                <select class="search-input" id="hodFacultySubject">
                                    <option value="">Select Subject</option>
                                    ${subjects.filter(s => s.department === currentUser.department).map(s => `<option value="${s.id}" ${item && item.subjectId === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                                </select>
                                <div id="hodFacultySubjectError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Mobile Number *</label>
                                <input type="text" class="search-input" id="hodFacultyMobile" placeholder="Enter mobile number" value="${item ? item.mobile : ''}">
                                <div id="hodFacultyMobileError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" class="search-input" id="hodFacultyEmail" placeholder="Enter email" value="${item ? item.email : ''}">
                                <div id="hodFacultyEmailError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" id="hodSaveFacultyBtn"><i class="fas fa-save"></i> ${editingHODFacultyId ? 'Update' : 'Create'} Faculty</button>
                            <button class="btn btn-secondary" id="hodCancelFacultyBtn"><i class="fas fa-times"></i> Cancel</button>
                        </div>
                    </div>
                    <div class="database-tables-section">
                        <h3 class="section-title">Faculty List</h3>
                        <div class="data-table-container">
                            <div class="data-table-wrapper">
                                <table class="data-table">
                                    <thead><tr><th>ID</th><th>Name</th><th>Mobile</th><th>Email</th><th>Subject</th><th>Actions</th></tr></thead>
                                    <tbody id="hodFacultyListBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('hodSaveFacultyBtn').addEventListener('click', saveHODFaculty);
                document.getElementById('hodCancelFacultyBtn').addEventListener('click', () => showHODDashboardWithScroll());
                document.getElementById('backFromHodModule').addEventListener('click', () => showHODDashboardWithScroll());
                renderHODFacultyList();

                // Setup real-time validation
                setupAlphaCommaValidation('hodFacultyName');
                setupNumericValidation('hodFacultyMobile');
                setupEmailLowercase('hodFacultyEmail');

                scrollToTop();
            } else if (module === 'createFeedback') {
                editingHODFeedbackId = item ? item.id : null;
                area.innerHTML = `
                    <div class="module-header">
                        <button class="back-to-dashboard" id="backFromHodModule"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
                        <h2 class="section-title"><i class="fas fa-star"></i> ${editingHODFeedbackId ? 'Edit' : 'Create'} Feedback</h2>
                    </div>
                    <div class="form-card">
                        <h3 class="mb-4">Feedback Details</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Department *</label>
                                <input type="text" class="search-input" value="${currentUser.department}" readonly disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Academic Year *</label>
                                <select class="search-input" id="hodFeedbackAcademicYear">
                                    <option value="">Select Academic Year</option>
                                    ${academicYears.filter(y => y.status === 'Active').map(y => `<option value="${y.id}" ${item && item.academicYear === y.id ? 'selected' : ''}>${y.name}</option>`).join('')}
                                </select>
                                <div id="hodFeedbackAcademicYearError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Year *</label>
                                <select class="search-input" id="hodFeedbackYear">
                                    <option value="">Select Year</option>
                                    <option value="First Year" ${item && item.year === 'First Year' ? 'selected' : ''}>First Year</option>
                                    <option value="Second Year" ${item && item.year === 'Second Year' ? 'selected' : ''}>Second Year</option>
                                    <option value="Third Year" ${item && item.year === 'Third Year' ? 'selected' : ''}>Third Year</option>
                                </select>
                                <div id="hodFeedbackYearError" class="error-message"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Term *</label>
                                <select class="search-input" id="hodFeedbackTerm" disabled>
                                    <option value="">Select Year first</option>
                                </select>
                                <div id="hodFeedbackTermError" class="error-message"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Feedback Form Name *</label>
                                <input type="text" class="search-input" id="hodFeedbackName" placeholder="Enter feedback name" value="${item ? item.name : ''}">
                                <div id="hodFeedbackNameError" class="error-message"></div>
                            </div>
                        </div>
                        <!-- FEEDBACK TABLE INSERTED HERE (automatically appears after name) -->
                        <div id="hodFeedbackTableContainerDynamic" style="margin-top:30px;">
                            <h4 class="mb-3">Feedback Evaluation Table</h4>
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table" id="hodFeedbackCriteriaTable">
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Name of Course (TH/PR)</th>
                                                <th>Name of Faculty</th>
                                                <th>Coverage of syllabus</th>
                                                <th>Covering relevant topics beyond syllabus</th>
                                                <th>Effectiveness in terms of technical course contents</th>
                                                <th>Effectiveness in terms of communication skills</th>
                                                <th>Effectiveness in terms of teaching aids</th>
                                                <th>Motivation and inspiration for students to learn in self-learning mode</th>
                                                <th>Support for development of student skills – Practical performance</th>
                                                <th>Support for development of student skills – Project and seminar preparation</th>
                                                <th>Feedback provided on student progress</th>
                                                <th>Punctuality and discipline</th>
                                                <th>Domain knowledge</th>
                                                <th>Interaction with students</th>
                                                <th>Ability to resolve difficulties</th>
                                                <th>Encourage to participate in co-curricular activities</th>
                                                <th>Encourage to participate in extracurricular activities</th>
                                                <th>Guidance during internship</th>
                                                <th>Total (Max 80)</th>
                                            </tr>
                                        </thead>
                                        <tbody id="hodFeedbackCriteriaBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions" style="margin-top:20px;">
                            <button class="btn btn-primary" id="hodSaveFeedbackBtn"><i class="fas fa-save"></i> ${editingHODFeedbackId ? 'Update' : 'Create'} Feedback</button>
                            <button class="btn btn-secondary" id="hodCancelFeedbackBtn"><i class="fas fa-times"></i> Cancel</button>
                        </div>
                    </div>
                    <div class="database-tables-section">
                        <h3 class="section-title">Feedback List</h3>
                        <div class="data-table-container">
                            <div class="data-table-wrapper">
                                <table class="data-table">
                                    <thead><tr><th>ID</th><th>Name</th><th>Year</th><th>Term</th><th>Actions</th></tr></thead>
                                    <tbody id="hodFeedbackListBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('hodFeedbackYear').addEventListener('change', function() {
                    const termSelect = document.getElementById('hodFeedbackTerm');
                    const year = this.value;
                    termSelect.innerHTML = '<option value="">Select Term</option>';
                    if (year === 'First Year') {
                        termSelect.innerHTML += '<option value="Term 1">Term 1</option><option value="Term 2">Term 2</option>';
                    } else if (year === 'Second Year') {
                        termSelect.innerHTML += '<option value="Term 3">Term 3</option><option value="Term 4">Term 4</option>';
                    } else if (year === 'Third Year') {
                        termSelect.innerHTML += '<option value="Term 5">Term 5</option><option value="Term 6">Term 6</option>';
                    }
                    termSelect.disabled = false;
                    if (item && item.term) {
                        setTimeout(() => { termSelect.value = item.term; }, 100);
                    }
                    // When term changes, also refresh the criteria table
                    refreshHODFeedbackTable();
                });
                document.getElementById('hodFeedbackAcademicYear').addEventListener('change', refreshHODFeedbackTable);
                document.getElementById('hodFeedbackYear').addEventListener('change', refreshHODFeedbackTable);
                document.getElementById('hodFeedbackTerm').addEventListener('change', refreshHODFeedbackTable);
                if (item && item.year) {
                    setTimeout(() => {
                        const event = new Event('change');
                        document.getElementById('hodFeedbackYear').dispatchEvent(event);
                    }, 100);
                }
                // Refresh table function
                function refreshHODFeedbackTable() {
                    const acYear = document.getElementById('hodFeedbackAcademicYear').value;
                    const year = document.getElementById('hodFeedbackYear').value;
                    const term = document.getElementById('hodFeedbackTerm').value;
                    const tbody = document.getElementById('hodFeedbackCriteriaBody');
                    if (!acYear || !year || !term) {
                        tbody.innerHTML = '<tr><td colspan="20" class="text-center">Select Academic Year, Year and Term to load subjects</td></tr>';
                        return;
                    }
                    // Load subjects for this department, year, term
                    const deptSubjects = subjects.filter(s => s.department === currentUser.department && s.year === year && s.term === term);
                    if (deptSubjects.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="20" class="text-center">No subjects found for selected Year/Term</td></tr>';
                        return;
                    }
                    // Load faculties for this department and academic year
                    const deptFaculties = faculties.filter(f => f.department === currentUser.department && f.academicYear === acYear);
                    const allSubjects = subjects.filter(s => s.department === currentUser.department); // for dropdown
                    const allFaculties = faculties.filter(f => f.department === currentUser.department); // for dropdown

                    let rows = '';
                    deptSubjects.forEach((sub, index) => {
                        // For each subject, create a row. Subject dropdown pre-selected to this subject, but HOD can change.
                        rows += `<tr>
                            <td>${index+1}</td>
                            <td>
                                <select class="search-input" style="min-width:150px;" data-row-subject="${index}" id="subjectSelect_${index}">
                                    ${allSubjects.map(s => `<option value="${s.id}" ${s.id === sub.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                                </select>
                            </td>
                            <td>
                                <select class="search-input" style="min-width:150px;" data-row-faculty="${index}" id="facultySelect_${index}">
                                    <option value="">Select Faculty</option>
                                    ${allFaculties.map(f => `<option value="${f.id}" ${item && item.rows && item.rows[index] && item.rows[index].facultyId === f.id ? 'selected' : ''}>${f.name}</option>`).join('')}
                                </select>
                            </td>
                            <td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
                        </tr>`;
                    });
                    tbody.innerHTML = rows;
                    // If editing existing feedback, pre-select faculties from item.rows
                    if (item && item.rows) {
                        item.rows.forEach((rowData, idx) => {
                            const facSelect = document.getElementById(`facultySelect_${idx}`);
                            if (facSelect) facSelect.value = rowData.facultyId || '';
                        });
                    }
                }
                document.getElementById('hodSaveFeedbackBtn').addEventListener('click', saveHODFeedback);
                document.getElementById('hodCancelFeedbackBtn').addEventListener('click', () => showHODDashboardWithScroll());
                document.getElementById('backFromHodModule').addEventListener('click', () => showHODDashboardWithScroll());
                renderHODFeedbackList();

                // Setup real-time validation
                setupAlphaCommaValidation('hodFeedbackName');

                scrollToTop();
            }
        }

        // Save HOD Feedback with rows
        function saveHODFeedback() {
            const acYear = document.getElementById('hodFeedbackAcademicYear').value;
            const year = document.getElementById('hodFeedbackYear').value;
            const term = document.getElementById('hodFeedbackTerm').value;
            const name = document.getElementById('hodFeedbackName').value.trim();

            let valid = true;
            if (!acYear) { showFieldError(document.getElementById('hodFeedbackAcademicYear'), document.getElementById('hodFeedbackAcademicYearError'), 'Required'); valid = false; }
            if (!year) { showFieldError(document.getElementById('hodFeedbackYear'), document.getElementById('hodFeedbackYearError'), 'Required'); valid = false; }
            if (!term) { showFieldError(document.getElementById('hodFeedbackTerm'), document.getElementById('hodFeedbackTermError'), 'Required'); valid = false; }
            if (!name) { showFieldError(document.getElementById('hodFeedbackName'), document.getElementById('hodFeedbackNameError'), 'Required'); valid = false; }
            if (!valid) return;

            // Collect rows from table
            const rows = [];
            const tbody = document.getElementById('hodFeedbackCriteriaBody');
            if (!tbody) return;
            const subjectSelects = tbody.querySelectorAll('select[id^="subjectSelect_"]');
            const facultySelects = tbody.querySelectorAll('select[id^="facultySelect_"]');
            for (let i = 0; i < subjectSelects.length; i++) {
                const subjectId = subjectSelects[i].value;
                const facultyId = facultySelects[i] ? facultySelects[i].value : '';
                rows.push({ subjectId, facultyId });
            }

            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingHODFeedbackId) {
                const index = feedbacks.findIndex(f => f.id === editingHODFeedbackId);
                if (index !== -1) {
                    feedbacks[index] = { ...feedbacks[index], name, academicYear: acYear, year, term, rows, updated_at: today };
                    saveFeedbacks();
                    showToast('Success', 'Feedback updated', 'success');
                }
            } else {
                const newId = `FDB${String(feedbacks.length + 1).padStart(3, '0')}`;
                feedbacks.push({
                    id: newId,
                    name,
                    department: currentUser.department,
                    academicYear: acYear,
                    year,
                    term,
                    rows,
                    created_at: today
                });
                saveFeedbacks();
                showToast('Success', 'Feedback created', 'success');
            }
            showHODDashboardWithScroll();
        }
        function renderHODFeedbackList() {
            const tbody = document.getElementById('hodFeedbackListBody');
            if (!tbody) return;
            const deptFeedbacks = feedbacks.filter(f => f.department === currentUser.department);
            tbody.innerHTML = deptFeedbacks.map(f => {
                return `<tr>
                    <td>${f.id}</td>
                    <td>${f.name}</td>
                    <td>${f.year}</td>
                    <td>${f.term}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-feedback-hod" data-id="${f.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-feedback-hod" data-id="${f.id}">Delete</button>
                    </td>
                </tr>`;
            }).join('');
            document.querySelectorAll('.edit-feedback-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const feedback = feedbacks.find(f => f.id === id);
                    if (feedback) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('createFeedback', feedback);
                    }
                });
            });
            document.querySelectorAll('.delete-feedback-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this feedback?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            feedbacks = feedbacks.filter(f => f.id !== id);
                            saveFeedbacks();
                            renderHODFeedbackList();
                            showToast('Success', 'Feedback deleted', 'success');
                        }
                    });
                });
            });
        }

        // Other HOD save functions (unchanged) ...
        function saveHODStudent() {
            const acYear = document.getElementById('hodStudentAcademicYear').value;
            const year = document.getElementById('hodStudentYear').value;
            const term = document.getElementById('hodStudentTerm').value;
            const name = document.getElementById('hodStudentName').value.trim();
            const enrollment = document.getElementById('hodStudentEnrollment').value.trim();
            const mobile = document.getElementById('hodStudentMobile').value.trim();
            const email = document.getElementById('hodStudentEmail').value.trim().toLowerCase();

            let valid = true;
            if (!acYear) { showFieldError(document.getElementById('hodStudentAcademicYear'), document.getElementById('hodStudentAcademicYearError'), 'Required'); valid = false; }
            if (!year) { showFieldError(document.getElementById('hodStudentYear'), document.getElementById('hodStudentYearError'), 'Required'); valid = false; }
            if (!term) { showFieldError(document.getElementById('hodStudentTerm'), document.getElementById('hodStudentTermError'), 'Required'); valid = false; }
            if (!name) { showFieldError(document.getElementById('hodStudentName'), document.getElementById('hodStudentNameError'), 'Required'); valid = false; }
            if (!enrollment) { showFieldError(document.getElementById('hodStudentEnrollment'), document.getElementById('hodStudentEnrollmentError'), 'Required'); valid = false; }
            if (!mobile || !/^\d{10}$/.test(mobile)) { showFieldError(document.getElementById('hodStudentMobile'), document.getElementById('hodStudentMobileError'), '10 digits required'); valid = false; }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError(document.getElementById('hodStudentEmail'), document.getElementById('hodStudentEmailError'), 'Invalid email'); valid = false; }
            if (!valid) return;

            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingHODStudentId) {
                const index = students.findIndex(s => s.id === editingHODStudentId);
                if (index !== -1) {
                    students[index] = { ...students[index], name, enrollment, academicYear: acYear, classYear: year, term, mobile, email, updated_at: today };
                    saveStudents();
                    showToast('Success', 'Student updated', 'success');
                }
            } else {
                const newId = `STU${String(students.length + 1).padStart(3, '0')}`;
                students.push({
                    id: newId,
                    name,
                    enrollment,
                    program: currentUser.department,
                    academicYear: acYear,
                    classYear: year,
                    term,
                    mobile,
                    email,
                    password: mobile,
                    firstLogin: true,
                    created_at: today,
                    updated_at: today
                });
                saveStudents();
                showToast('Success', 'Student added', 'success');
            }
            showHODDashboardWithScroll();
        }
        function renderHODStudentList() {
            const tbody = document.getElementById('hodStudentListBody');
            if (!tbody) return;
            const deptStudents = students.filter(s => s.program === currentUser.department);
            tbody.innerHTML = deptStudents.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.enrollment}</td>
                    <td>${s.classYear}</td>
                    <td>${s.term}</td>
                    <td>${s.mobile}</td>
                    <td>${s.email}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-student-hod" data-id="${s.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-student-hod" data-id="${s.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
            document.querySelectorAll('.edit-student-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const student = students.find(s => s.id === id);
                    if (student) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('addStudent', student);
                    }
                });
            });
            document.querySelectorAll('.delete-student-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this student?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            students = students.filter(s => s.id !== id);
                            saveStudents();
                            renderHODStudentList();
                            showToast('Success', 'Student deleted', 'success');
                        }
                    });
                });
            });
        }

        function saveHODSubject() {
            const year = document.getElementById('hodSubjectYear').value;
            const term = document.getElementById('hodSubjectTerm').value;
            const name = document.getElementById('hodSubjectName').value.trim();
            const mode = document.getElementById('hodSubjectMode').value;
            const code = document.getElementById('hodSubjectCode').value.trim();

            let valid = true;
            if (!year) { showFieldError(document.getElementById('hodSubjectYear'), document.getElementById('hodSubjectYearError'), 'Required'); valid = false; }
            if (!term) { showFieldError(document.getElementById('hodSubjectTerm'), document.getElementById('hodSubjectTermError'), 'Required'); valid = false; }
            if (!name) { showFieldError(document.getElementById('hodSubjectName'), document.getElementById('hodSubjectNameError'), 'Required'); valid = false; }
            if (!mode) { showFieldError(document.getElementById('hodSubjectMode'), document.getElementById('hodSubjectModeError'), 'Required'); valid = false; }
            if (!code) { showFieldError(document.getElementById('hodSubjectCode'), document.getElementById('hodSubjectCodeError'), 'Required'); valid = false; }
            if (!valid) return;

            if (editingHODSubjectId) {
                const index = subjects.findIndex(s => s.id === editingHODSubjectId);
                if (index !== -1) {
                    subjects[index] = { ...subjects[index], name, code, year, term, mode };
                    saveSubjects();
                    showToast('Success', 'Subject updated', 'success');
                }
            } else {
                const newId = `SUB${String(subjects.length + 1).padStart(3, '0')}`;
                subjects.push({
                    id: newId,
                    name,
                    code,
                    department: currentUser.department,
                    year,
                    term,
                    mode
                });
                saveSubjects();
                showToast('Success', 'Subject created', 'success');
            }
            showHODDashboardWithScroll();
        }
        function renderHODSubjectList() {
            const tbody = document.getElementById('hodSubjectListBody');
            if (!tbody) return;
            const deptSubjects = subjects.filter(s => s.department === currentUser.department);
            tbody.innerHTML = deptSubjects.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.code}</td>
                    <td>${s.year}</td>
                    <td>${s.term}</td>
                    <td>${s.mode}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-subject-hod" data-id="${s.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-subject-hod" data-id="${s.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
            document.querySelectorAll('.edit-subject-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const subject = subjects.find(s => s.id === id);
                    if (subject) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('createSubject', subject);
                    }
                });
            });
            document.querySelectorAll('.delete-subject-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this subject?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            subjects = subjects.filter(s => s.id !== id);
                            saveSubjects();
                            renderHODSubjectList();
                            showToast('Success', 'Subject deleted', 'success');
                        }
                    });
                });
            });
        }

        function saveHODFaculty() {
            const acYear = document.getElementById('hodFacultyAcademicYear').value;
            const name = document.getElementById('hodFacultyName').value.trim();
            const subjectId = document.getElementById('hodFacultySubject').value;
            const mobile = document.getElementById('hodFacultyMobile').value.trim();
            const email = document.getElementById('hodFacultyEmail').value.trim().toLowerCase();

            let valid = true;
            if (!acYear) { showFieldError(document.getElementById('hodFacultyAcademicYear'), document.getElementById('hodFacultyAcademicYearError'), 'Required'); valid = false; }
            if (!name) { showFieldError(document.getElementById('hodFacultyName'), document.getElementById('hodFacultyNameError'), 'Required'); valid = false; }
            if (!subjectId) { showFieldError(document.getElementById('hodFacultySubject'), document.getElementById('hodFacultySubjectError'), 'Required'); valid = false; }
            if (!mobile || !/^\d{10}$/.test(mobile)) { showFieldError(document.getElementById('hodFacultyMobile'), document.getElementById('hodFacultyMobileError'), '10 digits required'); valid = false; }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError(document.getElementById('hodFacultyEmail'), document.getElementById('hodFacultyEmailError'), 'Invalid email'); valid = false; }
            if (!valid) return;

            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingHODFacultyId) {
                const index = faculties.findIndex(f => f.id === editingHODFacultyId);
                if (index !== -1) {
                    faculties[index] = { ...faculties[index], name, mobile, email, subjectId, academicYear: acYear, updated_at: today };
                    saveFaculties();
                    showToast('Success', 'Faculty updated', 'success');
                }
            } else {
                const newId = `FAC${String(faculties.length + 1).padStart(3, '0')}`;
                faculties.push({
                    id: newId,
                    name,
                    department: currentUser.department,
                    mobile,
                    email,
                    subjectId,
                    academicYear: acYear,
                    created_at: today
                });
                saveFaculties();
                showToast('Success', 'Faculty created', 'success');
            }
            showHODDashboardWithScroll();
        }
        function renderHODFacultyList() {
            const tbody = document.getElementById('hodFacultyListBody');
            if (!tbody) return;
            const deptFaculties = faculties.filter(f => f.department === currentUser.department);
            tbody.innerHTML = deptFaculties.map(f => {
                const sub = subjects.find(s => s.id === f.subjectId);
                return `<tr>
                    <td>${f.id}</td>
                    <td>${f.name}</td>
                    <td>${f.mobile}</td>
                    <td>${f.email}</td>
                    <td>${sub ? sub.name : ''}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm edit-faculty-hod" data-id="${f.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-faculty-hod" data-id="${f.id}">Delete</button>
                    </td>
                </tr>`;
            }).join('');
            document.querySelectorAll('.edit-faculty-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const faculty = faculties.find(f => f.id === id);
                    if (faculty) {
                        hodLastActionSource = 'databaseTables';
                        showHODModule('createFaculty', faculty);
                    }
                });
            });
            document.querySelectorAll('.delete-faculty-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this faculty?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            faculties = faculties.filter(f => f.id !== id);
                            saveFaculties();
                            renderHODFacultyList();
                            showToast('Success', 'Faculty deleted', 'success');
                        }
                    });
                });
            });
        }

        function showHODDashboardWithScroll() {
            showHODDashboard();
            setTimeout(() => {
                const hodMain = document.getElementById('hodMainContent');
                if (hodLastActionSource === 'quickActions') {
                    document.getElementById('hodQuickActionsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    document.getElementById('hodDatabaseTablesSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        // ==================== MODIFIED STUDENT DASHBOARD ====================
        // New function to handle student password change on first login
        let studentPasswordChangeMode = false;

        function showStudentDashboard() {
            if (currentUser.firstLogin) {
                showStudentPasswordChange();
            } else {
                showStudentMainDashboard();
            }
        }

        function showStudentPasswordChange() {
            studentDashboard.innerHTML = `
                <div style="height:100vh; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
                    <div class="form-card" style="max-width:500px; width:90%;">
                        <h2 class="section-title" style="justify-content:center;">Change Your Password (Required)</h2>
                        <div class="form-group">
                            <label class="form-label">Create New Password</label>
                            <div class="password-field-wrapper">
                                <input type="password" class="search-input" id="studentNewPassword" placeholder="Enter new password">
                                <button type="button" class="toggle-password" id="toggleStudentNewPassword">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            <div id="studentNewPasswordError" class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Confirm Password</label>
                            <div class="password-field-wrapper">
                                <input type="password" class="search-input" id="studentConfirmPassword" placeholder="Confirm new password">
                                <button type="button" class="toggle-password" id="toggleStudentConfirmPassword">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            <div id="studentConfirmPasswordError" class="error-message"></div>
                        </div>
                        <div class="password-requirements">
                            Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and minimum 8 characters.
                        </div>
                        <div class="form-actions" style="justify-content:center;">
                            <button class="btn btn-primary" id="studentChangePasswordBtn">Change Password</button>
                        </div>
                    </div>
                </div>
            `;
            setupPasswordToggle('toggleStudentNewPassword', 'studentNewPassword');
            setupPasswordToggle('toggleStudentConfirmPassword', 'studentConfirmPassword');
            document.getElementById('studentChangePasswordBtn').addEventListener('click', () => {
                const newPass = document.getElementById('studentNewPassword').value;
                const confirmPass = document.getElementById('studentConfirmPassword').value;
                const newErr = document.getElementById('studentNewPasswordError');
                const confirmErr = document.getElementById('studentConfirmPasswordError');
                const newInput = document.getElementById('studentNewPassword');
                const confirmInput = document.getElementById('studentConfirmPassword');

                // Clear previous errors
                clearFieldError(newInput, newErr);
                clearFieldError(confirmInput, confirmErr);

                if (!newPass) {
                    showFieldError(newInput, newErr, 'Password is required');
                    return;
                }
                if (!confirmPass) {
                    showFieldError(confirmInput, confirmErr, 'Please confirm password');
                    return;
                }
                if (newPass !== confirmPass) {
                    showFieldError(confirmInput, confirmErr, 'Passwords do not match');
                    return;
                }
                if (!isStrongPassword(newPass)) {
                    showFieldError(newInput, newErr, 'Password does not meet requirements');
                    return;
                }
                if (newPass === currentUser.mobile) {
                    showFieldError(newInput, newErr, 'Old password cannot be used');
                    return;
                }

                // Update student password in database
                const studentIndex = students.findIndex(s => s.id === currentUser.id);
                if (studentIndex !== -1) {
                    students[studentIndex].password = newPass;
                    students[studentIndex].firstLogin = false;
                    saveStudents();
                    currentUser.password = newPass;
                    currentUser.firstLogin = false;
                    showToast('Password changed successfully. Please login again.', 'Success', 'success');
                    setTimeout(() => handleLogout(), 2000);
                }
            });
            loginPage.style.opacity = '0';
            setTimeout(() => {
                loginPage.style.display = 'none';
                studentDashboard.style.display = 'block';
                studentDashboard.style.opacity = '1';
            }, 300);
        }

        function showStudentMainDashboard() {
            studentDashboard.innerHTML = `
                <!-- Top navbar like admin -->
                <nav class="dashboard-navbar">
                    <div class="dashboard-logo">EDU MASTER</div>
                    <div class="dashboard-user">
                        <div class="user-info">
                            <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                            <div class="user-details">
                                <div class="user-name">${currentUser.name}</div>
                                <div class="user-role">Student (${currentUser.program})</div>
                            </div>
                        </div>
                        <button class="logout-btn" id="studentLogoutBtn">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </nav>
                
                <main class="dashboard-content" id="studentMainContent">
                    <!-- Welcome Banner -->
                    <div class="welcome-banner">
                        <h1 class="welcome-title-large">Welcome, ${currentUser.name}!</h1>
                        <p class="welcome-subtitle-large">Your academic dashboard</p>
                    </div>
                    
                    <!-- Stats Grid - 4 boxes -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-calendar-alt"></i></div>
                                <div><div class="stat-title">Academic Year</div><div class="stat-value">${getAcademicYearNameById(currentUser.academicYear)}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-layer-group"></i></div>
                                <div><div class="stat-title">Class Year</div><div class="stat-value">${currentUser.classYear}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-tag"></i></div>
                                <div><div class="stat-title">Term</div><div class="stat-value">${currentUser.term}</div></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-header">
                                <div class="stat-icon"><i class="fas fa-book-open"></i></div>
                                <div><div class="stat-title">Subjects</div><div class="stat-value">${subjects.filter(s => s.department === currentUser.program && s.year === currentUser.classYear && s.term === currentUser.term).length}</div></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions - including Feedback Form -->
                    <div class="modules-section" id="studentQuickActionsSection">
                        <h2 class="section-title"><i class="fas fa-bolt"></i> Quick Actions</h2>
                        <div class="quick-actions-grid" style="grid-template-columns:repeat(4,1fr);">
                            <button class="quick-action-btn btn-amber" id="studentFeedbackFormBtn"><i class="fas fa-star"></i><span>Feedback Form</span></button>
                        </div>
                    </div>
                    
                    <!-- Database Tables Section (Student area order: Student, Subject, Faculty, Feedback) -->
                    <div class="database-tables-section" id="studentDatabaseTablesSection">
                        <h2 class="section-title"><i class="fas fa-database"></i> Database Tables</h2>
                        <div class="table-tabs">
                            <button class="table-tab active" data-table="student">Student Master</button>
                            <button class="table-tab" data-table="subject">Subject Master</button>
                            <button class="table-tab" data-table="faculty">Faculty Master</button>
                            <button class="table-tab" data-table="feedback">Feedback Master</button>
                        </div>
                        
                        <!-- Student Table Container (self info) -->
                        <div class="table-container active" id="studentStudentTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>Name</th><th>Enrollment</th><th>Program</th><th>Academic Year</th><th>Class Year</th><th>Term</th><th>Mobile</th><th>Email</th></tr></thead>
                                        <tbody id="studentStudentTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Subject Table Container (view only) -->
                        <div class="table-container" id="studentSubjectTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>Subject Code</th><th>Subject Name</th><th>Year</th><th>Term</th><th>Mode</th></tr></thead>
                                        <tbody id="studentSubjectTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Faculty Table Container (view only) -->
                        <div class="table-container" id="studentFacultyTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>Faculty Name</th><th>Mobile</th><th>Email</th><th>Subject</th></tr></thead>
                                        <tbody id="studentFacultyTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Feedback Table Container (view only, with once rule) -->
                        <div class="table-container" id="studentFeedbackTableContainer">
                            <div class="data-table-container">
                                <div class="data-table-wrapper">
                                    <table class="data-table">
                                        <thead><tr><th>Feedback ID</th><th>Name</th><th>Academic Year</th><th>Year</th><th>Term</th><th>Status</th><th>Actions</th></tr></thead>
                                        <tbody id="studentFeedbackTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <footer class="footer"><div class="footer-copyright">© 2025 EDU MASTER | All Rights Reserved</div></footer>
                </main>
            `;

            // Attach logout
            document.getElementById('studentLogoutBtn').addEventListener('click', handleLogout);

            // Quick action: Feedback Form - now opens the first pending feedback
            document.getElementById('studentFeedbackFormBtn').addEventListener('click', () => {
                // Find pending feedbacks for this student
                const myFeedbacks = feedbacks.filter(f => f.department === currentUser.program && f.year === currentUser.classYear && f.term === currentUser.term);
                const alreadyFilledIds = feedbackResponses.filter(r => r.studentId === currentUser.id).map(r => r.feedbackId);
                const pending = myFeedbacks.filter(f => !alreadyFilledIds.includes(f.id));
                if (pending.length === 0) {
                    showCustomAlert('No pending feedback forms available.', 'Info', 'info');
                    return;
                }
                // For simplicity, open the first pending feedback form
                showStudentFillFeedback(pending[0]);
            });

            // Table tabs
            document.querySelectorAll('#studentMainContent .table-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const table = this.dataset.table;
                    document.querySelectorAll('#studentMainContent .table-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    document.querySelectorAll('#studentMainContent .table-container').forEach(c => c.classList.remove('active'));
                    document.getElementById(`student${table.charAt(0).toUpperCase()+table.slice(1)}TableContainer`).classList.add('active');
                });
            });

            // Render tables
            renderStudentStudentTable();
            renderStudentSubjectTable();
            renderStudentFacultyTable();
            renderStudentFeedbackTable();

            loginPage.style.opacity = '0';
            setTimeout(() => {
                loginPage.style.display = 'none';
                studentDashboard.style.display = 'block';
                studentDashboard.style.opacity = '1';
            }, 300);
        }

        function renderStudentStudentTable() {
            const tbody = document.getElementById('studentStudentTableBody');
            if (!tbody) return;
            tbody.innerHTML = `
                <tr>
                    <td>${currentUser.name}</td>
                    <td>${currentUser.enrollment}</td>
                    <td>${currentUser.program}</td>
                    <td>${getAcademicYearNameById(currentUser.academicYear)}</td>
                    <td>${currentUser.classYear}</td>
                    <td>${currentUser.term}</td>
                    <td>${currentUser.mobile}</td>
                    <td>${currentUser.email}</td>
                </tr>
            `;
        }

        function renderStudentSubjectTable() {
            const tbody = document.getElementById('studentSubjectTableBody');
            if (!tbody) return;
            const deptSubjects = subjects.filter(s => s.department === currentUser.program && s.year === currentUser.classYear && s.term === currentUser.term);
            tbody.innerHTML = deptSubjects.map(s => `
                <tr>
                    <td>${s.code}</td>
                    <td>${s.name}</td>
                    <td>${s.year}</td>
                    <td>${s.term}</td>
                    <td>${s.mode}</td>
                </tr>
            `).join('');
        }

        function renderStudentFacultyTable() {
            const tbody = document.getElementById('studentFacultyTableBody');
            if (!tbody) return;
            // Faculties whose subject is in the student's subjects
            const deptSubjects = subjects.filter(s => s.department === currentUser.program && s.year === currentUser.classYear && s.term === currentUser.term);
            const subjectIds = deptSubjects.map(s => s.id);
            const relevantFaculties = faculties.filter(f => f.department === currentUser.program && subjectIds.includes(f.subjectId));
            tbody.innerHTML = relevantFaculties.map(f => {
                const sub = subjects.find(s => s.id === f.subjectId);
                return `<tr>
                    <td>${f.name}</td>
                    <td>${f.mobile}</td>
                    <td>${f.email}</td>
                    <td>${sub ? sub.name : ''}</td>
                </tr>`;
            }).join('');
        }

        function renderStudentFeedbackTable() {
            const tbody = document.getElementById('studentFeedbackTableBody');
            if (!tbody) return;
            const myFeedbacks = feedbacks.filter(f => f.department === currentUser.program && f.year === currentUser.classYear && f.term === currentUser.term);
            const alreadyFilledIds = feedbackResponses.filter(r => r.studentId === currentUser.id).map(r => r.feedbackId);
            tbody.innerHTML = myFeedbacks.map(f => {
                const filled = alreadyFilledIds.includes(f.id);
                return `<tr>
                    <td>${f.id}</td>
                    <td>${f.name}</td>
                    <td>${getAcademicYearNameById(f.academicYear)}</td>
                    <td>${f.year}</td>
                    <td>${f.term}</td>
                    <td>${filled ? '<span class="status-active">Submitted</span>' : '<span class="status-inactive">Pending</span>'}</td>
                    <td class="actions">
                        ${filled ? 
                            `<button class="btn btn-primary btn-sm view-feedback-student" data-id="${f.id}">View</button>` : 
                            `<button class="btn btn-success btn-sm fill-feedback-student" data-id="${f.id}">Fill</button>`
                        }
                    </td>
                </tr>`;
            }).join('');
            // Attach events for view/fill
            document.querySelectorAll('.view-feedback-student').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    // Show feedback details (could be a simple alert for now)
                    const resp = feedbackResponses.find(r => r.feedbackId === id && r.studentId === currentUser.id);
                    if (resp) {
                        showCustomAlert(JSON.stringify(resp.responses, null, 2), 'Your Feedback', 'info');
                    }
                });
            });
            document.querySelectorAll('.fill-feedback-student').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const feedback = feedbacks.find(f => f.id === id);
                    if (feedback) {
                        showStudentFillFeedback(feedback);
                    }
                });
            });
        }

        // Enhanced student feedback fill function with actual table and marks entry
        function showStudentFillFeedback(feedback) {
            // Create a modal or new section within student dashboard to fill feedback
            const mainContent = document.getElementById('studentMainContent');
            const originalHTML = mainContent.innerHTML;
            mainContent.innerHTML = `
                <div class="module-header">
                    <button class="back-to-dashboard" id="backFromStudentFill"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
                    <h2 class="section-title"><i class="fas fa-star"></i> Feedback: ${feedback.name}</h2>
                </div>
                <div class="form-card">
                    <h3 class="mb-4">Please rate each parameter (1 to 5)</h3>
                    <div class="data-table-container">
                        <div class="data-table-wrapper">
                            <table class="data-table" id="studentFillFeedbackTable">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name of Course (TH/PR)</th>
                                        <th>Name of Faculty</th>
                                        <th>Coverage of syllabus</th>
                                        <th>Covering relevant topics beyond syllabus</th>
                                        <th>Effectiveness in terms of technical course contents</th>
                                        <th>Effectiveness in terms of communication skills</th>
                                        <th>Effectiveness in terms of teaching aids</th>
                                        <th>Motivation and inspiration for students to learn in self-learning mode</th>
                                        <th>Support for development of student skills – Practical performance</th>
                                        <th>Support for development of student skills – Project and seminar preparation</th>
                                        <th>Feedback provided on student progress</th>
                                        <th>Punctuality and discipline</th>
                                        <th>Domain knowledge</th>
                                        <th>Interaction with students</th>
                                        <th>Ability to resolve difficulties</th>
                                        <th>Encourage to participate in co-curricular activities</th>
                                        <th>Encourage to participate in extracurricular activities</th>
                                        <th>Guidance during internship</th>
                                        <th>Total (Max 80)</th>
                                    </tr>
                                </thead>
                                <tbody id="studentFillFeedbackBody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-actions" style="margin-top:20px;">
                        <button class="btn btn-primary" id="studentSubmitFeedbackBtn">Submit Feedback</button>
                        <button class="btn btn-secondary" id="studentCancelFeedbackBtn">Cancel</button>
                    </div>
                </div>
            `;

            // Populate table with rows from feedback
            const tbody = document.getElementById('studentFillFeedbackBody');
            const rows = feedback.rows || []; // feedback should have rows array
            const allSubjects = subjects;
            const allFaculties = faculties;

            let rowHtml = '';
            rows.forEach((row, idx) => {
                const subject = allSubjects.find(s => s.id === row.subjectId);
                const faculty = allFaculties.find(f => f.id === row.facultyId);
                rowHtml += `<tr data-index="${idx}">
                    <td>${idx+1}</td>
                    <td>${subject ? subject.name : ''}</td>
                    <td>${faculty ? faculty.name : ''}</td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="4"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="5"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="6"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="7"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="8"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="9"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="10"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="11"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="12"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="13"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="14"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="15"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="16"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="17"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="18"></td>
                    <td><input type="number" class="search-input" min="1" max="5" value="" style="width:60px;" data-rating="19"></td>
                    <td class="total-cell">0</td>
                </tr>`;
            });
            tbody.innerHTML = rowHtml;

            // Attach input event listeners to update total per row
            tbody.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('input', function() {
                    const row = this.closest('tr');
                    const inputs = row.querySelectorAll('input[type="number"]');
                    let sum = 0;
                    inputs.forEach(inp => {
                        const val = parseInt(inp.value, 10);
                        if (!isNaN(val) && val >= 1 && val <= 5) sum += val;
                    });
                    const totalCell = row.querySelector('.total-cell');
                    if (totalCell) totalCell.textContent = sum;
                });
            });

            // Back button
            document.getElementById('backFromStudentFill').addEventListener('click', () => {
                mainContent.innerHTML = originalHTML;
                // Re-attach dashboard events
                showStudentMainDashboard();
            });
            document.getElementById('studentCancelFeedbackBtn').addEventListener('click', () => {
                mainContent.innerHTML = originalHTML;
                showStudentMainDashboard();
            });

            // Submit button
            document.getElementById('studentSubmitFeedbackBtn').addEventListener('click', () => {
                const responses = [];
                const rows = tbody.querySelectorAll('tr');
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const inputs = row.querySelectorAll('input[type="number"]');
                    const ratings = [];
                    inputs.forEach(inp => ratings.push(inp.value ? parseInt(inp.value, 10) : 0));
                    responses.push(ratings);
                }
                // Save to feedbackResponses
                feedbackResponses.push({
                    studentId: currentUser.id,
                    feedbackId: feedback.id,
                    responses: responses,
                    submittedAt: new Date().toISOString()
                });
                saveFeedbackResponses();
                showToast('Success', 'Feedback submitted', 'success');
                mainContent.innerHTML = originalHTML;
                showStudentMainDashboard();
            });
        }

        // ==================== EXISTING ADMIN FUNCTIONS (with updated save functions) ====================
        function transitionToAdminDashboard() {
            updateAdminDashboard();
            showSuccessMessage();
            loginPage.style.opacity = '0';
            loginPage.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                loginPage.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.style.opacity = '0';
                dashboard.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    dashboard.style.opacity = '1';
                    dashboard.scrollTop = 0;
                }, 50);
            }, 300);
        }

        function showSuccessMessage() {
            document.getElementById('successBanner').style.display = 'block';
            document.getElementById('welcomeBanner').style.display = 'none';
            document.getElementById('successSubtitle').textContent = `Welcome ${currentUser.name} to EDU MASTER Dashboard`;
            document.getElementById('successBanner').style.animation = 'successPulse 2s ease-in-out';
            if (successBannerTimeout) clearTimeout(successBannerTimeout);
            successBannerTimeout = setTimeout(() => {
                document.getElementById('successBanner').style.display = 'none';
                document.getElementById('welcomeBanner').style.display = 'block';
            }, 3000);
        }

        function updateAdminDashboard() {
            if (!currentUser) return;
            document.getElementById('dashboardUserName').textContent = currentUser.name;
            document.getElementById('dashboardUserRole').textContent = currentUser.roleName;
            document.getElementById('avatarText').textContent = currentUser.name.charAt(0);
            document.getElementById('welcomeTitle').textContent = `Welcome back, ${currentUser.name}!`;
            document.getElementById('welcomeSubtitle').textContent = 'You have full access to manage institutes, programs, classes, and academic years.';
            updateDashboardStats();
            renderDatabaseTables();
            updateProfileSettings();
            updateProgrammeDropdownForClassMaster();
            populateStudentProgramDropdown();
        }

        // Updated stats function: now with 4+4 boxes
        function updateDashboardStats() {
            document.getElementById('statInstitutes').textContent = institutes.length;
            document.getElementById('statYears').textContent = academicYears.length;
            document.getElementById('statProgrammes').textContent = programmes.length;
            document.getElementById('statClasses').textContent = classes.length;

            // Second row
            document.getElementById('statStudentTotal').textContent = students.length;
            document.getElementById('statFacultyTotal').textContent = faculties.length;
            document.getElementById('statSubjectTotal').textContent = subjects.length;
            document.getElementById('statHODSecond').textContent = hods.length; // new HOD box

            // report stats
            const activeYears = academicYears.filter(y => y.is_current === 'Yes').length;
            document.getElementById('reportTotalInstitutes').textContent = institutes.length;
            document.getElementById('reportTotalProgrammes').textContent = programmes.length;
            document.getElementById('reportTotalClasses').textContent = classes.length;
            document.getElementById('reportActiveYears').textContent = activeYears;

            renderInstituteTable();
            renderAcademicTable();
            renderProgrammeTable();
            renderClassTable();
            renderHodTable();
            renderStudentTable();
            updateAcademicYearDropdownForClassMaster();
            updateProgrammeDropdownForClassMaster();
            populateAcademicYearDropdown();
            populateStudentProgramDropdown();
        }

        function saveDashboardScrollPosition() { dashboardScrollPosition = dashboard.scrollTop; }

        function showMainDashboard(targetSection) {
            document.getElementById('mainDashboard').style.display = 'block';
            document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
            resetAllForms();
            updateDashboardStats();
            renderDatabaseTables();
            document.getElementById('databaseTablesSection').style.display = 'block';
            // Scroll to appropriate section
            setTimeout(() => {
                if (targetSection === 'quickActions') {
                    document.getElementById('quickActionsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (targetSection === 'databaseTables') {
                    document.getElementById('databaseTablesSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        function showModule(moduleName) {
            document.getElementById('mainDashboard').style.display = 'none';
            document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
            if (moduleName === 'institute') {
                document.getElementById('instituteModule').style.display = 'block';
                renderInstituteTable();
            } else if (moduleName === 'academic') {
                document.getElementById('academicModule').style.display = 'block';
                renderAcademicTable();
            } else if (moduleName === 'programme') {
                document.getElementById('programmeModule').style.display = 'block';
                renderProgrammeTable();
            } else if (moduleName === 'class') {
                document.getElementById('classModule').style.display = 'block';
                renderClassTable();
            } else if (moduleName === 'hod') {
                document.getElementById('hodModule').style.display = 'block';
                renderHodTable();
            } else if (moduleName === 'student') {
                document.getElementById('studentModule').style.display = 'block';
                renderStudentTable();
            }
            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
        }

        function showInstituteModule() { showModule('institute'); }
        function showAcademicModule() { showModule('academic'); }
        function showProgrammeModule() { showModule('programme'); }
        function showClassModule() { showModule('class'); }
        function showHodModule() { showModule('hod'); }
        function showStudentModule() { showModule('student'); }

        function showReportsModule() {
            document.getElementById('mainDashboard').style.display = 'none';
            document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
            document.getElementById('reportsModule').style.display = 'block';
            initializeReports();
            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
        }

        function showSettingsModule() {
            document.getElementById('mainDashboard').style.display = 'none';
            document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
            document.getElementById('settingsModule').style.display = 'block';
            updateProfileSettings();
            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
        }

        function renderDatabaseTables() {
            renderDatabaseInstituteTable();
            renderDatabaseAcademicTable();
            renderDatabaseProgrammeTable();
            renderDatabaseClassTable();
            renderDatabaseHodTable();
            renderDatabaseStudentTable();
            renderDatabaseSubjectTable();  // now before faculty
            renderDatabaseFacultyTable();
            renderDatabaseFeedbackTable();
        }

        function renderDatabaseInstituteTable() {
            const tbody = document.getElementById('databaseInstituteTableBody');
            tbody.innerHTML = '';
            institutes.forEach(inst => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${inst.id}</td>
                    <td>${inst.name}</td>
                    <td>${inst.code}</td>
                    <td>${inst.address}</td>
                    <td><span class="${inst.status === 'Active' ? 'status-active' : 'status-inactive'}">${inst.status}</span></td>
                    <td>${formatDateForDisplay(inst.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-institute-db" data-id="${inst.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-institute-db" data-id="${inst.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && currentUser.role === 'admin') {
                document.querySelectorAll('.edit-institute-db').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        const inst = institutes.find(i => i.id === id);
                        if (inst) {
                            saveDashboardScrollPosition();
                            lastActionSource = 'databaseTables'; // mark as from database tables
                            showInstituteModule();
                            showEditInstituteForm(inst);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-institute-db').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        showCustomConfirm('Delete this institute?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                institutes = institutes.filter(i => i.id !== id);
                                saveInstitutes();
                                updateDashboardStats();
                                renderDatabaseInstituteTable();
                                showToast('Success', 'Institute deleted', 'success');
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
                const statusClass = year.status === 'Active' ? 'status-active' : year.status === 'Completed' ? 'status-completed' : 'status-inactive';
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
                            <button class="btn btn-primary btn-sm edit-academic-db" data-id="${year.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-academic-db" data-id="${year.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && currentUser.role === 'admin') {
                document.querySelectorAll('.edit-academic-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const year = academicYears.find(y => y.id === id);
                        if (year) {
                            saveDashboardScrollPosition();
                            lastActionSource = 'databaseTables';
                            showAcademicModule();
                            showEditAcademicForm(year);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-academic-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        if (hasAnyClassesForAcademicYear(id)) {
                            // block delete without popup
                            return;
                        }
                        showCustomConfirm('Delete this academic year?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                academicYears = academicYears.filter(y => y.id !== id);
                                saveAcademicYears();
                                updateDashboardStats();
                                renderDatabaseAcademicTable();
                                showToast('Success', 'Academic year deleted', 'success');
                            }
                        });
                    });
                });
            }
        }

        function renderDatabaseProgrammeTable() {
            const tbody = document.getElementById('databaseProgrammeTableBody');
            tbody.innerHTML = '';
            programmes.forEach(p => {
                const statusClass = p.status === 'Active' ? 'status-active' : p.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.code}</td>
                    <td>${p.name}</td>
                    <td>${p.duration}</td>
                    <td><span class="${statusClass}">${p.status}</span></td>
                    <td>${formatDateForDisplay(p.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-programme-db" data-id="${p.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-programme-db" data-id="${p.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && currentUser.role === 'admin') {
                document.querySelectorAll('.edit-programme-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const prog = programmes.find(p => p.id === id);
                        if (prog) {
                            saveDashboardScrollPosition();
                            lastActionSource = 'databaseTables';
                            showProgrammeModule();
                            showEditProgrammeForm(prog);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-programme-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        if (hasAnyClassesForProgram(id)) {
                            return; // no popup, just block
                        }
                        showCustomConfirm('Delete this program?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                programmes = programmes.filter(p => p.id !== id);
                                saveProgrammes();
                                updateDashboardStats();
                                renderDatabaseProgrammeTable();
                                showToast('Success', 'Program deleted', 'success');
                            }
                        });
                    });
                });
            }
        }

        function renderDatabaseClassTable() {
            const tbody = document.getElementById('databaseClassTableBody');
            tbody.innerHTML = '';
            classes.forEach(c => {
                const statusClass = c.status === 'Active' ? 'status-active' : c.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.programme_id}</td>
                    <td>${c.programme_name}</td>
                    <td>${c.class_code}</td>
                    <td>${getAcademicYearNameById(c.academic_year)}</td>
                    <td>${c.term}</td>
                    <td><span class="${statusClass}">${c.status}</span></td>
                    <td>${formatDateForDisplay(c.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-class-db" data-id="${c.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-class-db" data-id="${c.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && currentUser.role === 'admin') {
                document.querySelectorAll('.edit-class-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const cls = classes.find(c => c.id === id);
                        if (cls) {
                            saveDashboardScrollPosition();
                            lastActionSource = 'databaseTables';
                            showClassModule();
                            showEditClassForm(cls);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-class-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        showCustomConfirm('Delete this class?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                classes = classes.filter(c => c.id !== id);
                                saveClasses();
                                updateDashboardStats();
                                renderDatabaseClassTable();
                                showToast('Success', 'Class deleted', 'success');
                            }
                        });
                    });
                });
            }
        }

        function renderDatabaseHodTable() {
            const tbody = document.getElementById('databaseHodTableBody');
            tbody.innerHTML = '';
            hods.forEach(h => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${h.id}</td>
                    <td>${h.department}</td>
                    <td>${h.name}</td>
                    <td>${h.mobile}</td>
                    <td>${h.email}</td>
                    <td>${h.username}</td>
                    <td>${h.password}</td>
                    <td>${formatDateForDisplay(h.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-hod-db" data-id="${h.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-hod-db" data-id="${h.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && currentUser.role === 'admin') {
                document.querySelectorAll('.edit-hod-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const hod = hods.find(h => h.id === id);
                        if (hod) {
                            saveDashboardScrollPosition();
                            lastActionSource = 'databaseTables';
                            showHodModule();
                            showEditHodForm(hod);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-hod-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        showCustomConfirm('Delete this HOD?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                hods = hods.filter(h => h.id !== id);
                                saveHods();
                                updateDashboardStats();
                                renderDatabaseHodTable();
                                showToast('Success', 'HOD deleted', 'success');
                            }
                        });
                    });
                });
            }
        }

        // Student Master table - VIEW ONLY: no actions
        function renderDatabaseStudentTable() {
            const tbody = document.getElementById('databaseStudentTableBody');
            tbody.innerHTML = '';
            students.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.enrollment}</td>
                    <td>${s.program}</td>
                    <td>${getAcademicYearNameById(s.academicYear)}</td>
                    <td>${s.classYear}</td>
                    <td>${s.term}</td>
                    <td>${s.mobile}</td>
                    <td>${s.email}</td>
                    <td>${s.firstLogin ? 'Yes' : 'No'}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // New view-only tables
        function renderDatabaseFacultyTable() {
            const tbody = document.getElementById('databaseFacultyTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            faculties.forEach(f => {
                const sub = subjects.find(s => s.id === f.subjectId);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${f.id}</td>
                    <td>${f.name}</td>
                    <td>${f.department}</td>
                    <td>${f.mobile}</td>
                    <td>${f.email}</td>
                    <td>${formatDateForDisplay(f.created_at || '')}</td>
                    <td>${sub ? sub.name : ''}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function renderDatabaseSubjectTable() {
            const tbody = document.getElementById('databaseSubjectTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            subjects.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.code}</td>
                    <td>${s.department}</td>
                    <td>${s.year}</td>
                    <td>${s.term}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // Updated Feedback Master table with new columns
        function renderDatabaseFeedbackTable() {
            const tbody = document.getElementById('databaseFeedbackTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            feedbackResponses.forEach(resp => {
                const student = students.find(s => s.id === resp.studentId);
                const feedback = feedbacks.find(f => f.id === resp.feedbackId);
                if (student && feedback) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${feedback.id}</td>
                        <td>${getAcademicYearNameById(feedback.academicYear)}</td>
                        <td>${student.name}</td>
                        <td>${student.enrollment}</td>
                        <td>${feedback.year}</td>
                        <td>${feedback.term}</td>
                        <td class="actions">
                            <button class="btn btn-primary btn-sm view-feedback-admin" data-id="${feedback.id}" data-student="${student.id}">View</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                }
            });
            // Attach view events
            document.querySelectorAll('.view-feedback-admin').forEach(btn => {
                btn.addEventListener('click', function() {
                    const feedbackId = this.getAttribute('data-id');
                    const studentId = this.getAttribute('data-student');
                    const resp = feedbackResponses.find(r => r.feedbackId === feedbackId && r.studentId === studentId);
                    if (resp) {
                        showCustomAlert(JSON.stringify(resp.responses, null, 2), 'Feedback Details', 'info');
                    }
                });
            });
        }

        function switchTableTab(tableId) {
            document.querySelectorAll('.table-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-table') === tableId) tab.classList.add('active');
            });
            document.querySelectorAll('.table-container').forEach(container => {
                container.classList.remove('active');
                if (container.id === `${tableId}TableContainer`) container.classList.add('active');
            });
        }

        function switchSettingsTab(panelId) {
            document.querySelectorAll('.settings-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-panel') === panelId) tab.classList.add('active');
            });
            document.querySelectorAll('.settings-panel').forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${panelId}Panel`) panel.classList.add('active');
            });
        }

        // Institute CRUD (updated with validation and removed toasts)
        let editingInstituteId = null;
        function showAddInstituteForm() {
            document.getElementById('instituteFormTitle').textContent = 'Add New Institute';
            document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Save Institute';
            editingInstituteId = null;
            document.getElementById('instituteName').value = '';
            document.getElementById('instituteCode').value = '';
            document.getElementById('instituteAddress').value = '';
            document.getElementById('instituteStatus').value = '';
            clearFieldError(document.getElementById('instituteName'), document.getElementById('instituteNameError'));
            clearFieldError(document.getElementById('instituteCode'), document.getElementById('instituteCodeError'));
            clearFieldError(document.getElementById('instituteAddress'), document.getElementById('instituteAddressError'));
            clearFieldError(document.getElementById('instituteStatus'), document.getElementById('instituteStatusError'));
            saveAttempts.institute = 0; // reset attempts
        }
        function showEditInstituteForm(inst) {
            document.getElementById('instituteFormTitle').textContent = 'Edit Institute';
            document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Update Institute';
            editingInstituteId = inst.id;
            document.getElementById('instituteName').value = inst.name;
            document.getElementById('instituteCode').value = inst.code;
            document.getElementById('instituteAddress').value = inst.address;
            document.getElementById('instituteStatus').value = inst.status;
            clearFieldError(document.getElementById('instituteName'), document.getElementById('instituteNameError'));
            clearFieldError(document.getElementById('instituteCode'), document.getElementById('instituteCodeError'));
            clearFieldError(document.getElementById('instituteAddress'), document.getElementById('instituteAddressError'));
            clearFieldError(document.getElementById('instituteStatus'), document.getElementById('instituteStatusError'));
            saveAttempts.institute = 0; // reset attempts
        }
        function saveInstitute() {
            if (!validateInstituteName() || !validateInstituteCode() || !validateInstituteAddress() || !validateInstituteStatus()) {
                saveAttempts.institute++;
                if (saveAttempts.institute >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            // Success: reset attempts
            saveAttempts.institute = 0;
            const name = document.getElementById('instituteName').value.trim();
            const code = document.getElementById('instituteCode').value.trim();
            const address = document.getElementById('instituteAddress').value.trim();
            const status = document.getElementById('instituteStatus').value;
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingInstituteId) {
                const index = institutes.findIndex(i => i.id === editingInstituteId);
                if (index !== -1) {
                    institutes[index] = { ...institutes[index], name, code, address, status, updated_at: today };
                    saveInstitutes();
                    showToast('Success', 'Institute updated', 'success');
                }
            } else {
                const newId = `IID${String(institutes.length + 1).padStart(3, '0')}`;
                institutes.push({ id: newId, name, code, address, status, created_at: today, updated_at: today });
                saveInstitutes();
                showToast('Success', 'Institute added', 'success');
            }
            updateDashboardStats();
            renderInstituteTable();
            renderDatabaseInstituteTable();
            cancelInstituteForm();
        }
        function cancelInstituteForm() {
            document.getElementById('instituteName').value = '';
            document.getElementById('instituteCode').value = '';
            document.getElementById('instituteAddress').value = '';
            document.getElementById('instituteStatus').value = '';
            editingInstituteId = null;
            document.getElementById('instituteFormTitle').textContent = 'Add New Institute';
            document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Save Institute';
            clearFieldError(document.getElementById('instituteName'), document.getElementById('instituteNameError'));
            clearFieldError(document.getElementById('instituteCode'), document.getElementById('instituteCodeError'));
            clearFieldError(document.getElementById('instituteAddress'), document.getElementById('instituteAddressError'));
            clearFieldError(document.getElementById('instituteStatus'), document.getElementById('instituteStatusError'));
            saveAttempts.institute = 0; // reset attempts
        }
        function renderInstituteTable() {
            const tbody = document.getElementById('instituteTableBody');
            tbody.innerHTML = '';
            institutes.forEach(inst => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${inst.id}</td>
                    <td>${inst.name}</td>
                    <td>${inst.code}</td>
                    <td>${inst.address}</td>
                    <td><span class="${inst.status === 'Active' ? 'status-active' : 'status-inactive'}">${inst.status}</span></td>
                    <td>${formatDateForDisplay(inst.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-institute" data-id="${inst.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-institute" data-id="${inst.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-institute').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const inst = institutes.find(i => i.id === id);
                    if (inst) showEditInstituteForm(inst);
                });
            });
            document.querySelectorAll('.delete-institute').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this institute?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            institutes = institutes.filter(i => i.id !== id);
                            saveInstitutes();
                            updateDashboardStats();
                            renderInstituteTable();
                            renderDatabaseInstituteTable();
                            showToast('Success', 'Institute deleted', 'success');
                        }
                    });
                });
            });
        }
        function filterInstitutes() {
            const term = document.getElementById('searchInstitute').value.toLowerCase();
            const filtered = institutes.filter(i => i.name.toLowerCase().includes(term) || i.code.toLowerCase().includes(term) || i.address.toLowerCase().includes(term));
            const tbody = document.getElementById('instituteTableBody');
            tbody.innerHTML = '';
            filtered.forEach(inst => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${inst.id}</td>
                    <td>${inst.name}</td>
                    <td>${inst.code}</td>
                    <td>${inst.address}</td>
                    <td><span class="${inst.status === 'Active' ? 'status-active' : 'status-inactive'}">${inst.status}</span></td>
                    <td>${formatDateForDisplay(inst.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-institute" data-id="${inst.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-institute" data-id="${inst.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearInstituteSearch() { document.getElementById('searchInstitute').value = ''; renderInstituteTable(); }

        // Academic Year CRUD (updated with validation and inline errors, no toasts)
        let editingAcademicId = null;
        function showAddAcademicForm() {
            document.getElementById('academicFormTitle').textContent = 'Add New Academic Year';
            document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Save Academic Year';
            editingAcademicId = null;
            document.getElementById('yearName').value = '';
            document.getElementById('startDate').value = '';
            document.getElementById('endDate').value = '';
            document.getElementById('isCurrentYear').value = '';
            document.getElementById('academicStatus').value = '';
            document.getElementById('isCurrentYear').disabled = false;
            document.getElementById('academicStatus').disabled = false;
            clearFieldError(document.getElementById('yearName'), document.getElementById('yearNameError'));
            clearFieldError(document.getElementById('startDate'), document.getElementById('startDateError'));
            clearFieldError(document.getElementById('endDate'), document.getElementById('endDateError'));
            clearFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'));
            clearFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'));
            // reset data-previous
            document.getElementById('isCurrentYear').setAttribute('data-previous', '');
            document.getElementById('academicStatus').setAttribute('data-previous', '');
            saveAttempts.academic = 0; // reset attempts
        }
        function showEditAcademicForm(year) {
            document.getElementById('academicFormTitle').textContent = 'Edit Academic Year';
            document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Update Academic Year';
            editingAcademicId = year.id;
            document.getElementById('yearName').value = year.name;
            document.getElementById('startDate').value = formatDateToYYYYMMDD(year.start_date);
            document.getElementById('endDate').value = formatDateToYYYYMMDD(year.end_date);
            document.getElementById('isCurrentYear').value = year.is_current;
            document.getElementById('academicStatus').value = year.status;
            clearFieldError(document.getElementById('yearName'), document.getElementById('yearNameError'));
            clearFieldError(document.getElementById('startDate'), document.getElementById('startDateError'));
            clearFieldError(document.getElementById('endDate'), document.getElementById('endDateError'));
            clearFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'));
            clearFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'));
            document.getElementById('isCurrentYear').setAttribute('data-previous', year.is_current);
            document.getElementById('academicStatus').setAttribute('data-previous', year.status);
            saveAttempts.academic = 0; // reset attempts

            const hasNonCompleted = hasNonCompletedClassesForAcademicYear(year.id);
            if (hasNonCompleted) {
                document.getElementById('isCurrentYear').disabled = true;
                document.getElementById('academicStatus').disabled = true;
                // Show inline errors below each dropdown
                showFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'), 'Values exist in Class Master. Cannot change.');
                showFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'), 'Values exist in Class Master. Cannot change.');
            } else {
                document.getElementById('isCurrentYear').disabled = false;
                document.getElementById('academicStatus').disabled = false;
                clearFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'));
                clearFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'));
            }
        }
        function saveAcademicYear() {
            if (!validateYearName() || !validateStartDate() || !validateEndDate() || !validateIsCurrentYear() || !validateAcademicStatus()) {
                saveAttempts.academic++;
                if (saveAttempts.academic >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            saveAttempts.academic = 0;
            const name = document.getElementById('yearName').value.trim();
            const start = document.getElementById('startDate').value;
            const end = document.getElementById('endDate').value;
            const isCurrent = document.getElementById('isCurrentYear').value;
            const status = document.getElementById('academicStatus').value;

            if (isCurrent === 'Yes') {
                const other = academicYears.find(y => y.is_current === 'Yes' && (!editingAcademicId || y.id !== editingAcademicId));
                if (other) {
                    alert(`Another year (${other.name}) is already current.`);
                    return;
                }
            }
            if (editingAcademicId) {
                const original = academicYears.find(y => y.id === editingAcademicId);
                if (original) {
                    const hasNonCompleted = hasNonCompletedClassesForAcademicYear(editingAcademicId);
                    if (hasNonCompleted) {
                        if (isCurrent !== original.is_current) {
                            showFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'), 'Class Master has values. Cannot select this option.');
                            return;
                        }
                        if (status !== original.status) {
                            showFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'), 'Class Master has values. Cannot select this option.');
                            return;
                        }
                    }
                }
            }

            const startDate = formatDateToDDMMYYYY(start);
            const endDate = formatDateToDDMMYYYY(end);
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingAcademicId) {
                const index = academicYears.findIndex(y => y.id === editingAcademicId);
                if (index !== -1) {
                    academicYears[index] = { ...academicYears[index], name, start_date: startDate, end_date: endDate, is_current: isCurrent, status, updated_at: today };
                    saveAcademicYears();
                    showToast('Success', 'Academic year updated', 'success');
                }
            } else {
                const newId = `YID${String(academicYears.length + 1).padStart(3, '0')}`;
                academicYears.push({ id: newId, name, start_date: startDate, end_date: endDate, is_current: isCurrent, status, created_at: today, updated_at: today });
                saveAcademicYears();
                showToast('Success', 'Academic year added', 'success');
            }
            updateDashboardStats();
            renderAcademicTable();
            renderDatabaseAcademicTable();
            cancelAcademicForm();
        }
        function cancelAcademicForm() {
            document.getElementById('yearName').value = '';
            document.getElementById('startDate').value = '';
            document.getElementById('endDate').value = '';
            document.getElementById('isCurrentYear').value = '';
            document.getElementById('academicStatus').value = '';
            editingAcademicId = null;
            document.getElementById('academicFormTitle').textContent = 'Add New Academic Year';
            document.getElementById('saveAcademicBtn').innerHTML = '<i class="fas fa-save"></i> Save Academic Year';
            document.getElementById('isCurrentYear').disabled = false;
            document.getElementById('academicStatus').disabled = false;
            clearFieldError(document.getElementById('yearName'), document.getElementById('yearNameError'));
            clearFieldError(document.getElementById('startDate'), document.getElementById('startDateError'));
            clearFieldError(document.getElementById('endDate'), document.getElementById('endDateError'));
            clearFieldError(document.getElementById('isCurrentYear'), document.getElementById('isCurrentYearError'));
            clearFieldError(document.getElementById('academicStatus'), document.getElementById('academicStatusError'));
            document.getElementById('isCurrentYear').setAttribute('data-previous', '');
            document.getElementById('academicStatus').setAttribute('data-previous', '');
            saveAttempts.academic = 0; // reset attempts
        }
        function renderAcademicTable() {
            const tbody = document.getElementById('academicTableBody');
            tbody.innerHTML = '';
            academicYears.forEach(year => {
                const statusClass = year.status === 'Active' ? 'status-active' : year.status === 'Completed' ? 'status-completed' : 'status-inactive';
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
                            <button class="btn btn-primary btn-sm edit-academic" data-id="${year.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-academic" data-id="${year.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-academic').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const year = academicYears.find(y => y.id === id);
                    if (year) showEditAcademicForm(year);
                });
            });
            document.querySelectorAll('.delete-academic').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    if (hasAnyClassesForAcademicYear(id)) {
                        // block delete without popup
                        return;
                    }
                    showCustomConfirm('Delete this academic year?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            academicYears = academicYears.filter(y => y.id !== id);
                            saveAcademicYears();
                            updateDashboardStats();
                            renderAcademicTable();
                            renderDatabaseAcademicTable();
                            showToast('Success', 'Academic year deleted', 'success');
                        }
                    });
                });
            });
        }
        function filterAcademicYears() {
            const term = document.getElementById('searchAcademic').value.toLowerCase();
            const filtered = academicYears.filter(y => y.name.toLowerCase().includes(term));
            const tbody = document.getElementById('academicTableBody');
            tbody.innerHTML = '';
            filtered.forEach(year => {
                const statusClass = year.status === 'Active' ? 'status-active' : year.status === 'Completed' ? 'status-completed' : 'status-inactive';
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
                            <button class="btn btn-primary btn-sm edit-academic" data-id="${year.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-academic" data-id="${year.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearAcademicSearch() { document.getElementById('searchAcademic').value = ''; renderAcademicTable(); }

        // Program CRUD (updated with validation and no toasts)
        let editingProgrammeId = null;
        function showAddProgrammeForm() {
            document.getElementById('programmeFormTitle').textContent = 'Add New Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
            editingProgrammeId = null;
            document.getElementById('programmeName').value = '';
            document.getElementById('programmeCode').value = '';
            document.getElementById('programmeDuration').value = '3';
            document.getElementById('programmeStatus').value = '';
            clearFieldError(document.getElementById('programmeName'), document.getElementById('programmeNameError'));
            clearFieldError(document.getElementById('programmeCode'), document.getElementById('programmeCodeError'));
            clearFieldError(document.getElementById('programmeDuration'), document.getElementById('programmeDurationError'));
            clearFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'));
            document.getElementById('programmeStatus').setAttribute('data-previous', '');
            saveAttempts.programme = 0; // reset attempts
        }
        function showEditProgrammeForm(prog) {
            document.getElementById('programmeFormTitle').textContent = 'Edit Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Update Program';
            editingProgrammeId = prog.id;
            document.getElementById('programmeName').value = prog.name;
            document.getElementById('programmeCode').value = prog.code;
            document.getElementById('programmeDuration').value = prog.duration;
            document.getElementById('programmeStatus').value = prog.status;
            clearFieldError(document.getElementById('programmeName'), document.getElementById('programmeNameError'));
            clearFieldError(document.getElementById('programmeCode'), document.getElementById('programmeCodeError'));
            clearFieldError(document.getElementById('programmeDuration'), document.getElementById('programmeDurationError'));
            clearFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'));
            document.getElementById('programmeStatus').setAttribute('data-previous', prog.status);
            saveAttempts.programme = 0; // reset attempts

            const hasNonCompleted = hasNonCompletedClassesForProgram(prog.id);
            if (hasNonCompleted) {
                document.getElementById('programmeStatus').disabled = true;
                showFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'), 'Values exist in Class Master. Cannot change.');
            } else {
                document.getElementById('programmeStatus').disabled = false;
                clearFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'));
            }
        }
        function saveProgramme() {
            if (!validateProgrammeName() || !validateProgrammeCode() || !validateProgrammeDuration() || !validateProgrammeStatus()) {
                saveAttempts.programme++;
                if (saveAttempts.programme >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            saveAttempts.programme = 0;
            const name = document.getElementById('programmeName').value.trim();
            const code = document.getElementById('programmeCode').value.trim();
            const duration = document.getElementById('programmeDuration').value;
            const status = document.getElementById('programmeStatus').value;

            if (editingProgrammeId) {
                const original = programmes.find(p => p.id === editingProgrammeId);
                if (original) {
                    if (status !== original.status && (status === 'Inactive' || status === 'Completed')) {
                        const hasNonCompleted = hasNonCompletedClassesForProgram(editingProgrammeId);
                        if (hasNonCompleted) {
                            showFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'), 'Class Master has values. Cannot select this option.');
                            return;
                        }
                    }
                }
            }

            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingProgrammeId) {
                const index = programmes.findIndex(p => p.id === editingProgrammeId);
                if (index !== -1) {
                    programmes[index] = { ...programmes[index], name, code, duration: parseInt(duration), status, updated_at: today };
                    saveProgrammes();
                    showToast('Success', 'Program updated', 'success');
                }
            } else {
                const newId = `PID${String(programmes.length + 1).padStart(3, '0')}`;
                programmes.push({ id: newId, name, code, duration: parseInt(duration), status, created_at: today, updated_at: today });
                saveProgrammes();
                showToast('Success', 'Program added', 'success');
            }
            updateDashboardStats();
            renderProgrammeTable();
            renderDatabaseProgrammeTable();
            cancelProgrammeForm();
        }
        function cancelProgrammeForm() {
            document.getElementById('programmeName').value = '';
            document.getElementById('programmeCode').value = '';
            document.getElementById('programmeDuration').value = '3';
            document.getElementById('programmeStatus').value = '';
            editingProgrammeId = null;
            document.getElementById('programmeFormTitle').textContent = 'Add New Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
            clearFieldError(document.getElementById('programmeName'), document.getElementById('programmeNameError'));
            clearFieldError(document.getElementById('programmeCode'), document.getElementById('programmeCodeError'));
            clearFieldError(document.getElementById('programmeDuration'), document.getElementById('programmeDurationError'));
            clearFieldError(document.getElementById('programmeStatus'), document.getElementById('programmeStatusError'));
            document.getElementById('programmeStatus').disabled = false;
            document.getElementById('programmeStatus').setAttribute('data-previous', '');
            saveAttempts.programme = 0; // reset attempts
        }
        function renderProgrammeTable() {
            const tbody = document.getElementById('programmeTableBody');
            tbody.innerHTML = '';
            programmes.forEach(p => {
                const statusClass = p.status === 'Active' ? 'status-active' : p.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.code}</td>
                    <td>${p.name}</td>
                    <td>${p.duration}</td>
                    <td><span class="${statusClass}">${p.status}</span></td>
                    <td>${formatDateForDisplay(p.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-programme" data-id="${p.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-programme" data-id="${p.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-programme').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const prog = programmes.find(p => p.id === id);
                    if (prog) showEditProgrammeForm(prog);
                });
            });
            document.querySelectorAll('.delete-programme').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    if (hasAnyClassesForProgram(id)) {
                        return; // block delete without popup
                    }
                    showCustomConfirm('Delete this program?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            programmes = programmes.filter(p => p.id !== id);
                            saveProgrammes();
                            updateDashboardStats();
                            renderProgrammeTable();
                            renderDatabaseProgrammeTable();
                            showToast('Success', 'Program deleted', 'success');
                        }
                    });
                });
            });
        }
        function filterProgrammes() {
            const term = document.getElementById('searchProgramme').value.toLowerCase();
            const filtered = programmes.filter(p => p.name.toLowerCase().includes(term) || p.code.toLowerCase().includes(term));
            const tbody = document.getElementById('programmeTableBody');
            tbody.innerHTML = '';
            filtered.forEach(p => {
                const statusClass = p.status === 'Active' ? 'status-active' : p.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.code}</td>
                    <td>${p.name}</td>
                    <td>${p.duration}</td>
                    <td><span class="${statusClass}">${p.status}</span></td>
                    <td>${formatDateForDisplay(p.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-programme" data-id="${p.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-programme" data-id="${p.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearProgrammeSearch() { document.getElementById('searchProgramme').value = ''; renderProgrammeTable(); }

        // Class CRUD (updated with validation)
        let editingClassId = null;
        function showAddClassForm() {
            document.getElementById('classFormTitle').textContent = 'Add New Class';
            document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
            editingClassId = null;
            resetClassForm();
            saveAttempts.class = 0; // reset attempts
        }
        function showEditClassForm(cls) {
            document.getElementById('classFormTitle').textContent = 'Edit Class';
            document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Update Class';
            editingClassId = cls.id;
            const prog = programmes.find(p => p.id === cls.programme_id);
            if (prog) {
                document.getElementById('classProgramme').value = prog.id;
                const event = new Event('change');
                document.getElementById('classProgramme').dispatchEvent(event);
                setTimeout(() => {
                    document.getElementById('classCode').value = cls.class_code;
                    document.getElementById('classCode').dispatchEvent(new Event('change'));
                    document.getElementById('classAcademicYear').value = cls.academic_year;
                    setTimeout(() => {
                        document.getElementById('classTerm').value = cls.term;
                    }, 100);
                }, 200);
            }
            document.getElementById('classStatus').value = cls.status;
            saveAttempts.class = 0; // reset attempts
        }
        function saveClass() {
            if (!validateClassProgramme() || !validateClassCode() || !validateClassAcademicYear() || !validateClassTerm() || !validateClassStatus()) {
                saveAttempts.class++;
                if (saveAttempts.class >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            saveAttempts.class = 0;
            const progId = document.getElementById('classProgramme').value;
            const classCode = document.getElementById('classCode').value;
            const acYear = document.getElementById('classAcademicYear').value;
            const term = document.getElementById('classTerm').value;
            const status = document.getElementById('classStatus').value;

            const prog = programmes.find(p => p.id === progId);
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingClassId) {
                const index = classes.findIndex(c => c.id === editingClassId);
                if (index !== -1) {
                    classes[index] = { ...classes[index], class_code: classCode, programme_id: progId, programme_name: prog.name, academic_year: acYear, term, status, updated_at: today };
                    saveClasses();
                    showToast('Success', 'Class updated', 'success');
                }
            } else {
                const newId = `CID${String(classes.length + 1).padStart(3, '0')}`;
                classes.push({ id: newId, class_code: classCode, programme_id: progId, programme_name: prog.name, academic_year: acYear, term, status, created_at: today, updated_at: today });
                saveClasses();
                showToast('Success', 'Class added', 'success');
            }
            updateDashboardStats();
            renderClassTable();
            renderDatabaseClassTable();
            cancelClassForm();
        }
        function resetClassForm() {
            document.getElementById('classProgramme').value = '';
            document.getElementById('classCode').innerHTML = '<option value="">Select Program first</option>';
            document.getElementById('classCode').disabled = true;
            document.getElementById('classAcademicYear').innerHTML = '<option value="">Select Class Code first</option>';
            document.getElementById('classAcademicYear').disabled = true;
            document.getElementById('classTerm').innerHTML = '<option value="">Select Academic Year first</option>';
            document.getElementById('classTerm').disabled = true;
            document.getElementById('classStatus').value = '';
            editingClassId = null;
            clearFieldError(document.getElementById('classProgramme'), document.getElementById('classProgrammeError'));
            clearFieldError(document.getElementById('classCode'), document.getElementById('classCodeError'));
            clearFieldError(document.getElementById('classAcademicYear'), document.getElementById('classAcademicYearError'));
            clearFieldError(document.getElementById('classTerm'), document.getElementById('classTermError'));
            clearFieldError(document.getElementById('classStatus'), document.getElementById('classStatusError'));
            saveAttempts.class = 0; // reset attempts
        }
        function cancelClassForm() {
            resetClassForm();
            document.getElementById('classFormTitle').textContent = 'Add New Class';
            document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
            saveAttempts.class = 0; // reset attempts
        }
        function renderClassTable() {
            const tbody = document.getElementById('classTableBody');
            tbody.innerHTML = '';
            classes.forEach(c => {
                const statusClass = c.status === 'Active' ? 'status-active' : c.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.programme_id}</td>
                    <td>${c.programme_name}</td>
                    <td>${c.class_code}</td>
                    <td>${getAcademicYearNameById(c.academic_year)}</td>
                    <td>${c.term}</td>
                    <td><span class="${statusClass}">${c.status}</span></td>
                    <td>${formatDateForDisplay(c.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-class" data-id="${c.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-class" data-id="${c.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-class').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const cls = classes.find(c => c.id === id);
                    if (cls) showEditClassForm(cls);
                });
            });
            document.querySelectorAll('.delete-class').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this class?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            classes = classes.filter(c => c.id !== id);
                            saveClasses();
                            updateDashboardStats();
                            renderClassTable();
                            renderDatabaseClassTable();
                            showToast('Success', 'Class deleted', 'success');
                        }
                    });
                });
            });
        }
        function filterClasses() {
            const term = document.getElementById('searchClass').value.toLowerCase();
            const filtered = classes.filter(c => c.class_code.toLowerCase().includes(term) || c.programme_name.toLowerCase().includes(term));
            const tbody = document.getElementById('classTableBody');
            tbody.innerHTML = '';
            filtered.forEach(c => {
                const statusClass = c.status === 'Active' ? 'status-active' : c.status === 'Completed' ? 'status-completed' : 'status-inactive';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.programme_id}</td>
                    <td>${c.programme_name}</td>
                    <td>${c.class_code}</td>
                    <td>${getAcademicYearNameById(c.academic_year)}</td>
                    <td>${c.term}</td>
                    <td><span class="${statusClass}">${c.status}</span></td>
                    <td>${formatDateForDisplay(c.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-class" data-id="${c.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-class" data-id="${c.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearClassSearch() { document.getElementById('searchClass').value = ''; renderClassTable(); }

        // HOD CRUD (updated with validation and no toasts)
        let editingHodId = null;
        function showAddHodForm() {
            document.getElementById('hodFormTitle').textContent = 'Add New HOD';
            document.getElementById('saveHodBtn').innerHTML = '<i class="fas fa-save"></i> Save HOD';
            editingHodId = null;
            document.getElementById('hodDepartment').value = '';
            document.getElementById('hodName').value = '';
            document.getElementById('hodMobile').value = '';
            document.getElementById('hodEmail').value = '';
            document.getElementById('hodUsername').value = '';
            document.getElementById('hodPassword').value = '';
            clearFieldError(document.getElementById('hodDepartment'), document.getElementById('hodDepartmentError'));
            clearFieldError(document.getElementById('hodName'), document.getElementById('hodNameError'));
            clearFieldError(document.getElementById('hodMobile'), document.getElementById('hodMobileError'));
            clearFieldError(document.getElementById('hodEmail'), document.getElementById('hodEmailError'));
            clearFieldError(document.getElementById('hodUsername'), document.getElementById('hodUsernameError'));
            clearFieldError(document.getElementById('hodPassword'), document.getElementById('hodPasswordError'));
            saveAttempts.hod = 0; // reset attempts
        }
        function showEditHodForm(hod) {
            document.getElementById('hodFormTitle').textContent = 'Edit HOD';
            document.getElementById('saveHodBtn').innerHTML = '<i class="fas fa-save"></i> Update HOD';
            editingHodId = hod.id;
            document.getElementById('hodDepartment').value = hod.department;
            document.getElementById('hodName').value = hod.name;
            document.getElementById('hodMobile').value = hod.mobile;
            document.getElementById('hodEmail').value = hod.email;
            document.getElementById('hodUsername').value = hod.username;
            document.getElementById('hodPassword').value = hod.password;
            clearFieldError(document.getElementById('hodDepartment'), document.getElementById('hodDepartmentError'));
            clearFieldError(document.getElementById('hodName'), document.getElementById('hodNameError'));
            clearFieldError(document.getElementById('hodMobile'), document.getElementById('hodMobileError'));
            clearFieldError(document.getElementById('hodEmail'), document.getElementById('hodEmailError'));
            clearFieldError(document.getElementById('hodUsername'), document.getElementById('hodUsernameError'));
            clearFieldError(document.getElementById('hodPassword'), document.getElementById('hodPasswordError'));
            saveAttempts.hod = 0; // reset attempts
        }
        function saveHod() {
            if (!validateHodDepartment() || !validateHodName() || !validateHodMobile() || !validateHodEmail() || !validateHodUsername() || !validateHodPassword()) {
                saveAttempts.hod++;
                if (saveAttempts.hod >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            // Password strength check – also required, treat as field error
            if (!isStrongPassword(document.getElementById('hodPassword').value)) {
                showFieldError(document.getElementById('hodPassword'), document.getElementById('hodPasswordError'), 'Password does not meet requirements');
                saveAttempts.hod++;
                if (saveAttempts.hod >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            saveAttempts.hod = 0;
            const dept = document.getElementById('hodDepartment').value;
            const name = document.getElementById('hodName').value.trim();
            const mobile = document.getElementById('hodMobile').value.trim();
            const email = document.getElementById('hodEmail').value.trim();
            const username = document.getElementById('hodUsername').value.trim();
            const password = document.getElementById('hodPassword').value;

            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingHodId) {
                const index = hods.findIndex(h => h.id === editingHodId);
                if (index !== -1) {
                    hods[index] = { ...hods[index], department: dept, name, mobile, email, username, password, updated_at: today };
                    saveHods();
                    showToast('Success', 'HOD updated', 'success');
                }
            } else {
                const newId = `HOD${String(hods.length + 1).padStart(3, '0')}`;
                hods.push({ id: newId, department: dept, name, mobile, email, username, password, created_at: today, updated_at: today });
                saveHods();
                showToast('Success', 'HOD added', 'success');
            }
            updateDashboardStats();
            renderHodTable();
            renderDatabaseHodTable();
            cancelHodForm();
        }
        function cancelHodForm() {
            document.getElementById('hodDepartment').value = '';
            document.getElementById('hodName').value = '';
            document.getElementById('hodMobile').value = '';
            document.getElementById('hodEmail').value = '';
            document.getElementById('hodUsername').value = '';
            document.getElementById('hodPassword').value = '';
            editingHodId = null;
            document.getElementById('hodFormTitle').textContent = 'Add New HOD';
            document.getElementById('saveHodBtn').innerHTML = '<i class="fas fa-save"></i> Save HOD';
            clearFieldError(document.getElementById('hodDepartment'), document.getElementById('hodDepartmentError'));
            clearFieldError(document.getElementById('hodName'), document.getElementById('hodNameError'));
            clearFieldError(document.getElementById('hodMobile'), document.getElementById('hodMobileError'));
            clearFieldError(document.getElementById('hodEmail'), document.getElementById('hodEmailError'));
            clearFieldError(document.getElementById('hodUsername'), document.getElementById('hodUsernameError'));
            clearFieldError(document.getElementById('hodPassword'), document.getElementById('hodPasswordError'));
            saveAttempts.hod = 0; // reset attempts
        }
        function renderHodTable() {
            const tbody = document.getElementById('hodTableBody');
            tbody.innerHTML = '';
            hods.forEach(h => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${h.id}</td>
                    <td>${h.department}</td>
                    <td>${h.name}</td>
                    <td>${h.mobile}</td>
                    <td>${h.email}</td>
                    <td>${h.username}</td>
                    <td>${h.password}</td>
                    <td>${formatDateForDisplay(h.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-hod" data-id="${h.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-hod" data-id="${h.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const hod = hods.find(h => h.id === id);
                    if (hod) showEditHodForm(hod);
                });
            });
            document.querySelectorAll('.delete-hod').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this HOD?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            hods = hods.filter(h => h.id !== id);
                            saveHods();
                            updateDashboardStats();
                            renderHodTable();
                            renderDatabaseHodTable();
                            showToast('Success', 'HOD deleted', 'success');
                        }
                    });
                });
            });
        }
        function filterHods() {
            const term = document.getElementById('searchHod').value.toLowerCase();
            const filtered = hods.filter(h => h.name.toLowerCase().includes(term) || h.department.toLowerCase().includes(term));
            const tbody = document.getElementById('hodTableBody');
            tbody.innerHTML = '';
            filtered.forEach(h => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${h.id}</td>
                    <td>${h.department}</td>
                    <td>${h.name}</td>
                    <td>${h.mobile}</td>
                    <td>${h.email}</td>
                    <td>${h.username}</td>
                    <td>${h.password}</td>
                    <td>${formatDateForDisplay(h.created_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-hod" data-id="${h.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-hod" data-id="${h.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearHodSearch() { document.getElementById('searchHod').value = ''; renderHodTable(); }

        // Student CRUD - now view-only (actions removed)
        let editingStudentId = null;
        function showAddStudentForm() {
            document.getElementById('studentFormTitle').textContent = 'Add New Student';
            document.getElementById('saveStudentBtn').innerHTML = '<i class="fas fa-save"></i> Save Student';
            editingStudentId = null;
            document.getElementById('studentName').value = '';
            document.getElementById('studentEnrollment').value = '';
            document.getElementById('studentProgram').value = '';
            document.getElementById('studentAcademicYear').value = '';
            document.getElementById('studentClassYear').value = '';
            document.getElementById('studentTerm').innerHTML = '<option value="">Select Class Year first</option>';
            document.getElementById('studentTerm').disabled = true;
            document.getElementById('studentMobile').value = '';
            document.getElementById('studentEmail').value = '';
            clearFieldError(document.getElementById('studentName'), document.getElementById('studentNameError'));
            clearFieldError(document.getElementById('studentEnrollment'), document.getElementById('studentEnrollmentError'));
            clearFieldError(document.getElementById('studentProgram'), document.getElementById('studentProgramError'));
            clearFieldError(document.getElementById('studentAcademicYear'), document.getElementById('studentAcademicYearError'));
            clearFieldError(document.getElementById('studentClassYear'), document.getElementById('studentClassYearError'));
            clearFieldError(document.getElementById('studentTerm'), document.getElementById('studentTermError'));
            clearFieldError(document.getElementById('studentMobile'), document.getElementById('studentMobileError'));
            clearFieldError(document.getElementById('studentEmail'), document.getElementById('studentEmailError'));
            saveAttempts.student = 0; // reset attempts
        }
        function showEditStudentForm(student) {
            document.getElementById('studentFormTitle').textContent = 'Edit Student';
            document.getElementById('saveStudentBtn').innerHTML = '<i class="fas fa-save"></i> Update Student';
            editingStudentId = student.id;
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentEnrollment').value = student.enrollment;
            document.getElementById('studentProgram').value = student.program;
            document.getElementById('studentAcademicYear').value = student.academicYear;
            document.getElementById('studentClassYear').value = student.classYear;
            const event = new Event('change');
            document.getElementById('studentClassYear').dispatchEvent(event);
            setTimeout(() => {
                document.getElementById('studentTerm').value = student.term;
            }, 100);
            document.getElementById('studentMobile').value = student.mobile;
            document.getElementById('studentEmail').value = student.email;
            clearFieldError(document.getElementById('studentName'), document.getElementById('studentNameError'));
            clearFieldError(document.getElementById('studentEnrollment'), document.getElementById('studentEnrollmentError'));
            clearFieldError(document.getElementById('studentProgram'), document.getElementById('studentProgramError'));
            clearFieldError(document.getElementById('studentAcademicYear'), document.getElementById('studentAcademicYearError'));
            clearFieldError(document.getElementById('studentClassYear'), document.getElementById('studentClassYearError'));
            clearFieldError(document.getElementById('studentTerm'), document.getElementById('studentTermError'));
            clearFieldError(document.getElementById('studentMobile'), document.getElementById('studentMobileError'));
            clearFieldError(document.getElementById('studentEmail'), document.getElementById('studentEmailError'));
            saveAttempts.student = 0; // reset attempts
        }
        function saveStudent() {
            if (!validateStudentName() || !validateStudentEnrollment() || !validateStudentProgram() || !validateStudentAcademicYear() || !validateStudentClassYear() || !validateStudentTerm() || !validateStudentMobile() || !validateStudentEmail()) {
                saveAttempts.student++;
                if (saveAttempts.student >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }
            saveAttempts.student = 0;
            const name = document.getElementById('studentName').value.trim();
            const enrollment = document.getElementById('studentEnrollment').value.trim();
            const program = document.getElementById('studentProgram').value;
            const academicYear = document.getElementById('studentAcademicYear').value;
            const classYear = document.getElementById('studentClassYear').value;
            const term = document.getElementById('studentTerm').value;
            const mobile = document.getElementById('studentMobile').value.trim();
            const email = document.getElementById('studentEmail').value.trim();

            const nameParts = name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join('') || '';
            const defaultPassword = firstName + lastName;
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingStudentId) {
                const index = students.findIndex(s => s.id === editingStudentId);
                if (index !== -1) {
                    students[index] = { ...students[index], name, enrollment, program, academicYear, classYear, term, mobile, email, updated_at: today };
                    saveStudents();
                    showToast('Success', 'Student updated', 'success');
                }
            } else {
                const newId = `STU${String(students.length + 1).padStart(3, '0')}`;
                students.push({ id: newId, name, enrollment, program, academicYear, classYear, term, mobile, email, password: defaultPassword, firstLogin: true, created_at: today, updated_at: today });
                saveStudents();
                showToast('Success', 'Student added. Default password: ' + defaultPassword, 'success');
            }
            updateDashboardStats();
            renderStudentTable();
            renderDatabaseStudentTable();
            cancelStudentForm();
        }
        function cancelStudentForm() {
            document.getElementById('studentName').value = '';
            document.getElementById('studentEnrollment').value = '';
            document.getElementById('studentProgram').value = '';
            document.getElementById('studentAcademicYear').value = '';
            document.getElementById('studentClassYear').value = '';
            document.getElementById('studentTerm').innerHTML = '<option value="">Select Class Year first</option>';
            document.getElementById('studentTerm').disabled = true;
            document.getElementById('studentMobile').value = '';
            document.getElementById('studentEmail').value = '';
            editingStudentId = null;
            document.getElementById('studentFormTitle').textContent = 'Add New Student';
            document.getElementById('saveStudentBtn').innerHTML = '<i class="fas fa-save"></i> Save Student';
            clearFieldError(document.getElementById('studentName'), document.getElementById('studentNameError'));
            clearFieldError(document.getElementById('studentEnrollment'), document.getElementById('studentEnrollmentError'));
            clearFieldError(document.getElementById('studentProgram'), document.getElementById('studentProgramError'));
            clearFieldError(document.getElementById('studentAcademicYear'), document.getElementById('studentAcademicYearError'));
            clearFieldError(document.getElementById('studentClassYear'), document.getElementById('studentClassYearError'));
            clearFieldError(document.getElementById('studentTerm'), document.getElementById('studentTermError'));
            clearFieldError(document.getElementById('studentMobile'), document.getElementById('studentMobileError'));
            clearFieldError(document.getElementById('studentEmail'), document.getElementById('studentEmailError'));
            saveAttempts.student = 0; // reset attempts
        }
        function renderStudentTable() {
            const tbody = document.getElementById('studentTableBody');
            tbody.innerHTML = '';
            students.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.enrollment}</td>
                    <td>${s.program}</td>
                    <td>${getAcademicYearNameById(s.academicYear)}</td>
                    <td>${s.classYear}</td>
                    <td>${s.term}</td>
                    <td>${s.mobile}</td>
                    <td>${s.email}</td>
                    <td>${s.firstLogin ? 'Yes' : 'No'}</td>
                `;
                tbody.appendChild(row);
            });
        }
        function filterStudents() {
            const term = document.getElementById('searchStudent').value.toLowerCase();
            const filtered = students.filter(s => s.name.toLowerCase().includes(term) || s.enrollment.toLowerCase().includes(term));
            const tbody = document.getElementById('studentTableBody');
            tbody.innerHTML = '';
            filtered.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.enrollment}</td>
                    <td>${s.program}</td>
                    <td>${getAcademicYearNameById(s.academicYear)}</td>
                    <td>${s.classYear}</td>
                    <td>${s.term}</td>
                    <td>${s.mobile}</td>
                    <td>${s.email}</td>
                    <td>${s.firstLogin ? 'Yes' : 'No'}</td>
                `;
                tbody.appendChild(row);
            });
        }
        function clearStudentSearch() { document.getElementById('searchStudent').value = ''; renderStudentTable(); }

        // Reports
        function initializeReports() {
            document.getElementById('reportTotalInstitutes').textContent = institutes.length;
            document.getElementById('reportTotalProgrammes').textContent = programmes.length;
            document.getElementById('reportTotalClasses').textContent = classes.length;
            document.getElementById('reportActiveYears').textContent = academicYears.filter(y => y.is_current === 'Yes').length;
            initializeCharts();
        }
        let charts = {};
        function initializeCharts() {
            if (charts.instituteChart) charts.instituteChart.destroy();
            if (charts.programmeChart) charts.programmeChart.destroy();
            if (charts.academicYearChart) charts.academicYearChart.destroy();
            if (charts.classDistributionChart) charts.classDistributionChart.destroy();
            const instCtx = document.getElementById('instituteChart').getContext('2d');
            const instCounts = { Active: institutes.filter(i => i.status === 'Active').length, Inactive: institutes.filter(i => i.status === 'Inactive').length };
            charts.instituteChart = new Chart(instCtx, { type: 'pie', data: { labels: ['Active', 'Inactive'], datasets: [{ data: [instCounts.Active, instCounts.Inactive], backgroundColor: ['#10b981', '#ef4444'] }] }, options: { responsive: true } });
            const progCtx = document.getElementById('programmeChart').getContext('2d');
            const progCounts = { Active: programmes.filter(p => p.status === 'Active').length, Completed: programmes.filter(p => p.status === 'Completed').length, Inactive: programmes.filter(p => p.status === 'Inactive').length };
            charts.programmeChart = new Chart(progCtx, { type: 'bar', data: { labels: ['Active', 'Completed', 'Inactive'], datasets: [{ data: [progCounts.Active, progCounts.Completed, progCounts.Inactive], backgroundColor: ['#4f46e5', '#f59e0b', '#ef4444'] }] }, options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } });
            const acCtx = document.getElementById('academicYearChart').getContext('2d');
            const acCounts = { Active: academicYears.filter(y => y.status === 'Active').length, Completed: academicYears.filter(y => y.status === 'Completed').length, Inactive: academicYears.filter(y => y.status === 'Inactive').length };
            charts.academicYearChart = new Chart(acCtx, { type: 'doughnut', data: { labels: ['Active', 'Completed', 'Inactive'], datasets: [{ data: [acCounts.Active, acCounts.Completed, acCounts.Inactive], backgroundColor: ['#8b5cf6', '#f59e0b', '#ef4444'] }] }, options: { responsive: true } });
            const classCtx = document.getElementById('classDistributionChart').getContext('2d');
            const progClassCounts = {};
            programmes.forEach(p => { progClassCounts[p.name] = classes.filter(c => c.programme_name === p.name).length; });
            charts.classDistributionChart = new Chart(classCtx, { type: 'line', data: { labels: Object.keys(progClassCounts), datasets: [{ data: Object.values(progClassCounts), borderColor: '#ec4899', fill: false }] }, options: { responsive: true } });
        }

        function exportToPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.setFontSize(20);
            doc.text('EDU MASTER Report', 20, 20);
            doc.setFontSize(12);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 35);
            doc.text(`Institutes: ${institutes.length}`, 20, 45);
            doc.text(`Programs: ${programmes.length}`, 20, 55);
            doc.text(`Classes: ${classes.length}`, 20, 65);
            doc.text(`Active Academic Years: ${academicYears.filter(y => y.is_current === 'Yes').length}`, 20, 75);
            doc.save(`EDU-MASTER-Report-${new Date().toISOString().slice(0,10)}.pdf`);
            showToast('Success', 'PDF exported', 'success');
        }

        function exportToExcel() {
            const wb = XLSX.utils.book_new();
            const instSheet = XLSX.utils.json_to_sheet(institutes.map(i => ({ ID: i.id, Name: i.name, Code: i.code, Address: i.address, Status: i.status })));
            XLSX.utils.book_append_sheet(wb, instSheet, 'Institutes');
            const progSheet = XLSX.utils.json_to_sheet(programmes.map(p => ({ ID: p.id, Code: p.code, Name: p.name, Duration: p.duration, Status: p.status })));
            XLSX.utils.book_append_sheet(wb, progSheet, 'Programs');
            XLSX.writeFile(wb, `EDU-MASTER-Data-${new Date().toISOString().slice(0,10)}.xlsx`);
            showToast('Success', 'Excel exported', 'success');
        }

        // Settings
        function updateProfileSettings() {
            if (!currentUser || currentUser.role !== 'admin') return;
            document.getElementById('profileName').value = currentUser.name;
            document.getElementById('profileEmail').value = currentUser.email;
            document.getElementById('profileRole').value = currentUser.roleName;
            document.getElementById('profileMobile').value = currentUser.mobile || '';
            clearFieldError(document.getElementById('profileName'), document.getElementById('profileNameError'));
            clearFieldError(document.getElementById('profileEmail'), document.getElementById('profileEmailError'));
            clearFieldError(document.getElementById('profileMobile'), document.getElementById('profileMobileError'));
        }
        function saveProfile() {
            if (!validateProfileName() || !validateProfileEmail() || !validateProfileMobile()) {
                return;
            }
            const name = document.getElementById('profileName').value.trim();
            const email = document.getElementById('profileEmail').value.trim();
            const mobile = document.getElementById('profileMobile').value.trim();

            storedCredentials.admin.name = name;
            storedCredentials.admin.email = email;
            storedCredentials.admin.mobile = mobile;
            localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
            currentUser.name = name;
            currentUser.email = email;
            currentUser.mobile = mobile;
            document.getElementById('dashboardUserName').textContent = name;
            document.getElementById('avatarText').textContent = name.charAt(0);
            showToast('Success', 'Profile updated', 'success');
        }

        // ==================== MODIFIED CHANGE USERNAME WITH DOUBLE-CLICK RULE ====================
        function changeUsername() {
            const current = document.getElementById('currentUsername').value.trim();
            const newUser = document.getElementById('newUsername').value.trim();
            const confirm = document.getElementById('confirmUsername').value.trim();
            const currentErr = document.getElementById('currentUsernameError');
            const newErr = document.getElementById('newUsernameError');
            const confirmErr = document.getElementById('confirmUsernameError');

            let anyEmpty = false;
            if (!current) {
                showFieldError(document.getElementById('currentUsername'), currentErr, 'Current Username is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('currentUsername'), currentErr); }

            if (!newUser) {
                showFieldError(document.getElementById('newUsername'), newErr, 'New Username is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('newUsername'), newErr); }

            if (!confirm) {
                showFieldError(document.getElementById('confirmUsername'), confirmErr, 'Confirm Username is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('confirmUsername'), confirmErr); }

            if (anyEmpty) {
                usernameChangeAttempts++;
                if (usernameChangeAttempts >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }

            // No empty fields, reset attempts
            usernameChangeAttempts = 0;

            if (newUser !== confirm) {
                showFieldError(document.getElementById('confirmUsername'), confirmErr, 'Confirm username does not match.');
                return;
            }
            if (current !== storedCredentials.admin.username) {
                showFieldError(document.getElementById('currentUsername'), currentErr, 'Current username incorrect');
                return;
            }

            storedCredentials.admin.username = newUser;
            localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
            currentUser.username = newUser;
            document.getElementById('currentUsername').value = '';
            document.getElementById('newUsername').value = '';
            document.getElementById('confirmUsername').value = '';
            showToast('Success', 'Username changed', 'success');
        }

        // ==================== MODIFIED CHANGE PASSWORD WITH DOUBLE-CLICK RULE ====================
        function changePassword() {
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;
            const currentErr = document.getElementById('currentPasswordError');
            const newErr = document.getElementById('newPasswordError');
            const confirmErr = document.getElementById('confirmPasswordError');

            let anyEmpty = false;
            if (!current) {
                showFieldError(document.getElementById('currentPassword'), currentErr, 'Current Password is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('currentPassword'), currentErr); }

            if (!newPass) {
                showFieldError(document.getElementById('newPassword'), newErr, 'New Password is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('newPassword'), newErr); }

            if (!confirm) {
                showFieldError(document.getElementById('confirmPassword'), confirmErr, 'Confirm Password is required');
                anyEmpty = true;
            } else { clearFieldError(document.getElementById('confirmPassword'), confirmErr); }

            if (anyEmpty) {
                passwordChangeAttempts++;
                if (passwordChangeAttempts >= 2) {
                    showToast('Error', 'All fields are required.', 'error');
                }
                return;
            }

            // No empty fields, reset attempts
            passwordChangeAttempts = 0;

            if (newPass !== confirm) {
                showFieldError(document.getElementById('confirmPassword'), confirmErr, 'Confirm password does not match.');
                return;
            }

            if (!isStrongPassword(newPass)) {
                showFieldError(document.getElementById('newPassword'), newErr, 'Password does not meet requirements');
                return;
            }

            if (current !== storedCredentials.admin.password) {
                showFieldError(document.getElementById('currentPassword'), currentErr, 'Current password incorrect');
                return;
            }

            storedCredentials.admin.password = newPass;
            localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            showToast('Success', 'Password changed', 'success');
        }

        // ==================== ADD HOD EMAIL DEFAULT (append @gmail.com on blur) ====================
        document.addEventListener('DOMContentLoaded', function() {
            const hodEmailInput = document.getElementById('hodEmail');
            if (hodEmailInput) {
                hodEmailInput.addEventListener('blur', function() {
                    let val = this.value.trim();
                    if (val && !val.includes('@')) {
                        this.value = val + '@gmail.com';
                    }
                    // already lowercase via setupEmailLowercase
                });
            }
        });

        // Reset forms
        function resetAllForms() {
            cancelInstituteForm();
            cancelAcademicForm();
            cancelProgrammeForm();
            cancelClassForm();
            cancelHodForm();
            cancelStudentForm();
        }

        // Logout
        async function handleLogout() {
            const confirmed = await showCustomConfirm('Logout?', 'Confirm Logout');
            if (confirmed) {
                showToast('Logged Out', 'See you soon!', 'success');
                document.getElementById('successBanner').style.display = 'none';
                document.getElementById('welcomeBanner').style.display = 'block';
                if (successBannerTimeout) clearTimeout(successBannerTimeout);
                hasSubmitted = false;
                dashboard.style.opacity = '0';
                studentDashboard.style.opacity = '0';
                hodDashboard.style.opacity = '0';
                setTimeout(() => {
                    dashboard.style.display = 'none';
                    studentDashboard.style.display = 'none';
                    hodDashboard.style.display = 'none';
                    loginPage.style.display = 'flex';
                    loginPage.style.opacity = '0';
                    const wrapper = document.querySelector('.login-wrapper');
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(20px) scale(0.98)';
                    wrapper.style.animation = 'none';
                    setTimeout(() => {
                        loginPage.style.opacity = '1';
                        wrapper.style.animation = 'cardAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                        wrapper.style.animationDelay = '0.3s';
                        document.getElementById('username').focus();
                    }, 50);
                    currentUser = null;
                }, 300);
            }
        }

        // Utility functions
        function showToast(title, msg, type) {
            if (toastTimeout) clearTimeout(toastTimeout);
            document.getElementById('toastTitle').textContent = title;
            document.getElementById('toastMessage').textContent = msg;
            document.getElementById('toast').className = 'toast';
            document.getElementById('toast').classList.add(`toast-${type}`);
            document.getElementById('toast').classList.add('show');
            toastTimeout = setTimeout(() => { document.getElementById('toast').classList.remove('show'); }, 3000);
        }
        function hideToast() { document.getElementById('toast').classList.remove('show'); }
        function showError(field, msg) {
            const input = document.getElementById(field);
            const err = document.getElementById(field + 'Error');
            if (input && err) {
                input.classList.add('error');
                err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
                err.classList.add('show');
            }
        }
        function clearError(field) {
            const input = document.getElementById(field);
            const err = document.getElementById(field + 'Error');
            if (input && err) {
                input.classList.remove('error');
                err.classList.remove('show');
                err.innerHTML = '';
            }
        }
        function clearErrors() {
            clearError('username');
            clearError('password');
        }
        function resetLoginForm() {
            document.getElementById('loginForm').reset();
            clearErrors();
            clearDepartmentError();
            document.getElementById('loginButton').disabled = false;
            document.getElementById('loadingSpinner').style.display = 'none';
            document.getElementById('loginButton').querySelector('span').textContent = 'LOGIN TO DASHBOARD';
            hasSubmitted = false;
        }

        // Class code options (kept for compatibility)
        const classCodeOptions = {
            'Computer Engineering': ['FY-CO', 'SY-CO', 'TY-CO'],
            'Civil Engineering': ['FY-CIVIL', 'SY-CIVIL', 'TY-CIVIL'],
            'Mechanical Engineering': ['FY-MECH', 'SY-MECH', 'TY-MECH'],
            'Electrical Engineering': ['FY-EJ', 'SY-EJ', 'TY-EJ'],
            'Electronics and Telecommunication Engineering': ['FY-ENTC', 'SY-ENTC', 'TY-ENTC']
        };

        const termMapping = {
            'FY-CO': ['TERM 1', 'TERM 2'],
            'SY-CO': ['TERM 3', 'TERM 4'],
            'TY-CO': ['TERM 5', 'TERM 6'],
            'FY-CIVIL': ['TERM 1', 'TERM 2'],
            'SY-CIVIL': ['TERM 3', 'TERM 4'],
            'TY-CIVIL': ['TERM 5', 'TERM 6'],
            'FY-MECH': ['TERM 1', 'TERM 2'],
            'SY-MECH': ['TERM 3', 'TERM 4'],
            'TY-MECH': ['TERM 5', 'TERM 6'],
            'FY-EJ': ['TERM 1', 'TERM 2'],
            'SY-EJ': ['TERM 3', 'TERM 4'],
            'TY-EJ': ['TERM 5', 'TERM 6'],
            'FY-ENTC': ['TERM 1', 'TERM 2'],
            'SY-ENTC': ['TERM 3', 'TERM 4'],
            'TY-ENTC': ['TERM 5', 'TERM 6']
        };

        function updateAcademicYearDropdownForClassMaster() {
            const dropdown = document.getElementById('classAcademicYear');
            const currentValue = dropdown.value;
            dropdown.innerHTML = '<option value="">Select Academic Year</option>';
            const available = academicYears.filter(year => year.status === 'Active' && year.is_current === 'Yes');
            available.forEach(year => {
                const option = document.createElement('option');
                option.value = year.id;
                option.textContent = year.name;
                dropdown.appendChild(option);
            });
            if (currentValue && available.some(y => y.id === currentValue)) dropdown.value = currentValue;
        }

        function updateProgrammeDropdownForClassMaster() {
            const dropdown = document.getElementById('classProgramme');
            const currentValue = dropdown.value;
            dropdown.innerHTML = '<option value="">Select Program</option>';
            const available = programmes.filter(p => p.status === 'Active');
            available.forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = `${p.name} (${p.id})`;
                dropdown.appendChild(option);
            });
            if (currentValue && available.some(p => p.id === currentValue)) dropdown.value = currentValue;
        }

        function updateClassCodeDropdown() {
            const programmeSelect = document.getElementById('classProgramme');
            const classCodeSelect = document.getElementById('classCode');
            const selectedProgrammeId = programmeSelect.value;
            classCodeSelect.innerHTML = '';
            if (!selectedProgrammeId) {
                classCodeSelect.disabled = true;
                classCodeSelect.innerHTML = '<option value="">Select Program first</option>';
                return;
            }
            const selectedProgramme = programmes.find(p => p.id === selectedProgrammeId);
            if (!selectedProgramme) {
                classCodeSelect.disabled = true;
                classCodeSelect.innerHTML = '<option value="">Program not found</option>';
                return;
            }
            classCodeSelect.disabled = false;
            classCodeSelect.innerHTML = '<option value="">Select Class Code</option>';
            const programName = selectedProgramme.name;
            if (classCodeOptions[programName]) {
                classCodeOptions[programName].forEach(code => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = code;
                    classCodeSelect.appendChild(option);
                });
            } else {
                ['FY', 'SY', 'TY'].forEach(code => {
                    const option = document.createElement('option');
                    option.value = `${code}-${selectedProgramme.code}`;
                    option.textContent = `${code}-${selectedProgramme.code}`;
                    classCodeSelect.appendChild(option);
                });
            }
        }

        function updateTermDropdown(classCode) {
            const termSelect = document.getElementById('classTerm');
            termSelect.innerHTML = '<option value="">Select Term</option>';
            if (!classCode) {
                termSelect.disabled = true;
                return;
            }
            const terms = termMapping[classCode] || [];
            terms.forEach(term => {
                const option = document.createElement('option');
                option.value = term;
                option.textContent = term;
                termSelect.appendChild(option);
            });
            termSelect.disabled = false;
        }
   
