/**
 * Test Cases Page — JavaScript
 * Filter tabs, navbar, and mobile toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFilterTabs();
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
 * Filter Tabs — Show/hide projects based on filter
 */
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const projects = document.querySelectorAll('.tc-project');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            // Show/hide projects with animation
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-project') === filter) {
                    project.classList.remove('hidden');
                    project.style.animation = 'none';
                    project.offsetHeight; // Trigger reflow
                    project.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });
}
