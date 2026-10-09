// ========== PARTICLE GENERATION ==========
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: ${Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-secondary)'};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.5 + 0.2};
          animation: particleDrift ${Math.random() * 10 + 10}s linear infinite;
          animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

const particleStyles = document.createElement('style');
particleStyles.textContent = `
  @keyframes particleDrift {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
  }
`;
document.head.appendChild(particleStyles);
createParticles();

// ========== PARALLAX EFFECT ON GRID ==========
const animatedGrid = document.querySelector('.animated-grid');
const glowOrbs = document.querySelectorAll('.glow-orb');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    if (animatedGrid) {
        animatedGrid.style.transform = `rotateX(60deg) translateY(-50%) translate(${x}px, ${y}px)`;
    }

    if(glowOrbs) {
        glowOrbs.forEach((orb, index) => {
            const speed = index === 0 ? 0.02 : 0.03;
            orb.style.transform = `translate(${x * speed * 100}px, ${y * speed * 100}px)`;
        });
    }
});

// ========== BUTTON RIPPLE EFFECT ==========
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Prevent ripple container relative position issues
        if(this.style.position !== 'relative') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .ripple {
    position: absolute; width: 10px; height: 10px;
    background: rgba(255, 255, 255, 0.4); border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: rippleEffect 0.6s ease-out; pointer-events: none;
  }
  @keyframes rippleEffect {
    to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyles);

// ========== DATABASE SIMULATION (LOCAL STORAGE) ==========
function getUsers() {
    return JSON.parse(localStorage.getItem('squadlink_users')) || [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('squadlink_users', JSON.stringify(users));
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

function showMessage(msg, isError = true) {
    const formMessage = document.getElementById('formMessage');
    if(!formMessage) return;
    formMessage.textContent = msg;
    formMessage.style.display = 'block';
    formMessage.style.color = isError ? 'var(--color-error)' : 'var(--color-primary)';
    formMessage.style.textShadow = isError ? '0 0 5px rgba(255, 180, 171, 0.5)' : '0 0 5px rgba(229, 216, 184, 0.5)';
}

// ========== FORM HANDLING / VALIDATION ==========
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const formMessage = document.getElementById('formMessage');

if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        if(formMessage) formMessage.style.display = 'none';
        
        // Basic validation
        let isValid = true;
        
        if(!isLogin) {
            if(!usernameInput || !usernameInput.value || usernameInput.value.trim() === '') {
                if(usernameInput) usernameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                if(usernameInput) usernameInput.parentElement.classList.remove('error');
            }
        }
        
        if(!emailInput.value || !emailInput.value.includes('@')) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            emailInput.parentElement.classList.remove('error');
        }
        
        if(!passwordInput.value || passwordInput.value.length < 6) {
            passwordInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            passwordInput.parentElement.classList.remove('error');
        }
        
        if(isValid) {
            if(!isLogin) {
                // Register Flow
                const existingUser = getUserByEmail(emailInput.value);
                if(existingUser) {
                    showMessage("Email is already registered.");
                    return;
                }
                
                const newUser = {
                    username: usernameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value // Storing plain text for demo, use hashing in prod
                };
                saveUser(newUser);
                localStorage.setItem('squadlink_currentUser', JSON.stringify(newUser));
                
                const btn = loginForm.querySelector('.login-btn span');
                btn.textContent = "Creating Profile...";
                
                setTimeout(() => {
                    showMessage("Profile created successfully!", false);
                    btn.textContent = "Link Established!";
                    setTimeout(() => {
                        window.location.href = "SL.html";
                    }, 1000);
                }, 1000);
                
            } else {
                // Login Flow
                const user = getUserByEmail(emailInput.value);
                if(!user || user.password !== passwordInput.value) {
                    showMessage("Invalid email or password.");
                    return;
                }
                
                localStorage.setItem('squadlink_currentUser', JSON.stringify(user));
                
                const btn = loginForm.querySelector('.login-btn span');
                btn.textContent = "Authenticating...";
                
                setTimeout(() => {
                    showMessage("Access Granted!", false);
                    btn.textContent = "Link Established!";
                    setTimeout(() => {
                        window.location.href = "SL.html";
                    }, 1000);
                }, 1000);
            }
        }
    });

    // Remove error class on input
    [emailInput, passwordInput].forEach(input => {
        if(input) {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
                if(formMessage) formMessage.style.display = 'none';
            });
        }
    });
    if(usernameInput) {
        usernameInput.addEventListener('input', () => {
            usernameInput.parentElement.classList.remove('error');
            if(formMessage) formMessage.style.display = 'none';
        });
    }
}

