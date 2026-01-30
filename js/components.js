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
            <img src="${project.image}" alt="${project.title}" class="portfolio-image" loading="lazy" decoding="async">
            <div class="portfolio-overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </article>
    `).join('');
}

// Render Process Steps
function renderProcessSteps() {
    const container = document.getElementById('processSteps');
    if (!container) return;

    container.innerHTML = processSteps.map((step, i) => `
        <div class="process-step" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="step-number" aria-hidden="true">${step.number}</div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
        </div>
    `).join('');
}

// Render Instagram Accounts
function renderInstagramAccounts() {
    const container = document.getElementById('instagramAccounts');
    if (!container) return;

    container.innerHTML = instagramAccounts.map((account, i) => `
        <div class="instagram-card" data-aos="fade-up" data-aos-delay="${i * 150}">
            <div class="instagram-icon" aria-hidden="true">${account.icon}</div>
            <h3>${account.handle}</h3>
            <p>${account.description}</p>
            <a href="${account.url}" target="_blank" rel="noopener noreferrer" class="instagram-link">
                Suivre sur Instagram
            </a>
        </div>
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
    renderInstagramAccounts();
    renderTestimonials();
    renderContactDetails();
}

// Call initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}
