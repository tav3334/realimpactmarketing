// ==========================================
// REAL IMPACT MARKETING - MAIN JS (Modern)
// ==========================================

// ==========================================
// PRELOADER
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    // Attendre la fin de l'animation de la barre (1.8s) puis fade out
    setTimeout(() => {
        preloader.classList.add('fade-out');
        preloader.addEventListener('transitionend', () => preloader.remove());
    }, 2000);
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
});

// Dark mode is forced via HTML data-theme="dark"

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    if (!scrollProgress) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// ==========================================
// COMBINED SCROLL HANDLER (performance)
// ==========================================
let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            handleNavbarScroll();
            highlightActiveSection();
            handleBackToTop();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

initializeMobileMenu();

// ==========================================
// CONTACT DROPDOWN
// ==========================================
function initializeContactDropdown() {
    const btn = document.getElementById('contactDropdownBtn');
    const dropdown = document.getElementById('contactDropdown');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-contact-dropdown')) {
            dropdown.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

initializeContactDropdown();

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

initializeSmoothScroll();

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
function initializeContactForm() {
    // Initialiser EmailJS avec votre Public Key
    // REMPLACEZ 'YOUR_PUBLIC_KEY' par votre clé publique EmailJS
    emailjs.init('YBqL1p9INGpUCXx8n');

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Rate limiting - 1 envoi toutes les 30 secondes
    let lastSubmitTime = 0;
    const SUBMIT_COOLDOWN = 30000;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
            const remaining = Math.ceil((SUBMIT_COOLDOWN - (now - lastSubmitTime)) / 1000);
            showNotification(`Veuillez patienter ${remaining}s avant de renvoyer un message.`, 'error');
            return;
        }

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Validate
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Animate submit button
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.style.transform = 'scale(0.95)';
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        // Envoyer l'email via EmailJS
        // REMPLACEZ 'YOUR_SERVICE_ID' et 'YOUR_TEMPLATE_ID' par vos identifiants
        emailjs.send('service_mx7eqy7', 'template_m3ghdzr', {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || 'Non renseigné',
            service: data.service || 'Non spécifié',
            message: data.message
        }).then(() => {
            lastSubmitTime = Date.now();
            showNotification('Merci pour votre message ! Nous vous contacterons sous 24h.', 'success');
            contactForm.reset();
        }).catch((error) => {
            console.error('EmailJS error:', error);
            showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        }).finally(() => {
            btn.style.transform = '';
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
}

initializeContactForm();

// ==========================================
// NOTIFICATION SYSTEM (Modern)
// ==========================================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success'
            ? 'linear-gradient(135deg, #00C896, #00A077)'
            : 'linear-gradient(135deg, #FF6B9D, #dc2743)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        fontWeight: '600',
        fontSize: '0.95rem',
        maxWidth: '380px',
        fontFamily: "'Inter', system-ui, sans-serif",
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        lineHeight: '1.5'
    });

    document.body.appendChild(notification);

    // Use Web Animations API
    notification.animate([
        { transform: 'translateX(120%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });

    setTimeout(() => {
        const anim = notification.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(120%)', opacity: 0 }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' });

        anim.onfinish = () => notification.remove();
    }, 4000);
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// ANIMATED COUNTER FOR STATS
// ==========================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const text = entry.target.textContent.trim();

                if (text === '24/7') {
                    // Don't animate this one
                    return;
                }

                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d]/g, '');

                if (!isNaN(number) && number > 0) {
                    element = entry.target;
                    animateCounter(entry.target, number, suffix);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

setTimeout(initializeCounters, 300);

// ==========================================
// ACTIVE LINK HIGHLIGHT
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveSection() {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
        });
    } else {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

initializeLazyLoading();

// ==========================================
// TYPEWRITER EFFECT (Hero)
// ==========================================
function initTypewriter() {
    const element = document.getElementById('heroTypewriter');
    if (!element) return;

    const words = ['Impact Réel', 'Impact Digital', 'Impact Marketing', 'Impact Durable'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 40 : 80;

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => { isDeleting = true; type(); }, 2500);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, speed);
    }

    // Start after a delay
    setTimeout(type, 2000);
}

initTypewriter();

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log(
    '%c Real Impact Marketing ',
    'background: linear-gradient(135deg, #00C896, #00A077); color: white; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 8px;'
);
console.log(
    '%cDéveloppé avec passion | contact@realimpactmarketing.tamazirtt.com',
    'color: #666; font-size: 12px; padding: 4px 0;'
);

// ==========================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ==========================================
window.RealImpact = {
    showNotification
};
