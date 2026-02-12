// ==========================================
// REAL IMPACT MARKETING - ADVANCED FEATURES
// ==========================================

// ==========================================
// COOKIE CONSENT BANNER (GDPR)
// ==========================================
class CookieConsent {
    constructor() {
        this.consentKey = 'rim-cookie-consent';
        if (!this.hasConsent()) {
            // Show after a short delay for better UX
            setTimeout(() => this.showBanner(), 1500);
        }
    }

    hasConsent() {
        return localStorage.getItem(this.consentKey) !== null;
    }

    showBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';

        Object.assign(banner.style, {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: 'var(--nav-bg-scroll, rgba(255, 255, 255, 0.95))',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'var(--text-dark, #1A1A1A)',
            padding: '1.25rem 2rem',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid var(--border, rgba(0, 200, 150, 0.1))',
            animation: 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        });

        banner.innerHTML = `
            <div style="flex: 1; min-width: 280px;">
                <p style="margin: 0; line-height: 1.6; font-size: 0.9rem; color: var(--text-light, #666);">
                    Nous utilisons des cookies pour améliorer votre expérience de navigation.
                    En continuant, vous acceptez notre utilisation des cookies.
                </p>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-shrink: 0;">
                <button class="cookie-accept" style="background: linear-gradient(135deg, #00C896, #00A077); color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 12px; cursor: pointer; font-weight: 700; font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; transition: transform 0.2s ease;">
                    Accepter
                </button>
                <button class="cookie-decline" style="background: transparent; color: var(--text-dark, #1A1A1A); border: 2px solid var(--border, rgba(0, 200, 150, 0.2)); padding: 0.7rem 1.5rem; border-radius: 12px; cursor: pointer; font-weight: 600; font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; transition: transform 0.2s ease;">
                    Refuser
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        const removeBanner = () => {
            banner.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(100%)', opacity: 0 }
            ], { duration: 300, easing: 'ease-in', fill: 'forwards' })
            .onfinish = () => banner.remove();
        };

        banner.querySelector('.cookie-accept').addEventListener('click', () => {
            localStorage.setItem(this.consentKey, 'accepted');
            removeBanner();
        });

        banner.querySelector('.cookie-decline').addEventListener('click', () => {
            localStorage.setItem(this.consentKey, 'declined');
            removeBanner();
        });
    }
}

// ==========================================
// SCROLL REVEAL (Enhanced)
// ==========================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        if (this.elements.length === 0) return;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.observer.observe(el);
        });
    }
}

// STATS COUNTER: handled in main.js (initializeCounters)

// ==========================================
// WHATSAPP FLOATING BUTTON
// ==========================================
function initWhatsAppFloat() {
    const btn = document.getElementById('whatsappFloat');
    if (!btn) return;

    // Use IntersectionObserver on hero section instead of scroll listener
    const hero = document.getElementById('accueil');
    if (hero) {
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                btn.classList.add('visible');
                setTimeout(() => btn.classList.add('pulse-done'), 8000);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(hero);
    } else {
        // Fallback: show after 3s
        setTimeout(() => btn.classList.add('visible'), 3000);
    }
}

// ==========================================
// SERVICE CARD RIPPLE EFFECT
// ==========================================
function initServiceRipple() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.service-card');
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

// ==========================================
// TESTIMONIALS AUTO-SCROLL ON MOBILE
// ==========================================
function initTestimonialsAutoScroll() {
    if (window.innerWidth > 768) return;

    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;

    let scrollInterval;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollInterval = setInterval(() => {
                    const maxScroll = slider.scrollWidth - slider.clientWidth;
                    if (slider.scrollLeft >= maxScroll) {
                        slider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        slider.scrollBy({ left: 320, behavior: 'smooth' });
                    }
                }, 4000);
            } else {
                clearInterval(scrollInterval);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(slider);

    // Pause on touch
    slider.addEventListener('touchstart', () => clearInterval(scrollInterval), { passive: true });
}

// ==========================================
// PORTFOLIO LIGHTBOX
// ==========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox || typeof portfolioData === 'undefined') return;

    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
        }
        if (lightboxImg) lightboxImg.style.display = '';
    }

    function updateLightboxContent() {
        const item = portfolioData[currentLightboxIndex];
        if (!item) return;

        if (item.video) {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = item.video;
            lightboxVideo.play().catch(() => {});
        } else {
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxImg.style.display = 'block';
            lightboxImg.src = item.image;
            lightboxImg.alt = item.title;
        }

        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.description;
        lightboxCategory.textContent = item.category;
    }

    // Listen for clicks on portfolio fan cards
    document.addEventListener('click', (e) => {
        const fanCard = e.target.closest('.fan-card--active');
        if (fanCard) {
            const idx = parseInt(fanCard.dataset.index);
            if (!isNaN(idx)) openLightbox(idx);
        }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex - 1 + portfolioData.length) % portfolioData.length;
            updateLightboxContent();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex + 1) % portfolioData.length;
            updateLightboxContent();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentLightboxIndex = (currentLightboxIndex - 1 + portfolioData.length) % portfolioData.length;
            updateLightboxContent();
        }
        if (e.key === 'ArrowRight') {
            currentLightboxIndex = (currentLightboxIndex + 1) % portfolioData.length;
            updateLightboxContent();
        }
    });
}

// ==========================================
// INITIALIZE ADVANCED FEATURES
// ==========================================
function initAdvancedFeatures() {
    // Cookie Consent (GDPR compliance)
    new CookieConsent();

    // Scroll Reveal for elements with data-scroll attribute
    new ScrollReveal();

    // WhatsApp floating button
    initWhatsAppFloat();

    // Portfolio lightbox
    initLightbox();

    // Service card ripple effect
    initServiceRipple();

    // Testimonials auto-scroll on mobile
    initTestimonialsAutoScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
} else {
    initAdvancedFeatures();
}