// ========== TOGGLE FORM TEXT ==========
function bindToggleFunctionality() {
    const registerLink = document.getElementById('registerLink');
    if(registerLink) {
        registerLink.addEventListener('click', toggleForm);
    }
}

const loginHeader = document.querySelector('.login-header h2');
const loginHeaderSub = document.querySelector('.login-header p');
const submitBtnSpan = document.querySelector('.login-btn span');
let isLogin = true;

function toggleForm(e) {
    e.preventDefault();
    isLogin = !isLogin;
    
    // Add fade effect
    const container = document.querySelector('.login-container');
    container.style.transition = "opacity 0.3s ease";
    container.style.opacity = '0';
    
    const formMessage = document.getElementById('formMessage');
    if(formMessage) formMessage.style.display = 'none';
    
    // Clear inputs and errors
    [document.getElementById('email'), document.getElementById('password'), document.getElementById('username')].forEach(input => {
        if(input) {
            input.value = '';
            input.parentElement.classList.remove('error');
        }
    });
    
    setTimeout(() => {
        const usernameGroup = document.getElementById('usernameGroup');
        if(isLogin) {
            loginHeader.textContent = "Access Granted";
            loginHeaderSub.textContent = "Enter your credentials to continue";
            submitBtnSpan.textContent = "Initialize Link ->";
            document.querySelector('.toggle-form').innerHTML = '<p>No squad yet? <a href="#" id="registerLink">Create Account</a></p>';
            if(usernameGroup) usernameGroup.style.display = 'none';
        } else {
            loginHeader.textContent = "Join Squadlink";
            loginHeaderSub.textContent = "Forge your legacy today";
            submitBtnSpan.textContent = "Create Profile ->";
            document.querySelector('.toggle-form').innerHTML = '<p>Already have a squad? <a href="#" id="registerLink">Login Here</a></p>';
            if(usernameGroup) usernameGroup.style.display = 'block';
        }
        
        bindToggleFunctionality();
        container.style.opacity = '1';
    }, 300);
}

bindToggleFunctionality();

// ========== SOCIAL LOGIN SIMULATION ==========
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Determine provider
        let provider = "Social Account";
        if(btn.classList.contains('discord')) provider = "Discord";
        else if(btn.classList.contains('google')) provider = "Google";
        else if(btn.classList.contains('twitch')) provider = "Twitch";
        
        // Disable buttons
        socialButtons.forEach(b => b.style.pointerEvents = 'none');
        const mainBtn = document.querySelector('.login-btn');
        if(mainBtn) mainBtn.style.pointerEvents = 'none';
        
        // Update Header UI
        loginHeader.textContent = `Authenticating via ${provider}...`;
        loginHeaderSub.textContent = "Please wait while we establish a secure link.";
        
        // Add visual loading feedback to container
        const container = document.querySelector('.login-container');
        container.style.transition = "box-shadow 0.5s ease";
        const originalShadow = container.style.boxShadow;
        container.style.boxShadow = "0 0 60px rgba(229, 216, 184, 0.4), inset 0 0 30px rgba(229, 216, 184, 0.1)";
        
        // Simulation delays
        setTimeout(() => {
            loginHeader.textContent = "Link Established!";
            loginHeaderSub.textContent = `Successfully connected to ${provider}.`;
            container.style.boxShadow = "0 0 60px rgba(229, 216, 184, 0.8), inset 0 0 30px rgba(229, 216, 184, 0.4)";
            
            // Set dummy social user
            const socialUser = { username: `${provider}User`, email: `user@${provider.toLowerCase()}.com`, provider: provider };
            localStorage.setItem('squadlink_currentUser', JSON.stringify(socialUser));

            setTimeout(() => {
                window.location.href = "SL.html";
            }, 1000);
        }, 1500);
    });
});
