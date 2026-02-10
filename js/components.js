// ==========================================
// REAL IMPACT MARKETING - COMPONENTS
// ==========================================

// HTML escape utility to prevent XSS
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// Render Services
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = servicesData.map((service, i) => `
        <article class="service-card${service.popular ? ' service-card--popular' : ''}" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 150)}">
            <span class="service-number">0${i + 1}</span>
            ${service.popular ? '<span class="service-badge">Populaire</span>' : ''}
            <div class="service-icon" role="img" aria-label="${escapeHTML(service.title)}">${service.icon}</div>
            <h3>${escapeHTML(service.title)}</h3>
            <p>${escapeHTML(service.description)}</p>
            <ul class="service-features">
                ${service.features.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
            </ul>
            <a href="#contact" class="service-link">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
        </article>
    `).join('');
}

// Render Portfolio with fan card layout
function renderPortfolio() {
    const fan = document.getElementById('portfolioFan');
    const filtersContainer = document.getElementById('portfolioFilters');
    if (!fan) return;

    let filteredData = [...portfolioData];
    let currentIndex = Math.floor(filteredData.length / 2);
    let portfolioInitialized = false;

    // Extract unique categories
    const categories = ['Tous', ...new Set(portfolioData.map(p => p.category).filter(Boolean))];

    // Render filter buttons
    if (filtersContainer) {
        filtersContainer.innerHTML = categories.map((cat, i) => `
            <button class="portfolio-filter-btn${i === 0 ? ' active' : ''}" data-filter="${cat}">${cat}</button>
        `).join('');

        filtersContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.portfolio-filter-btn');
            if (!btn) return;

            filtersContainer.querySelectorAll('.portfolio-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            filteredData = filter === 'Tous'
                ? [...portfolioData]
                : portfolioData.filter(p => p.category === filter);

            currentIndex = Math.floor(filteredData.length / 2);
            renderFanCards();
        });
    }

    function renderFanCards() {
        const total = filteredData.length;
        const visibleCount = Math.min(total, 5); // Reduced from 7 to 5 for better performance
        const half = Math.floor(visibleCount / 2);

        fan.innerHTML = filteredData.map((project, i) => {
            const offset = i - currentIndex;
            const absOffset = Math.abs(offset);

            // Only render cards within visible range
            if (absOffset > half) return '';

            const rotation = offset * 6;
            const translateX = offset * 60;
            const translateY = absOffset * 15;
            const scale = 1 - absOffset * 0.06;
            const zIndex = visibleCount - absOffset;
            const opacity = 1 - absOffset * 0.12;
            const isActive = offset === 0;

            // For videos: only load video when active, show placeholder otherwise
            if (project.video) {
                return `
                    <article class="fan-card${isActive ? ' fan-card--active' : ''}"
                        style="--rotation: ${rotation}deg; --tx: ${translateX}px; --ty: ${translateY}px; --scale: ${scale}; --z: ${zIndex}; --opacity: ${opacity};"
                        data-index="${i}" data-video="${escapeHTML(project.video)}">
                        <div class="fan-card-media fan-card-video-container">
                            ${isActive
                                ? `<video src="${escapeHTML(project.video)}" class="fan-card-video" muted loop playsinline preload="metadata"></video>`
                                : `<div class="fan-card-video-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div>`
                            }
                        </div>
                    </article>
                `;
            }

            return `
                <article class="fan-card${isActive ? ' fan-card--active' : ''}"
                    style="--rotation: ${rotation}deg; --tx: ${translateX}px; --ty: ${translateY}px; --scale: ${scale}; --z: ${zIndex}; --opacity: ${opacity};"
                    data-index="${i}">
                    <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" class="fan-card-media" loading="lazy" decoding="async">
                </article>
            `;
        }).join('');

        // Update info
        const current = filteredData[currentIndex];
        if (current) {
            const catEl = document.getElementById('fanCategory');
            const titleEl = document.getElementById('fanTitle');
            const descEl = document.getElementById('fanDesc');
            const counterEl = document.getElementById('fanCounter');

            if (catEl) catEl.textContent = current.category || '';
            if (titleEl) titleEl.textContent = current.title;
            if (descEl) descEl.textContent = current.description;
            if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${filteredData.length}`;
        }

        // Handle card interactions
        fan.querySelectorAll('.fan-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                if (idx !== currentIndex) {
                    currentIndex = idx;
                    renderFanCards();
                }
            });

            // Auto-play video only on active card
            if (card.classList.contains('fan-card--active')) {
                const video = card.querySelector('video');
                if (video) {
                    video.play().catch(() => {});
                }
            }
        });
    }

    // Navigation
    const prevBtn = document.getElementById('fanPrev');
    const nextBtn = document.getElementById('fanNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderFanCards();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < filteredData.length - 1) {
                currentIndex++;
                renderFanCards();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const portfolioSection = document.getElementById('portfolio');
        const rect = portfolioSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (!isVisible) return;

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            renderFanCards();
        } else if (e.key === 'ArrowRight' && currentIndex < filteredData.length - 1) {
            currentIndex++;
            renderFanCards();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    fan.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    fan.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < filteredData.length - 1) {
                currentIndex++;
                renderFanCards();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                renderFanCards();
            }
        }
    }, { passive: true });

    // Lazy initialize portfolio only when section is visible
    const portfolioSection = document.getElementById('portfolio');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !portfolioInitialized) {
                portfolioInitialized = true;
                renderFanCards();
                observer.disconnect();
            }
        });
    }, { rootMargin: '100px' });

    observer.observe(portfolioSection);
}

