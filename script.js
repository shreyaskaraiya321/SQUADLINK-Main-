// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName.toLowerCase() === 'section') {
                const animElems = entry.target.querySelectorAll('.stat-card, .feature-card');
                animElems.forEach((el, idx) => {
                    el.style.transitionDelay = `${idx * 80}ms`;
                    el.classList.add('visible');
                });
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe sections for staggered children
document.querySelectorAll('section').forEach(el => {
    observer.observe(el);
});

// ========== NUMBER COUNTER ANIMATION ==========
function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '+';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        // Format number with commas
        const formatted = current.toLocaleString();
        element.textContent = prefix + formatted + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========== CANVAS PARTICLE NETWORK ==========
const canvas = document.getElementById('hero-particles');
if (canvas) {
    const isMobile = window.innerWidth < 768;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const NUM_PARTICLES = isMobile ? 40 : 80;
    const CONNECT_DIST = 120;
    const REPEL_DIST = 100;
    
    let mouse = { x: -1000, y: -1000 };

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const hero = document.getElementById('home');
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        document.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });
    }

    function resizeCanvas() {
        const hero = document.getElementById('home');
        if (!hero) return;
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        
        // Re-distribute particles on resize proportionally to prevent stretching/cropping
        if (particles.length > 0 && oldWidth > 0 && oldHeight > 0) {
            particles.forEach(p => {
                p.x = (p.x / oldWidth) * canvas.width;
                p.y = (p.y / oldHeight) * canvas.height;
            });
        }
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            
            // Normalize speed to be between 0.2 and 0.5
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const targetSpeed = 0.2 + Math.random() * 0.3;
            this.vx = (this.vx / speed) * targetSpeed;
            this.vy = (this.vy / speed) * targetSpeed;

            this.radius = 1 + Math.random() * 1;
            
            // 80% white, 20% cyan
            const isCyan = Math.random() < 0.2;
            if (isCyan) {
                this.color = `rgba(229, 216, 184, 0.3)`;
            } else {
                this.color = `rgba(255, 255, 255, 0.25)`;
            }
            this.baseVx = this.vx;
            this.baseVy = this.vy;
        }

        update() {
            if (!isMobile) {
                // Repel from mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < REPEL_DIST) {
                    const force = (REPEL_DIST - dist) / REPEL_DIST;
                    this.vx -= (dx / dist) * force * 0.5;
                    this.vy -= (dy / dist) * force * 0.5;
                } else {
                    // Return to base velocity smoothly
                    this.vx += (this.baseVx - this.vx) * 0.05;
                    this.vy += (this.baseVy - this.vy) * 0.05;
                }
            }

            this.x += this.vx;
            this.y += this.vy;

            // Wrap around seamlessly
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
        }
    }

    let animationId;
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect lines only on desktop
            if (!isMobile) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist < CONNECT_DIST) {
                        const opacity = (1 - (dist / CONNECT_DIST)) * 0.08;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(229, 216, 184, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        animationId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    initParticles();
    
    // Pause animation when not visible to save CPU/battery
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animateParticles();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    });
    
    const hero = document.getElementById('home');
    if (hero) observer.observe(hero);
}

// ========== NAVBAR SCROLL EFFECT ==========
// Removed scroll-based style changes to keep navbar consistent across all sections
const navbar = document.querySelector('.navbar');

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Only prevent default and smooth scroll if it's an anchor link on the same page
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ========== BUTTON RIPPLE EFFECT ==========
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
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

// Add ripple styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .cta-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes rippleEffect {
    to {
      transform: translate(-50%, -50%) scale(40);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(13, 11, 18, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '20px';
            navLinks.style.borderTop = '1px solid rgba(229, 216, 184, 0.1)';
        }
    });
}

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

// Add particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
  @keyframes particleDrift {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyles);

createParticles();

// ========== TILT EFFECT ON FEATURE CARDS ==========
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========== GLOBAL HANDLERS FOR DASHBOARD ==========
window.simulateInvite = function (btn, playerName) {
    btn.innerText = 'Invited!';
    btn.style.background = 'rgba(229, 216, 184, 0.2)';
    btn.style.color = 'var(--color-primary)';
    btn.style.borderColor = 'var(--color-primary)';
    setTimeout(() => {
        btn.innerText = 'Invite';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--color-secondary)';
        btn.style.borderColor = 'var(--color-secondary)';
    }, 3000);

    // add a temporary notification to feed
    const feedTicker = document.getElementById('live-activity-feed');
    if (feedTicker) {
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.innerHTML = `<span class="feed-time">Now</span> <span>You invited <strong>${playerName}</strong></span>`;
        feedTicker.insertBefore(item, feedTicker.firstChild);
        if (feedTicker.children.length > 5) feedTicker.removeChild(feedTicker.lastChild);
    }
};

