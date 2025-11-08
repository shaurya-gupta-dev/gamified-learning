// ==========================================================================
// LearnQuest - Advanced Animations
// GSAP-powered smooth animations and micro-interactions
// ==========================================================================

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageLoadAnimations();
    initHoverAnimations();
    initScrollRevealAnimations();
    initParallaxEffects();
    initMorphingElements();
    initTypewriterEffects();
});

// Page load animations sequence
function initPageLoadAnimations() {
    // Create a timeline for coordinated animations
    const tl = gsap.timeline();
    
    // Navbar slide down
    tl.fromTo('.navbar', 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    // Hero background orbs
    tl.fromTo('.gradient-orb', 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.7, duration: 1.5, stagger: 0.3, ease: 'power2.out' },
        '-=0.5'
    );
    
    // Hero content cascade
    tl.fromTo('.hero-title .title-line', 
        { opacity: 0, y: 50, rotationX: 90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' },
        '-=1'
    );
    
    tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
    );
    
    tl.fromTo('.hero-cta button',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
    );
    
    tl.fromTo('.hero-stats .stat-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
    );
}

// Enhanced hover animations for interactive elements
function initHoverAnimations() {
    // Button hover effects with magnetic attraction
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Add ripple effect
            createRippleEffect(e.currentTarget, e);
        });
        
        button.addEventListener('mouseleave', (e) => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
    
    // Dashboard card hover effects
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // Animate card elements
            gsap.to(card.querySelector('.card-title i'), {
                rotation: 360,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Subject card tilt effect
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 20;
            const rotateY = (x / rect.width) * -20;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // Feature card bounce effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
            
            gsap.to(card.querySelector('.feature-icon'), {
                rotation: 15,
                scale: 1.1,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.feature-icon'), {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// Scroll-triggered reveal animations
function initScrollRevealAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Section headers reveal
    document.querySelectorAll('.section-header').forEach(header => {
        gsap.fromTo(header,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    end: 'bottom 15%'
                }
            }
        );
    });
    
    // Staggered card animations
    document.querySelectorAll('.dashboard-grid, .subjects-grid, .features-grid').forEach(grid => {
        const cards = grid.children;
        
        gsap.fromTo(cards,
            { 
                opacity: 0, 
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    end: 'bottom 20%'
                }
            }
        );
    });
    
    // Progress bars animated reveal
    document.querySelectorAll('.progress-bar').forEach(progressBar => {
        const progressFill = progressBar.querySelector('.progress-fill');
        if (progressFill) {
            const targetProgress = progressFill.dataset.progress || 0;
            
            ScrollTrigger.create({
                trigger: progressBar,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(progressFill,
                        { width: '0%' },
                        { 
                            width: `${targetProgress}%`,
                            duration: 1.5,
                            ease: 'power2.out'
                        }
                    );
                }
            });
        }
    });
    
    // Floating animation for elements
    document.querySelectorAll('.badge-item.earned, .subject-icon').forEach(element => {
        gsap.to(element, {
            y: -5,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
        });
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    // Background orbs parallax
    document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        gsap.to(orb, {
            y: -50 * (index + 1),
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Navbar background opacity change
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: self => {
            const navbar = document.querySelector('.navbar');
            const progress = self.progress;
            navbar.style.background = `rgba(10, 10, 15, ${0.9 + progress * 0.1})`;
        }
    });
    
    // Scroll indicator fade
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: '50% top',
        onUpdate: self => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = 1 - self.progress;
            }
        }
    });
}

// Morphing and transformation effects
function initMorphingElements() {
    // Streak flame morphing
    const streakFlame = document.querySelector('.streak-flame');
    if (streakFlame) {
        const morphTl = gsap.timeline({ repeat: -1 });
        morphTl.to(streakFlame, {
            scale: 1.2,
            rotation: 5,
            duration: 1,
            ease: 'sine.inOut'
        });
        morphTl.to(streakFlame, {
            scale: 1,
            rotation: -5,
            duration: 1,
            ease: 'sine.inOut'
        });
        morphTl.to(streakFlame, {
            scale: 1.1,
            rotation: 0,
            duration: 1,
            ease: 'sine.inOut'
        });
    }
    
    // XP bar shimmer effect
    const xpBars = document.querySelectorAll('.xp-fill');
    xpBars.forEach(bar => {
        const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        shimmerTl.to(bar, {
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%)',
            duration: 0.5,
            ease: 'power2.inOut'
        });
        shimmerTl.to(bar, {
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            duration: 0.5,
            ease: 'power2.inOut'
        });
    });
    
    // Logo rotation on scroll
    const logoIcon = document.querySelector('.logo-icon i');
    if (logoIcon) {
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            onUpdate: self => {
                gsap.set(logoIcon, {
                    rotation: self.progress * 360
                });
            }
        });
    }
}

// Typewriter effects for dynamic text
function initTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        const speed = element.dataset.typewriterSpeed || 100;
        
        element.textContent = '';
        
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                typeWriter(element, text, parseInt(speed));
            }
        });
    });
}

// Ripple effect for buttons
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Typewriter animation function
function typeWriter(element, text, speed) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                cursor.remove();
            }, 2000);
        }
    }
    
    type();
}

// Enhanced badge animation
function animateBadgeUnlock(badgeElement) {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(badgeElement, {
        scale: 0,
        rotation: 180,
        opacity: 0
    });
    
    // Unlock animation sequence
    tl.to(badgeElement, {
        scale: 1.2,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
    
    tl.to(badgeElement, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    // Glow effect
    tl.to(badgeElement, {
        boxShadow: '0 0 25px rgba(0, 242, 254, 0.8)',
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.3');
    
    tl.to(badgeElement, {
        boxShadow: '0 0 10px rgba(0, 242, 254, 0.4)',
        duration: 0.5,
        ease: 'power2.out'
    });
    
    // Add celebration particles
    createCelebrationParticles(badgeElement);
}

// Celebration particles for achievements
function createCelebrationParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #00f2fe;
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        gsap.to(particle, {
            x: x,
            y: y,
            scale: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .gsap-reveal {
        opacity: 0;
        transform: translateY(50px);
    }
    
    .gsap-fade-in {
        opacity: 0;
    }
    
    .gsap-scale-in {
        opacity: 0;
        transform: scale(0.8);
    }
    
    .perspective-card {
        transform-style: preserve-3d;
    }
    
    .magnetic-button {
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(animationStyles);

// Export animation functions for external use
window.LearnQuestAnimations = {
    animateBadgeUnlock,
    createRippleEffect,
    createCelebrationParticles,
    typeWriter
};