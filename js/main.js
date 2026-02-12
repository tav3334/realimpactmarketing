// ==========================================
// REAL IMPACT MARKETING - MAIN JS (Modern)
// ==========================================

// ==========================================
// PRELOADER & PAGE REVEAL (2.5s circular loader)
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-loaded');
        initAOS();
        return;
    }

    const circleFill = preloader.querySelector('.preloader-circle-fill');
    const percentEl = document.getElementById('preloaderPercent');
    const totalLength = 339.292; // 2 * PI * 54
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    function animateLoader(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for smooth feel
        const eased = 1 - Math.pow(1 - progress, 3);

        // Update circle stroke
        if (circleFill) {
            circleFill.style.strokeDashoffset = totalLength * (1 - eased);
        }

        // Update percentage text
        if (percentEl) {
            percentEl.textContent = Math.round(eased * 100) + '%';
        }

        if (progress < 1) {
            requestAnimationFrame(animateLoader);
        } else {
            // Loading complete - fade out
            preloader.classList.add('fade-out');

            preloader.addEventListener('animationend', () => {
                document.body.classList.remove('is-loading');
                document.body.classList.add('is-loaded');
                preloader.remove();

                // Initialize AOS after page is revealed
                setTimeout(initAOS, 50);
            }, { once: true });
        }
    }

    requestAnimationFrame(animateLoader);
});

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
        duration: 500,
        easing: 'ease-out',
        once: true,
        offset: 50,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
}

// Dark mode is forced via HTML data-theme="dark"

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    if (!scrollProgress) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / totalHeight;
    scrollProgress.style.transform = `scaleX(${progress})`;
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

    function toggleMobileMenu(open) {
        const isOpen = typeof open === 'boolean' ? open : !mobileMenuBtn.classList.contains('active');
        mobileMenuBtn.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    }

    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            toggleMobileMenu(false);
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

                // Flash highlight on target section
                target.classList.add('section-highlight');
                setTimeout(() => target.classList.remove('section-highlight'), 1500);
            }
        });
    });
}

initializeSmoothScroll();

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
function initializeContactForm() {
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

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Validate phone format (optional field, but validate if filled)
        if (data.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(data.phone)) {
            showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
            return;
        }

        // Animate submit button
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.style.transform = 'scale(0.95)';
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            showNotification('Le formulaire charge encore, veuillez réessayer.', 'error');
            btn.style.transform = '';
            btn.textContent = originalText;
            btn.disabled = false;
            return;
        }

        // Envoyer l'email via EmailJS
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
// BACK TO TOP BUTTON + SIGNATURE
// ==========================================
const backToTopBtn = document.getElementById('backToTop');
const signatureOverlay = document.getElementById('signatureOverlay');

function handleBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

function showSignature() {
    if (!signatureOverlay) return;

    // Reset paths for re-animation
    signatureOverlay.querySelectorAll('.signature-path, .signature-underline').forEach(p => {
        p.style.animation = 'none';
        p.offsetHeight; // force reflow
        p.style.animation = '';
    });

    signatureOverlay.classList.remove('fade-out');
    signatureOverlay.classList.add('active');

    // Auto-hide after signature finishes drawing
    setTimeout(() => {
        signatureOverlay.classList.add('fade-out');
        setTimeout(() => {
            signatureOverlay.classList.remove('active', 'fade-out');
        }, 900);
    }, 3200);
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Show signature when scroll reaches top
        const onScroll = () => {
            if (window.scrollY < 10) {
                window.removeEventListener('scroll', onScroll);
                showSignature();
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    });
}

// Close signature on click
if (signatureOverlay) {
    signatureOverlay.addEventListener('click', () => {
        signatureOverlay.classList.add('fade-out');
        setTimeout(() => {
            signatureOverlay.classList.remove('active', 'fade-out');
        }, 600);
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
                    animateCounter(entry.target, number, suffix);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

setTimeout(initializeCounters, 300);

// ==========================================
// ACTIVE LINK HIGHLIGHT (optimized with cached offsets)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');
let sectionOffsets = [];
let lastActiveId = '';

function cacheSectionOffsets() {
    sectionOffsets = Array.from(sections).map(s => ({
        id: s.getAttribute('id'),
        top: s.offsetTop
    }));
}

// Cache offsets on load and resize
window.addEventListener('load', cacheSectionOffsets);
window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(cacheSectionOffsets, 200);
});

function highlightActiveSection() {
    let current = '';
    const scrollY = window.scrollY;

    for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollY >= sectionOffsets[i].top - 120) {
            current = sectionOffsets[i].id;
            break;
        }
    }

    // Skip DOM updates if nothing changed
    if (current === lastActiveId) return;
    lastActiveId = current;

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