// Render Process Steps
function renderProcessSteps() {
    const container = document.getElementById('processSteps');
    if (!container) return;

    container.innerHTML = processSteps.map((step, i) => `
        <div class="process-step" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 150)}">
            <div class="step-header">
                <div class="step-number" aria-hidden="true">
                    <span class="step-icon">${step.icon || ''}</span>
                    <span class="step-num">${step.number}</span>
                </div>
                ${i < processSteps.length - 1 ? '<div class="step-connector"><div class="step-connector-fill"></div></div>' : ''}
            </div>
            <div class="step-content">
                <h3>${escapeHTML(step.title)}</h3>
                <p>${escapeHTML(step.description)}</p>
            </div>
        </div>
    `).join('');
}

// Render Instagram Posts Grid
function renderInstagramPosts() {
    const grid = document.getElementById('igPostsGrid');
    if (!grid || typeof instagramPosts === 'undefined') return;

    grid.innerHTML = instagramPosts.map((post, i) => `
        <a href="https://www.instagram.com/real_impact_marketing" target="_blank" rel="noopener noreferrer" class="ig-post" style="animation-delay: ${i * 80}ms">
            <img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.caption)}" loading="lazy" decoding="async">
            <div class="ig-post-overlay">
                <span class="ig-post-likes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    ${escapeHTML(post.likes)}
                </span>
            </div>
        </a>
    `).join('');
}

// Render Testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonialsSlider');
    if (!container) return;

    container.innerHTML = testimonialsData.map((t, i) => `
        <article class="testimonial-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 150)}">
            <div class="testimonial-quote" aria-hidden="true">"</div>
            <blockquote class="testimonial-text">${escapeHTML(t.quote)}</blockquote>
            <div class="testimonial-author">
                <div class="author-avatar" aria-hidden="true">${escapeHTML(t.initials)}</div>
                <div class="author-info">
                    <h4>${escapeHTML(t.author)}</h4>
                    <p>${escapeHTML(t.role)}</p>
                </div>
            </div>
        </article>
    `).join('');
}

// Render Contact Details
function renderContactDetails() {
    const container = document.getElementById('contactDetails');
    if (!container) return;

    container.innerHTML = contactDetails.map(contact => `
        <div class="contact-item">
            <div class="contact-icon" aria-hidden="true">${contact.icon}</div>
            <div>
                <h4>${escapeHTML(contact.title)}</h4>
                <p>${escapeHTML(contact.info)}</p>
            </div>
        </div>
    `).join('');
}

// Initialize all components
function initializeComponents() {
    renderServices();
    renderPortfolio();
    renderProcessSteps();
    renderInstagramPosts();
    renderTestimonials();
    renderContactDetails();
}

// Call initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}
