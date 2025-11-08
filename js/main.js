// ==========================================================================
// LearnQuest - Main JavaScript functionality
// Handles all interactive elements, animations, and user interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initGamificationElements();
    initProgressBars();
    initStreakCalendar();
    initBadgeInteractions();
    initScrollAnimations();
    initParticleEffects();
    initMobileMenu();
    initStatCounters();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelectorAll('.hero-cta button');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Animate hero elements on load
    if (heroTitle) {
        gsap.fromTo(heroTitle, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3 }
        );
    }
    
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
        );
    }
    
    if (heroButtons.length > 0) {
        gsap.fromTo(heroButtons,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.9, stagger: 0.1 }
        );
    }
    
    if (scrollIndicator) {
        gsap.fromTo(scrollIndicator,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 1.5 }
        );
    }
    
    // Hero button interactions
    const startLearningBtn = document.getElementById('startLearning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', () => {
            createConfetti();
            // Scroll to dashboard section
            const dashboard = document.getElementById('dashboard');
            if (dashboard) {
                dashboard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Gamification elements functionality
function initGamificationElements() {
    // Streak flame animation enhancement
    const streakFlame = document.querySelector('.streak-flame');
    if (streakFlame) {
        setInterval(() => {
            streakFlame.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg)`;
        }, 2000);
    }
    
    // XP progress bar animation
    animateXPBar();
    
    // Badge hover effects
    const badges = document.querySelectorAll('.badge-item.earned');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1) rotate(5deg)';
            badge.style.boxShadow = '0 10px 25px rgba(0, 242, 254, 0.4)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1) rotate(0deg)';
            badge.style.boxShadow = 'none';
        });
        
        badge.addEventListener('click', () => {
            showBadgeModal(badge);
        });
    });
}

// Animate XP progress bar with spark effect
function animateXPBar() {
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const targetProgress = parseInt(xpFill.dataset.progress);
        
        gsap.fromTo(xpFill,
            { width: '0%' },
            { 
                width: `${targetProgress}%`, 
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                    // Update spark position
                    const spark = document.querySelector('.xp-spark');
                    if (spark) {
                        const currentWidth = this.progress() * targetProgress;
                        spark.style.left = `${currentWidth}%`;
                    }
                }
            }
        );
        
        // Add periodic glow effect
        setInterval(() => {
            xpFill.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                xpFill.style.filter = 'brightness(1)';
            }, 300);
        }, 3000);
    }
}

// Progress bars animation for all sections
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetProgress = parseInt(progressBar.dataset.progress);
                
                gsap.fromTo(progressBar,
                    { width: '0%' },
                    { 
                        width: `${targetProgress}%`, 
                        duration: 1.5,
                        ease: 'power2.out'
                    }
                );
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Streak calendar generation and interaction
function initStreakCalendar() {
    const streakCalendar = document.querySelector('.streak-calendar');
    if (!streakCalendar) return;
    
    const today = new Date();
    const currentStreak = 15; // This would come from user data
    
    // Generate calendar for the last 21 days
    for (let i = 20; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(day.getDate() - i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day.getDate();
        
        // Mark active days (simulate user activity)
        if (i <= currentStreak) {
            dayElement.classList.add('active');
        }
        
        // Mark today
        if (i === 0) {
            dayElement.classList.add('today');
        }
        
        // Add click interaction
        dayElement.addEventListener('click', () => {
            if (dayElement.classList.contains('active')) {
                showStreakDetails(day, dayElement);
            }
        });
        
        streakCalendar.appendChild(dayElement);
    }
}

// Badge interactions and modal
function initBadgeInteractions() {
    const badges = document.querySelectorAll('.badge-item');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const badgeName = badge.querySelector('.badge-name').textContent;
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'badge-tooltip';
            tooltip.textContent = getBadgeDescription(badgeName);
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.75rem;
                z-index: 1000;
                pointer-events: none;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                margin-bottom: 5px;
            `;
            
            badge.style.position = 'relative';
            badge.appendChild(tooltip);
            
            gsap.fromTo(tooltip,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.2 }
            );
        });
        
        badge.addEventListener('mouseleave', () => {
            const tooltip = badge.querySelector('.badge-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Dashboard cards animation
    gsap.fromTo('.dashboard-card',
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.gamification-section',
                start: 'top 80%'
            }
        }
    );
    
    // Subject cards animation
    gsap.fromTo('.subject-card',
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.learning-dashboard',
                start: 'top 80%'
            }
        }
    );
    
    // Feature cards animation
    gsap.fromTo('.feature-card',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top 80%'
            }
        }
    );
}

