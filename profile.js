// ========== PROFILE MANAGEMENT ==========
const profileForm = document.getElementById('profileForm');
const photoUpload = document.getElementById('photoUpload');
const avatarImage = document.getElementById('avatarImage');
const avatarPreview = document.querySelector('.avatar-preview');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('formMessage');
const logoutBtn = document.getElementById('logoutBtn');

let currentUserData = null;
let newAvatarBase64 = null;

function showMessage(msg, isError = false) {
    if(!formMessage) return;
    formMessage.textContent = msg;
    formMessage.style.display = 'block';
    formMessage.style.color = isError ? '#ff3366' : '#00ffff';
    formMessage.style.textShadow = isError ? '0 0 5px rgba(255, 51, 102, 0.5)' : '0 0 5px rgba(0, 255, 255, 0.5)';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 3000);
}

function loadProfile() {
    const userStr = localStorage.getItem('squadlink_currentUser');
    if(!userStr) {
        window.location.href = 'login.html'; // Redirect if not logged in
        return;
    }
    
    currentUserData = JSON.parse(userStr);
    
    if(usernameInput) usernameInput.value = currentUserData.username || '';
    if(emailInput) emailInput.value = currentUserData.email || '';
    
    if(currentUserData.profilePhoto && avatarImage) {
        avatarImage.src = currentUserData.profilePhoto;
        newAvatarBase64 = currentUserData.profilePhoto;
    }
}

// Upload preview bounds
if(avatarPreview && photoUpload) {
    avatarPreview.addEventListener('click', () => {
        photoUpload.click();
    });
}

if(photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file) return;
        
        // Basic validation: must be image
        if(!file.type.startsWith('image/')) {
            showMessage('Please upload an image file.', true);
            return;
        }

        // Limit size to roughly 2MB
        if(file.size > 2 * 1024 * 1024) {
            showMessage('Image is too large. Max size is 2MB.', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Str = event.target.result;
            if(avatarImage) avatarImage.src = base64Str;
            newAvatarBase64 = base64Str;
        };
        reader.readAsDataURL(file);
    });
}

// Handling form save
if(profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(!usernameInput.value || usernameInput.value.trim() === '') {
            showMessage('Username is required.', true);
            return;
        }

        const newUsername = usernameInput.value.trim();
        
        // Update current user
        currentUserData.username = newUsername;
        if(newAvatarBase64) currentUserData.profilePhoto = newAvatarBase64;
        
        localStorage.setItem('squadlink_currentUser', JSON.stringify(currentUserData));
        
        // Also update the global users array so login remains consistent
        let users = JSON.parse(localStorage.getItem('squadlink_users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUserData.email);
        
        if(userIndex !== -1) {
            // Keep original password, but overwrite username/photo
            users[userIndex].username = currentUserData.username;
            users[userIndex].profilePhoto = currentUserData.profilePhoto;
        } else {
            // If it's a social account that wasn't previously in users array, add them
            if(currentUserData.provider) {
                users.push(currentUserData);
            }
        }
        
        localStorage.setItem('squadlink_users', JSON.stringify(users));

        // Submit animation
        const btn = profileForm.querySelector('.primary-btn span');
        const origText = btn.textContent;
        btn.textContent = "Updating Identity...";
        
        setTimeout(() => {
            showMessage("Credentials synced successfully!");
            btn.textContent = origText;
        }, 1000);
    });
}

if(logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem('squadlink_currentUser');
        window.location.replace('SL.html');
    });
}

// Cursor effects imported from login logic (Minimal duplication)
const cursor = document.querySelector('.custom-cursor');
const trails = document.querySelectorAll('.cursor-trail');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let cursorX = mouseX, cursorY = mouseY;
let trailPositions = [{x: mouseX, y: mouseY}, {x: mouseX, y: mouseY}, {x: mouseX, y: mouseY}];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    
    // Minimal Parallax for background
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const animatedGrid = document.querySelector('.animated-grid');
    const glowOrbs = document.querySelectorAll('.glow-orb');
    if (animatedGrid) animatedGrid.style.transform = `rotateX(60deg) translateY(-50%) translate(${x}px, ${y}px)`;
    if(glowOrbs) {
        glowOrbs.forEach((orb, index) => {
            const speed = index === 0 ? 0.02 : 0.03;
            orb.style.transform = `translate(${x * speed * 100}px, ${y * speed * 100}px)`;
        });
    }
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    if(cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    for(let i=0; i<3; i++) {
        trailPositions[i].x += ((i===0 ? cursorX : trailPositions[i-1].x) - trailPositions[i].x) * 0.1;
        trailPositions[i].y += ((i===0 ? cursorY : trailPositions[i-1].y) - trailPositions[i].y) * 0.1;
        if(trails[i]) {
            trails[i].style.left = trailPositions[i].x + 'px';
            trails[i].style.top = trailPositions[i].y + 'px';
        }
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});
