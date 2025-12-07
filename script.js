// ============================================
// NEXASTUDIO - ADVANCED JAVASCRIPT
// Dark Futuristic Agency Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== Custom Cursor =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        }

        animateOutline();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(2)';
                cursorOutline.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });
    }

    // ===== Mobile Navigation =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translateY(10px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking nav link
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');

                const bars = hamburger.querySelectorAll('span');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Active Nav on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== Typewriter Effect =====
    const typewriterElement = document.getElementById('typewriter');
    const words = ['Digital Magic', 'Stunning Websites', 'Viral Campaigns', 'Mobile Apps', 'Brand Identity'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterElement) {
        typeWriter();
    }

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, stepTime);
    }

    // ===== Parallax Effect =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });

        // Parallax for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.03 + (index * 0.01);
            const xPos = scrolled * speed;
            const yPos = scrolled * speed * 0.5;
            orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });

    // ===== Form Handling =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.name || !data.email || !data.phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
                showNotification('Please enter a valid 10-digit phone number', 'error');
                return;
            }

            // WhatsApp redirect
            const message = `Hi NexaStudio!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nMessage: ${data.message}`;
            const whatsappURL = `https://wa.me/918629933125?text=${encodeURIComponent(message)}`;

            showNotification('Redirecting to WhatsApp...', 'success');
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1000);

            contactForm.reset();
        });
    }

    // ===== Notification System =====
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification-nexa');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification-nexa notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== Scroll Reveal Animations =====
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .tech-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(element);
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;

            if (email) {
                showNotification('Thanks for subscribing!', 'success');
                this.reset();
            } else {
                showNotification('Please enter your email', 'error');
            }
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar-nexa');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.2)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ===== Add Ripple Effect to Buttons =====
    const buttons = document.querySelectorAll('.btn-nexa-primary, .btn-nexa-large');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== Performance Optimization =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll ended
        }, 100);
    }, { passive: true });

    // Reduce motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-motion');
    }

    console.log('%c🚀 NexaStudio', 'color: #8B5CF6; font-size: 24px; font-weight: bold;');
    console.log('%cPowered by The Unlock Sales | 8629933125', 'color: #06B6D4; font-size: 14px;');

});

// ===== Additional Styles via JS =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .notification-nexa {
        position: fixed;
        top: 100px;
        right: -400px;
        background: rgba(26, 31, 58, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.3);
        padding: 20px 30px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transition: right 0.3s ease;
        box-shadow: 0 8px 30px rgba(139, 92, 246, 0.3);
        color: #FFFFFF;
    }

    .notification-nexa.show {
        right: 30px;
    }

    .notification-nexa i {
        font-size: 24px;
    }

    .notification-success {
        border-color: rgba(6, 182, 212, 0.5);
    }

    .notification-success i {
        color: #06B6D4;
    }

    .notification-error {
        border-color: rgba(236, 72, 153, 0.5);
    }

    .notification-error i {
        color: #EC4899;
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    @media (max-width: 768px) {
        .notification-nexa {
            right: -100%;
            left: 20px;
            max-width: calc(100% - 40px);
        }

        .notification-nexa.show {
            right: auto;
            left: 20px;
        }
    }
`;
document.head.appendChild(additionalStyles);

// ===== Utility Functions =====
window.NexaUtils = {
    formatCurrency: (num) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    },

    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone: (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/[^0-9]/g, ''));
    }
};