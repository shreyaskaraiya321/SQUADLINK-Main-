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
    if (!formMessage) return;
    formMessage.textContent = msg;
    formMessage.style.display = 'block';
    formMessage.style.color = isError ? 'var(--color-error)' : 'var(--color-primary)';
    formMessage.style.textShadow = isError ? '0 0 5px rgba(255, 180, 171, 0.5)' : '0 0 5px rgba(229, 216, 184, 0.5)';

    // Auto hide after 3 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 3000);
}

function loadProfile() {
    const userStr = localStorage.getItem('squadlink_currentUser');
    if (!userStr) {
        window.location.href = 'login.html'; // Redirect if not logged in
        return;
    }

    currentUserData = JSON.parse(userStr);

    if (usernameInput) usernameInput.value = currentUserData.username || '';
    if (emailInput) emailInput.value = currentUserData.email || '';

    if (currentUserData.profilePhoto && avatarImage) {
        avatarImage.src = currentUserData.profilePhoto;
        newAvatarBase64 = currentUserData.profilePhoto;
    }

    if (document.getElementById('prof-level')) document.getElementById('prof-level').textContent = currentUserData.level || 1;
    if (document.getElementById('prof-xp')) document.getElementById('prof-xp').textContent = currentUserData.xp || 0;
    if (document.getElementById('prof-streak')) document.getElementById('prof-streak').textContent = currentUserData.streak || 0;
}

// Upload preview bounds
if (avatarPreview && photoUpload) {
    avatarPreview.addEventListener('click', () => {
        photoUpload.click();
    });
}

if (photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation: must be image
        if (!file.type.startsWith('image/')) {
            showMessage('Please upload an image file.', true);
            return;
        }

        // Limit size to roughly 2MB
        if (file.size > 2 * 1024 * 1024) {
            showMessage('Image is too large. Max size is 2MB.', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Str = event.target.result;
            if (avatarImage) avatarImage.src = base64Str;
            newAvatarBase64 = base64Str;
        };
        reader.readAsDataURL(file);
    });
}

// Handling form save
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!usernameInput.value || usernameInput.value.trim() === '') {
            showMessage('Username is required.', true);
            return;
        }

        const newUsername = usernameInput.value.trim();

        // Update current user
        currentUserData.username = newUsername;
        if (newAvatarBase64) currentUserData.profilePhoto = newAvatarBase64;

        localStorage.setItem('squadlink_currentUser', JSON.stringify(currentUserData));

        // Also update the global users array so login remains consistent
        let users = JSON.parse(localStorage.getItem('squadlink_users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUserData.email);

        if (userIndex !== -1) {
            // Keep original password, but overwrite username/photo
            users[userIndex].username = currentUserData.username;
            users[userIndex].profilePhoto = currentUserData.profilePhoto;
        } else {
            // If it's a social account that wasn't previously in users array, add them
            if (currentUserData.provider) {
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

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem('squadlink_currentUser');
        window.location.replace('SL.html');
    });
}



document.addEventListener('mousemove', (e) => {
    

    // Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});
