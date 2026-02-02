// ==========================================
// REAL IMPACT MARKETING - COMPONENTS
// ==========================================

// Render Services
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = servicesData.map((service, i) => `
        <article class="service-card" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="service-icon" role="img" aria-label="${service.title}">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${service.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

// Render Portfolio
function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    grid.innerHTML = portfolioData.map((project, i) => `
        <article class="portfolio-item" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="portfolio-skeleton"></div>
            ${project.video
                ? `<video src="${project.video}" class="portfolio-image" muted loop playsinline preload="metadata" onloadeddata="this.previousElementSibling.remove()"></video>`
                : `<img src="${project.image}" alt="${project.title}" class="portfolio-image" loading="lazy" decoding="async" onload="this.previousElementSibling.remove()">`
            }
            <div class="portfolio-overlay">
                ${project.category ? `<span class="portfolio-category">${project.category}</span>` : ''}
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </article>
    `).join('');

    // Auto-play videos on hover
    grid.querySelectorAll('.portfolio-item').forEach(item => {
        const video = item.querySelector('video');
        if (!video) return;
        item.addEventListener('mouseenter', () => video.play());
        item.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    });
}

// Render Process Steps
function renderProcessSteps() {
    const container = document.getElementById('processSteps');
    if (!container) return;

    container.innerHTML = processSteps.map((step, i) => `
        <div class="process-step" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="step-header">
                <div class="step-number" aria-hidden="true">
                    <span class="step-icon">${step.icon || ''}</span>
                    <span class="step-num">${step.number}</span>
                </div>
                ${i < processSteps.length - 1 ? '<div class="step-connector"><div class="step-connector-fill"></div></div>' : ''}
            </div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
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
            <img src="${post.image}" alt="${post.caption}" loading="lazy" decoding="async">
            <div class="ig-post-overlay">
                <span class="ig-post-likes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    ${post.likes}
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
        <article class="testimonial-card" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="testimonial-quote" aria-hidden="true">"</div>
            <blockquote class="testimonial-text">${t.quote}</blockquote>
            <div class="testimonial-author">
                <div class="author-avatar" aria-hidden="true">${t.initials}</div>
                <div class="author-info">
                    <h4>${t.author}</h4>
                    <p>${t.role}</p>
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
                <h4>${contact.title}</h4>
                <p>${contact.info}</p>
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
