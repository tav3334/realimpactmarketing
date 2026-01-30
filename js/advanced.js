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

// ==========================================
// INITIALIZE ADVANCED FEATURES
// ==========================================
function initAdvancedFeatures() {
    // Cookie Consent (GDPR compliance)
    new CookieConsent();

    // Scroll Reveal for elements with data-scroll attribute
    new ScrollReveal();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
} else {
    initAdvancedFeatures();
}
