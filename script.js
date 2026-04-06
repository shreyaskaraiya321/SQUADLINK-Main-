// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const trails = document.querySelectorAll('.cursor-trail');
const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cta-btn, .stat-card, .feature-card, .scroll-indicator');

let mouseX = 0,
    mouseY = 0;
let cursorX = 0,
    cursorY = 0;
let trailPositions = [{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
}
];

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Lerp for smooth movement
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Animate trails with delay
    trailPositions[0].x += (cursorX - trailPositions[0].x) * 0.1;
    trailPositions[0].y += (cursorY - trailPositions[0].y) * 0.1;

    trailPositions[1].x += (trailPositions[0].x - trailPositions[1].x) * 0.1;
    trailPositions[1].y += (trailPositions[0].y - trailPositions[1].y) * 0.1;

    trailPositions[2].x += (trailPositions[1].x - trailPositions[2].x) * 0.1;
    trailPositions[2].y += (trailPositions[1].y - trailPositions[2].y) * 0.1;

    trails.forEach((trail, index) => {
        trail.style.left = trailPositions[index].x + 'px';
        trail.style.top = trailPositions[index].y + 'px';
    });

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effect for cursor
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trails.forEach(trail => trail.style.opacity = '1');
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// ========== SCROLL PROGRESS INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
const progressRing = document.querySelector('.progress-ring');
const percentageText = document.querySelector('.scroll-percentage');
const radius = 27;
const circumference = 2 * Math.PI * radius;

progressRing.style.strokeDasharray = circumference;
progressRing.style.strokeDashoffset = circumference;

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

    // Update progress ring
    const offset = circumference - (scrollPercent / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;

    // Update percentage text
    percentageText.textContent = scrollPercent + '%';

    // Show/hide indicator
    if (scrollTop > 50) {
        scrollIndicator.classList.add('visible');
    } else {
        scrollIndicator.classList.remove('visible');
    }

    // Change color at 50%
    if (scrollPercent >= 50) {
        percentageText.classList.add('past-half');
    } else {
        percentageText.classList.remove('past-half');
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Click to scroll to top
scrollIndicator.addEventListener('click', () => {
    scrollIndicator.style.transition = 'transform 0.5s ease';
    scrollIndicator.style.transform = 'scale(1) rotate(360deg)';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        scrollIndicator.style.transition = 'all 0.3s ease';
        scrollIndicator.style.transform = 'scale(1) rotate(0deg)';
    }, 500);
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger number counting for stat cards
            if (entry.target.classList.contains('stat-card')) {
                const numberEl = entry.target.querySelector('.stat-number');
                if (numberEl && !numberEl.classList.contains('counted')) {
                    animateNumber(numberEl);
                    numberEl.classList.add('counted');
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-card, .feature-card').forEach(el => {
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

// ========== PARALLAX EFFECT ON GRID ==========
const animatedGrid = document.querySelector('.animated-grid');
const glowOrbs = document.querySelectorAll('.glow-orb');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    if (animatedGrid) {
        animatedGrid.style.transform = `rotateX(60deg) translateY(-50%) translate(${x}px, ${y}px)`;
    }

    glowOrbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.02 : 0.03;
        orb.style.transform = `translate(${x * speed * 100}px, ${y * speed * 100}px)`;
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

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
            navLinks.style.background = 'rgba(10, 14, 26, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '20px';
            navLinks.style.borderTop = '1px solid rgba(0, 255, 255, 0.1)';
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
      background: ${Math.random() > 0.5 ? '#00FFFF' : '#FF9900'};
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

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initial scroll progress update
    updateScrollProgress();

    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // Check Authentication
    const currentUser = JSON.parse(localStorage.getItem('squadlink_currentUser'));
    if(currentUser) {
        // Update Join Now button in header
        const joinBtn = document.querySelector('.navbar .join-btn');
        if(joinBtn) {
            let contentHtml = '';
            if(currentUser.profilePhoto) {
                contentHtml += `<img src="${currentUser.profilePhoto}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; margin-right: 8px; vertical-align: middle; border: 1px solid #00FFFF;">`;
            }
            contentHtml += `<span style="vertical-align: middle;">${currentUser.username}</span>`;
            
            joinBtn.innerHTML = contentHtml;
            joinBtn.style.display = 'inline-flex';
            joinBtn.style.alignItems = 'center';
            joinBtn.style.padding = '10px 20px'; // ensure padding is good with image
            
            joinBtn.onclick = () => {
                window.location.href = 'profile.html';
            };
            
            // Add a dedicated Logout icon button next to it
            if(!document.getElementById('navLogoutBtn')) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'navLogoutBtn';
                logoutBtn.className = 'cta-btn secondary-btn';
                logoutBtn.style.marginLeft = '10px';
                logoutBtn.style.padding = '10px 15px';
                logoutBtn.style.display = 'inline-flex';
                logoutBtn.style.alignItems = 'center';
                logoutBtn.style.borderColor = '#ff3366';
                logoutBtn.style.color = '#ff3366';
                logoutBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`;
                logoutBtn.title = "Disconnect";
                
                logoutBtn.onclick = () => {
                    localStorage.removeItem('squadlink_currentUser');
                    window.location.reload();
                };
                
                joinBtn.parentNode.insertBefore(logoutBtn, joinBtn.nextSibling);
            }
        }
        
        // Update hero action button
        const heroLoginBtn = document.querySelector('.hero-buttons .primary-btn');
        if(heroLoginBtn) {
            heroLoginBtn.innerHTML = `<span>Dashboard</span>`;
            heroLoginBtn.onclick = () => {
                alert('Dashboard coming soon!');
            };
        }
        
        // Update footer CTA
        const ctaSectionBtn = document.querySelector('.cta-section .primary-btn');
        if(ctaSectionBtn) {
            ctaSectionBtn.innerHTML = `<span>Your Squad</span>`;
            ctaSectionBtn.onclick = () => {
                alert('Squad management coming soon!');
            };
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

    if(tourneyRegisterBtn && registrationModal) {
        tourneyRegisterBtn.addEventListener('click', () => {
            registrationModal.classList.add('active');
            // Hide success message and reset form if opened again
            if(regSuccessMsg) regSuccessMsg.classList.add('hidden');
            if(registrationForm) {
                registrationForm.reset();
                registrationForm.style.display = 'block';
            }
        });
        
        closeRegistrationBtn.addEventListener('click', () => {
            registrationModal.classList.remove('active');
        });
        
        // Close when clicking outside of modal content
        registrationModal.addEventListener('click', (e) => {
            if(e.target === registrationModal) {
                registrationModal.classList.remove('active');
            }
        });
        
        if(registrationForm) {
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
        
        // Custom cursor hovering over modal elements
        const modalInteractiveElems = registrationModal.querySelectorAll('input, button');
        const customCursorObj = document.querySelector('.custom-cursor');
        if(customCursorObj && modalInteractiveElems) {
            modalInteractiveElems.forEach(el => {
                el.addEventListener('mouseenter', () => customCursorObj.classList.add('hover'));
                el.addEventListener('mouseleave', () => customCursorObj.classList.remove('hover'));
            });
        }
    }

    console.log('Squadlink initialized successfully!');
});