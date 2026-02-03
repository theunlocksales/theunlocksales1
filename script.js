// ========== LANGUAGE TOGGLE ==========
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    document.getElementById('langText').textContent = currentLang === 'en' ? 'हिंदी' : 'English';
    
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(elem => {
        const text = elem.getAttribute(`data-${currentLang}`);
        if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
            elem.placeholder = text;
        } else {
            elem.textContent = text;
        }
    });
}

// ========== MOBILE MENU TOGGLE ==========
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const isClickInsideNav = navMenu?.contains(event.target);
    const isClickOnHamburger = hamburger?.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ========== SMOOTH SCROLL ==========
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

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .product-preview-card');
    animatedElements.forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(30px)';
        elem.style.transition = 'all 0.6s ease-out';
        observer.observe(elem);
    });
});


// Add to Cart
function updateCart(productName, price) {
    const select = document.getElementById(`${productName.toLowerCase().replace(/ /g, '-')}-qty`);
    const quantity = parseInt(select.value);
    const item = { name: productName, quantity, price };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.name === productName);
    if (existing) {
        existing.quantity = quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, price) {
    updateCart(productName, price);
    alert(
        currentLang === 'en'
            ? `${productName} (${document.getElementById(`${productName.toLowerCase().replace(/ /g, '-')}-qty`).value} kg) added to cart!`
            : `${productName} (${document.getElementById(`${productName.toLowerCase().replace(/ /g, '-')}-qty`).value} kg) कार्ट में जोड़ा गया!`
    );
}



// Mobile Menu Toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu open
    document.body.classList.toggle('no-scroll');
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navContainer.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Prevent body scroll
document.body.classList.toggle('no-scroll', false);
