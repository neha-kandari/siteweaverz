document.addEventListener('DOMContentLoaded', function() {
    // Wait for Swiper to be available
    if (typeof Swiper === 'undefined') {
        console.error('Swiper not loaded');
        return;
    }

    // Initialize portfolio items observer
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    portfolioItems.forEach(item => {
        observer.observe(item);
    });

    // Initialize Swiper only if element exists
    const carouselElement = document.getElementById('portfolioCarousel');
    if (carouselElement) {
        const portfolioSwiper = new Swiper('.portfolio-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
    }
});