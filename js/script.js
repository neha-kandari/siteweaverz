// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Replace '#' with proper selector
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar')?.classList.add('bg-dark');
        document.querySelector('.navbar')?.classList.add('navbar-scrolled');
    } else {
        document.querySelector('.navbar')?.classList.remove('bg-dark');
        document.querySelector('.navbar')?.classList.remove('navbar-scrolled');
    }
});

// Combined DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {
    // Setup navbar styling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(0, 102, 255, 0.1)';
        navbar.style.transition = 'all 0.3s ease';
        
        // Style navbar links
        const navLinks = navbar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.color = 'white';
            link.style.fontWeight = '500';
            link.style.transition = 'color 0.3s ease';
        });
        
        // Add hover effect to navbar links
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.color = 'rgba(0, 102, 255, 0.8)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.color = 'white';
            });
        });
    }
    
    // Handle floating balls animation
    const hero = document.querySelector('.hero');
    const balls = document.querySelectorAll('.floating-ball');
    const container = document.querySelector('.hero .container');

    if (hero && container) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;

            balls.forEach((ball, index) => {
                const speed = (index + 1) * 20;
                ball.style.transform = `translate3d(${x * speed}px, ${y * speed}px, ${(index + 1) * 20}px)`;
            });

            container.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 50px)`;
        });
    }

    // Handle rays animation
    console.log('DOM loaded, setting up rays animation');
    
    // Try different selectors to find the hero section
    const heroSection = document.querySelector('.hero') || 
                        document.querySelector('.hero-container') || 
                        document.querySelector('header') ||
                        document.querySelector('section:first-of-type');
    
    console.log('Hero section found:', heroSection);
    
    if (heroSection) {
        // Check if rays container already exists
        let raysContainer = heroSection.querySelector('.rays-container');
        
        if (!raysContainer) {
            console.log('Creating new rays container');
            raysContainer = document.createElement('div');
            raysContainer.classList.add('rays-container');
            raysContainer.style.position = 'absolute';
            raysContainer.style.top = '0';
            raysContainer.style.left = '0';
            raysContainer.style.width = '30%';
            raysContainer.style.height = '20%'; // Changed to 100% to ensure full height coverage
            raysContainer.style.zIndex = '1';
            raysContainer.style.overflow = 'hidden';
            raysContainer.style.pointerEvents = 'none';
            
            // Ensure hero section has position relative
            const heroPosition = window.getComputedStyle(heroSection).position;
            if (heroPosition === 'static') {
                heroSection.style.position = 'relative';
            }
            
            heroSection.appendChild(raysContainer);
            console.log('Rays container added to hero section');
        }
        
        const numberOfRays = 10;
        
        // Create initial rays with staggered positions
        for (let i = 0; i < numberOfRays; i++) {
            // Create rays at different vertical positions for continuous effect
            const initialPosition = Math.random() * 100; // Random initial vertical position
            createRay(raysContainer, initialPosition);
        }
    } else {
        console.error('Could not find hero section for rays animation');
    }
    
    function createRay(container, initialYPosition = -100) {
        const ray = document.createElement('div');
        ray.classList.add('ray');
        
        // Set inline styles for the ray to ensure they work
        ray.style.position = 'absolute';
        ray.style.background = 'linear-gradient(to bottom, rgba(0, 102, 255, 0.37), rgba(0, 102, 255, 0.33))';
        ray.style.width = '1px'; // Thinner rays
        ray.style.transformOrigin = 'top';
        
        // Random position and animation duration
        const xPos = Math.random() * 100;
        const height = Math.random() * 15 + 10;
        const duration = Math.random() * 3 + 2; // Faster animation: 2-5s
        
        ray.style.left = `${xPos}%`;
        ray.style.height = `${height}vh`;
        ray.style.top = `${initialYPosition}%`; // Set initial vertical position
        
        // Set animation directly with CSS - no delay for continuous effect
        ray.style.animation = `continuousRayFall ${duration}s linear infinite`;
        
        container.appendChild(ray);
        
        // No need to remove and recreate for continuous animation
    }
    
    // Add the keyframes for the continuous animation
    if (!document.querySelector('#continuousRayFallKeyframes')) {
        const keyframes = document.createElement('style');
        keyframes.id = 'continuousRayFallKeyframes';
        keyframes.textContent = `
            @keyframes continuousRayFall {
                0% {
                    transform: translateY(0);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(100vh);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(keyframes);
        console.log('Added continuousRayFall keyframes to document');
    }
});

// Add this to your existing DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap navbar toggler functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || 
                                 navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
});


