/**
 * Portfolio Website — Main JavaScript
 * Animations, typing effect, particles, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTypingEffect();
    initParticles();
    initCounterAnimation();
    initScrollAnimations();
    initSmoothScroll();
});

/**
 * Navbar — Scroll effect & mobile toggle
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, i) => {
            if (navMenu.classList.contains('active')) {
                if (i === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (i === 1) span.style.opacity = '0';
                if (i === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
}

/**
 * Typing Effect — Rotating roles
 */
function initTypingEffect() {
    const roles = [
        'Senior QA Engineer',
        'Test Automation Specialist',
        'API Testing Expert',
        'Mobile Testing Engineer',
        'Performance Tester',
    ];

    const typedText = document.getElementById('typed-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                speed = 2000; // Pause at end
                isDeleting = true;
            } else {
                speed = 80;
            }
        } else {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 300;
            } else {
                speed = 40;
            }
        }

        setTimeout(type, speed);
    }

    type();
}

/**
 * Particle System — Floating background particles
 */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

/**
 * Counter Animation — Animate stats numbers
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = Date.now();

                function update() {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                }

                update();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

/**
 * Scroll Animations — Fade in elements on scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .highlight, .contact-card'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll — Enhanced scroll for nav links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