window.simulateJoin = function (btn, playerName) {
    btn.innerText = 'Requested';
    btn.style.background = 'rgba(255, 255, 255, 0.2)';
    btn.style.color = '#FFF';
    setTimeout(() => {
        btn.innerText = 'Join Squad';
        btn.style.background = 'var(--gradient-primary)';
        btn.style.color = '#000';
    }, 3000);
};

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initial scroll progress update
    updateScrollProgress();

    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // Check Authentication
    let currentUser = JSON.parse(localStorage.getItem('squadlink_currentUser'));
    if (currentUser) {
        const today = new Date().toDateString();
        if (currentUser.lastLogin !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (currentUser.lastLogin === yesterday) currentUser.streak = (currentUser.streak || 0) + 1;
            else currentUser.streak = 1;
            currentUser.lastLogin = today;
            currentUser.xp = (currentUser.xp || 0) + 5;
            currentUser.level = Math.floor(currentUser.xp / 100) || 1;
            localStorage.setItem('squadlink_currentUser', JSON.stringify(currentUser));
            let users = JSON.parse(localStorage.getItem('squadlink_users')) || [];
            const uIndex = users.findIndex(u => u.email === currentUser.email);
            if (uIndex !== -1) { users[uIndex] = currentUser; localStorage.setItem('squadlink_users', JSON.stringify(users)); }
        }

        // SHOW DASHBOARD & HIDE HERO
        const heroSection = document.getElementById('home');
        const statsSection = document.getElementById('stats');
        const featuresSection = document.getElementById('features');
        const ctaSection = document.getElementById('cta');
        const dashboardView = document.getElementById('dashboard-view');

        if (dashboardView && heroSection) {
            heroSection.style.display = 'none';
            statsSection.style.display = 'none';
            featuresSection.style.display = 'none';
            ctaSection.style.display = 'none';
            dashboardView.classList.remove('hidden');
        }

        // NOTIFICATION BAR
        const notifWrapper = document.getElementById('nav-notifications');
        const notifDropdown = document.getElementById('notification-dropdown');
        if (notifWrapper) {
            notifWrapper.classList.remove('hidden');
            notifWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                notifDropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', () => notifDropdown.classList.add('hidden'));
        }

        // Update Nav Profile Element with XP & Level
        const joinBtn = document.querySelector('.navbar .join-btn');
        if (joinBtn) {
            const userLvl = currentUser.level || 1;
            const currentXp = currentUser.xp || 0;
            const xpForNextLevel = userLvl * 100;
            const xpPercent = Math.min((currentXp % 100) / 100 * 100, 100);

            let contentHtml = '<div style="display:flex; flex-direction:column; align-items:flex-start;">';
            contentHtml += `<div style="display:flex; align-items:center; gap:8px;">`;
            if (currentUser.profilePhoto) {
                contentHtml += `<img src="${currentUser.profilePhoto}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1px solid var(--color-primary);">`;
            }
            contentHtml += `<span style="font-weight:bold;">${currentUser.username}</span>`;
            contentHtml += `<span style="background:rgba(229, 216, 184, 0.2); padding: 2px 6px; border-radius: 4px; font-size:0.7rem; color:var(--color-primary);">Lvl ${userLvl}</span></div>`;

            // XP Progress Bar
            contentHtml += `<div style="width:100%; background:rgba(255,255,255,0.1); height:4px; border-radius:2px; margin-top:5px; overflow:hidden;">`;
            contentHtml += `<div style="width:${xpPercent}%; height:100%; background:var(--gradient-primary);"></div></div>`;
            contentHtml += '</div>';

            joinBtn.innerHTML = contentHtml;
            joinBtn.style.padding = '8px 15px';
            joinBtn.style.background = 'rgba(20, 17, 29, 0.8)';
            joinBtn.style.border = '1px solid rgba(229, 216, 184, 0.3)';

            joinBtn.onclick = () => {
                window.location.href = 'profile.html';
            };

            // Add Logout icon button
            if (!document.getElementById('navLogoutBtn')) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'navLogoutBtn';
                logoutBtn.className = 'cta-btn secondary-btn';
                logoutBtn.style.marginLeft = '10px';
                logoutBtn.style.padding = '10px 15px';
                logoutBtn.style.display = 'inline-flex';
                logoutBtn.style.alignItems = 'center';
                logoutBtn.style.borderColor = 'var(--color-error)';
                logoutBtn.style.color = 'var(--color-error)';
                logoutBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`;
                logoutBtn.title = "Disconnect";

                logoutBtn.onclick = () => {
                    localStorage.removeItem('squadlink_currentUser');
                    window.location.reload();
                };

                joinBtn.parentNode.insertBefore(logoutBtn, joinBtn.nextSibling);
            }
        }

        // --- DASHBOARD SIMULATED LOGIC ---
        // 1. PLAYERS ONLINE
        const GAMES = ["Valorant", "BGMI", "Free Fire", "Call of Duty Mobile"];
        const PLAYER_NAMES = ["Slayer99", "Toxic_Beast", "NoobMaster", "AlphaGamer", "SniperGod", "Rogue_Shadow", "Vortex", "SilentKiller"];
        const onlineGrid = document.getElementById('online-players-grid');

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function refreshOnlinePlayers() {
            if (!onlineGrid) return;
            onlineGrid.innerHTML = '';
            shuffleArray(PLAYER_NAMES);
            const numPlayersToDisplay = Math.floor(Math.random() * 3) + 3; // 3 to 5 players

            for (let i = 0; i < numPlayersToDisplay; i++) {
                const name = PLAYER_NAMES[i];
                const game = GAMES[Math.floor(Math.random() * GAMES.length)];

                const card = document.createElement('div');
                card.className = 'player-card';
                card.innerHTML = `
                    <div class="player-avatar">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" alt="${name}">
                        <div class="status-dot"></div>
                    </div>
                    <div class="player-name">${name}</div>
                    <div class="player-game">Playing: ${game}</div>
                    <div class="player-actions">
                        <button class="btn-invite" onclick="simulateInvite(this, '${name}')">Invite</button>
                        <button class="btn-join" onclick="simulateJoin(this, '${name}')">Join Squad</button>
                    </div>
                `;
                onlineGrid.appendChild(card);
            }
        }

        // 2. LEADERBOARD
        const leaderboardContainer = document.getElementById('dashboard-leaderboard');
        function refreshLeaderboard() {
            if (!leaderboardContainer) return;
            const squads = [
                { name: "Team Liquid", xp: 15420 },
                { name: "GodLike", xp: 14200 },
                { name: "Soul", xp: 13950 },
                { name: "Optic Gaming", xp: 12100 },
                { name: "FaZe Clan", xp: 11000 }
            ];

            // Randomly shuffle slightly
            if (Math.random() > 0.5) {
                let temp = squads[2]; squads[2] = squads[3]; squads[3] = temp;
            }

            leaderboardContainer.innerHTML = '';
            squads.forEach((sq, idx) => {
                const item = document.createElement('div');
                item.className = `leaderboard-item rank-${idx + 1}`;
                item.innerHTML = `<div style="display:flex; align-items:center; gap:10px;"><span style="color:var(--text-muted);">#${idx + 1}</span> <strong>${sq.name}</strong></div> <span style="color:var(--color-primary);">${sq.xp} XP</span>`;
                leaderboardContainer.appendChild(item);
            });
            // Your squad
            leaderboardContainer.innerHTML += `<div class="leaderboard-item" style="border-top: 1px dashed rgba(255,255,255,0.2); margin-top: 5px;"><div style="display:flex; align-items:center; gap:10px;"><span style="color:var(--text-muted);">#14</span> <strong>Your Squad</strong></div> <span style="color:var(--color-secondary);">2400 XP</span></div>`;
        }

        // 3. YOUR SQUAD ACTIVITY
        const squadActivityContainer = document.getElementById('squad-activity-content');
        if (squadActivityContainer) {
            squadActivityContainer.innerHTML = `
                <div class="squad-member">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Friend1" style="width:30px; border-radius:50%">
                        <span>SniperGod <span style="font-size:0.7rem; color:var(--color-primary);">Online</span></span>
                    </div>
                    <button class="btn-invite" style="padding:4px 10px; width:auto;" onclick="simulateInvite(this, 'SniperGod')">Invite</button>
                </div>
                <div class="squad-member">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Friend2" style="width:30px; border-radius:50%; opacity:0.5;">
                        <span style="color:var(--text-muted)">Rogue_Shadow <span style="font-size:0.7rem;">Offline</span></span>
                    </div>
                </div>
                <button class="cta-btn primary-btn" style="width:100%; margin-top: 15px; padding: 10px;">Play Now</button>
            `;
        }

        // 4. ACTIVITY FEED
        const feedTicker = document.getElementById('live-activity-feed');
        const feedMessages = [
            "<strong>Slayer99</strong> just ranked up to Level 5!",
            "<strong>Team Liquid</strong> won a BGMI Custom Match",
            "<strong>Toxic_Beast</strong> is looking for a squad in Valorant",
            "<strong>Ninja</strong> earned 500 XP from daily streak!",
            "New Tournament <strong>'Weekend Brawl'</strong> just opened registration!"
        ];
        function addFeedItem() {
            if (!feedTicker) return;
            const msg = feedMessages[Math.floor(Math.random() * feedMessages.length)];
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const item = document.createElement('div');
            item.className = 'feed-item';
            item.innerHTML = `<span class="feed-time">${time}</span> <span>${msg}</span>`;

            feedTicker.insertBefore(item, feedTicker.firstChild);
            if (feedTicker.children.length > 5) {
                feedTicker.removeChild(feedTicker.lastChild);
            }
        }

        // Init and set intervals
        if (dashboardView) {
            refreshOnlinePlayers();
            refreshLeaderboard();
            addFeedItem();

            setInterval(refreshOnlinePlayers, 15000);
            setInterval(refreshLeaderboard, 12000);
            setInterval(addFeedItem, 8000);

            // Countdown Text
            const countdownEl = document.getElementById('online-refresh-text');
            let count = 15;
            setInterval(() => {
                count--;
                if (countdownEl) countdownEl.innerText = `Refreshing in ${count}s`;
                if (count <= 0) count = 15;
            }, 1000);
        }
    }

    // Tournaments & Team Up Mini-Page Logic
    const tournamentsCard = document.getElementById('tournaments-card');
    const tournamentsPanel = document.getElementById('tournaments-panel');
    const closeTournamentsBtn = document.getElementById('close-tournaments');

    const teamupCard = document.getElementById('teamup-card');
    const teamupPanel = document.getElementById('teamup-panel');
    const closeTeamupBtn = document.getElementById('close-teamup');

    const featuresContainer = document.querySelector('.features-grid');

    if (tournamentsCard && tournamentsPanel && closeTournamentsBtn) {
        tournamentsCard.addEventListener('click', () => {
            featuresContainer.style.opacity = '0';
            featuresContainer.style.pointerEvents = 'none';

            tournamentsPanel.classList.remove('hidden');
            // Small delay to allow display:block to apply before animation
            setTimeout(() => {
                tournamentsPanel.classList.add('visible');
            }, 10);
        });

        closeTournamentsBtn.addEventListener('click', () => {
            tournamentsPanel.classList.remove('visible');
            featuresContainer.style.opacity = '1';
            featuresContainer.style.pointerEvents = 'auto';

            setTimeout(() => {
                tournamentsPanel.classList.add('hidden');
            }, 400); // Wait for transition
        });
    }

    if (teamupCard && teamupPanel && closeTeamupBtn) {
        teamupCard.addEventListener('click', () => {
            featuresContainer.style.opacity = '0';
            featuresContainer.style.pointerEvents = 'none';

            teamupPanel.classList.remove('hidden');
            // Small delay to allow display:block to apply before animation
            setTimeout(() => {
                teamupPanel.classList.add('visible');
            }, 10);
        });

        closeTeamupBtn.addEventListener('click', () => {
            teamupPanel.classList.remove('visible');
            featuresContainer.style.opacity = '1';
            featuresContainer.style.pointerEvents = 'auto';

            setTimeout(() => {
                teamupPanel.classList.add('hidden');
            }, 400); // Wait for transition
        });
    }

    // Modal Registration Logic
    const tourneyRegisterBtn = document.getElementById('tourney-register-btn');
    const registrationModal = document.getElementById('registration-modal');
    const closeRegistrationBtn = document.getElementById('close-registration');
    const registrationForm = document.getElementById('registration-form');
    const regSuccessMsg = document.getElementById('reg-success-msg');

    if (tourneyRegisterBtn && registrationModal) {
        tourneyRegisterBtn.addEventListener('click', () => {
            registrationModal.classList.add('active');
            // Hide success message and reset form if opened again
            if (regSuccessMsg) regSuccessMsg.classList.add('hidden');
            if (registrationForm) {
                registrationForm.reset();
                registrationForm.style.display = 'block';
            }
        });

        closeRegistrationBtn.addEventListener('click', () => {
            registrationModal.classList.remove('active');
        });

        // Close when clicking outside of modal content
        registrationModal.addEventListener('click', (e) => {
            if (e.target === registrationModal) {
                registrationModal.classList.remove('active');
            }
        });

        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate form processing
                registrationForm.style.display = 'none';
                regSuccessMsg.classList.remove('hidden');

                // Auto close modal after successful generic feedback 
                setTimeout(() => {
                    registrationModal.classList.remove('active');
                }, 2500);
            });
        }


    }

    // ========== HERO TEXT STAGGER ==========
    function staggerText(elementId, delayOffset = 0) {
        const el = document.getElementById(elementId);
        if (!el) return;
        const text = el.innerText.trim();
        el.innerHTML = '';
        // Split by whitespace
        const words = text.split(/\s+/);
        words.forEach((word, index) => {
            if (!word) return;
            const span = document.createElement('span');
            span.innerText = word;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.animation = `staggerFadeUp 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`;
            span.style.animationDelay = `${delayOffset + (index * 0.06)}s`;
            el.appendChild(span);
            if (index < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });
    }

    staggerText('hero-subtitle', 0.3);
    staggerText('hero-description', 0.5);

    console.log('Squadlink initialized successfully!');
});