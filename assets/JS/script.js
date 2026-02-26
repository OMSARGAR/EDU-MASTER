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

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            updateDashboardStats();
            renderDatabaseTables();
            updateProfileSettings();
            populateAcademicYearDropdown();

            // Default student role: show department selector
            currentRole = 'student';
            document.getElementById('departmentSelector').classList.remove('hidden');
        });

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

        // Setup event listeners
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
            document.getElementById('studentLogoutBtn').addEventListener('click', handleLogout);
            document.getElementById('hodLogoutBtn').addEventListener('click', handleLogout);

            // Back buttons
            document.getElementById('backFromInstitute').addEventListener('click', showMainDashboard);
            document.getElementById('backFromAcademic').addEventListener('click', showMainDashboard);
            document.getElementById('backFromProgramme').addEventListener('click', showMainDashboard);
            document.getElementById('backFromClass').addEventListener('click', showMainDashboard);
            document.getElementById('backFromReports').addEventListener('click', showMainDashboard);
            document.getElementById('backFromSettings').addEventListener('click', showMainDashboard);
            document.getElementById('backFromHod').addEventListener('click', showMainDashboard);
            document.getElementById('backFromStudent').addEventListener('click', showMainDashboard);

            // Quick actions
            document.getElementById('addInstituteBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                showInstituteModule();
                showAddInstituteForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addAcademicYearBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                showAcademicModule();
                showAddAcademicForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addProgrammeBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                showProgrammeModule();
                showAddProgrammeForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addClassBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                showClassModule();
                showAddClassForm();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('addHodBtn').addEventListener('click', function() {
                if (currentUser && currentUser.role === 'admin') {
                    saveDashboardScrollPosition();
                    showHodModule();
                    showAddHodForm();
                    setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                }
            });
            document.getElementById('viewReportsBtn').addEventListener('click', function() {
                saveDashboardScrollPosition();
                showReportsModule();
                setTimeout(() => { dashboard.scrollTop = 0; }, 10);
            });
            document.getElementById('settingsBtn').addEventListener('click', function() {
                if (currentUser && currentUser.role === 'admin') {
                    saveDashboardScrollPosition();
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

            // HOD Sidebar Toggle
            document.getElementById('hodSidebarToggle').addEventListener('click', function() {
                document.getElementById('hodSidebar').classList.toggle('closed');
            });

            // HOD Menu Items
            document.querySelectorAll('.hod-menu-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.hod-menu-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    const section = this.dataset.section;
                    document.querySelectorAll('.hod-section').forEach(s => s.style.display = 'none');
                    if (section === 'dashboard') document.getElementById('hodDashboardSection').style.display = 'block';
                    else if (section === 'addStudent') document.getElementById('hodAddStudentSection').style.display = 'block';
                    else if (section === 'faculty') { document.getElementById('hodFacultySection').style.display = 'block'; renderFacultyTable(); }
                    else if (section === 'createFeedback') { document.getElementById('hodCreateFeedbackSection').style.display = 'block'; updateFacultyDropdown(); }
                    else if (section === 'viewFeedback') { document.getElementById('hodViewFeedbackSection').style.display = 'block'; renderFeedbackView(); }
                });
            });

            // HOD Save Student
            document.getElementById('hodSaveStudentBtn').addEventListener('click', hodSaveStudent);

            // HOD Save Faculty
            document.getElementById('hodSaveFacultyBtn').addEventListener('click', hodSaveFaculty);

            // HOD Create Feedback
            document.getElementById('hodSaveFeedbackBtn').addEventListener('click', hodSaveFeedback);

            // Student Sidebar Toggle
            document.getElementById('studentSidebarToggle').addEventListener('click', function() {
                document.getElementById('studentSidebar').classList.toggle('closed');
            });

            // Student Menu Items
            document.querySelectorAll('.student-menu-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.student-menu-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    const section = this.dataset.section;
                    if (section === 'profile') {
                        document.getElementById('studentProfileSection').style.display = 'flex';
                        document.getElementById('studentFeedbackSection').style.display = 'none';
                    } else {
                        document.getElementById('studentProfileSection').style.display = 'none';
                        document.getElementById('studentFeedbackSection').style.display = 'block';
                        loadStudentFeedbackForms();
                    }
                });
            });
        }

        // HOD Functions
        function hodSaveStudent() {
            const academicYear = document.getElementById('hodStudentAcademicYear').value;
            const dept = document.getElementById('hodStudentDepartment').value;
            const year = document.getElementById('hodStudentYear').value;
            const term = document.getElementById('hodStudentTerm').value;
            const name = document.getElementById('hodStudentName').value.trim();
            const enrollment = document.getElementById('hodStudentEnrollment').value.trim();
            const mobile = document.getElementById('hodStudentMobile').value.trim();
            const email = document.getElementById('hodStudentEmail').value.trim();
            if (!academicYear || !dept || !year || !term || !name || !enrollment || !mobile || !email) {
                alert('All fields required');
                return;
            }
            const nameParts = name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join('') || '';
            const defaultPassword = firstName + lastName;
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            const newId = `STU${String(students.length + 1).padStart(3, '0')}`;
            const newStudent = {
                id: newId,
                name,
                enrollment,
                program: dept,
                academicYear,
                classYear: year === 'FY-CO' ? 'First Year' : year === 'SY-CO' ? 'Second Year' : 'Third Year',
                term,
                mobile,
                email,
                password: defaultPassword,
                firstLogin: true,
                created_at: today,
                updated_at: today
            };
            students.push(newStudent);
            saveStudents();
            alert('Student added. Default password: ' + defaultPassword);
            document.getElementById('hodAddStudentSection').querySelectorAll('input, select').forEach(el => el.value = '');
        }

        function hodSaveFaculty() {
            const academicYear = document.getElementById('hodFacultyAcademicYear').value;
            const dept = document.getElementById('hodFacultyDepartment').value;
            const year = document.getElementById('hodFacultyYear').value;
            const term = document.getElementById('hodFacultyTerm').value;
            const name = document.getElementById('hodFacultyName').value.trim();
            const subject = document.getElementById('hodFacultySubject').value.trim();
            const mobile = document.getElementById('hodFacultyMobile').value.trim();
            const email = document.getElementById('hodFacultyEmail').value.trim();
            if (!academicYear || !dept || !year || !term || !name || !subject || !mobile || !email) {
                alert('All fields required');
                return;
            }
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            faculties.push({
                id: 'FAC' + Date.now(),
                academicYear,
                department: dept,
                year,
                term,
                name,
                subject,
                mobile,
                email,
                created_at: today
            });
            saveFaculties();
            alert('Faculty added');
            renderFacultyTable();
            document.getElementById('hodFacultySection').querySelectorAll('input, select').forEach(el => el.value = '');
        }

        function renderFacultyTable() {
            const tbody = document.getElementById('hodFacultyTableBody');
            tbody.innerHTML = '';
            faculties.filter(f => f.department === currentUser.department).forEach(f => {
                const row = `<tr><td>${f.name}</td><td>${f.subject}</td><td>${f.year}</td><td>${f.term}</td><td>${f.mobile}</td><td>${f.email}</td></tr>`;
                tbody.innerHTML += row;
            });
        }

        function updateFacultyDropdown() {
            const select = document.getElementById('hodFeedbackFaculty');
            select.innerHTML = '<option value="">Select Faculty</option>';
            faculties.filter(f => f.department === currentUser.department).forEach(f => {
                select.innerHTML += `<option value="${f.id}" data-subject="${f.subject}">${f.name} (${f.subject})</option>`;
            });
            select.addEventListener('change', function() {
                const opt = this.options[this.selectedIndex];
                document.getElementById('hodFeedbackSubject').value = opt.dataset.subject || '';
            });
        }

        function hodSaveFeedback() {
            const academicYear = document.getElementById('hodFeedbackAcademicYear').value;
            const dept = document.getElementById('hodFeedbackDepartment').value;
            const year = document.getElementById('hodFeedbackYear').value;
            const term = document.getElementById('hodFeedbackTerm').value;
            const facultyId = document.getElementById('hodFeedbackFaculty').value;
            const subject = document.getElementById('hodFeedbackSubject').value;
            const heading1 = document.getElementById('hodFeedbackHeading1').value.trim();
            const heading2 = document.getElementById('hodFeedbackHeading2').value.trim();
            if (!academicYear || !dept || !year || !term || !facultyId || !subject || !heading1 || !heading2) {
                alert('All fields required');
                return;
            }
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            const faculty = faculties.find(f => f.id === facultyId);
            feedbacks.push({
                id: 'FB' + Date.now(),
                academicYear,
                department: dept,
                year,
                term,
                facultyId,
                facultyName: faculty ? faculty.name : '',
                subject,
                headings: [heading1, heading2],
                created_at: today
            });
            saveFeedbacks();
            alert('Feedback created');
        }

        function renderFeedbackView() {
            const container = document.getElementById('hodFeedbackViewContainer');
            container.innerHTML = '';
            const hodFeedbacks = feedbacks.filter(f => f.department === currentUser.department);
            if (hodFeedbacks.length === 0) {
                container.innerHTML = '<p>No feedbacks yet.</p>';
                return;
            }
            hodFeedbacks.forEach(fb => {
                const responses = feedbackResponses.filter(r => r.feedbackId === fb.id);
                const faculty = faculties.find(f => f.id === fb.facultyId);
                const facultyName = faculty ? faculty.name : fb.facultyName;
                const html = `
                    <div class="form-card">
                        <h4>${fb.subject} - ${facultyName}</h4>
                        <p>Year: ${fb.year} | Term: ${fb.term}</p>
                        <table class="data-table">
                            <thead><tr><th>Student</th><th>${fb.headings[0]}</th><th>${fb.headings[1]}</th></tr></thead>
                            <tbody>
                                ${responses.map(r => `<tr><td>${r.studentName}</td><td>${r.marks[0]}</td><td>${r.marks[1]}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                container.innerHTML += html;
            });
        }

        function loadStudentFeedbackForms() {
            const container = document.getElementById('studentFeedbackList');
            container.innerHTML = '';
            const student = currentUser;
            const availableFeedbacks = feedbacks.filter(f => 
                f.department === student.program && 
                f.year === student.classYear.replace('First Year','FY-CO').replace('Second Year','SY-CO').replace('Third Year','TY-CO') &&
                f.term === student.term
            );
            if (availableFeedbacks.length === 0) {
                container.innerHTML = '<p>No feedback forms available.</p>';
                return;
            }
            availableFeedbacks.forEach(fb => {
                const alreadySubmitted = feedbackResponses.some(r => r.feedbackId === fb.id && r.studentId === student.id);
                if (alreadySubmitted) {
                    container.innerHTML += `<div class="alert alert-info">You have already submitted feedback for ${fb.subject}</div>`;
                } else {
                    container.innerHTML += `
                        <div class="form-card" id="fb-${fb.id}">
                            <h4>${fb.subject} - ${fb.facultyName}</h4>
                            <p>${fb.headings[0]} (out of 5): <input type="number" min="1" max="5" id="mark1-${fb.id}"></p>
                            <p>${fb.headings[1]} (out of 5): <input type="number" min="1" max="5" id="mark2-${fb.id}"></p>
                            <button class="btn btn-primary" onclick="submitFeedback('${fb.id}')">Submit</button>
                        </div>
                    `;
                }
            });
        }

        window.submitFeedback = function(feedbackId) {
            const fb = feedbacks.find(f => f.id === feedbackId);
            const mark1 = document.getElementById(`mark1-${feedbackId}`).value;
            const mark2 = document.getElementById(`mark2-${feedbackId}`).value;
            if (!mark1 || !mark2) { alert('Please enter marks'); return; }
            feedbackResponses.push({
                feedbackId,
                studentId: currentUser.id,
                studentName: currentUser.name,
                marks: [mark1, mark2]
            });
            saveFeedbackResponses();
            alert('Feedback submitted');
            loadStudentFeedbackForms();
        };

        // Class Code options mapping (same as before)
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

        // Login handling
        let currentUser = null;
        let toastTimeout = null;
        let currentRole = 'student'; // default to student
        let successBannerTimeout = null;
        let hasSubmitted = false;
        let loginAnimationPlayed = false;
        let dashboardScrollPosition = 0;

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
            let isValid = true;
            if (!username) { showError('username', 'Username is required'); isValid = false; }
            if (!password) { showError('password', 'Password is required'); isValid = false; }
            if (!isValid) return;

            const role = currentRole;
            const department = document.getElementById('loginDepartment').value;
            if ((role === 'student' || role === 'hod') && !department) {
                alert('Please select a department');
                return;
            }

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
                            username: hod.username
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
                        setTimeout(() => showHodDashboard(), 500);
                    } else if (role === 'student') {
                        if (currentUser.firstLogin) {
                            // Force password change
                            setTimeout(() => showFirstLoginChangePassword(), 500);
                        } else {
                            setTimeout(() => showStudentDashboard(), 500);
                        }
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

        function showFirstLoginChangePassword() {
            // Show custom alert with password change fields
            const overlay = document.getElementById('customAlertOverlay');
            document.getElementById('customAlertTitle').textContent = 'First Login - Change Password';
            document.getElementById('customAlertMessage').innerHTML = `
                <input type="password" id="newPasswordFirst" class="search-input" placeholder="New Password" style="margin-bottom:10px;">
                <input type="password" id="confirmPasswordFirst" class="search-input" placeholder="Confirm Password">
            `;
            document.getElementById('customAlertIcon').innerHTML = '<i class="fas fa-key"></i>';
            document.getElementById('customAlertIcon').className = 'custom-alert-icon warning';
            document.getElementById('customAlertCancel').style.display = 'inline-flex';
            document.getElementById('customAlertConfirm').textContent = 'Change';
            document.getElementById('customAlertCancel').textContent = 'Cancel';
            overlay.classList.add('show');

            const handleConfirm = () => {
                const newPass = document.getElementById('newPasswordFirst').value;
                const confirmPass = document.getElementById('confirmPasswordFirst').value;
                if (!newPass || !confirmPass) {
                    alert('Please fill both fields');
                    return;
                }
                if (newPass !== confirmPass) {
                    alert('Passwords do not match');
                    return;
                }
                // Update student password
                const student = students.find(s => s.id === currentUser.id);
                if (student) {
                    student.password = newPass;
                    student.firstLogin = false;
                    saveStudents();
                    currentUser.firstLogin = false;
                }
                hideCustomAlert();
                showToast('Password Changed', 'Please login again with new password', 'success');
                handleLogout();
            };

            const handleCancel = () => {
                hideCustomAlert();
                handleLogout();
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') handleCancel();
                else if (e.key === 'Enter') handleConfirm();
            };

            document.getElementById('customAlertConfirm').onclick = handleConfirm;
            document.getElementById('customAlertCancel').onclick = handleCancel;
            document.addEventListener('keydown', handleKeyDown);
            customAlertResolve = () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.getElementById('customAlertConfirm').onclick = null;
                document.getElementById('customAlertCancel').onclick = null;
            };
        }

        function showStudentDashboard() {
            loginPage.style.opacity = '0';
            loginPage.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                loginPage.style.display = 'none';
                studentDashboard.style.display = 'block';
                studentDashboard.style.opacity = '0';
                studentDashboard.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    studentDashboard.style.opacity = '1';
                    updateStudentDashboard();
                }, 50);
            }, 300);
        }

        function updateStudentDashboard() {
            document.getElementById('studentSidebarName').textContent = currentUser.name;
            document.getElementById('studentAvatarLargeSide').textContent = currentUser.name.charAt(0);
            document.getElementById('studentAvatarLarge').textContent = currentUser.name.charAt(0);
            document.getElementById('studentFullName').textContent = currentUser.name;
            document.getElementById('studentEnrollment').textContent = currentUser.enrollment;
            document.getElementById('studentProgram').textContent = currentUser.program;
            document.getElementById('studentAcademicYear').textContent = getAcademicYearNameById(currentUser.academicYear);
            document.getElementById('studentClass').textContent = currentUser.classYear;
            document.getElementById('studentTerm').textContent = currentUser.term;
        }

        function showHodDashboard() {
            loginPage.style.opacity = '0';
            loginPage.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                loginPage.style.display = 'none';
                hodDashboard.style.display = 'block';
                hodDashboard.style.opacity = '0';
                hodDashboard.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    hodDashboard.style.opacity = '1';
                    // Set HOD department fields
                    document.getElementById('hodStudentDepartment').value = currentUser.department;
                    document.getElementById('hodFacultyDepartment').value = currentUser.department;
                    document.getElementById('hodFeedbackDepartment').value = currentUser.department;
                    document.getElementById('hodSidebarName').textContent = currentUser.name;
                    // Populate academic year dropdowns
                    const acSelects = ['hodStudentAcademicYear', 'hodFacultyAcademicYear', 'hodFeedbackAcademicYear'];
                    acSelects.forEach(id => {
                        const select = document.getElementById(id);
                        select.innerHTML = '<option value="">Select</option>';
                        academicYears.filter(y => y.status === 'Active').forEach(y => {
                            select.innerHTML += `<option value="${y.id}">${y.name}</option>`;
                        });
                    });
                    // Stats
                    document.getElementById('hodTotalStudents').textContent = students.filter(s => s.program === currentUser.department).length;
                    document.getElementById('hodTotalFaculty').textContent = faculties.filter(f => f.department === currentUser.department).length;
                    document.getElementById('hodTotalFeedbacks').textContent = feedbacks.filter(f => f.department === currentUser.department).length;
                }, 50);
            }, 300);
        }

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
        }

        function updateDashboardStats() {
            document.getElementById('statInstitutes').textContent = institutes.length;
            document.getElementById('statYears').textContent = academicYears.length;
            document.getElementById('statProgrammes').textContent = programmes.length;
            document.getElementById('statClasses').textContent = classes.length;
            document.getElementById('instituteChange').textContent = institutes.length;
            document.getElementById('programmeChange').textContent = programmes.length;
            document.getElementById('classChange').textContent = classes.length;
            const activeYears = academicYears.filter(y => y.is_current === 'Yes').length;
            document.getElementById('activeYearCount').textContent = activeYears;
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
        }

        function saveDashboardScrollPosition() { dashboardScrollPosition = dashboard.scrollTop; }

        function showMainDashboard() {
            document.getElementById('mainDashboard').style.display = 'block';
            document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
            resetAllForms();
            updateDashboardStats();
            renderDatabaseTables();
            document.getElementById('databaseTablesSection').style.display = 'block';
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
                    <td>${formatDateForDisplay(inst.updated_at)}</td>
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
                            showAcademicModule();
                            showEditAcademicForm(year);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-academic-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
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
                    <td>${p.description}</td>
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
                            showProgrammeModule();
                            showEditProgrammeForm(prog);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-programme-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
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
                    <td class="actions">
                        ${currentUser && (currentUser.role === 'admin' || currentUser.role === 'hod') ? `
                            <button class="btn btn-primary btn-sm edit-student-db" data-id="${s.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-student-db" data-id="${s.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'hod')) {
                document.querySelectorAll('.edit-student-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const student = students.find(s => s.id === id);
                        if (student) {
                            saveDashboardScrollPosition();
                            showStudentModule();
                            showEditStudentForm(student);
                            setTimeout(() => { dashboard.scrollTop = 0; }, 10);
                        }
                    });
                });
                document.querySelectorAll('.delete-student-db').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        showCustomConfirm('Delete this student?', 'Confirm Delete').then(confirmed => {
                            if (confirmed) {
                                students = students.filter(s => s.id !== id);
                                saveStudents();
                                updateDashboardStats();
                                renderDatabaseStudentTable();
                                showToast('Success', 'Student deleted', 'success');
                            }
                        });
                    });
                });
            }
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

        // Institute CRUD (same as before)
        let editingInstituteId = null;
        function showAddInstituteForm() {
            document.getElementById('instituteFormTitle').textContent = 'Add New Institute';
            document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Save Institute';
            editingInstituteId = null;
            document.getElementById('instituteName').value = '';
            document.getElementById('instituteCode').value = '';
            document.getElementById('instituteAddress').value = '';
            document.getElementById('instituteStatus').value = '';
        }
        function showEditInstituteForm(inst) {
            document.getElementById('instituteFormTitle').textContent = 'Edit Institute';
            document.getElementById('saveInstituteBtn').innerHTML = '<i class="fas fa-save"></i> Update Institute';
            editingInstituteId = inst.id;
            document.getElementById('instituteName').value = inst.name;
            document.getElementById('instituteCode').value = inst.code;
            document.getElementById('instituteAddress').value = inst.address;
            document.getElementById('instituteStatus').value = inst.status;
        }
        function saveInstitute() {
            const name = document.getElementById('instituteName').value.trim();
            const code = document.getElementById('instituteCode').value.trim();
            const address = document.getElementById('instituteAddress').value.trim();
            const status = document.getElementById('instituteStatus').value;
            if (!name || !code || !address || !status) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
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
                    <td>${formatDateForDisplay(inst.updated_at)}</td>
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
                    <td>${formatDateForDisplay(inst.updated_at)}</td>
                    <td class="actions">
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn-primary btn-sm edit-institute" data-id="${inst.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-institute" data-id="${inst.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            attachInstituteActions();
        }
        function clearInstituteSearch() { document.getElementById('searchInstitute').value = ''; renderInstituteTable(); }
        function attachInstituteActions() { /* listeners already on document */ }

        // Academic Year CRUD (simplified)
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
        }
        function saveAcademicYear() {
            const name = document.getElementById('yearName').value.trim();
            const start = document.getElementById('startDate').value;
            const end = document.getElementById('endDate').value;
            const isCurrent = document.getElementById('isCurrentYear').value;
            const status = document.getElementById('academicStatus').value;
            if (!name || !start || !end || !isCurrent || !status) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
            if (isCurrent === 'Yes') {
                const other = academicYears.find(y => y.is_current === 'Yes' && (!editingAcademicId || y.id !== editingAcademicId));
                if (other) {
                    alert(`Another year (${other.name}) is already current.`);
                    return;
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

        // Program CRUD (simplified)
        let editingProgrammeId = null;
        function showAddProgrammeForm() {
            document.getElementById('programmeFormTitle').textContent = 'Add New Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
            editingProgrammeId = null;
            document.getElementById('programmeName').value = '';
            document.getElementById('programmeCode').value = '';
            document.getElementById('programmeDuration').value = '3';
            document.getElementById('programmeDescription').value = '';
            document.getElementById('programmeStatus').value = '';
        }
        function showEditProgrammeForm(prog) {
            document.getElementById('programmeFormTitle').textContent = 'Edit Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Update Program';
            editingProgrammeId = prog.id;
            document.getElementById('programmeName').value = prog.name;
            document.getElementById('programmeCode').value = prog.code;
            document.getElementById('programmeDuration').value = prog.duration;
            document.getElementById('programmeDescription').value = prog.description;
            document.getElementById('programmeStatus').value = prog.status;
        }
        function saveProgramme() {
            const name = document.getElementById('programmeName').value.trim();
            const code = document.getElementById('programmeCode').value.trim();
            const duration = document.getElementById('programmeDuration').value;
            const desc = document.getElementById('programmeDescription').value.trim();
            const status = document.getElementById('programmeStatus').value;
            if (!name || !code || !duration || !status) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
            const today = formatDateToDDMMYYYY(new Date().toISOString().split('T')[0]);
            if (editingProgrammeId) {
                const index = programmes.findIndex(p => p.id === editingProgrammeId);
                if (index !== -1) {
                    programmes[index] = { ...programmes[index], name, code, duration: parseInt(duration), description: desc, status, updated_at: today };
                    saveProgrammes();
                    showToast('Success', 'Program updated', 'success');
                }
            } else {
                const newId = `PID${String(programmes.length + 1).padStart(3, '0')}`;
                programmes.push({ id: newId, name, code, duration: parseInt(duration), description: desc, status, created_at: today, updated_at: today });
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
            document.getElementById('programmeDescription').value = '';
            document.getElementById('programmeStatus').value = '';
            editingProgrammeId = null;
            document.getElementById('programmeFormTitle').textContent = 'Add New Program';
            document.getElementById('saveProgrammeBtn').innerHTML = '<i class="fas fa-save"></i> Save Program';
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
                    <td>${p.description}</td>
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
                    <td>${p.description}</td>
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

        // Class CRUD (simplified)
        let editingClassId = null;
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
        }
        function saveClass() {
            const progId = document.getElementById('classProgramme').value;
            const classCode = document.getElementById('classCode').value;
            const acYear = document.getElementById('classAcademicYear').value;
            const term = document.getElementById('classTerm').value;
            const status = document.getElementById('classStatus').value;
            if (!progId || !classCode || !acYear || !term || !status) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
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
        }
        function cancelClassForm() {
            resetClassForm();
            document.getElementById('classFormTitle').textContent = 'Add New Class';
            document.getElementById('saveClassBtn').innerHTML = '<i class="fas fa-save"></i> Save Class';
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

        // HOD CRUD (with password)
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
        }
        function saveHod() {
            const dept = document.getElementById('hodDepartment').value;
            const name = document.getElementById('hodName').value.trim();
            const mobile = document.getElementById('hodMobile').value.trim();
            const email = document.getElementById('hodEmail').value.trim();
            const username = document.getElementById('hodUsername').value.trim();
            const password = document.getElementById('hodPassword').value;
            if (!dept || !name || !mobile || !email || !username || !password) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
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

        // Student CRUD
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
            // Trigger term update
            const event = new Event('change');
            document.getElementById('studentClassYear').dispatchEvent(event);
            setTimeout(() => {
                document.getElementById('studentTerm').value = student.term;
            }, 100);
            document.getElementById('studentMobile').value = student.mobile;
            document.getElementById('studentEmail').value = student.email;
        }
        function saveStudent() {
            const name = document.getElementById('studentName').value.trim();
            const enrollment = document.getElementById('studentEnrollment').value.trim();
            const program = document.getElementById('studentProgram').value;
            const academicYear = document.getElementById('studentAcademicYear').value;
            const classYear = document.getElementById('studentClassYear').value;
            const term = document.getElementById('studentTerm').value;
            const mobile = document.getElementById('studentMobile').value.trim();
            const email = document.getElementById('studentEmail').value.trim();
            if (!name || !enrollment || !program || !academicYear || !classYear || !term || !mobile || !email) {
                showToast('Error', 'All fields required', 'error');
                return;
            }
            // Default password: firstName + lastName (remove spaces)
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
                    <td class="actions">
                        ${currentUser && (currentUser.role === 'admin' || currentUser.role === 'hod') ? `
                            <button class="btn btn-primary btn-sm edit-student" data-id="${s.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-student" data-id="${s.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll('.edit-student').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const student = students.find(s => s.id === id);
                    if (student) showEditStudentForm(student);
                });
            });
            document.querySelectorAll('.delete-student').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showCustomConfirm('Delete this student?', 'Confirm Delete').then(confirmed => {
                        if (confirmed) {
                            students = students.filter(s => s.id !== id);
                            saveStudents();
                            updateDashboardStats();
                            renderStudentTable();
                            renderDatabaseStudentTable();
                            showToast('Success', 'Student deleted', 'success');
                        }
                    });
                });
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
                    <td class="actions">
                        ${currentUser && (currentUser.role === 'admin' || currentUser.role === 'hod') ? `
                            <button class="btn btn-primary btn-sm edit-student" data-id="${s.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-student" data-id="${s.id}"><i class="fas fa-trash"></i> Delete</button>
                        ` : ''}
                    </td>
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
        }
        function saveProfile() {
            const name = document.getElementById('profileName').value.trim();
            const email = document.getElementById('profileEmail').value.trim();
            const mobile = document.getElementById('profileMobile').value.trim();
            if (!name || !email || !mobile) { showToast('Error', 'All fields required', 'error'); return; }
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
        function changeUsername() {
            const current = document.getElementById('currentUsername').value.trim();
            const newUser = document.getElementById('newUsername').value.trim();
            const confirm = document.getElementById('confirmUsername').value.trim();
            if (!current || !newUser || !confirm) { showToast('Error', 'All fields required', 'error'); return; }
            if (newUser !== confirm) { showToast('Error', 'New usernames do not match', 'error'); return; }
            if (current !== storedCredentials.admin.username) { showToast('Error', 'Current username incorrect', 'error'); return; }
            storedCredentials.admin.username = newUser;
            localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
            currentUser.username = newUser;
            document.getElementById('currentUsername').value = '';
            document.getElementById('newUsername').value = '';
            document.getElementById('confirmUsername').value = '';
            showToast('Success', 'Username changed', 'success');
        }
        function changePassword() {
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;
            if (!current || !newPass || !confirm) { showToast('Error', 'All fields required', 'error'); return; }
            if (newPass !== confirm) { showToast('Error', 'New passwords do not match', 'error'); return; }
            if (current !== storedCredentials.admin.password) { showToast('Error', 'Current password incorrect', 'error'); return; }
            storedCredentials.admin.password = newPass;
            localStorage.setItem('eduMasterAdminCredentials', JSON.stringify(storedCredentials.admin));
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            showToast('Success', 'Password changed', 'success');
        }

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
            document.getElementById('loginButton').disabled = false;
            document.getElementById('loadingSpinner').style.display = 'none';
            document.getElementById('loginButton').querySelector('span').textContent = 'LOGIN TO DASHBOARD';
            hasSubmitted = false;
        }
