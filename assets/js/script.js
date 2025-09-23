// Router class for SPA navigation
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = 'home';
        this.init();
    }

    // Initialize router
    init() {
        // Register routes
        this.registerRoute('home', () => this.showSection('home'));
        this.registerRoute('about', () => this.showSection('about'));
        this.registerRoute('offer', () => this.showSection('offer'));
        this.registerRoute('passion', () => this.showSection('passion'));
        this.registerRoute('blog', () => this.showSection('blog'));
        this.registerRoute('contact', () => this.showSection('contact'));

        // Setup event listeners
        this.setupNavigation();
        this.setupMobileMenu();
        
        // Handle initial load
        this.handleRoute();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
    }

    // Register a route
    registerRoute(path, handler) {
        this.routes[path] = handler;
    }

    // Navigate to a route
    navigate(path) {
        if (this.routes[path]) {
            this.currentRoute = path;
            history.pushState({ path }, '', `#${path}`);
            this.routes[path]();
            this.updateActiveNavLink();
        }
    }

    // Handle current route
    handleRoute() {
        const hash = window.location.hash.substr(1) || 'home';
        if (this.routes[hash]) {
            this.currentRoute = hash;
            this.routes[hash]();
            this.updateActiveNavLink();
        }
    }

    // Show specific section
    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Close mobile menu if open
        this.closeMobileMenu();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Setup navigation click handlers
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigate(section);
            });
        });

        // Setup CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.navigate('contact');
            });
        }

        // Setup "Dowiedz się więcej" button
        const learnMoreBtn = document.querySelector('.btn-secondary');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.navigate('about');
            });
        }
    }

    // Update active navigation link
    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === this.currentRoute) {
                link.classList.add('active');
            }
        });
    }

    // Setup mobile menu functionality
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    // Close mobile menu
    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}

// Smooth scrolling utility
class SmoothScroll {
    static scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Animation utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideDown(element, duration = 300) {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight + 'px';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressPercent = Math.min(progress / duration, 1);
            
            element.style.height = (parseInt(targetHeight) * progressPercent) + 'px';
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.setupContactForm();
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Simulate form submission
        this.showSuccessMessage();
        e.target.reset();
    }

    validateForm(data) {
        let isValid = true;
        const errors = [];

        if (!data.name.trim()) {
            errors.push('Imię i nazwisko jest wymagane');
            isValid = false;
        }

        if (!data.email.trim()) {
            errors.push('Email jest wymagany');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Podaj prawidłowy adres email');
            isValid = false;
        }

        if (!data.message.trim()) {
            errors.push('Wiadomość jest wymagana');
            isValid = false;
        }

        if (!isValid) {
            this.showErrors(errors);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showErrors(errors) {
        alert('Błędy w formularzu:\n' + errors.join('\n'));
    }

    showSuccessMessage() {
        alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
    }
}

// Scroll effects
class ScrollEffects {
    constructor() {
        this.setupScrollEffects();
    }

    setupScrollEffects() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
}

// Intersection Observer for animations
class IntersectionAnimations {
    constructor() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(this.handleIntersection.bind(this), options);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.service-card, .gallery-item, .work-feature, .team-member, .passion-card'
        );

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Loading screen
class LoadingScreen {
    static show() {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Ładowanie...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        const spinnerStyles = `
            .spinner {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #c8996b;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-content p {
                margin-top: 1rem;
                color: #2c3e50;
                font-weight: 500;
            }
        `;

        if (!document.querySelector('#loader-styles')) {
            const style = document.createElement('style');
            style.id = 'loader-styles';
            style.textContent = spinnerStyles;
            document.head.appendChild(style);
        }

        document.body.appendChild(loader);
    }

    static hide() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen briefly
    LoadingScreen.show();
    
    setTimeout(() => {
        // Initialize all components
        const router = new Router();
        const formHandler = new FormHandler();
        const scrollEffects = new ScrollEffects();
        const intersectionAnimations = new IntersectionAnimations();
        
        // Hide loading screen
        LoadingScreen.hide();
        
        // Add smooth reveal animation to main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }, 500);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Router, FormHandler, SmoothScroll, AnimationUtils };
}