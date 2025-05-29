// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    // Simple AOS-like animation trigger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName')?.value || '';
            const lastName = document.getElementById('lastName')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const service = document.getElementById('service')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // Construct WhatsApp message
            const whatsappMessage = `*New Contact Form Submission*%0A
-----------------------------------%0A
*Name:* ${firstName} ${lastName}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Service:* ${service}%0A
*Message:* ${message}`;

            // Replace with your WhatsApp number
            const whatsappNumber = '919520100542'; // Add your number here with country code
            
            // Show loading state
            const btnText = document.querySelector('.btn-text');
            const btnLoading = document.querySelector('.btn-loading');
            if (btnText && btnLoading) {
                btnText.classList.add('d-none');
                btnLoading.classList.remove('d-none');
            }

            // Redirect to WhatsApp
            setTimeout(() => {
                window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                
                // Show success modal
                const successModalElement = document.getElementById('successModal');
                if (successModalElement) {
                    const successModal = new bootstrap.Modal(successModalElement);
                    successModal.show();
                }
                
                // Reset form and button state
                contactForm.reset();
                if (btnText && btnLoading) {
                    btnText.classList.remove('d-none');
                    btnLoading.classList.add('d-none');
                }
            }, 1000);
        });
    } else {
        console.error('Contact form not found');
    }

    // Enhanced form interactions
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Add focus animations
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        control.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validate on blur
            if (this.value.length > 0) {
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });

        // Real-time validation for email
        if (control.type === 'email') {
            control.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.value)) {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                } else if (this.value.length > 0) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                }
            });
        }

        // Real-time validation for phone
        if (control.type === 'tel') {
            control.addEventListener('input', function() {
                // Basic phone validation
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (phoneRegex.test(this.value.replace(/\s/g, ''))) {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                } else if (this.value.length > 0) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                }
            });
        }
    });

    // Smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
});

function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        <strong>Success!</strong> Your message has been sent to WhatsApp.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to page
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(successDiv, form);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}