// Particle effects for backgrounds
function initParticleEffects() {
    const particlesBg = document.getElementById('particlesBg');
    if (!particlesBg) return;
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
        createParticle(particlesBg);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(0, 242, 254, ${Math.random() * 0.8 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Animated stat counters in hero section
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on size
        let displayValue = Math.floor(current);
        if (target >= 1000000) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            displayValue = (displayValue / 1000).toFixed(0) + 'K';
        } else if (target < 100) {
            displayValue = displayValue + '%';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Confetti animation for celebrations
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = ['#00f2fe', '#667eea', '#f093fb', '#00ff88', '#ff6b35'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

// Badge modal functionality
function showBadgeModal(badge) {
    const badgeName = badge.querySelector('.badge-name').textContent;
    const badgeIcon = badge.querySelector('.badge-icon').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'badge-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-badge-icon">${badgeIcon}</div>
                <h3 class="modal-badge-title">${badgeName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="badge-description">${getBadgeDescription(badgeName)}</p>
                <div class="badge-requirements">
                    <h4>Requirements:</h4>
                    <ul>${getBadgeRequirements(badgeName)}</ul>
                </div>
                <div class="badge-stats">
                    <div class="stat">
                        <span class="stat-label">Earned Date:</span>
                        <span class="stat-value">${getEarnedDate()}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">XP Reward:</span>
                        <span class="stat-value">+50 XP</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Modal interactions
    modal.querySelector('.modal-close').addEventListener('click', () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => modal.remove()
        });
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.querySelector('.modal-close').click();
    });
    
    // Animate modal appearance
    gsap.fromTo(modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(modal.querySelector('.modal-content'),
        { scale: 0.8, y: 50 },
        { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
}

// Streak details modal
function showStreakDetails(date, dayElement) {
    // Add a glow effect to the clicked day
    dayElement.style.boxShadow = '0 0 15px rgba(255, 107, 53, 0.8)';
    
    setTimeout(() => {
        dayElement.style.boxShadow = '';
    }, 1000);
    
    // Could expand this to show more detailed streak information
    console.log(`Streak day: ${date.toDateString()}`);
}

// Utility functions
function getBadgeDescription(badgeName) {
    const descriptions = {
        'Streak Master': 'Maintain a 7-day learning streak without missing a day.',
        'Math Wizard': 'Complete 20 math lessons with 90% accuracy.',
        'Science Explorer': 'Discover 15 fascinating science facts through lessons.',
        'Reading Champion': 'Read and comprehend 10 literature passages.',
        'History Buff': 'Master 25 historical events and their significance.',
        'Art Master': 'Create and analyze 12 different art pieces.'
    };
    return descriptions[badgeName] || 'Achievement unlocked through dedication and learning!';
}

function getBadgeRequirements(badgeName) {
    const requirements = {
        'Streak Master': '<li>Learn for 7 consecutive days</li><li>Complete at least 1 lesson per day</li>',
        'Math Wizard': '<li>Complete 20 math lessons</li><li>Achieve 90% average accuracy</li><li>Master basic algebra concepts</li>',
        'Science Explorer': '<li>Complete 15 science lessons</li><li>Pass all science quizzes</li><li>Conduct 3 virtual experiments</li>',
        'Reading Champion': '<li>Read 10 literature passages</li><li>Score 85% on comprehension tests</li><li>Write 3 book reports</li>'
    };
    return requirements[badgeName] || '<li>Complete required learning activities</li><li>Maintain consistent progress</li>';
}

function getEarnedDate() {
    const dates = ['Today', 'Yesterday', '3 days ago', '1 week ago', '2 weeks ago'];
    return dates[Math.floor(Math.random() * dates.length)];
}

// CSS for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .badge-modal .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .badge-modal .modal-content {
        background: linear-gradient(135deg, rgba(16, 21, 62, 0.95), rgba(10, 10, 15, 0.95));
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        position: relative;
        color: white;
    }
    
    .badge-modal .modal-header {
        text-align: center;
        margin-bottom: 24px;
        position: relative;
    }
    
    .badge-modal .modal-badge-icon {
        font-size: 3rem;
        margin-bottom: 12px;
    }
    
    .badge-modal .modal-badge-title {
        font-size: 1.5rem;
        margin: 0;
        color: #00f2fe;
    }
    
    .badge-modal .modal-close {
        position: absolute;
        top: -10px;
        right: -10px;
        background: none;
        border: none;
        color: #8892b0;
        font-size: 1.5rem;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
    }
    
    .badge-modal .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .badge-modal .badge-description {
        color: #b8c6db;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .badge-modal .badge-requirements h4 {
        color: #00f2fe;
        margin-bottom: 8px;
        font-size: 1rem;
    }
    
    .badge-modal .badge-requirements ul {
        color: #b8c6db;
        padding-left: 20px;
        margin-bottom: 20px;
    }
    
    .badge-modal .badge-requirements li {
        margin-bottom: 4px;
    }
    
    .badge-modal .badge-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    
    .badge-modal .stat {
        text-align: center;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
    }
    
    .badge-modal .stat-label {
        display: block;
        font-size: 0.75rem;
        color: #8892b0;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .badge-modal .stat-value {
        display: block;
        font-size: 0.9rem;
        color: #00ff88;
        font-weight: 600;
    }
    
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(dynamicStyles);

// Export functions for use in other scripts
window.LearnQuest = {
    createConfetti,
    showBadgeModal,
    animateCounter
};