document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.achievement-item .number');
    const speed = 2000; // Increased duration for smoother animation

    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-target')); // Get target from data attribute
        let count = 0;
        const increment = target / (speed / 16); // Adjust for requestAnimationFrame
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                element.textContent = Math.min(Math.ceil(count), target) + '+';
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCount();
    };

    // Intersection Observer setup
    const observerOptions = {
        threshold: 0.2, // Reduced threshold for earlier trigger
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                entry.target.setAttribute('data-counted', 'true');
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize counters
    counters.forEach(counter => {
        observer.observe(counter);
    });
});