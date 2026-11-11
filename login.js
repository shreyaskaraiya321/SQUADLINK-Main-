// ==========================================================================
// Squadlink Authentication & State Management
// Preserves existing localStorage user architecture (squadlink_users / squadlink_currentUser)
// ==========================================================================

(function () {
    const USERS_KEY = 'squadlink_users';
    const CURRENT_USER_KEY = 'squadlink_currentUser';
    const REMEMBERED_EMAIL_KEY = 'squadlink_rememberedEmail';

    // DOM References
    const authCard = document.querySelector('.auth-card');
    const authTabs = document.getElementById('authTabs');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const authHeading = document.getElementById('authHeading');
    const authSubtitle = document.getElementById('authSubtitle');
    const formMessage = document.getElementById('formMessage');

    const loginForm = document.getElementById('loginForm');
    const usernameGroup = document.getElementById('usernameGroup');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');

    const emailGroup = document.getElementById('emailGroup');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    const passwordGroup = document.getElementById('passwordGroup');
    const passwordLabel = document.getElementById('passwordLabel');
    const passwordInput = document.getElementById('password');
    const passwordHint = document.getElementById('passwordHint');
    const passwordError = document.getElementById('passwordError');
    const passwordToggle = document.getElementById('passwordToggle');

    const formOptions = document.getElementById('formOptions');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const authFooter = document.getElementById('authFooter');

    let currentMode = 'login'; // 'login' | 'register' | 'forgot'
    let isSubmitting = false;

    // ========== STORAGE HELPERS ==========
    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        saveUsers(users);
    }

    function getUserByEmail(email) {
        const normalized = email.trim().toLowerCase();
        return getUsers().find(u => u.email && u.email.trim().toLowerCase() === normalized);
    }

    // ========== UI FEEDBACK HELPERS ==========
    function showMessage(msg, isError = true) {
        if (!formMessage) return;
        formMessage.textContent = msg;
        formMessage.classList.remove('is-error', 'is-success');
        formMessage.classList.add(isError ? 'is-error' : 'is-success');
        formMessage.hidden = false;
    }

    function hideMessage() {
        if (!formMessage) return;
        formMessage.hidden = true;
        formMessage.textContent = '';
        formMessage.classList.remove('is-error', 'is-success');
    }

    function setFieldError(group, errorEl, message) {
        if (group) group.classList.add('error');
        if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(group, errorEl) {
        if (group) group.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
    }

    function clearAllErrors() {
        clearFieldError(usernameGroup, usernameError);
        clearFieldError(emailGroup, emailError);
        clearFieldError(passwordGroup, passwordError);
        hideMessage();
    }

    function setSubmittingState(submitting, labelText) {
        isSubmitting = submitting;
        if (submitBtn) submitBtn.disabled = submitting;
        if (submitBtnText && labelText) submitBtnText.textContent = labelText;
    }

    // ========== PASSWORD VISIBILITY TOGGLE ==========
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            passwordToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
            passwordToggle.setAttribute('aria-pressed', isHidden ? 'true' : 'false');

            const eyeIcon = passwordToggle.querySelector('.icon-eye');
            const eyeOffIcon = passwordToggle.querySelector('.icon-eye-off');
            if (eyeIcon) eyeIcon.hidden = isHidden;
            if (eyeOffIcon) eyeOffIcon.hidden = !isHidden;
        });
    }

    // Reset password visibility back to hidden when switching modes
    function resetPasswordVisibility() {
        if (!passwordInput || !passwordToggle) return;
        passwordInput.type = 'password';
        passwordToggle.setAttribute('aria-label', 'Show password');
        passwordToggle.setAttribute('aria-pressed', 'false');
        const eyeIcon = passwordToggle.querySelector('.icon-eye');
        const eyeOffIcon = passwordToggle.querySelector('.icon-eye-off');
        if (eyeIcon) eyeIcon.hidden = false;
        if (eyeOffIcon) eyeOffIcon.hidden = true;
    }

    // ========== STATE SWITCHING ==========
    function setMode(mode, options = {}) {
        const { preserveEmail = false } = options;
        currentMode = mode;
        clearAllErrors();
        resetPasswordVisibility();

        if (!preserveEmail && emailInput) {
            if (mode === 'login') {
                const remembered = localStorage.getItem(REMEMBERED_EMAIL_KEY);
                emailInput.value = remembered || '';
            } else {
                emailInput.value = '';
            }
        }
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';

        if (mode === 'login') {
            document.title = 'Sign In — Squadlink';
            if (authTabs) authTabs.hidden = false;
            if (tabLogin) {
                tabLogin.classList.add('active');
                tabLogin.setAttribute('aria-selected', 'true');
            }
            if (tabRegister) {
                tabRegister.classList.remove('active');
                tabRegister.setAttribute('aria-selected', 'false');
            }

            authHeading.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Sign in to your Squadlink account and get back in the game.';
            submitBtnText.textContent = 'Sign In';

            if (usernameGroup) usernameGroup.hidden = true;
            if (passwordLabel) passwordLabel.textContent = 'Password';
            if (passwordInput) {
                passwordInput.placeholder = 'Enter your password';
                passwordInput.autocomplete = 'current-password';
            }
            if (passwordHint) passwordHint.hidden = true;
            if (formOptions) formOptions.hidden = false;

            if (authFooter) {
                authFooter.innerHTML = '<p>Don\'t have an account? <a href="#" id="registerLink">Create Account</a></p>';
            }
        } else if (mode === 'register') {
            document.title = 'Create Account — Squadlink';
            if (authTabs) authTabs.hidden = false;
            if (tabLogin) {
                tabLogin.classList.remove('active');
                tabLogin.setAttribute('aria-selected', 'false');
            }
            if (tabRegister) {
                tabRegister.classList.add('active');
                tabRegister.setAttribute('aria-selected', 'true');
            }

            authHeading.textContent = 'Join Squadlink';
            authSubtitle.textContent = 'Create your account and become part of the Squadlink community.';
            submitBtnText.textContent = 'Create Account';

            if (usernameGroup) usernameGroup.hidden = false;
            if (passwordLabel) passwordLabel.textContent = 'Password';
            if (passwordInput) {
                passwordInput.placeholder = 'Minimum 6 characters';
                passwordInput.autocomplete = 'new-password';
            }
            if (passwordHint) passwordHint.hidden = false;
            if (formOptions) formOptions.hidden = true;

            if (authFooter) {
                authFooter.innerHTML = '<p>Already have an account? <a href="#" id="registerLink">Sign In</a></p>';
            }
        } else if (mode === 'forgot') {
            document.title = 'Reset Password — Squadlink';
            if (authTabs) authTabs.hidden = true;

            authHeading.textContent = 'Reset Password';
            authSubtitle.textContent = 'Enter your registered email and set a new password.';
            submitBtnText.textContent = 'Reset Password';

            if (usernameGroup) usernameGroup.hidden = true;
            if (passwordLabel) passwordLabel.textContent = 'New Password';
            if (passwordInput) {
                passwordInput.placeholder = 'Minimum 6 characters';
                passwordInput.autocomplete = 'new-password';
            }
            if (passwordHint) passwordHint.hidden = false;
            if (formOptions) formOptions.hidden = true;

            if (authFooter) {
                authFooter.innerHTML = '<p>Remember your password? <a href="#" id="backToLoginLink">Back to Sign In</a></p>';
            }
        }

        bindFooterLinks();
    }

    function bindFooterLinks() {
        const registerLink = document.getElementById('registerLink');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                setMode(currentMode === 'login' ? 'register' : 'login');
            });
        }

        const backToLoginLink = document.getElementById('backToLoginLink');
        if (backToLoginLink) {
            backToLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                setMode('login', { preserveEmail: true });
            });
        }
    }

    // Bind Tab Switchers
    if (tabLogin) {
        tabLogin.addEventListener('click', () => {
            if (isSubmitting || currentMode === 'login') return;
            setMode('login');
        });
    }

    if (tabRegister) {
        tabRegister.addEventListener('click', () => {
            if (isSubmitting || currentMode === 'register') return;
            setMode('register');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            setMode('forgot', { preserveEmail: true });
        });
    }

    // ========== VALIDATION & SUBMISSION ==========
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isSubmitting) return;

            clearAllErrors();
            let isValid = true;

            const usernameVal = usernameInput ? usernameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const passwordVal = passwordInput ? passwordInput.value : '';

            if (currentMode === 'register') {
                if (!usernameVal) {
                    setFieldError(usernameGroup, usernameError, 'Please enter a username.');
                    isValid = false;
                } else if (usernameVal.length < 3) {
                    setFieldError(usernameGroup, usernameError, 'Username must be at least 3 characters.');
                    isValid = false;
                }
            }

            if (!emailVal || !isValidEmail(emailVal)) {
                setFieldError(emailGroup, emailError, 'Please enter a valid email address.');
                isValid = false;
            }

            if (!passwordVal || passwordVal.length < 6) {
                setFieldError(passwordGroup, passwordError, 'Password must be at least 6 characters.');
                isValid = false;
            }

            if (!isValid) return;

            if (currentMode === 'register') {
                const existingUser = getUserByEmail(emailVal);
                if (existingUser) {
                    setFieldError(emailGroup, emailError, 'An account with this email already exists.');
                    showMessage('This email address is already registered. Please sign in instead.');
                    return;
                }

                const newUser = {
                    username: usernameVal,
                    email: emailVal,
                    password: passwordVal
                };

                setSubmittingState(true, 'Creating account...');

                setTimeout(() => {
                    saveUser(newUser);
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
                    showMessage('Account created successfully. Redirecting...', false);
                    setSubmittingState(true, 'Redirecting...');

                    setTimeout(() => {
                        window.location.href = 'SL.html';
                    }, 600);
                }, 450);

            } else if (currentMode === 'login') {
                const user = getUserByEmail(emailVal);
                if (!user || user.password !== passwordVal) {
                    showMessage('Invalid email address or password.');
                    return;
                }

                if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                    localStorage.setItem(REMEMBERED_EMAIL_KEY, emailVal);
                } else {
                    localStorage.removeItem(REMEMBERED_EMAIL_KEY);
                }

                setSubmittingState(true, 'Signing in...');

                setTimeout(() => {
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                    showMessage('Signed in successfully. Redirecting...', false);
                    setSubmittingState(true, 'Redirecting...');

                    setTimeout(() => {
                        window.location.href = 'SL.html';
                    }, 600);
                }, 450);

            } else if (currentMode === 'forgot') {
                const users = getUsers();
                const normalizedEmail = emailVal.toLowerCase();
                const userIndex = users.findIndex(u => u.email && u.email.trim().toLowerCase() === normalizedEmail);

                if (userIndex === -1) {
                    setFieldError(emailGroup, emailError, 'No account found with this email address.');
                    showMessage('No Squadlink account is registered with that email address.');
                    return;
                }

                setSubmittingState(true, 'Updating password...');

                setTimeout(() => {
                    users[userIndex].password = passwordVal;
                    saveUsers(users);
                    setSubmittingState(false, 'Reset Password');
                    setMode('login', { preserveEmail: true });
                    showMessage('Password updated successfully. You can now sign in.', false);
                }, 450);
            }
        });

        // Clear inline errors while typing
        if (usernameInput) {
            usernameInput.addEventListener('input', () => {
                clearFieldError(usernameGroup, usernameError);
                hideMessage();
            });
        }
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                clearFieldError(emailGroup, emailError);
                hideMessage();
            });
        }
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                clearFieldError(passwordGroup, passwordError);
                hideMessage();
            });
        }
    }

    // ========== INITIALIZATION ==========
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (rememberedEmail && emailInput && rememberMeCheckbox) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }

    bindFooterLinks();
})();
